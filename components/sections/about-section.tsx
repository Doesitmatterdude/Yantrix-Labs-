"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRINCIPLES } from "@/lib/site-data";
import { TEAM_MEMBERS } from "@/lib/team";

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
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
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
            We are a Jaipur-based AI-native studio combining product thinking, engineering, design, and automation strategy. Every engagement starts with understanding the workflow, constraint, and metric that matters most — then building systems that can actually run in production.
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
            className="mt-8 flex flex-col items-start gap-4"
          >
            <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap">
              {TEAM_MEMBERS.map((member) => {
                const firstName = member.name.split(" ")[0].toUpperCase();
                
                const DESIGNATION_MAP: Record<string, string> = {
                  "DIVYA": "FOUNDER",
                  "RAHUL": "CO-FOUNDER",
                  "PARAG": "DEV",
                  "ROHIT": "DEV",
                  "PRIYANSHU": "SALES",
                };

                const designation = DESIGNATION_MAP[firstName] || "MEMBER";
                
                const isClickable = member.slug === "founder-partner" || member.slug === "business-partner";
                const commonClassName = "group flex flex-col items-center gap-2 outline-none";
                
                const content = (
                  <>
                    <div className="relative size-12 overflow-hidden rounded-full border-2 border-background ring-1 ring-border transition-all duration-300 group-hover:scale-110 group-hover:ring-brand group-focus-visible:ring-brand">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="team-avatar absolute inset-0"
                        loading="lazy"
                      />
                    </div>
                    {/* Vertical Text Swap Label */}
                    <div className="relative h-3.5 w-full overflow-hidden text-center font-mono text-[9px] tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground group-focus-visible:text-foreground group-active:text-foreground">
                      <div className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-[14px] group-focus-visible:-translate-y-[14px] group-active:-translate-y-[14px]">
                        <span className="flex h-[14px] items-center justify-center">{firstName}</span>
                        <span className="flex h-[14px] items-center justify-center font-semibold text-brand">{designation}</span>
                      </div>
                    </div>
                  </>
                );

                if (isClickable) {
                  return (
                    <Link key={member.slug} href={`/team/${member.slug}`} className={commonClassName}>
                      {content}
                    </Link>
                  );
                }

                return (
                  <div key={member.slug} className={commonClassName}>
                    {content}
                  </div>
                );
              })}
            </div>
            <div className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60">
              5 SENIOR MAKERS · JAIPUR, INDIA
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
              <Link href="/team">
                Meet the team <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Principles grid with parallax */}
        <motion.div style={{ y: rightY }} className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-secondary/20 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-brand/50 hover:bg-secondary/30 sm:p-8"
              >
                <div className="mb-10 font-mono text-4xl font-light text-brand/80 transition-colors group-hover:text-brand sm:mb-14 sm:text-5xl">
                  {p.n}
                </div>
                <div className="text-pretty text-base font-medium leading-snug text-foreground/80 group-hover:text-foreground">
                  {p.text}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
