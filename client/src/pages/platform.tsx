import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetaTags } from "@/components/seo/meta-tags";
import { useSEO } from "@/hooks/use-seo";
import { PlayCircle, CheckCircle2, ArrowRight, Star, TrendingUp, Clock, Users, ChevronDown, ChevronUp, Sparkles, Target, Shield, Building2, Award, Zap, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import existing SAI components
import { ModuleOverviewSection } from "@/components/homepage/ModuleOverviewSection";
import { WhySAISection } from "@/components/homepage/WhySAISection";

// Import SAI data
import { useCases } from "@/data/sai/use-cases";
import { faqs } from "@/data/sai/faqs";
import { roadmapFeatures } from "@/data/sai/roadmap";

/**
 * SAI Platform standalone marketing page
 * Comprehensive showcase of the all-in-one real estate CRM
 */
export default function Platform() {
  const { seoConfig } = useSEO();

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Get a subset of FAQs for the page (first 6)
  const displayFaqs = faqs.slice(0, 6);

  // Get upcoming features from roadmap (Q1-Q4 2025)
  // Show consolidated integrations + key features, excluding individual integration cards
  const excludedFeatureIds = ['docusign', 'social-media-publishing', 'mls-integration', 'quickbooks-integration', 'google-workspace'];
  const upcomingFeatures = roadmapFeatures.filter((item) =>
    (item.phase === "Q1-2025" || item.phase === "Q2-2025" || item.phase === "Q3-2025" || item.phase === "Q4-2025") &&
    !excludedFeatureIds.includes(item.id)
  );

  // Get featured use cases (first 3)
  const featuredUseCases = useCases.slice(0, 3);

  // Toggle FAQ accordion
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <MetaTags
        seo={{
          ...seoConfig,
          title: "SAI Platform | All-in-One Real Estate platform for Agents and Brokers",
          description:
            "The complete real estate app built to save Agents and Brokers time and maximize their revenue. SAI allows you to Manage contacts, close deals, automate marketing, and leverage AI - all in one powerful platform. Request your demo today.",
        }}
      />

      <div className="pt-16">
        {/* Hero Section with Demo Placeholder */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Copy */}
              <div>
                <Badge className="mb-6 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300 font-semibold">
                  All-in-One Real Estate Platform
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Replace 10+ Apps with One Platform Built for Real Estate
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  SAI Platform combines CRM, transaction management, marketing automation, AI insights, and market data—everything real estate agents need to close more deals and save 15+ hours per week.
                </p>

                {/* Key Benefits List */}
                <div className="space-y-3 mb-8">
                  {[
                    "Unlimited contacts, deals, and users",
                    "5 integrated modules (CRM, The Office, Content Studio, REID, SAI Assistant)",
                    "Built specifically for real estate workflows",
                    "AI-powered lead scoring and deal insights",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="min-h-[44px] px-8 text-lg font-semibold"
                    onClick={() => window.location.href = "/waitlist"}
                  >
                    Join Waitlist
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-h-[44px] px-8 text-lg font-semibold"
                    onClick={() => {
                      const modulesSection = document.getElementById("modules");
                      modulesSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Explore Features
                  </Button>
                </div>
              </div>

              {/* Right Column - Demo Placeholder */}
              <div>
                <Card className="overflow-hidden shadow-2xl border-orange-200 bg-white">
                  <CardContent className="p-0">
                    {/* Video Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-orange-100 via-orange-50 to-white flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <PlayCircle className="w-12 h-12 text-primary" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          Product Demo Coming Soon
                        </p>
                        <p className="text-sm text-gray-600 max-w-xs mx-auto">
                          Join the waitlist to get a personalized demo from our team
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Modules Section */}
        <div id="modules">
          <ModuleOverviewSection />
        </div>

        {/* Why SAI Section - Value Propositions */}
        <WhySAISection />

        {/* Use Cases Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Built for Every Real Estate Professional
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Whether you're a solo agent, team leader, or brokerage owner, SAI Platform scales with your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredUseCases.map((useCase, index) => {
                // Agent type badge config
                const agentTypeConfig = {
                  solo: { label: 'Solo Agent', color: 'from-blue-500 to-blue-600', bgColor: 'from-blue-50 to-blue-100', icon: Target },
                  team: { label: 'Team Lead', color: 'from-purple-500 to-purple-600', bgColor: 'from-purple-50 to-purple-100', icon: Users },
                  investor: { label: 'Investment Specialist', color: 'from-green-500 to-green-600', bgColor: 'from-green-50 to-green-100', icon: TrendingUp },
                  broker: { label: 'Brokerage', color: 'from-orange-500 to-orange-600', bgColor: 'from-orange-50 to-orange-100', icon: Building2 },
                };
                const config = agentTypeConfig[useCase.agentType];
                const IconComponent = config.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-200 border-2 border-gray-200 bg-white hover:border-orange-300 h-full">
                      {/* Decorative gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-transparent rounded-bl-full opacity-30"></div>

                      <CardContent className="p-6 relative z-10">
                        {/* Agent Type Badge */}
                        <div className="mb-4">
                          <Badge className={`bg-gradient-to-r ${config.bgColor} text-gray-700 border-0 font-semibold text-xs px-3 py-1`}>
                            <IconComponent className="w-3 h-3 mr-1" />
                            {config.label}
                          </Badge>
                        </div>

                        {/* Persona Info with Avatar */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-br ${config.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                            <IconComponent className={`w-8 h-8 bg-gradient-to-br ${config.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                              {useCase.persona.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-600">
                              {useCase.persona.role}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <span>📍</span> {useCase.persona.location}
                            </p>
                          </div>
                        </div>

                        {/* Challenges Section */}
                        <div className="mb-5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-4 bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                              Challenges
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {useCase.challenges.slice(0, 2).map((challenge, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-start gap-2 pl-2">
                                <span className="text-red-500 font-bold mt-0.5">×</span>
                                <span className="leading-relaxed">{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Results Section - Prominent Display */}
                        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-white rounded-xl p-4 border-2 border-green-200 group-hover:border-green-300 transition-colors duration-300">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                              Results with SAI
                            </h4>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {useCase.results.slice(0, 2).map((result, i) => (
                              <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                                  <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                                    {result.value}
                                  </p>
                                  <p className="text-xs text-gray-600 font-medium">{result.metric}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why SAI Section */}
        <WhySAISection />

        {/* Roadmap Preview Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-purple-300 font-semibold">
                Coming Soon
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                What's Next for SAI Platform
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We're constantly improving SAI with features our users request. Here's what's launching throughout 2025.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {upcomingFeatures.map((feature, index) => {
                // Category color config
                const categoryConfig: Record<string, { color: string; bgColor: string; borderColor: string; icon: typeof Zap }> = {
                  'Integrations': { color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200 hover:border-blue-300', icon: Zap },
                  'Communications': { color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200 hover:border-green-300', icon: Sparkles },
                  'Financial': { color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200 hover:border-emerald-300', icon: TrendingUp },
                };
                const config = categoryConfig[feature.category] || { color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200 hover:border-purple-300', icon: Clock };
                const CategoryIcon = config.icon;

                // Status config
                const statusConfig: Record<string, { label: string; color: string; bgColor: string; textColor: string; showPulse: boolean }> = {
                  'in-development': { label: 'In Development', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700', showPulse: true },
                  'planned': { label: 'Planned', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700', showPulse: false },
                  'coming-soon': { label: 'Coming Soon', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700', showPulse: false },
                  'future': { label: 'Future', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', textColor: 'text-gray-700', showPulse: false },
                };
                const statusInfo = statusConfig[feature.status] || statusConfig['planned'];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Card className={`group relative overflow-hidden border-2 ${config.borderColor} bg-white hover:shadow-xl transition-all duration-200 h-full`}>
                      {/* Top accent bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color}`}></div>

                      <CardContent className="p-6">
                        {/* Icon centered at top */}
                        <div className="flex justify-center mb-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${config.bgColor} to-white rounded-xl flex items-center justify-center shadow-md`}>
                            <CategoryIcon className={`w-8 h-8 bg-gradient-to-br ${config.color} bg-clip-text text-transparent`} />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-orange-600 transition-colors duration-200">
                          {feature.title}
                        </h3>

                        {/* Badges in center */}
                        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                          <Badge className={`${statusInfo.bgColor} ${statusInfo.textColor} border-0 font-semibold text-xs px-2.5 py-1 flex items-center gap-1.5`}>
                            {statusInfo.showPulse && (
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                              </span>
                            )}
                            {statusInfo.label}
                          </Badge>

                          <Badge className={`${config.bgColor} border-0 font-semibold text-xs px-2.5 py-1`}>
                            <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                              {feature.category}
                            </span>
                          </Badge>

                          <Badge variant="outline" className="text-xs font-medium px-2.5 py-1 text-gray-700 border-gray-300">
                            {feature.phase}
                          </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 leading-relaxed mb-4 text-center">
                          {feature.description}
                        </p>

                        {/* Key Benefits */}
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide text-center">Key Benefits</p>
                          <ul className="space-y-2">
                            {feature.benefits.slice(0, 2).map((benefit, i) => (
                              <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="leading-relaxed">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {displayFaqs.map((faq, index) => {
                // Category config for color coding
                const categoryConfig = {
                  pricing: { label: 'Pricing', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', textColor: 'text-green-700', icon: '💰' },
                  features: { label: 'Features', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700', icon: '⚡' },
                  data: { label: 'Data', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700', icon: '🔒' },
                  support: { label: 'Support', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700', icon: '🤝' },
                  technical: { label: 'Technical', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', textColor: 'text-gray-700', icon: '⚙️' },
                };
                const config = categoryConfig[faq.category] || categoryConfig.features;
                const isOpen = openFaqIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Card
                      className={`group relative overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                        isOpen
                          ? 'border-orange-300 shadow-xl bg-gradient-to-br from-orange-50 via-white to-white'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                      }`}
                      onClick={() => toggleFaq(index)}
                    >
                      <CardContent className="p-5">
                        {/* Question Header */}
                        <div className="flex items-start gap-4">
                          {/* Category Badge */}
                          <div className={`flex-shrink-0 w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                            {config.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className={`text-base font-bold leading-tight transition-colors duration-300 ${
                                isOpen ? 'text-orange-600' : 'text-gray-900 group-hover:text-orange-600'
                              }`}>
                                {faq.question}
                              </h3>

                              {/* Expand/Collapse Icon */}
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isOpen
                                  ? 'bg-orange-100 text-orange-600 rotate-180'
                                  : 'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                              }`}>
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>

                            {/* Category Label */}
                            <Badge className={`${config.bgColor} ${config.textColor} border-0 font-medium text-xs px-2 py-0.5`}>
                              {config.label}
                            </Badge>
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
                          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color} origin-left`}
                        />
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-700 mb-4">
                Have more questions?
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = "/contact"}
                className="min-h-[44px]"
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
