"use client";

/**
 * Dynamic-imported entry point for the Services section Spline scene.
 * - SSR disabled (Spline requires browser WebGL context)
 * - Lazy-loaded so the heavy Spline runtime stays out of the initial bundle
 */

import dynamic from "next/dynamic";

export const ServicesScene = dynamic(
  () => import("./spline-services-scene").then((m) => m.SplineServicesScene),
  {
    ssr: false,
    loading: () => null,
  },
);
