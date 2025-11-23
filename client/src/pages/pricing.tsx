import { useState } from "react";
import { MetaTags } from "@/components/seo/meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, ChevronDown, Users, Building2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

// Import pricing FAQs
import { faqs } from "@/data/sai/faqs";

/**
 * Pricing Page - Seat-based pricing model
 *
 * ONE PLATFORM, ONE PRICE, FULLY AI POWERED
 *
 * Pricing Structure:
 * - Base: $499/seat/month
 * - 1-5 seats: $499/seat (monthly) or $399/seat (annual - 20% off)
 * - 6-10 seats: $449/seat (monthly - 10% off) or $359/seat (annual - 20% off)
 * - 11+ seats: $399/seat (monthly - 20% off) or $279/seat (annual - 30% off)
 *
 * Special Promotion (until Feb 1, 2026): Free month when you pay for first month
 * First 100 Legacy Clients: Locked-in pricing forever
 */
export default function Pricing() {
  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Get pricing FAQs
  const pricingFaqs = faqs.filter(faq => faq.category === 'pricing').slice(0, 6);

  // Toggle FAQ accordion
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Pricing tiers data
  const pricingTiers = [
    {
      id: 'small',
      name: 'Small Teams',
      icon: Users,
      seats: '1-5 seats',
      monthlyPrice: 499,
      annualPrice: 399,
      monthlySavings: null,
      annualSavings: '20% off',
    },
    {
      id: 'medium',
      name: 'Medium Teams',
      icon: Building2,
      seats: '6-10 seats',
      monthlyPrice: 449,
      annualPrice: 359,
      monthlySavings: '10% off',
      annualSavings: '20% off',
      highlighted: true,
    },
    {
      id: 'large',
      name: 'Large Teams',
      icon: Building2,
      seats: '11+ seats',
      monthlyPrice: 399,
      annualPrice: 279,
      monthlySavings: '20% off',
      annualSavings: '30% off',
    },
  ];

  // Core features (everyone gets everything)
  const coreFeatures = [
    'All 6 integrated modules (SAI Assistant, CRM, The Office, Content Studio, REID, Taxes & Expenses)',
    'Unlimited contacts, deals, and content generation',
    'Advanced AI automation with 12+ AI models',
    'Priority support and dedicated onboarding',
    'All future features and updates at no additional cost',
    'Market intelligence and analytics',
    'Team collaboration tools',
    'API access and integrations',
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <MetaTags
        seo={{
          title: "Pricing | SAI Platform - One Platform, One Price",
          description: "$499/seat for complete real estate platform. First 100 legacy clients get locked-in pricing forever. Special offer: free month until Feb 1, 2026.",
          keywords: ["real estate CRM pricing", "agent CRM cost", "real estate platform pricing", "SAI Platform pricing", "team pricing"],
          canonical: "https://strive.tech/pricing",
        }}
      />

      <div className="pt-16">
        {/* Hero Section - Matching homepage style */}
        <section className="hero-gradient py-20 sm:py-24 lg:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Simple, Transparent Pricing for Real Estate Teams
              </h1>
              <p className="text-xl sm:text-2xl text-white/95 mb-10 leading-relaxed max-w-3xl mx-auto">
                <span className="font-bold text-white"></span> Everything included. No hidden fees, no feature gates, no surprises.
              </p>

              {/* Combined Promotional Card */}
              <div className="max-w-2xl mx-auto">
                <Card className="relative overflow-hidden border-2 border-orange-400/50 bg-gradient-to-br from-orange-50 via-white to-purple-50 shadow-2xl hover:shadow-3xl transition-all duration-300">
                  {/* Decorative gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-600"></div>

                  <CardContent className="p-8 text-center relative z-10">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full mb-4 shadow-lg">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>

                    {/* Main Heading */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                      First 100 Legacy Clients
                    </h3>

                    {/* Main Value Proposition */}
                    <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed">
                      Lock in <span className="font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">$499/seat pricing forever.</span> Lifetime access to all current and future features—no matter what we add.
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                      <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wide">Plus</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                    </div>

                    {/* Bonus Promotion */}
                    <div className="bg-gradient-to-r from-orange-50 to-purple-50 backdrop-blur-sm border border-orange-300 rounded-lg px-4 py-3 mb-5">
                      <p className="text-sm font-semibold text-orange-700 mb-1">
                        🎁 Launch Special
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        Free Month with First Payment
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Valid until February 1, 2026
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600 hover:from-orange-700 hover:via-purple-700 hover:to-orange-700 text-white font-bold py-4 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[44px]"
                      onClick={() => document.getElementById('pricing-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Join now and secure your spot before we reach 100 clients
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Base Price Section - Matching homepage style */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300 font-semibold">
                Straightforward Pricing
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                One Platform. One Price. Everything Included.
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Volume discounts for teams. Additional savings for annual commitment.
              </p>

              {/* Base Price Display */}
              <div className="inline-block bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-2xl px-10 py-8 mb-8">
                <p className="text-lg text-gray-700 mb-2">Base Price</p>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-6xl sm:text-7xl font-bold text-orange-600">$499</span>
                  <span className="text-2xl text-gray-700">/seat</span>
                </div>
                <p className="text-gray-600">per month</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers - Matching homepage use cases style */}
        <section id="pricing-tiers" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Volume Discounts for Teams
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                The more seats you need, the more you save. All plans include everything.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => {
                const IconComponent = tier.icon;

                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className={cn(
                      "group relative overflow-hidden hover:shadow-xl transition-all duration-200 border-2 bg-white h-full",
                      tier.highlighted ? "border-orange-500 shadow-xl" : "border-gray-200 hover:border-orange-300"
                    )}>
                      {/* Decorative gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Most Popular Badge */}
                      {tier.highlighted && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-600 via-orange-500 to-purple-600 text-white px-4 py-1 text-xs font-bold rounded-bl-xl">
                          MOST POPULAR
                        </div>
                      )}

                      <CardContent className="p-6 relative z-10">
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 via-orange-200 to-purple-200 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <IconComponent className="w-8 h-8 text-orange-600" />
                          </div>
                        </div>

                        {/* Tier Name */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center group-hover:text-orange-600 transition-colors duration-300">
                          {tier.name}
                        </h3>
                        <p className="text-gray-600 text-center font-medium mb-6">{tier.seats}</p>

                        {/* Monthly Pricing */}
                        <div className="mb-6 pb-6 border-b-2 border-gray-100">
                          <p className="text-sm text-gray-600 mb-2 text-center font-semibold uppercase tracking-wide">Monthly</p>
                          <div className="flex items-baseline justify-center gap-2 mb-2">
                            <span className="text-4xl font-bold text-gray-900">${tier.monthlyPrice}</span>
                            <span className="text-gray-600">/seat</span>
                          </div>
                          {tier.monthlySavings && (
                            <div className="text-center">
                              <Badge className="bg-green-100 text-green-700 border-green-300 font-semibold">
                                {tier.monthlySavings}
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Annual Pricing */}
                        <div className="mb-6">
                          <p className="text-sm text-gray-600 mb-2 text-center font-semibold uppercase tracking-wide">Annual (Best Value)</p>
                          <div className="flex items-baseline justify-center gap-2 mb-2">
                            <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                              ${tier.annualPrice}
                            </span>
                            <span className="text-gray-600">/seat</span>
                          </div>
                          <p className="text-sm text-gray-600 text-center mb-2">
                            ${(tier.annualPrice * 12).toLocaleString()}/year per seat
                          </p>
                          <div className="text-center">
                            <Badge className="bg-green-700 text-white border-green-800 font-bold">
                              {tier.annualSavings}
                            </Badge>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Link href="/contact">
                          <Button
                            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-6 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px]"
                            size="lg"
                          >
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Pricing Note */}
            <div className="text-center mt-12 max-w-3xl mx-auto">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-bold text-gray-900">All plans include everything.</span> Every seat gets full access to all 6 modules, unlimited features, and all future updates at no additional cost.
              </p>
            </div>
          </div>
        </section>

        {/* What's Included Section - Matching homepage style */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-6 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300 font-semibold">
                  Everything Included
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  What's Included in Every Seat
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  No feature gates. No tiers. No add-ons. Just everything you need to succeed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing FAQs Section - Matching homepage FAQ style */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Pricing Questions Answered
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Everything you need to know about SAI Platform pricing and billing.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {pricingFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Card
                      className={cn(
                        "group relative overflow-hidden cursor-pointer border-2 transition-all duration-300",
                        isOpen
                          ? "border-orange-300 shadow-xl bg-gradient-to-br from-orange-50 via-white to-white"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                      )}
                      onClick={() => toggleFaq(index)}
                    >
                      <CardContent className="p-5">
                        {/* Question Header */}
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={cn(
                            "text-base font-bold leading-tight transition-colors duration-300 flex-1",
                            isOpen ? "text-orange-600" : "text-gray-900 group-hover:text-orange-600"
                          )}>
                            {faq.question}
                          </h3>

                          {/* Expand/Collapse Icon */}
                          <div className={cn(
                            "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                            isOpen
                              ? "bg-orange-100 text-orange-600 rotate-180"
                              : "bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600"
                          )}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Answer - Animated Accordion */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t-2 border-orange-100">
                                <p className="text-gray-700 leading-relaxed text-sm">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>

                      {/* Decorative accent line */}
                      {isOpen && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-500 origin-left"
                        />
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-700 mb-4">
                Have more questions about pricing?
              </p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-h-[44px]"
                >
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Section - Matching homepage style */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Real Estate Business?
              </h2>
              <p className="text-xl text-white/95 mb-8 leading-relaxed">
                Join the first 100 legacy clients and lock in <span className="font-bold">$499/seat pricing forever.</span> Plus get a free month with your first payment (until Feb 1, 2026).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="min-h-[44px] px-8 text-lg font-semibold bg-white text-orange-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-h-[44px] px-8 text-lg font-semibold border-2 border-white text-white hover:bg-white/10"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
