"use client"

import { motion } from "framer-motion"
import { Users, MapPin, Globe, Sparkles, Package, Clock } from "lucide-react"
import { TRUST_BADGES } from "@/lib/site-data"

const ICONS = [Users, MapPin, Globe, Sparkles, Package, Clock]

export function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-secondary/30 py-3">
      <div className="relative flex">
        {/* Gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-secondary/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-secondary/80 to-transparent" />

        {/* Marquee track */}
        <motion.div
          className="flex animate-marquee gap-10"
          style={{ willChange: "transform" }}
        >
          {TRUST_BADGES.map((badge, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <div
                key={badge}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-foreground/70"
              >
                <Icon className="size-3.5 text-brand" strokeWidth={1.5} />
                <span>{badge}</span>
              </div>
            )
          })}
          {/* Second set for seamless loop */}
          {TRUST_BADGES.map((badge, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <div
                key={`${badge}-dup`}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-foreground/70"
              >
                <Icon className="size-3.5 text-brand" strokeWidth={1.5} />
                <span>{badge}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
