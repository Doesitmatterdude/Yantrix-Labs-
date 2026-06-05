// Contact details — single source of truth
export const WHATSAPP_NUMBER = "919829842694";
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Yantrix Labs, I'd like to book a free website & AI audit.",
);
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const CONTACT_EMAIL = "hello@yantrixlabs.studio";
export const CONTACT_PHONE_DISPLAY = "+91 98298 42694";

export const ADDRESS = {
  full: "Yantrix Labs, Corporate Tower, C Scheme, Jaipur, India",
  street: "Corporate Tower, C Scheme",
  city: "Jaipur",
  region: "Rajasthan",
  country: "India",
  countryCode: "IN",
  // Used only for SEO / structured data — not rendered on the frontend
  mapsUrl: "https://maps.app.goo.gl/v9ZuX9wMhSLtzVt5A?g_st=ac",
};

// Social links
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/share/1NLMUWjAZF/",
  instagram:
    "https://www.instagram.com/yantrix.labs?utm_source=qr&igsh=ZjYwcjhra21pOTNs",
  linkedin:
    "https://www.linkedin.com/in/yantrix-labs-6a1547414?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  twitter: "https://twitter.com/yantrixlabs",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "AI Systems", href: "#systems" },
  { label: "Case Studies", href: "#cases" },
  { label: "Notebook", href: "#notebook" },
  { label: "About", href: "#about" },
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
      "Automates the first layer of candidate evaluation. Collects answers, applies your scorecard, and surfaces only the applicants who fit your skills, experience, and culture requirements — freeing recruiters from repetitive screening.",
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
    body: "A B2B marketing agency targeting SaaS founders replaced generic lead lists with a tailored Client Scout deployment plus a modernized landing experience.",
    metric: "Sample outcome",
    accent: "brand",
  },
  {
    tag: "Product Co.",
    title: "Hiring funnel that runs while you sleep",
    body: "A growing product company rolled out AI Hiring Screener with a custom scorecard tuned to their culture and technical bar — recruiters now only see serious candidates.",
    metric: "Sample outcome",
    accent: "cool",
  },
  {
    tag: "Services Firm",
    title: "Follow-ups that actually follow up",
    body: "A services business combined AI Calling Assistant with CRM and billing automations to handle confirmations, reminders, and invoices on autopilot.",
    metric: "Sample outcome",
    accent: "brand",
  },
];

export const POSTS = [
  {
    chip: "AI Systems",
    readTime: "8 min",
    title: "Why most AI pilots never reach production",
    excerpt:
      "An honest breakdown of where AI projects stall — and the short-loop pattern we use to ship into real workflows quickly.",
    color: "amber",
  },
  {
    chip: "Operations",
    readTime: "6 min",
    title: "Automations that compound, not just save time",
    excerpt:
      "Time-saved is the floor, not the ceiling. Here's how we design AI workflows that reinvest hours into pipeline, retention, and margin.",
    color: "blue",
  },
  {
    chip: "Modern Web",
    readTime: "5 min",
    title: "What a modern marketing site actually looks like",
    excerpt:
      "From rendering strategy to interaction language — the patterns we ship when a brand is overdue for an upgrade.",
    color: "teal",
  },
];

export const TRUST_BADGES = [
  "10-Person Senior Team",
  "Based in Jaipur, India",
  "Serving Teams Worldwide",
  "AI-Native Studio",
  "Pre-built Systems Ready",
  "Rapid Deployment",
];

export const TRUST_STATS = [
  { value: 10, suffix: "+", label: "Senior team" },
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
