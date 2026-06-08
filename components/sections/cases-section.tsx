"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CASES } from "@/lib/site-data";
import { SectionEyebrow } from "./services-section";
import { LeadPipelineOutcome } from "../outcomes/LeadPipelineOutcome";
import { HiringFunnelOutcome } from "../outcomes/HiringFunnelOutcome";
import { OpsReportOutcome } from "../outcomes/OpsReportOutcome";

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
              Real outcomes.{" "}
              <span className="italic text-brand">Specific numbers.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 text-muted-foreground lg:pb-2 lg:text-right"
          >
            Every case below is a sample of what a Yantrix system deployment produces.
            No vanity metrics — only the numbers that move a business.
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

                  {/* Visual - Premium Outcome Component */}
                  <div className="relative h-[450px] w-full overflow-hidden bg-background/50">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute inset-0">
                      {i === 0 && <LeadPipelineOutcome />}
                      {i === 1 && <HiringFunnelOutcome />}
                      {i === 2 && <OpsReportOutcome />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {c.body}
                    </p>

                    <div className="mt-6 border-t border-border/60 pt-4">
                      <Link
                        href="/notebook"
                        className="inline-flex items-center gap-1 text-sm text-foreground/60 transition-colors hover:text-foreground"
                      >
                        View case study
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
            <Link href="/notebook">
              View detailed case studies <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}


