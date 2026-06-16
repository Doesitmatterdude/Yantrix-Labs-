import { NextResponse } from "next/server";
import { generateAudit } from "@/lib/ai-router";

// Simple in-memory rate limiter: max 5 requests per IP per 5 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { url, name, email, mobile } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // SSRF Protection: Block private and local IPs
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      const hostname = parsedUrl.hostname;
      
      const isLocalhost = hostname === 'localhost' || hostname.endsWith('.localhost');
      const isPrivateIP = /^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname);
      
      if (isLocalhost || isPrivateIP) {
        return NextResponse.json({ error: "Invalid or restricted URL." }, { status: 400 });
      }
    } catch (e) {
      return NextResponse.json({ error: "Malformed URL provided." }, { status: 400 });
    }

    // Ensure URL has protocol
    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    // 1. Basic Scraper: Fetch the raw HTML of the target URL
    console.log(`[API] Fetching HTML from ${targetUrl}...`);
    let htmlText = "";
    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "YantrixLabs-AuditBot/1.0"
        },
        signal: AbortSignal.timeout(8000) // 8 second timeout
      });
      htmlText = await response.text();
    } catch (e) {
      console.warn(`[API] Failed to fetch ${targetUrl}:`, (e as Error).message);
      htmlText = `Unable to scrape HTML content. The site might be blocking bots. Please provide a general estimated audit based on common best practices for a domain named: ${targetUrl}.`;
    }

    // 2. Extract text (Basic regex to strip scripts, styles, and HTML tags)
    // In production, using a library like 'cheerio' is recommended.
    const cleanText = htmlText
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // 3. Pass to AI Router
    console.log(`[API] Extracted ${cleanText.length} characters of text. Routing to AI...`);
    const auditResult = await generateAudit(targetUrl, cleanText);

    // --- SCAFFOLD: Lead Persistence ---
    // TODO: Connect to your database (e.g., Supabase, Vercel Postgres)
    if (name && email) {
      // await db.leads.create({ data: { name, email, mobile, url, result: auditResult } });
      console.log(`[Backend] Scaffold: Lead saved to DB -> ${name} (${email}, ${mobile})`);
    }

    // --- SCAFFOLD: Email Delivery ---
    // TODO: Connect to email provider (e.g., Resend, SendGrid)
    if (email) {
      // await resend.emails.send({ to: email, subject: 'Your AI Website Audit', react: AuditEmailTemplate({ auditResult }) });
      console.log(`[Backend] Scaffold: Audit report email dispatched to -> ${email}`);
    }

    return NextResponse.json(auditResult);

  } catch (error: any) {
    console.error("[API] Audit Route Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to generate audit." },
      { status: 500 }
    );
  }
}
