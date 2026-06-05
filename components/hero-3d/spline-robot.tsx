"use client";

/**
 * SplineRobot
 *
 * Loads an interactive 3D robot from Spline using @splinetool/react-spline.
 * Hover/click interactivity is built INSIDE the Spline editor (Events panel)
 * — this component just renders the published scene.
 *
 * SETUP REQUIRED:
 *  1. Open https://app.spline.design/file/b47084d6-91b7-4bad-ba0b-2d0a4e3fbe1a
 *  2. Add Mouse Hover events on the robot's parts (head/eyes/etc.)
 *  3. Click Export → Code (Public URI) → copy the .splinecode URL
 *  4. Paste it into the SPLINE_SCENE_URL constant below (or set the
 *     NEXT_PUBLIC_SPLINE_SCENE_URL env variable)
 *
 * Reference (community file):
 *   https://app.spline.design/community/file/615b9422-9985-43f6-8593-d7d7bc3b0be1
 *
 * The component is self-protecting — if the URL is invalid or unreachable,
 * it falls back to a clean placeholder so the site doesn't break.
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

/**
 * Paste your exported .splinecode URL here (or use the env variable).
 * If left empty / invalid, the component shows a graceful placeholder.
 */
const SPLINE_SCENE_URL =
  process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ??
  "https://my.spline.design/nexbotrobotcharacterconcept-uaXVagz1hJtxCB38s2VdGgVz/";

function isSplineCodeUrl(url: string): boolean {
  return /^https:\/\/prod\.spline\.design\/.+\/scene\.splinecode$/.test(url);
}

function isSplineViewerUrl(url: string): boolean {
  return /^https:\/\/my\.spline\.design\/.+\/?$/.test(url);
}

function isValidSplineUrl(url: string): boolean {
  return isSplineCodeUrl(url) || isSplineViewerUrl(url);
}

export function SplineRobot() {
  const [shouldRender, setShouldRender] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
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

  // Until a valid Spline URL is configured, show the placeholder.
  // This keeps the site stable while you finish the Spline export step.
  if (!isValidSplineUrl(SPLINE_SCENE_URL)) {
    return <RobotPlaceholder showSetupHint />;
  }

  if (isSplineViewerUrl(SPLINE_SCENE_URL)) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-3xl"
      >
        <iframe
          src={SPLINE_SCENE_URL}
          title="Yantrix Labs 3D robot"
          className="h-full w-full border-0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          loading="lazy"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, var(--background) 100%)",
            opacity: 0.25,
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-3xl"
    >
      <SplineErrorBoundary fallback={<RobotPlaceholder />}>
        <Suspense fallback={<RobotPlaceholder />}>
          <Spline
            scene={SPLINE_SCENE_URL}
            style={{
              width: "100%",
              height: "100%",
              pointerEvents: reducedMotion ? "none" : "auto",
            }}
          />
        </Suspense>
      </SplineErrorBoundary>

      {/* Soft vignette overlay — keeps the robot contained inside the
          glassmorphism card and helps it feel intentional in both themes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, var(--background) 100%)",
          opacity: 0.25,
        }}
      />
    </div>
  );
}

/**
 * Catches runtime errors from the Spline scene loader (invalid URL,
 * malformed scene file, network failure) and shows a fallback so the
 * rest of the page keeps working.
 */
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
      console.warn("[SplineRobot] Scene failed to load:", error);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/**
 * Subtle placeholder shown while loading, when no URL is configured,
 * or if the scene fails. Uses the same dark cinematic feel as the rest
 * of the site.
 */
function RobotPlaceholder({
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
          <span className="max-w-[260px] font-mono text-[10px] leading-relaxed text-foreground/30">
            Set NEXT_PUBLIC_SPLINE_SCENE_URL to your exported .splinecode URL
          </span>
        )}
      </div>
    </div>
  );
}
