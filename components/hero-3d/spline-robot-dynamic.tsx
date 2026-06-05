"use client";

/**
 * Dynamic-imported entry point for the Spline robot.
 * - SSR disabled (Spline requires browser WebGL context)
 * - Lazy-loaded so the heavy Spline runtime stays out of the initial bundle
 */

import dynamic from "next/dynamic";

export const HeroRobot = dynamic(
  () => import("./spline-robot").then((m) => m.SplineRobot),
  {
    ssr: false,
    loading: () => null,
  },
);
