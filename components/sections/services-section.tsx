"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.3)]">
            <div className="relative aspect-[4/3] w-full">
              <Image 
                src="/images/yantrix-systems.avif" 
                alt="Yantrix Systems Infrastructure" 
                fill 
                className="object-cover object-center"
                sizes="(max-width: 1200px) 100vw, 1152px"
              />
              {/* Inner shadow for depth */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]" />
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
