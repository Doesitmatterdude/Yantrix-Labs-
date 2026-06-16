// Contact details — single source of truth
export const WHATSAPP_NUMBER = "919251111358";
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I'm interested in your services",
);
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const CONTACT_EMAIL = "hello@yantrixlabs.studio";
export const CONTACT_PHONE_DISPLAY = "+91 92511 11358";

export const ADDRESS = {
  full: "Yantrix Labs, Corporate Tower, C Scheme, Jaipur, India",
  street: "Corporate Tower, C Scheme",
  city: "Jaipur",
  region: "Rajasthan",
  country: "India",
  countryCode: "IN",
  // Used only for SEO / structured data — not rendered on the frontend
  mapsUrl: "https://maps.app.goo.gl/rs4tjoxWJun2ekp46?g_st=ac",
};

// Social links
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/yantrix.labs/",
  twitter: "https://x.com/yantrixlabs",
};

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "AI Systems", href: "/#systems" },
  { label: "Case Studies", href: "/#cases" },
  { label: "Free Audit", href: "/ai-audit" },
  { label: "Notebook", href: "/notebook" },
  { label: "About", href: "/#about" },
];

export const HERO_NODES = [
  { id: "core", label: "Yantrix Core", angle: 0, radius: 0, color: "brand" },
  {
    id: "scout",
    label: "Client Scout",
    angle: 0,
    radius: 2.6,
    color: "brand",
    icon: "search",
  },
  {
    id: "hire",
    label: "Hiring Screener",
    angle: 72,
    radius: 2.6,
    color: "cool",
    icon: "filter",
  },
  {
    id: "call",
    label: "Calling Assistant",
    angle: 144,
    radius: 2.6,
    color: "brand",
    icon: "phone",
  },
  {
    id: "auto",
    label: "Custom Automations",
    angle: 216,
    radius: 2.6,
    color: "cool",
    icon: "settings",
  },
  {
    id: "site",
    label: "Web & Products",
    angle: 288,
    radius: 2.6,
    color: "brand",
    icon: "globe",
  },
] as const;

export const OUTCOMES = ["Leads", "Hiring", "Ops", "Revenue"];

export const SYSTEMS = [
  {
    id: "scout",
    name: "Yantrix Client Scout",
    chip: "Lead intelligence",
    description:
      "Discovers and enriches potential leads from targeted, transparent sources we configure together. Scores them against your ICP and attaches source and reasoning to every entry — a far more reliable, lower-cost lead engine than generic lists.",
    outcomes: [
      "Qualified leads scored against your ICP automatically",
      "Source transparency on every single entry",
      "Rapid deployment into your existing workflow",
    ],
    metrics: [
      { label: "Designed to reduce", value: "Lead cost" },
      { label: "Source transparency", value: "100%" },
      { label: "Typical deployment", value: "~2 weeks" },
    ],
  },
  {
    id: "hire",
    name: "AI Hiring Screener",
    chip: "Recruiting ops",
    description:
      "We deployed our AI Hiring Screener for a 40-person product company to automate their backend engineer funnel. The result was an 87% reduction in recruiter time, as the system ensured that only candidates who passed the AI-driven technical screen reached a human reviewer. This system runs while you sleep, ensuring zero unqualified candidates reach your final interview stage.",
    outcomes: [
      "Custom scorecard tuned to your bar",
      "Candidates evaluated around the clock",
      "Recruiters only see serious matches",
    ],
    metrics: [
      { label: "Frees up", value: "Hours/week" },
      { label: "Funnel runs", value: "24/7" },
      { label: "Scorecard fidelity", value: "Yours" },
    ],
  },
  {
    id: "call",
    name: "AI Calling Assistant",
    chip: "Voice ops",
    description:
      "Built to execute specific call flows — reminders, confirmations, follow-ups — using your scripts and tone. It behaves like a focused teammate handling repetitive calls reliably, rather than a generic chatbot on the phone.",
    outcomes: [
      "Reminder and confirmation calls on autopilot",
      "Your scripts, your tone, your brand",
      "CRM updated in real time post-call",
    ],
    metrics: [
      { label: "Designed to improve", value: "Show rates" },
      { label: "Calls / day capacity", value: "1,000+" },
      { label: "CRM updates", value: "Auto" },
    ],
  },
] as const;

