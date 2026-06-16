"use client";

import { motion } from "framer-motion";
import { Link2, BrainCircuit, FileBarChart } from "lucide-react";
import { SectionEyebrow } from "./services-section";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    n: "01",
    title: "Enter your URL",
    body: "Paste any live website address. No signup, no credit card — our engine starts immediately.",
    icon: Link2,
  },
  {
    n: "02",
    title: "AI analyzes 50+ signals",
    body: "Speed, SEO, mobile experience, AI integrations, conversion signals, and competitive benchmarks — evaluated concurrently.",
    icon: BrainCircuit,
  },
  {
    n: "03",
    title: "Report in your inbox",
    body: "A personalized audit with scores, benchmarks, and a prioritized fix-list — delivered in under 60 seconds.",
    icon: FileBarChart,
  },
];

export function AiAuditHowItWorks() {
  return (
    <section className="relative scroll-mt-24 border-t border-border/60 bg-secondary/30 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Three steps.{" "}
            <span className="italic text-brand">Zero friction.</span>
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground">
            No accounts, no installs, no calls. Enter a URL, wait
            30 seconds, and check your inbox.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: EASE_OUT_EXPO,
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card p-6 transition-all duration-300 hover:scale-[1.02] hover:border-brand/50 sm:p-8"
            >
              {/* Step number — large, muted */}
              <div className="mb-10 font-mono text-4xl font-light text-brand/80 transition-colors group-hover:text-brand sm:mb-12 sm:text-5xl">
                {step.n}
              </div>

              {/* Icon */}
              <div className="mb-4 grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background/50 text-foreground/60 transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/10 group-hover:text-brand">
                <step.icon className="size-4" strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
