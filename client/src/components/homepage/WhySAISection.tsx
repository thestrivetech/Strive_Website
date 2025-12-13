import { Zap, DollarSign, Shield, Sparkles, TrendingUp, Brain, FileText, Mic } from "lucide-react";

/**
 * Redesigned "Why SAI" section with:
 * - Outcome-focused header
 * - Hero stats row with animated metrics
 * - Primary AI card highlighting all platform AI
 * - Updated value props with compelling messaging
 */
export function WhySAISection() {
  // Hero stats for the stats row
  const heroStats = [
    { value: "More", label: "Deals Closed", description: "with AI lead scoring" },
    { value: "10+", label: "Hours Saved Weekly", description: "on repetitive tasks" },
    { value: "$300+", label: "Monthly Savings", description: "vs. fragmented tools" },
  ];

  // Four AI features for the primary AI card
  const aiFeatures = [
    {
      icon: TrendingUp,
      title: "Market Velocity Intelligence",
      description: "Predict when properties will sell (~10 day accuracy)",
    },
    {
      icon: Brain,
      title: "Price Valuation Intelligence",
      description: "Institutional-grade property analysis (within 7% of market value)",
    },
    {
      icon: FileText,
      title: "AI Content Engine",
      description: "Listings, posts, emails in 30 seconds",
    },
    {
      icon: Mic,
      title: "SaiBot Assistant",
      description: "CRM updates, research, hands-free assistance",
    },
  ];

  // Value props (excluding AI which is now primary)
  const valueProps = [
    {
      icon: Zap,
      title: "Built for Real Estate, Not Adapted",
      description:
        "Generic CRMs waste your time with features you'll never use. SAI speaks your language: HOME_BUYING, HOME_SELLING, RENTAL deals. Lead scoring calibrated for real estate cycles. Workflows designed for how agents actually work.",
      benefit: "Zero learning curve. Start closing deals day one.",
    },
    {
      icon: DollarSign,
      title: "One Price. Everything Included.",
      description:
        "UNLIMITED contacts, deals, and users. No per-contact fees, no surprise charges, no contracts. Scale from 1 to 100 agents without your bill changing.",
      benefit: "Predictable costs that don't grow with your success.",
    },
    {
      icon: Shield,
      title: "Your Data is Secure",
      description:
        "Your client relationships are your business. Export anytime (CSV, Excel, API). No data lock-in, no hostage situations. We earn your renewal every month by being the best tool, not by holding your data hostage.",
      benefit: "Your data, your control. Always.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#ffffffeb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Outcome Focused */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Close More Deals. Save 10+ Hours Weekly.{" "}
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              Cut Software Costs.
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            The all-in-one platform that replaces 10+ tools with unified workflows and AI that actually works.
          </p>
        </div>

        {/* Hero Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
          {heroStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary/5 to-orange-500/5 border border-primary/20 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-200"
            >
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Primary AI Card - Full Width */}
        <div className="max-w-6xl mx-auto mb-10 sm:mb-14">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 sm:p-10 border border-gray-700 shadow-2xl">
            {/* AI Card Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-primary uppercase tracking-wide">
                  AI-Native Architecture
                </div>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              AI Built In, Not Bolted On
            </h3>
            <p className="text-white/80 text-lg sm:text-xl mb-8 max-w-3xl">
              While competitors retrofit AI onto 10-year-old platforms, SAI was engineered AI-first from the ground up. Four proprietary AI systems working together to give you an unfair advantage.
            </p>

            {/* AI Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {aiFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-orange-500/30 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* AI Benefit Callout */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/90 text-lg font-medium">
                Save 10+ hours/week on repetitive tasks. Close 20% more deals with AI insights.
              </p>
              <span className="bg-primary/20 border border-primary/30 text-primary font-semibold px-4 py-2 rounded-full text-sm whitespace-nowrap">
                1-2 Year Tech Advantage
              </span>
            </div>
          </div>
        </div>

        {/* Value Props Grid (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-200"
            >
              {/* Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-xl flex items-center justify-center mb-5">
                <prop.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {prop.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-sm sm:text-base mb-5 leading-relaxed">
                {prop.description}
              </p>

              {/* Benefit */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-primary font-medium text-sm sm:text-base">
                    {prop.benefit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-gray-600">
            Join real estate professionals already using the all-in-one platform.
          </p>
        </div>
      </div>
    </section>
  );
}
