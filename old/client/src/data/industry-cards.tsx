import React from "react";
import { Heart, DollarSign, Factory, ShoppingCart, Monitor, GraduationCap, Home as HomeIcon, Scale, Truck, Hotel, Zap, Building2, ShieldCheck, Leaf, Film, Gamepad2, Trophy } from "lucide-react";

export interface IndustryCard {
  id: string;
  type: "industry";
  title: string;
  category: "Industry";
  icon: React.ReactElement;
  industryValue: string;
  shortDescription: string;
  fullDescription: string;
  keyApplications: string[];
  primarySolutions: string[];
  metrics: Record<string, string>;
  benefits: string[];
}

// Industry Cards Array - 21 industry overview cards
export const industryCards: IndustryCard[] = [
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
    icon: <Monitor className="text-primary text-xl" />,
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

// Helper functions
export const getIndustryCardByValue = (industryValue: string): IndustryCard | undefined => {
  return industryCards.find(card => card.industryValue === industryValue);
};

export const getIndustryCardsByPrimarySolution = (solutionType: string): IndustryCard[] => {
  return industryCards.filter(card => 
    card.primarySolutions.includes(solutionType)
  );
};