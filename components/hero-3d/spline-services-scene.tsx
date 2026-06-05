"use client";

/**
 * SplineServicesScene
 *
 * 3D web landing scene displayed inside the Services section, replacing the
 * three bento cards (Modern Web & Product, AI Systems, Bespoke Agents).
 *
 * Same architecture as SplineRobot:
 *  - Lazy-loaded Spline runtime
 *  - Mobile/touch guard (loads on lg+ desktop only)
 *  - Reduced-motion respected
 *  - Error boundary so an invalid scene URL never crashes the page
 *
 * Scene URL is read from NEXT_PUBLIC_SPLINE_SERVICES_URL.
 */

import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SERVICES_URL = process.env.NEXT_PUBLIC_SPLINE_SERVICES_URL ?? "";

function isValidSplineUrl(url: string): boolean {
  return /^https:\/\/prod\.spline\.design\/.+\/scene\.splinecode$/.test(url);
}

export function SplineServicesScene() {
  const [shouldRender, setShouldRender] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Render on all devices — Spline scenes are lightweight enough for mobile
    setShouldRender(true);

    const touchDevice = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touchDevice);

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(reducedMq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    reducedMq.addEventListener("change", handler);
    return () => reducedMq.removeEventListener("change", handler);
  }, []);

  if (!shouldRender) return null;

  if (!isValidSplineUrl(SPLINE_SERVICES_URL)) {
    return <ScenePlaceholder showSetupHint />;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-3xl"
    >
      <SplineErrorBoundary fallback={<ScenePlaceholder />}>
        <Suspense fallback={<ScenePlaceholder />}>
          {/* Scale wrapper — Spline scenes can render with their own
              internal letterboxing/black strips when the canvas aspect
              ratio doesn't match the source scene. Scaling up also crops
              the "Built with Spline" watermark in the bottom-right.
              The transform origin is biased downward so the scene's
              headline text stays vertically centered in view. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "scale(1.28)",
              transformOrigin: "center 65%",
            }}
          >
            <Spline
              scene={SPLINE_SERVICES_URL}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                pointerEvents: reducedMotion || isTouch ? "none" : "auto",
              }}
            />
          </div>
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}

class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (typeof console !== "undefined") {
      console.warn("[SplineServicesScene] Scene failed to load:", error);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function ScenePlaceholder({
  showSetupHint = false,
}: {
  showSetupHint?: boolean;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl">
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="size-14 rounded-full border border-foreground/10"
          style={{
            background:
              "radial-gradient(closest-side, var(--brand-glow-soft), transparent)",
            animation: "pulse-ring 2s ease-out infinite",
          }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/40">
          {showSetupHint ? "Spline scene not configured" : "Loading scene"}
        </span>
        {showSetupHint && (
          <span className="max-w-[280px] font-mono text-[10px] leading-relaxed text-foreground/30">
            Set NEXT_PUBLIC_SPLINE_SERVICES_URL to your exported .splinecode URL
          </span>
        )}
      </div>
    </div>
  );
}
