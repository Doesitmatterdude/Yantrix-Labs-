export interface AuditResult {
  businessName: string;
  overallScore: number;
  scores: {
    technical: number;
    seo: number;
    ai: number;
    conversion: number;
    competitive: number;
  };
  issues: string[];
  recommendations: Array<{ text: string; impact: string }>;
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

const SYSTEM_PROMPT = `You are an expert AI and website auditor. You will receive the raw text scraped from a website. 
Your job is to analyze it across 5 dimensions: Technical Health, SEO, AI Readiness, Conversion Signals, and Competitive Position.
Output STRICTLY a JSON object matching this schema. Do not include markdown code blocks around the JSON.
{
  "businessName": "Extracted Business Name (or Domain if unclear)",
  "overallScore": 65,
  "scores": {
    "technical": 70,
    "seo": 60,
    "ai": 30,
    "conversion": 80,
    "competitive": 85
  },
  "issues": ["List of 3 short, critical issues found (max 10 words each)"],
  "recommendations": [
    { "text": "Actionable recommendation", "impact": "+15 SEO pts" }
  ]
}
Ensure there are exactly 3 issues and 3 recommendations.`;

export async function generateAudit(url: string, text: string): Promise<AuditResult> {
  const truncatedText = text.slice(0, 30000); // Prevent massive payloads
  const userPrompt = `Target URL: ${url}\n\nWebsite Content:\n${truncatedText}`;

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
