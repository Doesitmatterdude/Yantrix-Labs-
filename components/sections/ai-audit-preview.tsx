"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { WHATSAPP_LINK } from "@/lib/site-data";
import { SectionEyebrow } from "./services-section";
import { useAudit } from "@/components/providers/audit-provider";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const scores = [
  { label: "Technical Health", value: 71, status: "ok" },
  { label: "SEO Performance", value: 58, status: "warn" },
  { label: "AI Readiness", value: 34, status: "critical" },
  { label: "Conversion Signals", value: 67, status: "ok" },
  { label: "Competitive Position", value: 55, status: "warn" },
];

const issues = [
  "No meta description on 12 pages",
  "Page load speed: 4.2s (target: <2s)",
  "No chatbot or AI automation detected",
];

const recommendations = [
  { text: "Fix meta descriptions", impact: "+15 SEO pts" },
  { text: "Optimize images & lazy-load", impact: "+20 speed pts" },
  { text: "Integrate AI chatbot", impact: "+30 AI score pts" },
];

function ScoreBar({ value, status }: { value: number; status: string }) {
  const colorClass =
    status === "critical"
      ? "bg-destructive"
      : status === "warn"
      ? "bg-brand"
      : "bg-emerald-500";

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/40">
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT_EXPO }}
      />
    </div>
  );
}

export function AiAuditPreview() {
  const { auditData, isUnlocked } = useAudit();

  const displayScores = isUnlocked && auditData ? [
    { label: "Technical Health", value: auditData.scores.technical, status: auditData.scores.technical > 70 ? "ok" : auditData.scores.technical > 40 ? "warn" : "critical" },
    { label: "SEO Performance", value: auditData.scores.seo, status: auditData.scores.seo > 70 ? "ok" : auditData.scores.seo > 40 ? "warn" : "critical" },
    { label: "AI Readiness", value: auditData.scores.ai, status: auditData.scores.ai > 70 ? "ok" : auditData.scores.ai > 40 ? "warn" : "critical" },
    { label: "Conversion Signals", value: auditData.scores.conversion, status: auditData.scores.conversion > 70 ? "ok" : auditData.scores.conversion > 40 ? "warn" : "critical" },
    { label: "Competitive Position", value: auditData.scores.competitive, status: auditData.scores.competitive > 70 ? "ok" : auditData.scores.competitive > 40 ? "warn" : "critical" },
  ] : scores;

  const displayIssues = isUnlocked && auditData ? auditData.issues : issues;
  const displayRecs = isUnlocked && auditData ? auditData.recommendations : recommendations;
  const displayOverall = isUnlocked && auditData ? auditData.overallScore : 62;

  return (
    <section id="audit-preview" className="relative scroll-mt-24 border-t border-border/60 bg-secondary/30 py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <SectionEyebrow>
            {isUnlocked ? "Your personalized report" : "Sample report"}
          </SectionEyebrow>
          <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {isUnlocked ? (
              <>
                Here are your{" "}
                <span className="italic text-brand">live results.</span>
              </>
            ) : (
              <>
                Here&apos;s what you&apos;ll{" "}
                <span className="italic text-brand">actually get.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground">
            No fluff, no vanity metrics. Clear scores, ranked issues, and a
            prioritized action plan — designed to be shared with your team
            immediately.
          </p>
        </motion.div>

        {/* Report card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="relative mx-auto max-w-4xl"
        >
          {/* Glow */}
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-3xl opacity-30 blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, var(--brand-glow-soft), transparent 70%)",
            }}
          />

          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_8px_32px_-12px_rgba(0,0,0,0.3)]">
            {/* Report header */}
            <div className="border-b border-border/40 bg-secondary/20 px-6 py-4 sm:px-8 sm:py-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    <span className="size-1 rounded-full bg-brand" />
                    Yantrix Labs · AI Website Audit
                  </div>
                  <div className="mt-1 font-display text-lg tracking-tight text-foreground">
                    {isUnlocked && auditData?.businessName ? auditData.businessName : "example.com"}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="self-start rounded-full border-border/70 bg-background/40 font-mono text-[9px] font-normal uppercase tracking-[0.16em] text-foreground/55"
                >
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Badge>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Overall score */}
              <div className="mb-8 flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-secondary/20 p-6 text-center sm:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40 mb-3">
                  Overall Score
                </div>
                <motion.div
                  className="font-display text-6xl tracking-tight text-foreground sm:text-7xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {displayOverall}
                  <span className="text-3xl text-foreground/30 sm:text-4xl">
                    /100
                  </span>
                </motion.div>
                <div className="mt-3 w-full max-w-xs">
                  <ScoreBar value={displayOverall} status={displayOverall > 70 ? "ok" : "warn"} />
                </div>
              </div>

              {/* Dimension scores */}
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/30 md:grid-cols-5 [&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1">
                {displayScores.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="bg-card p-4 sm:p-5"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40 mb-2">
                      {s.label}
                    </div>
                    <div className="font-display text-2xl tracking-tight text-foreground">
                      {s.value}
                      <span className="text-sm text-foreground/30">/100</span>
                    </div>
                    <div className="mt-2">
                      <ScoreBar value={s.value} status={s.status} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Issues & Recommendations */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {/* Issues */}
                <div className="rounded-2xl border border-border/40 p-5 sm:p-6">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-destructive/80 mb-4">
                    <span className="size-1.5 rounded-full bg-destructive" />
                    Top Issues Found
                  </div>
                  <ul className="space-y-3">
                    {displayIssues.map((issue) => (
                      <li
                        key={issue}
                        className="flex items-start gap-2.5 text-sm text-foreground/80"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive/60" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="rounded-2xl border border-border/40 p-5 sm:p-6">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand/80 mb-4">
                    <span className="size-1.5 rounded-full bg-brand" />
                    Recommendations
                  </div>
                  <ul className="space-y-3">
                    {displayRecs.map((rec) => (
                      <li
                        key={rec.text}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <span className="flex items-start gap-2.5 text-foreground/80">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand/60" />
                          {rec.text}
                        </span>
                        <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand">
                          {rec.impact}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* In-report CTA */}
              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-background/40 p-6 text-center sm:flex-row sm:text-left">
                <p className="text-sm text-muted-foreground">
                  Want us to fix these issues? We typically ship fixes in under
                  two weeks.
                </p>
                <Button
                  asChild
                  className="shrink-0 rounded-full bg-foreground text-background transition-all hover:scale-[1.03] hover:bg-foreground/90"
                >
                  <Link
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Book strategy call
                    <ArrowUpRight className="ml-1.5 size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Below preview note */}
        {!isUnlocked && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center font-mono text-xs uppercase tracking-[0.18em] text-foreground/40"
          >
            ↑ Sample report · Enter your URL above for a personalized version
          </motion.p>
        )}
      </div>
    </section>
  );
}
