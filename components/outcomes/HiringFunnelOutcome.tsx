"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { OutcomeBadge } from "./OutcomeBadge";

const FUNNEL_STAGES = [
  { label: "Applications received", value: 312, width: "100%", color: "bg-secondary" },
  { label: "AI screen passed", value: 41, width: "13%", color: "bg-secondary" },
  { label: "Recruiter reviewed", value: 18, width: "6%", color: "bg-secondary" },
  { label: "Final interview", value: 6, width: "2%", color: "bg-brand" },
];

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    if (start === end) return;
    
    // Total duration ~800ms
    const totalDuration = 800;
    const incrementTime = Math.max(totalDuration / end, 10);

    const timer = setInterval(() => {
      start += Math.ceil(end / (totalDuration / 10)); // chunk size
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref}>{count}</span>;
}

export function HiringFunnelOutcome() {
  return (
    <div className="relative flex h-full flex-col bg-background/40 p-5 font-sans">
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between border-b border-border/40 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Hiring Run · Backend Engineer · Q2 2026
        </span>
      </div>

      {/* Funnel */}
      <div className="flex flex-col gap-4">
        {FUNNEL_STAGES.map((stage, i) => (
          <div key={stage.label} className="relative">
            <div className="mb-1.5 flex justify-between text-xs font-medium text-foreground/80">
              <span>{stage.label}</span>
              <span className="font-display tracking-tight text-foreground">
                <AnimatedNumber value={stage.value} />
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/30">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: stage.width }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${stage.color}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="mt-auto pt-8 pb-2">
        <div className="flex flex-col gap-2 border-t border-border/40 pt-4">
          <div className="inline-flex w-fit items-center rounded-md border border-border/40 bg-card px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            <span className="mr-1.5 text-brand">Insight:</span> 87% recruiter time saved
          </div>
          <div className="inline-flex w-fit items-center rounded-md border border-border/40 bg-card px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            <span className="mr-1.5 text-brand">Insight:</span> 0 unqualified candidates reached final stage
          </div>
        </div>
      </div>

      <OutcomeBadge />
    </div>
  );
}
