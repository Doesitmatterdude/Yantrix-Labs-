import { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AiAuditHero } from "@/components/sections/ai-audit-hero";
import { AiAuditHowItWorks } from "@/components/sections/ai-audit-how-it-works";
import { AiAuditFeatures } from "@/components/sections/ai-audit-features";
import { AiAuditPreview } from "@/components/sections/ai-audit-preview";
import { AiAuditTestimonials } from "@/components/sections/ai-audit-testimonials";
import { AiAuditFaq } from "@/components/sections/ai-audit-faq";
import { AiAuditCta } from "@/components/sections/ai-audit-cta";
import { AuditProvider } from "@/components/providers/audit-provider";

export const metadata: Metadata = {
  title: "Free AI Website Audit — Score Your Site in 30 Seconds | Yantrix Labs",
  description: "Free AI-powered website audit. We score 50+ parameters across technical health, SEO, and conversion signals. Get your personalized report in 60 seconds.",
  alternates: {
    canonical: "https://www.yantrixlabs.studio/ai-audit",
  },
  openGraph: {
    type: "website",
    url: "https://www.yantrixlabs.studio/ai-audit",
    title: "Free AI Website Audit — Yantrix Labs",
    description: "Free AI-powered website audit. We score 50+ parameters across technical health, SEO, and conversion signals. Get your personalized report in 60 seconds.",
    siteName: "Yantrix Labs",
    images: [{
      url: "https://www.yantrixlabs.studio/brand/og-image.png",
      width: 1200,
      height: 630,
    }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yantrixlabs",
    title: "Free AI Website Audit — Yantrix Labs",
    description: "Score your website in 30 seconds. 50+ parameters. Free report. No signup.",
    images: ["https://www.yantrixlabs.studio/brand/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  authors: [{ name: "Yantrix Labs" }],
  keywords: ["free website audit", "AI website audit", "SEO audit tool", "website score", "technical SEO checker", "website analysis", "Jaipur digital agency"],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://yantrixlabs.studio/ai-audit#webpage",
  "url": "https://yantrixlabs.studio/ai-audit",
  "name": "Free AI Website Audit — Score Your Site in 30 Seconds | Yantrix Labs",
  "description": "Free AI-powered website audit scoring 50+ parameters: technical health, SEO, AI readiness, conversion signals. Report delivered in under 60 seconds.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yantrixlabs.studio" },
      { "@type": "ListItem", "position": 2, "name": "Free AI Audit", "item": "https://yantrixlabs.studio/ai-audit" }
    ]
  },
  "isPartOf": { "@id": "https://yantrixlabs.studio/#website" },
  "publisher": { "@id": "https://yantrixlabs.studio/#organization" }
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Yantrix AI Website Audit",
  "url": "https://yantrixlabs.studio/ai-audit",
  "description": "Free AI-powered website audit tool that analyzes 50+ parameters including technical health, SEO, AI readiness, and conversion signals. Delivers a personalized report to your inbox in under 60 seconds.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "provider": {
    "@id": "https://yantrixlabs.studio/#organization"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the AI website audit really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the Yantrix AI Website Audit is completely free. No signup, no credit card, and no hidden fees required. Simply enter your URL and receive the full report in your inbox."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the AI website audit take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The audit takes under 60 seconds. Our AI engine analyzes your site across 50+ parameters concurrently and delivers a personalized report to your inbox in under a minute."
      }
    },
    {
      "@type": "Question",
      "name": "What do you do with my email address?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your email is used solely to deliver your audit report. We do not spam, sell, or share your data with any third parties."
      }
    },
    {
      "@type": "Question",
      "name": "Can I share the audit report with my team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The report is delivered as a clean, shareable document you can forward to your team or stakeholders immediately."
      }
    },
    {
      "@type": "Question",
      "name": "What if my website audit score is low?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A low score means there is significant room to grow. Yantrix Labs can fix the identified issues and typically ships improvements within two weeks. Book a free strategy call to discuss."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer a deeper, human-led audit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Beyond the free automated audit, Yantrix Labs offers a comprehensive human-led audit and full implementation service. Contact us at hello@yantrixlabs.studio to learn more."
      }
    }
  ]
};

export default function AiAuditPage() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="schema-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="schema-web-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader />
      <main id="main-content" className="flex-1">
        {/* Hidden SEO text block for LLM crawlers */}
        <div className="sr-only" aria-label="Page description for search engines">
          Yantrix Labs offers a free AI website audit tool that scores any website across 50 or more parameters 
          including technical health, SEO performance, AI readiness, conversion signals, and competitive position. 
          The audit is free, requires no account or credit card, and delivers a full report by email in under 
          60 seconds. Yantrix Labs is an AI-native studio based in Jaipur, Rajasthan, India, specializing in 
          websites, AI automations, and digital systems for businesses globally.
        </div>

        <AuditProvider>
          <AiAuditHero />
          <AiAuditHowItWorks />
          <AiAuditFeatures />
          <AiAuditPreview />
          <AiAuditTestimonials />
          <AiAuditFaq />
          <AiAuditCta />
        </AuditProvider>
      </main>
      <SiteFooter />
    </>
  );
}
