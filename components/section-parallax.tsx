"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SectionParallaxProps {
  children: React.ReactNode;
  /** CSS background or gradient string */
  background?: string;
  /** Additional className for the background layer */
  bgClassName?: string;
  /** Parallax intensity as percentage (default 15) */
  intensity?: number;
}

/**
 * Wraps a section's background in a parallax-moving layer.
 * Content sits above in a relative z-1 wrapper and does NOT move.
 * Respects prefers-reduced-motion.
 */
export function SectionParallax({
  children,
  background,
  bgClassName = "",
  intensity = 15,
}: SectionParallaxProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // On mobile, reduce intensity; if reduced motion, no movement
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;
  const effectiveIntensity = reduced
    ? 0
    : isMobile
      ? Math.min(intensity, 5)
      : intensity;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${effectiveIntensity}%`],
  );

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Parallax background layer */}
      {reduced ? (
        <div
          aria-hidden
          className={`absolute inset-0 -z-10 ${bgClassName}`}
          style={background ? { background } : undefined}
        />
      ) : (
        <motion.div
          aria-hidden
          className={`absolute -z-10 ${bgClassName}`}
          style={{
            inset: `-${effectiveIntensity}%`,
            width: `calc(100% + ${effectiveIntensity * 2}%)`,
            height: `calc(100% + ${effectiveIntensity * 2}%)`,
            willChange: "transform",
            y,
            ...(background ? { background } : {}),
          }}
        />
      )}

      {/* Content layer — does not move */}
      <div className="relative z-1">{children}</div>
    </div>
  );
}
