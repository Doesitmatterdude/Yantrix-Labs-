import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { TEAM_MEMBERS, getTeamMemberBySlug } from "@/lib/team";
import { WHATSAPP_LINK } from "@/lib/site-data";

export function generateStaticParams() {
  return TEAM_MEMBERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return {};

  return {
    title: `${member.name} · ${member.role} · Yantrix Labs`,
    description: `Meet ${member.name}, ${member.role} at Yantrix Labs. ${member.tagline} Discover how we build AI systems and websites for businesses.`,
  };
}

const DEPT_COLORS = {
  LEADERSHIP: "bg-brand/15 text-brand border-brand/30",
  ENGINEERING: "bg-brand-cool/15 text-brand-cool border-brand-cool/30",
  GROWTH: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
};

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  const isFounder = member.slug === "founder-partner" || member.slug === "business-partner";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Navigation */}
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <Link
          href="/team"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/50 transition-colors hover:text-foreground"
        >
          ← Back to team
        </Link>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/60 bg-secondary/30 shadow-2xl">
              <img
                src={member.photo}
                alt={member.name}
                className="team-portrait absolute inset-0"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="md:col-span-7 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className={`rounded-full border font-mono text-[10px] uppercase tracking-[0.16em] ${
                  DEPT_COLORS[member.department]
                }`}
              >
                {member.department}
              </Badge>
              
              {isFounder && (
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-500">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Currently shipping
                </div>
              )}
            </div>

            <h1 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              {member.name}
            </h1>
            <p className="mt-2 text-xl font-medium text-foreground/80 sm:text-2xl">
              {member.role}
            </p>
            <p className="mt-4 text-lg italic text-muted-foreground sm:text-xl">
              &ldquo;{member.tagline}&rdquo;
            </p>

            {/* Social Links */}
            {member.social && Object.values(member.social).some(link => link && link !== "#") && (
              <div className="mt-8 flex gap-4">
                {member.social.linkedin && member.social.linkedin !== "#" && (
                  <a href={member.social.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-brand transition-colors">
                    <Linkedin className="size-5" />
                  </a>
                )}
                {member.social.twitter && member.social.twitter !== "#" && (
                  <a href={member.social.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-brand transition-colors">
                    <Twitter className="size-5" />
                  </a>
                )}
                {member.social.github && member.social.github !== "#" && (
                  <a href={member.social.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-brand transition-colors">
                    <Github className="size-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          
          <div className="md:col-span-7">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
              About {member.name.split(" ")[0] || member.name}
            </h2>
            <div className="mt-6 text-lg leading-relaxed text-foreground/80">
              <p>{member.bio}</p>
            </div>
            
            <div className="mt-12 h-px w-full bg-border/40" />

            <h2 className="mt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
              Expertise
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="rounded-md px-3 py-1.5 text-sm font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Contextual Block */}
          <div className="md:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-border/60 bg-secondary/30 p-6 sm:p-8">
              {member.department === "LEADERSHIP" && (
                <>
                  <h3 className="font-display text-2xl tracking-tight">{member.sidebarTitle || "The systems we architect together"}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{member.sidebarDescription || "From discovering the right automation to scaling it."}</p>
                  <Link href="/notebook" className="mt-6 inline-flex items-center gap-2 text-sm text-brand hover:underline">
                    Read the notebook <ArrowUpRight className="size-4" />
                  </Link>
                </>
              )}
              {member.department === "ENGINEERING" && (
                <>
                  <h3 className="font-display text-2xl tracking-tight">{member.sidebarTitle || "Systems we've shipped"}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{member.sidebarDescription || "The actual workflows and products this team has built."}</p>
                  <Link href="/#cases" className="mt-6 inline-flex items-center gap-2 text-sm text-brand hover:underline">
                    View case studies <ArrowUpRight className="size-4" />
                  </Link>
                </>
              )}
              {member.department === "GROWTH" && (
                <>
                  <h3 className="font-display text-2xl tracking-tight">{member.sidebarTitle || "How we bring Yantrix to new clients"}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{member.sidebarDescription || "The best way to see what we can do is to talk about your specific workflow."}</p>
                  <Link href={WHATSAPP_LINK} target="_blank" className="mt-6 inline-flex items-center gap-2 text-sm text-brand hover:underline">
                    Get a free audit <ArrowUpRight className="size-4" />
                  </Link>
                </>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Studio CTA */}
      <section className="border-t border-border/60 bg-secondary/20 px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Want to work with the team?
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href={WHATSAPP_LINK} target="_blank">
              Start a conversation <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full bg-background">
            <Link href="/#services">
              See what we build
            </Link>
          </Button>
        </div>
      </section>

      {/* ProfilePage / Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
              "@type": "Person",
              "@id": `https://yantrixlabs.studio/team/${member.slug}#${member.slug}`,
              "name": member.name,
              "url": `https://yantrixlabs.studio/team/${member.slug}`,
              "jobTitle": member.role,
              "description": member.bio,
              "worksFor": { "@id": "https://yantrixlabs.studio/#organization" },
              "knowsAbout": member.skills,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jaipur",
                "addressRegion": "Rajasthan",
                "addressCountry": "IN"
              },
              "sameAs": member.social 
                ? Object.values(member.social).filter(link => link && link !== "#")
                : []
            }
          })
        }}
      />
    </main>
  );
}
