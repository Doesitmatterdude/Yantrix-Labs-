"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Zap,
  Search,
  ClipboardCheck,
  PhoneCall,
  Globe,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_LINK } from "@/lib/site-data";
import { HeroRobot } from "@/components/hero-3d/spline-robot-dynamic";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[90svh] overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20"
    >
      {/* Animated mesh gradient background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
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
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        {/* LEFT COLUMN - Copy (55% = 7 cols) */}
        <motion.div
          style={{ y, opacity }}
          className="flex flex-col justify-center lg:col-span-7 lg:py-8"
        >
          {/* Kicker badge with glow animation */}
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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 text-balance font-display text-5xl font-normal leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            We build{" "}
            <span className="relative inline-block">
              <span className="italic text-brand">AI systems</span>
              {/* Animated shimmer underline */}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full overflow-hidden rounded-full">
                <span className="absolute inset-0 animate-shimmer" />
              </span>
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
              className="group h-12 rounded-full bg-foreground px-6 text-background shadow-[0_8px_24px_-8px_var(--brand)] transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90 hover:shadow-[0_16px_40px_-8px_var(--brand)]"
            >
              <Link href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                Book a free website &amp; AI audit
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
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
          </motion.div>

          {/* Floating badge */}
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

          {/* Trust badges */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            {[
              "Senior 10-person team",
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

        {/* RIGHT COLUMN - 3D Infrastructure Scene (desktop) / 2D fallback (mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-square w-full lg:aspect-auto lg:h-[580px]">
            {/* Glassmorphism container */}
            <div className="absolute inset-0 rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/[0.03] to-transparent backdrop-blur-sm" />

            {/* 3D Spline robot — only renders on desktop with fine pointer (handled inside HeroRobot) */}
            <div className="absolute inset-0 hidden lg:block">
              <HeroRobot />
            </div>

            {/* 2D fallback — visible on mobile/tablet, hidden on desktop */}
            <div className="absolute inset-0 lg:hidden">
              <EcosystemVisual />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EcosystemVisual() {
  const systems = [
    { id: "scout", label: "Client Scout", icon: Search, angle: 0 },
    { id: "hire", label: "Hiring Screener", icon: ClipboardCheck, angle: 72 },
    { id: "call", label: "Calling Assistant", icon: PhoneCall, angle: 144 },
    { id: "auto", label: "Automations", icon: Settings, angle: 216 },
    { id: "web", label: "Web & Products", icon: Globe, angle: 288 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute size-[85%] rounded-full border border-dashed border-foreground/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute size-[65%] rounded-full border border-foreground/10"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute size-[45%] rounded-full border border-dashed border-foreground/5"
        />
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--brand)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {systems.map((sys, i) => {
          const rad = (sys.angle - 90) * (Math.PI / 180);
          const x = 200 + Math.cos(rad) * 130;
          const y = 200 + Math.sin(rad) * 130;
          return (
            <motion.line
              key={sys.id}
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Central core */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10"
      >
        <div className="relative size-24 rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/20 via-brand/10 to-transparent backdrop-blur-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-12 rounded-xl bg-brand/20 flex items-center justify-center">
              <span className="font-mono text-xs font-medium text-brand">
                YX
              </span>
            </div>
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-2xl border border-brand/40 animate-pulse-ring" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
            Yantrix Core
          </span>
        </div>
      </motion.div>

      {/* Orbiting system nodes */}
      {systems.map((sys, i) => {
        const rad = (sys.angle - 90) * (Math.PI / 180);
        const x = Math.cos(rad) * 130;
        const y = Math.sin(rad) * 130;
        const Icon = sys.icon;

        return (
          <motion.div
            key={sys.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            className="absolute z-10"
            style={{
              left: `calc(50% + ${x}px - 36px)`,
              top: `calc(50% + ${y}px - 36px)`,
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} className="group relative">
              <div className="size-[72px] rounded-xl border border-foreground/15 bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand/40 group-hover:shadow-[0_8px_30px_-12px_var(--brand)]">
                <Icon
                  className="size-5 text-foreground/60 group-hover:text-brand transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40 group-hover:text-foreground/60 transition-colors">
                  {sys.label}
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating particles — deterministic positions to avoid SSR hydration mismatch */}
      {[
        { left: 30, top: 25, dur: 3.4, delay: 0.2 },
        { left: 72, top: 18, dur: 4.1, delay: 1.1 },
        { left: 22, top: 65, dur: 3.7, delay: 0.6 },
        { left: 78, top: 70, dur: 3.2, delay: 1.5 },
        { left: 45, top: 35, dur: 4.5, delay: 0.9 },
        { left: 60, top: 80, dur: 3.8, delay: 0.3 },
        { left: 35, top: 75, dur: 3.3, delay: 1.7 },
        { left: 68, top: 40, dur: 4.2, delay: 0.5 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute size-1 rounded-full bg-brand/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
