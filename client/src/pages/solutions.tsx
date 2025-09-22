import { useState, useEffect } from "react";
import { Bot, BarChart, Blocks, ShieldCheck, Eye, Heart, Brain, ShoppingCart, Laptop, GraduationCap, Factory, Building2, DollarSign, Home as HomeIcon, Scale, Cloud, Cog, Target, Filter, Check, Lightbulb, ChevronDown, Search, Gamepad2, Trophy, Cpu, Play, Leaf, Film, Zap, Truck, Hotel } from "lucide-react";
import { MetaTags } from "@/components/seo/meta-tags";
import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Link } from "wouter";

const Solutions = () => {
  const { seoConfig } = useSEO();
  // Unified filter state management
  const [selectedFilter, setSelectedFilter] = useState<{type: 'all' | 'industry' | 'solution', value: string}>({type: 'all', value: 'All'});
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [unifiedDropdownOpen, setUnifiedDropdownOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");

  // Handle URL parameters for auto-opening solution modals
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const solutionParam = urlParams.get('solution');
    
    if (solutionParam) {
      // Find the solution by ID or title match
      const targetSolution = solutions.find(solution => 
        solution.title.toLowerCase().includes(solutionParam.toLowerCase())
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
  
  // Calculate solution counts for each industry
  const getIndustrySolutionCount = (industryValue: string) => {
    if (industryValue === 'all-industries') {
      return industryOptions.length;
    }

    // Map industry option values to actual solution technology names
    const industryMapping: { [key: string]: string[] } = {
      "healthcare": ["Healthcare"],
      "finance": ["Financial Services", "Finance", "Banking"],
      "manufacturing": ["Manufacturing", "Smart Manufacturing"],
      "retail": ["Retail", "E-commerce"],
      "technology": ["Technology", "Technology Companies", "All Software Development", "Enterprise Cybersecurity", "Executive Support", "Sales", "Customer Service", "Smart Cities", "All Knowledge-Intensive Industries"],
      "education": ["Education"],
      "real-estate": ["Real Estate", "Smart Buildings"],
      "legal": ["Legal", "Legal Services"],
      "logistics": ["Logistics", "Supply Chain", "Logistics & Supply Chain"],
      "hospitality": ["Hospitality", "Hospitality & Tourism", "Smart Home"],
      "energy": ["Energy", "Energy & Utilities"],
      "government": ["Government", "Government & Public Sector", "Security Operations Centers", "Incident Response Teams"],
      "insurance": ["Insurance"],
      "automotive": ["Automotive", "Autonomous Vehicles"],
      "agriculture": ["Agriculture"],
      "media": ["Media", "Media & Entertainment", "Content and Media", "Content Creation", "All Content-Driven Industries", "Marketing"],
      "gaming": ["Gaming"],
      "esports": ["eSports"],
      "nonprofit": ["Non-profit", "Non-profit Organizations"],
      "telecommunications": ["Telecommunications"],
      "transportation": ["Transportation"]
    };

    const targetIndustries = industryMapping[industryValue] || [];
    return solutions.filter(solution =>
      solution.technologies?.some(tech => 
        targetIndustries.some(targetIndustry =>
          tech.toLowerCase().includes(targetIndustry.toLowerCase()) ||
          targetIndustry.toLowerCase().includes(tech.toLowerCase())
        )
      )
    ).length;
  };

  const getSolutionTypeSolutionCount = (solutionValue: string) => {
    if (solutionValue === 'all-solutions') {
      // Return count of unique solution categories instead of total solutions
      const uniqueCategories = new Set(solutions.map(solution => solution.category));
      return uniqueCategories.size;
    }
    
    // Map solution values to category names
    const solutionTypeMapping: { [key: string]: string } = {
      "ai-security": "AI Security",
      "computer-vision": "Computer Vision",
      "conversational-ai": "Conversational AI",
      "generative-ai": "Generative AI",
      "local-ai-deployment": "Local AI Deployment",
      "machine-learning-analytics": "Machine Learning & Analytics",
      "natural-language-processing": "Natural Language Processing",
      "non-ai-solutions": "Non-AI Solutions",
      "process-automation": "Process Automation"
    };
    
    const categoryName = solutionTypeMapping[solutionValue];
    return categoryName ? solutions.filter(solution => solution.category === categoryName).length : 0;
  };

  // Function to get primary solution type badge for each solution
  const getPrimarySolutionType = (solution: any) => {
    // With the new structure, simply return the category as it directly maps to solution types
    return solution.category || 'AI Solution';
  };

  const industryOptions = [
    { value: "healthcare", label: "Healthcare", icon: <Heart className="h-4 w-4" /> },
    { value: "finance", label: "Financial Services", icon: <DollarSign className="h-4 w-4" /> },
    { value: "manufacturing", label: "Manufacturing", icon: <Factory className="h-4 w-4" /> },
    { value: "retail", label: "Retail", icon: <ShoppingCart className="h-4 w-4" /> },
    { value: "technology", label: "Technology", icon: <Laptop className="h-4 w-4" /> },
    { value: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { value: "real-estate", label: "Real Estate", icon: <HomeIcon className="h-4 w-4" /> },
    { value: "legal", label: "Legal", icon: <Scale className="h-4 w-4" /> },
    { value: "logistics", label: "Logistics & Supply Chain", icon: <Truck className="h-4 w-4" /> },
    { value: "hospitality", label: "Hospitality & Tourism", icon: <Hotel className="h-4 w-4" /> },
    { value: "energy", label: "Energy & Utilities", icon: <Zap className="h-4 w-4" /> },
    { value: "government", label: "Government & Public Sector", icon: <Building2 className="h-4 w-4" /> },
    { value: "insurance", label: "Insurance", icon: <ShieldCheck className="h-4 w-4" /> },
    { value: "automotive", label: "Automotive", icon: <Factory className="h-4 w-4" /> },
    { value: "agriculture", label: "Agriculture", icon: <Leaf className="h-4 w-4" /> },
    { value: "media", label: "Media & Entertainment", icon: <Film className="h-4 w-4" /> },
    { value: "gaming", label: "Gaming", icon: <Gamepad2 className="h-4 w-4" /> },
    { value: "esports", label: "eSports", icon: <Trophy className="h-4 w-4" /> },
    { value: "nonprofit", label: "Non-profit Organizations", icon: <Heart className="h-4 w-4" /> },
    { value: "telecommunications", label: "Telecommunications", icon: <Building2 className="h-4 w-4" /> },
    { value: "transportation", label: "Transportation", icon: <Truck className="h-4 w-4" /> }
  ];

  const solutionTypeOptions = [
    { value: "ai-security", label: "AI Security", icon: <ShieldCheck className="h-4 w-4" /> },
    { value: "computer-vision", label: "Computer Vision", icon: <Eye className="h-4 w-4" /> },
    { value: "conversational-ai", label: "Conversational AI", icon: <Bot className="h-4 w-4" /> },
    { value: "generative-ai", label: "Generative AI", icon: <Brain className="h-4 w-4" /> },
    { value: "local-ai-deployment", label: "Local AI Deployment", icon: <Cloud className="h-4 w-4" /> },
    { value: "machine-learning-analytics", label: "Machine Learning & Analytics", icon: <BarChart className="h-4 w-4" /> },
    { value: "natural-language-processing", label: "Natural Language Processing", icon: <Target className="h-4 w-4" /> },
    { value: "non-ai-solutions", label: "Non-AI Solutions", icon: <Cog className="h-4 w-4" /> },
    { value: "process-automation", label: "Process Automation", icon: <Cpu className="h-4 w-4" /> }
  ];

  // Industry-Solution correlation mappings
  const industryCorrelations = {
    healthcare: ["AI Security", "Computer Vision", "Machine Learning & Analytics", "Natural Language Processing", "Local AI Deployment", "Process Automation"],
    finance: ["AI Security", "Machine Learning & Analytics", "Non-AI Solutions", "Local AI Deployment", "Process Automation", "Generative AI"],
    manufacturing: ["Computer Vision", "Machine Learning & Analytics", "Non-AI Solutions", "Process Automation", "Local AI Deployment", "AI Security"],
    retail: ["Computer Vision", "Machine Learning & Analytics", "Conversational AI", "Process Automation", "AI Security", "Generative AI"],
    technology: ["AI Security", "Non-AI Solutions", "Machine Learning & Analytics", "Generative AI", "Local AI Deployment", "Process Automation"],
    education: ["Conversational AI", "Natural Language Processing", "Machine Learning & Analytics", "Generative AI", "Process Automation", "AI Security"],
    "real-estate": ["Machine Learning & Analytics", "Computer Vision", "Process Automation", "Conversational AI", "AI Security", "Generative AI"],
    legal: ["Natural Language Processing", "AI Security", "Machine Learning & Analytics", "Process Automation", "Local AI Deployment", "Generative AI"],
    logistics: ["Machine Learning & Analytics", "Non-AI Solutions", "Process Automation", "Computer Vision", "AI Security", "Local AI Deployment"],
    hospitality: ["Conversational AI", "Machine Learning & Analytics", "Process Automation", "AI Security", "Computer Vision", "Generative AI"],
    energy: ["Non-AI Solutions", "Machine Learning & Analytics", "Process Automation", "AI Security", "Local AI Deployment", "Computer Vision"],
    government: ["AI Security", "Natural Language Processing", "Machine Learning & Analytics", "Local AI Deployment", "Process Automation", "Non-AI Solutions"],
    insurance: ["AI Security", "Machine Learning & Analytics", "Process Automation", "Natural Language Processing", "Local AI Deployment", "Conversational AI"],
    automotive: ["Computer Vision", "Non-AI Solutions", "Machine Learning & Analytics", "Local AI Deployment", "AI Security", "Process Automation"],
    agriculture: ["Computer Vision", "Non-AI Solutions", "Machine Learning & Analytics", "Local AI Deployment", "AI Security", "Process Automation"],
    media: ["Generative AI", "Natural Language Processing", "Machine Learning & Analytics", "Computer Vision", "AI Security", "Process Automation"],
    gaming: ["Computer Vision", "Machine Learning & Analytics", "Conversational AI", "AI Security", "Process Automation", "Generative AI"],
    esports: ["Machine Learning & Analytics", "Computer Vision", "Conversational AI", "AI Security", "Natural Language Processing", "Process Automation"],
    nonprofit: ["Conversational AI", "Machine Learning & Analytics", "Natural Language Processing", "Process Automation", "AI Security", "Generative AI"],
    transportation: ["Machine Learning & Analytics", "Non-AI Solutions", "Process Automation", "Computer Vision", "AI Security", "Local AI Deployment"]
  };

  // Solution-Industry correlation mappings  
  const solutionCorrelations = {
    "ai-security": ["Financial Services", "Healthcare", "Manufacturing", "Government", "Technology", "Insurance", "Retail", "Education", "Legal"],
    "computer-vision": ["Manufacturing", "Healthcare", "Retail", "Automotive", "Agriculture", "Security", "Transportation", "Government", "Smart Cities"],
    "conversational-ai": ["E-commerce", "Financial Services", "Healthcare", "Technology", "Executive Support", "Sales", "Education", "Customer Service"],
    "generative-ai": ["Technology", "Healthcare", "Financial Services", "Media", "Marketing", "Content Creation", "Education", "Legal", "All Industries"],
    "local-ai-deployment": ["Financial Services", "Healthcare", "Government", "Manufacturing", "Legal", "Technology", "Insurance", "Education"],
    "machine-learning-analytics": ["Financial Services", "Healthcare", "Retail", "Manufacturing", "Technology", "Energy", "Agriculture", "Insurance", "Government"],
    "natural-language-processing": ["Financial Services", "Healthcare", "Legal Services", "Government", "Manufacturing", "Market Research", "Technology", "Content Media"],
    "non-ai-solutions": ["Financial Services", "Supply Chain", "Healthcare", "Real Estate", "Government", "Technology", "E-commerce", "Manufacturing"],
    "process-automation": ["Financial Services", "Healthcare", "Manufacturing", "Legal Services", "Insurance", "Government", "Technology", "Retail"]
  };

  // Helper function to get correlation badges
  const getCorrelationBadges = (key: string, type: 'industry' | 'solution', maxShow: number = 3): { shown: string[]; remaining: number; total: number; } => {
    const correlations = type === 'industry' ? industryCorrelations[key as keyof typeof industryCorrelations] : solutionCorrelations[key as keyof typeof solutionCorrelations];
    if (!correlations) return { shown: [], remaining: 0, total: 0 };
    
    const shown = correlations.slice(0, maxShow);
    const remaining = correlations.length - maxShow;
    
    return {
      shown,
      remaining: remaining > 0 ? remaining : 0,
      total: correlations.length
    };
  };

  const solutions = [
    // AI Security Solutions
    {
      id: 1,
      title: "AI-Powered Cybersecurity",
      category: "AI Security",
      type: "product",
      icon: <ShieldCheck className="text-primary text-xl" />,
      shortDescription: "Deploy intelligent security systems that learn from attack patterns, predict threats, and automatically respond to incidents with superhuman speed and precision.",
      fullDescription: "Cutting-edge artificial intelligence to detect, analyze, and neutralize sophisticated cyber threats in real-time. Advanced platform combines machine learning, behavioral analytics, and automated response capabilities to provide comprehensive protection against evolving attack vectors.",
      features: [
        "Behavioral Analytics and Zero-Day Protection",
        "Automated Response and Threat Containment",
        "Predictive Security Analytics and Risk Scoring",
        "Multi-Layer Defense and Real-Time Monitoring"
      ],
      technologies: ["Financial Services", "Healthcare", "Manufacturing", "Government"],
      hasDemo: false,
      metrics: { "Detection Accuracy": "98%+", "Response Time": "<5 minutes", "ROI": "513-879%" }
    },
    {
      id: 2,
      title: "Fraud Prevention Systems",
      category: "AI Security",
      type: "product",
      icon: <ShieldCheck className="text-primary text-xl" />,
      shortDescription: "Protect against financial fraud and identity theft through sophisticated behavioral analysis and real-time risk assessment with 95%+ accuracy.",
      fullDescription: "Advanced artificial intelligence and machine learning algorithms to detect, prevent, and mitigate fraudulent activities across financial transactions, identity verification, and digital interactions. Comprehensive platform combines behavioral analytics, pattern recognition, and real-time risk assessment.",
      features: [
        "Real-Time Transaction Monitoring and Behavioral Pattern Recognition",
        "Identity Verification and Biometric Authentication",
        "Advanced Analytics and Risk Scoring with ML Models",
        "Cross-Channel Correlation and Network Analysis"
      ],
      technologies: ["Banking", "E-commerce", "Insurance", "Healthcare"],
      hasDemo: false,
      metrics: { "Fraud Detection": "95%+", "False Positives": "80% reduction", "ROI": "757-1,948%" }
    },
    {
      id: 3,
      title: "Threat Detection & Response",
      category: "AI Security",
      type: "product",
      icon: <ShieldCheck className="text-primary text-xl" />,
      shortDescription: "Advanced threat hunting, automated incident response, and intelligent security orchestration with 75% faster threat identification.",
      fullDescription: "Advanced Security Operations and Incident Management Platform that enables security teams to detect sophisticated threats faster, respond to incidents more effectively, and maintain continuous protection across enterprise environments.",
      features: [
        "Advanced Threat Hunting with Behavioral Analytics",
        "Automated Incident Response and Containment Actions",
        "Security Operations Enhancement and Alert Correlation",
        "Investigation Tools and Performance Analytics"
      ],
      technologies: ["Security Operations Centers", "Enterprise Cybersecurity", "Incident Response Teams"],
      hasDemo: false,
      metrics: { "Threat ID Speed": "75% faster", "False Positives": "90% reduction", "ROI": "400-600%" }
    },
    // Computer Vision Solutions
    {
      id: 4,
      title: "Image Recognition & Classification",
      category: "Computer Vision",
      type: "product",
      icon: <Eye className="text-primary text-xl" />,
      shortDescription: "Automatically identify, categorize, and analyze visual content with human-level accuracy and 95%+ recognition rate.",
      fullDescription: "State-of-the-art computer vision and deep learning technologies to automatically identify, categorize, and analyze visual content with human-level accuracy. Platform enables enterprises to extract valuable insights from images, automate visual inspection processes, and enhance customer experiences.",
      features: [
        "Object Detection and Multi-Object Recognition",
        "Facial Recognition and Demographic Analysis",
        "Quality Control and Defect Detection",
        "Custom Category Training and Real-Time Processing"
      ],
      technologies: ["Retail", "Manufacturing", "Healthcare", "Security"],
      hasDemo: true,
      demoType: "Image Recognition",
      metrics: { "Processing Speed": "1000+ images/min", "Recognition Accuracy": "95%+", "ROI": "433-600%" }
    },
    {
      id: 5,
      title: "Object Detection Systems",
      category: "Computer Vision",
      type: "product",
      icon: <Eye className="text-primary text-xl" />,
      shortDescription: "Real-time identification, tracking, and analysis of objects in images and video streams with 95%+ accuracy and 30+ FPS processing speed.",
      fullDescription: "Advanced computer vision capabilities for real-time identification, tracking, and analysis of objects in images and video streams. AI-powered platform enables enterprises to automate visual monitoring, enhance security systems, optimize manufacturing processes, and improve operational efficiency.",
      features: [
        "Real-Time Object Detection and Simultaneous Recognition",
        "Multi-Object Tracking and Behavior Pattern Recognition",
        "Industrial Applications and Production Line Monitoring",
        "High-Speed Processing and Custom Object Training"
      ],
      technologies: ["Manufacturing", "Security", "Retail", "Transportation"],
      hasDemo: true,
      demoType: "Object Detection",
      metrics: { "Video Analysis": "30+ FPS", "Detection Accuracy": "95%+", "ROI": "400-600%" }
    },
    {
      id: 6,
      title: "Vision Platforms",
      category: "Computer Vision",
      type: "platform",
      icon: <Eye className="text-primary text-xl" />,
      shortDescription: "Enterprise computer vision infrastructure for developing and scaling visual AI applications with 70% faster deployment.",
      fullDescription: "Comprehensive computer vision infrastructure for enterprise AI applications. Comprehensive platform combines advanced image processing, machine learning model management, and seamless integration capabilities to enable rapid development and deployment of visual AI solutions.",
      features: [
        "Unified Vision Infrastructure with Multi-Model Support",
        "Model Development and Performance Monitoring",
        "Integration APIs and SDK Libraries",
        "Edge-Cloud Architecture and Auto-Scaling"
      ],
      technologies: ["Manufacturing", "Healthcare", "Retail", "Smart Cities"],
      hasDemo: false,
      metrics: { "Processing Capacity": "10,000+ images/min", "Response Time": "<50ms", "ROI": "300-500%" }
    },
    // Conversational AI Solutions
    {
      id: 7,
      title: "AI Chatbots",
      category: "Conversational AI",
      type: "product",
      icon: <Bot className="text-primary text-xl" />,
      shortDescription: "Handle customer inquiries and automate support processes with 24/7 AI assistance achieving 80% automated resolution rate.",
      fullDescription: "Intelligent Conversational Interfaces for Enhanced Customer Engagement that handle customer inquiries, automate support processes, and provide 24/7 assistance with human-like understanding and responses. Advanced chatbot platform combines natural language processing, machine learning, and contextual intelligence.",
      features: [
        "Natural Language Understanding and Intent Recognition",
        "Omnichannel Deployment across All Platforms",
        "Enterprise Integration with CRM and Knowledge Base",
        "Context Awareness and Multi-Language Support"
      ],
      technologies: ["E-commerce", "Financial Services", "Healthcare", "Technology"],
      hasDemo: true,
      demoType: "AI Chatbot",
      metrics: { "Availability": "24/7", "Resolution Rate": "80%", "ROI": "567-700%" }
    },
    {
      id: 8,
      title: "Virtual Assistants",
      category: "Conversational AI",
      type: "product",
      icon: <Bot className="text-primary text-xl" />,
      shortDescription: "Intelligent digital assistants that help accomplish tasks, manage schedules, and streamline workflows saving 2-3 hours daily.",
      fullDescription: "AI-Powered Digital Assistants for Enhanced Productivity and User Experience that help users accomplish tasks, manage schedules, access information, and streamline workflows through natural conversation. Advanced AI platform combines speech recognition, natural language understanding, and contextual intelligence.",
      features: [
        "Intelligent Task Management and Schedule Optimization",
        "Natural Interaction Interface with Voice Recognition",
        "Enterprise Integration with Office Suite and CRM",
        "Email Management and Task Automation"
      ],
      technologies: ["Executive Support", "Sales", "Healthcare", "Legal Services"],
      hasDemo: false,
      metrics: { "Time Savings": "2-3 hours daily", "Task Speed": "50-70% faster", "ROI": "650-850%" }
    },
    {
      id: 9,
      title: "Voice AI & Speech Recognition",
      category: "Conversational AI",
      type: "product",
      icon: <Bot className="text-primary text-xl" />,
      shortDescription: "Advanced speech processing and voice-enabled interfaces with 95%+ accuracy for natural business interactions.",
      fullDescription: "Advanced Speech Processing and Voice-Enabled Intelligence that transforms how businesses interact with technology and customers through advanced speech processing, natural language understanding, and voice-enabled interfaces. Comprehensive platform combines cutting-edge speech recognition, voice synthesis, and conversational AI.",
      features: [
        "Advanced Speech Recognition with Real-Time Transcription",
        "Natural Voice Synthesis and Text-to-Speech",
        "Conversational Intelligence and Intent Recognition",
        "Multi-Language Support and Noise Cancellation"
      ],
      technologies: ["Healthcare", "Automotive", "Smart Home", "Financial Services"],
      hasDemo: false,
      metrics: { "Voice Accuracy": "95%+", "Multitasking": "70% improvement", "ROI": "380-600%" }
    },
    // Generative AI Solutions
    {
      id: 10,
      title: "Content Generation AI",
      category: "Generative AI",
      type: "product",
      icon: <Brain className="text-primary text-xl" />,
      shortDescription: "Generate enterprise-grade content 10x faster while maintaining brand consistency and regulatory compliance.",
      fullDescription: "Automated Content Creation Platform for Enterprise Marketing and Communications that transforms how enterprises create, optimize, and scale their content operations across all channels and formats. Advanced AI platform combines deep language understanding, brand intelligence, and marketing expertise.",
      features: [
        "Marketing Content Generation and Ad Copy Creation",
        "Corporate Communications and Executive Messaging",
        "Technical Documentation and API Documentation",
        "Creative and Brand Content with Thought Leadership"
      ],
      technologies: ["Technology", "Healthcare", "Financial Services", "All Content-Driven Industries"],
      hasDemo: false,
      metrics: { "Production Speed": "10x faster", "Cost Reduction": "60-80%", "ROI": "800%" }
    },
    {
      id: 11,
      title: "Code Generation Tools",
      category: "Generative AI",
      type: "product",
      icon: <Brain className="text-primary text-xl" />,
      shortDescription: "Intelligent coding assistance that accelerates development cycles by 42% and improves code quality.",
      fullDescription: "AI-Powered Development Platform for Enterprise Software Teams that revolutionizes software development by providing intelligent coding assistance that accelerates development cycles, improves code quality, and enhances developer productivity. AI-powered platform combines advanced code understanding, automated generation capabilities, and enterprise-grade security.",
      features: [
        "Intelligent Code Generation and Function Creation",
        "Code Review and Security Scanning",
        "Test Generation and Quality Assurance",
        "Documentation and Architecture Documentation"
      ],
      technologies: ["Technology Companies", "Financial Services", "Healthcare", "All Software Development"],
      hasDemo: false,
      metrics: { "Development Speed": "42% faster", "Bug Reduction": "35%", "ROI": "740%" }
    },
    {
      id: 12,
      title: "Large Language Models (LLMs)",
      category: "Generative AI",
      type: "platform",
      icon: <Brain className="text-primary text-xl" />,
      shortDescription: "Advanced natural language AI with enterprise fine-tuning, security controls, and seamless integration.",
      fullDescription: "Enterprise-Grade Foundation Models for Intelligent Business Applications that combine state-of-the-art foundation models with enterprise-specific fine-tuning, security controls, and seamless integration capabilities to deliver transformative business value across all knowledge-intensive operations.",
      features: [
        "Enterprise Content Generation with Brand Voice Consistency",
        "Intelligent Knowledge Management and Document Analysis",
        "Conversational Business Intelligence and Analytics",
        "Question-Answering and Knowledge Synthesis"
      ],
      technologies: ["Financial Services", "Healthcare", "Manufacturing", "All Knowledge-Intensive Industries"],
      hasDemo: false,
      metrics: { "Content Speed": "70-85% faster", "Decision Speed": "40% faster", "ROI": "221%" }
    },
    // Local AI Deployment Solutions
    {
      id: 13,
      title: "On-Premise AI Solutions",
      category: "Local AI Deployment",
      type: "infrastructure",
      icon: <Cloud className="text-primary text-xl" />,
      shortDescription: "Complete AI capabilities within your data center ensuring maximum data sovereignty and 100% regulatory compliance.",
      fullDescription: "Private AI Infrastructure for Maximum Data Control and Security that delivers complete artificial intelligence capabilities within your own data center infrastructure, ensuring maximum data sovereignty, regulatory compliance, and performance control. Comprehensive platform combines enterprise-grade AI hardware, software stack, and management tools.",
      features: [
        "Complete AI Infrastructure Stack with GPU Clusters",
        "Data Sovereignty and Air-Gapped Deployment",
        "Performance Optimization and Custom Model Training",
        "Low Latency Inference and Unlimited Scaling"
      ],
      technologies: ["Financial Services", "Healthcare", "Government", "Manufacturing"],
      hasDemo: false,
      metrics: { "Data Control": "100%", "Response Time": "<1ms", "ROI": "200-400%" }
    },
    {
      id: 14,
      title: "Edge AI Computing",
      category: "Local AI Deployment",
      type: "infrastructure",
      icon: <Cloud className="text-primary text-xl" />,
      shortDescription: "AI processing at the point of data generation enabling real-time decision-making with <1ms inference speed.",
      fullDescription: "Real-Time Artificial Intelligence at the Network Edge that brings artificial intelligence processing directly to the point of data generation, enabling real-time decision-making, reduced latency, and enhanced privacy through local AI inference. Comprehensive platform combines specialized edge hardware, optimized AI models, and intelligent orchestration.",
      features: [
        "Ultra-Low Latency Processing and Sub-Millisecond Response",
        "Distributed Intelligence and Edge Mesh Networks",
        "Specialized Hardware Integration with GPU Acceleration",
        "Autonomous Operation and Load Distribution"
      ],
      technologies: ["Manufacturing", "Autonomous Vehicles", "Healthcare", "Smart Cities"],
      hasDemo: false,
      metrics: { "Inference Speed": "<1ms", "Data Transmission": "90% reduction", "ROI": "300-500%" }
    },
    {
      id: 15,
      title: "Private Cloud AI Infrastructure",
      category: "Local AI Deployment",
      type: "infrastructure",
      icon: <Cloud className="text-primary text-xl" />,
      shortDescription: "Dedicated cloud environments combining scalability with security and control of private infrastructure.",
      fullDescription: "Dedicated Cloud Environment for Secure and Scalable AI Operations that combines the scalability and flexibility of cloud computing with the security and control of private infrastructure. Comprehensive platform delivers enterprise-grade AI capabilities through isolated, customizable cloud environments.",
      features: [
        "Dedicated Cloud Resources with Private Tenancy",
        "Advanced Security Framework and Network Isolation",
        "AI-Optimized Infrastructure with GPU Computing",
        "Custom Configurations and Elastic Scaling"
      ],
      technologies: ["Financial Services", "Healthcare", "Technology", "Government"],
      hasDemo: false,
      metrics: { "Energy Efficiency": "30-50% reduction", "Compliance": "100%", "ROI": "233-433%" }
    },
    // Machine Learning & Analytics Solutions
    {
      id: 16,
      title: "Predictive Analytics",
      category: "Machine Learning & Analytics",
      type: "platform",
      icon: <BarChart className="text-primary text-xl" />,
      shortDescription: "Advanced machine learning algorithms to forecast trends and mitigate risks with 85-95% prediction accuracy.",
      fullDescription: "Advanced Forecasting and Business Intelligence Solutions that leverage advanced machine learning algorithms and statistical models to forecast future trends, identify opportunities, and mitigate risks across business operations. Comprehensive platform transforms historical data into actionable predictions that drive strategic decision-making.",
      features: [
        "Advanced Forecasting Models and Time Series Analysis",
        "Business Intelligence Integration and Scenario Planning",
        "Industry-Specific Models and Demand Forecasting",
        "Real-Time Predictions and Risk Assessment"
      ],
      technologies: ["Retail", "Financial Services", "Healthcare", "Manufacturing", "Technology"],
      hasDemo: true,
      demoType: "Predictive Analytics",
      metrics: { "Prediction Accuracy": "85-95%", "Revenue Improvement": "15-25%", "ROI": "414-614%" }
    },
    {
      id: 17,
      title: "Data Analytics & Visualization",
      category: "Machine Learning & Analytics",
      type: "platform",
      icon: <BarChart className="text-primary text-xl" />,
      shortDescription: "Transform raw data into actionable insights through advanced analytics and visualizations with 60% faster generation.",
      fullDescription: "Advanced Business Intelligence and Visual Data Insights that transform raw data into actionable business insights through advanced analytics, interactive visualizations, and intelligent reporting. Comprehensive platform combines machine learning-powered analytics with intuitive visualization tools for enhanced decision-making.",
      features: [
        "Advanced Analytics Engine with Statistical Analysis",
        "Interactive Visualization Tools and Dashboard Creation",
        "Data Integration Platform with Multi-Source Connectivity",
        "Self-Service Analytics and Mobile Optimization"
      ],
      technologies: ["Financial Services", "Healthcare", "Retail", "Manufacturing", "Technology"],
      hasDemo: false,
      metrics: { "Insight Speed": "60% faster", "Decision Quality": "40% improvement", "ROI": "400-600%" }
    },
    {
      id: 18,
      title: "Machine Learning Platforms",
      category: "Machine Learning & Analytics",
      type: "platform",
      icon: <BarChart className="text-primary text-xl" />,
      shortDescription: "MLOps infrastructure for developing, deploying, and managing machine learning models at enterprise scale.",
      fullDescription: "Enterprise MLOps and Model Development Infrastructure that enables data scientists and ML engineers to develop, deploy, and manage machine learning models at enterprise scale. Integrated platform combines model development tools, automated deployment pipelines, and production monitoring for seamless ML operations.",
      features: [
        "Complete MLOps Pipeline with Model Development",
        "Scalable Computing Infrastructure and GPU Clusters",
        "Enterprise Integration and API Management",
        "Automated Training and Model Deployment"
      ],
      technologies: ["Financial Services", "Healthcare", "Retail", "Manufacturing"],
      hasDemo: false,
      metrics: { "Deployment Speed": "70% faster", "Scientist Efficiency": "60% improvement", "ROI": "380-580%" }
    },
    // Natural Language Processing Solutions
    {
      id: 19,
      title: "Document Processing & OCR",
      category: "Natural Language Processing",
      type: "product",
      icon: <Target className="text-primary text-xl" />,
      shortDescription: "Transform unstructured documents into actionable data with advanced OCR and 99%+ accuracy.",
      fullDescription: "Intelligent Document Analysis and Text Extraction Solutions that transform unstructured documents into actionable data through advanced optical character recognition, intelligent document analysis, and automated information extraction. AI-powered platform processes documents of any format with human-level accuracy.",
      features: [
        "Advanced OCR Technology with Multi-Format Support",
        "Intelligent Document Understanding and Form Processing",
        "Workflow Automation and Batch Processing",
        "99%+ Accuracy and Layout Preservation"
      ],
      technologies: ["Financial Services", "Healthcare", "Legal Services", "Government", "Manufacturing"],
      hasDemo: false,
      metrics: { "Processing Speed": "1000+ pages/hour", "Extraction Accuracy": "99%+", "ROI": "500-700%" }
    },
    {
      id: 20,
      title: "Text Analytics & Mining",
      category: "Natural Language Processing",
      type: "product",
      icon: <Target className="text-primary text-xl" />,
      shortDescription: "Unlock insights from unstructured text data through advanced NLP and machine learning with 92%+ accuracy.",
      fullDescription: "Advanced Text Analysis and Content Intelligence Solutions that unlock valuable insights from unstructured text data through advanced natural language processing, machine learning, and statistical analysis. Comprehensive platform transforms documents, social media, customer feedback, and other text sources into actionable business intelligence.",
      features: [
        "Advanced Text Mining and Pattern Discovery",
        "Sentiment and Opinion Analysis with Emotion Recognition",
        "Content Intelligence and Named Entity Recognition",
        "Topic Modeling and Trend Analysis"
      ],
      technologies: ["Market Research", "Healthcare", "Financial Services", "Government", "Technology"],
      hasDemo: false,
      metrics: { "Classification Accuracy": "92%+", "Language Support": "50+", "ROI": "460-700%" }
    },
    {
      id: 21,
      title: "Language Understanding APIs",
      category: "Natural Language Processing",
      type: "service",
      icon: <Target className="text-primary text-xl" />,
      shortDescription: "Easy-to-integrate NLP APIs with 95%+ accuracy across all language understanding tasks.",
      fullDescription: "Advanced Natural Language Intelligence Services that provide powerful natural language processing capabilities through easy-to-integrate services that enable applications to understand, interpret, and respond to human language with sophisticated intelligence. Comprehensive API suite combines cutting-edge NLP models with enterprise-grade scalability.",
      features: [
        "Text Analysis APIs with Sentiment Analysis",
        "Semantic Understanding APIs and Topic Modeling",
        "Conversational APIs and Dialogue Management",
        "Entity Recognition and Language Detection"
      ],
      technologies: ["Customer Service", "Content and Media", "Healthcare", "Financial Services", "E-commerce"],
      hasDemo: false,
      metrics: { "API Accuracy": "95%+", "Response Time": "<100ms", "ROI": "700-900%" }
    },
    // Non-AI Solutions
    {
      id: 22,
      title: "Blockchain Solutions",
      category: "Non-AI Solutions",
      type: "platform",
      icon: <Cog className="text-primary text-xl" />,
      shortDescription: "Distributed ledger technology for secure, transparent, and immutable systems with 100% tamper-proof records.",
      fullDescription: "Distributed Ledger Technology for Trust, Transparency, and Security that leverages distributed ledger technology to create secure, transparent, and immutable systems that eliminate intermediaries, reduce costs, and establish trust in digital transactions. Comprehensive platform enables enterprises to implement blockchain applications across various use cases.",
      features: [
        "Smart Contract Development and Contract Automation",
        "Supply Chain Transparency and Product Provenance",
        "Digital Asset Management and Token Ecosystems",
        "Multi-Party Agreements and Conditional Execution"
      ],
      technologies: ["Financial Services", "Supply Chain", "Healthcare", "Real Estate", "Government"],
      hasDemo: false,
      metrics: { "Record Security": "100% tamper-proof", "Cost Savings": "60-80%", "ROI": "300-500%" }
    },
    {
      id: 23,
      title: "Cloud Infrastructure",
      category: "Non-AI Solutions",
      type: "infrastructure",
      icon: <Cog className="text-primary text-xl" />,
      shortDescription: "Cloud computing platforms that scale operations, reduce costs by 40-60%, and improve business agility.",
      fullDescription: "Scalable and Secure Cloud Computing Solutions that provide comprehensive cloud computing platforms enabling businesses to scale operations, reduce costs, and improve agility through modern cloud architectures. Multi-cloud approach delivers secure, reliable, and high-performance infrastructure for diverse enterprise needs.",
      features: [
        "Multi-Cloud Architecture with AWS Integration",
        "Infrastructure as Code with Terraform and Kubernetes",
        "Cloud Security and Compliance Framework",
        "Identity and Access Management"
      ],
      technologies: ["Technology", "Financial Services", "Healthcare", "E-commerce", "Manufacturing"],
      hasDemo: false,
      metrics: { "Cost Reduction": "40-60%", "Deployment Speed": "90% faster", "ROI": "400-600%" }
    },
    {
      id: 24,
      title: "IoT Integration",
      category: "Non-AI Solutions",
      type: "platform",
      icon: <Cog className="text-primary text-xl" />,
      shortDescription: "Intelligent IoT ecosystems providing 100% operational visibility and reducing maintenance costs by 60%.",
      fullDescription: "Connected Device Ecosystems and Smart System Solutions that create intelligent, connected environments transforming how businesses monitor, control, and optimize operations through the Internet of Things. Comprehensive platform connects devices, sensors, and systems to provide real-time insights, automated responses, and predictive intelligence.",
      features: [
        "Device Connectivity and Multi-Protocol Support",
        "Real-Time Data Processing and Stream Processing",
        "Automation and Control Systems with Predictive Maintenance",
        "Energy Optimization and Safety Systems"
      ],
      technologies: ["Smart Manufacturing", "Smart Buildings", "Agriculture", "Healthcare", "Transportation", "Energy"],
      hasDemo: false,
      metrics: { "Operational Visibility": "100%", "Energy Reduction": "30-50%", "ROI": "357-567%" }
    },
    // Process Automation Solutions
    {
      id: 25,
      title: "Robotic Process Automation (RPA)",
      category: "Process Automation",
      type: "product",
      icon: <Cpu className="text-primary text-xl" />,
      shortDescription: "Intelligent software robots executing business processes 10-20x faster than manual processing.",
      fullDescription: "Enterprise Software Robots for Automated Task Execution that deploy intelligent software robots executing structured, rule-based business processes with superhuman speed, accuracy, and consistency. Enterprise-grade RPA platform automates repetitive tasks across multiple applications, systems, and interfaces.",
      features: [
        "Data Processing and Entry Automation",
        "System Integration and Workflow Automation",
        "Report Generation and Document Management",
        "Customer Service and Communication Automation"
      ],
      technologies: ["Financial Services", "Healthcare", "Manufacturing", "Retail", "Government"],
      hasDemo: false,
      metrics: { "Processing Speed": "10-20x faster", "Accuracy": "99.8%+", "ROI": "107-459%" }
    },
    {
      id: 26,
      title: "Intelligent Process Automation (IPA)",
      category: "Process Automation",
      type: "product",
      icon: <Cpu className="text-primary text-xl" />,
      shortDescription: "Combines RPA with AI to handle complex business processes with 50-75% efficiency improvement.",
      fullDescription: "AI-Powered Process Optimization for Complex Business Operations that combines traditional RPA with advanced AI technologies including machine learning, natural language processing, and cognitive document processing to handle complex, unstructured business processes requiring human-like decision-making capabilities.",
      features: [
        "Cognitive Document Processing and Content Understanding",
        "Intelligent Case Management and Adaptive Workflow Orchestration",
        "Predictive Process Analytics and Outcome Prediction",
        "Conversational Process Automation and Intent Recognition"
      ],
      technologies: ["Financial Services", "Healthcare", "Manufacturing", "Legal Services", "Insurance"],
      hasDemo: false,
      metrics: { "Process Efficiency": "50-75% improvement", "Document Accuracy": "95%+", "ROI": "271-723%" }
    },
    {
      id: 27,
      title: "Workflow Automation",
      category: "Process Automation",
      type: "platform",
      icon: <Cpu className="text-primary text-xl" />,
      shortDescription: "Orchestrate complex business processes across departments with 60-80% reduction in cycle times.",
      fullDescription: "Enterprise Process Orchestration and Human-Digital Collaboration that orchestrates complex, multi-step business processes spanning departments, systems, and stakeholders through intelligent routing, dynamic decision-making, and seamless human-digital collaboration. Platform transforms organizational efficiency by automating process coordination.",
      features: [
        "Approval and Review Workflows with Dynamic Routing",
        "Cross-Departmental Process Coordination",
        "Task Management and Skill-Based Assignment",
        "Document and Content Workflows with Version Control"
      ],
      technologies: ["Financial Services", "Healthcare", "Manufacturing", "Government", "Technology"],
      hasDemo: false,
      metrics: { "Cycle Time Reduction": "60-80%", "Completion Rate": "85%+ improvement", "ROI": "250-642%" }
    }
  ];

  // Industry Cards Array - 21 industry overview cards
  const industryCards = [
    {
      id: "healthcare-industry",
      type: "industry",
      title: "Healthcare & Life Sciences",
      category: "Industry",
      icon: <Heart className="text-primary text-xl" />,
      industryValue: "healthcare",
      shortDescription: "Revolutionize patient care with AI-powered diagnostics, treatment optimization, and operational efficiency solutions.",
      fullDescription: "Healthcare industry transformation through artificial intelligence, enabling better patient outcomes, reduced costs, and improved operational efficiency. From diagnostic imaging to personalized treatment plans, AI is reshaping how healthcare delivers value.",
      keyApplications: [
        "Medical Imaging & Diagnostics",
        "Drug Discovery & Development", 
        "Patient Monitoring & Care",
        "Healthcare Analytics & Operations"
      ],
      primarySolutions: ["AI Security", "Computer Vision", "Machine Learning & Analytics", "Natural Language Processing"],
      metrics: { "Cost Reduction": "20-30%", "Diagnostic Accuracy": "95%+", "Patient Satisfaction": "40% improvement" },
      benefits: [
        "Enhanced diagnostic accuracy and speed",
        "Personalized treatment recommendations",
        "Streamlined administrative processes",
        "Improved patient outcomes and safety"
      ]
    },
    {
      id: "finance-industry", 
      type: "industry",
      title: "Financial Services",
      category: "Industry",
      icon: <DollarSign className="text-primary text-xl" />,
      industryValue: "finance",
      shortDescription: "Transform banking and finance with intelligent fraud detection, risk management, and personalized customer experiences.",
      fullDescription: "Financial services industry evolution through AI-driven solutions that enhance security, improve decision-making, and deliver superior customer experiences while ensuring regulatory compliance and operational excellence.",
      keyApplications: [
        "Fraud Detection & Prevention",
        "Risk Assessment & Management",
        "Algorithmic Trading & Investment",
        "Customer Service & Personalization"
      ],
      primarySolutions: ["AI Security", "Machine Learning & Analytics", "Process Automation", "Local AI Deployment"],
      metrics: { "Fraud Detection": "99%+", "Processing Speed": "10x faster", "Customer Satisfaction": "50% improvement" },
      benefits: [
        "Real-time fraud prevention and risk mitigation",
        "Automated compliance and regulatory reporting", 
        "Personalized financial products and services",
        "Enhanced customer onboarding and support"
      ]
    },
    {
      id: "manufacturing-industry",
      type: "industry", 
      title: "Manufacturing & Industry 4.0",
      category: "Industry",
      icon: <Factory className="text-primary text-xl" />,
      industryValue: "manufacturing",
      shortDescription: "Optimize production with predictive maintenance, quality control, and intelligent automation systems.",
      fullDescription: "Manufacturing transformation through Industry 4.0 technologies, enabling smart factories with predictive maintenance, quality optimization, and intelligent supply chain management for maximum efficiency and minimal downtime.",
      keyApplications: [
        "Predictive Maintenance & Asset Management",
        "Quality Control & Defect Detection", 
        "Supply Chain Optimization",
        "Production Planning & Scheduling"
      ],
      primarySolutions: ["Computer Vision", "Machine Learning & Analytics", "Process Automation", "Non-AI Solutions"],
      metrics: { "Downtime Reduction": "30-50%", "Quality Improvement": "25%", "Cost Savings": "15-20%" },
      benefits: [
        "Reduced equipment downtime and maintenance costs",
        "Improved product quality and consistency",
        "Optimized supply chain and inventory management", 
        "Enhanced worker safety and productivity"
      ]
    },
    {
      id: "retail-industry",
      type: "industry",
      title: "Retail & E-commerce", 
      category: "Industry",
      icon: <ShoppingCart className="text-primary text-xl" />,
      industryValue: "retail",
      shortDescription: "Enhance customer experiences with personalized recommendations, inventory optimization, and smart retail analytics.",
      fullDescription: "Retail industry transformation through AI-powered personalization, demand forecasting, and customer experience optimization. From recommendation engines to inventory management, AI drives sales growth and operational efficiency.",
      keyApplications: [
        "Personalized Product Recommendations",
        "Inventory Management & Demand Forecasting",
        "Customer Behavior Analytics", 
        "Dynamic Pricing & Promotion Optimization"
      ],
      primarySolutions: ["Computer Vision", "Machine Learning & Analytics", "Conversational AI", "Process Automation"],
      metrics: { "Sales Increase": "15-25%", "Inventory Turnover": "30% improvement", "Customer Retention": "40% higher" },
      benefits: [
        "Personalized shopping experiences and recommendations",
        "Optimized inventory levels and reduced waste",
        "Enhanced customer insights and segmentation",
        "Automated customer service and support"
      ]
    },
    {
      id: "technology-industry",
      type: "industry",
      title: "Technology & Software",
      category: "Industry", 
      icon: <Laptop className="text-primary text-xl" />,
      industryValue: "technology",
      shortDescription: "Accelerate software development with AI-powered coding assistance, automated testing, and intelligent DevOps.",
      fullDescription: "Technology sector advancement through AI-enhanced development processes, intelligent automation, and next-generation software solutions that accelerate innovation and improve development productivity.",
      keyApplications: [
        "Code Generation & Development Assistance",
        "Automated Testing & Quality Assurance",
        "DevOps & Infrastructure Optimization",
        "Cybersecurity & Threat Detection"
      ],
      primarySolutions: ["AI Security", "Generative AI", "Machine Learning & Analytics", "Process Automation"],
      metrics: { "Development Speed": "40% faster", "Bug Reduction": "60%", "Deployment Frequency": "3x higher" },
      benefits: [
        "Accelerated software development and deployment",
        "Enhanced code quality and security",
        "Automated infrastructure management",
        "Improved developer productivity and satisfaction"
      ]
    },
    {
      id: "education-industry",
      type: "industry",
      title: "Education & Learning",
      category: "Industry",
      icon: <GraduationCap className="text-primary text-xl" />,
      industryValue: "education", 
      shortDescription: "Transform learning with personalized education platforms, intelligent tutoring, and automated administrative processes.",
      fullDescription: "Educational transformation through AI-powered personalized learning, intelligent content creation, and administrative automation that enhances student outcomes and educator effectiveness.",
      keyApplications: [
        "Personalized Learning Platforms",
        "Intelligent Tutoring Systems",
        "Automated Grading & Assessment",
        "Student Performance Analytics"
      ],
      primarySolutions: ["Conversational AI", "Natural Language Processing", "Machine Learning & Analytics", "Generative AI"],
      metrics: { "Learning Outcomes": "30% improvement", "Teacher Efficiency": "25% increase", "Student Engagement": "45% higher" },
      benefits: [
        "Personalized learning paths for each student",
        "Automated administrative and grading tasks",
        "Enhanced student engagement and outcomes",
        "Data-driven insights for educational improvement"
      ]
    },
    {
      id: "realestate-industry",
      type: "industry",
      title: "Real Estate & Property",
      category: "Industry",
      icon: <HomeIcon className="text-primary text-xl" />,
      industryValue: "real-estate",
      shortDescription: "Optimize property management with predictive analytics, automated valuations, and smart building technologies.",
      fullDescription: "Real estate industry enhancement through AI-driven property valuation, predictive maintenance, and intelligent building management systems that optimize operations and improve tenant experiences.",
      keyApplications: [
        "Automated Property Valuation",
        "Predictive Maintenance & Facility Management", 
        "Market Analysis & Investment Insights",
        "Smart Building & Energy Optimization"
      ],
      primarySolutions: ["Machine Learning & Analytics", "Computer Vision", "Process Automation", "Non-AI Solutions"],
      metrics: { "Valuation Accuracy": "90%+", "Energy Savings": "25-35%", "Maintenance Costs": "20% reduction" },
      benefits: [
        "Accurate property valuations and market insights",
        "Optimized building operations and energy efficiency",
        "Enhanced tenant experiences and satisfaction",
        "Predictive maintenance and cost reduction"
      ]
    },
    {
      id: "legal-industry",
      type: "industry",
      title: "Legal Services",
      category: "Industry",
      icon: <Scale className="text-primary text-xl" />,
      industryValue: "legal",
      shortDescription: "Streamline legal processes with document analysis, contract review, and intelligent legal research tools.",
      fullDescription: "Legal industry transformation through AI-powered document analysis, contract intelligence, and legal research automation that enhances lawyer productivity and improves client outcomes.",
      keyApplications: [
        "Contract Analysis & Review",
        "Legal Document Processing",
        "Legal Research & Case Analysis", 
        "Compliance & Risk Management"
      ],
      primarySolutions: ["Natural Language Processing", "AI Security", "Machine Learning & Analytics", "Process Automation"],
      metrics: { "Document Review": "80% faster", "Research Efficiency": "60% improvement", "Accuracy": "95%+" },
      benefits: [
        "Accelerated document review and analysis",
        "Enhanced legal research and case preparation", 
        "Improved contract negotiation and management",
        "Automated compliance monitoring and reporting"
      ]
    },
    {
      id: "logistics-industry",
      type: "industry",
      title: "Logistics & Supply Chain",
      category: "Industry",
      icon: <Truck className="text-primary text-xl" />,
      industryValue: "logistics",
      shortDescription: "Optimize supply chains with route optimization, demand forecasting, and intelligent warehouse management.",
      fullDescription: "Supply chain and logistics optimization through AI-driven route planning, inventory management, and predictive analytics that reduce costs and improve delivery performance.",
      keyApplications: [
        "Route Optimization & Fleet Management",
        "Demand Forecasting & Inventory Planning",
        "Warehouse Automation & Management",
        "Supply Chain Risk Management"
      ],
      primarySolutions: ["Machine Learning & Analytics", "Process Automation", "Computer Vision", "Non-AI Solutions"],
      metrics: { "Delivery Efficiency": "25% improvement", "Cost Reduction": "15-20%", "Inventory Accuracy": "98%+" },
      benefits: [
        "Optimized delivery routes and reduced fuel costs",
        "Improved inventory management and forecasting",
        "Enhanced warehouse operations and automation",
        "Better supply chain visibility and risk management"
      ]
    },
    {
      id: "hospitality-industry",
      type: "industry", 
      title: "Hospitality & Tourism",
      category: "Industry",
      icon: <Hotel className="text-primary text-xl" />,
      industryValue: "hospitality",
      shortDescription: "Enhance guest experiences with personalized services, revenue optimization, and intelligent operations management.",
      fullDescription: "Hospitality industry enhancement through AI-powered personalization, revenue management, and operational optimization that improves guest satisfaction and business performance.",
      keyApplications: [
        "Personalized Guest Experiences",
        "Revenue Management & Dynamic Pricing",
        "Operational Efficiency & Staff Optimization",
        "Predictive Maintenance & Energy Management"
      ],
      primarySolutions: ["Conversational AI", "Machine Learning & Analytics", "Process Automation", "Computer Vision"],
      metrics: { "Guest Satisfaction": "35% improvement", "Revenue Growth": "20%+", "Operational Efficiency": "30% increase" },
      benefits: [
        "Personalized guest services and recommendations",
        "Optimized pricing and revenue management",
        "Streamlined operations and staff scheduling", 
        "Enhanced security and facility management"
      ]
    },
    {
      id: "energy-industry",
      type: "industry",
      title: "Energy & Utilities",
      category: "Industry",
      icon: <Zap className="text-primary text-xl" />,
      industryValue: "energy",
      shortDescription: "Optimize energy production and distribution with predictive maintenance, smart grid management, and efficiency analytics.",
      fullDescription: "Energy sector transformation through AI-powered grid optimization, predictive maintenance, and renewable energy management that improves efficiency and sustainability.",
      keyApplications: [
        "Smart Grid Management & Optimization",
        "Predictive Maintenance & Asset Management",
        "Energy Demand Forecasting",
        "Renewable Energy Integration"
      ],
      primarySolutions: ["Machine Learning & Analytics", "Process Automation", "Computer Vision", "Non-AI Solutions"],
      metrics: { "Grid Efficiency": "15% improvement", "Downtime Reduction": "40%", "Energy Savings": "20-30%" },
      benefits: [
        "Optimized energy distribution and grid stability",
        "Reduced equipment downtime and maintenance costs",
        "Enhanced renewable energy integration",
        "Improved energy efficiency and sustainability"
      ]
    },
    {
      id: "government-industry",
      type: "industry",
      title: "Government & Public Sector", 
      category: "Industry",
      icon: <Building2 className="text-primary text-xl" />,
      industryValue: "government",
      shortDescription: "Modernize public services with citizen engagement platforms, security systems, and efficient administrative processes.",
      fullDescription: "Public sector modernization through AI-enhanced citizen services, security systems, and administrative efficiency that improves public service delivery and operational effectiveness.",
      keyApplications: [
        "Citizen Services & Digital Government",
        "Public Safety & Security Systems",
        "Administrative Process Automation",
        "Policy Analysis & Decision Support"
      ],
      primarySolutions: ["AI Security", "Natural Language Processing", "Machine Learning & Analytics", "Process Automation"],
      metrics: { "Service Efficiency": "40% improvement", "Processing Time": "60% reduction", "Citizen Satisfaction": "50% increase" },
      benefits: [
        "Enhanced citizen services and digital government",
        "Improved public safety and security measures",
        "Streamlined administrative processes",
        "Data-driven policy making and analysis"
      ]
    },
    {
      id: "insurance-industry",
      type: "industry",
      title: "Insurance",
      category: "Industry", 
      icon: <ShieldCheck className="text-primary text-xl" />,
      industryValue: "insurance",
      shortDescription: "Transform insurance operations with risk assessment, claims automation, and personalized policy recommendations.",
      fullDescription: "Insurance industry evolution through AI-driven risk assessment, automated claims processing, and personalized customer experiences that improve operational efficiency and customer satisfaction.",
      keyApplications: [
        "Risk Assessment & Underwriting",
        "Claims Processing & Fraud Detection",
        "Customer Service & Policy Management",
        "Predictive Analytics & Pricing"
      ],
      primarySolutions: ["AI Security", "Machine Learning & Analytics", "Process Automation", "Natural Language Processing"],
      metrics: { "Claims Processing": "70% faster", "Fraud Detection": "90%+", "Customer Satisfaction": "45% improvement" },
      benefits: [
        "Accurate risk assessment and pricing",
        "Automated claims processing and fraud detection",
        "Personalized insurance products and services",
        "Enhanced customer engagement and retention"
      ]
    },
    {
      id: "automotive-industry",
      type: "industry",
      title: "Automotive",
      category: "Industry",
      icon: <Factory className="text-primary text-xl" />,
      industryValue: "automotive",
      shortDescription: "Drive automotive innovation with autonomous systems, predictive maintenance, and intelligent manufacturing processes.",
      fullDescription: "Automotive industry transformation through AI-powered autonomous systems, predictive maintenance, and smart manufacturing that enhances safety, efficiency, and innovation.",
      keyApplications: [
        "Autonomous Driving & ADAS",
        "Predictive Maintenance & Vehicle Health",
        "Manufacturing Quality Control",
        "Connected Vehicle Services"
      ],
      primarySolutions: ["Computer Vision", "Machine Learning & Analytics", "Local AI Deployment", "Process Automation"],
      metrics: { "Safety Improvement": "60%+", "Manufacturing Efficiency": "25% increase", "Maintenance Costs": "30% reduction" },
      benefits: [
        "Enhanced vehicle safety and autonomous capabilities",
        "Optimized manufacturing processes and quality",
        "Predictive vehicle maintenance and services",
        "Improved connected vehicle experiences"
      ]
    },
    {
      id: "agriculture-industry",
      type: "industry",
      title: "Agriculture & Farming",
      category: "Industry",
      icon: <Leaf className="text-primary text-xl" />,
      industryValue: "agriculture",
      shortDescription: "Revolutionize farming with precision agriculture, crop monitoring, and sustainable resource management systems.",
      fullDescription: "Agricultural transformation through precision farming, crop monitoring, and sustainable resource management that increases yields while reducing environmental impact.",
      keyApplications: [
        "Precision Farming & Crop Monitoring",
        "Livestock Management & Health Monitoring",
        "Resource Optimization & Sustainability",
        "Harvest Planning & Supply Chain"
      ],
      primarySolutions: ["Computer Vision", "Machine Learning & Analytics", "Non-AI Solutions", "Process Automation"],
      metrics: { "Crop Yield": "20-30% increase", "Resource Efficiency": "25% improvement", "Cost Reduction": "15-20%" },
      benefits: [
        "Optimized crop yields and quality",
        "Efficient resource utilization and sustainability",
        "Enhanced livestock health and productivity",
        "Improved farm management and planning"
      ]
    },
    {
      id: "media-industry",
      type: "industry",
      title: "Media & Entertainment",
      category: "Industry",
      icon: <Film className="text-primary text-xl" />,
      industryValue: "media",
      shortDescription: "Transform content creation with automated production, personalized recommendations, and intelligent content management.",
      fullDescription: "Media and entertainment evolution through AI-powered content creation, personalization, and distribution that enhances audience engagement and operational efficiency.",
      keyApplications: [
        "Content Creation & Automated Production",
        "Personalized Content Recommendations",
        "Audience Analytics & Engagement",
        "Content Management & Distribution"
      ],
      primarySolutions: ["Generative AI", "Natural Language Processing", "Machine Learning & Analytics", "Computer Vision"],
      metrics: { "Content Production": "50% faster", "Audience Engagement": "40% increase", "Personalization": "85% accuracy" },
      benefits: [
        "Accelerated content creation and production",
        "Enhanced audience engagement and retention",
        "Personalized viewing experiences",
        "Optimized content distribution and monetization"
      ]
    },
    {
      id: "gaming-industry", 
      type: "industry",
      title: "Gaming & Interactive Media",
      category: "Industry",
      icon: <Gamepad2 className="text-primary text-xl" />,
      industryValue: "gaming",
      shortDescription: "Enhance gaming experiences with intelligent NPCs, procedural content generation, and player behavior analytics.",
      fullDescription: "Gaming industry advancement through AI-powered game development, player analytics, and immersive experiences that enhance gameplay and player engagement.",
      keyApplications: [
        "Intelligent NPCs & Game AI",
        "Procedural Content Generation",
        "Player Behavior Analytics",
        "Anti-Cheat & Moderation Systems"
      ],
      primarySolutions: ["Computer Vision", "Machine Learning & Analytics", "Conversational AI", "AI Security"],
      metrics: { "Player Retention": "35% improvement", "Development Speed": "40% faster", "Engagement": "50% increase" },
      benefits: [
        "Enhanced gaming experiences and immersion",
        "Intelligent game content and procedural generation",
        "Improved player analytics and personalization",
        "Advanced anti-cheat and security systems"
      ]
    },
    {
      id: "esports-industry",
      type: "industry",
      title: "eSports & Competitive Gaming",
      category: "Industry",
      icon: <Trophy className="text-primary text-xl" />,
      industryValue: "esports",
      shortDescription: "Optimize competitive gaming with performance analytics, match prediction, and automated tournament management.",
      fullDescription: "eSports industry enhancement through AI-powered performance analytics, strategic insights, and tournament management that improves competitive gaming experiences.",
      keyApplications: [
        "Player Performance Analytics",
        "Match Prediction & Betting Insights",
        "Tournament Management & Scheduling",
        "Fan Engagement & Experience"
      ],
      primarySolutions: ["Machine Learning & Analytics", "Computer Vision", "Conversational AI", "AI Security"],
      metrics: { "Performance Insights": "95% accuracy", "Fan Engagement": "60% increase", "Tournament Efficiency": "45% improvement" },
      benefits: [
        "Enhanced player performance and training",
        "Improved tournament organization and management",
        "Better fan engagement and viewing experiences",
        "Advanced analytics and strategic insights"
      ]
    },
    {
      id: "nonprofit-industry",
      type: "industry",
      title: "Non-profit Organizations",
      category: "Industry",
      icon: <Heart className="text-primary text-xl" />,
      industryValue: "nonprofit",
      shortDescription: "Maximize social impact with donor analytics, program optimization, and efficient resource allocation systems.",
      fullDescription: "Non-profit sector enhancement through AI-powered donor engagement, program effectiveness analysis, and resource optimization that maximizes social impact and organizational efficiency.",
      keyApplications: [
        "Donor Analytics & Engagement",
        "Program Impact Measurement",
        "Resource Allocation & Optimization",
        "Volunteer Management & Coordination"
      ],
      primarySolutions: ["Conversational AI", "Machine Learning & Analytics", "Natural Language Processing", "Process Automation"],
      metrics: { "Fundraising Efficiency": "40% increase", "Program Impact": "30% improvement", "Volunteer Engagement": "50% higher" },
      benefits: [
        "Enhanced donor engagement and fundraising",
        "Improved program effectiveness and impact",
        "Optimized resource allocation and management",
        "Better volunteer coordination and retention"
      ]
    },
    {
      id: "telecommunications-industry",
      type: "industry",
      title: "Telecommunications",
      category: "Industry",
      icon: <Building2 className="text-primary text-xl" />,
      industryValue: "telecommunications",
      shortDescription: "Optimize network performance with predictive maintenance, customer service automation, and intelligent infrastructure management.",
      fullDescription: "Telecommunications industry transformation through AI-powered network optimization, customer experience enhancement, and infrastructure management that improves service quality and operational efficiency.",
      keyApplications: [
        "Network Optimization & Performance",
        "Predictive Maintenance & Infrastructure",
        "Customer Service & Support Automation",
        "Fraud Detection & Security"
      ],
      primarySolutions: ["Machine Learning & Analytics", "AI Security", "Process Automation", "Conversational AI"],
      metrics: { "Network Efficiency": "30% improvement", "Customer Satisfaction": "45% increase", "Downtime Reduction": "50%" },
      benefits: [
        "Optimized network performance and reliability",
        "Enhanced customer service and support",
        "Reduced infrastructure maintenance costs",
        "Improved security and fraud prevention"
      ]
    },
    {
      id: "transportation-industry",
      type: "industry",
      title: "Transportation & Mobility",
      category: "Industry",
      icon: <Truck className="text-primary text-xl" />,
      industryValue: "transportation",
      shortDescription: "Transform mobility with route optimization, autonomous systems, and intelligent traffic management solutions.",
      fullDescription: "Transportation industry evolution through AI-powered mobility solutions, autonomous systems, and intelligent traffic management that enhances safety, efficiency, and sustainability.",
      keyApplications: [
        "Autonomous & Semi-Autonomous Vehicles",
        "Traffic Management & Optimization",
        "Fleet Management & Logistics",
        "Predictive Maintenance & Safety"
      ],
      primarySolutions: ["Machine Learning & Analytics", "Computer Vision", "Process Automation", "AI Security"],
      metrics: { "Traffic Efficiency": "25% improvement", "Safety Enhancement": "40%", "Fuel Savings": "20-30%" },
      benefits: [
        "Enhanced transportation safety and efficiency",
        "Optimized traffic flow and congestion reduction",
        "Improved fleet management and logistics",
        "Advanced autonomous and mobility solutions"
      ]
    }
  ];
  
  // Enhanced filtering logic for combined content (solutions + industry cards)
  const getFilteredContent = () => {
    let contentItems: any[] = [];
    
    if (selectedFilter.type === 'all') {
      // Show all solutions + all industry cards at the end
      contentItems = [...solutions, ...industryCards];
    } else if (selectedFilter.type === 'industry') {
      if (selectedFilter.value === 'all-industries') {
        // Show all industry cards only
        contentItems = [...industryCards];
      } else {
        // Show relevant solutions + specific industry card
        const industryMapping: { [key: string]: string[] } = {
          "healthcare": ["Healthcare"],
          "finance": ["Financial Services", "Finance", "Banking"],
          "manufacturing": ["Manufacturing", "Smart Manufacturing"],
          "retail": ["Retail", "E-commerce"],
          "technology": ["Technology", "Technology Companies", "All Software Development", "Enterprise Cybersecurity", "Executive Support", "Sales", "Customer Service", "Smart Cities", "All Knowledge-Intensive Industries"],
          "education": ["Education"],
          "real-estate": ["Real Estate", "Smart Buildings"],
          "legal": ["Legal", "Legal Services"],
          "logistics": ["Logistics", "Supply Chain", "Logistics & Supply Chain"],
          "hospitality": ["Hospitality", "Hospitality & Tourism", "Smart Home"],
          "energy": ["Energy", "Energy & Utilities"],
          "government": ["Government", "Government & Public Sector", "Security Operations Centers", "Incident Response Teams"],
          "insurance": ["Insurance"],
          "automotive": ["Automotive", "Autonomous Vehicles"],
          "agriculture": ["Agriculture"],
          "media": ["Media", "Media & Entertainment", "Content and Media", "Content Creation", "All Content-Driven Industries", "Marketing"],
          "gaming": ["Gaming"],
          "esports": ["eSports"],
          "nonprofit": ["Non-profit", "Non-profit Organizations"],
          "telecommunications": ["Telecommunications"],
          "transportation": ["Transportation"]
        };
        
        const targetIndustries = industryMapping[selectedFilter.value] || [];
        const relevantSolutions = solutions.filter(solution =>
          solution.technologies?.some(tech => 
            targetIndustries.some(targetIndustry =>
              tech.toLowerCase().includes(targetIndustry.toLowerCase()) ||
              targetIndustry.toLowerCase().includes(tech.toLowerCase())
            )
          )
        );
        
        const relevantIndustryCard = industryCards.find(card => card.industryValue === selectedFilter.value);
        contentItems = [...relevantSolutions, ...(relevantIndustryCard ? [relevantIndustryCard] : [])];
      }
    } else if (selectedFilter.type === 'solution') {
      if (selectedFilter.value === 'all-solutions') {
        // Show all solutions only (no industry cards for solution type filters)
        contentItems = [...solutions];
      } else {
        // Show solutions matching specific solution type only
        const solutionType = solutionTypeOptions.find(opt => opt.value === selectedFilter.value);
        contentItems = solutions.filter(solution => solution.category === solutionType?.label);
      }
    } else {
      contentItems = [...solutions];
    }
    
    return contentItems;
  };
  
  const filteredContent = getFilteredContent();
  
  // Keep backwards compatibility for badge counts
  const filteredSolutions = filteredContent.filter(item => item.type !== 'industry');

  // Handle deep linking from Home page industry selector
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const industry = urlParams.get('industry');
    
    if (industry) {
      // Find the industry option by matching the industry ID
      const industryOption = industryOptions.find(option => 
        option.value.toLowerCase() === industry.toLowerCase()
      );
      
      if (industryOption) {
        // Set filter to the specific industry
        setSelectedFilter({type: 'industry', value: industryOption.value});
        
        // Clean the URL after setting the filter
        window.history.replaceState({}, document.title, '/solutions');
      }
    }
  }, []);

  const handleViewDemo = (demoType: string) => {
    // Close the modal first
    setSelectedSolution(null);
    
    // Demo links removed - buttons now only close modal
    // Future: Add actual demo implementations here
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <MetaTags seo={seoConfig} />
      
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
              className="text-xl md:text-2xl text-[#94a3b8] max-w-4xl mx-auto mb-8"
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
              Discover Your Perfect AI Solution: Choose your industry to see tailored strategies, or browse by solution type to find specific capabilities across all sectors.
            </p>
          </div>
          
          {/* Unified Filter Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 px-4 sm:px-0">
            {/* All Filter */}
            <Button
              variant={selectedFilter.type === "all" ? "default" : "outline"}
              onClick={() => {
                setSelectedFilter({type: 'all', value: 'All'});
              }}
              className={`flex items-center px-4 sm:px-6 py-3 transition-all duration-200 ${
                selectedFilter.type === "all"
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "border-primary/20 text-foreground hover:border-primary hover:text-primary"
              }`}
              data-testid="filter-all"
            >
              All
            </Button>

            {/* Unified Solutions Dropdown */}
            <Popover open={unifiedDropdownOpen} onOpenChange={setUnifiedDropdownOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={selectedFilter.type !== "all" ? "default" : "outline"}
                  onClick={() => {
                    setUnifiedDropdownOpen(!unifiedDropdownOpen);
                  }}
                  className={`flex items-center px-4 sm:px-6 py-3 w-full sm:min-w-[280px] sm:w-auto transition-all duration-200 ${
                    selectedFilter.type !== "all"
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "border-primary/20 text-foreground hover:border-primary hover:text-primary"
                  }`}
                  data-testid="filter-unified"
                >
                  <Target className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="flex-grow text-left">
                    {selectedFilter.value === 'All' ? 'Industries & Solutions' : 
                     selectedFilter.type === 'industry' ? 
                       (selectedFilter.value === 'all-industries' ? 'All Industries' : 
                        industryOptions.find(opt => opt.value === selectedFilter.value)?.label || selectedFilter.value) :
                     selectedFilter.type === 'solution' ?
                       (selectedFilter.value === 'all-solutions' ? 'All Solutions' :
                        solutionTypeOptions.find(opt => opt.value === selectedFilter.value)?.label || selectedFilter.value) :
                     'Solutions'}
                  </span>
                  <Badge variant="secondary" className="ml-auto mr-2 text-xs">
                    {filteredSolutions.length}
                  </Badge>
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[500px] md:w-[600px] lg:w-[700px] max-w-none p-0" align="start" side="bottom" sideOffset={5} avoidCollisions={false}>
                <Command>
                  <CommandInput 
                    placeholder="Search industries or solutions..." 
                    value={filterSearch}
                    onValueChange={setFilterSearch}
                    className="h-12 sm:h-10 text-base sm:text-sm"
                  />
                  <CommandList className="max-h-[300px] sm:max-h-[350px] overflow-y-auto">
                    
                    {/* Two-column layout with responsive design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2 md:p-4">
                      {/* Left Column - Industries */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground px-2 py-1.5 uppercase tracking-wide border-b border-gray-200 mb-2">Industries</h3>
                        
                        {/* All Industries Option */}
                        <div
                          onClick={() => {
                            if (selectedFilter.value === "All Industries") {
                              setSelectedFilter({type: 'all', value: 'All'});
                            } else {
                              setSelectedFilter({type: 'industry', value: 'all-industries'});
                            }
                            setUnifiedDropdownOpen(false);
                            setFilterSearch("");
                          }}
                          className={`flex items-center justify-between gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] min-h-[48px] px-2 py-3 sm:py-2 rounded-md transition-colors ${
                            selectedFilter.type === 'industry' && selectedFilter.value === 'all-industries' ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Badge variant="secondary" className="text-lg font-bold">
                              21
                            </Badge>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              <span className="text-sm">Industries</span>
                            </div>
                          </div>
                        </div>

                        {/* Individual Industries */}
                        {industryOptions
                          .filter(option => {
                            const searchTerm = filterSearch.toLowerCase();
                            // Direct name match
                            const nameMatch = option.label.toLowerCase().includes(searchTerm);
                            // Correlation match - check if search term matches any related solutions
                            const correlations = industryCorrelations[option.value as keyof typeof industryCorrelations];
                            const correlationMatch = correlations && correlations.some((solution: string) => 
                              solution.toLowerCase().includes(searchTerm)
                            );
                            return nameMatch || correlationMatch;
                          })
                          .map((option) => {
                            const correlations = getCorrelationBadges(option.value, 'industry', 2);
                            return (
                              <div
                                key={option.value}
                                onClick={() => {
                                  if (selectedFilter.type === 'industry' && selectedFilter.value === option.value) {
                                    setSelectedFilter({type: 'all', value: 'All'});
                                  } else {
                                    setSelectedFilter({type: 'industry', value: option.value});
                                  }
                                  setUnifiedDropdownOpen(false);
                                  setFilterSearch("");
                                }}
                                className={`cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] min-h-[48px] px-2 py-3 sm:py-2 rounded-md transition-colors ${
                                  selectedFilter.type === 'industry' && selectedFilter.value === option.value ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    {option.icon}
                                    <span className="text-sm font-medium">{option.label}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">
                                    {getIndustrySolutionCount(option.value)} solutions
                                  </Badge>
                                </div>
                                {/* Correlation badges */}
                                <div className="flex flex-wrap gap-1 ml-6">
                                  {correlations.shown.map((solution: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs px-1.5 py-0.5 h-5 bg-blue-50 text-blue-700 border-blue-200">
                                      {solution}
                                    </Badge>
                                  ))}
                                  {correlations.remaining > 0 && (
                                    <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-5 bg-gray-50 text-gray-600 border-gray-200">
                                      +{correlations.remaining} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>

                      {/* Right Column - Solution Types */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground px-2 py-1.5 uppercase tracking-wide border-b border-gray-200 mb-2">Solution Types</h3>
                        
                        {/* All Solutions Option */}
                        <div
                          onClick={() => {
                            if (selectedFilter.value === "All Solutions") {
                              setSelectedFilter({type: 'all', value: 'All'});
                            } else {
                              setSelectedFilter({type: 'solution', value: 'all-solutions'});
                            }
                            setUnifiedDropdownOpen(false);
                            setFilterSearch("");
                          }}
                          className={`flex items-center justify-between gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] min-h-[48px] px-2 py-3 sm:py-2 rounded-md transition-colors ${
                            selectedFilter.type === 'solution' && selectedFilter.value === 'all-solutions' ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Badge variant="secondary" className="text-lg font-bold">
                              27
                            </Badge>
                            <div className="flex items-center gap-2">
                              <Cog className="h-4 w-4" />
                              <span className="text-sm">Solution Types</span>
                            </div>
                          </div>
                        </div>

                        {/* Individual Solution Types */}
                        {solutionTypeOptions
                          .filter(option => {
                            const searchTerm = filterSearch.toLowerCase();
                            // Direct name match
                            const nameMatch = option.label.toLowerCase().includes(searchTerm);
                            // Correlation match - check if search term matches any related industries
                            const correlations = solutionCorrelations[option.value as keyof typeof solutionCorrelations];
                            const correlationMatch = correlations && correlations.some((industry: string) => 
                              industry.toLowerCase().includes(searchTerm)
                            );
                            return nameMatch || correlationMatch;
                          })
                          .map((option) => {
                            const correlations = getCorrelationBadges(option.value, 'solution', 2);
                            return (
                              <div
                                key={option.value}
                                onClick={() => {
                                  if (selectedFilter.type === 'solution' && selectedFilter.value === option.value) {
                                    setSelectedFilter({type: 'all', value: 'All'});
                                  } else {
                                    setSelectedFilter({type: 'solution', value: option.value});
                                  }
                                  setUnifiedDropdownOpen(false);
                                  setFilterSearch("");
                                }}
                                className={`cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] min-h-[48px] px-2 py-3 sm:py-2 rounded-md transition-colors ${
                                  selectedFilter.type === 'solution' && selectedFilter.value === option.value ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    {option.icon}
                                    <span className="text-sm font-medium">{option.label}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">
                                    {getSolutionTypeSolutionCount(option.value)} solutions
                                  </Badge>
                                </div>
                                {/* Correlation badges */}
                                <div className="flex flex-wrap gap-1 ml-6">
                                  {correlations.shown.map((industry: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs px-1.5 py-0.5 h-5 bg-green-50 text-green-700 border-green-200">
                                      {industry}
                                    </Badge>
                                  ))}
                                  {correlations.remaining > 0 && (
                                    <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-5 bg-gray-50 text-gray-600 border-gray-200">
                                      +{correlations.remaining} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Solutions & Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredContent.map((item) => (
              item.type === 'industry' ? (
                // Industry Card Component
                <Card
                  key={item.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 h-full flex flex-col border-l-4 border-l-orange-500"
                  onClick={() => {
                    // Filter to show solutions for this industry
                    setSelectedFilter({type: 'industry', value: item.industryValue});
                  }}
                  data-testid={`industry-card-${item.industryValue}`}
                >
                  <CardContent className="p-3 md:p-6 flex flex-col h-full relative">
                    {/* Decorative gradient overlay */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl" />
                    
                    {/* Industry Badge - Positioned in upper right */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 md:px-3 py-0.5 md:py-1 h-6 md:h-7 shadow-md">
                        Industry Overview
                      </Badge>
                    </div>
                    
                    {/* Content Layout */}
                    <div className="flex flex-col h-full">
                      {/* Header Section */}
                      <div className="flex flex-col items-center md:items-start mb-3 md:mb-3">
                        {/* Icon */}
                        <div className="mb-2 md:mb-2">
                          <div className="text-orange-500 transition-transform duration-300 group-hover:scale-110 text-2xl md:text-xl flex justify-center">
                            {item.icon}
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-base md:text-xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors duration-300 line-clamp-2 text-center md:text-left">
                          {item.title}
                        </h3>
                        
                        {/* Category - Desktop only */}
                        <span className="text-xs md:text-sm font-medium uppercase tracking-wide text-orange-700 hidden md:inline mt-1">
                          {item.category}
                        </span>
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 flex flex-col text-left">
                        {/* Description */}
                        <div className="flex-grow mb-3 md:mb-4">
                          <p className="text-gray-700 line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-sm">
                            {item.shortDescription}
                          </p>
                        </div>
                        
                        {/* Key Applications */}
                        <div className="mb-3 md:mb-4">
                          <div className="flex flex-wrap gap-1 md:gap-2 justify-center md:justify-start">
                            {item.keyApplications.slice(0, 2).map((app: string, index: number) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs cursor-pointer hover:bg-orange-500 hover:text-white transition-colors px-2 md:px-2 py-1 md:py-1 border-orange-300 text-orange-700"
                              >
                                {app}
                              </Badge>
                            ))}
                            {item.keyApplications.length > 2 && (
                              <Badge 
                                variant="outline" 
                                className="text-xs cursor-pointer hover:bg-orange-500 hover:text-white transition-colors px-2 md:px-2 py-1 md:py-1 border-orange-300 text-orange-700"
                              >
                                +{item.keyApplications.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className="mt-auto pt-2">
                          <Button 
                            className="w-full group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 text-sm py-2 min-h-[44px] border-orange-300 text-orange-600 hover:border-orange-500"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFilter({type: 'industry', value: item.industryValue});
                            }}
                          >
                            Explore {item.title.split(' ')[0]} Solutions
                            <Eye className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // Solution Card Component (existing)
                <Card
                  key={item.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 h-full flex flex-col"
                  onClick={() => setSelectedSolution(item)}
                  data-testid={`solution-card-${item.id}`}
                >

                  <CardContent className="p-3 md:p-6 flex flex-col md:flex-col h-full relative">
                  {/* Decorative gradient overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
                  
                  {/* View Demo Button - Positioned in upper right */}
                  {item.hasDemo && (
                    <Button 
                      size="sm"
                      className="absolute top-2 right-2 md:top-4 md:right-4 bg-green-500 hover:bg-green-600 text-white text-xs px-2 md:px-3 py-0.5 md:py-1 h-6 md:h-7 shadow-md transition-all duration-200 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDemo(item.demoType || "");
                      }}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Demo
                    </Button>
                  )}
                  
                  {/* Mobile: Optimized layout with centered header, Desktop: Vertical layout */}
                  <div className="flex flex-col h-full">
                    {/* Mobile: Centered Icon and Title */}
                    <div className="flex flex-col md:flex-col items-center md:items-start mb-3 md:mb-3">
                      {/* Icon Section */}
                      <div className="mb-2 md:mb-2">
                        <div className="text-primary transition-transform duration-300 group-hover:scale-110 text-2xl md:text-xl flex justify-center">
                          {item.icon}
                        </div>
                      </div>
                      
                      {/* Title Section - Centered on mobile */}
                      <h3 className="text-base md:text-xl font-bold text-[#ff7033] group-hover:text-primary transition-colors duration-300 line-clamp-2 text-center md:text-left">
                        {item.title}
                      </h3>
                      
                      {/* Solution Type Badge - Replaces old subheading in same position */}
                      <div className="mt-1 flex justify-center md:justify-start">
                        <Badge 
                          variant="outline"
                          className="bg-[#ff7033]/10 text-[#ff7033] border-[#ff7033]/20 font-semibold px-2 sm:px-3 py-1 text-xs hover:bg-[#ff7033] hover:text-white transition-colors cursor-pointer min-h-[28px] flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Filter by this solution type
                            const solutionType = getPrimarySolutionType(item);
                            const matchingOption = solutionTypeOptions.find(opt => 
                              opt.label.toLowerCase().includes(solutionType.toLowerCase()) ||
                              solutionType.toLowerCase().includes(opt.label.toLowerCase())
                            );
                            if (matchingOption) {
                              setSelectedFilter({type: 'solution', value: matchingOption.value});
                            }
                          }}
                        >
                          {getPrimarySolutionType(item)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content Section - Left aligned */}
                    <div className="flex-1 flex flex-col text-left">
                  
                      {/* Description Section */}
                      <div className="flex-grow mb-3 md:mb-6">
                        <p className="text-muted-foreground line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-sm">
                          {item.shortDescription}
                        </p>
                      </div>
                      
                      {/* Technologies Section */}
                      <div className="mb-3 md:mb-6">
                        <div className="flex flex-wrap gap-1 md:gap-2 justify-center md:justify-start">
                      {item.technologies.slice(0, 2).map((tech: string, index: number) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs cursor-pointer hover:bg-[#ff7033] hover:text-white transition-colors px-2 md:px-2 py-1 md:py-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to resources page with filter
                            window.location.href = `/resources?tech=${encodeURIComponent(tech)}`;
                          }}
                        >
                          {tech}
                        </Badge>
                      ))}
                      {item.technologies.length > 2 && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs cursor-pointer hover:bg-[#ff7033] hover:text-white transition-colors px-2 md:px-2 py-1 md:py-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSolution(item);
                          }}
                        >
                          +{item.technologies.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                      {/* Action Button Section */}
                      <div className="mt-auto pt-2">
                        <Button 
                          className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 text-sm py-2 min-h-[44px]"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSolution(item);
                          }}
                        >
                          View Details
                          <Eye className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              )
            ))}
          </div>

          {/* Empty State */}
          {filteredContent.length === 0 && (
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
                    {selectedSolution.type === 'product' ? 'Applicable Industries' : 'Solutions'}
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
              
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
                {selectedSolution.hasDemo ? (
                  <>
                    <Button 
                      size="lg" 
                      className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-sm font-semibold min-h-[48px]"
                      onClick={() => handleViewDemo(selectedSolution.demoType || "")}
                    >
                      View {selectedSolution.demoType} Demo
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 text-sm font-semibold min-h-[48px]" 
                      onClick={() => window.location.href = '/request'}
                    >
                      Request Custom Demo
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="w-full sm:flex-1 bg-primary hover:bg-primary/90 px-6 py-3 text-sm font-semibold min-h-[48px]" 
                      onClick={() => window.location.href = '/request'}
                    >
                      Request Demo
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 text-sm font-semibold min-h-[48px]" 
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
    </>
  );
};

export default Solutions;