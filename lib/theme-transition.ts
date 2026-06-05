/**
 * Premium circular reveal theme transition.
 *
 * Wraps a theme-changing callback inside the View Transition API and animates
 * a clip-path expansion from a precise (x, y) origin to the furthest viewport
 * corner. Falls back to an instant theme swap on unsupported browsers and
 * fully respects prefers-reduced-motion.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
 */

// Minimal runtime type — avoids relying on TS lib version for ViewTransition
/**
 * Run a theme-mutating callback wrapped in a circular reveal animation.
 *
 * @param mutate    The function that actually changes the theme (e.g. setTheme)
 * @param origin    The (x, y) point in viewport coordinates to expand from.
 *                  If omitted, the center of the viewport is used.
 */
export function runThemeReveal(
  mutate: () => void,
  origin?: { x: number; y: number },
): void {
  // Reduced motion → instant swap, no animation
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // No View Transition API support → instant swap
  if (prefersReducedMotion || !document.startViewTransition) {
    mutate();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;

  // Furthest viewport corner from the origin point
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = document.startViewTransition(() => {
    mutate();
  });

  transition.ready
    .then(() => {
      // Premium easing — matches the project's existing motion language
      // (cubic-bezier(0.22, 1, 0.36, 1) = "ease out expo" feel)
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // Animation rejected (e.g. transition skipped) — theme is already applied
    });
}
