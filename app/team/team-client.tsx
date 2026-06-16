"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { TEAM_MEMBERS, type Department } from "@/lib/team";

import { WHATSAPP_LINK } from "@/lib/site-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DEPARTMENTS: { label: string; value: Department | "ALL" }[] = [
  { label: "ALL", value: "ALL" },
  { label: "LEADERSHIP", value: "LEADERSHIP" },
  { label: "ENGINEERING", value: "ENGINEERING" },
  { label: "GROWTH", value: "GROWTH" },
];

const DEPT_COLORS = {
  LEADERSHIP: "bg-brand/15 text-brand border-brand/30",
  ENGINEERING: "bg-brand-cool/15 text-brand-cool border-brand-cool/30",
  GROWTH: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
};

const VALUES = [
  "SHIP FAST, ITERATE OFTEN",
  "USE WHAT WE DEPLOY",
  "EVERY LINE MOVES A METRIC",
  "AI IS A TOOL, NOT THE PRODUCT"
];

// Animated Counter Component
function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const totalDuration = 1000;
    const incrementTime = (totalDuration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

export function TeamClient() {
  const [activeFilter, setActiveFilter] = useState<Department | "ALL">("ALL");

  const filteredMembers = TEAM_MEMBERS.filter(
    (m) => activeFilter === "ALL" || m.department === activeFilter
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden border-b border-border/60 pb-20 pt-32 sm:pb-32 sm:pt-40">
        <div className="absolute inset-0 grid-bg opacity-[0.03]" />
        {/* Subtle glow */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl">
          <div className="h-[400px] w-[800px] rounded-full bg-brand" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              aria-label="Go back to Yantrix Labs homepage"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-transparent px-5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-border hover:bg-secondary/30 hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              Back to Home
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand"
          >
            THE PEOPLE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-balance font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Built by people who <br />
            <span className="italic text-brand">ship things that work.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            <AnimatedCounter value={TEAM_MEMBERS.length} /> specialists across engineering, growth, and strategy.
            Based in Jaipur — working with teams worldwide.
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="relative bg-secondary/20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          
          {/* Filters */}
          <div className="mb-12 flex flex-wrap items-center gap-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.value}
                onClick={() => setActiveFilter(dept.value)}
                className={`relative rounded-full border px-5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-all ${
                  activeFilter === dept.value
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border/60 bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>

          {/* Asymmetric Grid */}
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12`}>
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member, i) => {
                // Asymmetric logic when ALL is selected
                let spanClass = "lg:col-span-4"; // default standard
                if (activeFilter === "ALL") {
                  if (member.department === "LEADERSHIP") spanClass = "lg:col-span-6"; // large
                  else if (member.department === "ENGINEERING") {
                    // First engineering gets full width on desktop if it helps the layout, or we keep them col-span-4.
                    // We'll give them lg:col-span-4 to fit 3 perfectly.
                    spanClass = "lg:col-span-4";
                  } else {
                    spanClass = "lg:col-span-4";
                  }
                }

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    key={member.slug}
                    className={`group relative ${spanClass}`}
                  >
                    <Link href={`/team/${member.slug}`} className="block h-full">
                      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-brand/40 hover:shadow-[0_16px_40px_-20px_var(--brand-glow)]">
                        {/* Image Block */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/50 sm:aspect-[3/2] lg:aspect-auto lg:h-[320px]">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="team-portrait absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/20" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                            <span className="flex items-center gap-1.5 rounded-full bg-background/90 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground shadow-lg">
                              View profile <ArrowUpRight className="size-3.5" />
                            </span>
                          </div>
                        </div>

                        {/* Content Block */}
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-display text-2xl tracking-tight text-foreground transition-colors group-hover:text-brand">
                                {member.name}
                              </h3>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`rounded-full border font-mono text-[9px] uppercase tracking-[0.16em] ${
                                DEPT_COLORS[member.department]
                              }`}
                            >
                              {member.department}
                            </Badge>
                          </div>

                          <div className="mt-auto">
                            <p className="text-sm font-medium text-foreground/80">
                              {member.skills[0]} {member.skills[1] && <span className="text-muted-foreground">· {member.skills[1]}</span>}
                            </p>
                          </div>

                          {/* Desktop Skill Trail Hover */}
                          <div className="hidden lg:block overflow-hidden h-0 opacity-0 transition-all duration-300 group-hover:h-[24px] group-hover:opacity-100 group-hover:mt-3">
                            <div className="flex gap-2 text-xs text-muted-foreground">
                              {member.skills.slice(0, 4).map((skill, idx) => (
                                <span key={idx} className="whitespace-nowrap flex items-center gap-2">
                                  {skill}
                                  {idx < Math.min(3, member.skills.length - 1) && <span className="size-1 rounded-full bg-brand/30" />}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Values Strip ── */}
      <section className="border-y border-border/60 bg-background py-8">
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap px-4 text-foreground/40">
            {[...VALUES, ...VALUES, ...VALUES].map((value, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em]">{value}</span>
                <SparkleIcon />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hiring CTA ── */}
      <section className="relative px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border/60 bg-card p-10 text-center sm:p-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            Careers
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            Want to build with us?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We occasionally open spots for sharp engineers and operators. If you&apos;re obsessed with making things that actually work, get in touch.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full">
            <Link href="/contact">
              Send us a message <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand/50">
      <path d="M12 3v18M3 12h18M5.3 5.3l13.4 13.4M5.3 18.7l13.4-13.4" />
    </svg>
  );
}
