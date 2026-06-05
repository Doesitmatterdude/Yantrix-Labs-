"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CASES } from "@/lib/site-data";
import { SectionEyebrow } from "./services-section";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function CasesSection() {
  return (
    <section id="cases" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <SectionEyebrow>Case studies</SectionEyebrow>
            <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              What our{" "}
              <span className="italic text-brand">systems unlock.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 text-muted-foreground lg:pb-2 lg:text-right"
          >
            Behind every system is a clear story: a painful bottleneck, a
            targeted solution, and a measurable improvement.
          </motion.p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="relative">
          {/* Gradient masks for scroll hint */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent md:hidden" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
          >
            {CASES.map((c, i) => (
              <motion.div
                key={c.title}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-[85vw] shrink-0 snap-start md:w-auto"
                style={{
                  // Vary heights slightly for staggered feel
                  marginTop: i === 1 ? "1.5rem" : i === 2 ? "0.75rem" : "0",
                }}
              >
                <Card className="group relative h-full overflow-hidden border-border/60 bg-card transition-all duration-500 hover:border-brand/40 hover:shadow-[0_20px_60px_-20px_var(--brand)]">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
                    <Badge
                      variant="outline"
                      className="rounded-full border-border bg-background/50 font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-foreground/60"
                    >
                      {c.tag}
                    </Badge>
                    <span className="font-mono text-[10px] text-foreground/40">
                      Case · 0{i + 1}
                    </span>
                  </div>

                  {/* Visual - Mock dashboard */}
                  <div className="relative aspect-[5/3] w-full overflow-hidden bg-background/50">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <CaseVisual index={i} />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {c.body}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                          Sample outcome
                        </div>
                        <div className="mt-1 font-display text-lg tracking-tight text-brand">
                          {c.metric}
                        </div>
                      </div>
                      <Link
                        href="#systems"
                        className="flex items-center gap-1 text-sm text-foreground/60 transition-colors hover:text-foreground"
                      >
                        View case
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Button
            asChild
            variant="ghost"
            className="-ml-3 rounded-full transition-all hover:scale-[1.03]"
          >
            <Link href="#systems">
              View detailed case studies <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function CaseVisual({ index }: { index: number }) {
  if (index === 0) {
    // Bar chart
    return (
      <div className="absolute inset-0 flex items-end gap-1.5 p-4">
        {[40, 65, 50, 80, 70, 95, 85].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.7 }}
            className="flex-1 rounded-sm bg-gradient-to-t from-brand/60 to-brand/20"
          />
        ))}
      </div>
    );
  }
  if (index === 1) {
    // Candidate cards
    return (
      <div className="absolute inset-0 flex flex-col gap-1.5 p-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="origin-left rounded-md border border-border/60 bg-background/80 px-3 py-1.5 text-[10px] font-mono text-foreground/60"
          >
            <span className="text-foreground/80">
              Candidate · {String(i).padStart(2, "0")}
            </span>
            <span
              className={`ml-2 ${i % 2 === 0 ? "text-brand" : "text-foreground/40"}`}
            >
              {i % 2 === 0 ? "surfaced" : "queued"}
            </span>
          </motion.div>
        ))}
      </div>
    );
  }
  // Grid of dots/blocks
  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03, duration: 0.4 }}
          className={`rounded-md border border-border/60 ${
            i % 4 === 0 ? "bg-brand/30" : "bg-background/60"
          }`}
        />
      ))}
    </div>
  );
}
