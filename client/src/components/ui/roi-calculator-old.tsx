import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Clock, Stethoscope, CreditCard, ShoppingCart, Factory, Cpu, GraduationCap, Home as HomeIcon, Scale, Hotel, Zap, Truck, Leaf, Film, Heart, Building2, Globe, Briefcase, Gamepad2, Trophy, Laptop, ChevronDown, ShieldCheck, Search, Building, Landmark, Train, Shield, Radio, Tractor, Users, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { industryStatistics, roiMethodology } from "@/data/industry-statistics";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { roiCalculator } from "@/lib/roi-calculator";
import type { IndustryName } from "@/types/roi-calculator";

interface IndustryData {
  [key: string]: {
    name: string;
    icon: JSX.Element;
    baseROI: number;
    services: {
      [key: string]: {
        name: string;
        multiplier: number;
        timeSaving: number;
      };
    };
  };
}

const industryData: IndustryData = {
  /* 
   * ROI CALCULATOR MULTIPLIER SETUP (Session 22 - Updated 2024-09-10)
   * 
   * All Industries - Cross-sector averages:
   * - Base ROI: 3.6x (average across all industries) 
   * - Process Automation: 3.5x (broad business process optimization)
   * - Data Analytics: 3.3x (insights and decision support)
   * - AI Solutions: 4.0x (advanced AI implementations)
   * - Compliance & Security: 3.0x (regulatory and security automation)
   */
  "all-industries": {
    name: "All Industries",
    icon: <Globe className="h-4 w-4" />,
    baseROI: 3.6, // Cross-industry average
    services: {
      automation: { name: "Process Automation", multiplier: 3.5, timeSaving: 50 }, // General business process optimization
      analytics: { name: "Data Analytics", multiplier: 3.3, timeSaving: 45 }, // Business intelligence and insights
      ai: { name: "AI Solutions", multiplier: 4.0, timeSaving: 55 }, // Advanced AI implementations
      compliance: { name: "Compliance & Security", multiplier: 3.0, timeSaving: 40 }, // Regulatory and security automation
    },
  },
  /* 
   * Healthcare Industry Multipliers:
   * - Base ROI: 3.2x (McKinsey research baseline)
   * - Clinical Diagnostics AI: 3.2x (matches baseline for core diagnostics)
   * - EHR Automation: 2.8x (moderate savings on documentation)
   * - Patient Care AI: 4.1x (highest ROI due to readmission prevention)
   * - HIPAA Compliance: 3.8x (HIGH VALUE - prevents avg $2.5M penalties)
   * 
   * Note: HIPAA multiplier increased from 2.1 to 3.8 in Session 21 to fix
   * issue where selecting compliance was reducing overall ROI instead of adding value.
   * Compliance solutions should always ADD significant value, not reduce it.
   */
  healthcare: {
    name: "Healthcare",
    icon: <Stethoscope className="h-4 w-4" />,
    baseROI: 3.5, // Workato: 283% ROI in 6 months, McKinsey healthcare AI baseline
    services: {
      automation: { name: "Clinical Diagnostics AI", multiplier: 3.2, timeSaving: 45 }, // Nature Medicine: 85% accuracy improvement
      analytics: { name: "EHR Automation", multiplier: 3.0, timeSaving: 49 }, // 49.2% time reduction (Annals Internal Medicine)
      ai: { name: "Patient Care AI", multiplier: 4.2, timeSaving: 35 }, // Readmission prevention + care optimization
      compliance: { name: "HIPAA Compliance Automation", multiplier: 4.8, timeSaving: 75 }, // Prevents $9.77M breach + automation gains
    },
  },
  finance: {
    name: "Financial Services",
    icon: <CreditCard className="h-4 w-4" />,
    baseROI: 4.0, // Gartner 2024: 58% using AI, strong ROI + 57min daily savings
    services: {
      automation: { name: "Risk Assessment Automation", multiplier: 3.8, timeSaving: 95 }, // 72hr to 5min processing
      analytics: { name: "Algorithmic Trading AI", multiplier: 4.2, timeSaving: 60 }, // 60% better timing
      ai: { name: "Fraud Detection AI", multiplier: 5.1, timeSaving: 95 }, // 95% fraud prevention rate
      compliance: { name: "RegTech Compliance", multiplier: 2.9, timeSaving: 40 }, // FSOC compliance automation
    },
  },
  retail: {
    name: "Retail",
    icon: <ShoppingCart className="h-4 w-4" />,
    baseROI: 3.5, // 300-400% ROI after first year (LEAFIO)
    services: {
      automation: { name: "Inventory Optimization AI", multiplier: 3.5, timeSaving: 65 }, // 65% stockout reduction
      analytics: { name: "Customer Personalization", multiplier: 3.4, timeSaving: 41 }, // 41% CTR increase
      ai: { name: "Demand Forecasting AI", multiplier: 3.9, timeSaving: 50 }, // 30-50% error reduction
      compliance: { name: "Omnichannel Automation", multiplier: 2.8, timeSaving: 35 }, // 18% revenue increase
    },
  },
  manufacturing: {
    name: "Manufacturing", 
    icon: <Factory className="h-4 w-4" />,
    baseROI: 4.0, // McKinsey: 10-40% cost reduction
    services: {
      automation: { name: "Production Line Automation", multiplier: 4.0, timeSaving: 62 }, // 62min daily savings (McKinsey 2024)
      analytics: { name: "Quality Control Vision AI", multiplier: 3.5, timeSaving: 50 }, // 2-5% defect rate reduction to <0.1%
      ai: { name: "Predictive Maintenance AI", multiplier: 4.5, timeSaving: 50 }, // $50k/hour downtime prevention
      compliance: { name: "Safety Monitoring AI", multiplier: 2.8, timeSaving: 25 }, // Real-time safety compliance
    },
  },
  technology: {
    name: "Technology",
    icon: <Cpu className="h-4 w-4" />,
    baseROI: 4.5, // McKinsey 2024: Highest impact industry at 9% revenue increase
    services: {
      automation: { name: "CI/CD & DevOps Automation", multiplier: 4.0, timeSaving: 66 }, // 66min daily savings (McKinsey 2024)
      analytics: { name: "Cloud Cost Optimization", multiplier: 4.2, timeSaving: 30 }, // 30% cloud waste elimination (Flexera 2024)
      ai: { name: "AI Agent Development", multiplier: 4.8, timeSaving: 60 }, // Tech sector highest impact per McKinsey
      compliance: { name: "Security & Threat Detection", multiplier: 3.1, timeSaving: 95 }, // Real-time threat prevention
    },
  },
  education: {
    name: "Education",
    icon: <GraduationCap className="h-4 w-4" />,
    baseROI: 3.0, // Improved student outcomes and efficiency
    services: {
      automation: { name: "Administrative Task Automation", multiplier: 2.9, timeSaving: 60 }, // 60% less time on paperwork
      analytics: { name: "Student Performance Analytics", multiplier: 3.1, timeSaving: 85 }, // 85% earlier at-risk identification
      ai: { name: "Personalized Learning Paths", multiplier: 3.8, timeSaving: 70 }, // 70% better outcomes
      compliance: { name: "Automated Grading & Assessment", multiplier: 2.4, timeSaving: 95 }, // Instant feedback vs 2 weeks
    },
  },
  "real-estate": {
    name: "Real Estate",
    icon: <HomeIcon className="h-4 w-4" />,
    baseROI: 3.4, // High ROI from faster transactions and better valuations
    services: {
      automation: { name: "Property Management Automation", multiplier: 3.0, timeSaving: 60 }, // 60% faster property filling
      analytics: { name: "Market Trend Prediction", multiplier: 3.2, timeSaving: 30 }, // 30 days earlier opportunity spotting
      ai: { name: "AI Property Valuation", multiplier: 3.7, timeSaving: 98 }, // 98% accuracy vs 85% manual
      compliance: { name: "Lead Nurturing Automation", multiplier: 2.7, timeSaving: 300 }, // 3x conversion rate
    },
  },
  legal: {
    name: "Legal",
    icon: <Scale className="h-4 w-4" />,
    baseROI: 3.8, // High value from time savings and risk reduction
    services: {
      automation: { name: "Contract Analysis & Automation", multiplier: 3.4, timeSaving: 95 }, // 20hr to 30min review
      analytics: { name: "Case Management System", multiplier: 3.0, timeSaving: 100 }, // Never miss deadlines
      ai: { name: "AI Legal Research", multiplier: 4.0, timeSaving: 99 }, // 50+ hours to seconds
      compliance: { name: "Compliance Risk Prevention", multiplier: 3.3, timeSaving: 100 }, // Prevent $4M avg fines
    },
  },
  // Additional industries for broader coverage
  hospitality: {
    name: "Hospitality & Tourism",
    icon: <Hotel className="h-4 w-4" />,
    baseROI: 3.2, // Strong returns from personalization and automation
    services: {
      automation: { name: "Smart Booking & Check-in", multiplier: 3.1, timeSaving: 75 }, // 75% faster check-in
      analytics: { name: "Guest Experience Analytics", multiplier: 2.9, timeSaving: 40 }, // Personalized experiences
      ai: { name: "Dynamic Revenue Management", multiplier: 3.6, timeSaving: 45 }, // Optimize pricing in real-time
      compliance: { name: "Operations & Staff Optimization", multiplier: 2.5, timeSaving: 35 }, // Reduce labor costs 35%
    },
  },
  energy: {
    name: "Energy & Utilities",
    icon: <Zap className="h-4 w-4" />,
    baseROI: 3.8, // High ROI from grid optimization and predictive maintenance
    services: {
      automation: { name: "Smart Grid Automation", multiplier: 3.9, timeSaving: 50 }, // 50% efficiency improvement
      analytics: { name: "Energy Consumption Analytics", multiplier: 3.3, timeSaving: 40 }, // Reduce waste 40%
      ai: { name: "Predictive Grid Maintenance", multiplier: 4.5, timeSaving: 85 }, // 85% outage prevention
      compliance: { name: "Regulatory Reporting AI", multiplier: 2.8, timeSaving: 30 }, // Automated compliance
    },
  },
  logistics: {
    name: "Transportation & Logistics",
    icon: <Truck className="h-4 w-4" />,
    baseROI: 3.5, // Strong ROI from route optimization and reduced delays
    services: {
      automation: { name: "AI Route Optimization", multiplier: 3.5, timeSaving: 45 }, // 45% fuel savings
      analytics: { name: "Fleet Performance Analytics", multiplier: 3.2, timeSaving: 40 }, // Real-time fleet tracking
      ai: { name: "Predictive Demand Planning", multiplier: 3.8, timeSaving: 60 }, // 60% better capacity utilization
      compliance: { name: "Supply Chain Visibility", multiplier: 2.9, timeSaving: 50 }, // End-to-end transparency
    },
  },
  agriculture: {
    name: "Agriculture & Food",
    icon: <Leaf className="h-4 w-4" />,
    baseROI: 3.0, // Improved yields and reduced waste
    services: {
      automation: { name: "Precision Farming Automation", multiplier: 3.0, timeSaving: 40 }, // 40% labor reduction
      analytics: { name: "Crop Health Monitoring", multiplier: 2.8, timeSaving: 50 }, // 50% faster issue detection
      ai: { name: "AI Yield Optimization", multiplier: 3.4, timeSaving: 30 }, // 30% yield increase
      compliance: { name: "Food Safety & Traceability", multiplier: 2.4, timeSaving: 100 }, // Complete tracking
    },
  },
  media: {
    name: "Media & Entertainment",
    icon: <Film className="h-4 w-4" />,
    baseROI: 3.3, // High engagement and monetization improvements
    services: {
      automation: { name: "Content Distribution AI", multiplier: 3.2, timeSaving: 70 }, // 70% faster distribution
      analytics: { name: "Audience Engagement Analytics", multiplier: 3.5, timeSaving: 45 }, // 45% better targeting
      ai: { name: "AI Content Personalization", multiplier: 3.9, timeSaving: 60 }, // 60% engagement increase
      compliance: { name: "Digital Rights Management", multiplier: 2.6, timeSaving: 95 }, // Automated rights tracking
    },
  },
  nonprofit: {
    name: "Non-profit Organizations",
    icon: <Heart className="h-4 w-4" />,
    baseROI: 2.8, // Value from increased donations and reduced overhead
    services: {
      automation: { name: "Donor Engagement Automation", multiplier: 2.6, timeSaving: 50 }, // 50% more touchpoints
      analytics: { name: "Impact Measurement Analytics", multiplier: 2.4, timeSaving: 40 }, // Better grant reporting
      ai: { name: "AI Grant Writing Assistant", multiplier: 3.0, timeSaving: 75 }, // 75% faster applications
      compliance: { name: "Automated Compliance Reports", multiplier: 2.2, timeSaving: 80 }, // 80% less reporting time
    },
  },
  gaming: {
    name: "Gaming",
    icon: <Gamepad2 className="h-4 w-4" />,
    baseROI: 4.0, // High value from player retention and reduced development costs
    services: {
      automation: { name: "Automated QA Testing", multiplier: 3.8, timeSaving: 85 }, // 85% faster bug detection
      analytics: { name: "Player Behavior Analytics", multiplier: 4.0, timeSaving: 60 }, // 60% better retention
      ai: { name: "Anti-Cheat & Smart NPCs", multiplier: 4.5, timeSaving: 95 }, // 95% cheat detection
      compliance: { name: "AI Matchmaking System", multiplier: 3.2, timeSaving: 70 }, // 70% better player satisfaction
    },
  },
  esports: {
    name: "eSports",
    icon: <Trophy className="h-4 w-4" />,
    baseROI: 3.8, // Strong returns from engagement and monetization
    services: {
      automation: { name: "Tournament Automation Platform", multiplier: 3.5, timeSaving: 80 }, // 80% less manual work
      analytics: { name: "Team Performance Analytics", multiplier: 3.8, timeSaving: 65 }, // Real-time performance insights
      ai: { name: "AI Integrity Monitoring", multiplier: 4.2, timeSaving: 99 }, // 99% cheating detection
      compliance: { name: "Fan Engagement AI", multiplier: 3.0, timeSaving: 50 }, // 50% viewership increase
    },
  },
  government: {
    name: "Government & Public Sector",
    icon: <Building2 className="h-4 w-4" />,
    baseROI: 3.0, // Value from improved citizen services and efficiency
    services: {
      automation: { name: "Citizen Service Automation", multiplier: 2.8, timeSaving: 60 }, // 60% faster service delivery
      analytics: { name: "Public Service Analytics", multiplier: 2.6, timeSaving: 40 }, // Better resource allocation
      ai: { name: "Smart City Infrastructure", multiplier: 3.3, timeSaving: 50 }, // 50% operational efficiency
      compliance: { name: "Regulatory Compliance AI", multiplier: 2.5, timeSaving: 70 }, // 70% faster processing
    },
  },
  other: {
    name: "Other Industry",
    icon: <Briefcase className="h-4 w-4" />,
    baseROI: 3.0, // Industry average based on cross-sector data
    services: {
      automation: { name: "Business Process Automation", multiplier: 3.0, timeSaving: 50 }, // 50% efficiency gain
      analytics: { name: "Business Intelligence AI", multiplier: 2.8, timeSaving: 45 }, // Data-driven insights
      ai: { name: "Custom AI Solutions", multiplier: 3.5, timeSaving: 60 }, // Tailored to needs
      compliance: { name: "Automated Compliance", multiplier: 2.5, timeSaving: 40 }, // Regulatory adherence
    },
  },
};

