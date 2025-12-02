import { useState, useEffect } from "react";
import { MetaTags } from "@/components/seo/meta-tags";
import { OrganizationStructuredData } from "@/components/seo/structured-data";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, TrendingUp, Target, Users, Sparkles, Zap, DollarSign, Shield, UserPlus, CalendarDays, Rocket, ExternalLink, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Import SAI data
import { saiModules } from "@/data/sai";
import { useCases } from "@/data/sai/use-cases";
import { roadmapFeatures } from "@/data/sai/roadmap";

const Home = () => {
  const { seoConfig } = useSEO();

  // Module selector state (for pain points section)
  const [selectedModuleId, setSelectedModuleId] = useState(saiModules[0].id);
  const [moduleSelectorOpen, setModuleSelectorOpen] = useState(false);
  const selectedModule = saiModules.find(m => m.id === selectedModuleId);

  // Curated journey features for Coming Soon section (8 highlights)
  const journeyFeatures = [
    roadmapFeatures.find(f => f.id === 'third-party-integrations'),
    roadmapFeatures.find(f => f.id === 'mobile-apps'),
    roadmapFeatures.find(f => f.id === 'sms-communications'),
    roadmapFeatures.find(f => f.id === 'ai-video-tours'),
    roadmapFeatures.find(f => f.id === 'predictive-lead-scoring'),
    roadmapFeatures.find(f => f.id === 'client-portal'),
    roadmapFeatures.find(f => f.id === 'visual-workflow-builder'),
    roadmapFeatures.find(f => f.id === 'mortgage-lender-module'),
  ].filter(Boolean);

  // Global page navigation sections
  const navSections = [
    { id: 'hero', label: 'Home' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'modules', label: 'Modules' },
    { id: 'pain-points', label: 'Challenges' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'why-sai', label: 'Why SAI' },
    { id: 'cta', label: 'Get Started' },
  ];

  // Track section background types for navigation dot contrast
  const sectionBackgrounds: Record<string, 'light' | 'dark'> = {
    'hero': 'dark',        // hero-gradient
    'benefits': 'light',   // orange-50/white gradient
    'modules': 'dark',     // hero-gradient
    'pain-points': 'dark', // hero-gradient
    'use-cases': 'light',  // bg-gray-50
    'why-sai': 'light',    // bg-[#ffffffeb]
    'cta': 'dark',         // hero-gradient
  };

  // Track active section for global navigation
  const [activeSection, setActiveSection] = useState('hero');

  // Determine if current section has light background (for nav dot contrast)
  const isLightBackground = sectionBackgrounds[activeSection] === 'light';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = navSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(navSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get featured use cases (first 3)
  const featuredUseCases = useCases.slice(0, 3);

  return (
    <>
      {/* SEO Meta Tags */}
      <MetaTags seo={seoConfig} />

      {/* Structured Data */}
      <OrganizationStructuredData />

      <div className="pt-16">
        {/* Hero Section with Video */}
        <section id="hero" className="scroll-mt-20 hero-gradient py-4 sm:py-8 lg:py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Video */}
              <div className="mb-6 sm:mb-10 lg:mb-14">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-black">
                  {/* 16:9 Aspect Ratio Container */}
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/psE2sshwsVM?rel=0&modestbranding=1"
                      title="SAI Platform Demo Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Content Below Video */}
              <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed max-w-4xl mx-auto px-2 sm:px-0">
                  One Platform. One Price. Powerful AI. Everything you need to be competitive as a Real Estate Professional.
                </p>

                {/* Schedule a Showcase Button */}
                <div className="pt-2 sm:pt-4">
                  <Button
                    onClick={() => window.location.href = "/contact"}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-10 lg:px-16 py-4 sm:py-5 lg:py-7 text-base sm:text-lg lg:text-2xl min-h-[48px] sm:min-h-[56px] relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                    size="lg"
                  >
                    Schedule a Showcase
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section id="benefits" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-6 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300 font-semibold">
                  The All-in-One Real Estate Platform
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Replace 10+ Apps with One Platform Built for Real Estate
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                  SAI combines CRM, transaction management, marketing automation, AI insights, market data, and automated tax tracking with QuickBooks sync—everything real estate agents need to close more deals and save 15+ hours per week.
                </p>
              </div>

              {/* Key Benefits List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {[
                  "Unlimited contacts, deals, and users",
                  "6 integrated modules (SAI Assistant, CRM, The Office, Content Studio, REID, Taxes & Expenses)",
                  "Built specifically for daily real estate workflows",
                  "AI-powered lead scoring and deal insights",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  className="min-h-[44px] px-8 text-lg font-semibold"
                  onClick={() => window.location.href = "/contact"}
                >
                  Get Started
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
          </div>
        </section>

        {/* 6 Modules Overview Section */}
        <section id="modules" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 hero-gradient relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              {/* Main Headline with Gradient Accent */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Everything You Need in{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  SAI Platform
                </span>
              </h2>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Six powerful modules working together to handle every aspect of your real estate business. Everything from lead capture to closing a listing. AI-powered assistance every step of the way.
              </p>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {saiModules.map((module) => {
                const Icon = module.icon;
                return (
                  <Card
                    key={module.id}
                    className="group transition-all duration-200 hover:shadow-2xl hover:border-orange-400/50 h-full bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/15"
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Badge */}
                      <div className="flex justify-center mb-4">
                        <Badge className="px-3 py-1 text-xs font-bold border-2 shadow-sm bg-gradient-to-r from-orange-400/20 to-orange-500/20 text-orange-200 border-orange-400/40">
                          {module.badge}
                        </Badge>
                      </div>

                      {/* Icon */}
                      <div className="flex justify-center mb-4">
                        <div className={cn(
                          "w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110",
                          `bg-gradient-to-br ${module.accentColor}`
                        )}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 text-center transition-colors duration-200 text-white group-hover:text-orange-300">
                        {module.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-sm leading-relaxed mb-6 text-center text-white/80">
                        {module.tagline}
                      </p>

                      {/* Pain Points */}
                      <div className="mb-4 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wide mb-2 text-white/60">
                          Without SAI:
                        </h4>
                        {module.painPoints.map((pain, index) => (
                          <div key={index} className="flex items-start text-xs">
                            <X className="w-4 h-4 flex-shrink-0 mr-2 mt-0.5 text-red-400" />
                            <span className="leading-relaxed text-white/70">{pain}</span>
                          </div>
                        ))}
                      </div>

                      {/* Outcomes */}
                      <div className="mb-6 space-y-2 flex-grow">
                        <h4 className="text-xs font-bold uppercase tracking-wide mb-2 text-white/60">
                          With SAI:
                        </h4>
                        {module.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start text-xs">
                            <Check className="w-4 h-4 flex-shrink-0 mr-2 mt-0.5 text-green-400" />
                            <span className="leading-relaxed font-medium text-white/90">{outcome}</span>
                          </div>
                        ))}
                      </div>

                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Enhanced Footer Note */}
            <div className="text-center mt-12 sm:mt-16 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-3">
                  All 6 Modules Share One Database
                </h3>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  Update a contact in <span className="font-semibold text-orange-300">CRM</span>, and it instantly
                  updates in <span className="font-semibold text-orange-300">Content Studio</span> and{" "}
                  <span className="font-semibold text-orange-300">The Office</span>.
                  No exports, no duplicate data, no headaches.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Module Pain Points Section - Shows researched pain points with sources */}
        <section id="pain-points" className="scroll-mt-20 py-12 sm:py-14 md:py-16 lg:py-20 hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-wide text-primary font-semibold mb-3 sm:mb-4">
                SAI PLATFORM — SOLVING YOUR BIGGEST CHALLENGES
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white px-4">
                Built for Real Estate Agents, By Real Estate Professionals
              </h2>
              <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
                Select a module below to see how SAI Platform solves the pain points costing you time and money.
              </p>
            </div>

            {/* Module Selector - Mobile Dropdown */}
            <div className="md:hidden mb-8">
              <Popover open={moduleSelectorOpen} onOpenChange={setModuleSelectorOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={moduleSelectorOpen}
                    className="w-full justify-between bg-[#020a1c] border-2 border-orange-500 text-white hover:bg-[#020a1c]/90 hover:text-white min-h-[44px]"
                  >
                    {selectedModule ? (
                      <div className="flex items-center gap-2">
                        <selectedModule.icon className="w-4 h-4" />
                        <span>{selectedModule.title}</span>
                      </div>
                    ) : (
                      "Select module..."
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search modules..." />
                    <CommandEmpty>No module found.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                      {saiModules.map((module) => {
                        const Icon = module.icon;
                        return (
                          <CommandItem
                            key={module.id}
                            value={module.id}
                            onSelect={() => {
                              setSelectedModuleId(module.id);
                              setModuleSelectorOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedModuleId === module.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <Icon className="mr-2 h-4 w-4" />
                            <span>{module.title}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Module Selector - Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
              {saiModules.map((module) => {
                const Icon = module.icon;
                const isSelected = selectedModuleId === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModuleId(module.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 bg-[#020a1c] backdrop-blur-sm text-white transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-orange-500/20 min-h-[44px]",
                      isSelected
                        ? "border-orange-400 bg-[#020a1c]/70"
                        : "border-orange-500 hover:bg-[#020a1c]/90 hover:border-orange-400"
                    )}
                    aria-pressed={isSelected}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-white">
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-medium leading-tight">{module.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Features Grid */}
            {selectedModule && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {selectedModule.detailedFeatures.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <Card
                      key={index}
                      className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
                    >
                      <CardContent className="p-4 md:p-6 text-center">
                        <div className="text-white mb-4 flex justify-center">
                          <FeatureIcon className="w-8 h-8" />
                        </div>
                        <h4 className="text-white font-semibold mb-3 text-sm leading-tight">
                          {feature.name}
                        </h4>
                        <div className="mb-3">
                          <p className="text-red-400 text-xs font-semibold mb-2">
                            Pain Point: {feature.painPoint}
                          </p>
                          <a
                            href={feature.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1 mt-1 transition-colors duration-200"
                          >
                            Source
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-white/90 text-xs leading-relaxed">
                          <span className="font-semibold text-white">Solution:</span> {feature.solution}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* CTA Footer */}
            <div className="text-center mt-8 sm:mt-10 md:mt-12">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
                  Ready to Save 10+ Hours Per Week?
                </h3>
                <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">
                  Ready to set Up a Meeting?
                </p>
                <Link href="/contact">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-3.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 font-bold text-sm sm:text-base min-h-[44px]"
                    size="lg"
                  >
                    Contact Sales
                  </Button>
                </Link>
                <p className="text-xs text-white/60 mt-4">
                  <span className="text-green-400">✓</span> All 6 modules included •{" "}
                  <span className="text-green-400">✓</span> Unlimited contacts •{" "}
                  <span className="text-green-400">✓</span> No per-contact fees
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Built for Every Real Estate Professional
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Whether you're a solo agent, team leader, or brokerage owner, SAI scales with your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredUseCases.map((useCase, index) => {
                // Agent type badge config
                const agentTypeConfig = {
                  solo: { label: 'Solo Agent', color: 'from-blue-500 to-blue-600', bgColor: 'from-blue-50 to-blue-100', icon: Target },
                  team: { label: 'Broker/Owner', color: 'from-purple-500 to-purple-600', bgColor: 'from-purple-50 to-purple-100', icon: Users },
                  investor: { label: 'Investment Specialist', color: 'from-green-500 to-green-600', bgColor: 'from-green-50 to-green-100', icon: TrendingUp },
                  broker: { label: 'Brokerage', color: 'from-orange-500 to-orange-600', bgColor: 'from-orange-50 to-orange-100', icon: TrendingUp },
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
                    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-200 border-2 border-gray-200 bg-white hover:border-orange-300 h-full flex flex-col">
                      {/* Decorative gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-transparent rounded-bl-full opacity-30"></div>

                      <CardContent className="p-6 relative z-10 flex flex-col flex-1">
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

                        {/* Challenges Section - flex-1 to take available space */}
                        <div className="mb-5 flex-1">
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

                        {/* Results Section - Always at bottom with mt-auto */}
                        <div className="mt-auto bg-gradient-to-br from-green-50 via-emerald-50 to-white rounded-xl p-4 border-2 border-green-200 group-hover:border-green-300 transition-colors duration-300">
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

        {/* Why SAI Section - Value Propositions */}
        <section id="why-sai" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-[#ffffffeb]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Why Top Agents Choose SAI Platform
              </h2>
              <p className="text-lg sm:text-xl text-gray-700">
                We're not just another CRM. We're the all-in-one operating system for modern real estate professionals.
              </p>
            </div>

            {/* Value Props Grid (2x2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Built for Real Estate",
                  description: "Unlike generic CRMs, SAI Platform is purpose-built for real estate agents. Every feature, from deal types (home buying, home selling, property rentals) to lead scoring, SAI is designed specifically for how you work.",
                  benefit: "No wasted features or confusing menus. Just the tools you actually need.",
                },
                {
                  icon: DollarSign,
                  title: "Simple, Transparent Pricing",
                  description: "UNLIMITED contacts, deals, and users. No per-contact fees, no surprise charges, no contracts. Our straightforward pricing means your costs stay predictable as you grow.",
                  benefit: "Scale your business without worrying about skyrocketing software costs.",
                },
                {
                  icon: Shield,
                  title: "Data You Own",
                  description: "Your data stays yours. Export anytime (CSV, Excel, API). No data lock-in, no hostage situations. We earn your business every month by being the best tool, not by trapping your data.",
                  benefit: "Switch tools anytime without losing years of contact history and deal data.",
                },
                {
                  icon: Sparkles,
                  title: "AI That Actually Works",
                  description: "SaiBot isn't just a chatbot—it's an AI assistant that's trained specifically for the platform and on the real estate industry.",
                  benefit: "Save 10+ hours per week on repetitive tasks. Close 20% more deals with AI insights.",
                },
              ].map((prop, index) => {
                const Icon = prop.icon;
                return (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-200 border-2 bg-white border-gray-200">
                    <CardContent className="p-6 sm:p-8">
                      {/* Icon */}
                      <div className="mb-4 sm:mb-6">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {prop.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                        {prop.description}
                      </p>

                      {/* Benefit Statement */}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm sm:text-base font-semibold text-primary flex items-start">
                          <span className="mr-2 mt-0.5">✓</span>
                          <span>{prop.benefit}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* AI-Native Advantage Callout */}
            <div className="mt-12 sm:mt-16 bg-gradient-to-r from-orange-50 via-white to-purple-50 border-2 border-orange-200 rounded-xl p-6 sm:p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    AI-Native From Day One
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    While competitors retrofit AI onto legacy platforms, SAI was built AI-first from the ground up. Our proprietary AI technologies give agents a 3-5 year technological advantage:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-orange-600">Market Velocity Intelligence</p>
                      <p className="text-xs text-gray-600">Predict transaction timing</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-purple-600">Price Precision Valuation</p>
                      <p className="text-xs text-gray-600">Institutional-grade analysis</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-primary">SaiBot</p>
                      <p className="text-xs text-gray-600">Specialized AI Assistant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section - Combined with Coming Soon */}
        <section id="cta" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 hero-gradient">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Coming Soon Header */}
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full mb-4">
                Coming Soon
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                What's Next for SAI Platform
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Exciting features on our roadmap to make your real estate business even more powerful
              </p>
            </div>

            {/* Roadmap Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20">
              {journeyFeatures.map((feature, index) => {
                if (!feature) return null;

                // Status config for badges
                const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
                  'in-development': { label: 'Building Now', bgColor: 'bg-orange-500/20', textColor: 'text-orange-300' },
                  'planned': { label: 'Planned', bgColor: 'bg-purple-500/20', textColor: 'text-purple-300' },
                  'coming-soon': { label: 'Coming Soon', bgColor: 'bg-blue-500/20', textColor: 'text-blue-300' },
                  'future': { label: 'Vision', bgColor: 'bg-indigo-500/20', textColor: 'text-indigo-300' },
                };
                const statusInfo = statusConfig[feature.status] || statusConfig['planned'];

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-colors duration-300"
                  >
                    {/* Status Badge */}
                    <span className={cn(
                      "inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-3",
                      statusInfo.bgColor,
                      statusInfo.textColor
                    )}>
                      {statusInfo.label}
                    </span>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4">
                      <Rocket className="w-6 h-6 text-orange-400" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Content */}
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to Transform Your Real Estate Business?
              </h3>
              <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10">
                Experience the future of Real Estate. Get started today.
              </p>

              {/* Single CTA Button */}
              <div className="flex justify-center mb-12 sm:mb-16">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px] px-8 py-6 text-lg font-semibold"
                  onClick={() => window.location.href = "/contact"}
                >
                  Get Started
                </Button>
              </div>

              {/* 3-Step Process */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    icon: UserPlus,
                    label: "Get Started",
                    description: "Contact us to begin your journey in under 60 seconds",
                  },
                  {
                    icon: CalendarDays,
                    label: "Schedule a Demo",
                    description: "See SAI Platform in action with our team",
                  },
                  {
                    icon: Rocket,
                    label: "Launch",
                    description: "Transform your real estate business to the next level",
                  },
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex flex-col items-center text-center">
                      {/* Step Number Badge */}
                      <div className="w-12 h-12 rounded-full bg-white/20 text-white font-bold text-xl flex items-center justify-center mb-4">
                        {index + 1}
                      </div>
                      {/* Icon */}
                      <Icon className="w-8 h-8 text-white mb-3" />
                      {/* Label */}
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        {step.label}
                      </h3>
                      {/* Description */}
                      <p className="text-sm sm:text-base text-white/80">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Global Page Navigation - Desktop */}
        <div className="hidden lg:flex fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 flex-col gap-2 z-40">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center"
              aria-label={`Navigate to ${section.label}`}
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer",
                  activeSection === section.id
                    ? "bg-orange-500 scale-125"
                    : isLightBackground
                      ? "bg-gray-800/50 hover:bg-gray-800/80"
                      : "bg-white/30 hover:bg-white/60"
                )}
              />
              <span className={cn(
                "absolute left-6 whitespace-nowrap text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none",
                isLightBackground
                  ? "bg-white/95 text-gray-900 shadow-lg border border-gray-200"
                  : "bg-gray-900/90 text-white"
              )}>
                {section.label}
              </span>
            </button>
          ))}
        </div>

        {/* Global Page Navigation - Mobile */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-2">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeSection === section.id
                  ? "bg-orange-500 scale-150"
                  : "bg-white/30"
              )}
              aria-label={`Navigate to ${section.label}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
