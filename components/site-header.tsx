"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogoMark } from "@/components/brand-logo";
import { NAV_LINKS, WHATSAPP_LINK } from "@/lib/site-data";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled
            ? "border-border bg-background/75 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 pl-2">
          <BrandLogoMark className="size-8" />
          <span className="font-mono text-sm font-medium tracking-tight">
            Yantrix Labs
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-3 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
              {/* Underline slide-in on hover */}
              <span className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden rounded-full bg-foreground px-3.5 text-background transition-all hover:scale-[1.03] hover:bg-foreground/90 sm:inline-flex"
          >
            <Link href="/ai-audit">
              {/* Pulsing dot */}
              <span className="relative mr-1.5 flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative size-2 rounded-full bg-brand" />
              </span>
              Book free audit
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-3 top-full mt-2 rounded-2xl border bg-background/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-2 rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/ai-audit">
                  <span className="relative mr-1.5 flex size-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative size-2 rounded-full bg-brand" />
                  </span>
                  Book free audit
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
