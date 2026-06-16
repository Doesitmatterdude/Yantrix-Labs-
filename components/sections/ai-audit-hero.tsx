"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Search,
  Zap,
  Bot,
  Target,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAudit } from "@/components/providers/audit-provider";

type AuditState = "idle" | "collecting_lead" | "analyzing" | "complete";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const analysisSteps = [
  { icon: Zap, label: "Technical Health" },
  { icon: Search, label: "SEO Performance" },
  { icon: Bot, label: "AI Readiness" },
  { icon: Target, label: "Conversion Signals" },
  { icon: BarChart3, label: "Competitive Position" },
];

export function AiAuditHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const { setAuditData, setIsUnlocked } = useAudit();

  const [isDesktop, setIsDesktop] = useState(true);
  const [auditState, setAuditState] = useState<AuditState>("idle");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const validateUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Enter a URL to begin.";
    if (!trimmed.includes(".")) return "That doesn\u2019t look like a valid URL.";
    return "";
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateUrl(url);
    if (error) {
      setUrlError(error);
      return;
    }
    setUrlError("");
    setAuditState("collecting_lead");
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setFormError("Please enter your name."); return; }
    if (!email || !email.includes("@") || !email.includes(".")) { setFormError("Please enter a valid email address."); return; }
    if (!/^\d{10}$/.test(mobile)) { setFormError("Please enter a valid 10-digit mobile number."); return; }

    setFormError("");
    console.log("Analytics: audit_lead_captured", { name, email, mobile, url });
    
    setAuditState("analyzing");
    setProgress(0);
    setCurrentStep(0);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, name, email, mobile }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate audit");
      }

      const auditData = await res.json();
      console.log("Real Audit Generated successfully!", auditData);
      setAuditData(auditData);
      
      // Snap progress to 100% and complete
      setProgress(100);
      setCurrentStep(analysisSteps.length - 1);
      setTimeout(() => {
        setAuditState("complete");
        setIsUnlocked(true);
        setTimeout(() => {
          document.getElementById("audit-preview")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }, 800);
      
    } catch (err: any) {
      console.error(err);
      setUrlError(err.message || "An error occurred during analysis.");
      setAuditState("idle");
    }
  };

  // Smart progress bar: creeps up to 90% while waiting for API, then waits.
  useEffect(() => {
    if (auditState !== "analyzing") return;

    const interval = 100;
    let currentPct = 0;

    const timer = setInterval(() => {
      // Slow down significantly as it approaches 90%
      const remaining = 90 - currentPct;
      const increment = Math.max(0.1, remaining * 0.05);
      
      currentPct += increment;
      if (currentPct > 90) currentPct = 90;

      setProgress(currentPct);
      setCurrentStep(
        Math.min(
          Math.floor((currentPct / 100) * analysisSteps.length),
          analysisSteps.length - 1,
        ),
      );
    }, interval);

    return () => clearInterval(timer);
  }, [auditState]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-fit overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 lg:min-h-[85svh] flex flex-col justify-center"
    >
      {/* ── Background — identical to main hero ── */}
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        {isDesktop && (
          <>
            <div
              className="absolute -top-40 left-1/2 size-[800px] -translate-x-1/2 rounded-full opacity-30 blur-3xl animate-gradient-shift"
              style={{
                background: "radial-gradient(closest-side, var(--brand) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-40 right-0 size-[600px] rounded-full opacity-20 blur-3xl"
              style={{
                background: "radial-gradient(closest-side, var(--brand-cool) 0%, transparent 70%)",
              }}
            />
          </>
        )}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* ── Copy — centered, matching main hero typographic niche ── */}
        <motion.div
          style={isDesktop ? { y, opacity } : undefined}
          className="flex flex-col items-start lg:items-center lg:text-center"
        >
          {/* Explicit Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 w-full flex justify-start lg:justify-center"
          >
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="group -ml-3 rounded-full text-foreground/60 transition-colors hover:text-foreground"
            >
              <Link href="/">
                <ArrowLeft className="mr-1.5 size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Back to Homepage
              </Link>
            </Button>
          </motion.div>

          {/* Kicker badge — identical to main hero */}
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
                Free AI-powered website audit
              </Badge>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-balance font-display text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.1] ${isDesktop ? "mt-8" : "mt-0"}`}
          >
            Your website, analyzed by{" "}
            <span className="relative inline-block">
              <span className="italic text-brand">AI</span>
              {isDesktop && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full overflow-hidden rounded-full">
                  <span className="absolute inset-0 animate-shimmer" />
                </span>
              )}
            </span>{" "}
            — scored in{" "}
            <span className="text-foreground/85">30 seconds.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-[58ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl lg:max-w-[65ch]"
          >
            We crawl your site across 50+ parameters — technical health, SEO,
            AI readiness, conversion signals, competitive position — and deliver
            a personalized audit report to your inbox. Free. No credit card.
          </motion.p>

          {/* ── URL Input — centered pill ── */}
          <motion.form
            onSubmit={handleAnalyze}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 w-full max-w-md"
          >
            <div
              className={`group relative flex items-center overflow-hidden rounded-full border bg-card transition-all duration-300 ${
                urlError
                  ? "border-destructive/60"
                  : "border-border/60 focus-within:border-brand/60 focus-within:shadow-[0_0_0_3px_var(--brand-glow-soft)]"
              }`}
            >
              <input
                type="text"
                placeholder="yourbusiness.com"
                className="h-14 flex-1 bg-transparent px-5 text-base text-foreground placeholder:text-foreground/30 outline-none"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError("");
                }}
                disabled={auditState !== "idle"}
              />
              <Button
                type="submit"
                disabled={auditState !== "idle"}
                className="mr-1.5 h-11 rounded-full bg-foreground px-4 sm:px-6 text-sm font-medium text-background shadow-[0_4px_12px_-4px_var(--brand)] transition-all duration-300 hover:scale-[1.03] hover:bg-foreground/90 hover:shadow-[0_8px_24px_-8px_var(--brand)] disabled:opacity-50"
              >
                Analyze
                <ArrowRight className="ml-1.5 size-3.5" />
              </Button>
            </div>
            {urlError && (
              <p className="mt-2 text-center text-xs text-destructive">{urlError}</p>
            )}
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-foreground/40">
              <Lock className="size-3" />
              We&apos;ll email you the full report. No spam, ever.
            </p>
          </motion.form>

          {/* Floating badge — identical to main hero */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 lg:mt-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-4 py-2 lg:px-5 lg:py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground/70 backdrop-blur animate-float">
                <Zap className="size-3.5 lg:size-4 text-brand" />
                50+ parameters · report in under 60 seconds
              </div>
            </motion.div>
          )}

          {/* Trust items — identical to main hero */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 lg:mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-center lg:text-base"
          >
            {[
              "No signup required",
              "AI-powered analysis",
              "Actionable recommendations",
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
            Powered by Yantrix Labs · Jaipur, India
          </motion.p>
        </motion.div>
      </div>

      {/* ── Terminal Card — below hero, centered ── */}
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 mt-16 lg:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="relative"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-3xl opacity-40 blur-3xl"
            style={{
              background: "radial-gradient(closest-side, var(--brand-glow-soft), transparent)",
            }}
          />

          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_8px_32px_-12px_rgba(0,0,0,0.3)]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-border/40 bg-secondary/30 px-5 py-3">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-foreground/15" />
                <div className="size-2.5 rounded-full bg-foreground/15" />
                <div className="size-2.5 rounded-full bg-foreground/15" />
              </div>
              <div className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/30">
                yantrix · ai audit engine
              </div>
            </div>

            {/* Terminal body */}
            <div className="relative min-h-[300px] p-6 sm:p-8 font-mono text-sm">
              <AnimatePresence mode="wait">
                {/* ── IDLE ── */}
                {auditState === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ ease: EASE_OUT_EXPO }}
                    className="flex h-[240px] flex-col items-center justify-center text-center"
                  >
                    <div className="rounded-2xl border border-border/40 bg-secondary/30 p-4 mb-5">
                      <Sparkles className="size-6 text-brand/60" strokeWidth={1.5} />
                    </div>
                    <p className="text-foreground/50 text-sm">
                      Waiting for target URL&hellip;
                    </p>
                    <p className="mt-2 text-[11px] text-foreground/25">
                      Enter a URL above to begin analysis
                    </p>
                  </motion.div>
                )}

                {/* ── COLLECTING LEAD ── */}
                {auditState === "collecting_lead" && (
                  <motion.div
                    key="collecting_lead"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ ease: EASE_OUT_EXPO }}
                    className="flex h-full min-h-[240px] flex-col justify-center"
                  >
                    <div className="mb-4 flex items-center gap-2 text-[11px] text-foreground/40 uppercase tracking-[0.18em]">
                      <span className="size-1.5 rounded-full bg-brand" />
                      Target URL locked. Where should we send the report?
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => { setName(e.target.value); setFormError(""); }}
                          className="h-11 rounded-xl border border-border/60 bg-background/50 px-4 text-sm focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-foreground placeholder:text-foreground/30"
                        />
                        <input
                          type="text"
                          placeholder="Mobile (10 digits)"
                          value={mobile}
                          onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '').slice(0, 10)); setFormError(""); }}
                          className="h-11 rounded-xl border border-border/60 bg-background/50 px-4 text-sm focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-foreground placeholder:text-foreground/30"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address (e.g., you@gmail.com)"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setFormError(""); }}
                        className="h-11 w-full rounded-xl border border-border/60 bg-background/50 px-4 text-sm focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-foreground placeholder:text-foreground/30"
                      />
                      
                      {formError && (
                        <p className="text-xs text-destructive">{formError}</p>
                      )}

                      <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-4 sm:gap-0 pt-2">
                        <p className="flex items-center gap-1.5 text-[10px] text-foreground/30 text-center">
                          <Lock className="size-2.5" /> Secure & Spam-free
                        </p>
                        <Button
                          type="submit"
                          size="sm"
                          className="h-9 w-full sm:w-auto rounded-full bg-foreground px-5 text-xs text-background transition-all hover:bg-foreground/90"
                        >
                          Start AI Audit
                          <ArrowRight className="ml-1.5 size-3" />
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ── ANALYZING ── */}
                {auditState === "analyzing" && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ ease: EASE_OUT_EXPO }}
                    className="flex h-[240px] flex-col"
                  >
                    <div className="mb-6 flex items-center gap-2 text-[11px] text-foreground/40 uppercase tracking-[0.18em]">
                      <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                      Analyzing {url}
                    </div>

                    <div className="flex-1 space-y-3">
                      {analysisSteps.map((step, idx) => {
                        const isDone = idx < currentStep;
                        const isActive = idx === currentStep;
                        const Icon = step.icon;

                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{
                              opacity: isDone || isActive ? 1 : 0.2,
                              x: 0,
                            }}
                            transition={{
                              delay: idx * 0.05,
                              ease: EASE_OUT_EXPO,
                            }}
                            className="flex items-center gap-3"
                          >
                            {isDone ? (
                              <CheckCircle2 className="size-4 text-brand" />
                            ) : isActive ? (
                              <Icon className="size-4 text-brand animate-pulse" />
                            ) : (
                              <div className="size-4 rounded-full border border-border/40" />
                            )}
                            <span
                              className={`text-sm ${
                                isDone
                                  ? "text-foreground/50"
                                  : isActive
                                  ? "text-foreground"
                                  : "text-foreground/20"
                              }`}
                            >
                              {step.label}
                              {isDone && (
                                <span className="ml-2 text-[10px] text-brand">done</span>
                              )}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between text-[11px] text-foreground/40 mb-2">
                        <span className="uppercase tracking-[0.16em]">Progress</span>
                        <span className="tabular-nums font-medium text-foreground/60">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-border/40">
                        <motion.div
                          className="h-full rounded-full bg-brand"
                          style={{ width: `${progress}%` }}
                          transition={{ ease: "linear" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── COMPLETE ── */}
                {auditState === "complete" && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ease: EASE_OUT_EXPO }}
                    className="flex h-[240px] flex-col items-center justify-center text-center"
                  >
                    <div className="rounded-full border border-brand/30 bg-brand/10 p-3 mb-5">
                      <CheckCircle2 className="size-6 text-brand" />
                    </div>
                    <h3 className="font-display text-lg tracking-tight text-foreground">
                      Analysis complete!
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                      Your personalized report has been generated and unlocked below.
                    </p>

                    <Button
                      onClick={() => document.getElementById("audit-preview")?.scrollIntoView({ behavior: "smooth" })}
                      size="sm"
                      className="mt-6 h-9 rounded-full bg-foreground px-5 text-xs text-background transition-all hover:scale-[1.03] hover:bg-foreground/90 shadow-[0_4px_12px_-4px_var(--brand)] hover:shadow-[0_8px_24px_-8px_var(--brand)]"
                    >
                      View Report
                      <ArrowRight className="ml-1.5 size-3" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
