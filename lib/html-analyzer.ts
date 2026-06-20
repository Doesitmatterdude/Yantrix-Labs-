/**
 * html-analyzer.ts — Deterministic signal extractor for the Yantrix AI Audit.
 *
 * Extracts 50+ factual signals from raw HTML, response headers, and
 * supporting file checks (robots.txt, sitemap.xml, llms.txt).
 * These signals are injected into the LLM prompt so it scores
 * from real data instead of guessing.
 */

// ── Types ────────────────────────────────────────────────────────────

export interface AuditSignals {
  // Technical
  isHttps: boolean;
  ttfbMs: number;
  htmlSizeBytes: number;
  isCompressed: boolean;
  hasViewportMeta: boolean;
  hasFavicon: boolean;
  hasCSP: boolean;
  renderBlockingStylesheets: number;
  renderBlockingScripts: number;
  externalScriptCount: number;

  // SEO
  titleTag: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1Count: number;
  h1Text: string | null;
  headingOrder: string[];
  hasCanonical: boolean;
  hasOgTitle: boolean;
  hasOgDescription: boolean;
  hasOgImage: boolean;
  hasTwitterCard: boolean;
  totalImages: number;
  imagesWithAlt: number;
  imagesWithoutAlt: number;
  hasRobotsTxt: boolean;
  hasSitemapXml: boolean;
  internalLinkCount: number;
  externalLinkCount: number;

  // AI Readiness
  hasLlmsTxt: boolean;
  hasFaqSchema: boolean;
  hasLocalBusinessSchema: boolean;
  hasOrganizationSchema: boolean;
  jsonLdTypes: string[];
  detectedAnalytics: string[];
  detectedCrm: string[];
  detectedChatbot: string[];

  // Conversion
  hasPhone: boolean;
  hasEmail: boolean;
  hasWhatsApp: boolean;
  formCount: number;
  ctaKeywordLinks: number;
  hasPricingPage: boolean;
  hasSocialProofKeywords: boolean;

  // Competitive / Brand
  contentWordCount: number;
  hasAboutPage: boolean;
  hasContactPage: boolean;
  hasBlog: boolean;
  socialLinks: string[];
  hasGoogleMapsEmbed: boolean;
  footerCopyrightCurrent: boolean;

  // Accessibility
  hasLangAttribute: boolean;
  hasSkipLink: boolean;
  semanticElementsFound: string[];
  ariaAttributeCount: number;

  // PageSpeed Insights
  psiSignals?: {
    performanceScore: number | null;
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    fcp: number | null;
    ttfb: number | null;
    speedIndex: number | null;
    formatted: {
      lcp: string | null;
      cls: string | null;
      fcp: string | null;
      ttfb: string | null;
      speedIndex: string | null;
    } | null;
  } | null;
}

// ── Known third-party script patterns ────────────────────────────────

const KNOWN_SCRIPTS: Record<string, Record<string, string[]>> = {
  analytics: {
    GA4: ["googletagmanager.com/gtag", "google-analytics.com/analytics"],
    GTM: ["googletagmanager.com/gtm"],
    Hotjar: ["hotjar.com"],
    Plausible: ["plausible.io"],
    Mixpanel: ["mixpanel.com"],
    PostHog: ["posthog.com"],
    Clarity: ["clarity.ms"],
  },
  crm: {
    HubSpot: ["js.hs-scripts.com", "js.hsforms.net"],
    Salesforce: ["pardot.com", "salesforce.com"],
    Zoho: ["zoho.com/crm"],
    Mailchimp: ["chimpstatic.com"],
    ActiveCampaign: ["trackcmp.net"],
  },
  chatbot: {
    Intercom: ["intercomcdn.com", "widget.intercom.io"],
    Crisp: ["client.crisp.chat"],
    Tawk: ["embed.tawk.to"],
    Tidio: ["code.tidio.co"],
    Drift: ["js.driftt.com"],
    LiveChat: ["cdn.livechatinc.com"],
    Freshchat: ["wchat.freshchat.com"],
  },
};

// ── Helpers ──────────────────────────────────────────────────────────

function count(html: string, re: RegExp): number {
  return (html.match(re) || []).length;
}

