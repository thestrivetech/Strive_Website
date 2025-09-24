import React from "react";
import { ShieldCheck, Eye, Bot, Brain, Cloud, BarChart, Target, Cog, Cpu } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Solution {
  id: number;
  title: string;
  category: string;
  type: "product" | "platform" | "service" | "infrastructure";
  icon: React.ReactElement;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
  hasDemo: boolean;
  demoType?: string;
  metrics: Record<string, string>;
}

export interface SolutionTypeOption {
  value: string;
  label: string;
  icon: React.ReactElement;
}

// Solution type options for filtering
export const solutionTypeOptions: SolutionTypeOption[] = [
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

// Solution-Industry correlation mappings  
export const solutionCorrelations: Record<string, string[]> = {
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

// Complete solutions data
export const solutions: Solution[] = [
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

// Helper functions
export const getSolutionById = (id: number): Solution | undefined => {
  return solutions.find(solution => solution.id === id);
};

export const getSolutionsByCategory = (category: string): Solution[] => {
  return solutions.filter(solution => solution.category === category);
};

export const getSolutionsByTechnology = (technology: string): Solution[] => {
  return solutions.filter(solution => 
    solution.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

export const getSolutionTypeByValue = (value: string): SolutionTypeOption | undefined => {
  return solutionTypeOptions.find(option => option.value === value);
};

export const getCorrelatedIndustries = (solutionType: string): string[] => {
  return solutionCorrelations[solutionType] || [];
};