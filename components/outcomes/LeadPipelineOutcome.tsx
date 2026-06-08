"use client";

import { motion } from "framer-motion";
import { OutcomeBadge } from "./OutcomeBadge";

const LEADS = [
  { name: "Meridian SaaS", score: 94, status: "QUALIFIED", color: "bg-emerald-500", pulse: true },
  { name: "Forte Digital", score: 87, status: "QUALIFIED", color: "bg-emerald-500", pulse: true },
  { name: "Atlas Media", score: 62, status: "IN REVIEW", color: "bg-amber-500", pulse: false },
  { name: "Nexus Recruit", score: 24, status: "DISQUALIFIED", color: "bg-muted-foreground", pulse: false },
];

export function LeadPipelineOutcome() {
  return (
    <div className="relative flex h-full flex-col bg-background/40 p-5 font-sans">
      {/* Top Bar */}
      <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Lead Pipeline · Week 3
        </span>
      </div>

      {/* Leads List */}
      <div className="flex flex-col gap-2">
        {LEADS.map((lead, i) => (
          <motion.div
            key={lead.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center justify-between rounded-md border border-border/40 bg-secondary/20 p-2.5 transition-colors hover:bg-secondary/40"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex size-2">
                {lead.pulse && (
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${lead.color}`}></span>
                )}
                <span className={`relative inline-flex size-2 rounded-full ${lead.color}`}></span>
              </span>
              <span className="text-sm font-medium text-foreground/90">{lead.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded bg-background px-2 py-0.5 font-mono text-[10px] text-foreground/70 sm:inline-block">
                {lead.score} / ICP MATCH
              </span>
              <span className={`w-20 text-right font-mono text-[9px] uppercase tracking-wider ${
                lead.status === "QUALIFIED" ? "text-emerald-500" :
                lead.status === "IN REVIEW" ? "text-amber-500" : "text-muted-foreground"
              }`}>
                {lead.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Bottom */}
      <div className="mt-auto pt-6 pb-2">
        <div className="grid grid-cols-3 gap-3 divide-x divide-border/40 border-t border-border/40 pt-4">
          <div className="flex flex-col px-2">
            <span className="font-display text-lg tracking-tight text-foreground">247 <span className="text-muted-foreground">→</span> 31</span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Reviewed vs Qualified</span>
          </div>
          <div className="flex flex-col px-2">
            <span className="font-display text-lg tracking-tight text-brand">4.2×</span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Pipeline lift</span>
          </div>
          <div className="flex flex-col px-2">
            <span className="font-display text-lg tracking-tight text-foreground">18 days</span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Time to close</span>
          </div>
        </div>
      </div>

      <OutcomeBadge />
    </div>
  );
}
