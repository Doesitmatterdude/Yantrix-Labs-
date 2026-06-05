"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PRINCIPLES } from "@/lib/site-data";
import { SectionEyebrow } from "./services-section";

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [enableParallax, setEnableParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const sync = () => setEnableParallax(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: right card moves slower (desktop only — disabled on mobile)
  const rightY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? [40, -40] : [0, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-24 py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionEyebrow>Who we are</SectionEyebrow>
            <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              A senior studio that ships,{" "}
              <span className="italic text-brand">then iterates.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            We are a team of creative developers, designers, and strategists who
            blend experimentation with disciplined execution. Every engagement
            starts with deeply understanding your vision and constraints, then
            turning that into a digital reality — an e-commerce app, a food
            delivery system, a SaaS platform, or a full business ecosystem.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-[60ch] text-muted-foreground"
          >
            At Yantrix Labs, every line of code, interface, and automation
            exists to move a real business metric.
          </motion.p>

          {/* Team avatars */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <div className="flex -space-x-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="size-9 rounded-full border-2 border-background ring-1 ring-border"
                  style={{
                    background: `conic-gradient(from ${i * 67}deg, var(--brand), var(--brand-cool), var(--brand))`,
                  }}
                />
              ))}
            </div>
            <div className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground/60">
              10 senior makers · Jaipur, India
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              asChild
              variant="ghost"
              className="mt-6 -ml-3 rounded-full text-foreground transition-all hover:scale-[1.03]"
            >
              <Link href="#top">
                Meet the team <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Principles card with parallax */}
        <motion.div style={{ y: rightY }} className="lg:col-span-7">
          <Card className="relative overflow-hidden border-border/60 bg-card p-6 sm:p-8">
            {/* Background decoration */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full opacity-15 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, var(--brand), transparent)",
              }}
            />
            <div className="absolute inset-0 grid-bg opacity-[0.03]" />

            <div className="relative space-y-6">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="group flex gap-4"
                >
                  <span className="shrink-0 font-mono text-sm text-brand">
                    {p.n}
                  </span>
                  <blockquote className="text-lg font-display tracking-tight text-foreground/90 sm:text-xl lg:text-2xl">
                    &ldquo;{p.text}&rdquo;
                  </blockquote>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
