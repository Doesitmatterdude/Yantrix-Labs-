"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_LINK } from "@/lib/site-data";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-fit overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 lg:min-h-[85svh] flex flex-col justify-center"
    >
      {/* Animated mesh gradient background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        
        {/* Render heavy glow layers only on desktop */}
        {isDesktop && (
          <>
            {/* Primary glow */}
            <div
              className="absolute -top-40 left-1/2 size-[800px] -translate-x-1/2 rounded-full opacity-30 blur-3xl animate-gradient-shift"
              style={{
                background:
                  "radial-gradient(closest-side, var(--brand) 0%, transparent 70%)",
              }}
            />
            {/* Secondary subtle glow */}
            <div
              className="absolute -bottom-40 right-0 size-[600px] rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, var(--brand-cool) 0%, transparent 70%)",
              }}
            />
          </>
        )}
        
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Copy */}
        <motion.div
          style={isDesktop ? { y, opacity } : undefined}
          className="flex flex-col items-start lg:items-center lg:text-center"
        >
          {/* Kicker badge with glow animation - Desktop Only */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="relative overflow-hidden rounded-full border-brand/30 bg-background/50 px-4 py-1.5 font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-foreground/80 backdrop-blur"
              >
                <span className="absolute inset-0 rounded-full border border-brand/50 animate-glow-border" />
                <Sparkles className="mr-2 size-3.5 text-brand" />
                The website &amp; AI upgrade your brand deserves
              </Badge>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-balance font-display text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl lg:leading-[1.1] ${isDesktop ? 'mt-8' : 'mt-0'}`}
          >
            We build{" "}
            <span className="relative inline-block">
              <span className="italic text-brand">AI systems</span>
              {/* Animated shimmer underline */}
              {isDesktop && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full overflow-hidden rounded-full">
                  <span className="absolute inset-0 animate-shimmer" />
                </span>
              )}
            </span>{" "}
            your business can{" "}
            <span className="text-foreground/85">actually run on.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-[58ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl lg:max-w-[65ch]"
          >
            Yantrix Labs is an AI-native product studio based in Jaipur, India, specializing in B2B AI automation. We design, build, and deploy custom AI agents, lead intelligence systems, and operational copilots for startups and enterprises, typically shipping production-ready systems in under three weeks.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:justify-center"
          >
            <Button
              asChild
              size="lg"
              className="group h-12 w-full sm:w-auto rounded-full bg-foreground px-6 text-background shadow-[0_8px_24px_-8px_var(--brand)] transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90 hover:shadow-[0_16px_40px_-8px_var(--brand)] lg:h-14 lg:px-8 lg:text-base"
            >
              <Link href="/ai-audit" data-event="book_ai_audit">
                Book a free website &amp; AI audit
                <ArrowUpRight className="size-4 lg:size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
            {isDesktop && (
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="group h-12 lg:h-14 rounded-full px-5 lg:px-7 text-foreground/80 lg:text-base transition-all hover:scale-[1.03] hover:bg-secondary"
              >
                <Link href="#services">
                  Explore what we build
                  <ArrowDown className="size-4 lg:size-5 transition-transform group-hover:translate-y-0.5" />
                </Link>
              </Button>
            )}
          </motion.div>

          {/* Floating badge - Desktop Only */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 lg:mt-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-4 py-2 lg:px-5 lg:py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground/70 backdrop-blur animate-float">
                <Zap className="size-3.5 lg:size-4 text-brand" />
                Rapid deployment — days, not quarters
              </div>
            </motion.div>
          )}

          {/* Trust badges */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 lg:mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-center lg:text-base"
          >
            {[
              "Senior studio based in Jaipur",
              "AI-native product studio",
              "Pre-built systems ready",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 lg:size-2 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 lg:mt-6 font-mono text-xs uppercase tracking-[0.18em] text-foreground/50 lg:text-sm"
          >
            Based in Jaipur, India · Working with teams worldwide
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
