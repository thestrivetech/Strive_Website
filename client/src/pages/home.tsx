import { Trophy, Shield, Brain, TrendingUp, Clock, Users, BarChart, Cog, Calculator, ShieldCheck, Truck, Zap } from "lucide-react";
import { LightBulbIcon, RocketLaunchIcon, CpuChipIcon, StarIcon } from "@heroicons/react/24/outline";
import HeroSection from "@/components/ui/hero-section";
import SolutionCard from "@/components/ui/solution-card";
import ResourceCard from "@/components/ui/resource-card";
import ROICalculator from "@/components/ui/roi-calculator";
import { Button } from "@/components/ui/button";

const Home = () => {
  const handleGetStarted = () => {
    window.location.href = "/get-started";
  };

  const handleWatchDemo = () => {
    window.location.href = "/demo";
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
        title="Technology that makes your business operations more efficient."
        subtitle="One platform to help improve the productivity, efficiency, and profitability of your operations."
        onPrimaryClick={handleGetStarted}
        onSecondaryClick={handleWatchDemo}
      />
      {/* ROI Calculator */}
      <ROICalculator />
      {/* Integrated Platform Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#ffffffeb] text-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-section-label"
            >
              INTEGRATED BUSINESS PLATFORM
            </div>
            <h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-[#020a1c] leading-tight"
              data-testid="text-platform-title"
            >
              A fully integrated suite of solutions, powered by industry leading AI.
            </h2>
          </div>

          {/* Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={index}
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                href={solution.href}
              />
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
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-why-us-label"
            >
              WHY CHOOSE STRIVE
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight"
              data-testid="text-why-us-title"
            >
              The Future of Business <span className="gradient-text">Starts Here</span>
            </h2>
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
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                  onClick={() => window.location.href = "/contact"}
                  data-testid="button-get-started-why-us"
                >
                  Get Started Today
                </Button>
                <Button 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
                  size="lg"
                  onClick={() => window.location.href = "/portfolio"}
                  data-testid="button-view-portfolio"
                >
                  View Success Stories
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
      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 text-[#020a1c] bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-cta-label"
            >
              CONNECT WITH US
            </div>
            <h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight"
              data-testid="text-cta-title"
            >
              We'd love to show you around
            </h2>
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed"
              data-testid="text-cta-description"
            >
              With Strive you can streamline operations, automate processes, and drive growth with intelligent insights.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
              <div className="text-center">
                <Shield className="text-primary text-3xl mb-4 mx-auto" />
                <p 
                  className="text-muted-foreground"
                  data-testid="text-benefit-compliance"
                >
                  Comply with industry standards and regulations.
                </p>
              </div>
              <div className="text-center">
                <Brain className="text-primary text-3xl mb-4 mx-auto" />
                <p 
                  className="text-muted-foreground"
                  data-testid="text-benefit-automation"
                >
                  Identify opportunities and automate decision-making.
                </p>
              </div>
              <div className="text-center">
                <TrendingUp className="text-primary text-3xl mb-4 mx-auto" />
                <p 
                  className="text-muted-foreground"
                  data-testid="text-benefit-visibility"
                >
                  Improve visibility and automate operations.
                </p>
              </div>
            </div>

            <Button 
              className="bg-primary text-primary-foreground px-8 py-3 text-lg hover:bg-primary/90"
              size="lg"
              onClick={() => window.location.href = "/contact"}
              data-testid="button-schedule-consultation"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
