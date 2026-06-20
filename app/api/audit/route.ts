import { NextResponse } from "next/server";
import { generateAudit } from "@/lib/ai-router";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";
import { AuditEmailTemplate } from "@/components/emails/audit-email";
import { render } from "@react-email/render";
import { analyzeHtml, fetchSupportingFiles, computeDeterministicScores, fetchPageSpeedSignals, type AuditSignals } from "@/lib/html-analyzer";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter: max 5 requests per IP per 5 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

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
        { status: 429 },
      );
    }

    const body = await req.json();
    const { url, name, email, mobile } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // SSRF Protection
    try {
      const parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
      const hostname = parsedUrl.hostname;
      const isLocal = hostname === "localhost" || hostname.endsWith(".localhost");
      const isPrivate = /^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname);
      if (isLocal || isPrivate) {
        return NextResponse.json({ error: "Invalid or restricted URL." }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Malformed URL provided." }, { status: 400 });
    }

    let targetUrl = url;
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    // ── 1. Fetch raw HTML + measure TTFB ────────────────────────────
    console.log(`[API] Fetching HTML from ${targetUrl}...`);
    let rawHtml = "";
    let responseTimeMs = 0;
    const responseHeaders: Record<string, string> = {};

    try {
      const startTime = Date.now();
      const response = await fetch(targetUrl, {
        headers: { "User-Agent": "YantrixLabs-AuditBot/1.0" },
        signal: AbortSignal.timeout(8000),
      });
      responseTimeMs = Date.now() - startTime;
      rawHtml = await response.text();
      response.headers.forEach((v, k) => { responseHeaders[k.toLowerCase()] = v; });
    } catch (e) {
      console.warn(`[API] Failed to fetch ${targetUrl}:`, (e as Error).message);
      rawHtml = "";
    }

    // ── 2. Run deterministic HTML analysis BEFORE stripping ─────────
    console.log(`[API] Running HTML signal extraction...`);
    const signals: AuditSignals = {
      ...analyzeHtml(rawHtml, targetUrl, responseTimeMs, responseHeaders),
      hasRobotsTxt: false,
      hasSitemapXml: false,
      hasLlmsTxt: false,
    };

    // ── 3. Fetch supporting files + PSI in parallel ───────────────────────
    if (rawHtml) {
      const [supportingRes, psiRes] = await Promise.allSettled([
        fetchSupportingFiles(targetUrl),
        fetchPageSpeedSignals(targetUrl)
      ]);
      
      if (supportingRes.status === "fulfilled") {
        signals.hasRobotsTxt = supportingRes.value.hasRobotsTxt;
        signals.hasSitemapXml = supportingRes.value.hasSitemapXml;
        signals.hasLlmsTxt = supportingRes.value.hasLlmsTxt;
      }
      
      signals.psiSignals = psiRes.status === "fulfilled" ? psiRes.value : null;
    }

    console.log(`[API] Signals extracted → title: "${signals.titleTag}", h1s: ${signals.h1Count}, phone: ${signals.hasPhone}`);

    // ── 4. Strip HTML for text content ──────────────────────────────
    const cleanText = rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // ── 5. Compute Deterministic Scores ─────────────────────────────
    const deterministicScores = computeDeterministicScores(signals);

    // ── 6. Pass signals + text + scores to AI Router ────────────────
    const auditResult = await generateAudit(targetUrl, cleanText, signals, deterministicScores);

    // ── 6. Save to Supabase ─────────────────────────────────────────
    if (email) {
      const { error: dbError } = await supabaseAdmin
        .from("audit_leads")
        .insert([{ name, email, mobile, url: targetUrl, audit_result: auditResult }]);
      if (dbError) {
        console.error("[Supabase Error]", dbError);
      } else {
        console.log(`[Backend] Lead saved → ${name} (${email})`);
      }
    }

    // ── 7. Send via Resend ──────────────────────────────────────────
    if (email) {
      try {
        const htmlBody = await render(
          AuditEmailTemplate({ name, url: targetUrl, auditResult }),
        );
        await resend.emails.send({
          from: "Yantrix Labs <audit@yantrixlabs.studio>",
          to: email,
          subject: `Your AI Website Audit for ${targetUrl}`,
          html: htmlBody,
        });
        console.log(`[Backend] Email dispatched → ${email}`);
      } catch (emailError) {
      }
    }

    return NextResponse.json({ ...auditResult, signals });
  } catch (error: any) {
    console.error("[API] Audit Route Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to generate audit." },
      { status: 500 },
    );
  }
}