export const CASES = [
  {
    tag: "B2B Agency",
    title: "Lead engine rebuilt around intent",
    body: "We recently worked with a B2B SaaS agency to replace their volume-heavy lead lists with our targeted Client Scout system. Within three weeks, they shifted from \"spray-and-pray\" outreach to a pipeline focused entirely on intent. We reviewed 247 potential leads and qualified 31 high-intent prospects, resulting in a 4.2× lift in their qualified pipeline and reducing their time to close to just 18 days.",
    metric: "Sample outcome",
    accent: "brand",
  },
  {
    tag: "Product Co.",
    title: "Hiring funnel that runs while you sleep",
    body: "A 40-person product company rolled out AI Hiring Screener tuned to their technical bar. Recruiters now only review candidates who've already passed an AI-driven screen.",
    metric: "Sample outcome",
    accent: "cool",
  },
  {
    tag: "Services Firm",
    title: "Follow-ups that actually follow up",
    body: "A professional services firm plugged in AI Calling Assistant with CRM and billing hooks. No-shows dropped. Revenue per staff hour climbed.",
    metric: "Sample outcome",
    accent: "brand",
  },
];

export const POSTS = [
  {
    slug: "why-most-ai-pilots-never-reach-production",
    chip: "AI Systems",
    readTime: "8 min",
    title: "Why most AI pilots never reach production",
    excerpt:
      "An honest breakdown of where AI projects stall — and the short-loop pattern we use to ship into real workflows quickly.",
    color: "amber",
  },
  {
    slug: "automations-that-compound-not-just-save-time",
    chip: "Operations",
    readTime: "6 min",
    title: "Automations that compound, not just save time",
    excerpt:
      "Time-saved is the floor, not the ceiling. Here's how we design AI workflows that reinvest hours into pipeline, retention, and margin.",
    color: "blue",
  },
  {
    slug: "what-a-modern-marketing-site-actually-looks-like",
    chip: "Modern Web",
    readTime: "5 min",
    title: "What a modern marketing site actually looks like",
    excerpt:
      "From rendering strategy to interaction language — the patterns we ship when a brand is overdue for an upgrade.",
    color: "teal",
  },
  {
    slug: "ai-automation-agency-jaipur",
    chip: "Commercial",
    readTime: "4 min",
    title: "AI Automation Agency in Jaipur",
    excerpt: "Looking for an AI product studio in Jaipur? Here's why local execution matters for global scale.",
    color: "amber",
  },
  {
    slug: "custom-ai-lead-generation",
    chip: "Lead Gen",
    readTime: "5 min",
    title: "Custom AI Lead Generation",
    excerpt: "Discover how Client Scout identifies, scores, and qualifies high-intent B2B leads on autopilot.",
    color: "blue",
  },
  {
    slug: "automate-candidate-screening",
    chip: "HR Ops",
    readTime: "4 min",
    title: "Automate Candidate Screening",
    excerpt: "How to use an AI Hiring Screener to reduce recruiter review time by 87% without missing top talent.",
    color: "teal",
  },
];

export const TRUST_BADGES = [
  "Senior studio based in Jaipur",
  "Based in Jaipur, India",
  "Serving Teams Worldwide",
  "AI-Native Studio",
  "Pre-built Systems Ready",
  "Rapid Deployment",
];

export const TRUST_STATS = [
  { value: 100, suffix: "%", label: "In-house engineering" },
  { value: 3, suffix: "", label: "Pre-built AI systems" },
  { value: 24, suffix: "/7", label: "Systems in production" },
  { value: 1, suffix: "", label: "Studio · Jaipur, India" },
];

export const PRINCIPLES = [
  { n: "01", text: "Ship fast, then iterate." },
  { n: "02", text: "Use what we deploy ourselves." },
  { n: "03", text: "Every line of code moves a metric." },
  { n: "04", text: "AI is a tool, not the product." },
];
