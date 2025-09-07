import { useState, useEffect } from "react";
import { Bot, BarChart, Blocks, ShieldCheck, Eye, Heart, Brain, ShoppingCart, Laptop, GraduationCap, Factory, Building2, DollarSign, Home as HomeIcon, Scale, Cloud, Cog, Target, Filter, Check, Lightbulb, ChevronDown, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Link } from "wouter";

const Solutions = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSolutionType, setSelectedSolutionType] = useState("");
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [industrySearch, setIndustrySearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  
  const filters = [
    { name: "All", icon: null },
    { name: "Health", icon: <Building2 className="h-4 w-4 mr-2" /> },
    { name: "Solution Type", icon: <Cog className="h-4 w-4 mr-2" /> },
  ];

  const industryOptions = [
    { value: "healthcare", label: "Healthcare", icon: <Heart className="h-4 w-4" /> },
    { value: "finance", label: "Financial Services", icon: <DollarSign className="h-4 w-4" /> },
    { value: "manufacturing", label: "Manufacturing", icon: <Factory className="h-4 w-4" /> },
    { value: "retail", label: "Retail", icon: <ShoppingCart className="h-4 w-4" /> },
    { value: "technology", label: "Technology", icon: <Laptop className="h-4 w-4" /> },
    { value: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { value: "real-estate", label: "Real Estate", icon: <HomeIcon className="h-4 w-4" /> },
    { value: "legal", label: "Legal", icon: <Scale className="h-4 w-4" /> }
  ];

  const productOptions = [
    { value: "ai-automation", label: "AI & Automation", icon: <Bot className="h-4 w-4" /> },
    { value: "computer-vision", label: "Computer Vision", icon: <Eye className="h-4 w-4" /> },
    { value: "data-analytics", label: "Data Analytics", icon: <BarChart className="h-4 w-4" /> },
    { value: "blockchain", label: "Blockchain Solutions", icon: <Blocks className="h-4 w-4" /> },
    { value: "cloud-infrastructure", label: "Cloud Infrastructure", icon: <Cloud className="h-4 w-4" /> },
    { value: "security-compliance", label: "Security & Compliance", icon: <ShieldCheck className="h-4 w-4" /> }
  ];

  const solutions = [
    // By Industry Solutions
    {
      id: 1,
      title: "Healthcare Solutions",
      category: "Health",
      type: "service",
      industry: "Healthcare",
      icon: <Heart className="text-primary text-xl" />,
      shortDescription: "AI-powered healthcare solutions for patient care, diagnostics, and compliance.",
      fullDescription: "Comprehensive healthcare solutions that leverage artificial intelligence to improve patient outcomes, streamline operations, and ensure regulatory compliance. Our healthcare suite includes advanced diagnostic tools, patient management systems, and automated compliance reporting.",
      features: [
        "AI-powered diagnostics and imaging analysis",
        "Patient data management and EHR integration",
        "Automated compliance and regulatory reporting",
        "Predictive analytics for patient outcomes"
      ],
      technologies: ["AI/ML", "Computer Vision", "NLP", "Data Analytics"],
      hasDemo: false,
      metrics: { "Efficiency Increase": "45%", "Cost Reduction": "30%", "Compliance Rate": "99.2%" }
    },
    {
      id: 2,
      title: "Financial Services Solutions",
      category: "Financial",
      type: "service",
      industry: "Finance",
      icon: <DollarSign className="text-primary text-xl" />,
      shortDescription: "Advanced fintech solutions for fraud detection, risk management, and trading.",
      fullDescription: "Revolutionary financial technology solutions that enhance security, optimize trading strategies, and provide deep customer insights. Our fintech platform combines real-time fraud detection with sophisticated risk assessment tools.",
      features: [
        "Real-time fraud detection and prevention",
        "Automated risk assessment and reporting",
        "Algorithmic trading and portfolio optimization",
        "Customer behavior analytics and personalization"
      ],
      technologies: ["Machine Learning", "Real-time Analytics", "Blockchain", "API Integration"],
      hasDemo: false,
      metrics: { "Fraud Detection": "99.7%", "Risk Reduction": "40%", "Processing Speed": "2.3s" }
    },
    {
      id: 3,
      title: "Manufacturing Solutions",
      category: "Manufacturing", 
      type: "service",
      industry: "Manufacturing",
      icon: <Factory className="text-primary text-xl" />,
      shortDescription: "Smart manufacturing solutions with predictive maintenance and quality control.",
      fullDescription: "Intelligent manufacturing solutions that revolutionize production efficiency through predictive maintenance, automated quality control, and supply chain optimization. Transform your manufacturing operations with AI-powered insights.",
      features: [
        "Predictive maintenance and equipment monitoring",
        "Quality control automation with computer vision",
        "Supply chain optimization and demand forecasting",
        "Production workflow automation"
      ],
      technologies: ["IoT", "Computer Vision", "Predictive Analytics", "Automation"],
      hasDemo: false,
      metrics: { "Downtime Reduction": "60%", "Quality Improvement": "85%", "Cost Savings": "25%" }
    },
    {
      id: 4,
      title: "Retail Solutions",
      category: "Retail",
      type: "service", 
      industry: "Retail",
      icon: <ShoppingCart className="text-primary text-xl" />,
      shortDescription: "Omnichannel retail solutions for customer analytics and inventory management.",
      fullDescription: "Comprehensive retail solutions that enhance customer experience through personalized recommendations, optimize inventory management, and implement dynamic pricing strategies for maximum profitability.",
      features: [
        "Customer analytics and personalized recommendations",
        "Inventory management and demand prediction",
        "Dynamic pricing optimization",
        "Omnichannel customer experience automation"
      ],
      technologies: ["Customer Analytics", "AI Recommendations", "Inventory Optimization", "Dynamic Pricing"],
      hasDemo: false,
      metrics: { "Sales Increase": "35%", "Inventory Optimization": "50%", "Customer Satisfaction": "4.8/5" }
    },
    // By Product & Service Solutions
    {
      id: 5,
      title: "ChatBot",
      category: "NLP",
      type: "product",
      icon: <Bot className="text-primary text-xl" />,
      shortDescription: "Intelligent automation solutions powered by advanced AI and machine learning.",
      fullDescription: "Comprehensive AI and automation platform that transforms business processes through intelligent process automation, machine learning models, and predictive analytics. Streamline operations while reducing costs and improving decision-making.",
      features: [
        "Intelligent Process Automation",
        "Machine Learning Models",
        "Predictive Analytics",
        "Natural Language Processing"
      ],
      technologies: ["Strive Tech", "TensorFlow", "Python", "REST APIs"],
      hasDemo: true,
      demoType: "ChatBots",
      metrics: { "Process Efficiency": "70%", "Error Reduction": "95%", "Cost Savings": "40%" }
    },
    {
      id: 6,
      title: "Threat Detection",
      category: "Computer Vision",
      type: "product",
      icon: <Eye className="text-primary text-xl" />,
      shortDescription: "Advanced AI-powered visual recognition and analysis systems.",
      fullDescription: "Cutting-edge computer vision solutions that interpret, analyze, and understand digital images and videos. Perfect for quality control, security monitoring, and automated visual inspection across industries.",
      features: [
        "Image Recognition & Classification",
        "Object Detection & Tracking", 
        "Facial Recognition Systems",
        "Threat Detection & Security Monitoring"
      ],
      technologies: ["OpenCV", "TensorFlow", "PyTorch", "YOLO"],
      hasDemo: true,
      demoType: "Computer Vision Models",
      metrics: { "Accuracy": "97.8%", "Processing Speed": "30fps", "Detection Rate": "99.1%" }
    },
    {
      id: 7,
      title: "Football Score Prediction",
      category: "Predictive Model",
      type: "product",
      icon: <BarChart className="text-primary text-xl" />,
      shortDescription: "Data-driven insights and forecasting for strategic business decisions.",
      fullDescription: "Advanced predictive analytics platform that transforms raw data into actionable business insights. Leverage machine learning algorithms to forecast trends, identify opportunities, and make data-driven strategic decisions.",
      features: [
        "Advanced Statistical Modeling",
        "Machine Learning Predictions",
        "Real-time Data Processing",
        "Interactive Dashboards"
      ],
      technologies: ["Python", "R", "Apache Spark", "Tableau"],
      hasDemo: true,
      demoType: "Predictive Models",
      metrics: { "Prediction Accuracy": "94.2%", "Processing Time": "1.2s", "Data Points": "10M+" }
    },
    {
      id: 8,
      title: "Blockchain Solutions",
      category: "Web3",
      type: "service",
      icon: <Cloud className="text-primary text-xl" />,
      shortDescription: "Scalable cloud solutions for modern business infrastructure needs.",
      fullDescription: "Robust cloud infrastructure solutions that provide scalable, secure, and cost-effective computing resources. Deploy, manage, and scale your applications with confidence using our comprehensive cloud platform.",
      features: [
        "Auto-scaling Infrastructure",
        "Load Balancing & CDN",
        "Database Management",
        "Security & Compliance"
      ],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
      hasDemo: false,
      metrics: { "Uptime": "99.9%", "Scalability": "Auto", "Cost Reduction": "35%" }
    },
    {
      id: 9,
      title: "Security & Compliance",
      category: "Solution Type",
      type: "product",
      icon: <ShieldCheck className="text-primary text-xl" />,
      shortDescription: "Comprehensive security frameworks and automated compliance monitoring.",
      fullDescription: "Enterprise-grade security and compliance solutions that protect your business assets and ensure regulatory adherence. Automated monitoring, threat detection, and compliance reporting keep your organization secure.",
      features: [
        "Regulatory Compliance Automation",
        "Security Policy Management", 
        "Audit Trail & Reporting",
        "Risk Assessment & Mitigation"
      ],
      technologies: ["Security Frameworks", "Compliance Tools", "Monitoring Systems", "Risk Analytics"],
      hasDemo: false,
      metrics: { "Compliance Rate": "99.8%", "Threat Detection": "Real-time", "Risk Reduction": "65%" }
    }
  ];
  
  const filteredSolutions = activeFilter === "All" 
    ? solutions 
    : activeFilter === "Health"
    ? solutions.filter(solution => solution.type === "service")
    : activeFilter === "Solution Type"
    ? solutions.filter(solution => solution.type === "product")
    : solutions.filter(solution => solution.category === activeFilter);

  // Handle deep linking from Home page industry selector
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const industry = urlParams.get('industry');
    
    if (industry) {
      // Find the industry solution by matching the industry ID
      const industrySolution = solutions.find(solution => 
        solution.type === 'industry' && 
        solution.industry?.toLowerCase() === industry.toLowerCase()
      );
      
      if (industrySolution) {
        // Set filter to Health and auto-open the modal
        setActiveFilter("Health");
        setSelectedSolution(industrySolution);
        
        // Clean the URL after opening the modal
        window.history.replaceState(null, '', '/solutions');
      }
    }
  }, []);

  const handleViewDemo = (demoType: string) => {
    // Close the modal first
    setSelectedSolution(null);
    
    // Navigate based on demo type
    switch (demoType) {
      case "ChatBots":
        // Open ChatBot demo - could be embedded or external
        window.open('https://chat.openai.com', '_blank');
        break;
      case "Computer Vision Models":
        // Open Computer Vision demo - could be embedded or external  
        window.open('https://teachablemachine.withgoogle.com/models/eOXUP2LPq/', '_blank');
        break;
      case "Predictive Models":
        // Open Predictive Analytics demo - could be embedded or external
        window.open('https://www.kaggle.com/code/dansbecker/your-first-machine-learning-model', '_blank');
        break;
      default:
        // Fallback to get started page
        window.location.href = '/get-started';
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section with AI-themed animated background */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-primary rounded-full animate-ping opacity-60`}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Lightbulb className="text-primary h-16 w-16 animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              data-testid="text-solutions-hero-title"
            >
              AI-Powered Solutions for <span className="gradient-text">Every</span> Industry
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8"
              data-testid="text-solutions-hero-subtitle"
            >
              Discover comprehensive AI and automation solutions tailored to transform your business operations, drive efficiency, and accelerate growth across all industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('solutions-grid')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-explore-solutions"
              >
                Get Custom Solution
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = '/get-started'}
                data-testid="button-get-custom-solution"
              >
                Explore Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter and Solutions Grid Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#ffffffeb]" id="solutions-grid">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Instruction Text */}
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground">
              Use the filter to find your industry specific solution!
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {/* All Filter */}
            <Button
              variant={activeFilter === "All" ? "default" : "outline"}
              onClick={() => {
                setActiveFilter("All");
                setSelectedIndustry("");
                setSelectedSolutionType("");
              }}
              className={`flex items-center px-6 py-3 transition-all duration-200 ${
                activeFilter === "All"
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "border-primary/20 text-foreground hover:border-primary hover:text-primary"
              }`}
              data-testid="filter-all"
            >
              All
            </Button>

            {/* By Industry Dropdown */}
            <Popover open={industryDropdownOpen} onOpenChange={setIndustryDropdownOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={activeFilter === "Health" ? "default" : "outline"}
                  onClick={() => {
                    // Toggle dropdown open/closed
                    setIndustryDropdownOpen(!industryDropdownOpen);
                  }}
                  className={`flex items-center px-6 py-3 min-w-[200px] transition-all duration-200 ${
                    activeFilter === "Health"
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "border-primary/20 text-foreground hover:border-primary hover:text-primary"
                  }`}
                  data-testid="filter-by-industry"
                >
                  <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="flex-grow text-left">{selectedIndustry || "Industry"}</span>
                  <Badge variant="secondary" className="ml-auto mr-2 text-xs">
                    {solutions.filter(solution => solution.type === "service").length}
                  </Badge>
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" align="start" side="bottom" sideOffset={5} avoidCollisions={false}>
                <Command>
                  <CommandInput 
                    placeholder="Search industries..." 
                    value={industrySearch}
                    onValueChange={setIndustrySearch}
                  />
                  <CommandList>
                    <CommandEmpty>No industries found.</CommandEmpty>
                    <CommandGroup>
                      {industryOptions
                        .filter(option => 
                          option.label.toLowerCase().includes(industrySearch.toLowerCase())
                        )
                        .map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => {
                            setActiveFilter("Health");
                            setSelectedIndustry(option.label);
                            setIndustryDropdownOpen(false);
                            setIndustrySearch("");
                          }}
                          className={`flex items-center gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] ${
                            selectedIndustry === option.label ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : ""
                          }`}
                        >
                          {option.icon}
                          <span>{option.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Solution Type Dropdown */}
            <Popover open={productDropdownOpen} onOpenChange={setProductDropdownOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={activeFilter === "Solution Type" ? "default" : "outline"}
                  onClick={() => {
                    // Toggle dropdown open/closed
                    setProductDropdownOpen(!productDropdownOpen);
                  }}
                  className={`flex items-center px-6 py-3 min-w-[220px] transition-all duration-200 ${
                    activeFilter === "Solution Type"
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "border-primary/20 text-foreground hover:border-primary hover:text-primary"
                  }`}
                  data-testid="filter-by-product-service"
                >
                  <Cog className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="flex-grow text-left">{selectedSolutionType || "Solution Type"}</span>
                  <Badge variant="secondary" className="ml-auto mr-2 text-xs">
                    {solutions.filter(solution => solution.type === "product").length}
                  </Badge>
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" align="start" side="bottom" sideOffset={5} avoidCollisions={false}>
                <Command>
                  <CommandInput 
                    placeholder="Search solutions..." 
                    value={productSearch}
                    onValueChange={setProductSearch}
                  />
                  <CommandList>
                    <CommandEmpty>No products or services found.</CommandEmpty>
                    <CommandGroup>
                      {productOptions
                        .filter(option => 
                          option.label.toLowerCase().includes(productSearch.toLowerCase())
                        )
                        .map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => {
                            setActiveFilter("Solution Type");
                            setSelectedSolutionType(option.label);
                            setProductDropdownOpen(false);
                            setProductSearch("");
                          }}
                          className={`flex items-center gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] ${
                            selectedSolutionType === option.label ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : ""
                          }`}
                        >
                          {option.icon}
                          <span>{option.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSolutions.map((solution) => (
              <Card
                key={solution.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/50 overflow-hidden h-full flex flex-col"
                onClick={() => setSelectedSolution(solution)}
                data-testid={`solution-card-${solution.id}`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Header Section */}
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      {solution.icon}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
                        {solution.title}
                      </h3>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs px-2 py-1">
                          {solution.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description Section */}
                  <div className="flex-grow mb-6">
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                      {solution.shortDescription}
                    </p>
                  </div>
                  
                  {/* Technologies Section */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {solution.technologies.slice(0, 3).map((tech, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs px-2 py-1 cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white hover:border-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to resources page with filter
                            window.location.href = `/resources?tech=${encodeURIComponent(tech)}`;
                          }}
                        >
                          {tech}
                        </Badge>
                      ))}
                      {solution.technologies.length > 3 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs px-2 py-1 cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white hover:border-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSolution(solution);
                          }}
                        >
                          +{solution.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons Section */}
                  <div className="flex items-center justify-between gap-3 mt-auto pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSolution(solution);
                      }}
                    >
                      Learn More
                    </Button>
                    {solution.hasDemo && (
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDemo(solution.demoType || "");
                        }}
                      >
                        View Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredSolutions.length === 0 && (
            <div className="text-center py-16">
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No solutions found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more solutions.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Solution Modal */}
      <Dialog open={!!selectedSolution} onOpenChange={() => setSelectedSolution(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedSolution && (
            <>
              <DialogTitle className="flex items-center gap-4 text-2xl font-bold mb-2">
                {selectedSolution.icon}
                {selectedSolution.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground mb-6">
                {selectedSolution.fullDescription}
              </DialogDescription>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Key Features</h4>
                  <ul className="space-y-3">
                    {selectedSolution.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedSolution.technologies.map((tech: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className="cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white hover:border-primary"
                        onClick={() => {
                          // Close modal and navigate to resources
                          setSelectedSolution(null);
                          window.location.href = `/resources?tech=${encodeURIComponent(tech)}`;
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Performance Metrics</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedSolution.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-semibold text-primary">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
                {selectedSolution.hasDemo ? (
                  <>
                    <Button 
                      size="lg" 
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleViewDemo(selectedSolution.demoType || "")}
                    >
                      View {selectedSolution.demoType} Demo
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-white" 
                      onClick={() => window.location.href = '/get-started'}
                    >
                      Request Custom Demo
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="flex-1 bg-primary hover:bg-primary/90" 
                      onClick={() => window.location.href = '/get-started'}
                    >
                      Request Demo
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-white" 
                      onClick={() => window.location.href = '/contact'}
                    >
                      Contact Sales
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Solutions;