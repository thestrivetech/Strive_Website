import { useState, useEffect } from "react";
import {
  Lightbulb, Filter, Play, Heart, DollarSign, Factory, GraduationCap,
  Truck, Hotel, Zap, Film, Building2, Scale, HomeIcon, Laptop,
  ShoppingCart, ShieldCheck, Leaf, Gamepad2, Trophy, Eye, Bot,
  Brain, Cloud, BarChart, Target, Cog, Cpu, ChevronDown, CheckCircle, ArrowRight
} from "lucide-react";
import { MetaTags } from "@/components/seo/meta-tags";
import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Link } from "wouter";

// Import centralized data and components
import { UnifiedFilterDropdown, type FilterSelection } from "@/components/filters/unified-filter-dropdown";
import { solutions, type Solution } from "@/data/solutions";
import { industryCards } from "@/data/industry-cards";
import { industryOptions } from "@/data/industries";
import { solutionTypeOptions } from "@/data/solutions";
import { getFilteredContent, isSolution, isIndustryCard } from "@/lib/data-helpers";

const Solutions = () => {
  const { seoConfig } = useSEO();
  // Unified filter state management
  const [selectedFilter, setSelectedFilter] = useState<FilterSelection>({type: 'all', value: 'All'});
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
  
  // Dropdown state management
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
  
  // Reset filter search when dropdown closes
  useEffect(() => {
    if (!unifiedDropdownOpen) {
      setFilterSearch("");
    }
  }, [unifiedDropdownOpen]);
  
  // Calculate solution counts for each industry
  const getIndustrySolutionCount = (industryValue: string) => {
    if (industryValue === 'all-industries') {
      return industryOptions.length;
    }

    // Map industry option values to actual solution technology names
    const industryMapping: { [key: string]: string[] } = {
      "healthcare": ["Healthcare"],
      "finance": ["Financial Services", "Banking"],
      "manufacturing": ["Manufacturing", "Smart Manufacturing"],
      "retail": ["Retail", "E-commerce"],
      "technology": ["Technology", "Technology Companies", "All Software Development", "Enterprise Cybersecurity", "Smart Cities", "All Knowledge-Intensive Industries"],
      "education": ["Customer Service", "All Content-Driven Industries", "Executive Support"],
      "real-estate": ["Real Estate", "Smart Buildings"],
      "legal": ["Legal Services"],
      "logistics": ["Supply Chain"],
      "hospitality": ["Smart Home"],
      "energy": ["Energy"],
      "government": ["Government", "Security Operations Centers", "Incident Response Teams"],
      "insurance": ["Insurance"],
      "automotive": ["Automotive", "Autonomous Vehicles"],
      "agriculture": ["Agriculture"],
      "media": ["Content and Media", "All Content-Driven Industries"],
      "gaming": ["Customer Service", "All Content-Driven Industries"],
      "esports": ["Customer Service", "All Content-Driven Industries"],
      "nonprofit": ["Customer Service", "All Content-Driven Industries", "Government"],
      "telecommunications": ["Technology", "Technology Companies", "Customer Service", "Enterprise Cybersecurity"],
      "transportation": ["Transportation"]
    };

    const targetIndustries = industryMapping[industryValue] || [];
    return solutions.filter(solution =>
      solution.applicableIndustries?.some(industry =>
        targetIndustries.some(targetIndustry =>
          industry.toLowerCase().includes(targetIndustry.toLowerCase()) ||
          targetIndustry.toLowerCase().includes(industry.toLowerCase())
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
    return solution.category || 'AI Tool';
  };

  const industryOptions = [
    { value: "healthcare", label: "Healthcare", icon: <Heart className="h-4 w-4" /> },
    { value: "finance", label: "Financial Services", icon: <DollarSign className="h-4 w-4" /> },
    { value: "manufacturing", label: "Manufacturing", icon: <Factory className="h-4 w-4" /> },
    { value: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { value: "logistics", label: "Logistics & Supply Chain", icon: <Truck className="h-4 w-4" /> },
    { value: "hospitality", label: "Hospitality & Tourism", icon: <Hotel className="h-4 w-4" /> },
    { value: "energy", label: "Energy & Utilities", icon: <Zap className="h-4 w-4" /> },
    { value: "nonprofit", label: "Non-profit Organizations", icon: <Heart className="h-4 w-4" /> },
    { value: "media", label: "Media & Entertainment", icon: <Film className="h-4 w-4" /> },
    { value: "telecommunications", label: "Telecommunications", icon: <Building2 className="h-4 w-4" /> },
    { value: "government", label: "Government & Public Sector", icon: <Building2 className="h-4 w-4" /> },
    { value: "legal", label: "Legal", icon: <Scale className="h-4 w-4" /> },
    { value: "real-estate", label: "Real Estate", icon: <HomeIcon className="h-4 w-4" /> },
    { value: "technology", label: "Technology", icon: <Laptop className="h-4 w-4" /> },
    { value: "retail", label: "Retail", icon: <ShoppingCart className="h-4 w-4" /> },
    { value: "insurance", label: "Insurance", icon: <ShieldCheck className="h-4 w-4" /> },
    { value: "automotive", label: "Automotive", icon: <Factory className="h-4 w-4" /> },
    { value: "agriculture", label: "Agriculture", icon: <Leaf className="h-4 w-4" /> },
    { value: "gaming", label: "Gaming", icon: <Gamepad2 className="h-4 w-4" /> },
    { value: "esports", label: "eSports", icon: <Trophy className="h-4 w-4" /> },
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
    { value: "non-ai-solutions", label: "Non-AI Tools", icon: <Cog className="h-4 w-4" /> },
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
    telecommunications: ["Machine Learning & Analytics", "AI Security", "Process Automation", "Conversational AI", "Local AI Deployment", "Natural Language Processing"],
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
          solution.applicableIndustries?.some(industry =>
            targetIndustries.some(targetIndustry =>
              industry.toLowerCase().includes(targetIndustry.toLowerCase()) ||
              targetIndustry.toLowerCase().includes(industry.toLowerCase())
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
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 hero-gradient relative overflow-hidden">
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
            <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
              <div className="relative">
                <Lightbulb className="text-primary h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 text-white px-4"
              data-testid="text-solutions-hero-title"
            >
              Unlock the Power of AI to <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Transform Your Business</span> for Tomorrow
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#94a3b8] max-w-4xl mx-auto mb-6 sm:mb-7 md:mb-8 px-4"
              data-testid="text-solutions-hero-subtitle"
            >
              We help industry leaders conquer operational challenges, maximize efficiency, and drive growth with AI tools designed just for your field.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 min-h-[44px]"
                onClick={() => window.location.href = '/request'}
                data-testid="button-get-custom-solution"
              >
                Get Custom Tool
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl min-h-[44px]"
                onClick={() => document.getElementById('solutions-grid')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-explore-solutions"
              >
                Explore Industry Tools
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter and Solutions Grid Section */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-[#ffffffeb]" id="solutions-grid">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Instruction Text */}
          <div className="text-center mb-6 sm:mb-7 md:mb-8">
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
              Discover Your Perfect AI Tool: Choose your industry to see tailored strategies, or browse by solution type to find specific capabilities across all sectors.
            </p>
          </div>

          {/* Unified Filter Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0">
            {/* All Filter */}
            <Button
              variant={selectedFilter.type === "all" ? "default" : "outline"}
              onClick={() => {
                setSelectedFilter({type: 'all', value: 'All'});
              }}
              className={`flex items-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 transition-all duration-200 text-sm sm:text-base min-h-[44px] ${
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
                    {selectedFilter.value === 'All' ? 'Industries & Tools' :
                     selectedFilter.type === 'industry' ?
                       (selectedFilter.value === 'all-industries' ? 'All Industries' :
                        industryOptions.find(opt => opt.value === selectedFilter.value)?.label || selectedFilter.value) :
                     selectedFilter.type === 'solution' ?
                       (selectedFilter.value === 'all-solutions' ? 'All Tools' :
                        solutionTypeOptions.find(opt => opt.value === selectedFilter.value)?.label || selectedFilter.value) :
                     filteredSolutions.length === 1 ? 'Tool' : 'Tools'}
                  </span>
                  <Badge variant="secondary" className="ml-auto mr-2 text-xs">
                    {selectedFilter.type === 'industry' && selectedFilter.value === 'all-industries' ? '21' : 
                     selectedFilter.type === 'solution' && selectedFilter.value === 'all-solutions' ? '27' :
                     filteredSolutions.length}
                  </Badge>
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[500px] md:w-[750px] lg:w-[900px] xl:w-[1000px] max-w-none p-0" align="center" side="bottom" sideOffset={5} avoidCollisions={false}>
                <Command>
                  <CommandInput 
                    placeholder="Search industries or solutions..." 
                    value={filterSearch}
                    onValueChange={setFilterSearch}
                    className="h-12 sm:h-10 text-base sm:text-sm"
                  />
                  <CommandList className="max-h-[400px] sm:max-h-[450px] overflow-y-auto">
                    
                    {/* Three-column layout with responsive design */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 p-3 md:p-6 relative">
                      {/* Industries Section - Spanning 2 columns */}
                      <div className="md:col-span-2 space-y-2 md:pr-6">
                        {/* Industries Header - Spanning both columns */}
                        <h3 className="text-sm font-semibold text-muted-foreground py-1.5 uppercase tracking-wide border-b border-gray-200 mb-2 flex items-center gap-2">
                          Industries
                          <Badge variant="secondary" className="text-xs px-2 py-1 h-6 flex items-center">21</Badge>
                        </h3>
                        {/* Container with right border that starts AFTER the header */}
                        <div className="md:border-r md:border-gray-200 md:mr-[-24px] md:pr-[24px] md:-mt-[8px]">
                        
                        {/* All Industries Option - Spanning both columns */}
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
                          className={`flex items-center justify-between gap-2 cursor-pointer text-white [&>svg]:text-white hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] min-h-[48px] px-2 py-3 sm:py-2 rounded-md transition-colors mb-2 ${
                            "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span className="text-sm">All Industries</span>
                          </div>
                        </div>
                        
                        {/* Industry Items Grid - 2 columns within the Industries section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">

                          {/* First Half Column */}
                          <div className="space-y-2 pl-2 pr-2 md:border-r md:border-gray-200">
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
                              .slice(0, Math.ceil(industryOptions.filter(option => {
                                const searchTerm = filterSearch.toLowerCase();
                                const nameMatch = option.label.toLowerCase().includes(searchTerm);
                                const correlations = industryCorrelations[option.value as keyof typeof industryCorrelations];
                                const correlationMatch = correlations && correlations.some((solution: string) => 
                                  solution.toLowerCase().includes(searchTerm)
                                );
                                return nameMatch || correlationMatch;
                              }).length / 2))
                              .map((option) => {
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
                                className={`cursor-pointer text-white [&>svg]:text-white hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] min-h-[48px] px-3 py-2 rounded-md transition-colors ${
                                  selectedFilter.type === 'industry' && selectedFilter.value === option.value ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    {option.icon}
                                    <span className="text-sm font-medium">{option.label}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs px-2 py-1 h-5 flex items-center gap-1">
                                    <span className="text-[11px] font-semibold">{getIndustrySolutionCount(option.value)}</span>
                                    <span className="text-[11px]">tools</span>
                                  </Badge>
                                </div>

                              </div>
                            );
                          })}
                      
                      </div>

                          {/* Second Half Column */}
                          <div className="space-y-2 pl-4 pr-5">
                        
                        {/* Individual Industries - Second Half */}
                        {industryOptions
                          .filter(option => {
                            const searchTerm = filterSearch.toLowerCase();
                            const nameMatch = option.label.toLowerCase().includes(searchTerm);
                            const correlations = industryCorrelations[option.value as keyof typeof industryCorrelations];
                            const correlationMatch = correlations && correlations.some((solution: string) => 
                              solution.toLowerCase().includes(searchTerm)
                            );
                            return nameMatch || correlationMatch;
                          })
                          .slice(Math.ceil(industryOptions.filter(option => {
                            const searchTerm = filterSearch.toLowerCase();
                            const nameMatch = option.label.toLowerCase().includes(searchTerm);
                            const correlations = industryCorrelations[option.value as keyof typeof industryCorrelations];
                            const correlationMatch = correlations && correlations.some((solution: string) => 
                              solution.toLowerCase().includes(searchTerm)
                            );
                            return nameMatch || correlationMatch;
                          }).length / 2))
                          .map((option) => {
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
                                className={`cursor-pointer text-white [&>svg]:text-white hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] min-h-[48px] px-3 py-2 rounded-md transition-colors ${
                                  selectedFilter.type === 'industry' && selectedFilter.value === option.value ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    {option.icon}
                                    <span className="text-sm font-medium">{option.label}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs px-2 py-1 h-5 flex items-center gap-1">
                                    <span className="text-[11px] font-semibold">{getIndustrySolutionCount(option.value)}</span>
                                    <span className="text-[11px]">tools</span>
                                  </Badge>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                        </div>
                        </div>
                      </div>

                      {/* Right Column - Solution Types */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground py-1.5 uppercase tracking-wide border-b border-gray-200 mb-2 flex items-center gap-2 md:-ml-6 md:pl-6">
                          Solution Types
                          <Badge variant="secondary" className="text-xs px-2 py-1 h-6 flex items-center">9</Badge>
                        </h3>
                        
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
                          className={`flex items-center justify-between gap-2 cursor-pointer text-white [&>svg]:text-white hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] min-h-[48px] px-2 py-3 sm:py-2 rounded-md transition-colors mb-2 ${
                            "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 w-full">
                            <div className="flex items-center gap-2">
                              <Cog className="h-4 w-4" />
                              <span className="text-sm">All Tools</span>
                            </div>
                            <Badge variant="secondary" className="text-xs px-2 py-1 h-6 flex items-center">
                              27
                            </Badge>
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
                                className={`cursor-pointer text-white [&>svg]:text-white hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033] min-h-[48px] px-3 py-2 rounded-md transition-colors ${
                                  selectedFilter.type === 'solution' && selectedFilter.value === option.value ? "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]" : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    {option.icon}
                                    <span className="text-sm font-medium">{option.label}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs px-2 py-1 h-5 flex items-center gap-1">
                                    <span className="text-[11px] font-semibold">{getSolutionTypeSolutionCount(option.value)}</span>
                                    <span className="text-[11px]">tools</span>
                                  </Badge>
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
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer hover:-translate-y-2 hero-gradient h-full flex flex-col border-l-4 border-l-primary/50"
                  onClick={() => {
                    // Open industry detail modal
                    setSelectedIndustry(item);
                  }}
                  data-testid={`industry-card-${item.industryValue}`}
                >
                  <CardContent className="p-3 md:p-6 flex flex-col h-full relative">
                    {/* Decorative gradient overlay */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl" />
                    
                    {/* Industry Badge - Positioned in upper right */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4">
                      <Badge className="bg-white hover:hero-gradient hover:border-[#ff7033] hover:text-white text-[#020a1c] text-xs px-2 md:px-3 py-0.5 md:py-1 h-6 md:h-7 shadow-md">
                        Industry Overview
                      </Badge>
                    </div>
                    
                    {/* Content Layout */}
                    <div className="flex flex-col h-full">
                      {/* Header Section */}
                      <div className="flex flex-col items-center md:items-start mb-3 md:mb-3">
                        {/* Icon */}
                        <div className="mb-2 md:mb-2">
                          <div className="text-[#ff7033] transition-transform duration-300 group-hover:scale-110 text-2xl md:text-xl flex justify-center">
                            {item.icon}
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-base md:text-xl font-bold text-[#ff7033] line-clamp-2 text-center md:text-left">
                          {item.title}
                        </h3>
                        
                        {/* Category - Desktop only */}
                        <span className="text-xs md:text-sm font-medium uppercase tracking-wide text-[#ff7033] hidden md:inline mt-1">
                          {item.category}
                        </span>
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 flex flex-col text-left">
                        {/* Description */}
                        <div className="flex-grow mb-3 md:mb-4">
                          <p className="text-white line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-sm">
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
                                className="text-xs cursor-pointer bg-white hover:hero-gradient hover:border-[#ff7033] hover:text-white transition-colors px-2 md:px-2 py-1 md:py-1 border-gray-300 text-[#020a1c]"
                              >
                                {app}
                              </Badge>
                            ))}
                            {item.keyApplications.length > 2 && (
                              <Badge 
                                variant="outline" 
                                className="text-xs cursor-pointer bg-white hover:hero-gradient hover:border-[#ff7033] hover:text-white transition-colors px-2 md:px-2 py-1 md:py-1 border-gray-300 text-[#020a1c]"
                              >
                                +{item.keyApplications.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className="mt-auto pt-2">
                          <Button 
                            className="w-full bg-[#ff7033] text-white hover:hero-gradient hover:border-[#ff7033] hover:scale-105 hover:shadow-xl transition-all duration-300 relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 border text-sm py-2 min-h-[48px]"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFilter({type: 'industry', value: item.industryValue});
                            }}
                          >
                            Explore {item.title.split(' ')[0]} Tools
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
                      {item.applicableIndustries.slice(0, 2).map((industry: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-[#ff7033] hover:text-white transition-colors px-2 md:px-2 py-1 md:py-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to resources page with filter
                            window.location.href = `/resources?tech=${encodeURIComponent(industry)}`;
                          }}
                        >
                          {industry}
                        </Badge>
                      ))}
                      {item.applicableIndustries.length > 2 && (
                        <Badge
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-[#ff7033] hover:text-white transition-colors px-2 md:px-2 py-1 md:py-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSolution(item);
                          }}
                        >
                          +{item.applicableIndustries.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                      {/* Action Button Section */}
                      <div className="mt-auto pt-2">
                        <Button 
                          className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 text-sm py-2 min-h-[48px]"
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
                    {selectedSolution.type === 'product' ? 'Applicable Industries' : 'Tools'}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedSolution.applicableIndustries.map((industry: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className="cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white hover:border-primary"
                        onClick={() => {
                          // Close modal and navigate to resources
                          setSelectedSolution(null);
                          window.location.href = `/resources?tech=${encodeURIComponent(industry)}`;
                        }}
                      >
                        {industry}
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

      {/* Industry Detail Modal */}
      <Dialog open={!!selectedIndustry} onOpenChange={(open) => !open && setSelectedIndustry(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedIndustry && (
            <>
              {/* Header */}
              <div className="pb-6 border-b">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {selectedIndustry.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-foreground">{selectedIndustry.title}</h2>
                      <Badge variant="secondary" className="px-3 py-1">Industry Focus</Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedIndustry.fullDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="py-6 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Key Applications */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-foreground">Key AI Applications</h4>
                    <ul className="space-y-3">
                      {selectedIndustry.keyApplications?.map((app: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary Solutions */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-foreground">Recommended Tools</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedIndustry.primarySolutions?.map((solution: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                          onClick={() => {
                            // Find and open the corresponding solution
                            const targetSolution = solutions.find(s =>
                              s.category.toLowerCase().includes(solution.toLowerCase()) ||
                              solution.toLowerCase().includes(s.category.toLowerCase())
                            );
                            if (targetSolution) {
                              setSelectedIndustry(null);
                              setSelectedSolution(targetSolution);
                            }
                          }}
                        >
                          {solution}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                {selectedIndustry.metrics && (
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-foreground">Industry Impact Metrics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(selectedIndustry.metrics).map(([key, value]) => (
                        <div key={key} className="bg-muted/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-primary mb-1">{value as string}</div>
                          <div className="text-sm text-muted-foreground">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {selectedIndustry.benefits && (
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-foreground">Key Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedIndustry.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-6 border-t flex items-center justify-between">
                <Button
                  onClick={() => {
                    setSelectedIndustry(null);
                    setSelectedFilter({type: 'industry', value: selectedIndustry.industryValue});
                  }}
                  variant="outline"
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  View All {selectedIndustry.title} Tools
                </Button>

                <Button
                  onClick={() => {
                    setSelectedIndustry(null);
                    handleViewDemo("assessment");
                  }}
                  className="gap-2 bg-primary text-white hover:bg-primary/90"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
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