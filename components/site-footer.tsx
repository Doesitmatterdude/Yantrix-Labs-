"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUpRight,
  MapPin,
  Phone,
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
        <div className="grid grid-cols-1 gap-10 pb-12 lg:pb-16 lg:grid-cols-12">
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

            <div className="mt-8 flex flex-col gap-5 font-mono text-xs text-foreground/55">
              {/* Location */}
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} />
                <address className="not-italic leading-[1.6]">
                  4th Floor, City Corporate Tower,
                  <br />Malviya Marg, C Scheme, Ashok Nagar,
                  <br />Jaipur, Rajasthan, India — Pincode: 302001
                </address>
              </div>
              
              {/* Phone Numbers */}
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col gap-2 pt-0.5">
                  <a href="tel:+919829842694" className="hover:text-foreground transition-colors">+91-9829842694</a>
                  <a href="tel:+919251111358" className="hover:text-foreground transition-colors">+91-9251111358</a>
                </div>
              </div>
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

        {/* Minimal Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 py-6 sm:flex-row">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
            © {new Date().getFullYear()} Yantrix Labs. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            {SOCIAL_ICONS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="group grid size-9 place-items-center rounded-full text-foreground/50 transition-all hover:bg-secondary/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
