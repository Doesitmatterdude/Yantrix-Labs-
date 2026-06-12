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
    tagline: "Rahul manages the bridge between what we build and how it performs inside your actual workflow — from first scoping call to post-deployment iteration.",
    bio: "Rahul co-founded Yantrix Labs to make the gap between a working AI demo and a deployed production system as small as possible. He leads client engagements end-to-end — from scoping the right automation to making sure the final system actually lands in the workflow it was built for. Before Yantrix, he built full-stack applications across SaaS, services, and product companies, developing a pattern for delivery that doesn't sacrifice speed for quality. He's the reason client timelines stay honest.",
    skills: ["Full-Stack Engineering (Next.js, Node.js, APIs)", "Client Engagement & Delivery Management", "Business Development & Commercial Strategy", "System Integration & Deployment", "Technical Project Architecture"],
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
