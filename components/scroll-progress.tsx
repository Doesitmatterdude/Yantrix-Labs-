"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const progress = Math.min(
        100,
        Math.max(0, (scrollY / (docHeight - winHeight)) * 100),
      );
      bar.style.width = `${progress}%`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress(); // initial

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={barRef}
      id="scroll-progress"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: "0%",
        background: "var(--brand)",
        boxShadow: reducedMotion ? "none" : "0 0 8px var(--brand-glow)",
        zIndex: 9999,
        willChange: "width",
        transition: "width 0.05s linear",
        opacity: reducedMotion ? 0.4 : 1,
        pointerEvents: "none",
      }}
    />
  );
}
