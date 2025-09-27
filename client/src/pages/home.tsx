import { useState } from "react";
import { 
  Trophy, Shield, Brain, TrendingUp, Clock, Users, BarChart, Cog, Calculator, ShieldCheck, 
  Truck, Zap, ChevronRight, ChevronLeft,
  AlertTriangle, 
  Download, Play, BrainCircuit, Building,
  BarChart3, Lock, FileText, Eye, Target
} from "lucide-react";
import { MetaTags } from "@/components/seo/meta-tags";
import { OrganizationStructuredData, FAQStructuredData } from "@/components/seo/structured-data";
import { useSEO } from "@/hooks/use-seo";
import { cn } from "@/lib/utils";
import { LightBulbIcon, RocketLaunchIcon, CpuChipIcon, StarIcon } from "@heroicons/react/24/outline";
import HeroSection from "@/components/ui/hero-section";
import SolutionCard from "@/components/ui/solution-card";
import ResourceCard from "@/components/ui/resource-card";
import ROICalculator from "@/components/ui/roi-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "wouter";

// Import centralized data and components
import { IndustrySelector } from "@/components/industry/industry-selector";
import { IndustrySolutionsGrid } from "@/components/industry/industry-solutions-grid";

const Home = () => {
  const { seoConfig } = useSEO();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>("healthcare");
  const [selectedSolution, setSelectedSolution] = useState<any | null>(null);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);

  const handleGetStarted = () => {
    window.location.href = "/request";
  };

  const handleWatchDemo = () => {
    window.location.href = "/assessment";
  };

  const nextResource = () => {
    setCurrentResourceIndex((prev) => (prev + 1) % resources.length);
  };

  const prevResource = () => {
    setCurrentResourceIndex((prev) => (prev - 1 + resources.length) % resources.length);
  };

  // Solutions data (keeping local for now - will be centralized in future if needed)

  const solutions = [
    {
      icon: <Clock className="text-primary text-2xl" />,
      title: "Project Management",
      description: "Streamline your projects with AI-powered planning, tracking, and collaboration tools.",
      href: "/solutions#ai-automation",
    },
    {
      icon: <BarChart className="text-primary text-2xl" />,
      title: "Business Intelligence",
      description: "Make data-driven decisions with advanced analytics and real-time insights.",
      href: "/solutions#data-analytics",
    },
    {
      icon: <Cog className="text-primary text-2xl" />,
      title: "Process Automation",
      description: "Automate repetitive tasks and workflows to boost productivity and reduce errors.",
      href: "/solutions#ai-automation",
    },
    {
      icon: <Users className="text-primary text-2xl" />,
      title: "Customer Management",
      description: "Build stronger relationships with comprehensive customer insights and engagement tools.",
      href: "/solutions#data-analytics",
    },
    {
      icon: <Calculator className="text-primary text-2xl" />,
      title: "Financial Planning",
      description: "Optimize your financial performance with predictive modeling and smart budgeting.",
      href: "/solutions#data-analytics",
    },
    {
      icon: <ShieldCheck className="text-primary text-2xl" />,
      title: "Security & Compliance",
      description: "Protect your business with enterprise-grade security and automated compliance monitoring.",
      href: "/solutions#security-compliance",
    },
  ];

  const resources = [
    {
      type: "PRODUCT UPDATES",
      title: "Announcing Strive 2025",
      description: "Unveiled at our annual conference, Strive's latest AI-powered features are transforming how businesses operate.",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with team collaboration",
    },
    {
      type: "ON-DEMAND WEBINAR",
      title: "Expert Advice: How to Maximize Business Efficiency",
      description: "Learn from industry experts about implementing automation and AI to drive productivity.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions dashboard and analytics",
    },
    {
      type: "INDUSTRY NEWS",
      title: "Strive named #1 in Business Solutions",
      description: "Industry recognition for our comprehensive platform and customer satisfaction ratings.",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Professional business meeting with handshake",
    },
  ];


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
        title="Transform Your Business with AI to Lead Your Industry, Not Just Compete"
        subtitle="Are you struggling to outpace your competition with manual processes and outdated tools? At Strive, we help you unlock the potential of artificial intelligence, so your business runs smarter, faster, and more profitably."
        primaryButtonText="Get Started"
        secondaryButtonText="Book Free Assessment"
        onPrimaryClick={handleGetStarted}
        onSecondaryClick={handleWatchDemo}
      />
      {/* ROI Calculator */}
      <ROICalculator />
      {/* Industry Solutions Selector - Moved from Solutions Page */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="text-lg md:text-xl lg:text-2xl uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-industry-label"
            >
              AI SOLUTIONS TAILORED TO YOUR INDUSTRY'S BIGGEST CHALLENGES
            </div>
            <h2
              className="text-xl md:text-2xl font-bold mb-4 text-white"
              data-testid="text-industry-title"
            >
              No two industries are the same, which is why every solution we deliver is built around your goals
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Select your industry below to see proven strategies and results for companies just like yours.
            </p>
          </div>

          {/* Industry Selector Component */}
          <IndustrySelector
            selectedIndustry={selectedIndustry}
            onIndustrySelect={setSelectedIndustry}
          />

          {/* Industry Solutions Grid Component */}
          {selectedIndustry && (
            <IndustrySolutionsGrid selectedIndustry={selectedIndustry} />
          )}

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to become your industry's next success story?
              </h3>
              <p className="text-white/80 mb-6">
                Talk to an AI Expert to See What's Possible for Your Business.
              </p>
              <Link href="/request">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 font-bold"
                  size="lg"
                  data-testid="button-get-custom-solution"
                >
                  Get Custom Solution
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Integrated Platform Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#ffffffeb] text-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">

            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-section-label"
            >
              TRANSPARENCY, ACCOUNTABILITY, AND CONTROL
            </div>
            <h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-[#020a1c] leading-tight"
              data-testid="text-platform-title"
            >
              Never Wonder Where Your Project Stands with Real Time Visibility
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Your custom <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent font-semibold">Strive client portal</span> gives you daily progress updates and milestones, real-time chat with your team, 
              visual status dashboards, and secure, always-on access - everything you need to succeed with AI, all in one platform.
            </p>
          </div>

          {/* Solution Cards with Modal */}
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            {solutions.map((solution, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card 
                    className="bg-gradient-to-br from-white to-gray-50 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-200 hover:border-primary/30 overflow-hidden relative group h-full"
                    data-testid={`card-solution-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-2 sm:p-4 md:p-6 relative h-full flex flex-col">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                        <div className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-6 sm:[&>svg]:h-6">{solution.icon}</div>
                      </div>
                      <h3 className="text-xs sm:text-lg md:text-xl font-bold text-[#020a1c] mb-1 sm:mb-2 md:mb-3 transition-colors duration-300 group-hover:text-[#ff7033] text-center sm:text-left">
                        {solution.title}
                      </h3>
                      <p className="text-muted-foreground mb-2 sm:mb-3 md:mb-4 text-xs leading-relaxed flex-grow text-center sm:text-left">
                        {solution.description}
                      </p>
                      <div className="flex items-center text-[#020a1c] font-semibold transition-colors duration-300 group-hover:text-[#ff7033] mt-auto">
                        <span className="text-xs md:text-sm">View Details</span>
                        <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        {solution.icon}
                      </div>
                      {solution.title}
                    </DialogTitle>
                    <DialogDescription className="text-base mt-4">
                      {solution.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Real-time project status updates and milestone tracking</li>
                        <li>Visual progress indicators with completion percentages</li>
                        <li>Direct messaging with your dedicated project team</li>
                        <li>Document sharing and collaborative workspace</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Benefits:</h4>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Complete transparency throughout your project lifecycle</li>
                        <li>Faster decision-making with instant access to information</li>
                        <li>Reduced communication overhead with centralized updates</li>
                        <li>Historical tracking of all project changes and decisions</li>
                      </ul>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button 
                        onClick={() => window.location.href = "/contact"}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        Request Demo
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-2 border-[#ff7033] text-[#ff7033] hover:bg-[#ff7033] hover:text-white transition-all duration-300"
                        onClick={() => window.location.href = solution.href}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>
      {/* Why Us Section */}
      <section className="py-12 sm:py-16 hero-gradient relative overflow-hidden">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-lg animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight"
              data-testid="text-why-us-title"
            >
              <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">WHY INDUSTRY LEADERS CHOOSE STRIVE</span>
            </h2>
            <div 
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mb-6"
              data-testid="text-why-us-subtitle"
            >
              You don't need another vendor; you need a strategic partner for sustainable growth
            </div>
            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Innovation Delivered: Always-outpacing the market. Unmatched Scalability: Solutions that evolve with you. Proven Results, Every Time.
            </p>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
            {/* Innovative Tech */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 md:p-6 lg:p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LightBulbIcon className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4" data-testid="text-innovative-tech-title">
                  Innovation Delivered
                </h3>
                <p className="text-white/80 text-xs leading-relaxed flex-grow">
                  Always-outpacing the market with cutting-edge AI and automation technologies that keep you ahead.
                </p>
              </div>
            </div>

            {/* Scalable Solutions */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 md:p-6 lg:p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <RocketLaunchIcon className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4" data-testid="text-scalable-solutions-title">
                  Unmatched Scalability
                </h3>
                <p className="text-white/80 text-xs leading-relaxed flex-grow">
                  Solutions that evolve with you. Our architecture scales seamlessly from startup to enterprise, adapting as you grow.
                </p>
              </div>
            </div>

            {/* Future-Proof Design */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 md:p-6 lg:p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CpuChipIcon className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4" data-testid="text-future-proof-title">
                  Future-Proof Design
                </h3>
                <p className="text-white/80 text-xs leading-relaxed flex-grow">
                  Built to evolve. Our solutions integrate emerging technologies, ensuring your investment remains valuable for years.
                </p>
              </div>
            </div>

            {/* Proven Results */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 md:p-6 lg:p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <StarIcon className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4" data-testid="text-proven-results-title">
                  Proven Results
                </h3>
                <p className="text-white/80 text-xs leading-relaxed flex-grow">
                  Track record of success. Our clients see 3x faster processing, 60% cost reduction, and 24/7 automated efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to become your industry's next success story?
              </h3>
              <p className="text-white/80 mb-6 text-lg">
                See Customer Case Studies and discover what's possible for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                  size="lg"
                  onClick={() => window.location.href = "/contact"}
                  data-testid="button-get-started-why-us"
                >
                  Let's Meet!
                </Button>
                <Button 
                  variant="outline"
                  className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  size="lg"
                  onClick={() => window.location.href = "/portfolio"}
                  data-testid="button-meet-team"
                >
                  View Our Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Resources Preview */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#020a1c] leading-tight"
              data-testid="text-resources-title"
            >
              Lead the AI Revolution in Your Industry
            </h2>
            <a 
              href="/resources" 
              className="text-primary font-semibold hover:underline"
              data-testid="link-all-resources"
            >
              View all resources →
            </a>
          </div>

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Whitepaper Card - Strive Tech Business Solutions Whitepaper */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 h-full flex flex-col">
              <div className="relative overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
                  alt="Strive Tech AI business solutions and transformation"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500 text-white border-0 text-xs px-2 py-1">
                    FEATURED WHITEPAPER
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 text-gray-900 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  Strive Tech Business Tools Whitepaper
                </h4>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">
                  Discover how Strive Tech transforms businesses through cutting-edge AI tools. From intelligent automation to predictive analytics, learn how our comprehensive suite drives growth and efficiency.
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Business Guide
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      2,543 downloads
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-slate-800 text-white hover:bg-primary hover:text-white transition-all duration-300 border-0"
                  onClick={() => window.location.href = "/resources?filter=Whitepapers"}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Case Study Card - Microsoft AI Transformation */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 h-full flex flex-col">
              <div className="relative overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                  alt="Microsoft technology workspace with AI-powered productivity tools and cloud computing infrastructure"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white border-0 text-xs px-2 py-1">
                    CASE STUDY
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 text-gray-900 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  Microsoft's AI Transformation: $18.3B Revenue Blueprint
                </h4>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">
                  Microsoft's strategic AI implementation generated $18.3 billion in annual revenue while achieving 47% ROI and 55% productivity improvement.
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      Technology
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      16 min read
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-slate-800 text-white hover:bg-primary hover:text-white transition-all duration-300 border-0"
                  onClick={() => window.location.href = "/resources?filter=Case Studies"}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Quiz Card - AI Model Types & Architectures */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 h-full flex flex-col">
              <div className="relative overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                  alt="AI neural network architecture visualization with interconnected nodes"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-500 text-white border-0 text-xs px-2 py-1">
                    INTERACTIVE QUIZ
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 text-gray-900 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  AI Model Types & Architectures
                </h4>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">
                  Explore different AI model architectures, from transformers to diffusion models. Test your advanced understanding.
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Advanced Level
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      30 min
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-slate-800 text-white hover:bg-primary hover:text-white transition-all duration-300 border-0"
                  onClick={() => window.location.href = "/resources?filter=Quizzes"}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Get Started Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#ffffffeb] to-[#f8fafceb] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Call to Action */}
            <div className="bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm border border-white/60 rounded-3xl p-8 lg:p-10 text-center shadow-xl">
              <h3 className="text-xl lg:text-2xl font-bold text-[#020a1c] mb-4">
                Your Path to Results with AI: It's Simple
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Book Your Free Assessment → Receive Your Custom AI Solution Roadmap → Transform Operations and See Measurable Impact in Weeks. Ready to start? You're just one step away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  variant="outline"
                  className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 min-w-[200px] relative overflow-hidden"
                  size="lg"
                  onClick={() => window.location.href = "/request"}
                  data-testid="button-request-demo"
                >
                  Request Free Demo
                </Button>
                <Button 
                  variant="outline"
                  className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 min-w-[200px] relative overflow-hidden"
                  size="lg"
                  onClick={() => window.location.href = "/portfolio"}
                  data-testid="button-view-case-studies"
                >
                  View Our Work
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                ✓ No commitment required  •  ✓ Custom solution walkthrough  •  ✓ ROI analysis included
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
