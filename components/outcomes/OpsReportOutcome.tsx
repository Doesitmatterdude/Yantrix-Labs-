"use client";

import { motion } from "framer-motion";
import { OutcomeBadge } from "./OutcomeBadge";

const TIMELINE = [
  { time: "Mon 09:12", text: "Reminder sent to 14 clients", color: "bg-emerald-500" },
  { time: "Mon 14:30", text: "2 no-shows rescheduled automatically", color: "bg-amber-500" },
  { time: "Wed 10:05", text: "Invoice generated post-session × 9", color: "bg-emerald-500" },
  { time: "Thu 11:00", text: "AI call placed to lapsed client", color: "bg-amber-500" },
  { time: "Fri 17:00", text: "Weekly report compiled", color: "bg-emerald-500" },
];

export function OpsReportOutcome() {
  return (
    <div className="relative flex h-full flex-col bg-background/40 p-5 font-sans">
      {/* Top Bar */}
      <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Week of May 26 · AI Calling Assistant
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Stat 1 */}
        <div className="flex flex-col rounded-lg border border-border/40 bg-card p-3">
          <span className="font-display text-2xl tracking-tight text-foreground">94%</span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Follow-up rate
          </span>
          <span className="mt-1.5 text-[10px] text-foreground/40">was 61%</span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col rounded-lg border border-border/40 bg-card p-3">
          <span className="font-display text-2xl tracking-tight text-emerald-500">↓ 67%</span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            No-show rate
          </span>
          <span className="mt-1.5 text-[10px] text-foreground/40">from baseline</span>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col rounded-lg border border-border/40 bg-card p-3">
          <span className="font-display text-2xl tracking-tight text-brand">3.1×</span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Revenue / staff hr
          </span>
          <span className="mt-1.5 text-[10px] text-foreground/40">compounding</span>
        </div>

        {/* Stat 4 */}
        <div className="flex flex-col rounded-lg border border-border/40 bg-card p-3">
          <span className="font-display text-2xl tracking-tight text-foreground">0 hrs</span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Manual follow-up
          </span>
          <span className="mt-1.5 text-[10px] text-foreground/40">this week</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-auto pt-6 pb-2">
        <div className="border-t border-border/40 pt-4">
          <div className="flex flex-col gap-2.5 relative">
            {/* Connecting line */}
            <div className="absolute bottom-2 left-1 top-2 w-[1px] bg-border/40" />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative flex items-center gap-3 pl-4"
              >
                <div className={`absolute left-[3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ring-2 ring-background ${item.color}`} />
                <span className="w-14 shrink-0 font-mono text-[9px] text-muted-foreground">
                  {item.time}
                </span>
                <span className="truncate text-xs text-foreground/80">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <OutcomeBadge />
    </div>
  );
}
