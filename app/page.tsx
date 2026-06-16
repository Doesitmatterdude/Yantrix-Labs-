import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Yantrix Labs — AI systems your business can actually run on",
  description: "Yantrix Labs is an AI-native product studio in Jaipur. We build AI-powered websites, lead agents, and digital systems that deploy in days, not quarters.",
};

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

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://yantrixlabs.studio/#organization",
            "name": "Yantrix Labs",
            "url": "https://yantrixlabs.studio",
            "logo": {
              "@type": "ImageObject",
              "url": "https://yantrixlabs.studio/og-image.png",
              "width": 1200,
              "height": 630
            },
            "description": "Yantrix Labs is an AI-native product studio based in Jaipur, India, building AI-powered websites, automations, and intelligent systems for startups and B2B teams globally.",
            "foundingDate": "2026",
            "founders": [
              {
                "@type": "Person",
                "name": "Divya Bhatia",
                "url": "https://yantrixlabs.studio/team/founder-partner",
                "jobTitle": "Founder & Business Lead"
              },
              {
                "@type": "Person",
                "name": "Rahul Dhariwal",
                "url": "https://yantrixlabs.studio/team/business-partner",
                "jobTitle": "Co-Founder & Full Stack Developer"
              }
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+91-9829842694",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi"]
              },
              {
                "@type": "ContactPoint",
                "telephone": "+91-9251111358",
                "contactType": "sales",
                "availableLanguage": ["English", "Hindi"]
              }
            ],
            "email": "hello@yantrixlabs.studio",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "4th Floor, City Corporate Tower, Malviya Marg, C Scheme, Ashok Nagar",
              "addressLocality": "Jaipur",
              "addressRegion": "Rajasthan",
              "postalCode": "302001",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://www.instagram.com/yantrix.labs/",
              "https://x.com/yantrixlabs",
              "https://www.linkedin.com/company/yantrixlabs",
              "https://www.facebook.com/yantrixlabs"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "AI Products & Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Client Scout",
                    "description": "AI-powered B2B lead enrichment and prospecting automation."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Hiring Screener",
                    "description": "Automated AI hiring screening that reduces recruiter time by 87%."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Calling Assistant",
                    "description": "AI-powered sales calling and outreach automation."
                  }
                }
              ]
            }
          })
        }}
      />

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "ProfessionalService"],
            "@id": "https://yantrixlabs.studio/#localbusiness",
            "name": "Yantrix Labs",
            "image": "https://yantrixlabs.studio/og-image.png",
            "url": "https://yantrixlabs.studio",
            "telephone": "+91-9829842694",
            "email": "hello@yantrixlabs.studio",
            "priceRange": "₹₹₹",
            "description": "AI automation agency in Jaipur specializing in AI agents, full-stack software, and intelligent digital systems for businesses.",
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
              "latitude": "26.9124",
              "longitude": "75.7873"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "10:00",
                "closes": "19:00"
              }
            ],
            "areaServed": [
              { "@type": "City", "name": "Jaipur" },
              { "@type": "Country", "name": "India" },
              { "@type": "AdministrativeArea", "name": "Global" }
            ],
            "hasMap": "https://maps.app.goo.gl/xwYnNDZPAE2rTxg29",
            "sameAs": "https://yantrixlabs.studio/#organization"
          })
        }}
      />

      {/* WebSite Schema — enables Sitelinks Searchbox */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://yantrixlabs.studio/#website",
            "url": "https://yantrixlabs.studio",
            "name": "Yantrix Labs",
            "description": "AI systems your business can actually run on.",
            "publisher": {
              "@id": "https://yantrixlabs.studio/#organization"
            },
            "inLanguage": "en-IN"
          })
        }}
      />
    </main>
  );
}
