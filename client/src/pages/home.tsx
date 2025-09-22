import { useState } from "react";
import { 
  Trophy, Shield, Brain, TrendingUp, Clock, Users, BarChart, Cog, Calculator, ShieldCheck, 
  Truck, Zap, ChevronRight, ChevronLeft, ChevronDown,
  Heart, DollarSign, Factory, ShoppingCart, Monitor, GraduationCap, Home as HomeIcon, Scale,
  Microscope, ClipboardList, CheckCircle, AlertTriangle, LineChart, UserCheck,
  Wrench, Eye, Package, Settings, Target, Coins, Globe,
  BookOpen, Clipboard, Award, PenTool, Building2, FileText, Search, ShieldAlert,
  Download, Play, BrainCircuit, Building
} from "lucide-react";
import { MetaTags } from "@/components/seo/meta-tags";
import { OrganizationStructuredData, FAQStructuredData } from "@/components/seo/structured-data";
import { useSEO } from "@/hooks/use-seo";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
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
import { BarChart3, Lock, ExternalLink } from "lucide-react";

const Home = () => {
  const { seoConfig } = useSEO();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<any | null>(null);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [industrySearch, setIndustrySearch] = useState("");

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

  // Industry icons mapping for dropdown
  const industryIcons = {
    healthcare: <Heart className="h-4 w-4" />,
    finance: <DollarSign className="h-4 w-4" />,
    manufacturing: <Factory className="h-4 w-4" />,
    retail: <ShoppingCart className="h-4 w-4" />,
    technology: <Monitor className="h-4 w-4" />,
    education: <GraduationCap className="h-4 w-4" />,
    "real-estate": <HomeIcon className="h-4 w-4" />,
    legal: <Scale className="h-4 w-4" />
  };

  const industrySpecificSolutions = {
    healthcare: [
      { name: "AI-powered diagnostics and imaging analysis", icon: <Microscope className="w-8 h-8" />, painPoint: "Physicians spend up to 49% of their work time on EHR data entry and desk work instead of interacting with patients", description: "Use AI-powered natural language processing tools to automate clinical note-taking and EHR input, freeing clinicians for more patient care", sourceUrl: "https://www.aha.org/news/headline/2016-09-08-study-physicians-spend-nearly-twice-much-time-ehrdesk-work-patients" },
      { name: "Patient data management and EHR integration", icon: <ClipboardList className="w-8 h-8" />, painPoint: "An estimated 12 million Americans are misdiagnosed each year, leading to patient safety risks and unnecessary treatments", description: "Implement AI-driven diagnostic imaging platforms that analyze scans and medical records to reduce errors and catch overlooked conditions", sourceUrl: "https://www.cbsnews.com/news/12-million-americans-misdiagnosed-each-year-study-says/" },
      { name: "Automated compliance and regulatory reporting", icon: <CheckCircle className="w-8 h-8" />, painPoint: "Healthcare providers face persistent scheduling inefficiencies and high patient no-show rates, disrupting care and reducing revenue", description: "Deploy machine learning models to optimize scheduling and predict no-shows, enabling automated reminders and schedule adjustments", sourceUrl: "https://www.himssconference.com/five-challenges-facing-healthcare-in-2025/" },
      { name: "Predictive analytics for patient outcomes", icon: <TrendingUp className="w-8 h-8" />, painPoint: "The healthcare sector faces a rising number of cyberattacks and HIPAA violations, putting large volumes of patient data at risk", description: "Utilize AI security platforms to continuously monitor for threats, detect suspicious activity, and automate responses to breaches", sourceUrl: "https://www.hipaajournal.com/what-are-the-penalties-for-hipaa-violations-7096/" }
    ],
    finance: [
      { name: "Real-time fraud detection and prevention", icon: <Shield className="w-8 h-8" />, painPoint: "Fraudulent transactions remain difficult to detect quickly, with sophisticated attacks bypassing manual review processes", description: "Implement AI-powered fraud detection that analyzes transaction patterns in real time, blocking threats as they arise", sourceUrl: "https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-outlooks.html" },
      { name: "Automated risk assessment and reporting", icon: <TrendingUp className="w-8 h-8" />, painPoint: "Constantly shifting regulations and compliance requirements overwhelm manual monitoring and reporting teams", description: "Deploy regulatory technology (RegTech) solutions with AI to track changes, monitor for compliance risks, and automate documentation", sourceUrl: "https://www.slalom.com/us/en/insights/financial-services-outlook-2025" }, { name: "Algorithmic trading and portfolio optimization", icon: <LineChart className="w-8 h-8" />, painPoint: "Customers expect digital-first, personalized experiences, but legacy customer service solutions often fall short", description: "Launch AI conversational agents (chatbots and virtual assistants) to deliver speedy, personalized, 24/7 support at scale", sourceUrl: "https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-outlooks.html" }, { name: "Customer behavior analytics and personalization", icon: <UserCheck className="w-8 h-8" />, painPoint: "Manual reconciliation and financial reporting are time-consuming and error-prone, slowing down critical business processes", description: "Use robotic process automation with AI to reconcile transactions and prepare reports automatically, increasing speed and accuracy", sourceUrl: "https://www.morganstanley.com/insights/articles/financial-sector-investing-trends-2025" }
    ],
    manufacturing: [
      { name: "Predictive maintenance and equipment monitoring", icon: <Wrench className="w-8 h-8" />, painPoint: "Global supply chain disruptions lead to inventory shortages and delivery unpredictability", description: "Deploy AI-based demand forecasting and supply chain optimization engines to proactively identify bottlenecks and reroute resources", sourceUrl: "https://www.todaysmedicaldevelopments.com/news/10-challenges-facing-the-manufacturing-industry-in-2025/" }, { name: "Quality control automation with computer vision", icon: <Eye className="w-8 h-8" />, painPoint: "Unplanned equipment downtime drives up costs and disrupts production schedules", description: "Integrate predictive maintenance systems that use AI to analyze equipment data and schedule repairs ahead of failures", sourceUrl: "https://nam.org/wp-content/uploads/securepdfs/2025/01/NAM-2025-Manufacturing-Trends.pdf" }, { name: "Supply chain optimization and demand forecasting", icon: <Package className="w-8 h-8" />, painPoint: "Manufacturing networks are increasingly targeted by ransomware and cyber intrusion", description: "Install AI cybersecurity tools to detect threats, block attacks, and automatically isolate infected machines in real time", sourceUrl: "https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/manufacturing-industry-outlook.html" }, { name: "Production workflow automation", icon: <Settings className="w-8 h-8" />, painPoint: "Vast amounts of production and sensor data go unanalyzed, missing opportunities for improvement", description: "Apply AI analytics platforms that interpret real-time data, recommending optimization actions and reducing waste", sourceUrl: "https://www.todaysmedicaldevelopments.com/news/10-challenges-facing-the-manufacturing-industry-in-2025/" }
    ],
    retail: [
      { name: "Customer analytics and personalized recommendations", icon: <Target className="w-8 h-8" />, painPoint: "Long checkout times cause a significant percentage of customers to abandon purchases, hurting revenue", description: "Implement frictionless checkout and AI-assisted self-service kiosks to shorten lines and enhance in-store experience", sourceUrl: "https://www.happy-or-not.com/en/insights/blog/top-3-biggest-retail-operations-pain-points-2025/" }, { name: "Inventory management and demand prediction", icon: <BarChart className="w-8 h-8" />, painPoint: "Inventory management is often reactive, causing both overstock and out-of-stock situations", description: "Employ AI inventory systems for real-time demand forecasting and automated reordering to maintain optimal stock levels", sourceUrl: "https://voyado.com/resources/blog/retail-challenges/" }, { name: "Dynamic pricing optimization", icon: <Coins className="w-8 h-8" />, painPoint: "Retail marketing is struggling to target the right customers and measure campaign ROI efficiently", description: "Use AI-powered marketing platforms that segment customers and optimize campaigns for better conversions and spend efficiency", sourceUrl: "https://www.csgtalent.com/insights/blog/us-consumer-trends-retail-challenges-2025/" }, { name: "Omnichannel customer experience automation", icon: <Globe className="w-8 h-8" />, painPoint: "Increased payment fraud and data breaches threaten customer trust and store profitability", description: "Install advanced AI fraud detection and payment security layers to monitor and respond to threats in real time", sourceUrl: "https://bankwithchoice.com/top-retail-industry-challenges-for-2025/" }
    ],
    technology: [
      { name: "DevOps automation and CI/CD optimization", icon: <Zap className="w-8 h-8" />, painPoint: "Companies struggle with slow, high-risk AI adoption due to lack of expertise and governance complexity", description: "Use specialized AI frameworks and explainability tools that enable safer, faster, and more compliant deployments", sourceUrl: "https://www.tsia.com/blog/the-state-of-the-technology-industry-2025-keys-trends-and-challenges" }, { name: "AI agent development and deployment", icon: <Brain className="w-8 h-8" />, painPoint: "Legacy technical debt slows innovation and inflates maintenance costs", description: "Leverage AI-powered code analysis tools to identify, refactor, and modernize legacy systems", sourceUrl: "https://gtia.org/blog/top-10-challenges-facing-technology-in-2025" }, { name: "Cloud infrastructure and scaling solutions", icon: <Globe className="w-8 h-8" />, painPoint: "Difficulty matching limited tech talent to the fastest-growing projects and skill sets", description: "Deploy AI workforce management tools for optimal talent allocation, project assignment, and tailored upskilling", sourceUrl: "https://www.tsia.com/blog/the-state-of-the-technology-industry-2025-keys-trends-and-challenges" }, { name: "Data pipeline automation and analytics", icon: <TrendingUp className="w-8 h-8" />, painPoint: "Margins erode as static pricing models cannot respond to changing customer value or competition", description: "Integrate AI-driven pricing engines that dynamically adjust pricing in real time based on market and usage data", sourceUrl: "https://www.tsia.com/blog/the-state-of-the-technology-industry-2025-keys-trends-and-challenges" }
    ],
    education: [
      { name: "Learning analytics and student performance insights", icon: <BookOpen className="w-8 h-8" />, painPoint: "One-size-fits-all curricula lead to disengaged students and unchecked learning gaps", description: "Implement adaptive learning platforms that personalize instruction based on ongoing student performance and needs", sourceUrl: "https://www.elevatek12.com/blog/elevate-in-action/american-education-issues/" }, { name: "Administrative workflow automation", icon: <Clipboard className="w-8 h-8" />, painPoint: "Teachers are overwhelmed by repetitive administrative work, sapping instructional time", description: "Automate grading, lesson planning, and parent communication with AI-driven teacher tools", sourceUrl: "https://www.elevatek12.com/blog/elevate-in-action/american-education-issues/" }, { name: "Personalized learning path recommendations", icon: <Target className="w-8 h-8" />, painPoint: "Many schools cannot fill high-demand teaching roles, especially in STEM and special education", description: "Provide virtual teaching assistants and AI tutors to supplement teaching staff and deliver targeted support", sourceUrl: "https://www.elevatek12.com/blog/elevate-in-action/american-education-issues/" }, { name: "Automated grading and assessment tools", icon: <PenTool className="w-8 h-8" />, painPoint: "School leaders lack real-time visibility into student progress and intervention needs", description: "Use AI learning analytics dashboards that provide actionable insights for proactive interventions", sourceUrl: "https://www.elevatek12.com/blog/elevate-in-action/american-education-issues/" }
    ],
    "real-estate": [
      { name: "Property valuation and market analysis", icon: <Building2 className="w-8 h-8" />, painPoint: "Property and lease data is fragmented across multiple systems, causing delays and valuation errors", description: "Employ centralized AI data platforms to integrate, clean, and analyze property data in real time", sourceUrl: "https://www.morganstanley.com/insights/articles/ai-in-real-estate-2025" }, { name: "Automated property management workflows", icon: <FileText className="w-8 h-8" />, painPoint: "Lease, transaction, and document management is highly manual and error prone", description: "Use AI-driven OCR and workflow automation to digitize documents and automate lease management", sourceUrl: "https://martincommercial.com/navigating-commercial-real-estate-in-2025-challenges-stabilization-and-strategic-shifts/" }, { name: "Lead generation and customer relationship management", icon: <Users className="w-8 h-8" />, painPoint: "Matching tenants to properties is inefficient, leading to high vacancy and churn", description: "Leverage AI-powered matching engines to connect tenants with properties that fit their unique needs", sourceUrl: "https://martincommercial.com/navigating-commercial-real-estate-in-2025-challenges-stabilization-and-strategic-shifts/" }, { name: "Market trend prediction and investment insights", icon: <TrendingUp className="w-8 h-8" />, painPoint: "Smart buildings are increasingly targeted by cyber threats, risking business continuity", description: "Deploy AI smart security systems that detect and respond to physical and digital building threats automatically", sourceUrl: "https://www.morganstanley.com/insights/articles/ai-in-real-estate-2025" }
    ],
    legal: [
      { name: "Document automation and contract analysis", icon: <FileText className="w-8 h-8" />, painPoint: "Reviewing legal contracts for risk and compliance is costly and time-consuming", description: "Use AI to analyze contracts, highlight risks, and suggest clause modifications, cutting review cycles in half", sourceUrl: "https://www.bestlawyers.com/article/2025-legal-outlook-lawyer-survey-results/6477" }, { name: "Case management and workflow optimization", icon: <Scale className="w-8 h-8" />, painPoint: "High volumes of litigation evidence require time-intensive manual review and discovery", description: "Employ AI eDiscovery tools to automatically sort, summarize, and flag relevance in large document sets", sourceUrl: "https://www.bestlawyers.com/article/2025-legal-outlook-lawyer-survey-results/6477" }, { name: "Legal research and precedent discovery", icon: <Search className="w-8 h-8" />, painPoint: "Law firms face growing threats of cyber breaches and data loss, risking sensitive case files", description: "Integrate AI cybersecurity monitoring that scans for threats and automates compliance reporting", sourceUrl: "https://www.lawsociety.org.uk/topics/business-management/partner-content/five-challenges-for-the-legal-sector-in-2025" }, { name: "Compliance monitoring and risk assessment", icon: <ShieldAlert className="w-8 h-8" />, painPoint: "Manual, error-prone management of litigation deadlines and filings increases case risk", description: "Deploy AI-based calendaring and automation to track filings, send alerts, and ensure every deadline is met", sourceUrl: "https://pro.bloomberglaw.com/insights/business-of-law/legal-trends/" }
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
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-industry-label"
            >
              AI SOLUTIONS TAILORED TO YOUR INDUSTRY'S BIGGEST CHALLENGES
            </div>
            <h2 
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              data-testid="text-industry-title"
            >
              No two industries are the same, which is why every solution we deliver is built around your goals
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Select your industry below to see proven strategies and results for companies just like yours.
            </p>
          </div>

          {/* Industry Selector - Mobile Dropdown, Desktop Grid */}
          {/* Mobile Dropdown */}
          <div className="md:hidden mb-12">
            <Popover open={industryDropdownOpen} onOpenChange={setIndustryDropdownOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={industryDropdownOpen}
                  className="w-full max-w-sm mx-auto bg-[#020a1c] border-orange-500 text-white hover:bg-[#020a1c]/90 justify-between"
                >
                  <div className="flex items-center gap-2">
                    {selectedIndustry && industryIcons[selectedIndustry as keyof typeof industryIcons]}
                    <span className="truncate">
                      {selectedIndustry ? 
                        selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1).replace('-', ' ') : 
                        "Select your industry to see solutions"
                      }
                    </span>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[350px] p-0 max-h-[300px]" align="center" side="bottom" sideOffset={5}>
                <Command>
                  <CommandInput 
                    placeholder="Search industries..." 
                    value={industrySearch}
                    onValueChange={setIndustrySearch}
                    className="border-b"
                  />
                  <CommandList className="max-h-[200px] overflow-y-auto">
                    <CommandEmpty>No industry found.</CommandEmpty>
                    <CommandGroup>
                      {[
                        { id: "healthcare", name: "Healthcare" },
                        { id: "finance", name: "Finance" },
                        { id: "manufacturing", name: "Manufacturing" },
                        { id: "retail", name: "Retail" },
                        { id: "technology", name: "Technology" },
                        { id: "education", name: "Education" },
                        { id: "real-estate", name: "Real Estate" },
                        { id: "legal", name: "Legal" }
                      ]
                        .filter(industry => 
                          industry.name.toLowerCase().includes(industrySearch.toLowerCase())
                        )
                        .map((industry) => (
                        <CommandItem
                          key={industry.id}
                          value={industry.id}
                          onSelect={() => {
                            if (selectedIndustry === industry.id) {
                              setSelectedIndustry(null);
                            } else {
                              setSelectedIndustry(industry.id);
                            }
                            setIndustryDropdownOpen(false);
                            setIndustrySearch("");
                          }}
                          className={cn(
                            "flex items-center gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033]",
                            selectedIndustry === industry.id && "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]"
                          )}
                        >
                          {industryIcons[industry.id as keyof typeof industryIcons]}
                          <span>{industry.name}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
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
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {industrySpecificSolutions[selectedIndustry as keyof typeof industrySpecificSolutions].map((solution, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-3 md:p-6 text-center">
                      <div className="text-white mb-4 flex justify-center">{solution.icon}</div>
                      <h4 className="text-white font-semibold mb-2 text-sm leading-tight">
                        {solution.name}
                      </h4>
                      {solution.painPoint && (
                        <div className="mb-2">
                          <p className="text-red-400 text-xs font-semibold">
                            Pain Point: {solution.painPoint}
                          </p>
                          <a 
                            href={solution.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1 mt-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Source
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
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
            {/* Whitepaper Card */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 h-full flex flex-col">
              <div className="relative overflow-hidden flex-shrink-0">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <div className="text-sm font-medium uppercase tracking-wide">
                      Comprehensive Guide
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-500 text-white border-0 text-xs px-2 py-1">
                    Whitepaper
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 text-gray-900 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  AI & Machine Learning Complete Guide
                </h4>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">
                  Comprehensive overview of AI implementation strategies, best practices, and real-world applications for modern businesses.
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      25 pages
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      15 min read
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 mt-auto"
                  onClick={() => window.location.href = "/resources?filter=Whitepapers"}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Case Study Card */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 h-full flex flex-col">
              <div className="relative overflow-hidden flex-shrink-0">
                <div className="h-48 bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <div className="text-sm font-medium uppercase tracking-wide">
                      Success Story
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white border-0 text-xs px-2 py-1">
                    Case Study
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 text-gray-900 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  Enterprise AI Implementation
                </h4>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">
                  How a Fortune 500 company achieved 40% cost reduction and 60% efficiency improvement through strategic AI implementation.
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      Enterprise
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      10 min read
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white border-0 mt-auto"
                  onClick={() => window.location.href = "/resources?filter=Case Studies"}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Quiz Card - Adjusted height to match others */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 h-full flex flex-col">
              <div className="relative overflow-hidden flex-shrink-0">
                <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <BrainCircuit className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <div className="text-sm font-medium uppercase tracking-wide">
                      Test Your Knowledge
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500 text-white border-0 text-xs px-2 py-1">
                    Interactive Quiz
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 text-gray-900 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                  AI Knowledge Assessment
                </h4>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">
                  Test your understanding of AI fundamentals and discover personalized learning recommendations based on your expertise level.
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Multiple topics
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      5-15 min
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0 mt-auto"
                  onClick={() => window.location.href = "/resources?filter=Quizzes"}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Learn More
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
    </>
  );
};

export default Home;
