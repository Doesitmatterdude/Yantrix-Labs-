import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DiscoveryForm } from "@/components/sections/discovery-form";

export const metadata: Metadata = {
  title: "Book a Discovery Call — Yantrix Labs",
  description:
    "Tell us about your project. Get a concrete scope and timeline for your website, AI system, or automation — in one free 30-minute call. No obligation.",
  alternates: {
    canonical: "https://www.yantrixlabs.studio/contact",
  },
  openGraph: {
    type: "website",
    url: "https://www.yantrixlabs.studio/contact",
    title: "Book a Discovery Call — Yantrix Labs",
    description:
      "Tell us your project idea. We'll respond with a clear scope, realistic timeline, and budget — within 2 hours.",
    siteName: "Yantrix Labs",
    images: [
      {
        url: "https://www.yantrixlabs.studio/brand/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yantrixlabs",
    title: "Book a Discovery Call — Yantrix Labs",
    description:
      "Free 30-min call. Concrete scope. No obligation. Tell us about your project.",
    images: ["https://www.yantrixlabs.studio/brand/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as const,
  },
  authors: [{ name: "Yantrix Labs" }],
  keywords: [
    "book a call",
    "discovery call",
    "Yantrix Labs contact",
    "AI automation inquiry",
    "web development Jaipur",
    "hire AI developer India",
  ],
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Book a Discovery Call — Yantrix Labs",
  url: "https://www.yantrixlabs.studio/contact",
  description:
    "Submit your project inquiry to Yantrix Labs. Free 30-minute discovery call with a concrete scope and timeline.",
  provider: {
    "@type": "Organization",
    name: "Yantrix Labs",
    url: "https://www.yantrixlabs.studio",
    logo: "https://www.yantrixlabs.studio/brand/yantrix-logo.png",
    sameAs: [
      "https://maps.app.goo.gl/xCsoJuu2pykFJEA98?g_st=ac",
      "https://x.com/yantrixlabs",
      "https://www.instagram.com/yantrix.labs/"
    ],
    telephone: "+91-9251111358",
    email: "hello@yantrixlabs.studio",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "4th Floor, City Corporate Tower, Malviya Marg, C Scheme, Ashok Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302001",
      addressCountry: "IN",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.yantrixlabs.studio",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Book a Discovery Call",
      item: "https://www.yantrixlabs.studio/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="schema-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Script
        id="schema-breadcrumbs-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteHeader />
      <main id="main-content" className="flex-1">
        {/* Hidden SEO block for crawlers */}
        <div className="sr-only" aria-label="Page description for search engines">
          Yantrix Labs offers a free 30-minute discovery call for businesses
          looking to build websites, AI automations, software products, or
          custom integrations. Based in Jaipur, Rajasthan, India — serving
          clients globally. No obligation, just a clear conversation about your
          project scope and timeline.
        </div>

        {/* ── Hero ── */}
        <section className="relative isolate min-h-fit overflow-hidden pt-24 pb-8 sm:pt-32 sm:pb-12 md:pt-40 md:pb-16 flex flex-col justify-center">
          {/* Background effects */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
            <div
              className="absolute -top-40 left-1/2 hidden size-[800px] -translate-x-1/2 rounded-full opacity-30 blur-3xl animate-gradient-shift md:block"
              style={{
                background:
                  "radial-gradient(closest-side, var(--brand) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-40 right-0 hidden size-[600px] rounded-full opacity-20 blur-3xl md:block"
              style={{
                background:
                  "radial-gradient(closest-side, var(--brand-cool) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <div className="flex flex-col items-start lg:items-center lg:text-center">
              {/* Back button */}
              <div className="mb-8 w-full flex justify-start lg:justify-center">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  <span className="transition-transform group-hover:-translate-x-0.5">
                    ←
                  </span>{" "}
                  Back to Homepage
                </Link>
              </div>

              {/* Kicker badge */}
              <div className="hidden md:block">
                <div className="relative overflow-hidden rounded-full border border-brand/30 bg-background/50 px-4 py-1.5 font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-foreground/80 backdrop-blur">
                  <span className="absolute inset-0 rounded-full border border-brand/50 animate-glow-border" />
                  <span className="mr-2 inline-block text-brand">✦</span>
                  Free 30-min discovery call · No obligation
                </div>
              </div>

              {/* Headline */}
              <h1 className="mt-6 md:mt-8 text-balance font-display text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.1]">
                Let&apos;s build something{" "}
                <span className="italic text-brand">that actually ships.</span>
              </h1>

              {/* Subheadline */}
              <p className="mt-6 max-w-[58ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl lg:max-w-[65ch]">
                Tell us about your project. We&apos;ll come back with a
                concrete, realistic scope — not a 40-slide deck. One call. One
                clear next step.
              </p>
            </div>
          </div>
        </section>

        {/* ── Form Section ── */}
        <section className="pb-20 sm:pb-24">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <DiscoveryForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
