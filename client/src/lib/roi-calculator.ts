// lib/roi-calculator.ts - COMPLETE ALGORITHM WITH ALL 22 INDUSTRIES
import type { IndustryName, SolutionData, ROICalculationResult } from '@/types/roi-calculator';

export class AIROICalculator {
  private readonly industryBaseROI: Record<IndustryName, number> = {
    'Healthcare': 3.8,
    'Financial Services': 4.2,
    'Retail': 3.6,
    'Manufacturing': 3.4,
    'Technology': 3.9,
    'Government': 3.0,
    'Legal': 3.1,
    'Real Estate': 3.3,
    'Transportation': 3.5,
    'Insurance': 4.0,
    'Energy': 3.7,
    'Telecommunications': 3.8,
    'Agriculture': 3.1,
    'Media & Entertainment': 3.9,
    'Logistics & Supply Chain': 3.5,
    'Hospitality & Tourism': 3.5,
    'Gaming': 3.8,
    'Energy & Utilities': 3.9,
    'eSports': 3.7,
    'All Industries': 3.5,
    'Education': 3.6
  };

  private readonly industrySolutions: Record<IndustryName, Record<string, SolutionData>> = {
    'Healthcare': {
      'Clinical Diagnostics AI': {
        name: 'Clinical Diagnostics AI',
        roiMultiplier: 1.25,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 120,
        description: 'AI-powered diagnostic imaging and clinical decision support'
      },
      'EHR Automation': {
        name: 'EHR Automation',
        roiMultiplier: 1.15,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 95,
        description: 'Automated documentation and electronic health record management'
      },
      'Patient Care AI': {
        name: 'Patient Care AI',
        roiMultiplier: 1.20,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 105,
        description: 'AI-driven patient monitoring and care coordination'
      },
      'HIPAA Compliance Automation': {
        name: 'HIPAA Compliance Automation',
        roiMultiplier: 1.10,
        timeSavingsPercent: 15,
        annualBenefitPer1K: 85,
        description: 'Automated compliance monitoring and audit preparation'
      }
    },
    'Financial Services': {
      'Fraud Detection AI': {
        name: 'Fraud Detection AI',
        roiMultiplier: 1.30,
        timeSavingsPercent: 40,
        annualBenefitPer1K: 135,
        description: 'Real-time fraud detection and prevention'
      },
      'Risk Assessment AI': {
        name: 'Risk Assessment AI',
        roiMultiplier: 1.25,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 125,
        description: 'Automated credit scoring and risk evaluation'
      },
      'Customer Service Automation': {
        name: 'Customer Service Automation',
        roiMultiplier: 1.18,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 110,
        description: 'AI-powered chatbots and customer support'
      },
      'Regulatory Compliance AI': {
        name: 'Regulatory Compliance AI',
        roiMultiplier: 1.12,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 95,
        description: 'Automated regulatory reporting and compliance monitoring'
      }
    },
    'Retail': {
      'Personalization Engine': {
        name: 'Personalization Engine',
        roiMultiplier: 1.22,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 115,
        description: 'AI-driven product recommendations and personalization'
      },
      'Inventory Optimization AI': {
        name: 'Inventory Optimization AI',
        roiMultiplier: 1.20,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 108,
        description: 'Automated inventory management and demand forecasting'
      },
      'Dynamic Pricing AI': {
        name: 'Dynamic Pricing AI',
        roiMultiplier: 1.25,
        timeSavingsPercent: 15,
        annualBenefitPer1K: 120,
        description: 'Real-time price optimization and revenue management'
      },
      'Customer Analytics AI': {
        name: 'Customer Analytics AI',
        roiMultiplier: 1.18,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 100,
        description: 'Customer behavior analysis and market insights'
      }
    },
    'Manufacturing': {
      'Predictive Maintenance AI': {
        name: 'Predictive Maintenance AI',
        roiMultiplier: 1.28,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 125,
        description: 'AI-powered equipment monitoring and maintenance prediction'
      },
      'Quality Control AI': {
        name: 'Quality Control AI',
        roiMultiplier: 1.20,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 110,
        description: 'Automated quality inspection and defect detection'
      },
      'Production Optimization AI': {
        name: 'Production Optimization AI',
        roiMultiplier: 1.22,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 115,
        description: 'Manufacturing process optimization and efficiency improvement'
      },
      'Supply Chain AI': {
        name: 'Supply Chain AI',
        roiMultiplier: 1.15,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 98,
        description: 'Supply chain optimization and logistics management'
      }
    },
    'Technology': {
      'Development Automation': {
        name: 'Development Automation',
        roiMultiplier: 1.28,
        timeSavingsPercent: 40,
        annualBenefitPer1K: 125,
        description: 'AI-powered code generation and development automation'
      },
      'System Monitoring AI': {
        name: 'System Monitoring AI',
        roiMultiplier: 1.22,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 115,
        description: 'Automated system monitoring and incident response'
      },
      'Data Pipeline Automation': {
        name: 'Data Pipeline Automation',
        roiMultiplier: 1.25,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 120,
        description: 'AI-driven data processing and pipeline management'
      },
      'Security Analytics AI': {
        name: 'Security Analytics AI',
        roiMultiplier: 1.20,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 110,
        description: 'AI-powered security monitoring and threat detection'
      }
    },
    'Government': {
      'Citizen Service Automation': {
        name: 'Citizen Service Automation',
        roiMultiplier: 1.18,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 100,
        description: 'AI-powered citizen service portals and automation'
      },
      'Document Processing AI': {
        name: 'Document Processing AI',
        roiMultiplier: 1.20,
        timeSavingsPercent: 45,
        annualBenefitPer1K: 105,
        description: 'Automated document processing and classification'
      },
      'Compliance Monitoring AI': {
        name: 'Compliance Monitoring AI',
        roiMultiplier: 1.15,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 95,
        description: 'AI-driven regulatory compliance monitoring'
      },
      'Resource Optimization AI': {
        name: 'Resource Optimization AI',
        roiMultiplier: 1.12,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 88,
        description: 'AI-powered resource allocation and optimization'
      }
    },
    'Legal': {
      'Document Review AI': {
        name: 'Document Review AI',
        roiMultiplier: 1.25,
        timeSavingsPercent: 50,
        annualBenefitPer1K: 120,
        description: 'AI-powered legal document review and analysis'
      },
      'Case Research Automation': {
        name: 'Case Research Automation',
        roiMultiplier: 1.20,
        timeSavingsPercent: 40,
        annualBenefitPer1K: 110,
        description: 'Automated legal research and case law analysis'
      },
      'Contract Analysis AI': {
        name: 'Contract Analysis AI',
        roiMultiplier: 1.22,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 115,
        description: 'AI-driven contract analysis and risk assessment'
      },
      'Billing Automation': {
        name: 'Billing Automation',
        roiMultiplier: 1.15,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 95,
        description: 'Automated billing and time tracking systems'
      }
    },
    'Real Estate': {
      'Property Valuation AI': {
        name: 'Property Valuation AI',
        roiMultiplier: 1.22,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 115,
        description: 'AI-powered property valuation and market analysis'
      },
      'Lead Generation AI': {
        name: 'Lead Generation AI',
        roiMultiplier: 1.20,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 110,
        description: 'AI-driven lead generation and customer matching'
      },
      'Market Analytics AI': {
        name: 'Market Analytics AI',
        roiMultiplier: 1.18,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 105,
        description: 'AI-powered market trend analysis and insights'
      },
      'Document Automation': {
        name: 'Document Automation',
        roiMultiplier: 1.15,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 95,
        description: 'Automated document generation and processing'
      }
    },
    'Transportation': {
      'Route Optimization AI': {
        name: 'Route Optimization AI',
        roiMultiplier: 1.28,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 125,
        description: 'AI-powered route planning and optimization'
      },
      'Fleet Management AI': {
        name: 'Fleet Management AI',
        roiMultiplier: 1.22,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 115,
        description: 'AI-driven fleet management and monitoring'
      },
      'Predictive Maintenance AI': {
        name: 'Predictive Maintenance AI',
        roiMultiplier: 1.25,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 120,
        description: 'AI-powered vehicle maintenance prediction'
      },
      'Safety Monitoring AI': {
        name: 'Safety Monitoring AI',
        roiMultiplier: 1.18,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 105,
        description: 'AI-driven safety monitoring and compliance'
      }
    },
    'Insurance': {
      'Claims Processing AI': {
        name: 'Claims Processing AI',
        roiMultiplier: 1.30,
        timeSavingsPercent: 40,
        annualBenefitPer1K: 135,
        description: 'AI-powered automated claims processing'
      },
      'Risk Assessment AI': {
        name: 'Risk Assessment AI',
        roiMultiplier: 1.25,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 125,
        description: 'AI-driven risk evaluation and underwriting'
      },
      'Fraud Detection AI': {
        name: 'Fraud Detection AI',
        roiMultiplier: 1.28,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 130,
        description: 'AI-powered fraud detection and prevention'
      },
      'Customer Service AI': {
        name: 'Customer Service AI',
        roiMultiplier: 1.18,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 110,
        description: 'AI-driven customer service automation'
      }
    },
    'Energy': {
      'Grid Optimization AI': {
        name: 'Grid Optimization AI',
        roiMultiplier: 1.30,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 135,
        description: 'AI-powered energy grid optimization'
      },
      'Demand Forecasting AI': {
        name: 'Demand Forecasting AI',
        roiMultiplier: 1.25,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 125,
        description: 'AI-driven energy demand prediction'
      },
      'Maintenance Optimization AI': {
        name: 'Maintenance Optimization AI',
        roiMultiplier: 1.28,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 130,
        description: 'AI-powered maintenance scheduling and optimization'
      },
      'Regulatory Compliance AI': {
        name: 'Regulatory Compliance AI',
        roiMultiplier: 1.15,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 100,
        description: 'Automated regulatory reporting and compliance'
      }
    },
    'Telecommunications': {
      'Network Optimization AI': {
        name: 'Network Optimization AI',
        roiMultiplier: 1.28,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 130,
        description: 'AI-powered network performance optimization'
      },
      'Customer Service AI': {
        name: 'Customer Service AI',
        roiMultiplier: 1.20,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 115,
        description: 'AI-driven customer support automation'
      },
      'Predictive Maintenance AI': {
        name: 'Predictive Maintenance AI',
        roiMultiplier: 1.25,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 125,
        description: 'AI-powered infrastructure maintenance prediction'
      },
      'Fraud Prevention AI': {
        name: 'Fraud Prevention AI',
        roiMultiplier: 1.22,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 120,
        description: 'AI-driven fraud detection and prevention'
      }
    },
    'Agriculture': {
      'Crop Monitoring AI': {
        name: 'Crop Monitoring AI',
        roiMultiplier: 1.22,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 115,
        description: 'AI-powered crop health monitoring and analysis'
      },
      'Yield Prediction AI': {
        name: 'Yield Prediction AI',
        roiMultiplier: 1.20,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 110,
        description: 'AI-driven crop yield prediction and optimization'
      },
      'Resource Optimization AI': {
        name: 'Resource Optimization AI',
        roiMultiplier: 1.18,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 105,
        description: 'AI-powered resource allocation and optimization'
      },
      'Supply Chain AI': {
        name: 'Supply Chain AI',
        roiMultiplier: 1.15,
        timeSavingsPercent: 15,
        annualBenefitPer1K: 98,
        description: 'AI-driven agricultural supply chain optimization'
      }
    },
    'Media & Entertainment': {
      'Content Distribution AI': {
        name: 'Content Distribution AI',
        roiMultiplier: 1.24,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 118,
        description: 'AI-powered content delivery and distribution optimization'
      },
      'Audience Engagement Analytics': {
        name: 'Audience Engagement Analytics',
        roiMultiplier: 1.22,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 112,
        description: 'AI-driven audience behavior analysis and engagement insights'
      },
      'AI Content Personalization': {
        name: 'AI Content Personalization',
        roiMultiplier: 1.26,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 125,
        description: 'Personalized content recommendations and customization'
      },
      'Digital Rights Management': {
        name: 'Digital Rights Management',
        roiMultiplier: 1.15,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 95,
        description: 'Automated digital rights protection and compliance'
      }
    },
    'Logistics & Supply Chain': {
      'AI Route Optimization': {
        name: 'AI Route Optimization',
        roiMultiplier: 1.28,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 128,
        description: 'AI-powered route planning and logistics optimization'
      },
      'Fleet Performance Analytics': {
        name: 'Fleet Performance Analytics',
        roiMultiplier: 1.20,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 110,
        description: 'Fleet management and performance monitoring with AI'
      },
      'Predictive Demand Planning': {
        name: 'Predictive Demand Planning',
        roiMultiplier: 1.25,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 120,
        description: 'AI-driven demand forecasting and inventory planning'
      },
      'Supply Chain Visibility': {
        name: 'Supply Chain Visibility',
        roiMultiplier: 1.18,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 105,
        description: 'End-to-end supply chain tracking and visibility'
      }
    },
    'Hospitality & Tourism': {
      'Smart Booking & Check-in': {
        name: 'Smart Booking & Check-in',
        roiMultiplier: 1.22,
        timeSavingsPercent: 40,
        annualBenefitPer1K: 115,
        description: 'Automated booking systems and contactless check-in'
      },
      'Guest Experience Analytics': {
        name: 'Guest Experience Analytics',
        roiMultiplier: 1.20,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 108,
        description: 'AI-powered guest behavior analysis and satisfaction tracking'
      },
      'Dynamic Revenue Management': {
        name: 'Dynamic Revenue Management',
        roiMultiplier: 1.25,
        timeSavingsPercent: 15,
        annualBenefitPer1K: 125,
        description: 'AI-driven pricing optimization and revenue management'
      },
      'Operations & Staff Optimization': {
        name: 'Operations & Staff Optimization',
        roiMultiplier: 1.18,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 100,
        description: 'AI-powered operational efficiency and staff scheduling'
      }
    },
    'Gaming': {
      'Automated QA Testing': {
        name: 'Automated QA Testing',
        roiMultiplier: 1.30,
        timeSavingsPercent: 45,
        annualBenefitPer1K: 135,
        description: 'AI-powered game testing and quality assurance automation'
      },
      'Player Behavior Analytics': {
        name: 'Player Behavior Analytics',
        roiMultiplier: 1.22,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 115,
        description: 'AI-driven player behavior analysis and engagement tracking'
      },
      'Anti-Cheat & Smart NPCs': {
        name: 'Anti-Cheat & Smart NPCs',
        roiMultiplier: 1.24,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 118,
        description: 'AI-powered cheat detection and intelligent NPC behavior'
      },
      'AI Matchmaking System': {
        name: 'AI Matchmaking System',
        roiMultiplier: 1.18,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 105,
        description: 'AI-driven player matchmaking and game balance optimization'
      }
    },
    'Energy & Utilities': {
      'Smart Grid Automation': {
        name: 'Smart Grid Automation',
        roiMultiplier: 1.32,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 140,
        description: 'AI-powered smart grid management and optimization'
      },
      'Energy Consumption Analytics': {
        name: 'Energy Consumption Analytics',
        roiMultiplier: 1.25,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 125,
        description: 'AI-driven energy usage analysis and optimization'
      },
      'Predictive Grid Maintenance': {
        name: 'Predictive Grid Maintenance',
        roiMultiplier: 1.30,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 135,
        description: 'AI-powered predictive maintenance for grid infrastructure'
      },
      'Regulatory Reporting AI': {
        name: 'Regulatory Reporting AI',
        roiMultiplier: 1.15,
        timeSavingsPercent: 40,
        annualBenefitPer1K: 100,
        description: 'Automated regulatory compliance and reporting'
      }
    },
    'eSports': {
      'Tournament Automation Platform': {
        name: 'Tournament Automation Platform',
        roiMultiplier: 1.28,
        timeSavingsPercent: 45,
        annualBenefitPer1K: 125,
        description: 'AI-powered tournament management and automation'
      },
      'Team Performance Analytics': {
        name: 'Team Performance Analytics',
        roiMultiplier: 1.25,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 120,
        description: 'AI-driven team and player performance analysis'
      },
      'AI Integrity Monitoring': {
        name: 'AI Integrity Monitoring',
        roiMultiplier: 1.20,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 110,
        description: 'AI-powered cheat detection and integrity monitoring'
      },
      'Fan Engagement AI': {
        name: 'Fan Engagement AI',
        roiMultiplier: 1.22,
        timeSavingsPercent: 15,
        annualBenefitPer1K: 115,
        description: 'AI-driven fan engagement and personalization'
      }
    },
    'All Industries': {
      'Process Automation': {
        name: 'Process Automation',
        roiMultiplier: 1.18,
        timeSavingsPercent: 30,
        annualBenefitPer1K: 100,
        description: 'General business process automation across industries'
      },
      'Data Analytics': {
        name: 'Data Analytics',
        roiMultiplier: 1.22,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 110,
        description: 'Data analysis and business intelligence solutions'
      },
      'AI Solutions': {
        name: 'AI Solutions',
        roiMultiplier: 1.20,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 105,
        description: 'General artificial intelligence solutions and tools'
      },
      'Compliance & Security': {
        name: 'Compliance & Security',
        roiMultiplier: 1.15,
        timeSavingsPercent: 35,
        annualBenefitPer1K: 95,
        description: 'Compliance automation and security enhancement'
      }
    },
    'Education': {
      'Administrative Task Automation': {
        name: 'Administrative Task Automation',
        roiMultiplier: 1.25,
        timeSavingsPercent: 40,
        annualBenefitPer1K: 120,
        description: 'AI-powered administrative process automation'
      },
      'Student Performance Analytics': {
        name: 'Student Performance Analytics',
        roiMultiplier: 1.22,
        timeSavingsPercent: 25,
        annualBenefitPer1K: 115,
        description: 'AI-driven student performance analysis and insights'
      },
      'Personalized Learning Paths': {
        name: 'Personalized Learning Paths',
        roiMultiplier: 1.28,
        timeSavingsPercent: 20,
        annualBenefitPer1K: 130,
        description: 'AI-powered personalized education and adaptive learning'
      },
      'Automated Grading & Assessment': {
        name: 'Automated Grading & Assessment',
        roiMultiplier: 1.18,
        timeSavingsPercent: 50,
        annualBenefitPer1K: 105,
        description: 'AI-automated grading and assessment systems'
      }
    }
  };

