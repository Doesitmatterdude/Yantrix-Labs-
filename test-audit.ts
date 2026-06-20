import { analyzeHtml, fetchSupportingFiles, fetchPageSpeedSignals, computeDeterministicScores } from "./lib/html-analyzer";
import { generateAudit } from "./lib/ai-router";

async function test() {
  const url = "https://drrenudentalclinic.com/";
  console.log(`Fetching ${url}...`);
  
  const startTime = Date.now();
  const response = await fetch(url, {
    headers: { "User-Agent": "YantrixLabs-AuditBot/1.0" },
    signal: AbortSignal.timeout(8000),
  });
  const responseTimeMs = Date.now() - startTime;
  const rawHtml = await response.text();
  const headers: Record<string, string> = {};
  response.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });

  const signals = analyzeHtml(rawHtml, url, responseTimeMs, headers);
  const [supporting, psiRes] = await Promise.allSettled([
    fetchSupportingFiles(url),
    fetchPageSpeedSignals(url)
  ]);

  const finalSignals = {
    ...signals,
    hasRobotsTxt: supporting.status === "fulfilled" ? supporting.value.hasRobotsTxt : false,
    hasSitemapXml: supporting.status === "fulfilled" ? supporting.value.hasSitemapXml : false,
    hasLlmsTxt: supporting.status === "fulfilled" ? supporting.value.hasLlmsTxt : false,
    psiSignals: psiRes.status === "fulfilled" ? psiRes.value : null
  };

  const cleanText = rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  console.log("Calling generateAudit...");
  const deterministicScores = computeDeterministicScores(finalSignals as any);
  const auditResult = await generateAudit(url, cleanText, finalSignals as any, deterministicScores);
  const result = {
    "technical score": auditResult.scores.technical.score,
    "technical reason": auditResult.scores.technical.reason,
    "signalsSummary": auditResult.signalsSummary,
    "technical badge/sublabel text": finalSignals.psiSignals 
      ? "Powered by Google Lighthouse" 
      : "Estimated from on-page technical signals"
  };
  console.log(JSON.stringify(result, null, 2));
}

test().catch(console.error);
