"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check if fine pointer (non-touch) device
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    const motionReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setIsPointerDevice(pointerFine && hoverCapable);
    setReducedMotion(motionReduced);
  }, []);

  useEffect(() => {
    if (!isPointerDevice || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Inject cursor-hide style
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    // Mouse move — state only, no DOM updates here
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop for both dot and ring
    const LERP = 0.12;
    const animateRing = () => {
      // Smooth the ring position
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * LERP;
      
      // Update DOM inside RAF to sync with display refresh rate and avoid style recalculation thrashing
      dot.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0) scale(var(--cursor-scale, 1))`;
      ring.style.transform = `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0)`;
      
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    // Hover states
    const addCursorClass = (cls: string) => {
      dot.classList.add(cls);
      ring.classList.add(cls);
    };
    const removeCursorClass = (cls: string) => {
      dot.classList.remove(cls);
      ring.classList.remove(cls);
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const cta = target.closest("a, button, [role='button']");
      const card = target.closest(".card, [data-cursor='expand']");
      if (cta) addCursorClass("cursor--cta");
      else if (card) addCursorClass("cursor--expand");
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const cta = target.closest("a, button, [role='button']");
      const card = target.closest(".card, [data-cursor='expand']");
      if (cta) removeCursorClass("cursor--cta");
      else if (card) removeCursorClass("cursor--expand");
    };

    const onMouseDown = () => addCursorClass("cursor--click");
    const onMouseUp = () => removeCursorClass("cursor--click");

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onMouseEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      // Remove injected style
      const injected = document.getElementById("custom-cursor-style");
      if (injected) injected.remove();
    };
  }, [isPointerDevice, reducedMotion]);

  // Don't render on touch devices or reduced motion
  if (!isPointerDevice || reducedMotion) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
