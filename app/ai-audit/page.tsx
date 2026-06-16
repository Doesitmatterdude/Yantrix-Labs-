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
  description: "Get a free AI-powered audit of your website. We analyze 50+ parameters — technical health, SEO, AI readiness, conversion signals — and email your personalized report in under 60 seconds. No signup needed.",
  alternates: {
    canonical: "https://www.yantrixlabs.studio/ai-audit",
  },
  openGraph: {
    type: "website",
    url: "https://www.yantrixlabs.studio/ai-audit",
    title: "Free AI Website Audit — Yantrix Labs",
    description: "AI-powered audit across 50+ parameters. Technical health, SEO, AI readiness, conversion signals. Free report in your inbox in 60 seconds.",
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

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Yantrix AI Website Audit",
  "url": "https://www.yantrixlabs.studio/ai-audit",
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
    "@type": "Organization",
    "name": "Yantrix Labs",
    "url": "https://www.yantrixlabs.studio",
    "logo": "https://www.yantrixlabs.studio/brand/yantrix-logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, City Corporate Tower, Malviya Marg, C Scheme, Ashok Nagar",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302001",
      "addressCountry": "IN"
    },
    "telephone": "+91-9829842694",
    "email": "hello@yantrixlabs.studio"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — completely free, no credit card, no hidden upsell gate. We use the audit to demonstrate exactly how much room for improvement exists. If the report is valuable, some teams choose to work with us on the fixes. But the audit itself is yours to keep either way."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the audit take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically under 60 seconds. Our engine crawls your site concurrently across multiple analysis dimensions. Once complete, the full report is delivered to your inbox immediately."
      }
    },
    {
      "@type": "Question",
      "name": "What do you do with my email?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use it to send your audit report and, occasionally, genuinely useful insights about website performance and AI automation. We never sell your data, and you can unsubscribe with one click."
      }
    },
    {
      "@type": "Question",
      "name": "Can I share the report with my team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The report is designed to be shareable — clear scores, non-technical explanations, and a prioritized action list. It's a useful artifact for stakeholder conversations."
      }
    },
    {
      "@type": "Question",
      "name": "What if my score is low?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A low score is actually good news — it means there's significant, untapped upside. The report will show you exactly what's dragging the score down and what to fix first. If you'd like help, we can walk through the roadmap on a free strategy call."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer a deeper, human-led audit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The AI audit is a powerful starting point. For a comprehensive analysis of your brand positioning, technical architecture, and growth strategy, you can book a free 30-minute strategy call with our team."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.yantrixlabs.studio" },
    { "@type": "ListItem", "position": 2, "name": "Free AI Website Audit", "item": "https://www.yantrixlabs.studio/ai-audit" }
  ]
};

export default function AiAuditPage() {
  return (
    <>
      {/* Structured Data */}
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
      <Script
        id="schema-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
