import { MetaTags } from "@/components/seo/meta-tags";
import { OrganizationStructuredData, FAQStructuredData } from "@/components/seo/structured-data";
import { useSEO } from "@/hooks/use-seo";
import HeroSection from "@/components/ui/hero-section";

// Import SAI Platform homepage components
import { TrustSignalsBar } from "@/components/homepage/TrustSignalsBar";
import { ModuleOverviewSection } from "@/components/homepage/ModuleOverviewSection";
import { WhySAISection } from "@/components/homepage/WhySAISection";
import { FinalCTASection } from "@/components/homepage/FinalCTASection";

const Home = () => {
  const { seoConfig } = useSEO();


  return (
    <>
      {/* SEO Meta Tags */}
      <MetaTags seo={seoConfig} />
      
      {/* Structured Data */}
      <OrganizationStructuredData />
      <FAQStructuredData />
      
      <div className="pt-16">
      {/* Hero Section */}
      <HeroSection
        title="The All-in-One Real Estate CRM Built for Agents"
        subtitle="Stop juggling 10 different tools. SAI Platform combines CRM, transaction management, marketing automation, and AI—everything you need to grow your real estate business in one powerful platform."
        primaryButtonText="Join Waitlist"
        secondaryButtonText=""
        onPrimaryClick={() => window.location.href = "/waitlist"}
        onSecondaryClick={() => {}}
      />

      {/* Trust Signals Bar */}
      <TrustSignalsBar />

      {/* Module Overview Section */}
      <ModuleOverviewSection />

      {/* Why SAI Section */}
      <WhySAISection />
      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
    </>
  );
};

export default Home;
