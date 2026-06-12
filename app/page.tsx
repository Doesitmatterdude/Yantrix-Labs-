import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesSection } from "@/components/sections/services-section";
import { SystemsSection } from "@/components/sections/systems-section";
import { AboutSection } from "@/components/sections/about-section";
import { CasesSection } from "@/components/sections/cases-section";
import { NotebookSection } from "@/components/sections/notebook-section";
import { SocialStrip } from "@/components/sections/social-strip";
import { FinalCta } from "@/components/sections/final-cta";
import { SectionParallax } from "@/components/section-parallax";

export default function HomePage() {
  return (
    <main id="main-content" className="relative overflow-x-clip">
      <SiteHeader />
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <SectionParallax bgClassName="bg-secondary/30" intensity={12}>
        <SystemsSection />
      </SectionParallax>
      <AboutSection />
      <CasesSection />
      <SectionParallax bgClassName="bg-secondary/30" intensity={12}>
        <NotebookSection />
      </SectionParallax>
      <SocialStrip />
      <SectionParallax intensity={15}>
        <FinalCta />
      </SectionParallax>
      <SiteFooter />

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Yantrix Labs",
  "image": "https://www.yantrixlabs.studio/og-image.png",
  "url": "https://www.yantrixlabs.studio",
  "telephone": "+91-9251111358",
  "email": "hello@yantrixlabs.studio",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4th Floor, City Corporate Tower, Malviya Marg, C Scheme, Ashok Nagar",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.9124,
    "longitude": 75.7873
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
}`
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Yantrix Labs build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yantrix Labs builds AI-powered websites, operational automations, and pre-built AI systems including lead intelligence tools, AI hiring screeners, and AI calling assistants — deployed in under two weeks."
      }
    },
    {
      "@type": "Question",
      "name": "How long does AI system deployment take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most standard Yantrix AI system setups deploy in approximately two weeks. Bespoke agents typically ship in under two weeks depending on integration complexity."
      }
    },
    {
      "@type": "Question",
      "name": "Does Yantrix Labs work with international clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Yantrix Labs is based in Jaipur, India and works with teams across India, the US, and Europe. The studio operates on overlapping timezone windows for async and live collaboration."
      }
    },
    {
      "@type": "Question",
      "name": "What is Yantrix Client Scout?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yantrix Client Scout is a lead intelligence system that discovers and enriches potential leads from targeted sources, scores them against your ICP, and attaches source reasoning to every entry — replacing generic lead lists with a transparent, lower-cost pipeline."
      }
    },
    {
      "@type": "Question",
      "name": "How do I start working with Yantrix Labs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The first step is a free 30-minute website and AI audit. You can book directly via WhatsApp at +91-9251111358 or email hello@yantrixlabs.studio."
      }
    }
  ]
}`
        }}
      />
    </main>
  );
}
