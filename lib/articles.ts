// lib/articles.ts
// Single source of truth for all Notebook articles.
// Add new articles here — pages and listing auto-update.

export type SectionType =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; content: string }
  | { type: "list"; items: string[] }
  | { type: "blockquote"; content: string };

export interface Article {
  slug: string;
  category: string;
  categoryColor: "amber" | "blue" | "teal";
  readTime: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  sections: SectionType[];
  metaTitle: string;
  metaDescription: string;
}

export const ARTICLES: Article[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // ARTICLE 01
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "why-most-ai-pilots-never-reach-production",
    category: "AI Systems",
    categoryColor: "amber",
    readTime: "8 min",
    title: "Why most AI pilots never reach production",
    subtitle:
      "An honest breakdown of where AI projects stall — and the short-loop pattern we use to ship into real workflows quickly.",
    publishedAt: "June 2025",
    metaTitle:
      "Why Most AI Pilots Never Reach Production | Yantrix Labs",
    metaDescription:
      "Discover the real reasons AI pilots stall before deployment — and the practical short-loop pattern Yantrix Labs uses to get AI into production in weeks, not quarters.",
    sections: [
      {
        type: "paragraph",
        content:
          "Most AI projects don't fail in production. They die in the demo phase, right after everyone in the room nods enthusiastically and someone says 'let's pilot this.'",
      },
      {
        type: "paragraph",
        content:
          "After helping dozens of businesses attempt to bring AI into their operations, we've seen the same failure patterns repeat with striking consistency. The technology isn't the problem. The gap between a promising pilot and a deployed, running AI system is almost entirely organizational — and it's predictable.",
      },
      {
        type: "heading",
        level: 2,
        content: "The pilot trap: why 'we'll test it first' kills momentum",
      },
      {
        type: "paragraph",
        content:
          "There's a well-intentioned instinct to pilot AI in isolation: build a demo, show stakeholders, get sign-off, then scale. This feels responsible. It's actually a slow death.",
      },
      {
        type: "paragraph",
        content:
          "Pilots detached from real workflows don't produce real signal. You test a lead scoring model on a spreadsheet. It looks great. Then you try to connect it to your actual CRM, which uses custom fields, has 18 months of inconsistent data, and is managed by three people who all name companies differently. The demo never prepared you for any of that.",
      },
      {
        type: "blockquote",
        content:
          "A pilot that doesn't run on real data, in real conditions, connected to real downstream systems, isn't a pilot. It's a presentation.",
      },
      {
        type: "paragraph",
        content:
          "By the time you've discovered this, the project champion has moved to a different priority, the budget cycle has reset, and the engineering team who built the demo is on something else. The AI implementation never launches.",
      },
      {
        type: "heading",
        level: 2,
        content: "The three real reasons AI pilots stall",
      },
      {
        type: "paragraph",
        content:
          "We've built and diagnosed enough of these to have strong opinions on what actually kills AI production deployment:",
      },
      {
        type: "list",
        items: [
          "Integration complexity is underestimated. 'We'll just plug it into our CRM' turns into a six-week integration project. APIs are undocumented. Data is messy. Middleware is held together with duct tape. Nobody mapped the real data flow before starting.",
          "Ownership isn't assigned. The pilot gets built by an external team or internal technical resource, then handed off to a business team that doesn't know how to maintain it, debug it, or adapt it when the workflow changes. It runs for two weeks, breaks, and nobody knows who to call.",
          "The success metric is wrong. Pilots are often measured on 'does the AI output look correct?' — not on 'did this actually change a business outcome?' When you can't measure the right thing, you can't get buy-in to continue.",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "What the AI implementation graveyard actually looks like",
      },
      {
        type: "paragraph",
        content:
          "Here's a real scenario we've walked into more than once: A B2B agency built an AI content personalization tool over three months. It worked brilliantly in testing. By the time they tried to run it on live leads, they discovered their lead data didn't include the industry field the model needed, their writers had no idea how to use the output, and the approval workflow added more time than just writing manually.",
      },
      {
        type: "paragraph",
        content:
          "The AI was technically capable. The system around it wasn't ready. And nobody had mapped that system before building.",
      },
      {
        type: "heading",
        level: 2,
        content: "The short-loop pattern: ship into the real workflow first",
      },
      {
        type: "paragraph",
        content:
          "The pattern we use at Yantrix Labs inverts the typical approach. Instead of building a pilot and then trying to integrate it, we start with the integration.",
      },
      {
        type: "list",
        items: [
          "Map the live workflow first. Before writing a line of code, we trace exactly what happens in the process we're automating — inputs, outputs, edge cases, the people involved, the tools they use, and where decisions get made.",
          "Identify the one narrow automation that proves value fastest. Not 'automate hiring', but 'automatically filter out applicants who don't meet three specific criteria and flag the rest for review.' Narrow scope, fast loop.",
          "Run on live data from day one. Synthetic data protects egos. Real data reveals the actual problem. We'd rather find the messy edge case in week one than week twelve.",
          "Measure a business outcome, not AI performance. We define success as: 'recruiter time spent on initial screening dropped from 4 hours/week to under 1.' Not 'the model achieves 89% precision.'",
          "Assign an internal owner before we leave. Every system we deploy has a named person internally who understands it, can update the basic logic, and knows when to call us.",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Why this produces AI that reaches production",
      },
      {
        type: "paragraph",
        content:
          "Short loops catch real problems fast. When you're shipping narrow, real, measured automation into an actual workflow, the failure surface is small. You find the integration issue in week one, not week eight. You discover the data quality problem before you've built on top of it.",
      },
      {
        type: "paragraph",
        content:
          "And because you're measuring a real business metric from the start, stakeholders can see value before the project stalls. That keeps momentum alive, which keeps budget alive, which keeps the project alive.",
      },
      {
        type: "blockquote",
        content:
          "The goal isn't to build impressive AI. It's to change something that matters — and do it in days, not quarters.",
      },
      {
        type: "heading",
        level: 2,
        content: "What this means for your next AI project",
      },
      {
        type: "paragraph",
        content:
          "If you're planning an AI implementation, ask yourself these questions before scoping anything:",
      },
      {
        type: "list",
        items: [
          "Have you mapped the actual workflow you're automating — including the messy human steps?",
          "Do you know what data the AI will need, where it lives today, and how clean it is?",
          "Have you picked a single narrow metric that proves value in under four weeks?",
          "Does someone internally own this after it launches?",
        ],
      },
      {
        type: "paragraph",
        content:
          "If you can't answer all four, you're not ready to build — you're ready to map. That mapping phase isn't a delay. It's what separates AI that ships from AI that sits in a Notion doc labeled 'Phase 2.'",
      },
      {
        type: "paragraph",
        content:
          "At Yantrix Labs, the first thing we do with any AI project is this exact workflow mapping exercise. It's why our systems reach production instead of dying in pilot.",
      },
      {
        type: "paragraph",
        content:
          "If you want to talk through your specific situation — the workflow you're trying to automate, the system you want to build, the integration complexity you're worried about — we offer a free 30-minute website and AI audit. No pitch, just a useful conversation.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICLE 02
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "automations-that-compound-not-just-save-time",
    category: "Operations",
    categoryColor: "blue",
    readTime: "6 min",
    title: "Automations that compound, not just save time",
    subtitle:
      "Time-saved is the floor, not the ceiling. Here's how we design AI workflows that reinvest hours into pipeline, retention, and margin.",
    publishedAt: "June 2025",
    metaTitle:
      "Automations That Compound, Not Just Save Time | Yantrix Labs",
    metaDescription:
      "Most business automation just saves time. The best automation reinvests it. Learn how Yantrix Labs designs AI workflows that compound into pipeline, retention, and margin.",
    sections: [
      {
        type: "paragraph",
        content:
          "If your automation is just saving time, you're leaving the most valuable part on the table.",
      },
      {
        type: "paragraph",
        content:
          "Time-saved is real value. A hiring screener that eliminates four hours of weekly candidate review is genuinely useful — that's 16 hours a month returned to your team. But that's the floor. The businesses we work with that see the biggest ROI from AI workflow design treat saved time as an input, not an outcome.",
      },
      {
        type: "heading",
        level: 2,
        content: "The reinvestment question no one asks",
      },
      {
        type: "paragraph",
        content:
          "When you save four hours a week from screening candidates manually, where do those hours go? If the answer is 'into other admin work,' the automation compounded into nothing. If the answer is 'into better candidate conversations, which improved our offer acceptance rate,' now you're looking at compounding returns.",
      },
      {
        type: "paragraph",
        content:
          "This isn't abstract philosophy. When we design automations, we ask the reinvestment question explicitly before scoping anything: if this automation works perfectly, what does the team do with the capacity it creates?",
      },
      {
        type: "blockquote",
        content:
          "Automation that doesn't change what your team does next isn't transformational — it's operational. Both are valuable, but only one compounds.",
      },
      {
        type: "heading",
        level: 2,
        content: "Three ways automation ROI actually compounds",
      },
      {
        type: "paragraph",
        content:
          "In practice, we see automation create compounding returns through three mechanisms:",
      },
      {
        type: "list",
        items: [
          "Pipeline reinvestment: Hours saved from manual prospecting or lead qualification get reinvested into outreach. More time in front of better-qualified leads means more pipeline without adding headcount. Our Client Scout deployment for a B2B agency freed their sales team from 6 hours of weekly list-building. They reinvested that time into personalized outreach sequences — and pipeline grew.",
          "Retention through response speed: Customers who don't hear back quickly either defect or lose temperature. Automating follow-up calls, confirmations, and check-ins means your business responds at machine speed without sacrificing the human feel. The compounding effect: lower churn, higher LTV, more referrals.",
          "Margin through throughput: When your team isn't doing repetitive high-volume work, they can handle more complex, higher-value work at the same headcount. This is how automation scales margin — not by replacing people, but by changing what they spend time on.",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "A concrete example: the calling assistant compound effect",
      },
      {
        type: "paragraph",
        content:
          "A services business we work with used to have their ops team manually calling clients to confirm appointments. Two staff members, roughly three hours each per week — six hours total, 24 hours a month of manual confirmation calls.",
      },
      {
        type: "paragraph",
        content:
          "We deployed an AI Calling Assistant to handle confirmations and reminders. The direct saving was 24 staff hours per month. But here's where it compounded: the two ops people reinvested their time into upsell conversations with existing clients. Within 90 days, upsell revenue had increased enough to justify the entire automation investment many times over.",
      },
      {
        type: "paragraph",
        content:
          "The automation didn't generate that revenue. The humans did — because they had the capacity to have conversations that previously got crowded out by admin.",
      },
      {
        type: "heading",
        level: 2,
        content: "How to design automation that compounds",
      },
      {
        type: "paragraph",
        content:
          "The design principles we apply when building AI workflows for compounding ROI:",
      },
      {
        type: "list",
        items: [
          "Automate the repetitive, not the relational. Confirmations, screening, follow-up reminders, data entry — these are high-volume, low-judgment tasks. They should be automated. Consultative conversations, negotiations, complex problem-solving — these shouldn't be. The line is where human judgment starts mattering.",
          "Route the freed capacity explicitly. Don't assume time saved will be reinvested well. Define upfront what the team will do differently when the automation runs. Make it part of the automation design, not an afterthought.",
          "Build feedback loops. Automations that don't learn from their own outputs plateau. The best AI workflows capture data about what's working and route that back into improving the system — whether that's adjusting a scoring model, refining a call script, or updating a lead source.",
          "Measure downstream metrics, not just operational ones. Track what changes after the automation runs, not just how efficiently the automation runs. Pipeline velocity, conversion rate, customer retention — these are the compounding signals.",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "The uncomfortable truth about most automation projects",
      },
      {
        type: "paragraph",
        content:
          "Most businesses automate to reduce cost. That's valid. But the businesses that get dramatically outsized returns from AI workflow design are the ones that treat automation as a capacity generator — a way to do more of the right things, not just fewer of the wrong ones.",
      },
      {
        type: "paragraph",
        content:
          "This requires a different conversation at the start of every automation project. Not 'how much time will this save?' but 'what will we do with that time?' — and then building the system, the processes, and the accountability around that answer.",
      },
      {
        type: "paragraph",
        content:
          "If you want to talk through the automation ROI picture for your business — what to automate, in what order, and what the reinvestment strategy looks like — we offer a free 30-minute website and AI audit. No pitch, just a useful conversation.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICLE 03
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "what-a-modern-marketing-site-actually-looks-like",
    category: "Modern Web",
    categoryColor: "teal",
    readTime: "5 min",
    title: "What a modern marketing site actually looks like",
    subtitle:
      "From rendering strategy to interaction language — the patterns we ship when a brand is overdue for an upgrade.",
    publishedAt: "June 2025",
    metaTitle:
      "What a Modern Marketing Site Actually Looks Like | Yantrix Labs",
    metaDescription:
      "Stop building brochure sites. Learn the patterns Yantrix Labs uses for modern marketing websites in 2025 — rendering strategy, interaction design, and what actually converts.",
    sections: [
      {
        type: "paragraph",
        content:
          "Most marketing websites aren't bad because of a visual taste problem. They're bad because they were built by people optimizing for 'looks professional' rather than 'works for the business.'",
      },
      {
        type: "paragraph",
        content:
          "The gap between a forgettable marketing site and one that makes a prospect think 'these people are exactly who I need' isn't massive budgets or agency prestige. It's a handful of precise decisions about rendering, interaction, and what the site actually communicates.",
      },
      {
        type: "heading",
        level: 2,
        content: "Rendering strategy is a business decision, not a technical one",
      },
      {
        type: "paragraph",
        content:
          "The first question we ask when rebuilding a marketing site isn't 'what should it look like?' It's 'who needs to find this, and how fast does it need to respond?'",
      },
      {
        type: "paragraph",
        content:
          "For most marketing sites, that answer points to static generation with selective hydration — the page content renders server-side at build time, loads instantly, and only the interactive components (forms, tabs, animations) get JavaScript. This approach has real, measurable impact: load speed affects both SEO ranking and the first impression a visitor forms in the first 400 milliseconds.",
      },
      {
        type: "blockquote",
        content:
          "Your website redesign in 2025 that still serves a 4-second load on mobile isn't a modern marketing site. It's an expensive brochure.",
      },
      {
        type: "heading",
        level: 2,
        content: "The interaction language of premium brands",
      },
      {
        type: "paragraph",
        content:
          "Interaction design on a marketing site communicates brand quality before a visitor reads a single word. The way elements enter, respond to scroll, and react to hover tells a visitor whether this business pays attention to detail.",
      },
      {
        type: "paragraph",
        content:
          "What we consistently ship that moves the perception needle:",
      },
      {
        type: "list",
        items: [
          "Entrance animations with genuine easing curves — not the default CSS ease or a bounce effect, but custom cubic beziers that feel like physical objects settling into place.",
          "Scroll-driven reveals that feel intentional rather than gimmicky. Each section appears as the visitor earns it, not as a cascade of things flying in from every direction.",
          "Hover states that reward attention. Buttons, cards, and links that respond to cursor interaction create a subconscious sense of responsiveness that generic sites completely miss.",
          "Subtle micro-detail: the cursor changing on interactive elements, section transitions that carry color intent, typography that shifts weight at the right moment.",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "What conversion-focused design actually means",
      },
      {
        type: "paragraph",
        content:
          "Conversion-focused doesn't mean CTA buttons everywhere and urgency timers. For premium B2B businesses, the conversion event is often 'prospect decides to reach out' — a decision that happens over a series of touchpoints, not one persuasive button.",
      },
      {
        type: "paragraph",
        content:
          "The conversion architecture we apply:",
      },
      {
        type: "list",
        items: [
          "Social proof placed where doubt peaks — not at the top, but right before the ask.",
          "Specificity over superlatives. 'We reduced lead cost by automating ICP scoring' is more convincing than 'we deliver exceptional results.'",
          "One primary action per scroll section. Don't compete with yourself by offering three different paths to take at every point.",
          "A contact path that feels like a conversation, not a form submission. We use WhatsApp links, soft audit CTAs, and low-friction entry points deliberately.",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "The patterns that age badly",
      },
      {
        type: "paragraph",
        content:
          "While we're being honest about what works, we should be equally honest about what we've stopped shipping:",
      },
      {
        type: "list",
        items: [
          "Hero sections that are just a tagline and a stock photo. If your hero communicates the same thing as 200 other sites in your category, it's doing nothing.",
          "Feature grids without outcomes. Nine icons with one-line descriptions doesn't tell a prospect how their life improves. Outcome-first copy always outperforms feature-first.",
          "Testimonial carousels. Nobody reads the fifth testimonial. Three specific, specific quotes beat twelve generic ones every time.",
          "Mobile as an afterthought. More than half of your traffic will see the mobile version first. When it feels like the desktop site squeezed onto a phone, that's a business problem.",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "What 'overdue for an upgrade' actually costs",
      },
      {
        type: "paragraph",
        content:
          "Every month a business runs a website that undersells them, they're losing warm leads to competitors who communicate better — even if those competitors are actually worse at the work. The internet doesn't reward the best operators. It rewards the ones who look the most credible at the moment of consideration.",
      },
      {
        type: "paragraph",
        content:
          "The businesses we help rebuild their web presence consistently find that the improved site changes the quality of the conversations they have, not just the volume. Better first impressions attract better-fit clients, who are easier to close and stay longer.",
      },
      {
        type: "paragraph",
        content:
          "If your site is overdue for an upgrade — or you want an honest assessment of what it's actually communicating to prospects — we offer a free 30-minute website and AI audit. No pitch, just a useful conversation.",
      },
    ],
  },
];

/** Look up a single article by slug. Returns undefined if not found. */
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
