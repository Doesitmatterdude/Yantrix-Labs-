"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * UI Sound Design System
 * Synthesizes all sounds via Web Audio API — zero audio files, zero dependencies.
 * Attaches to CTA buttons, section reveals, and card/nav hovers.
 */
export function SoundSystem() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const hoverCooldownRef = useRef(false);
  const initializedRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Initialize AudioContext on first user interaction
  const initAudio = useCallback(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return;
      audioCtxRef.current = new Ctx();
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    } catch {
      // Private mode or unsupported — fail silently
      audioCtxRef.current = null;
    }
  }, []);

  // Sound: CTA Click — short confident "thock"
  const playCtaClick = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (isMutedRef.current || !ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.13);
  }, []);

  // Sound: Section Reveal — soft airy rising chime
  const playSectionReveal = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (isMutedRef.current || !ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.36);
  }, []);

  // Sound: Hover — ultra-subtle tick
  const playHover = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (isMutedRef.current || !ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  // Sound: Mute toggle confirmation — always plays (bypasses mute)
  const playMuteToggle = useCallback((muting: boolean) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const freq = muting ? 300 : 600;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.11);
  }, []);

  // Initialize on first interaction + attach event listeners
  useEffect(() => {
    // Respect reduced motion
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setIsMuted(true);
      isMutedRef.current = true;
    }

    // Init audio on first click/keydown
    const handleFirstInteraction = () => {
      initAudio();
    };
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("keydown", handleFirstInteraction, {
      once: true,
    });

    // CTA click sounds — attach to primary buttons
    const ctaHandler = () => {
      initAudio();
      playCtaClick();
    };
    const ctaElements = document.querySelectorAll(
      'a[class*="bg-foreground"], button[class*="bg-foreground"], [data-sound="cta"]',
    );
    ctaElements.forEach((el) => {
      el.addEventListener("pointerdown", ctaHandler);
    });

    // Section reveal sounds — IntersectionObserver
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playSectionReveal();
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    const sections = document.querySelectorAll("section, [data-sound-reveal]");
    sections.forEach((el) => sectionObserver.observe(el));

    // Hover sounds — only on fine pointer devices (not touch)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const hoverElements = !isTouch
      ? document.querySelectorAll("nav a, .card, [data-sound='hover']")
      : [];
    const hoverHandler = () => {
      if (hoverCooldownRef.current) return;
      initAudio();
      playHover();
      hoverCooldownRef.current = true;
      setTimeout(() => {
        hoverCooldownRef.current = false;
      }, 120);
    };
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", hoverHandler);
    });

    // Cleanup
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      ctaElements.forEach((el) => {
        el.removeEventListener("pointerdown", ctaHandler);
      });
      sectionObserver.disconnect();
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", hoverHandler);
      });
    };
  }, [initAudio, playCtaClick, playSectionReveal, playHover]);

  // Toggle handler
  const handleToggle = () => {
    initAudio();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    playMuteToggle(newMuted);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isMuted ? "Unmute UI sounds" : "Mute UI sounds"}
      aria-pressed={isMuted}
      title="Toggle UI sounds"
      className="sound-toggle"
    >
      {/* Speaker icon (unmuted) */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={isMuted ? "hidden" : "block"}
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
      {/* Muted icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={isMuted ? "block" : "hidden"}
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    </button>
  );
}
