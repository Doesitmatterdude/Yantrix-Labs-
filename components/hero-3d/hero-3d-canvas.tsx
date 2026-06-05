"use client";

/**
 * Hero3DCanvas
 *
 * Client-only Canvas wrapper for the HeroInfrastructureScene.
 * - Detects mobile via matchMedia → renders nothing (parent shows 2D fallback)
 * - Detects prefers-reduced-motion → renders static scene with no animation/post-fx
 * - Caps DPR for premium quality without GPU spikes
 * - frameloop="always" on desktop, "demand" on reduced-motion
 *
 * The Canvas is `pointer-events-none` so the hero CTAs above it remain clickable.
 */

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { HeroInfrastructureScene } from "./hero-infrastructure-scene";

export function Hero3DCanvas() {
  const [shouldRender, setShouldRender] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Bail on touch / coarse-pointer devices — the 2D fallback is more performant there
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.matchMedia("(max-width: 1024px)").matches;
    if (isTouch || isSmall) {
      setShouldRender(false);
      return;
    }

    setShouldRender(true);

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(reducedMq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    reducedMq.addEventListener("change", handler);
    return () => reducedMq.removeEventListener("change", handler);
  }, []);

  if (!shouldRender) return null;

  return (
    <Canvas
      // Camera positioned for a slight top-down 3/4 perspective
      camera={{ position: [0, 0.5, 8.5], fov: 38, near: 0.1, far: 100 }}
      // DPR clamp: never below 1, capped at 1.5 for premium quality without GPU strain
      dpr={[1, 1.5]}
      // Demand-based render loop on reduced motion (single static frame)
      frameloop={reducedMotion ? "demand" : "always"}
      // Transparent background — hero gradient shows through
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      // Don't intercept pointer events — CTAs above stay clickable
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
      // Accessibility: scene is decorative; screen readers should ignore it
      aria-hidden="true"
      // Initial scene background fully transparent
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>
        <HeroInfrastructureScene reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
