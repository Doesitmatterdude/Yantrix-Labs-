"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/site-data";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 final-cta-section">
      {/* Animated gradient background — intentionally dark/dramatic in both themes,
          but light mode uses a softer warm-charcoal so it doesn't feel jarring */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 animate-gradient-shift final-cta-bg"
      />
      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 grid-bg opacity-[0.05]"
      />
      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/45 bg-background/80 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-foreground shadow-[0_0_24px_-12px_var(--brand)] backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative size-2 rounded-full bg-brand" />
            </span>
            Free audit · 30 min
          </div>

          <h2 className="mt-8 text-balance font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight">
            Ready for the upgrade
            <br />
            <span className="italic text-brand">your brand deserves?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
            Whether you need a website that finally feels like 2026, AI agents
            plugged into your operations, or a complete digital ecosystem —
            we&apos;ll come back with a concrete, realistic plan. The first step
            is a free audit of your current website and systems.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary CTA with pulsing ring */}
            <div className="relative">
              {/* Pulsing rings */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-brand/30 animate-pulse-ring"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-brand/20 animate-pulse-ring"
                style={{ animationDelay: "0.5s" }}
              />
              <Button
                asChild
                size="lg"
                className="group relative h-14 rounded-full bg-foreground px-7 text-background shadow-[0_8px_24px_-8px_var(--brand)] transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90 hover:shadow-[0_16px_40px_-8px_var(--brand)]"
              >
                <Link href="/ai-audit">
                  <MessageCircle className="size-4" />
                  Book a free website &amp; AI audit
                </Link>
              </Button>
            </div>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-border bg-background/50 px-7 backdrop-blur transition-all duration-300 hover:scale-[1.03] hover:bg-secondary"
            >
              <Link href="/contact">
                Tell us about your project
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Address */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 font-mono text-xs text-foreground/40"
          >
            Yantrix Labs, Corporate Tower, C Scheme, Jaipur, India ·
            hello@yantrixlabs.studio
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
