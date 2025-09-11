import { useState, useEffect } from "react";
import { Bot, BarChart, Blocks, ShieldCheck, Eye, Heart, Brain, ShoppingCart, Laptop, GraduationCap, Factory, Building2, DollarSign, Home as HomeIcon, Scale, Cloud, Cog, Target, Filter, Check, Lightbulb, ChevronDown, Search, Gamepad2, Trophy, Cpu, Play, Leaf, Film, Zap, Truck, Hotel } from "lucide-react";
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

  // Handle URL parameters for auto-opening solution modals
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const solutionParam = urlParams.get('solution');
    
    if (solutionParam) {
      // Find the solution by ID or title match
      const targetSolution = solutions.find(solution => 
        solution.title.toLowerCase().includes(solutionParam.toLowerCase()) ||
        solution.industry?.toLowerCase() === solutionParam.toLowerCase()
      );
      
      if (targetSolution) {
        setSelectedSolution(targetSolution);
        // Scroll to the solution card
        setTimeout(() => {
          const solutionElement = document.querySelector(`[data-testid="solution-card-${targetSolution.id}"]`);
          if (solutionElement) {
            solutionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }, []);
  
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
    { value: "legal", label: "Legal", icon: <Scale className="h-4 w-4" /> },
    { value: "logistics", label: "Logistics & Supply Chain", icon: <Factory className="h-4 w-4" /> },
    { value: "hospitality", label: "Hospitality & Tourism", icon: <Building2 className="h-4 w-4" /> },
    { value: "energy", label: "Energy & Utilities", icon: <Cog className="h-4 w-4" /> },
    { value: "government", label: "Government & Public Sector", icon: <Building2 className="h-4 w-4" /> },
    { value: "insurance", label: "Insurance", icon: <ShieldCheck className="h-4 w-4" /> },
    { value: "automotive", label: "Automotive", icon: <Factory className="h-4 w-4" /> },
    { value: "agriculture", label: "Agriculture", icon: <Building2 className="h-4 w-4" /> },
    { value: "media", label: "Media & Entertainment", icon: <Laptop className="h-4 w-4" /> },
    { value: "gaming", label: "Gaming", icon: <Gamepad2 className="h-4 w-4" /> },
    { value: "esports", label: "eSports", icon: <Trophy className="h-4 w-4" /> },
    { value: "nonprofit", label: "Non-profit Organizations", icon: <Heart className="h-4 w-4" /> }
  ];

  const productOptions = [
    { value: "ai-automation", label: "AI & Automation", icon: <Bot className="h-4 w-4" /> },
    { value: "computer-vision", label: "Computer Vision", icon: <Eye className="h-4 w-4" /> },
    { value: "data-analytics", label: "Data Analytics", icon: <BarChart className="h-4 w-4" /> },
    { value: "blockchain", label: "Blockchain Solutions", icon: <Blocks className="h-4 w-4" /> },
    { value: "cloud-infrastructure", label: "Cloud Infrastructure", icon: <Cloud className="h-4 w-4" /> },
    { value: "security-compliance", label: "Security & Compliance", icon: <ShieldCheck className="h-4 w-4" /> },
    { value: "predictive-analytics", label: "Predictive Analytics", icon: <BarChart className="h-4 w-4" /> },
    { value: "nlp", label: "Natural Language Processing", icon: <Bot className="h-4 w-4" /> },
    { value: "iot-integration", label: "IoT Integration", icon: <Cog className="h-4 w-4" /> },
    { value: "process-automation", label: "Process Automation", icon: <Cog className="h-4 w-4" /> },
    { value: "offline-solutions", label: "Offline Solutions", icon: <Cloud className="h-4 w-4 opacity-50" /> }
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
      shortDescription: "Health organizations face rising data, regulatory, and care challenges every day. Imagine freeing up your staff to focus on what matters most: your patients, while our AI manages compliance, data, and operations behind the scenes.",
      fullDescription: "Comprehensive healthcare solutions that leverage artificial intelligence to improve patient outcomes, streamline operations, and ensure regulatory compliance. Our healthcare suite includes advanced diagnostic tools, patient management systems, and automated compliance reporting.",
      features: [
        "AI-powered diagnostics and imaging analysis",
        "Patient data management and EHR integration",
        "Automated compliance and regulatory reporting",
        "Predictive analytics for patient outcomes"
      ],
      technologies: ["AI & Automation", "Computer Vision", "Data Analytics", "Security & Compliance", "Predictive Analytics", "NLP"],
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
      shortDescription: "Financial leaders today face relentless threats ranging from fraud to shifting regulations. We bring advanced AI tools to safeguard assets, streamline risk, and empower smarter, faster trading. Don't let fraud and bottlenecks stand in your way.",
      fullDescription: "Revolutionary financial technology solutions that enhance security, optimize trading strategies, and provide deep customer insights. Our fintech platform combines real-time fraud detection with sophisticated risk assessment tools.",
      features: [
        "Real-time fraud detection and prevention",
        "Automated risk assessment and reporting",
        "Algorithmic trading and portfolio optimization",
        "Customer behavior analytics and personalization"
      ],
      technologies: ["AI & Automation", "Data Analytics", "Blockchain Solutions", "Security & Compliance", "Predictive Analytics", "Process Automation"],
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
      shortDescription: "Downtime and quality hiccups can drain your margins and stall growth. Our predictive AI anticipates equipment failures before they happen, while automated quality control ensures peak performance across your line.",
      fullDescription: "Intelligent manufacturing solutions that revolutionize production efficiency through predictive maintenance, automated quality control, and supply chain optimization. Transform your manufacturing operations with AI-powered insights.",
      features: [
        "Predictive maintenance and equipment monitoring",
        "Quality control automation with computer vision",
        "Supply chain optimization and demand forecasting",
        "Production workflow automation"
      ],
      technologies: ["AI & Automation", "Computer Vision", "Data Analytics", "IoT Integration", "Predictive Analytics", "Process Automation"],
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
      shortDescription: "Retail success now depends on knowing your customers and your shelves instantly. Our AI sharpens inventory precision, predicts buying trends, and creates experiences that keep shoppers coming back.",
      fullDescription: "Comprehensive retail solutions that enhance customer experience through personalized recommendations, optimize inventory management, and implement dynamic pricing strategies for maximum profitability.",
      features: [
        "Customer analytics and personalized recommendations",
        "Inventory management and demand prediction",
        "Dynamic pricing optimization",
        "Omnichannel customer experience automation"
      ],
      technologies: ["AI & Automation", "Data Analytics", "Computer Vision", "NLP", "Process Automation", "Predictive Analytics"],
      hasDemo: false,
      metrics: { "Sales Increase": "35%", "Inventory Optimization": "50%", "Customer Satisfaction": "4.8/5" }
    },
    {
      id: 21,
      title: "Technology Solutions",
      category: "Technology",
      type: "service",
      industry: "Technology",
      icon: <Cpu className="text-primary text-xl" />,
      shortDescription: "Tech companies need to move fast and ship flawlessly. Our AI automates CI/CD pipelines, optimizes cloud costs, develops intelligent agents, and detects threats in real-time, giving you the edge to innovate faster than the competition.",
      fullDescription: "Advanced AI solutions designed specifically for technology companies to accelerate development, optimize infrastructure, and enhance security. From DevOps automation to AI agent development, transform your tech operations with cutting-edge intelligence.",
      features: [
        "CI/CD and DevOps automation",
        "Cloud cost optimization and management",
        "AI agent development and deployment",
        "Real-time security and threat detection"
      ],
      technologies: ["AI & Automation", "Cloud Infrastructure", "Security & Compliance", "Data Analytics", "Process Automation"],
      hasDemo: false,
      metrics: { "Deployment Speed": "66% faster", "Cloud Savings": "30%", "Security Response": "95% faster" }
    },
    {
      id: 22,
      title: "Education Solutions",
      category: "Education",
      type: "service",
      industry: "Education",
      icon: <GraduationCap className="text-primary text-xl" />,
      shortDescription: "Transform education with AI that adapts to every learner. Our solutions automate administrative tasks, personalize learning paths, identify at-risk students early, and provide instant grading, freeing educators to focus on what matters: teaching.",
      fullDescription: "Comprehensive educational AI solutions that enhance learning outcomes, streamline administrative processes, and provide personalized education at scale. Transform your institution with intelligent automation and adaptive learning technology.",
      features: [
        "Administrative task automation",
        "Personalized learning paths and recommendations",
        "Student performance analytics and early intervention",
        "Automated grading and instant feedback systems"
      ],
      technologies: ["AI & Automation", "NLP", "Data Analytics", "Predictive Analytics", "Process Automation"],
      hasDemo: false,
      metrics: { "Admin Time": "60% reduction", "Student Outcomes": "70% improvement", "At-risk Detection": "85% earlier" }
    },
    {
      id: 23,
      title: "Real Estate Solutions",
      category: "Real Estate",
      type: "service",
      industry: "Real Estate",
      icon: <HomeIcon className="text-primary text-xl" />,
      shortDescription: "Win in real estate with AI that sees opportunities first. Our solutions automate property management, predict market trends, provide instant valuations, and nurture leads automatically, helping you close deals faster and maximize returns.",
      fullDescription: "Innovative real estate AI solutions that transform property management, market analysis, and customer engagement. From automated valuations to predictive market analytics, gain the competitive edge in real estate.",
      features: [
        "Property management automation",
        "AI-powered market trend prediction",
        "Instant property valuation with 98% accuracy",
        "Automated lead nurturing and conversion"
      ],
      technologies: ["AI & Automation", "Predictive Analytics", "Data Analytics", "Computer Vision", "Process Automation"],
      hasDemo: false,
      metrics: { "Valuation Accuracy": "98%", "Lead Conversion": "3x", "Time to Close": "60% faster" }
    },
    {
      id: 24,
      title: "Legal Solutions",
      category: "Legal",
      type: "service",
      industry: "Legal",
      icon: <Scale className="text-primary text-xl" />,
      shortDescription: "Practice law smarter, not harder. Our AI analyzes contracts in minutes, researches case law in seconds, manages cases flawlessly, and prevents compliance violations, transforming hours of work into moments of insight.",
      fullDescription: "Revolutionary legal AI solutions that automate document analysis, accelerate research, and ensure compliance. Transform your legal practice with intelligent automation that reduces risk and increases efficiency.",
      features: [
        "Contract analysis and automation",
        "AI-powered legal research in seconds",
        "Case management system with deadline tracking",
        "Compliance risk prevention and monitoring"
      ],
      technologies: ["AI & Automation", "NLP", "Data Analytics", "Security & Compliance", "Process Automation"],
      hasDemo: false,
      metrics: { "Contract Review": "95% faster", "Research Time": "99% reduction", "Compliance Rate": "100%" }
    },
    {
      id: 25,
      title: "Government & Public Sector Solutions",
      category: "Government",
      type: "service",
      industry: "Government",
      icon: <Building2 className="text-primary text-xl" />,
      shortDescription: "Serve citizens better with AI that works as hard as you do. Our solutions automate citizen services, detect fraud instantly, analyze policy impacts, and ensure security while delivering efficient, transparent government that builds trust.",
      fullDescription: "Comprehensive government AI solutions that enhance citizen services, improve operational efficiency, and ensure security. Transform public sector operations with intelligent automation and data-driven decision making.",
      features: [
        "Citizen service automation and chatbots",
        "Fraud detection and prevention systems",
        "Policy impact analysis and modeling",
        "Security monitoring and threat detection"
      ],
      technologies: ["AI & Automation", "Security & Compliance", "Data Analytics", "NLP", "Predictive Analytics"],
      hasDemo: false,
      metrics: { "Service Delivery": "60% faster", "Fraud Prevention": "95%", "Citizen Satisfaction": "85%↑" }
    },
    // By Product & Service Solutions
    {
      id: 5,
      title: "ChatBot",
      category: "NLP",
      type: "product",
      icon: <Bot className="text-primary text-xl" />,
      shortDescription: "Every hour spent on manual tasks is lost opportunity. Our AI chatbots resolve questions instantly, automate operations, and support your customers around the clock, freeing your team for higher-impact work.",
      fullDescription: "Comprehensive AI and automation platform that transforms business processes through intelligent process automation, machine learning models, and predictive analytics. Streamline operations while reducing costs and improving decision-making.",
      features: [
        "Intelligent Process Automation",
        "Machine Learning Models",
        "Predictive Analytics",
        "Natural Language Processing"
      ],
      technologies: ["Healthcare", "Finance", "Manufacturing", "Retail", "Technology", "Education", "Insurance"],
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
      shortDescription: "Defects and threats can slip by unnoticed until they cost you. With 99% accuracy, our computer vision monitors your environment, detects threats, and keeps quality at its highest, all in real time.",
      fullDescription: "Cutting-edge computer vision solutions that interpret, analyze, and understand digital images and videos. Perfect for quality control, security monitoring, and automated visual inspection across industries.",
      features: [
        "Image Recognition & Classification",
        "Object Detection & Tracking", 
        "Facial Recognition Systems",
        "Threat Detection & Security Monitoring"
      ],
      technologies: ["Healthcare", "Manufacturing", "Retail", "Automotive", "Logistics", "Government"],
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
      shortDescription: "Forecasting the future shouldn't be guesswork. Our AI models analyze mountains of data to predict trends, customer behavior, and opportunities so you make moves backed by certainty, not hunches.",
      fullDescription: "Advanced predictive analytics platform that transforms raw data into actionable business insights. Leverage machine learning algorithms to forecast trends, identify opportunities, and make data-driven strategic decisions.",
      features: [
        "Advanced Statistical Modeling",
        "Machine Learning Predictions",
        "Real-time Data Processing",
        "Interactive Dashboards"
      ],
      technologies: ["Finance", "Retail", "Manufacturing", "Healthcare", "Energy", "Agriculture"],
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
      shortDescription: "In a world where trust and transparency are paramount, blockchain is your foundation. We build secure, transparent networks with immutable records and smart contracts that empower your business with trust and clarity in every transaction.",
      fullDescription: "Robust cloud infrastructure solutions that provide scalable, secure, and cost-effective computing resources. Deploy, manage, and scale your applications with confidence using our comprehensive cloud platform.",
      features: [
        "Auto-scaling Infrastructure",
        "Load Balancing & CDN",
        "Database Management",
        "Security & Compliance"
      ],
      technologies: ["Finance", "Legal", "Real Estate", "Government", "Media", "Energy"],
      hasDemo: false,
      metrics: { "Uptime": "99.9%", "Scalability": "Auto", "Cost Reduction": "35%" }
    },
    {
      id: 9,
      title: "Security & Compliance",
      category: "Solution Type",
      type: "product",
      icon: <ShieldCheck className="text-primary text-xl" />,
      shortDescription: "Regulations and threats evolve fast; noncompliance or a single breach can devastate your brand. Our AI-driven systems watch over your operations 24/7, catching risks instantly and automating compliance. You stay one step ahead, every day.",
      fullDescription: "Enterprise-grade security and compliance solutions that protect your business assets and ensure regulatory adherence. Automated monitoring, threat detection, and compliance reporting keep your organization secure.",
      features: [
        "Regulatory Compliance Automation",
        "Security Policy Management", 
        "Audit Trail & Reporting",
        "Risk Assessment & Mitigation"
      ],
      technologies: ["Healthcare", "Finance", "Manufacturing", "Retail", "Technology", "Education", "Insurance"],
      hasDemo: false,
      metrics: { "Compliance Rate": "99.8%", "Threat Detection": "Real-time", "Risk Reduction": "65%" }
    },
    // Gaming Industry Solutions
    {
      id: 10,
      title: "Gaming Solutions",
      category: "Gaming",
      type: "service",
      industry: "Gaming",
      icon: <Gamepad2 className="text-primary text-xl" />,
      shortDescription: "The gaming industry demands flawless performance, fair play, and deep player engagement. Our AI solutions detect cheaters instantly, optimize matchmaking, predict player behavior, and automate testing, letting you focus on creating unforgettable gaming experiences.",
      fullDescription: "Comprehensive gaming industry solutions leveraging AI to enhance player experiences, ensure competitive integrity, and optimize game development processes. From anti-cheat systems to intelligent NPCs and predictive analytics, transform your games with cutting-edge AI technology.",
      features: [
        "Real-time anti-cheat detection and prevention",
        "AI-powered NPCs and dynamic game content",
        "Player behavior prediction and retention analytics",
        "Automated game testing and quality assurance"
      ],
      technologies: ["AI & Automation", "Computer Vision", "Data Analytics", "Predictive Analytics", "Process Automation", "NLP"],
      hasDemo: false,
      metrics: { "Cheat Detection": "99.5%", "Player Retention": "45%↑", "Testing Efficiency": "3x" }
    },
    {
      id: 11,
      title: "eSports Solutions",
      category: "eSports",
      type: "service",
      industry: "eSports",
      icon: <Trophy className="text-primary text-xl" />,
      shortDescription: "eSports thrives on competitive integrity and viewer engagement. Our AI monitors for match-fixing, optimizes tournament brackets, analyzes player performance in real-time, and creates personalized viewer experiences that keep audiences coming back.",
      fullDescription: "Revolutionary eSports solutions that ensure competitive integrity, enhance viewer engagement, and provide deep performance analytics. Our platform combines real-time monitoring with sophisticated analytics to elevate the competitive gaming experience for players and viewers alike.",
      features: [
        "Competitive integrity monitoring and match-fixing detection",
        "Tournament bracket optimization and management",
        "Real-time performance analytics and coaching insights",
        "AI-powered viewer engagement and personalization"
      ],
      technologies: ["AI & Automation", "Data Analytics", "Computer Vision", "Predictive Analytics", "NLP", "Process Automation"],
      hasDemo: false,
      metrics: { "Integrity Monitoring": "24/7", "Viewer Engagement": "60%↑", "Analytics Accuracy": "96.8%" }
    },
    // Offline/Local Solutions
    {
      id: 12,
      title: "Local AI Deployment",
      category: "Offline Solutions",
      type: "product",
      icon: <Cloud className="text-primary text-xl opacity-50" />,
      shortDescription: "If you have the hardware, we'll build you the software. Deploy powerful AI models directly on your infrastructure with no internet required. Perfect for sensitive data, regulated industries, or locations with limited connectivity.",
      fullDescription: "Enterprise-grade offline AI solutions that run entirely on your local infrastructure. Maintain complete data sovereignty while leveraging cutting-edge AI capabilities. Our offline solutions are optimized for performance on your hardware, ensuring fast processing without external dependencies.",
      features: [
        "On-premise AI model deployment and optimization",
        "Local data processing with zero external dependencies",
        "Hardware-optimized performance tuning",
        "Air-gapped security for sensitive operations"
      ],
      technologies: ["Healthcare", "Finance", "Government", "Manufacturing", "Legal", "Defense"],
      hasDemo: false,
      metrics: { "Data Security": "100%", "Latency": "<10ms", "Uptime": "99.99%" }
    },
    {
      id: 13,
      title: "Edge Computing AI",
      category: "Offline Solutions",
      type: "product",
      icon: <Cpu className="text-primary text-xl" />,
      shortDescription: "Process data where it's generated: at the edge. Our edge AI solutions bring intelligence to IoT devices, industrial equipment, and remote locations, delivering real-time insights without cloud dependency.",
      fullDescription: "Advanced edge computing solutions that bring AI processing directly to your devices and equipment. Reduce latency, save bandwidth, and maintain operations even without internet connectivity. Perfect for IoT deployments, industrial automation, and remote operations.",
      features: [
        "Real-time edge processing and decision-making",
        "Distributed AI across IoT devices",
        "Bandwidth optimization and cost reduction",
        "Resilient operations in disconnected environments"
      ],
      technologies: ["Manufacturing", "Energy", "Logistics", "Agriculture", "Automotive", "Retail"],
      hasDemo: false,
      metrics: { "Response Time": "<5ms", "Bandwidth Savings": "80%", "Device Support": "1000+" }
    },
    {
      id: 14,
      title: "Private Cloud AI",
      category: "Offline Solutions",
      type: "product",
      icon: <ShieldCheck className="text-primary text-xl" />,
      shortDescription: "Complete AI infrastructure within your private cloud. Get all the benefits of cloud AI while maintaining total control over your data and compliance requirements. Your hardware, your rules, our expertise.",
      fullDescription: "Comprehensive private cloud AI platform that delivers enterprise-scale artificial intelligence capabilities within your controlled environment. Maintain regulatory compliance and data sovereignty while leveraging powerful AI tools for your organization.",
      features: [
        "Private cloud AI platform deployment",
        "Custom model training on local infrastructure",
        "Compliance-ready architecture for regulated industries",
        "Hybrid cloud options for flexible deployment"
      ],
      technologies: ["Finance", "Healthcare", "Government", "Legal", "Insurance", "Education"],
      hasDemo: false,
      metrics: { "Compliance": "100%", "Performance": "Cloud-equivalent", "Data Control": "Complete" }
    },
    // Additional Industry Solutions
    {
      id: 15,
      title: "Non-profit Solutions",
      category: "Non-profit",
      type: "service",
      industry: "Non-profit",
      icon: <Heart className="text-primary text-xl" />,
      shortDescription: "Every dollar and hour matters in non-profit work. Our AI maximizes your impact by automating donor engagement, grant writing, and impact reporting, freeing your team to focus on your mission, not paperwork.",
      fullDescription: "Specialized AI solutions designed for non-profit organizations to maximize impact while minimizing operational overhead. From automated donor engagement to AI-powered grant writing and impact measurement, transform how your organization creates positive change.",
      features: [
        "Donor engagement automation and personalization",
        "AI-powered grant writing and application assistance",
        "Impact measurement and reporting analytics",
        "Automated compliance and regulatory reporting"
      ],
      technologies: ["AI & Automation", "Data Analytics", "NLP", "Process Automation", "Predictive Analytics"],
      hasDemo: false,
      metrics: { "Donation Increase": "50%", "Grant Success": "75%↑", "Admin Time": "80%↓" }
    },
    {
      id: 16,
      title: "Agriculture Solutions",
      category: "Agriculture",
      type: "service",
      industry: "Agriculture",
      icon: <Leaf className="text-primary text-xl" />,
      shortDescription: "Feed the world more efficiently with AI. Our precision farming solutions monitor crop health, optimize irrigation, predict yields, and track food safety, helping you grow more with less while ensuring complete traceability.",
      fullDescription: "Revolutionary agricultural AI solutions that transform farming through precision agriculture, predictive analytics, and automated monitoring. Increase yields, reduce waste, and ensure food safety with intelligent farming technology.",
      features: [
        "Precision farming automation and optimization",
        "Crop health monitoring with computer vision",
        "AI-powered yield optimization and prediction",
        "Food safety tracking and supply chain traceability"
      ],
      technologies: ["AI & Automation", "Computer Vision", "IoT Integration", "Data Analytics", "Predictive Analytics"],
      hasDemo: false,
      metrics: { "Yield Increase": "30%", "Water Savings": "40%", "Issue Detection": "50% faster" }
    },
    {
      id: 17,
      title: "Media & Entertainment Solutions",
      category: "Media",
      type: "service",
      industry: "Media",
      icon: <Film className="text-primary text-xl" />,
      shortDescription: "Content is king, but distribution and engagement rule the kingdom. Our AI accelerates content delivery, personalizes viewer experiences, protects digital rights, and predicts what audiences want next, keeping them engaged and coming back.",
      fullDescription: "Cutting-edge AI solutions for media and entertainment companies to optimize content distribution, maximize audience engagement, and protect intellectual property. Transform how you create, distribute, and monetize content in the digital age.",
      features: [
        "AI-powered content distribution and optimization",
        "Audience engagement analytics and personalization",
        "Automated digital rights management",
        "Content recommendation and discovery engines"
      ],
      technologies: ["AI & Automation", "Data Analytics", "NLP", "Computer Vision", "Predictive Analytics", "Process Automation"],
      hasDemo: false,
      metrics: { "Distribution Speed": "70%↑", "Engagement": "60%↑", "Rights Protection": "99.5%" }
    },
    {
      id: 18,
      title: "Energy & Utilities Solutions",
      category: "Energy",
      type: "service",
      industry: "Energy",
      icon: <Zap className="text-primary text-xl" />,
      shortDescription: "Power the future intelligently. Our AI optimizes grid operations, predicts equipment failures before they happen, reduces energy waste, and automates regulatory compliance, delivering reliable, efficient energy while cutting costs.",
      fullDescription: "Advanced AI solutions for energy and utility companies to optimize grid operations, predict maintenance needs, and improve energy efficiency. Transform your infrastructure with intelligent automation and predictive analytics.",
      features: [
        "Smart grid automation and optimization",
        "Predictive maintenance for critical infrastructure",
        "Energy consumption analytics and waste reduction",
        "Automated regulatory compliance and reporting"
      ],
      technologies: ["AI & Automation", "IoT Integration", "Predictive Analytics", "Data Analytics", "Process Automation"],
      hasDemo: false,
      metrics: { "Efficiency Gain": "50%", "Outage Prevention": "85%", "Waste Reduction": "40%" }
    },
    {
      id: 19,
      title: "Logistics & Transportation Solutions",
      category: "Logistics",
      type: "service",
      industry: "Logistics",
      icon: <Truck className="text-primary text-xl" />,
      shortDescription: "Every mile and minute counts in logistics. Our AI optimizes routes in real-time, predicts demand patterns, provides end-to-end visibility, and maximizes fleet efficiency to deliver faster, cheaper, and more reliably than ever.",
      fullDescription: "Comprehensive AI solutions for logistics and transportation companies to optimize operations, reduce costs, and improve delivery performance. From route optimization to predictive demand planning, transform your supply chain with intelligent automation.",
      features: [
        "AI-powered route optimization and planning",
        "Fleet performance analytics and monitoring",
        "Predictive demand planning and capacity optimization",
        "End-to-end supply chain visibility and tracking"
      ],
      technologies: ["AI & Automation", "Data Analytics", "IoT Integration", "Predictive Analytics", "Process Automation"],
      hasDemo: false,
      metrics: { "Fuel Savings": "45%", "Delivery Time": "30%↓", "Capacity Utilization": "60%↑" }
    },
    {
      id: 20,
      title: "Hospitality & Tourism Solutions",
      category: "Hospitality",
      type: "service",
      industry: "Hospitality",
      icon: <Hotel className="text-primary text-xl" />,
      shortDescription: "Create unforgettable guest experiences with AI. From smart booking to personalized service, dynamic pricing to staff optimization. Our solutions help you delight guests while maximizing revenue and operational efficiency.",
      fullDescription: "Innovative AI solutions for hospitality and tourism businesses to enhance guest experiences, optimize operations, and maximize revenue. Transform every touchpoint of the guest journey with intelligent automation and personalization.",
      features: [
        "Smart booking and automated check-in systems",
        "Guest experience analytics and personalization",
        "Dynamic revenue management and pricing optimization",
        "Operations and staff scheduling optimization"
      ],
      technologies: ["AI & Automation", "Data Analytics", "NLP", "Predictive Analytics", "Process Automation"],
      hasDemo: false,
      metrics: { "Check-in Speed": "75%↑", "Revenue": "35%↑", "Guest Satisfaction": "4.7/5" }
    }
  ];
  
  const filteredSolutions = activeFilter === "All" 
    ? solutions 
    : activeFilter === "Health"
    ? selectedIndustry === "All Industries" 
      ? solutions.filter(solution => solution.type === "service")
      : solutions.filter(solution => solution.industry === selectedIndustry.replace("Financial Services", "Finance"))
    : activeFilter === "Solution Type"
    ? selectedSolutionType === "All Solutions"
      ? solutions.filter(solution => solution.type === "product")
      : solutions.filter(solution => solution.title.includes(selectedSolutionType.split(" ")[0]) || solution.category === "Solution Type")
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
        window.history.replaceState({}, document.title, '/solutions');
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
        window.location.href = '/request';
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
              Unlock the Power of AI to <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Transform Your Business</span> for Tomorrow
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8"
              data-testid="text-solutions-hero-subtitle"
            >
              We help industry leaders conquer operational challenges, maximize efficiency, and drive growth with AI solutions designed just for your field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                onClick={() => window.location.href = '/request'}
                data-testid="button-get-custom-solution"
              >
                Get Custom Solution
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('solutions-grid')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-explore-solutions"
              >
                Explore Industry Solutions
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
              Easily Find Your Custom AI Solution: Select your industry to see proven strategies and results for companies just like yours.
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
                    {industryOptions.length}
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
                      <CommandItem
                        value="all-industries"
                        onSelect={() => {
                          if (selectedIndustry === "All Industries") {
                            // Deselect if already selected
                            setSelectedIndustry("");
                            setActiveFilter("All");
                          } else {
                            setActiveFilter("Health");
                            setSelectedIndustry("All Industries");
                          }
                          setIndustryDropdownOpen(false);
                          setIndustrySearch("");
                        }}
                        className={`flex items-center gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] ${
                          selectedIndustry === "All Industries" ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : ""
                        }`}
                      >
                        <Building2 className="h-4 w-4" />
                        <span>All Industries</span>
                      </CommandItem>
                      {industryOptions
                        .filter(option => 
                          option.label.toLowerCase().includes(industrySearch.toLowerCase())
                        )
                        .map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => {
                            if (selectedIndustry === option.label) {
                              // Deselect if already selected
                              setSelectedIndustry("");
                              setActiveFilter("All");
                            } else {
                              setActiveFilter("Health");
                              setSelectedIndustry(option.label);
                            }
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
                    {productOptions.length}
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
                      <CommandItem
                        value="all-solutions"
                        onSelect={() => {
                          if (selectedSolutionType === "All Solutions") {
                            // Deselect if already selected
                            setSelectedSolutionType("");
                            setActiveFilter("All");
                          } else {
                            setActiveFilter("Solution Type");
                            setSelectedSolutionType("All Solutions");
                          }
                          setProductDropdownOpen(false);
                          setProductSearch("");
                        }}
                        className={`flex items-center gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] ${
                          selectedSolutionType === "All Solutions" ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : ""
                        }`}
                      >
                        <Cog className="h-4 w-4" />
                        <span>All Solutions</span>
                      </CommandItem>
                      {productOptions
                        .filter(option => 
                          option.label.toLowerCase().includes(productSearch.toLowerCase())
                        )
                        .map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => {
                            if (selectedSolutionType === option.label) {
                              // Deselect if already selected
                              setSelectedSolutionType("");
                              setActiveFilter("All");
                            } else {
                              setActiveFilter("Solution Type");
                              setSelectedSolutionType(option.label);
                            }
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
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 h-full flex flex-col"
                onClick={() => setSelectedSolution(solution)}
                data-testid={`solution-card-${solution.id}`}
              >
                <CardContent className="p-6 flex flex-col h-full relative">
                  {/* Decorative gradient overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
                  
                  {/* View Demo Button - Positioned in upper right */}
                  {solution.hasDemo && (
                    <Button 
                      size="sm"
                      className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 h-7 shadow-md transition-all duration-200 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDemo(solution.demoType || "");
                      }}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Demo
                    </Button>
                  )}
                  
                  {/* Header Section */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                      {solution.icon}
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wide text-[#020a1c]">
                      {solution.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#ff7033] mb-3 group-hover:text-primary transition-colors duration-300">
                    {solution.title}
                  </h3>
                  
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
                          variant="secondary" 
                          className="text-xs cursor-pointer hover:bg-[#ff7033] hover:text-white transition-colors"
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
                          variant="secondary" 
                          className="text-xs cursor-pointer hover:bg-[#ff7033] hover:text-white transition-colors"
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
                  
                  {/* Action Button Section */}
                  <div className="mt-auto pt-2">
                    <Button 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSolution(solution);
                      }}
                    >
                      View Details
                      <Eye className="ml-2 h-4 w-4" />
                    </Button>
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
                  <h4 className="text-lg font-semibold mb-4 text-foreground">
                    {selectedSolution.type === 'product' ? 'Applicable Industries' : 'Technologies'}
                  </h4>
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
                      onClick={() => window.location.href = '/request'}
                    >
                      Request Custom Demo
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="flex-1 bg-primary hover:bg-primary/90" 
                      onClick={() => window.location.href = '/request'}
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