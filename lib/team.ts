export type Department = "LEADERSHIP" | "ENGINEERING" | "GROWTH";

export interface TeamMember {
  slug: string;
  role: string;
  department: Department;
  name: string;
  tagline: string;
  bio: string;
  sidebarTitle?: string;
  sidebarDescription?: string;
  skills: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  photo: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "founder-partner",
    role: "Founder & Business Lead",
    department: "LEADERSHIP",
    name: "Divya Bhatia",
    tagline: "The person who ships when it needs shipping.",
    bio: "Architects the studio's technical foundation — writes clean, scalable systems obsessed with measurable outcomes over clever but brittle code.",
    sidebarTitle: "The systems we architect together",
    sidebarDescription: "Divya designs the core automation infrastructure that powers every Yantrix engagement — from AI pipeline architecture to production-grade deployment decisions.",
    skills: ["AI Systems Architecture", "Full-Stack Engineering", "Product Architecture & Design", "Technical Strategy", "Automation Pipeline Design", "Code Quality & Engineering Standards"],
    social: { linkedin: "#", twitter: "#", github: "#" },
    photo: "/images/team/founder.avif"
  },
  {
    slug: "business-partner",
    role: "Co-Founder & Full Stack Developer",
    department: "LEADERSHIP",
    name: "Rahul Dhariwal",
    tagline: "The person who makes sure the work lands with clients.",
    bio: "Rahul is the Co-Founder of Yantrix Labs and the person who makes sure our technical work lands successfully with clients. He bridges the gap between complex engineering and business strategy, driving client relationships and business development. With a background in full-stack development, Rahul ensures that the AI systems we architect are not just technically sound but are strategically aligned with the growth goals of the startups and B2B teams we serve.",
    skills: ["Client Strategy & Growth", "Full-Stack Engineering", "Business Development", "Technical Project Management", "Operational Workflow Design"],
    social: { linkedin: "#", twitter: "#" },
    photo: "/images/team/partner.avif"
  },
  {
    slug: "dev-01",
    role: "Full-Stack Developer",
    department: "ENGINEERING",
    name: "Parag Choudhary",
    tagline: "Builds the interfaces clients don't forget.",
    bio: "Builds the frontend layer clients interact with daily — performance-first interfaces backed by deep React and Next.js engineering.",
    sidebarTitle: "Systems we've shipped",
    sidebarDescription: "Parag's interfaces are the part of the product clients feel — fast, intuitive, and built to handle real usage without breaking under load.",
    skills: ["React & Next.js Development", "TypeScript & Type-Safe Architecture", "UI Engineering & Component Systems", "Frontend Performance Optimization", "API Integration & State Management", "Responsive & Accessible Design"],
    photo: "/images/team/dev-01.avif"
  },
  {
    slug: "dev-02",
    role: "Backend & Automation Engineer",
    department: "ENGINEERING",
    name: "Rohit",
    tagline: "Makes systems talk to each other reliably.",
    bio: "Connects APIs, databases, and AI workflows into reliable pipelines — the invisible backbone that keeps every Yantrix system running.",
    sidebarTitle: "Systems we've shipped",
    sidebarDescription: "Rohit builds the server-side logic that makes automation actually work in production — reliable integrations, resilient data flows, and AI pipelines that don't drop.",
    skills: ["Python & Node.js Backend Development", "API Design & Third-Party Integratio", "AI Workflow Automation", "DevOps & Deployment Pipelines", "Database Architecture (PostgreSQL, NoSQL)", "System Reliability & Error Handling"],
    photo: "/images/team/dev-02.avif"
  },
  {
    slug: "sales-01",
    role: "Sales & Marketing Head",
    department: "GROWTH",
    name: "Priyanshu Choudhary",
    tagline: "Connects the right businesses to the right systems.",
    bio: "Qualifies, nurtures, and closes — connects businesses with the right automation systems before they even know they need one.",
    sidebarTitle: "How we bring Yantrix to new clients",
    sidebarDescription: "Priyanshu runs every inbound conversation, filtering for fit and readiness — so the engineering team only ever works on clients worth building for.",
    skills: ["B2B Sales & Outreach", "Lead Qualification & Scoring", "Client Success & Onboarding", "CRM Management", "Inbound Marketing", "Early-Stage Engagement Strategy"],
    photo: "/images/team/sales-01.avif"
  }
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.slug === slug);
}
