"use client";

/**
 * Dynamic-imported entry point for the 3D hero scene.
 * - SSR disabled (Three.js requires browser WebGL context)
 * - Lazy-loaded so the initial bundle stays light
 */

import dynamic from "next/dynamic";

export const Hero3D = dynamic(
  () => import("./hero-3d-canvas").then((m) => m.Hero3DCanvas),
  {
    ssr: false,
    loading: () => null,
  },
);
