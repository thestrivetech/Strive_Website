import { ValuePropCard } from "./ValuePropCard";
import { Zap, DollarSign, Shield, Sparkles } from "lucide-react";

/**
 * Displays 4 key value propositions for SAI Platform
 * Highlights why real estate agents should choose SAI over competitors
 */
export function WhySAISection() {
  const valueProps = [
    {
      icon: Zap,
      title: "Built for Real Estate",
      description:
        "Unlike generic CRMs, SAI Platform is purpose-built for real estate agents. Every feature—from deal types (HOME_BUYING, HOME_SELLING, RENTAL) to lead scoring—is designed specifically for how you work.",
      benefit:
        "No wasted features or confusing menus. Just the tools you actually need.",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description:
        "Pay $49/month for UNLIMITED contacts, deals, and users. No per-contact fees, no surprise charges, no contracts. Most competitors charge $99-299/month AND hit you with per-contact fees that add up fast.",
      benefit:
        "Save $1,000+ per year compared to competitors like Follow Up Boss or LionDesk.",
    },
    {
      icon: Shield,
      title: "Data You Own",
      description:
        "Your data stays yours. Export anytime (CSV, Excel, API). No data lock-in, no hostage situations. We earn your business every month by being the best tool, not by trapping your data.",
      benefit:
        "Switch tools anytime without losing years of contact history and deal data.",
    },
    {
      icon: Sparkles,
      title: "AI That Actually Works",
      description:
        "Global SAI isn't just a chatbot—it's an AI assistant trained on real estate workflows. It auto-scores leads, generates listing descriptions, schedules social posts, and predicts which deals are at risk of falling through.",
      benefit:
        "Save 10+ hours per week on repetitive tasks. Close 20% more deals with AI insights.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Why Top Agents Choose SAI Platform
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            We're not just another CRM. We're the all-in-one operating system for modern real estate professionals.
          </p>
        </div>

        {/* Value Props Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {valueProps.map((prop, index) => (
            <ValuePropCard
              key={index}
              icon={prop.icon}
              title={prop.title}
              description={prop.description}
              benefit={prop.benefit}
            />
          ))}
        </div>

        {/* Optional: Add a CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-muted-foreground mb-4">
            Join 5,000+ agents already using SAI Platform to grow their business.
          </p>
        </div>
      </div>
    </section>
  );
}
