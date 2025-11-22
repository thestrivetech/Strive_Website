import { MetaTags } from "@/components/seo/meta-tags";
import { OrganizationStructuredData, FAQStructuredData } from "@/components/seo/structured-data";
import { useSEO } from "@/hooks/use-seo";
import HeroSection from "@/components/ui/hero-section";

// Import SAI Platform homepage components
import { TrustSignalsBar } from "@/components/homepage/TrustSignalsBar";
import { PlatformDemoSection } from "@/components/homepage/PlatformDemoSection";
import { ModulePainPointsSection } from "@/components/homepage/ModulePainPointsSection";
import { PriceSavingsComparison } from "@/components/homepage/PriceSavingsComparison";
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
        title="One Platform. One Price. Everything you need to be competitive as a Real Estate Professional"
        subtitle="Replace 5+ daily apps with the SAI Platform. The all-in-one Real Estate solution for agents and brokers. Manage leads, deals, marketing, transactions, and AI automation in one place."
        primaryButtonText="Join Waitlist"
        secondaryButtonText=""
        onPrimaryClick={() => window.location.href = "/waitlist"}
        onSecondaryClick={() => {}}
      />

      {/* Trust Signals Bar */}
      <TrustSignalsBar />

      {/* Platform Demo Video */}
      <PlatformDemoSection />

      {/* Module Pain Points Section - Shows researched pain points with sources */}
      <ModulePainPointsSection />

      {/* Price Savings Comparison - Side-by-side fragmented vs unified */}
      <PriceSavingsComparison />

      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
    </>
  );
};

export default Home;