const ROICalculator = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("all-industries");
  const [customIndustry, setCustomIndustry] = useState("");
  const [open, setOpen] = useState(false);
  const [industrySearch, setIndustrySearch] = useState("");
  
  // Industry options matching solutions page exactly
  const industryOptions = [
    { value: "all-industries", label: "All Industries", icon: <Globe className="h-4 w-4" /> },
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
    { value: "agriculture", label: "Agriculture", icon: <Leaf className="h-4 w-4" /> },
    { value: "media", label: "Media & Entertainment", icon: <Film className="h-4 w-4" /> },
    { value: "gaming", label: "Gaming", icon: <Gamepad2 className="h-4 w-4" /> },
    { value: "esports", label: "eSports", icon: <Trophy className="h-4 w-4" /> }
  ];
  const [selectedServices, setSelectedServices] = useState<string[]>(["automation"]);
  const [investmentAmount, setInvestmentAmount] = useState([50000]);
  const [calculatedROI, setCalculatedROI] = useState(0);
  const [timeSavings, setTimeSavings] = useState(0);
  const [annualReturn, setAnnualReturn] = useState(0);

  useEffect(() => {
    // Use custom industry data if "other" is selected and custom name provided
    const industry = selectedIndustry === "other" && customIndustry 
      ? { ...industryData.other, name: customIndustry }
      : industryData[selectedIndustry];
    if (!industry) return;

    const investment = investmentAmount[0];
    
    // FIXED ROI CALCULATION (Session 23) - Investment-Proportional Returns
    // ROI = (Investment × Return Multiplier) - Investment
    
    // STEP 1: Calculate base return multiplier from selected solutions
    let baseReturnMultiplier = 1.0; // Start with no return (100% of investment back)
    
    // Service-based return multipliers (additive with diminishing returns)
    const solutionReturnBonus = [0.5, 0.4, 0.3, 0.2]; // 50%, 40%, 30%, 20% per solution
    
    selectedServices.forEach((serviceKey, index) => {
      const service = industry.services[serviceKey];
      if (service) {
        // Each solution adds a return bonus with diminishing returns
        const solutionBonus = solutionReturnBonus[index] || 0.1; // 10% for 5th+ solutions
        baseReturnMultiplier += solutionBonus;
      }
    });
    
    // STEP 2: Industry efficiency modifiers
    const industryEfficiencyModifiers: { [key: string]: number } = {
      'technology': 1.2,     // Best returns - tech-savvy, high automation potential
      'finance': 1.2,        // High-value, efficiency-focused
      'gaming': 1.15,
      'esports': 1.15,
      'legal': 1.1,          // High hourly rates, good automation potential
      'healthcare': 1.1,     // Regulated but high-impact
      'manufacturing': 1.0,  // Baseline - steady returns
      'retail': 1.0,
      'logistics': 1.0,
      'energy': 1.0,
      'media': 1.0,
      'hospitality': 0.95,
      'real-estate': 0.95,
      'agriculture': 0.9,
      'education': 0.9,      // Budget constraints
      'nonprofit': 0.85,     // Limited budgets
      'government': 0.9,
      'all-industries': 1.0,
      'other': 1.0
    };
    
    const industryModifier = industryEfficiencyModifiers[selectedIndustry] || 1.0;
    
    // STEP 3: Investment quality bonus (economy of scale)
    let investmentQualityBonus = 1.0;
    if (investment >= 150000) {
      investmentQualityBonus = 1.2; // +20% for $150k+
    } else if (investment >= 50000) {
      investmentQualityBonus = 1.1; // +10% for $50k+
    }
    
    // STEP 4: Calculate time savings (for display only - doesn't affect ROI directly)
    let totalTimeSavingsPercent = 0;
    const diminishingReturns = [1.00, 0.75, 0.55, 0.40];
    
    selectedServices.forEach((serviceKey, index) => {
      const service = industry.services[serviceKey];
      if (service) {
        const diminishingFactor = diminishingReturns[index] || 0.25;
        totalTimeSavingsPercent += service.timeSaving * diminishingFactor;
      }
    });
    
    // Apply industry efficiency to time savings
    totalTimeSavingsPercent *= industryModifier;
    
    // Synergy bonuses for time savings
    let synergyBonus = 1.0;
    if (selectedServices.length >= 2) synergyBonus += 0.05;
    if (selectedServices.length >= 3) synergyBonus += 0.05;
    if (selectedServices.length >= 4) synergyBonus += 0.05;
    
    totalTimeSavingsPercent *= synergyBonus;
    
    // Time savings caps
    const industryMaxTimeSavings: { [key: string]: number } = {
      'technology': 350,
      'finance': 320,
      'gaming': 300,
      'esports': 300,
      'legal': 280,
      'healthcare': 260,
      'manufacturing': 240,
      'retail': 220,
      'logistics': 220,
      'energy': 200,
      'media': 200,
      'hospitality': 180,
      'real-estate': 180,
      'agriculture': 160,
      'education': 140,
      'nonprofit': 120,
      'government': 140,
      'all-industries': 200,
      'other': 200
    };
    
    const maxTimeSavings = industryMaxTimeSavings[selectedIndustry] || 200;
    totalTimeSavingsPercent = Math.min(totalTimeSavingsPercent, maxTimeSavings);
    
    // STEP 5: Calculate final 5-year ROI (investment proportional)
    const finalReturnMultiplier = baseReturnMultiplier * industryModifier * investmentQualityBonus;
    
    // Apply industry-specific caps (as multipliers, not absolute values)
    const industryMaxMultiplier: { [key: string]: number } = {
      'technology': 3.2,     // 220% ROI max (3.2x total return)
      'finance': 3.2,        // 220% ROI max  
      'gaming': 3.0,         // 200% ROI max
      'esports': 3.0,        // 200% ROI max
      'legal': 2.8,          // 180% ROI max
      'healthcare': 2.8,     // 180% ROI max (increased to allow 4th solution)
      'manufacturing': 2.5,  // 150% ROI max
      'retail': 2.2,         // 120% ROI max
      'logistics': 2.2,      // 120% ROI max
      'energy': 2.3,         // 130% ROI max
      'media': 2.1,          // 110% ROI max
      'hospitality': 2.0,    // 100% ROI max
      'real-estate': 2.0,    // 100% ROI max
      'agriculture': 1.8,    // 80% ROI max
      'education': 1.7,      // 70% ROI max (increased slightly)
      'nonprofit': 1.5,      // 50% ROI max
      'government': 1.7,     // 70% ROI max
      'all-industries': 2.3, // 130% ROI max
      'other': 2.3           // 130% ROI max
    };
    
    const maxMultiplier = industryMaxMultiplier[selectedIndustry] || 2.0;
    const cappedMultiplier = Math.min(finalReturnMultiplier, maxMultiplier);
    
    // Ensure minimum 20% return
    const safeMultiplier = Math.max(cappedMultiplier, 1.2);
    
    // Calculate 5-year ROI
    const fiveYearTotalValue = investment * safeMultiplier;
    const fiveYearROI = fiveYearTotalValue - investment;
    
    // Calculate annual return (5-year ROI / 5)
    const annualReturn = fiveYearROI / 5;

    setCalculatedROI(Math.round(fiveYearROI));
    setTimeSavings(Math.round(totalTimeSavingsPercent));
    setAnnualReturn(Math.round(annualReturn));
  }, [selectedIndustry, selectedServices, investmentAmount, customIndustry]);

  const toggleService = (serviceKey: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceKey) 
        ? prev.filter(s => s !== serviceKey)
        : [...prev, serviceKey]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-8 md:py-12 from-primary/5 to-orange-500/5 bg-[#ffffffeb] text-[#020a1c] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="text-primary mr-3 h-8 w-8" />
              <h2 className="text-2xl md:text-3xl font-bold" data-testid="roi-calculator-title">
                See How AI Delivers Real Business Value
              </h2>
            </div>
            <p className="max-w-2xl mx-auto text-[#020a1c]" data-testid="roi-calculator-subtitle">
              Know exactly how much time and money you could save. Select your industry, enter your numbers, and get your personalized ROI projection in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Calculator Controls */}
            <Card className="p-4 md:p-6 flex flex-col">
              <CardContent className="space-y-6 p-0 flex-grow">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Select Your Industry
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between min-h-[48px]"
                        data-testid="select-industry"
                      >
                        <div className="flex items-center gap-2">
                          {selectedIndustry === "other" && customIndustry ? (
                            <>
                              <Briefcase className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{customIndustry}</span>
                            </>
                          ) : (
                            <>
                              {industryOptions.find(option => option.value === selectedIndustry)?.icon || industryData[selectedIndustry]?.icon}
                              <span className="truncate">
                                {industryOptions.find(option => option.value === selectedIndustry)?.label || industryData[selectedIndustry]?.name || "Select industry..."}
                              </span>
                            </>
                          )}
                        </div>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0 max-h-[300px]" align="start" side="bottom" sideOffset={5}>
                      <Command>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none z-10" />
                          <CommandInput 
                            placeholder="Search industries..." 
                            value={industrySearch}
                            onValueChange={setIndustrySearch}
                            className="border-b border-gray-200/70 bg-[#ffffffeb] placeholder:text-[#020a1c]/70 placeholder:font-medium text-[#020a1c] focus:border-primary/50 focus:bg-[#ffffffeb] focus:placeholder:text-[#020a1c]/50 transition-colors duration-200 pl-10"
                          />
                        </div>
                        <CommandList className="max-h-[200px] overflow-y-auto">
                          <CommandEmpty>
                            <div className="p-4 text-sm">
                              <p className="mb-2">Industry not found?</p>
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => {
                                  setSelectedIndustry("other");
                                  setCustomIndustry(industrySearch || "Custom Industry");
                                  setOpen(false);
                                  setIndustrySearch("");
                                }}
                              >
                                Use "{industrySearch || "Custom Industry"}"
                              </Button>
                            </div>
                          </CommandEmpty>
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
                                  if (selectedIndustry === option.value) {
                                    // Deselect if already selected
                                    setSelectedIndustry("all-industries");
                                  } else {
                                    setSelectedIndustry(option.value);
                                  }
                                  setCustomIndustry("");
                                  setOpen(false);
                                  setIndustrySearch("");
                                }}
                                className={`flex items-center gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] ${
                                  selectedIndustry === option.value ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : ""
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
                  {selectedIndustry === "other" && customIndustry && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Using custom industry: {customIndustry}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Investment Amount: {formatCurrency(investmentAmount[0])}
                  </label>
                  <Slider
                    value={investmentAmount}
                    onValueChange={setInvestmentAmount}
                    max={250000}
                    min={1000}
                    step={1000}
                    className="w-full"
                    data-testid="slider-investment"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$1K</span>
                    <span>$250K</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Select Solutions
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                    {industryData[selectedIndustry] && Object.entries(industryData[selectedIndustry].services).map(([key, service]) => (
                      <Badge
                        key={key}
                        variant={selectedServices.includes(key) ? "default" : "outline"}
                        className="cursor-pointer p-3 justify-start hover:bg-primary/10 transition-colors"
                        onClick={() => toggleService(key)}
                        data-testid={`service-${key}`}
                      >
                        {service.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              {/* Schedule Assessment Button - Bottom aligned */}
              <div className="pt-4 mt-auto">
                <button 
                  onClick={() => window.location.href = "/request"}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                  data-testid="button-schedule-discovery-call"
                >
                  Request Solution Showcase
                </button>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-orange-500/5">
              <CardContent className="space-y-6 p-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4" data-testid="results-title">
                    Your Estimated ROI Instantly
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 hero-gradient roi-badge rounded-lg border border-white/20">
                    <DollarSign className="text-green-500 h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-500" data-testid="text-total-roi">
                      {formatCurrency(calculatedROI)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      5 Year ROI
                    </div>
                  </div>

                  <div className="text-center p-4 hero-gradient roi-badge rounded-lg border border-white/20">
                    <Clock className="text-blue-500 h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-500" data-testid="text-time-savings">
                      {timeSavings}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Time Savings
                    </div>
                  </div>

                  <div className="text-center p-4 hero-gradient roi-badge rounded-lg border border-white/20">
                    <TrendingUp className="text-primary h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary" data-testid="text-annual-return">
                      {formatCurrency(annualReturn)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Annual Return
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <TooltipProvider>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        Based on {selectedIndustry === "other" && customIndustry 
                          ? customIndustry 
                          : industryData[selectedIndustry]?.name} industry averages and selected solutions
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <div className="space-y-2">
                            <p className="font-semibold">ROI Methodology</p>
                            <p className="text-xs">{roiMethodology.methodology}</p>
                            <p className="text-xs text-muted-foreground">
                              Validated by: {roiMethodology.validation}
                            </p>
                            <p className="text-xs italic">{roiMethodology.disclaimer}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                  <button 
                    onClick={() => window.location.href = "/contact"}
                    className="text-primary font-semibold hover:underline"
                    data-testid="button-get-detailed-analysis"
                  >
                    Talk to an Expert →
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;