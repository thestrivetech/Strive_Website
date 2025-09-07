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
    window.location.href = "/get-started";
  };

  const handleWatchDemo = () => {
    window.location.href = "/demo";
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
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection
        title="Custom AI Solutions Built for Real World Performance"
        subtitle="Unlock the power of artificial intelligence to transform your business operations, increase efficiency, and drive sustainable growth."
        primaryButtonText="Get Started"
        secondaryButtonText="Request Free Demo"
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
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-industry-label"
            >
              SOLUTIONS BY INDUSTRY
            </div>
            <h2 
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              data-testid="text-industry-title"
            >
              Find tailored solutions for your industry
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Select your industry to discover how our AI-powered solutions can scale your business operations.
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
                          Pain Point: {solution.painPoint}
                        </p>
                      )}
                      <p className="text-white/90 text-xs leading-relaxed">
                        Solution: {solution.description}
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
                Ready to Transform Your Industry?
              </h3>
              <p className="text-white/80 mb-6">
                Explore our comprehensive solutions designed specifically for your business sector.
              </p>
              <Link href="/solutions">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                  size="lg"
                  data-testid="button-explore-solutions"
                >
                  Explore All Solutions
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
              YOUR PROJECT DASHBOARD
            </div>
            <h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-[#020a1c] leading-tight"
              data-testid="text-platform-title"
            >
              Stay Connected with Real-Time Project Insights & Daily Progress Updates
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our exclusive client portal gives you complete visibility into your project's progress with daily snapshots, 
              visual updates, milestone tracking, and direct communication with your dedicated team - all in one secure platform.
            </p>
          </div>

          {/* Solution Cards with Modal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutions.map((solution, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card 
                    className="bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100"
                    data-testid={`card-solution-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <CardContent className="p-6 group">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        {solution.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[#020a1c] mb-3 transition-colors duration-300 group-hover:text-[#ff7033]">
                        {solution.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {solution.description}
                      </p>
                      <div className="flex items-center text-[#020a1c] font-semibold transition-colors duration-300 group-hover:text-[#ff7033]">
                        <span>View Details</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
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
              <span className="gradient-text">WHY CHOOSE STRIVE</span>
            </h2>
            <div 
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mb-6"
              data-testid="text-why-us-subtitle"
            >
              The Future of Business Starts Here
            </div>
            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Don't just keep up with the competition—surpass them. Our cutting-edge AI solutions deliver measurable results that transform how you do business.
            </p>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Innovative Tech */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LightBulbIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4" data-testid="text-innovative-tech-title">
                  Innovative Tech
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Cutting-edge AI and automation technologies that keep you ahead of industry trends and competitor solutions.
                </p>
              </div>
            </div>

            {/* Scalable Solutions */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <RocketLaunchIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4" data-testid="text-scalable-solutions-title">
                  Scalable Solutions
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Grow without limits. Our architecture scales seamlessly from startup to enterprise, adapting to your business needs.
                </p>
              </div>
            </div>

            {/* Future-Proof Design */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CpuChipIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4" data-testid="text-future-proof-title">
                  Future-Proof Design
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Built to evolve. Our solutions integrate emerging technologies, ensuring your investment remains valuable for years.
                </p>
              </div>
            </div>

            {/* Proven Results */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <StarIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4" data-testid="text-proven-results-title">
                  Proven Results
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Track record of success. Our clients see 3x faster processing, 60% cost reduction, and 24/7 automated efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-white/80 mb-6 text-lg">
                Join industry leaders who've already made the switch to intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                  onClick={() => window.location.href = "/contact"}
                  data-testid="button-get-started-why-us"
                >
                  Get Started Today
                </Button>
                <Button 
                  variant="outline"
                  className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  size="lg"
                  onClick={() => window.location.href = "/about"}
                  data-testid="button-meet-team"
                >
                  Meet the Team
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
              <h3 className="text-xl lg:text-2xl font-bold text-[#020a1c] mb-4">
                Get Started in Just 15 Minutes
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Schedule a personalized demo and see exactly how our solutions can transform your specific business challenges into competitive advantages.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  variant="outline"
                  className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 min-w-[200px] relative overflow-hidden"
                  size="lg"
                  onClick={() => window.location.href = "/demo"}
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
  );
};

export default Home;
