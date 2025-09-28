import React from "react";
import { Heart, DollarSign, Factory, ShoppingCart, Monitor, GraduationCap, Home as HomeIcon, Scale, Truck, Hotel, Zap, Building2, ShieldCheck, Leaf, Film, Gamepad2, Trophy } from "lucide-react";
import { Microscope, ClipboardList, CheckCircle, TrendingUp, Shield, LineChart, UserCheck, Wrench, Eye, Package, Settings, Target, BarChart, Coins, Globe, BookOpen, Clipboard, PenTool, FileText, Users, Search, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Industry {
  id: string;
  name: string;
  icon: React.ReactElement;
  description?: string;
  painPoints?: string[];
  relatedSolutionTypes?: string[];
}

export interface IndustrySolution {
  name: string;
  icon: React.ReactElement;
  painPoint: string;
  description: string;
  sourceUrl: string;
}

export interface IndustryOption {
  value: string;
  label: string;
  icon: React.ReactElement;
}

// Industry icon mapping for reusability
export const industryIcons: Record<string, React.ReactElement> = {
  healthcare: <Heart className="h-4 w-4" />,
  finance: <DollarSign className="h-4 w-4" />,
  manufacturing: <Factory className="h-4 w-4" />,
  retail: <ShoppingCart className="h-4 w-4" />,
  technology: <Monitor className="h-4 w-4" />,
  education: <GraduationCap className="h-4 w-4" />,
  "real-estate": <HomeIcon className="h-4 w-4" />,
  legal: <Scale className="h-4 w-4" />,
  logistics: <Truck className="h-4 w-4" />,
  hospitality: <Hotel className="h-4 w-4" />,
  energy: <Zap className="h-4 w-4" />,
  government: <Building2 className="h-4 w-4" />,
  insurance: <ShieldCheck className="h-4 w-4" />,
  automotive: <Factory className="h-4 w-4" />,
  agriculture: <Leaf className="h-4 w-4" />,
  media: <Film className="h-4 w-4" />,
  gaming: <Gamepad2 className="h-4 w-4" />,
  esports: <Trophy className="h-4 w-4" />,
  nonprofit: <Heart className="h-4 w-4" />,
  telecommunications: <Building2 className="h-4 w-4" />,
  transportation: <Truck className="h-4 w-4" />
};

// Industry options for dropdowns and filters
export const industryOptions: IndustryOption[] = [
  { value: "healthcare", label: "Healthcare", icon: industryIcons.healthcare },
  { value: "finance", label: "Financial Services", icon: industryIcons.finance },
  { value: "manufacturing", label: "Manufacturing", icon: industryIcons.manufacturing },
  { value: "education", label: "Education", icon: industryIcons.education },
  { value: "logistics", label: "Logistics & Supply Chain", icon: industryIcons.logistics },
  { value: "hospitality", label: "Hospitality & Tourism", icon: industryIcons.hospitality },
  { value: "energy", label: "Energy & Utilities", icon: industryIcons.energy },
  { value: "nonprofit", label: "Non-profit Organizations", icon: industryIcons.nonprofit },
  { value: "media", label: "Media & Entertainment", icon: industryIcons.media },
  { value: "telecommunications", label: "Telecommunications", icon: industryIcons.telecommunications },
  { value: "government", label: "Government & Public Sector", icon: industryIcons.government },
  { value: "legal", label: "Legal", icon: industryIcons.legal },
  { value: "real-estate", label: "Real Estate", icon: industryIcons["real-estate"] },
  { value: "technology", label: "Technology", icon: industryIcons.technology },
  { value: "retail", label: "Retail", icon: industryIcons.retail },
  { value: "insurance", label: "Insurance", icon: industryIcons.insurance },
  { value: "automotive", label: "Automotive", icon: industryIcons.automotive },
  { value: "agriculture", label: "Agriculture", icon: industryIcons.agriculture },
  { value: "gaming", label: "Gaming", icon: industryIcons.gaming },
  { value: "esports", label: "eSports", icon: industryIcons.esports },
  { value: "transportation", label: "Transportation", icon: industryIcons.transportation }
];

// Home page industry display list (subset of all industries)
export const homePageIndustries: IndustryOption[] = [
  { value: "healthcare", label: "Healthcare", icon: <Heart className="w-8 h-8" /> },
  { value: "finance", label: "Finance", icon: <DollarSign className="w-8 h-8" /> },
  { value: "manufacturing", label: "Manufacturing", icon: <Factory className="w-8 h-8" /> },
  { value: "retail", label: "Retail", icon: <ShoppingCart className="w-8 h-8" /> },
  { value: "technology", label: "Technology", icon: <Monitor className="w-8 h-8" /> },
  { value: "education", label: "Education", icon: <GraduationCap className="w-8 h-8" /> },
  { value: "real-estate", label: "Real Estate", icon: <HomeIcon className="w-8 h-8" /> },
  { value: "legal", label: "Legal", icon: <Scale className="w-8 h-8" /> }
];

// Industry-specific solutions with pain points and sources
export const industrySpecificSolutions: Record<string, IndustrySolution[]> = {
  healthcare: [
    { 
      name: "AI-powered diagnostics and imaging analysis", 
      icon: <Microscope className="w-8 h-8" />, 
      painPoint: "Physicians spend up to 49% of their work time on EHR data entry and desk work instead of interacting with patients", 
      description: "Use AI-powered natural language processing tools to automate clinical note-taking and EHR input, freeing clinicians for more patient care", 
      sourceUrl: "https://www.aha.org/news/headline/2016-09-08-study-physicians-spend-nearly-twice-much-time-ehrdesk-work-patients" 
    },
    { 
      name: "Patient data management and EHR integration", 
      icon: <ClipboardList className="w-8 h-8" />, 
      painPoint: "An estimated 12 million Americans are misdiagnosed each year, leading to patient safety risks and unnecessary treatments", 
      description: "Implement AI-driven diagnostic imaging platforms that analyze scans and medical records to reduce errors and catch overlooked conditions", 
      sourceUrl: "https://www.cbsnews.com/news/12-million-americans-misdiagnosed-each-year-study-says/" 
    },
    { 
      name: "Automated compliance and regulatory reporting", 
      icon: <CheckCircle className="w-8 h-8" />, 
      painPoint: "Healthcare providers face persistent scheduling inefficiencies and high patient no-show rates, disrupting care and reducing revenue", 
      description: "Deploy machine learning models to optimize scheduling and predict no-shows, enabling automated reminders and schedule adjustments", 
      sourceUrl: "https://www.himssconference.com/five-challenges-facing-healthcare-in-2025/" 
    },
    { 
      name: "Predictive analytics for patient outcomes", 
      icon: <TrendingUp className="w-8 h-8" />, 
      painPoint: "The healthcare sector faces a rising number of cyberattacks and HIPAA violations, putting large volumes of patient data at risk", 
      description: "Utilize AI security platforms to continuously monitor for threats, detect suspicious activity, and automate responses to breaches", 
      sourceUrl: "https://www.hipaajournal.com/what-are-the-penalties-for-hipaa-violations-7096/" 
    }
  ],
  finance: [
    { 
      name: "Real-time fraud detection and prevention", 
      icon: <Shield className="w-8 h-8" />, 
      painPoint: "Fraudulent transactions remain difficult to detect quickly, with sophisticated attacks bypassing manual review processes", 
      description: "Implement AI-powered fraud detection that analyzes transaction patterns in real time, blocking threats as they arise", 
      sourceUrl: "https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-outlooks.html" 
    },
    { 
      name: "Automated risk assessment and reporting", 
      icon: <TrendingUp className="w-8 h-8" />, 
      painPoint: "Constantly shifting regulations and compliance requirements overwhelm manual monitoring and reporting teams", 
      description: "Deploy regulatory technology (RegTech) solutions with AI to track changes, monitor for compliance risks, and automate documentation", 
      sourceUrl: "https://www.slalom.com/us/en/insights/financial-services-outlook-2025" 
    }, 
    { 
      name: "Algorithmic trading and portfolio optimization", 
      icon: <LineChart className="w-8 h-8" />, 
      painPoint: "Customers expect digital-first, personalized experiences, but legacy customer service solutions often fall short", 
      description: "Launch AI conversational agents (chatbots and virtual assistants) to deliver speedy, personalized, 24/7 support at scale", 
      sourceUrl: "https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-outlooks.html" 
    }, 
    { 
      name: "Customer behavior analytics and personalization", 
      icon: <UserCheck className="w-8 h-8" />, 
      painPoint: "Manual reconciliation and financial reporting are time-consuming and error-prone, slowing down critical business processes", 
      description: "Use robotic process automation with AI to reconcile transactions and prepare reports automatically, increasing speed and accuracy", 
      sourceUrl: "https://www.morganstanley.com/insights/articles/financial-sector-investing-trends-2025" 
    }
  ],
  manufacturing: [
    { 
      name: "Predictive maintenance and equipment monitoring", 
      icon: <Wrench className="w-8 h-8" />, 
      painPoint: "Global supply chain disruptions lead to inventory shortages and delivery unpredictability", 
      description: "Deploy AI-based demand forecasting and supply chain optimization engines to proactively identify bottlenecks and reroute resources", 
      sourceUrl: "https://www.todaysmedicaldevelopments.com/news/10-challenges-facing-the-manufacturing-industry-in-2025/" 
    }, 
    { 
      name: "Quality control automation with computer vision", 
      icon: <Eye className="w-8 h-8" />, 
      painPoint: "Unplanned equipment downtime drives up costs and disrupts production schedules", 
      description: "Integrate predictive maintenance systems that use AI to analyze equipment data and schedule repairs ahead of failures", 
      sourceUrl: "https://nam.org/wp-content/uploads/securepdfs/2025/01/NAM-2025-Manufacturing-Trends.pdf" 
    }, 
    { 
      name: "Supply chain optimization and demand forecasting", 
      icon: <Package className="w-8 h-8" />, 
      painPoint: "Manufacturing networks are increasingly targeted by ransomware and cyber intrusion", 
      description: "Install AI cybersecurity tools to detect threats, block attacks, and automatically isolate infected machines in real time", 
      sourceUrl: "https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/manufacturing-industry-outlook.html" 
    }, 
    { 
      name: "Production workflow automation", 
      icon: <Settings className="w-8 h-8" />, 
      painPoint: "Vast amounts of production and sensor data go unanalyzed, missing opportunities for improvement", 
      description: "Apply AI analytics platforms that interpret real-time data, recommending optimization actions and reducing waste", 
      sourceUrl: "https://www.todaysmedicaldevelopments.com/news/10-challenges-facing-the-manufacturing-industry-in-2025/" 
    }
  ],
  retail: [
    { 
      name: "Customer analytics and personalized recommendations", 
      icon: <Target className="w-8 h-8" />, 
      painPoint: "Long checkout times cause a significant percentage of customers to abandon purchases, hurting revenue", 
      description: "Implement frictionless checkout and AI-assisted self-service kiosks to shorten lines and enhance in-store experience", 
      sourceUrl: "https://www.happy-or-not.com/en/insights/blog/top-3-biggest-retail-operations-pain-points-2025/" 
    }, 
    { 
      name: "Inventory management and demand prediction", 
      icon: <BarChart className="w-8 h-8" />, 
      painPoint: "Inventory management is often reactive, causing both overstock and out-of-stock situations", 
      description: "Employ AI inventory systems for real-time demand forecasting and automated reordering to maintain optimal stock levels", 
      sourceUrl: "https://voyado.com/resources/blog/retail-challenges/" 
    }, 
    { 
      name: "Dynamic pricing optimization", 
      icon: <Coins className="w-8 h-8" />, 
      painPoint: "Retail marketing is struggling to target the right customers and measure campaign ROI efficiently", 
      description: "Use AI-powered marketing platforms that segment customers and optimize campaigns for better conversions and spend efficiency", 
      sourceUrl: "https://www.csgtalent.com/insights/blog/us-consumer-trends-retail-challenges-2025/" 
    }, 
    { 
      name: "Omnichannel customer experience automation", 
      icon: <Globe className="w-8 h-8" />, 
      painPoint: "Increased payment fraud and data breaches threaten customer trust and store profitability", 
      description: "Install advanced AI fraud detection and payment security layers to monitor and respond to threats in real time", 
      sourceUrl: "https://bankwithchoice.com/top-retail-industry-challenges-for-2025/" 
    }
  ],
  technology: [
    { 
      name: "DevOps automation and CI/CD optimization", 
      icon: <Zap className="w-8 h-8" />, 
      painPoint: "Companies struggle with slow, high-risk AI adoption due to lack of expertise and governance complexity", 
      description: "Use specialized AI frameworks and explainability tools that enable safer, faster, and more compliant deployments", 
      sourceUrl: "https://www.tsia.com/blog/the-state-of-the-technology-industry-2025-keys-trends-and-challenges" 
    }, 
    { 
      name: "AI agent development and deployment", 
      icon: <Monitor className="w-8 h-8" />, 
      painPoint: "Legacy technical debt slows innovation and inflates maintenance costs", 
      description: "Leverage AI-powered code analysis tools to identify, refactor, and modernize legacy systems", 
      sourceUrl: "https://gtia.org/blog/top-10-challenges-facing-technology-in-2025" 
    }, 
    { 
      name: "Cloud infrastructure and scaling solutions", 
      icon: <Globe className="w-8 h-8" />, 
      painPoint: "Difficulty matching limited tech talent to the fastest-growing projects and skill sets", 
      description: "Deploy AI workforce management tools for optimal talent allocation, project assignment, and tailored upskilling", 
      sourceUrl: "https://www.tsia.com/blog/the-state-of-the-technology-industry-2025-keys-trends-and-challenges" 
    }, 
    { 
      name: "Data pipeline automation and analytics", 
      icon: <TrendingUp className="w-8 h-8" />, 
      painPoint: "Margins erode as static pricing models cannot respond to changing customer value or competition", 
      description: "Integrate AI-driven pricing engines that dynamically adjust pricing in real time based on market and usage data", 
      sourceUrl: "https://www.tsia.com/blog/the-state-of-the-technology-industry-2025-keys-trends-and-challenges" 
    }
  ],
  education: [
    { 
      name: "Learning analytics and student performance insights", 
      icon: <BookOpen className="w-8 h-8" />, 
      painPoint: "One-size-fits-all curricula lead to disengaged students and unchecked learning gaps", 
      description: "Implement adaptive learning platforms that personalize instruction based on ongoing student performance and needs", 
      sourceUrl: "https://www.elevatek12.com/blog/elevate-in-action/american-education-issues/" 
    }, 
    { 
      name: "Administrative workflow automation", 
      icon: <Clipboard className="w-8 h-8" />, 
      painPoint: "Teachers are overwhelmed by repetitive administrative work, sapping instructional time", 
      description: "Automate grading, lesson planning, and parent communication with AI-driven teacher tools", 
      sourceUrl: "https://www.elevatek12.com/blog/elevate-in-action/american-education-issues/" 
    }, 
    { 
      name: "Personalized learning path recommendations", 
      icon: <Target className="w-8 h-8" />, 
      painPoint: "Many schools cannot fill high-demand teaching roles, especially in STEM and special education", 
      description: "Provide virtual teaching assistants and AI tutors to supplement teaching staff and deliver targeted support", 
      sourceUrl: "https://www.elevatek12.com/blog/elevate-in-action/american-education-issues/" 
    }, 
    { 
      name: "Automated grading and assessment tools", 
      icon: <PenTool className="w-8 h-8" />, 
      painPoint: "School leaders lack real-time visibility into student progress and intervention needs", 
      description: "Use AI learning analytics dashboards that provide actionable insights for proactive interventions", 
      sourceUrl: "https://www.elevatek12.com/blog/elevate-in-action/american-education-issues/" 
    }
  ],
  "real-estate": [
    { 
      name: "Property valuation and market analysis", 
      icon: <Building2 className="w-8 h-8" />, 
      painPoint: "Property and lease data is fragmented across multiple systems, causing delays and valuation errors", 
      description: "Employ centralized AI data platforms to integrate, clean, and analyze property data in real time", 
      sourceUrl: "https://www.morganstanley.com/insights/articles/ai-in-real-estate-2025" 
    }, 
    { 
      name: "Automated property management workflows", 
      icon: <FileText className="w-8 h-8" />, 
      painPoint: "Lease, transaction, and document management is highly manual and error prone", 
      description: "Use AI-driven OCR and workflow automation to digitize documents and automate lease management", 
      sourceUrl: "https://martincommercial.com/navigating-commercial-real-estate-in-2025-challenges-stabilization-and-strategic-shifts/" 
    }, 
    { 
      name: "Lead generation and customer relationship management", 
      icon: <Users className="w-8 h-8" />, 
      painPoint: "Matching tenants to properties is inefficient, leading to high vacancy and churn", 
      description: "Leverage AI-powered matching engines to connect tenants with properties that fit their unique needs", 
      sourceUrl: "https://martincommercial.com/navigating-commercial-real-estate-in-2025-challenges-stabilization-and-strategic-shifts/" 
    }, 
    { 
      name: "Market trend prediction and investment insights", 
      icon: <TrendingUp className="w-8 h-8" />, 
      painPoint: "Smart buildings are increasingly targeted by cyber threats, risking business continuity", 
      description: "Deploy AI smart security systems that detect and respond to physical and digital building threats automatically", 
      sourceUrl: "https://www.morganstanley.com/insights/articles/ai-in-real-estate-2025" 
    }
  ],
  legal: [
    { 
      name: "Document automation and contract analysis", 
      icon: <FileText className="w-8 h-8" />, 
      painPoint: "Reviewing legal contracts for risk and compliance is costly and time-consuming", 
      description: "Use AI to analyze contracts, highlight risks, and suggest clause modifications, cutting review cycles in half", 
      sourceUrl: "https://www.bestlawyers.com/article/2025-legal-outlook-lawyer-survey-results/6477" 
    }, 
    { 
      name: "Case management and workflow optimization", 
      icon: <Scale className="w-8 h-8" />, 
      painPoint: "High volumes of litigation evidence require time-intensive manual review and discovery", 
      description: "Employ AI eDiscovery tools to automatically sort, summarize, and flag relevance in large document sets", 
      sourceUrl: "https://www.bestlawyers.com/article/2025-legal-outlook-lawyer-survey-results/6477" 
    }, 
    { 
      name: "Legal research and precedent discovery", 
      icon: <Search className="w-8 h-8" />, 
      painPoint: "Law firms face growing threats of cyber breaches and data loss, risking sensitive case files", 
      description: "Integrate AI cybersecurity monitoring that scans for threats and automates compliance reporting", 
      sourceUrl: "https://www.lawsociety.org.uk/topics/business-management/partner-content/five-challenges-for-the-legal-sector-in-2025" 
    }, 
    { 
      name: "Compliance monitoring and risk assessment", 
      icon: <ShieldAlert className="w-8 h-8" />, 
      painPoint: "Manual, error-prone management of litigation deadlines and filings increases case risk", 
      description: "Deploy AI-based calendaring and automation to track filings, send alerts, and ensure every deadline is met", 
      sourceUrl: "https://pro.bloomberglaw.com/insights/business-of-law/legal-trends/" 
    }
  ]
};

// Industry-Solution correlation mappings
export const industryCorrelations: Record<string, string[]> = {
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
  telecommunications: ["Machine Learning & Analytics", "AI Security", "Process Automation", "Conversational AI", "Local AI Deployment", "Natural Language Processing"],
  transportation: ["Machine Learning & Analytics", "Non-AI Solutions", "Process Automation", "Computer Vision", "AI Security", "Local AI Deployment"]
};

// Helper functions
export const getIndustryById = (id: string): IndustryOption | undefined => {
  return industryOptions.find(industry => industry.value === id);
};

export const getIndustryIcon = (id: string): React.ReactElement | null => {
  return industryIcons[id] || null;
};

export const getIndustrySolutions = (industryId: string): IndustrySolution[] => {
  return industrySpecificSolutions[industryId] || [];
};

export const getIndustryCorrelations = (industryId: string): string[] => {
  return industryCorrelations[industryId] || [];
};