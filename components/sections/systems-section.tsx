"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Search,
  ClipboardCheck,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SYSTEMS, WHATSAPP_LINK } from "@/lib/site-data";
import { SectionEyebrow } from "./services-section";

const ICONS = {
  scout: Search,
  hire: ClipboardCheck,
  call: PhoneCall,
} as const;

// Dashboard screenshots for each in-house AI system.
// Save the attached photos to public/systems/ with these exact filenames.
const SYSTEM_IMAGES = {
  scout: {
    src: "/systems/Yantrix_Client_Scout_3200x1800.avif",
    alt: "Yantrix Client Scout dashboard — scored lead pipeline with ICP match and source transparency",
  },
  hire: {
    src: "/systems/Yantrix_AI_Hiring_Screener.avif",
    alt: "AI Hiring Screener dashboard — candidate scorecards, skill match, and AI interview summary",
  },
  call: {
    src: "/systems/Yantrix_AI_Calling_Assistant.avif",
    alt: "AI Calling Agent dashboard — live call transcript, post-call summary, and CRM sync",
  },
} as const;

export function SystemsSection() {
  const [active, setActive] = useState<(typeof SYSTEMS)[number]["id"]>("scout");
  const current = SYSTEMS.find((s) => s.id === active)!;

  return (
    <section
      id="systems"
      className="relative scroll-mt-24 border-t border-border/60 bg-secondary/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <SectionEyebrow>In-house AI Systems</SectionEyebrow>
          <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            AI systems we&apos;ve already{" "}
            <span className="italic text-brand">battle-tested.</span>
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground">
            We maintain a suite of in-house AI systems you can plug directly
            into your business. Each one started as something we used ourselves
            before shaping it into a deployable product. Most standard setups
            ship in under two weeks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT - Vertical tab list */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2">
              {SYSTEMS.map((s) => {
                const Icon = ICONS[s.id];
                const isActive = active === s.id;
                return (
                  <motion.button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`group relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                      isActive
                        ? "border-brand/50 bg-card shadow-[0_8px_30px_-12px_var(--brand)]"
                        : "border-border/60 bg-card/50 hover:border-brand/30"
                    }`}
                  >
                    {/* Active indicator bar */}
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 bg-brand"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="flex items-center gap-4 px-5 py-4">
                      <div
                        className={`grid size-10 shrink-0 place-items-center rounded-xl border transition-colors duration-300 ${
                          isActive
                            ? "border-brand/40 bg-brand/15 text-brand"
                            : "border-border bg-background/50 text-foreground/60"
                        }`}
                      >
                        <Icon className="size-4" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-display text-base transition-colors ${isActive ? "text-foreground" : "text-foreground/80"}`}
                          >
                            {s.name}
                          </span>
                          <Badge
                            variant="outline"
                            className="rounded-full border-border/70 bg-background/40 font-mono text-[9px] font-normal uppercase tracking-[0.16em] text-foreground/55"
                          >
                            {s.chip}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Bespoke CTA */}
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-dashed border-border bg-background/40 p-5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60">
                <Sparkles className="size-3.5 text-brand" /> Bespoke
              </div>
              <p className="text-sm text-muted-foreground">
                Need something more specific? We build bespoke AI agents and
                automations tuned to how your business actually runs.
              </p>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="-ml-2 self-start rounded-full text-foreground"
              >
                <Link href="#services">
                  See all AI systems <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT - Content panel */}
          <div className="relative lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="relative overflow-hidden rounded-3xl border border-border/60 bg-card"
              >
                {/* Dashboard screenshot preview */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/60 bg-background/60">
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <Image
                    src={SYSTEM_IMAGES[current.id].src}
                    alt={SYSTEM_IMAGES[current.id].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-center"
                    priority={current.id === "scout"}
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-2xl tracking-tight sm:text-3xl">
                      {current.name}
                    </h3>
                    <Badge className="rounded-full bg-brand/20 text-brand font-mono text-[10px] uppercase">
                      {current.chip}
                    </Badge>
                  </div>
                  <p className="mt-3 text-pretty text-muted-foreground">
                    {current.description}
                  </p>

                  {/* Outcomes */}
                  <ul className="mt-6 space-y-2">
                    {current.outcomes.map((outcome, i) => (
                      <motion.li
                        key={outcome}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                        {outcome}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/50">
                    {current.metrics.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="bg-card p-4"
                      >
                        <div className="font-display text-xl tracking-tight text-brand sm:text-2xl">
                          {m.value}
                        </div>
                        <div className="mt-1 text-[11px] leading-tight text-foreground/55">
                          {m.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-6 sm:flex-row"
        >
          <p className="text-center text-foreground/80 sm:text-left">
            Want something more specific? We ship bespoke AI agents in under 2
            weeks.
          </p>
          <Button
            asChild
            className="shrink-0 rounded-full bg-foreground text-background transition-all hover:scale-[1.03] hover:bg-foreground/90"
          >
            <Link href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
