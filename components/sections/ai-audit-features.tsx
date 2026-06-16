"use client";

import { motion } from "framer-motion";
import { Zap, Search, Bot, Target, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionEyebrow } from "./services-section";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    title: "Technical Health",
    chip: "Infrastructure",
    icon: Zap,
    points: [
      "Page speed & Core Web Vitals",
      "Mobile responsiveness audit",
      "SSL, HTTPS & security headers",
      "Broken links & redirect chains",
      "Server response time analysis",
    ],
  },
  {
    title: "SEO Performance",
    chip: "Visibility",
    icon: Search,
    points: [
      "Meta tags, titles & descriptions",
      "Heading hierarchy & structure",
      "Image optimization & alt attributes",
      "Sitemap & robots.txt validation",
      "On-page keyword relevance",
    ],
  },
  {
    title: "AI Readiness Score",
    chip: "Automation",
    icon: Bot,
    points: [
      "Chatbot & agent integrations",
      "CRM and email sequence wiring",
      "Workflow automation coverage",
      "AI-powered tooling in use",
      "Content generation infrastructure",
    ],
  },
  {
    title: "Conversion Signals",
    chip: "Revenue",
    icon: Target,
    points: [
      "CTA clarity, hierarchy & placement",
      "Landing page effectiveness",
      "Form design & friction analysis",
      "Trust signals & social proof",
      "User flow & drop-off mapping",
    ],
  },
  {
    title: "Competitive Position",
    chip: "Market",
    icon: BarChart3,
    points: [
      "Industry benchmark comparison",
      "Top competitor gap analysis",
      "Market positioning assessment",
      "Traffic estimation & trends",
      "Content authority evaluation",
    ],
  },
];

export function AiAuditFeatures() {
  return (
    <section className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header — asymmetric layout matching services-section */}
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <SectionEyebrow>What we analyze</SectionEyebrow>
            <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              50+ signals,{" "}
              <span className="italic text-brand">one report.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="text-pretty text-muted-foreground">
              Our proprietary audit engine evaluates every meaningful dimension
              of your digital presence — then ranks findings by impact so you
              know exactly where to focus first.
            </p>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: EASE_OUT_EXPO,
              }}
              className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6 transition-all duration-300 hover:border-brand/50 hover:shadow-[0_8px_30px_-12px_var(--brand-glow-soft)] sm:p-8 ${
                idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background/50 text-foreground/60 transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/15 group-hover:text-brand">
                  <feature.icon className="size-4" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-base tracking-tight text-foreground">
                      {feature.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="rounded-full border-border/70 bg-background/40 font-mono text-[9px] font-normal uppercase tracking-[0.16em] text-foreground/55"
                    >
                      {feature.chip}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Points */}
              <ul className="space-y-2.5">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground transition-colors group-hover:text-foreground/70"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-brand/60" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* +30 more card — dashed border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: features.length * 0.08,
              ease: EASE_OUT_EXPO,
            }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-transparent p-8 text-center sm:col-span-2 lg:col-span-1"
          >
            <div className="font-mono text-4xl font-light text-brand/60 mb-4">
              +30
            </div>
            <p className="font-display text-base tracking-tight text-foreground mb-2">
              More parameters
            </p>
            <p className="text-sm text-muted-foreground max-w-[28ch]">
              Analyzed automatically — from accessibility to structured data
              and beyond.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
