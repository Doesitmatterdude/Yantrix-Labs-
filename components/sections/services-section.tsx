"use client";

import { motion } from "framer-motion";
import { ServicesScene } from "@/components/hero-3d/spline-services-dynamic";

export function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <SectionEyebrow>What we build</SectionEyebrow>
            <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-brand">Systems,</span>{" "}
              <span className="italic text-foreground">
                not just websites.
              </span>
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
              We don&apos;t look like a typical agency because we aren&apos;t
              one. Yantrix Labs is an AI-native product studio that modernizes
              your website, software, and operations while wiring in AI agents
              that move real business metrics.
            </p>
          </motion.div>
        </div>

        {/* 3D Spline scene — replaces the three previous bento cards.
            Desktop only; on mobile/tablet a clean static visual stands in
            so the section never feels empty. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl">
            {/* The 3D scene container — responsive aspect ratios for all devices */}
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/8.5]">
              {/* 3D Spline scene — renders on all devices now */}
              <ServicesScene />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-foreground/55">
      <span className="size-1 rounded-full bg-brand" />
      {children}
    </div>
  );
}
