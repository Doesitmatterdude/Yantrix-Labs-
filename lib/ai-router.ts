import type { AuditSignals } from "@/lib/html-analyzer";

export interface AuditResult {
  businessName: string;
  overallScore: number;
  scores: {
    technical: { score: number; reason: string };
    seo: { score: number; reason: string };
    ai: { score: number; reason: string };
    conversion: { score: number; reason: string };
    competitive: { score: number; reason: string };
  };
  issues: string[];
  recommendations: Array<{ text: string; impact: string }>;
  signalsSummary?: string;
}

type ProviderType = "openai" | "gemini";

interface Provider {
  name: string;
  type: ProviderType;
  baseUrl: string;
  model: string;
  getApiKey: () => string | undefined;
}

const providers: Provider[] = [
  {
    name: "Google Gemini",
    type: "gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
    model: "gemini-3.5-flash",
    getApiKey: () => process.env.GEMINI_API_KEY,
  },
  {
    name: "Groq",
    type: "openai",
    baseUrl: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",
    getApiKey: () => process.env.GROQ_API_KEY,
  },
  {
    name: "DeepSeek",
    type: "openai",
    baseUrl: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-chat",
    getApiKey: () => process.env.DEEPSEEK_API_KEY,
  },
  {
    name: "Cerebras",
    type: "openai",
    baseUrl: "https://api.cerebras.ai/v1/chat/completions",
    model: "llama3.1-8b",
    getApiKey: () => process.env.CEREBRAS_API_KEY,
  },
  {
    name: "GitHub Models",
    type: "openai",
    baseUrl: "https://models.inference.ai.azure.com/chat/completions",
    model: "gpt-4o-mini",
    getApiKey: () => process.env.GITHUB_TOKEN,
  },
  {
    name: "Mistral AI",
    type: "openai",
    baseUrl: "https://api.mistral.ai/v1/chat/completions",
    model: "mistral-small-latest",
    getApiKey: () => process.env.MISTRAL_API_KEY,
  },
  {
    name: "OpenRouter",
    type: "openai",
    baseUrl: "https://openrouter.ai/api/v1/chat/completions",
    model: "nex-agi/nex-n2-pro:free",
    getApiKey: () => process.env.OPENROUTER_API_KEY,
  },
  {
    name: "Hugging Face",
    type: "openai",
    baseUrl: "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct/v1/chat/completions",
    model: "meta-llama/Meta-Llama-3-8B-Instruct",
    getApiKey: () => process.env.HUGGINGFACE_API_KEY,
  }
];

const SYSTEM_PROMPT = `You are an expert website auditor for Yantrix Labs. You receive THREE inputs:

INPUT A — FACTUAL SIGNALS (machine-measured, 100% accurate, do not contradict these):
A JSON object with deterministic measurements from the website.

INPUT B — WEBSITE TEXT CONTENT:
The stripped text of the page for qualitative analysis.

INPUT C — PRE-COMPUTED SCORES:
A JSON object with strictly computed deterministic scores for Technical, SEO, AI Readiness, and Conversion.

Your job:
1. For technical, seo, ai, and conversion: YOU MUST USE THE EXACT NUMBERS from INPUT C. Do not change them.
2. For competitive: Compute a qualitative evaluation (0-100) based on content word count, blog presence, about/contact/team pages, social links, brand clarity, and copyright current.
3. Provide a 1-sentence "reason" for EACH score explaining why it received that score based on the signals in INPUT A. For the "technical" score reason, you MUST explicitly include the exact phrase "Measured with Lighthouse" if PSI data exists, or "Estimated without Lighthouse" if it does not.
4. Calculate the overallScore = technical*0.25 + seo*0.25 + ai*0.15 + conversion*0.20 + competitive*0.15 (rounded).
5. Generate a "signalsSummary" field: 1–2 plain English sentences summarizing what the engine detected. If PSI data is available in INPUT A (under psiSignals), you MUST append "Google PageSpeed score: [performanceScore]/100. LCP: [formatted.lcp], CLS: [formatted.cls]." to the summary.

Output STRICTLY a JSON object. No markdown code blocks.
{
  "businessName": "Extracted Business Name",
  "overallScore": 65,
  "scores": {
    "technical": { "score": 70, "reason": "TTFB of 1.8s is borderline — consider upgrading hosting. HTTPS is active." },
    "seo": { "score": 60, "reason": "Strong title tag and single H1, but no Open Graph image found for social sharing." },
    "ai": { "score": 30, "reason": "Google Analytics detected but no CRM, no chatbot, and no llms.txt file." },
    "conversion": { "score": 80, "reason": "Phone number is present but no WhatsApp link and only 1 CTA button detected." },
    "competitive": { "score": 85, "reason": "Content is strong but no blog detected and social media links are missing." }
  },
  "issues": ["5 issues ranked by severity, max 12 words each"],
  "recommendations": [{ "text": "Actionable recommendation", "impact": "+15 SEO pts" }],
  "signalsSummary": "Plain English summary of detected signals."
}
Provide exactly 5 issues and 5 recommendations.`;

export async function generateAudit(url: string, text: string, signals?: AuditSignals, deterministicScores?: any): Promise<AuditResult> {
  const truncatedText = text.slice(0, 15000);
  const userPrompt = signals && deterministicScores
    ? `Target URL: ${url}\n\nINPUT A — FACTUAL SIGNALS:\n${JSON.stringify(signals, null, 2)}\n\nINPUT B — WEBSITE TEXT CONTENT:\n${truncatedText}\n\nINPUT C — PRE-COMPUTED SCORES:\n${JSON.stringify(deterministicScores, null, 2)}`
    : `Target URL: ${url}\n\nWebsite Content:\n${truncatedText}`;

  const availableProviders = providers.filter(p => p.getApiKey());
  
  if (availableProviders.length === 0) {
    throw new Error("No AI providers configured. Please add an API key to your environment variables.");
  }

  for (const provider of availableProviders) {
    try {
      console.log(`[AI Router] Attempting analysis with ${provider.name} (${provider.model})...`);
      
      let rawJson = "";

      if (provider.type === "gemini") {
        const res = await fetch(`${provider.baseUrl}/${provider.model}:generateContent?key=${provider.getApiKey()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(15000),
          body: JSON.stringify({
            system_instruction: { parts: { text: SYSTEM_PROMPT } },
            contents: [{ parts: [{ text: userPrompt }] }],
            generationConfig: { response_mime_type: "application/json" }
          })
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
        const data = await res.json();
        rawJson = data.candidates[0].content.parts[0].text;
      } 
      
      else if (provider.type === "openai") {
        const res = await fetch(provider.baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${provider.getApiKey()}`
          },
          signal: AbortSignal.timeout(15000),
          body: JSON.stringify({
            model: provider.model,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.1
          })
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
        const data = await res.json();
        rawJson = data.choices[0].message.content;
      }

      // Cleanup markdown if a model ignored the instruction
      rawJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsed = JSON.parse(rawJson) as AuditResult;
      
      // Basic validation
      if (typeof parsed.overallScore !== 'number' || !parsed.scores) {
        throw new Error("Invalid schema returned by LLM");
      }

      console.log(`[AI Router] Success using ${provider.name}!`);
      return parsed;

    } catch (error) {
      console.warn(`[AI Router] Provider ${provider.name} failed:`, (error as Error).message);
      // Automatically loops to the next provider
      continue;
    }
  }

  throw new Error("All configured AI providers failed. Rate limits or service downtime might be affecting the system.");
}