function detectTools(html: string, category: Record<string, string[]>): string[] {
  const found: string[] = [];
  for (const [name, patterns] of Object.entries(category)) {
    if (patterns.some((p) => html.includes(p))) found.push(name);
  }
  return found;
}

// ── Main analyser (synchronous — operates on already-fetched HTML) ───

export function analyzeHtml(
  rawHtml: string,
  url: string,
  ttfbMs: number,
  headers: Record<string, string>,
): Omit<AuditSignals, "hasRobotsTxt" | "hasSitemapXml" | "hasLlmsTxt"> {
  const lowerHtml = rawHtml.toLowerCase();
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    parsedUrl = new URL("https://example.com");
  }

  // ── Technical ─────────────────────────────────────────────────────
  const isHttps = url.startsWith("https://");
  const htmlSizeBytes = Buffer.byteLength(rawHtml, "utf8");
  const encoding = (headers["content-encoding"] || "").toLowerCase();
  const isCompressed = encoding.includes("gzip") || encoding.includes("br");
  const hasViewportMeta = /<meta[^>]*name=["']viewport["'][^>]*>/i.test(rawHtml);
  const hasFavicon = /<link[^>]*rel=["'](icon|shortcut icon|apple-touch-icon)["'][^>]*>/i.test(rawHtml);
  const hasCSP = !!(headers["content-security-policy"]);

  // Render-blocking resources inside <head>
  const headMatch = rawHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch ? headMatch[1] : "";
  const renderBlockingStylesheets = count(head, /<link[^>]*rel=["']stylesheet["'][^>]*>/gi);
  const renderBlockingScripts = count(
    head,
    /<script(?![^>]*\basync\b)(?![^>]*\bdefer\b)[^>]*\bsrc=/gi,
  );

  // External scripts (any domain ≠ current domain)
  const scriptSrcs = rawHtml.match(/<script[^>]*src=["']([^"']+)["']/gi) || [];
  let externalScriptCount = 0;
  for (const tag of scriptSrcs) {
    const m = tag.match(/src=["']([^"']+)["']/i);
    if (!m) continue;
    try {
      const sUrl = new URL(m[1], url);
      if (sUrl.hostname !== parsedUrl.hostname) externalScriptCount++;
    } catch { /* skip */ }
  }

  // ── SEO ───────────────────────────────────────────────────────────
  const titleMatch2 = rawHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleTag = titleMatch2 ? titleMatch2[1].replace(/\s+/g, " ").trim() : null;

  const descMatch =
    rawHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    rawHtml.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDescription = descMatch ? descMatch[1].trim() : null;

  // H1
  const h1Matches = rawHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Texts = h1Matches.map((m) => m.replace(/<[^>]+>/g, "").trim()).filter(Boolean);

  // Heading order
  const headingTags = rawHtml.match(/<h([1-6])\b/gi) || [];
  const headingOrder = headingTags.map((t) => {
    const lvl = t.match(/h([1-6])/i);
    return lvl ? `h${lvl[1]}` : "";
  }).filter(Boolean);

  // Images
  const totalImages = count(rawHtml, /<img\b/gi);
  const imagesWithAlt = count(rawHtml, /<img\b[^>]*\balt=["'][^"']+["']/gi);

  // Canonical / OG / Twitter
  const hasCanonical = /<link[^>]*rel=["']canonical["']/i.test(rawHtml);
  const hasOgTitle = /<meta[^>]*property=["']og:title["']/i.test(rawHtml);
  const hasOgDescription = /<meta[^>]*property=["']og:description["']/i.test(rawHtml);
  const hasOgImage = /<meta[^>]*property=["']og:image["']/i.test(rawHtml);
  const hasTwitterCard = /<meta[^>]*name=["']twitter:card["']/i.test(rawHtml);

  // JSON-LD
  const ldBlocks = rawHtml.match(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  ) || [];
  const jsonLdTypes: string[] = [];
  for (const block of ldBlocks) {
    const content = block.replace(/<[^>]+>/g, "").trim();
    try {
      const obj = JSON.parse(content);
      if (obj["@type"]) jsonLdTypes.push(obj["@type"]);
      if (Array.isArray(obj["@graph"])) {
        for (const item of obj["@graph"]) {
          if (item["@type"]) jsonLdTypes.push(item["@type"]);
        }
      }
    } catch { /* skip malformed */ }
  }

  // Links
  const allAnchorHrefs = rawHtml.match(/<a\b[^>]*href=["']([^"'#]*?)["']/gi) || [];
  let internalLinkCount = 0;
  let externalLinkCount = 0;
  const socialLinksSet = new Set<string>();
  const socialDomains: Record<string, string> = {
    "instagram.com": "Instagram",
    "linkedin.com": "LinkedIn",
    "twitter.com": "Twitter",
    "x.com": "X/Twitter",
    "youtube.com": "YouTube",
    "facebook.com": "Facebook",
    "tiktok.com": "TikTok",
  };

  for (const tag of allAnchorHrefs) {
    const hm = tag.match(/href=["']([^"'#]*?)["']/i);
    if (!hm || !hm[1]) continue;
    const href = hm[1];
    try {
      const linkUrl = new URL(href, url);
      if (linkUrl.hostname === parsedUrl.hostname) {
        internalLinkCount++;
      } else {
        externalLinkCount++;
        for (const [domain, name] of Object.entries(socialDomains)) {
          if (linkUrl.hostname.includes(domain)) socialLinksSet.add(name);
        }
      }
    } catch {
      if (href.startsWith("/")) internalLinkCount++;
    }
  }

  // ── AI Readiness ──────────────────────────────────────────────────
  const hasFaqSchema = jsonLdTypes.includes("FAQPage");
  const hasLocalBusinessSchema = jsonLdTypes.includes("LocalBusiness");
  const hasOrganizationSchema = jsonLdTypes.includes("Organization");
  const detectedAnalytics = detectTools(rawHtml, KNOWN_SCRIPTS.analytics);
  const detectedCrm = detectTools(rawHtml, KNOWN_SCRIPTS.crm);
  const detectedChatbot = detectTools(rawHtml, KNOWN_SCRIPTS.chatbot);

  // ── Conversion ────────────────────────────────────────────────────
  const hasPhone = /tel:|href=["']tel:|\+91[\s\-]?\d/i.test(rawHtml);
  const hasEmail = /mailto:|[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/i.test(
    rawHtml.replace(/<[^>]+>/g, " "),
  );
  const hasWhatsApp = /wa\.me|whatsapp\.com|api\.whatsapp/i.test(rawHtml);
  const formCount = count(rawHtml, /<form\b/gi);

  // CTA keyword links
  const ctaRe = /\b(book|contact|get started|start|free|buy|call|schedule|demo|sign up|subscribe|try|download|register|join)\b/i;
  const anchorTexts = rawHtml.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || [];
  let ctaKeywordLinks = 0;
  for (const a of anchorTexts) {
    const text = a.replace(/<[^>]+>/g, " ").trim();
    if (ctaRe.test(text)) ctaKeywordLinks++;
  }

  const hasPricingPage = /href=["'][^"']*(pricing|price|plans)["']/i.test(rawHtml);

  const bodyText = rawHtml.replace(/<[^>]+>/g, " ");
  const hasSocialProofKeywords = /trusted by|clients|testimonial|review|case study|partner|award/i.test(bodyText);

  // ── Competitive / Brand ───────────────────────────────────────────
  const stripped = rawHtml
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const contentWordCount = stripped.split(/\s+/).filter((w) => w.length > 1).length;

  const hasAboutPage = /href=["'][^"']*about/i.test(rawHtml);
  const hasContactPage = /href=["'][^"']*contact/i.test(rawHtml);
  const hasBlog = /href=["'][^"']*(blog|notebook|article|news)/i.test(rawHtml);
  const hasGoogleMapsEmbed = /google\.com\/maps\/embed|maps\.google\.com\/maps/i.test(rawHtml);

  const currentYear = new Date().getFullYear();
  const prevYear = currentYear - 1;
  const copyrightRe = new RegExp(`(?:©|copyright)\\s*(${currentYear}|${prevYear})`, "i");
  const footerCopyrightCurrent = copyrightRe.test(bodyText);

  // ── Accessibility ─────────────────────────────────────────────────
  const langMatch2 = rawHtml.match(/<html[^>]*\blang=["']([^"']*)["']/i);
  const hasLangAttribute = !!langMatch2;
  const hasSkipLink = /skip[^"'<>]{0,20}(content|main|nav)/i.test(rawHtml.slice(0, 5000));

  const semanticTags = ["nav", "main", "header", "footer", "article", "section"];
  const semanticElementsFound = semanticTags.filter(
    (tag) => new RegExp(`<${tag}\\b`, "i").test(rawHtml),
  );
  const ariaAttributeCount = count(rawHtml, /\baria-[a-z]+=["']/gi);

  return {
    isHttps, ttfbMs, htmlSizeBytes, isCompressed,
    hasViewportMeta, hasFavicon, hasCSP,
    renderBlockingStylesheets, renderBlockingScripts, externalScriptCount,

    titleTag, titleLength: titleTag?.length ?? 0,
    metaDescription, metaDescriptionLength: metaDescription?.length ?? 0,
    h1Count: h1Texts.length, h1Text: h1Texts[0] ?? null, headingOrder,
    hasCanonical, hasOgTitle, hasOgDescription, hasOgImage, hasTwitterCard,
    totalImages, imagesWithAlt, imagesWithoutAlt: totalImages - imagesWithAlt,
    internalLinkCount, externalLinkCount,

    hasFaqSchema, hasLocalBusinessSchema, hasOrganizationSchema,
    jsonLdTypes, detectedAnalytics, detectedCrm, detectedChatbot,

    hasPhone, hasEmail, hasWhatsApp, formCount, ctaKeywordLinks,
    hasPricingPage, hasSocialProofKeywords,

    contentWordCount, hasAboutPage, hasContactPage, hasBlog,
    socialLinks: [...socialLinksSet], hasGoogleMapsEmbed, footerCopyrightCurrent,

    hasLangAttribute, hasSkipLink, semanticElementsFound, ariaAttributeCount,
  };
}

// ── Async fetches for robots.txt, sitemap.xml, llms.txt ─────────────

export async function fetchSupportingFiles(baseUrl: string): Promise<{
  hasRobotsTxt: boolean;
  hasSitemapXml: boolean;
  hasLlmsTxt: boolean;
}> {
  const origin = new URL(baseUrl).origin;
  const opts = {
    method: "HEAD" as const,
    signal: AbortSignal.timeout(4000),
    headers: { "User-Agent": "YantrixLabs-AuditBot/1.0" },
  };

  const [robotsRes, sitemapRes, llmsRes] = await Promise.allSettled([
    fetch(`${origin}/robots.txt`, opts),
    fetch(`${origin}/sitemap.xml`, opts),
    fetch(`${origin}/llms.txt`, opts),
  ]);

  return {
    hasRobotsTxt: robotsRes.status === "fulfilled" && robotsRes.value.ok,
    hasSitemapXml: sitemapRes.status === "fulfilled" && sitemapRes.value.ok,
    hasLlmsTxt: llmsRes.status === "fulfilled" && llmsRes.value.ok,
  };
}

export async function fetchPageSpeedSignals(url: string): Promise<{
  performanceScore: number | null;
  lcp: number | null;       // Largest Contentful Paint in ms
  fid: number | null;       // First Input Delay in ms
  cls: number | null;       // Cumulative Layout Shift (decimal)
  fcp: number | null;       // First Contentful Paint in ms
  ttfb: number | null;      // Server response time from PSI
  speedIndex: number | null;
  formatted: {
    lcp: string | null;
    cls: string | null;
    fcp: string | null;
    ttfb: string | null;
    speedIndex: string | null;
  } | null;
} | null> {
  const apiKey = process.env.GOOGLE_PSI_API_KEY;
  if (!apiKey || apiKey === "your_key_here") return null;
  
  try {
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&key=${apiKey}`,
      { signal: AbortSignal.timeout(25000) }
    );
    if (!res.ok) {
      console.log("PSI API failed:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const cats = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;
    const lcp = audits?.['largest-contentful-paint']?.numericValue ?? null;
    const fid = audits?.['total-blocking-time']?.numericValue ?? null;
    const cls = audits?.['cumulative-layout-shift']?.numericValue ?? null;
    const fcp = audits?.['first-contentful-paint']?.numericValue ?? null;
    const ttfb = audits?.['server-response-time']?.numericValue ?? null;
    const speedIndex = audits?.['speed-index']?.numericValue ?? null;

    const formatMs = (ms: number | null) => ms === null ? null : (ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`);
    const formatCls = (c: number | null) => c === null ? null : c.toFixed(3);

    return {
      performanceScore: Math.round((cats?.performance?.score ?? 0) * 100),
      lcp,
      fid,
      cls,
      fcp,
      ttfb,
      speedIndex,
      formatted: {
        lcp: formatMs(lcp),
        cls: formatCls(cls),
        fcp: formatMs(fcp),
        ttfb: formatMs(ttfb),
        speedIndex: formatMs(speedIndex),
      }
    };
  } catch (e) { 
    console.log("PSI fetch error:", e);
    return null; 
  }
}

export function computeDeterministicScores(signals: AuditSignals): {
  technical: number;
  seo: number;
  aiReadiness: number;
  conversion: number;
} {
  const altCoverage = signals.totalImages > 0
    ? signals.imagesWithAlt / signals.totalImages
    : 1;

  // TECHNICAL (out of 100)
  let tech = 100;
  if (signals.psiSignals?.performanceScore) {
    // If PSI data is available, override the technical score base with the PSI performance score directly
    tech = signals.psiSignals.performanceScore;
  } else {
    if (!signals.isHttps) tech -= 25;
    
    // Use PSI TTFB if available, otherwise fallback to standard TTFB calculation
    const ttfb = signals.psiSignals?.ttfb ?? signals.ttfbMs;
    if (ttfb > 2000) tech -= 20;
    else if (ttfb > 800) tech -= 10;
    
    if (!signals.hasViewportMeta) tech -= 15;
    if (!signals.hasFavicon) tech -= 5;
    if (!signals.isCompressed) tech -= 10;
    if (!signals.hasCSP) tech -= 5;
    if (signals.externalScriptCount > 10) tech -= 10;
    else if (signals.externalScriptCount > 6) tech -= 5;
    if (altCoverage < 0.7) tech -= 10;
  }

  // SEO (out of 100)
  let seo = 100;
  if (!signals.titleTag) seo -= 20;
  else if (signals.titleLength < 30 || signals.titleLength > 70) seo -= 10;
  if (!signals.metaDescription) seo -= 15;
  else if (signals.metaDescriptionLength < 100 || signals.metaDescriptionLength > 160) seo -= 5;
  if (signals.h1Count !== 1) seo -= 15;
  if (!signals.hasCanonical) seo -= 10;
  if (!signals.hasOgTitle || !signals.hasOgImage) seo -= 10;
  if (!signals.hasRobotsTxt) seo -= 5;
  if (!signals.hasSitemapXml) seo -= 5;
  if (signals.jsonLdTypes.length === 0) seo -= 10;
  if (altCoverage < 0.9) seo -= 5;

  // AI READINESS (starts at 20 base, additive)
  let ai = 20;
  if (signals.detectedAnalytics.length > 0) ai += 10;
  if (signals.detectedCrm.length > 0) ai += 20;
  if (signals.detectedChatbot.length > 0) ai += 15;
  if (signals.hasLlmsTxt) ai += 15;
  if (signals.hasFaqSchema) ai += 10;
  if (signals.hasOrganizationSchema || signals.hasLocalBusinessSchema) ai += 10;

  // CONVERSION (out of 100)
  let conv = 50;
  if (signals.hasPhone) conv += 10;
  if (signals.hasEmail) conv += 5;
  if (signals.hasWhatsApp) conv += 10;
  if (signals.formCount > 0) conv += 10;
  if (signals.ctaKeywordLinks >= 3) conv += 10;
  else if (signals.ctaKeywordLinks >= 1) conv += 5;
  if (signals.hasSocialProofKeywords) conv += 5;

  return {
    technical: Math.max(0, Math.min(100, tech)),
    seo: Math.max(0, Math.min(100, seo)),
    aiReadiness: Math.max(0, Math.min(100, ai)),
    conversion: Math.max(0, Math.min(100, conv)),
  };
}
