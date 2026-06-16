"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./services-section";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote:
      "The audit surfaced 23 issues we had no idea existed. Yantrix fixed them and our conversions climbed 40% within two weeks.",
    name: "Rajesh S.",
    role: "Founder",
    company: "TechFlow",
  },
  {
    quote:
      "I\u2019ve used HubSpot\u2019s grader before, but this was meaningfully more detailed. The AI readiness score was eye-opening \u2014 we had zero automation.",
    name: "Priya M.",
    role: "Marketing Head",
    company: "ScaleUp",
  },
  {
    quote:
      "Got the report in my inbox within a minute. Specific, actionable, zero fluff. Already booked a strategy call with their team.",
    name: "Amit K.",
    role: "CEO",
    company: "GrowthLab",
  },
];

export function AiAuditTestimonials() {
  return (
    <section className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <SectionEyebrow>What people say</SectionEyebrow>
          <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Results that{" "}
            <span className="italic text-brand">speak clearly.</span>
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground">
            Real feedback from teams who ran the audit and acted on the
            findings.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: idx * 0.12,
                ease: EASE_OUT_EXPO,
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card p-6 transition-all duration-300 hover:border-brand/50 sm:p-8"
            >
              {/* Large quotation mark — decorative */}
              <div
                aria-hidden
                className="absolute -top-2 -left-1 font-display text-[120px] leading-none text-brand/[0.06] select-none"
              >
                &ldquo;
              </div>

              <blockquote className="relative text-pretty text-base leading-relaxed text-foreground/80 mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-auto flex items-center gap-3">
                {/* Avatar placeholder — initials */}
                <div className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-secondary/50 font-mono text-xs font-medium text-foreground/60">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
