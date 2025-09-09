import { useState } from "react";
import { 
  Trophy, Shield, Brain, TrendingUp, Clock, Users, BarChart, Cog, Calculator, ShieldCheck, 
  Truck, Zap, ChevronRight,
  Heart, DollarSign, Factory, ShoppingCart, Monitor, GraduationCap, Home as HomeIcon, Scale,
  Microscope, ClipboardList, CheckCircle, AlertTriangle, LineChart, UserCheck,
  Wrench, Eye, Package, Settings, Target, Coins, Globe,
  BookOpen, Clipboard, Award, PenTool, Building2, FileText, Search, ShieldAlert
} from "lucide-react";
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

const Home = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<any | null>(null);

  const handleGetStarted = () => {
    window.location.href = "/request";
  };

  const handleWatchDemo = () => {
    window.location.href = "/request";
  };

  const industrySpecificSolutions = {
    healthcare: [
      { name: "AI-powered diagnostics and imaging analysis", icon: <Microscope className="w-8 h-8" />, painPoint: "70% misdiagnosis rate in complex cases", description: "Reduce diagnostic errors by 85% with AI pattern recognition that analyzes medical imaging faster than human specialists" },
      { name: "Patient data management and EHR integration", icon: <ClipboardList className="w-8 h-8" />, painPoint: "4+ hours daily on documentation", description: "Save 3 hours per day with automated EHR management and intelligent data entry systems" },
      { name: "Automated compliance and regulatory reporting", icon: <CheckCircle className="w-8 h-8" />, painPoint: "$2.5M average HIPAA violation penalty", description: "Achieve 99.9% HIPAA compliance with automated monitoring and real-time violation prevention" },
      { name: "Predictive analytics for patient outcomes", icon: <TrendingUp className="w-8 h-8" />, painPoint: "30% hospital readmission rates", description: "Reduce readmissions by 45% through AI-driven early intervention and risk prediction" }
    ],
    finance: [
      { name: "Real-time fraud detection and prevention", icon: <Shield className="w-8 h-8" />, painPoint: "$5.8 billion lost to fraud annually", description: "Block 95% of fraudulent transactions in real-time with AI that learns from millions of transaction patterns" },
      { name: "Automated risk assessment and reporting", icon: <TrendingUp className="w-8 h-8" />, painPoint: "72 hours for manual risk analysis", description: "Complete comprehensive risk assessments in under 5 minutes with 99% accuracy" },
      { name: "Algorithmic trading and portfolio optimization", icon: <LineChart className="w-8 h-8" />, painPoint: "60% of trades miss optimal timing", description: "Execute trades at perfect timing with AI that processes market data 1000x faster than humans" },
      { name: "Customer behavior analytics and personalization", icon: <UserCheck className="w-8 h-8" />, painPoint: "85% customer churn due to poor service", description: "Reduce churn by 60% with predictive analytics that anticipate customer needs before they arise" }
    ],
    manufacturing: [
      { name: "Predictive maintenance and equipment monitoring", icon: <Wrench className="w-8 h-8" />, painPoint: "$50K/hour in unplanned downtime costs", description: "Reduce equipment failures by 75% with AI that predicts breakdowns 48 hours in advance" },
      { name: "Quality control automation with computer vision", icon: <Eye className="w-8 h-8" />, painPoint: "3-5% defect rates in production", description: "Achieve 99.9% quality standards with computer vision that catches defects humans miss" },
      { name: "Supply chain optimization and demand forecasting", icon: <Package className="w-8 h-8" />, painPoint: "30% excess inventory costs", description: "Cut inventory costs by 40% with AI demand forecasting accurate to within 2%" },
      { name: "Production workflow automation", icon: <Settings className="w-8 h-8" />, painPoint: "45% production capacity underutilized", description: "Increase throughput by 35% with intelligent workflow optimization and automation" }
    ],
    retail: [
      { name: "Customer analytics and personalized recommendations", icon: <Target className="w-8 h-8" />, painPoint: "Only 2% conversion rate average", description: "Triple conversion rates with AI personalization that shows each customer exactly what they want" },
      { name: "Inventory management and demand prediction", icon: <BarChart className="w-8 h-8" />, painPoint: "20% stockout rate during peak times", description: "Eliminate stockouts with AI that predicts demand spikes 2 weeks in advance" },
      { name: "Dynamic pricing optimization", icon: <Coins className="w-8 h-8" />, painPoint: "Losing 15% margin to price competition", description: "Maximize profits with real-time pricing that adjusts to market conditions instantly" },
      { name: "Omnichannel customer experience automation", icon: <Globe className="w-8 h-8" />, painPoint: "67% cart abandonment rate", description: "Reduce abandonment by 50% with seamless cross-channel experience and smart retargeting" }
    ],
    technology: [
      { name: "DevOps automation and CI/CD optimization", icon: <Zap className="w-8 h-8" />, painPoint: "40% developer time on deployment issues", description: "Deploy 10x faster with zero-downtime CI/CD that eliminates 90% of deployment failures" },
      { name: "AI agent development and deployment", icon: <Brain className="w-8 h-8" />, painPoint: "$200K+ annual cost for repetitive tasks", description: "Save 80% on operational costs with AI agents that automate complex workflows 24/7" },
      { name: "Cloud infrastructure and scaling solutions", icon: <Globe className="w-8 h-8" />, painPoint: "70% cloud resources underutilized", description: "Cut cloud costs by 50% with intelligent auto-scaling that matches demand perfectly" },
      { name: "Data pipeline automation and analytics", icon: <TrendingUp className="w-8 h-8" />, painPoint: "5 days to generate business reports", description: "Get real-time insights with automated pipelines that process terabytes in minutes" }
    ],
    education: [
      { name: "Learning analytics and student performance insights", icon: <BookOpen className="w-8 h-8" />, painPoint: "40% student dropout rate", description: "Identify at-risk students 85% earlier with AI that analyzes learning patterns in real-time" },
      { name: "Administrative workflow automation", icon: <Clipboard className="w-8 h-8" />, painPoint: "60% time on paperwork vs teaching", description: "Free up 5 hours daily for teaching by automating administrative tasks completely" },
      { name: "Personalized learning path recommendations", icon: <Target className="w-8 h-8" />, painPoint: "One-size-fits-all curriculum fails 50%", description: "Improve outcomes by 70% with AI that creates unique learning paths for each student" },
      { name: "Automated grading and assessment tools", icon: <PenTool className="w-8 h-8" />, painPoint: "2 weeks average grading turnaround", description: "Provide instant feedback with AI grading that's 95% accurate and available 24/7" }
    ],
    "real-estate": [
      { name: "Property valuation and market analysis", icon: <Building2 className="w-8 h-8" />, painPoint: "15% valuation errors cost millions", description: "Achieve 98% valuation accuracy with AI analyzing 500+ market factors instantly" },
      { name: "Automated property management workflows", icon: <FileText className="w-8 h-8" />, painPoint: "30% vacancy rates from slow processing", description: "Fill properties 60% faster with automated screening and instant lease processing" },
      { name: "Lead generation and customer relationship management", icon: <Users className="w-8 h-8" />, painPoint: "80% of leads never convert", description: "Triple conversion rates with AI that nurtures leads and identifies hot prospects automatically" },
      { name: "Market trend prediction and investment insights", icon: <TrendingUp className="w-8 h-8" />, painPoint: "Missing 40% of investment opportunities", description: "Spot profitable opportunities 30 days earlier with predictive market analytics" }
    ],
    legal: [
      { name: "Document automation and contract analysis", icon: <FileText className="w-8 h-8" />, painPoint: "20 hours per contract review", description: "Review contracts in 30 minutes with AI that catches risks humans miss 40% of the time" },
      { name: "Case management and workflow optimization", icon: <Scale className="w-8 h-8" />, painPoint: "35% cases miss critical deadlines", description: "Never miss a deadline with automated workflows that track every case milestone" },
      { name: "Legal research and precedent discovery", icon: <Search className="w-8 h-8" />, painPoint: "50+ hours on case research", description: "Find relevant precedents in seconds with AI that searches millions of cases instantly" },
      { name: "Compliance monitoring and risk assessment", icon: <ShieldAlert className="w-8 h-8" />, painPoint: "$4M average compliance violation fine", description: "Maintain 100% compliance with real-time monitoring that prevents violations before they occur" }
    ]
  };

  const planSteps = [
    {
      icon: <Search className="text-primary text-3xl" />,
      step: "STEP 1",
      title: "Get Your Free AI Assessment",
      description: "30-minute deep-dive analysis of your biggest operational bottlenecks and AI opportunities.",
      duration: "30 minutes",
      outcome: "Custom roadmap identifying $500K+ in annual savings",
      href: "/contact",
    },
    {
      icon: <Settings className="text-primary text-3xl" />,
      step: "STEP 2",
      title: "We Build Your Custom Solution",
      description: "Our experts design and implement AI automation tailored to your exact workflows and goals.",
      duration: "30-60 days",
      outcome: "Live AI system processing your work 24/7",
      href: "/solutions",
    },
    {
      icon: <TrendingUp className="text-primary text-3xl" />,
      step: "STEP 3",
      title: "Watch Your Operations Transform",
      description: "Real-time dashboard shows your efficiency gains, cost savings, and team productivity increases.",
      duration: "Day 1 onwards",
      outcome: "3x faster processing, 60% cost reduction, liberated team",
      href: "/portfolio",
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
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection
        title="Stop Losing $2M Annually to Manual Processes—Transform Your Operations in 90 Days"
        subtitle="Join 500+ industry leaders who've automated their way to 3x growth while their competitors struggle with spreadsheets. Get your free AI assessment and custom roadmap today."
        primaryButtonText="Get My Free AI Assessment"
        secondaryButtonText="Calculate My ROI"
        onPrimaryClick={handleGetStarted}
        onSecondaryClick={handleWatchDemo}
      />
      {/* Problem Identification Section */}
      <section className="py-12 sm:py-16 bg-[#ffffffeb] border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="text-sm uppercase tracking-wide text-red-600 font-semibold mb-4">
              THE HARSH REALITY
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#020a1c] leading-tight">
              You're Drowning in Manual Processes While Competitors Race Ahead
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white p-6 rounded-xl border border-red-100 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-[#020a1c] mb-3">
                Your Best People Waste 60% of Their Time
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Top talent spending hours on spreadsheets, data entry, and repetitive tasks instead of strategic initiatives that drive growth.
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl border border-red-100 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-[#020a1c] mb-3">
                Manual Processes Cost You $2M+ Annually
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hidden costs of inefficiency: errors, delays, overtime, missed opportunities, and employee burnout from soul-crushing repetitive work.
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl border border-red-100 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-[#020a1c] mb-3">
                You Know AI is the Answer But Don't Know Where to Start
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Paralyzed by complexity, overwhelmed by options, and afraid of making the wrong investment in AI transformation.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-lg text-[#020a1c] font-semibold">
              <span className="text-red-600">The Result:</span> While you struggle with spreadsheets, your AI-powered competitors are capturing your market share.
            </p>
          </div>
        </div>
      </section>
      {/* ROI Calculator */}
      <ROICalculator />
      {/* Industry Solutions Selector - Moved from Solutions Page */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Guide Positioning */}
          <div className="text-center mb-12">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-industry-label"
            >
              WE UNDERSTAND THE PRESSURE YOU'RE UNDER
            </div>
            <h2 
              className="text-2xl md:text-3xl font-bold mb-6 text-white"
              data-testid="text-industry-title"
            >
              500+ Leaders Have Trusted Us to Transform Their Operations
            </h2>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
              <p className="text-white/90 text-lg leading-relaxed mb-4">
                <span className="text-primary font-semibold">We get it.</span> You're overwhelmed by AI complexity while competitors gain ground. 
                That's why we've guided 500+ companies through seamless AI transformation — with zero technical headaches.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span>Industry #1 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>500+ Successful Implementations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>90-Day Proven Process</span>
                </div>
              </div>
            </div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Select your industry to see how we've helped companies just like yours achieve 3x faster processing and 60% cost reduction.
            </p>
          </div>

          {/* Industry Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            {[
              { id: "healthcare", name: "Healthcare", icon: <Heart className="w-8 h-8" /> },
              { id: "finance", name: "Finance", icon: <DollarSign className="w-8 h-8" /> },
              { id: "manufacturing", name: "Manufacturing", icon: <Factory className="w-8 h-8" /> },
              { id: "retail", name: "Retail", icon: <ShoppingCart className="w-8 h-8" /> },
              { id: "technology", name: "Technology", icon: <Monitor className="w-8 h-8" /> },
              { id: "education", name: "Education", icon: <GraduationCap className="w-8 h-8" /> },
              { id: "real-estate", name: "Real Estate", icon: <HomeIcon className="w-8 h-8" /> },
              { id: "legal", name: "Legal", icon: <Scale className="w-8 h-8" /> }
            ].map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(selectedIndustry === industry.id ? null : industry.id)}
                className="p-4 rounded-xl border-2 bg-[#020a1c] backdrop-blur-sm border-orange-500 text-white hover:bg-[#020a1c]/90 hover:border-orange-400 transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-orange-500/20"
                data-testid={`button-industry-${industry.id}`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-white">{industry.icon}</div>
                  <span className="text-sm font-medium">{industry.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Industry-Specific Solutions */}
          {selectedIndustry && industrySpecificSolutions[selectedIndustry as keyof typeof industrySpecificSolutions] && (
            <div className="mt-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {[
                    { id: "healthcare", name: "Healthcare" },
                    { id: "finance", name: "Finance" },
                    { id: "manufacturing", name: "Manufacturing" },
                    { id: "retail", name: "Retail" },
                    { id: "technology", name: "Technology" },
                    { id: "education", name: "Education" },
                    { id: "real-estate", name: "Real Estate" },
                    { id: "legal", name: "Legal" }
                  ].find(industry => industry.id === selectedIndustry)?.name} Solutions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {industrySpecificSolutions[selectedIndustry as keyof typeof industrySpecificSolutions].map((solution, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-white mb-4 flex justify-center">{solution.icon}</div>
                      <h4 className="text-white font-semibold mb-2 text-sm leading-tight">
                        {solution.name}
                      </h4>
                      {solution.painPoint && (
                        <p className="text-red-400 text-xs font-semibold mb-2">
                          ❌ Cost of Inaction: {solution.painPoint}
                        </p>
                      )}
                      <p className="text-green-300 text-xs leading-relaxed">
                        ✓ Your Success Story: {solution.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stop Letting Competitors Steal Your Market Share
              </h3>
              <p className="text-white/80 mb-6">
                Get your free industry-specific transformation roadmap and see exactly how much you can save in the first 90 days.
              </p>
              <Link href="/contact">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                  size="lg"
                  data-testid="button-get-transformation-roadmap"
                >
                  Get My Free Transformation Roadmap
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* 3-Step Plan Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#ffffffeb] text-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-section-label"
            >
              OUR PROVEN 90-DAY TRANSFORMATION PLAN
            </div>
            <h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-[#020a1c] leading-tight"
              data-testid="text-platform-title"
            >
              From Manual Chaos to AI-Powered Growth in 3 Simple Steps
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We've perfected this process with 500+ companies. No technical complexity, no months of delays, no risk to your operations.
            </p>
          </div>

          {/* 3-Step Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {planSteps.map((step, index) => (
              <Card 
                key={index}
                className="bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 relative"
                data-testid={`card-step-${index + 1}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {step.step}
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto mt-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#020a1c] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span className="font-semibold text-[#020a1c]">{step.duration}</span>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 text-xs font-semibold">
                        ✓ {step.outcome}
                      </p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                    onClick={() => window.location.href = step.href}
                  >
                    {index === 0 ? "Start Here - It's Free" : index === 1 ? "See Our Solutions" : "View Success Stories"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Success Vision & Failure Stakes Section */}
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              data-testid="text-why-us-title"
            >
              <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">YOUR SUCCESS STORY STARTS HERE</span>
            </h2>
            <div 
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mb-6"
              data-testid="text-why-us-subtitle"
            >
              Picture Your Business 90 Days From Now
            </div>
            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Your operations humming at 3x speed. Your team focused on growth, not spreadsheets. Your competitors wondering how you pulled so far ahead.
            </p>
          </div>

          {/* Success Outcomes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Success Outcome 1 */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-green-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4" data-testid="text-success-growth">
                  3x Faster Growth
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Your operations running at triple speed while competitors struggle with manual processes. First-mover advantage secured.
                </p>
              </div>
            </div>

            {/* Success Outcome 2 */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-green-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4" data-testid="text-success-savings">
                  60% Cost Reduction
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Massive operational savings from AI automation. Your profit margins expanding while overhead costs plummet.
                </p>
              </div>
            </div>

            {/* Success Outcome 3 */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-green-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4" data-testid="text-success-team">
                  Liberated Team
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Your best people doing their best work. No more spreadsheet drudgery. Pure strategic focus and innovation.
                </p>
              </div>
            </div>

            {/* Success Outcome 4 */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-green-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4" data-testid="text-success-leadership">
                  Industry Leadership
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Recognized as the AI-powered leader in your industry. Competitors studying your success, not the other way around.
                </p>
              </div>
            </div>
          </div>

          {/* Failure Stakes Warning */}
          <div className="mt-12 bg-red-900/20 border border-red-500/30 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                The Cost of Staying Manual
              </h3>
              <p className="text-red-200 text-base leading-relaxed">
                While you hesitate, competitors with AI are capturing your customers, your talent, and your market position. 
                Every day of delay costs you $5,000+ in lost opportunity.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Choose Your Future: AI Leadership or Manual Mediocrity
              </h3>
              <p className="text-white/80 mb-6 text-lg">
                500+ companies chose transformation. Their competitors chose to wait. Whose story will be yours?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                  size="lg"
                  onClick={() => window.location.href = "/contact"}
                  data-testid="button-claim-transformation"
                >
                  Claim Your Transformation Now
                </Button>
                <Button 
                  variant="outline"
                  className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  size="lg"
                  onClick={() => window.location.href = "/portfolio"}
                  data-testid="button-see-proof"
                >
                  See the Proof
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
              Discover what's new with Strive
            </h2>
            <a 
              href="/resources" 
              className="text-primary font-semibold hover:underline"
              data-testid="link-all-resources"
            >
              View all resources →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                type={resource.type}
                title={resource.title}
                description={resource.description}
                imageUrl={resource.imageUrl}
                imageAlt={resource.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Get Started Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#ffffffeb] to-[#f8fafceb] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Call to Action */}
            <div className="bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm border border-white/60 rounded-3xl p-8 lg:p-10 text-center shadow-xl">
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-semibold text-sm">
                  ⚠️ WARNING: Every day you delay costs you $5,000+ in lost opportunities
                </p>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-[#020a1c] mb-4">
                Don't Let Competitors Capture Your Market While You Hesitate
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Get your free AI transformation roadmap and discover exactly how much you'll save in the first 90 days. 
                <span className="font-semibold text-[#020a1c]">Join 500+ leaders who chose growth over stagnation.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 min-w-[240px] relative overflow-hidden shadow-xl group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                  size="lg"
                  onClick={() => window.location.href = "/contact"}
                  data-testid="button-claim-roadmap"
                >
                  Claim My Free Roadmap Now
                </Button>
                <Button 
                  variant="outline"
                  className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 min-w-[240px] relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                  size="lg"
                  onClick={() => window.location.href = "/portfolio"}
                  data-testid="button-see-transformations"
                >
                  See Real Transformations
                </Button>
              </div>
              
              <div className="mt-6 space-y-2">
                <p className="text-sm text-green-700 font-semibold">
                  ✓ Free 30-min assessment  •  ✓ Custom $500K+ savings analysis  •  ✓ 90-day transformation plan
                </p>
                <p className="text-xs text-muted-foreground italic">
                  "Best business decision we ever made. Wish we'd started sooner." - CEO, Fortune 500 Company
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
