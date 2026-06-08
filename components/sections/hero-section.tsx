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
      className="relative isolate min-h-fit overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20 md:min-h-[90svh]"
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

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        {/* LEFT COLUMN - Copy */}
        <motion.div
          style={isDesktop ? { y, opacity } : undefined}
          className="flex flex-col justify-center lg:col-span-7 lg:py-8"
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
            className={`text-balance font-display text-5xl font-normal leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl ${isDesktop ? 'mt-7' : 'mt-0'}`}
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
            className="mt-6 max-w-[58ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Yantrix Labs designs and ships AI-powered websites, products, and
            automations that deploy in days, not quarters — engineered around
            how your teams actually work.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="group h-12 w-full sm:w-auto rounded-full bg-foreground px-6 text-background shadow-[0_8px_24px_-8px_var(--brand)] transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90 hover:shadow-[0_16px_40px_-8px_var(--brand)]"
            >
              <Link href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                Book a free website &amp; AI audit
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
            {isDesktop && (
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="group h-12 rounded-full px-5 text-foreground/80 transition-all hover:scale-[1.03] hover:bg-secondary"
              >
                <Link href="#services">
                  Explore what we build
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
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
              className="mt-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground/70 backdrop-blur animate-float">
                <Zap className="size-3.5 text-brand" />
                Rapid deployment — days, not quarters
              </div>
            </motion.div>
          )}

          {/* Trust badges */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            {[
              "Senior 5-person team",
              "AI-native product studio",
              "Pre-built systems ready",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-foreground/50"
          >
            Based in Jaipur, India · Working with teams worldwide
          </motion.p>
        </motion.div>

        {/* RIGHT COLUMN - Video Media Area - Desktop Only */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:col-span-5 flex items-center"
          >
            <div className="relative w-full aspect-video lg:aspect-[4/5] overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.3)]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 size-full object-cover"
              >
                <source src="/videos/yantrix-hero.webm" type="video/webm" />
                <source src="/videos/yantrix-hero.mp4" type="video/mp4" />
              </video>
              
              {/* Subtle inner shadow for depth */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