  public calculateROI(
    industry: IndustryName,
    investmentAmount: number,
    selectedSolutions: string[],
    timeHorizonYears: number = 5
  ): ROICalculationResult {
    // Input validation
    const validatedAmount = Math.max(1000, Math.min(250000, investmentAmount));
    const validatedSolutions = selectedSolutions || [];

    // Get base ROI for industry
    const baseROI = this.industryBaseROI[industry] || 3.5;

    // Get solution set for industry
    const solutionSet = this.industrySolutions[industry] || {};

    // Calculate combined effects of selected solutions
    let totalROIMultiplier = 1.0;
    let totalTimeSavings = 0;

    if (validatedSolutions.length > 0 && Object.keys(solutionSet).length > 0) {
      const solutionMultipliers: number[] = [];
      const timeSavingsList: number[] = [];

      for (const solution of validatedSolutions) {
        if (solutionSet[solution]) {
          solutionMultipliers.push(solutionSet[solution].roiMultiplier);
          timeSavingsList.push(solutionSet[solution].timeSavingsPercent);
        }
      }

      if (solutionMultipliers.length > 0) {
        // Calculate average multiplier with synergy bonus
        const avgMultiplier = solutionMultipliers.reduce((a, b) => a + b, 0) / solutionMultipliers.length;
        const synergyBonus = 1 + (solutionMultipliers.length - 1) * 0.08;
        totalROIMultiplier = avgMultiplier * synergyBonus;

        // Calculate time savings with diminishing returns
        const rawTimeSavings = timeSavingsList.reduce((a, b) => a + b, 0);
        totalTimeSavings = timeSavingsList.length > 1 ? rawTimeSavings * 0.85 : rawTimeSavings;

      }
    }

    // Scale factor based on investment size
    let scaleFactor = 1.0;
    if (validatedAmount >= 10000) scaleFactor += 0.1;
    if (validatedAmount >= 50000) scaleFactor += 0.1;
    if (validatedAmount >= 100000) scaleFactor += 0.15;

    // Calculate final ROI
    const finalROIMultiplier = baseROI * totalROIMultiplier * scaleFactor;

    // Calculate returns
    const fiveYearROI = validatedAmount * (finalROIMultiplier - 1);
    const annualGrowthRate = Math.pow(finalROIMultiplier, 1 / timeHorizonYears) - 1;
    const annualReturn = validatedAmount * annualGrowthRate;

    // Calculate payback period in months
    const monthlyReturn = annualReturn / 12;
    const paybackMonths = monthlyReturn > 0 ? Math.round(validatedAmount / monthlyReturn) : 60;

    return {
      fiveYearROI: `$${Math.round(fiveYearROI).toLocaleString()}`,
      timeSavings: `${Math.round(totalTimeSavings)}%`,
      annualReturn: `$${Math.round(annualReturn).toLocaleString()}`,
      paybackMonths: Math.min(paybackMonths, 60),
      roiMultiplier: Number(finalROIMultiplier.toFixed(2))
    };
  }

  public getSolutionsForIndustry(industry: IndustryName): string[] {
    return Object.keys(this.industrySolutions[industry] || {});
  }

  public getAllIndustries(): IndustryName[] {
    return Object.keys(this.industryBaseROI) as IndustryName[];
  }

  public getSolutionDetails(industry: IndustryName, solutionName: string): SolutionData | undefined {
    return this.industrySolutions[industry]?.[solutionName];
  }
}

// Export singleton instance
export const roiCalculator = new AIROICalculator();