"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionEyebrow } from "./services-section";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "Is this really free?",
    a: "Yes — completely free, no credit card, no hidden upsell gate. We use the audit to demonstrate exactly how much room for improvement exists. If the report is valuable, some teams choose to work with us on the fixes. But the audit itself is yours to keep either way.",
  },
  {
    q: "How long does the audit take?",
    a: "Typically under 60 seconds. Our engine crawls your site concurrently across multiple analysis dimensions. Once complete, the full report is delivered to your inbox immediately.",
  },
  {
    q: "What do you do with my email?",
    a: "We use it to send your audit report and, occasionally, genuinely useful insights about website performance and AI automation. We never sell your data, and you can unsubscribe with one click.",
  },
  {
    q: "Can I share the report with my team?",
    a: "Absolutely. The report is designed to be shareable — clear scores, non-technical explanations, and a prioritized action list. It's a useful artifact for stakeholder conversations.",
  },
  {
    q: "What if my score is low?",
    a: "A low score is actually good news — it means there's significant, untapped upside. The report will show you exactly what's dragging the score down and what to fix first. If you'd like help, we can walk through the roadmap on a free strategy call.",
  },
  {
    q: "Do you offer a deeper, human-led audit?",
    a: "Yes. The AI audit is a powerful starting point. For a comprehensive analysis of your brand positioning, technical architecture, and growth strategy, you can book a free 30-minute strategy call with our team.",
  },
];

export function AiAuditFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative scroll-mt-24 border-t border-border/60 bg-secondary/30 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <SectionEyebrow>Questions</SectionEyebrow>
          <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Frequently{" "}
            <span className="italic text-brand">asked.</span>
          </h2>
        </motion.div>

        <div className="space-y-1">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.06,
                  ease: EASE_OUT_EXPO,
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  className={`group flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left transition-all duration-300 sm:px-6 ${
                    isOpen
                      ? "bg-card border border-border/60"
                      : "border border-transparent hover:bg-card/50"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-medium tracking-tight transition-colors sm:text-lg ${
                      isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: EASE_OUT_EXPO },
                        opacity: { duration: 0.25, delay: 0.05 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                        <p className="text-sm leading-relaxed text-muted-foreground max-w-[56ch]">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
