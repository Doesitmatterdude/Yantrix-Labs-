"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { runThemeReveal } from "@/lib/theme-transition";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleToggle = () => {
    const next = isDark ? "light" : "dark";
    // Capture origin from the button center for the circular reveal
    const rect = btnRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : undefined;

    runThemeReveal(() => setTheme(next), origin);
  };

  return (
    <Button
      ref={btnRef}
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggle}
      className="rounded-full text-foreground/80 hover:text-foreground"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
