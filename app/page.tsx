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
    </main>
  );
}
