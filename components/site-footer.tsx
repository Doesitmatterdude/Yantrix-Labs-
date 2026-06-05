"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogoMark } from "@/components/brand-logo";
import { WHATSAPP_LINK, SOCIAL_LINKS } from "@/lib/site-data";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Notebook", href: "#notebook" },
      { label: "Case Studies", href: "#cases" },
      { label: "Contact", href: WHATSAPP_LINK, external: true },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Websites & Apps", href: "#services" },
      { label: "AI Automations", href: "#services" },
      { label: "AI Systems", href: "#systems" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
    ],
  },
];

const SOCIAL_ICONS = [
  { icon: Facebook, label: "Facebook", href: SOCIAL_LINKS.facebook },
  { icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
  { icon: Linkedin, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { icon: Twitter, label: "X", href: SOCIAL_LINKS.twitter },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-background pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <BrandLogoMark className="size-8" />
              <span className="font-mono text-sm">Yantrix Labs</span>
            </div>
            <p className="mt-5 max-w-md text-pretty text-muted-foreground">
              An AI-native product studio building modern websites, products,
              and AI systems that deploy in days, not quarters.
            </p>

            <Button
              asChild
              className="mt-6 rounded-full bg-foreground text-background transition-all hover:scale-[1.03] hover:bg-foreground/90"
            >
              <Link href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                Book a free audit <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>

            <div className="mt-6 flex items-start gap-2 font-mono text-xs text-foreground/55">
              <MapPin className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} />
              <address className="not-italic">
                Yantrix Labs, Corporate Tower,
                <br />C Scheme, Jaipur, India
              </address>
            </div>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-1">
              {SOCIAL_ICONS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="group grid size-10 place-items-center rounded-full text-foreground/60 transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <s.icon className="size-4" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        {...(l.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Big logotype */}
        <div className="border-t border-border/60 py-10">
          <div
            aria-hidden
            className="select-none text-center font-display text-[16vw] leading-none tracking-tight text-brand"
          >
            Yantrix
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 py-5 sm:flex-row">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">
            © {new Date().getFullYear()} Yantrix Labs. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            {SOCIAL_ICONS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="group grid size-9 place-items-center rounded-full text-foreground/60 transition-colors hover:bg-secondary hover:text-foreground"
              >
                <s.icon className="size-4" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
