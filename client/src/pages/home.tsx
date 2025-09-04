import { useState } from "react";
import { Trophy, Shield, Brain, TrendingUp, Clock, Users, BarChart, Cog, Calculator, ShieldCheck, Truck, Zap } from "lucide-react";
import { LightBulbIcon, RocketLaunchIcon, CpuChipIcon, StarIcon } from "@heroicons/react/24/outline";
import HeroSection from "@/components/ui/hero-section";
import SolutionCard from "@/components/ui/solution-card";
import ResourceCard from "@/components/ui/resource-card";
import ROICalculator from "@/components/ui/roi-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const Home = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const handleGetStarted = () => {
    window.location.href = "/get-started";
  };

  const handleWatchDemo = () => {
    window.location.href = "/portfolio?filter=demo";
  };

  const industrySpecificSolutions = {
    healthcare: [
      { name: "AI-powered diagnostics and imaging analysis", icon: "🔬", description: "Advanced medical imaging with AI pattern recognition" },
      { name: "Patient data management and EHR integration", icon: "📋", description: "Seamless electronic health record management" },
      { name: "Automated compliance and regulatory reporting", icon: "✅", description: "HIPAA compliant automated reporting systems" },
      { name: "Predictive analytics for patient outcomes", icon: "📊", description: "Early intervention through predictive modeling" }
    ],
    finance: [
      { name: "Real-time fraud detection and prevention", icon: "🛡️", description: "Advanced AI algorithms for fraud prevention" },
      { name: "Automated risk assessment and reporting", icon: "📈", description: "Comprehensive risk analysis and compliance reporting" },
      { name: "Algorithmic trading and portfolio optimization", icon: "💹", description: "AI-driven trading strategies and portfolio management" },
      { name: "Customer behavior analytics and personalization", icon: "👤", description: "Deep customer insights for personalized services" }
    ],
    manufacturing: [
      { name: "Predictive maintenance and equipment monitoring", icon: "🔧", description: "Prevent downtime with intelligent maintenance scheduling" },
      { name: "Quality control automation with computer vision", icon: "👁️", description: "Automated quality inspection using AI vision" },
      { name: "Supply chain optimization and demand forecasting", icon: "📦", description: "Optimize inventory and predict demand patterns" },
      { name: "Production workflow automation", icon: "⚙️", description: "Streamline manufacturing processes with automation" }
    ],
    retail: [
      { name: "Customer analytics and personalized recommendations", icon: "🎯", description: "AI-powered personalization for better customer experience" },
      { name: "Inventory management and demand prediction", icon: "📊", description: "Smart inventory optimization and demand forecasting" },
      { name: "Dynamic pricing optimization", icon: "💰", description: "Real-time pricing strategies based on market conditions" },
      { name: "Omnichannel customer experience automation", icon: "🌐", description: "Seamless customer journey across all channels" }
    ],
    technology: [
      { name: "DevOps automation and CI/CD optimization", icon: "🚀", description: "Automated deployment pipelines and infrastructure" },
      { name: "AI agent development and deployment", icon: "🤖", description: "Custom AI agents for business automation" },
      { name: "Cloud infrastructure and scaling solutions", icon: "☁️", description: "Auto-scaling cloud infrastructure management" },
      { name: "Data pipeline automation and analytics", icon: "📈", description: "Automated data processing and business intelligence" }
    ],
    education: [
      { name: "Learning analytics and student performance insights", icon: "📚", description: "Data-driven insights into student learning patterns" },
      { name: "Administrative workflow automation", icon: "📋", description: "Streamline administrative processes and workflows" },
      { name: "Personalized learning path recommendations", icon: "🎯", description: "AI-powered personalized education pathways" },
      { name: "Automated grading and assessment tools", icon: "✏️", description: "Intelligent automated grading and feedback systems" }
    ],
    "real-estate": [
      { name: "Property valuation and market analysis", icon: "🏠", description: "AI-powered property valuation and market insights" },
      { name: "Automated property management workflows", icon: "🗂️", description: "Streamline property management operations" },
      { name: "Lead generation and customer relationship management", icon: "📞", description: "Automated lead qualification and CRM integration" },
      { name: "Market trend prediction and investment insights", icon: "📈", description: "Predictive analytics for real estate investments" }
    ],
    legal: [
      { name: "Document automation and contract analysis", icon: "📄", description: "AI-powered document generation and contract review" },
      { name: "Case management and workflow optimization", icon: "⚖️", description: "Streamlined case management and legal workflows" },
      { name: "Legal research and precedent discovery", icon: "🔍", description: "AI-assisted legal research and case law analysis" },
      { name: "Compliance monitoring and risk assessment", icon: "🛡️", description: "Automated compliance monitoring and risk management" }
    ]
  };

  const solutions = [
    {
      title: "Project Management",
      description: "Streamline your projects with AI-powered planning, tracking, and collaboration tools.",
      href: "/solutions#ai-automation",
    },
    {
      title: "Business Intelligence", 
      description: "Make data-driven decisions with advanced analytics and real-time insights.",
      href: "/solutions#data-analytics",
    },
    {
      title: "Process Automation",
      description: "Automate repetitive tasks and workflows to boost productivity and reduce errors.",
      href: "/solutions#ai-automation",
    },
    {
      title: "Customer Management",
      description: "Build stronger relationships with comprehensive customer insights and engagement tools.",
      href: "/solutions#data-analytics",
    },
    {
      title: "Financial Planning",
      description: "Optimize your financial performance with predictive modeling and smart budgeting.",
      href: "/solutions#data-analytics",
    },
    {
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
      
      {/* Industry Solutions Selector */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-sm uppercase tracking-wide text-primary font-semibold mb-4">
              SOLUTIONS BY INDUSTRY
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Find tailored solutions for your industry
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Select your industry to discover how our AI-powered solutions can scale your business operations.
            </p>
          </div>

          {/* Industry Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            {[
              { id: "healthcare", name: "Healthcare", icon: "🏥" },
              { id: "finance", name: "Finance", icon: "💰" },
              { id: "manufacturing", name: "Manufacturing", icon: "🏭" },
              { id: "retail", name: "Retail", icon: "🛒" },
              { id: "technology", name: "Technology", icon: "💻" },
              { id: "education", name: "Education", icon: "🎓" },
              { id: "real-estate", name: "Real Estate", icon: "🏠" },
              { id: "legal", name: "Legal", icon: "⚖️" }
            ].map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(selectedIndustry === industry.id ? null : industry.id)}
                className="p-4 rounded-xl border-2 bg-[#020a1c] backdrop-blur-sm border-orange-500 text-white hover:bg-[#020a1c]/90 hover:border-orange-400 transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-orange-500/20"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-2xl">{industry.icon}</div>
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
                  {selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1).replace('-', ' ')} Solutions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {industrySpecificSolutions[selectedIndustry as keyof typeof industrySpecificSolutions].map((solution, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-4">{solution.icon}</div>
                      <h4 className="text-white font-semibold mb-2 text-sm leading-tight">
                        {solution.name}
                      </h4>
                      <p className="text-white/70 text-xs leading-relaxed">
                        {solution.description}
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
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3" size="lg">
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
            <div className="text-sm uppercase tracking-wide text-primary font-semibold mb-4">
              INTEGRATED BUSINESS PLATFORM
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-[#020a1c] leading-tight">
              A fully integrated suite of <span className="gradient-text">solutions</span>, powered by industry leading AI.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutions.map((solution, index) => (
              <Link key={index} href={solution.href}>
                <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 hover:bg-white hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl card-hover group cursor-pointer h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="mb-4">
                      <div className="w-12 h-1 bg-gradient-to-r from-primary to-orange-600 mb-4 group-hover:w-16 transition-all duration-300"></div>
                      <h3 className="text-xl font-bold text-[#020a1c] mb-3 group-hover:text-primary transition-colors duration-300">
                        {solution.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm flex-grow">
                      {solution.description}
                    </p>
                    <div className="mt-6 text-primary font-medium text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Strive Section */}
      <section className="py-12 sm:py-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Why Choose Strive
            </h2>
            <div className="text-sm uppercase tracking-wide text-primary font-semibold mb-4">
              The Future of Business Starts Here
            </div>
            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Don't just keep up with the competition—surpass them. Our cutting-edge AI solutions deliver measurable results that transform how you do business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LightBulbIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Innovative Tech</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Cutting-edge AI and automation technologies that keep you ahead of industry trends and competitor solutions.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <RocketLaunchIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Scalable Solutions</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Grow without limits. Our architecture scales seamlessly from startup to enterprise, adapting to your business needs.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CpuChipIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Future-Proof Design</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Built to evolve. Our solutions integrate emerging technologies, ensuring your investment remains valuable for years.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/15 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <StarIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Proven Results</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Track record of success. Our clients see 3x faster processing, 60% cost reduction, and 24/7 automated efficiency.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-white/80 mb-6 text-lg">
                Join industry leaders who've already made the switch to intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all" size="lg" onClick={() => window.location.href = "/contact"}>
                  Get Started Today
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg" size="lg" onClick={() => window.location.href = "/about#team"}>
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
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#020a1c] leading-tight">
              Discover what's new with Strive
            </h2>
            <a href="/resources" className="text-primary font-semibold hover:underline">
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
      
      {/* Connect With Us Section */}
      <section className="py-16 md:py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm uppercase tracking-wide text-primary font-semibold mb-4">
                CONNECT WITH US
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                We'd love to <span className="gradient-text">show you around</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                With Strive you can streamline operations, automate processes, and drive growth with intelligent insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02]">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-orange-500/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Enterprise Security
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Comply with industry standards and regulations with enterprise-grade security protocols.
                  </p>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02]">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-orange-500/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Intelligent Automation
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Identify opportunities and automate decision-making with advanced AI algorithms.
                  </p>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02]">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-orange-500/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Operational Excellence
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Improve visibility and automate operations for maximum efficiency and growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
                <p className="text-white/80 mb-6 text-lg">
                  Ready to transform your business operations?
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" size="lg" onClick={() => window.location.href = "/contact"}>
                  Schedule a Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;