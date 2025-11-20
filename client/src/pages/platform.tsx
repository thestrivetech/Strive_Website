import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetaTags } from "@/components/seo/meta-tags";
import { useSEO } from "@/hooks/use-seo";
import { PlayCircle, CheckCircle2, ArrowRight, Star, TrendingUp, Clock, Users } from "lucide-react";

// Import existing SAI components
import { TrustSignalsBar } from "@/components/homepage/TrustSignalsBar";
import { ModuleOverviewSection } from "@/components/homepage/ModuleOverviewSection";
import { WhySAISection } from "@/components/homepage/WhySAISection";
import { FinalCTASection } from "@/components/homepage/FinalCTASection";

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

  // Get a subset of FAQs for the page (first 6)
  const displayFaqs = faqs.slice(0, 6);

  // Get upcoming features from roadmap (Q1-2025 only)
  const upcomingFeatures = roadmapFeatures.filter((item) => item.phase === "Q1-2025");

  // Get featured use cases (first 3)
  const featuredUseCases = useCases.slice(0, 3);

  return (
    <>
      <MetaTags
        seo={{
          ...seoConfig,
          title: "SAI Platform | All-in-One Real Estate CRM for Agents",
          description:
            "The complete real estate CRM platform built for modern agents. Manage contacts, close deals, automate marketing, and leverage AI - all in one powerful platform. Request your demo today.",
        }}
      />

      <div className="pt-16">
        {/* Hero Section with Demo Placeholder */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Copy */}
              <div>
                <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
                  All-in-One Real Estate CRM
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  The Only Platform Real Estate Agents Need
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Stop paying for 10 different tools. SAI Platform combines CRM, transaction management, marketing automation, market intelligence, and AI—everything you need to grow your real estate business.
                </p>

                {/* Key Benefits List */}
                <div className="space-y-3 mb-8">
                  {[
                    "Unlimited contacts, deals, and users",
                    "5 integrated modules (CRM, The Office, Content Studio, REID, Global SAI)",
                    "Built specifically for real estate workflows",
                    "AI-powered lead scoring and deal insights",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
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
              <div className="relative">
                <Card className="overflow-hidden shadow-2xl border-primary/20">
                  <CardContent className="p-0">
                    {/* Video Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <PlayCircle className="w-12 h-12 text-primary" />
                        </div>
                        <p className="text-lg font-semibold text-foreground mb-2">
                          Product Demo Coming Soon
                        </p>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                          Join the waitlist to get a personalized demo from our team
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating Stats */}
                <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
                  <Card className="shadow-lg border-primary/20">
                    <CardContent className="p-3 text-center">
                      <p className="text-2xl font-bold text-primary">5K+</p>
                      <p className="text-xs text-muted-foreground">Active Agents</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-primary/20">
                    <CardContent className="p-3 text-center">
                      <p className="text-2xl font-bold text-primary">50K+</p>
                      <p className="text-xs text-muted-foreground">Deals Closed</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-primary/20">
                    <CardContent className="p-3 text-center">
                      <p className="text-2xl font-bold text-primary">99.9%</p>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals Bar */}
        <TrustSignalsBar />

        {/* 5 Modules Section */}
        <div id="modules">
          <ModuleOverviewSection />
        </div>

        {/* Use Cases Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Built for Every Real Estate Professional
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Whether you're a solo agent, team leader, or brokerage owner, SAI Platform scales with your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredUseCases.map((useCase, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-primary/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {useCase.persona.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {useCase.persona.role} • {useCase.persona.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          Key Challenges:
                        </h4>
                        <ul className="space-y-1">
                          {useCase.challenges.slice(0, 2).map((challenge, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-destructive">•</span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          Results with SAI:
                        </h4>
                        <div className="flex items-center gap-4">
                          {useCase.results.slice(0, 2).map((result, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-semibold text-green-600">
                                {result.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why SAI Section */}
        <WhySAISection />

        {/* Roadmap Preview Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                Coming Soon
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                What's Next for SAI Platform
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're constantly improving SAI with features our users request. Here's what's launching in Q1 2025.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {upcomingFeatures.map((feature, index) => (
                <Card key={index} className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {feature.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {feature.phase}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {displayFaqs.map((faq, index) => (
                <Card key={index} className="border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
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

        {/* Final CTA Section */}
        <FinalCTASection />
      </div>
    </>
  );
}
