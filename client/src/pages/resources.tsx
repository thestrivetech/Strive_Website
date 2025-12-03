import { useState, useEffect } from "react";
import React from "react";
import { Download, FileText, BookOpen, BarChart3, Sparkles, Eye, X, ExternalLink, Clock, User, Calendar, Filter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MetaTags } from "@/components/seo/meta-tags";
import { useSEO } from "@/hooks/use-seo";

// Import data from new modular structure
import { Resource, resources } from "@/data/resources";
import { featuredResource } from "@/data/resources/featured";
import { ethicalAIImplementation } from "@/data/resources/whitepapers";
import { SubFilterBar } from "@/components/ui/sub-filter-bar";
import { WhitepaperViewer } from "@/components/resources/WhitepaperViewer";

const Resources = () => {
  const { seoConfig } = useSEO();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showWhitepaperViewer, setShowWhitepaperViewer] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);

  // Subfilter state
  const [subFilter, setSubFilter] = useState<{
    category: string;
    searchTerm: string;
  }>({ category: 'all', searchTerm: '' });

  const [subFilterOptions, setSubFilterOptions] = useState<Array<{
    value: string;
    label: string;
    count: number;
  }>>([]);


  const filters = [
    { name: "All", icon: null },
    { name: "Blog Posts", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "Case Studies", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
  ];

  // Update subfilter options when active filter changes
  useEffect(() => {
    if (activeFilter === "All") {
      setSubFilterOptions([]);
      setSubFilter({ category: 'all', searchTerm: '' });
    } else {
      const mainFiltered = resources.filter(resource => {
        if (activeFilter === "Blog Posts") return resource.type === "BLOG POST";
        if (activeFilter === "Whitepapers") return resource.type === "WHITEPAPER";
        if (activeFilter === "Case Studies") return resource.type === "CASE STUDY";
        return true;
      });

      const options = getSubFilterOptionsForActiveFilter(mainFiltered);
      setSubFilterOptions(options);
      setSubFilter({ category: 'all', searchTerm: '' });
    }
  }, [activeFilter]);

  // Helper functions for subfilter categories
  const extractUniqueCategories = (resourceList: Resource[], categoryType: string) => {
    const categories = new Set<string>();

    resourceList.forEach(resource => {
      switch (categoryType) {
        case 'tags':
          resource.tags.forEach(tag => categories.add(tag));
          break;
        case 'metadata':
          if (resource.metadata) categories.add(resource.metadata);
          break;
        case 'author':
          if (resource.author) categories.add(resource.author);
          break;
        case 'industry':
          // For case studies, extract industry from metadata or infer from tags
          if (resource.type === "CASE STUDY") {
            if (resource.metadata) categories.add(resource.metadata);
            // Also add relevant tags that represent industries
            const industryTags = resource.tags.filter(tag =>
              ['Healthcare', 'Finance', 'Technology', 'Manufacturing', 'Retail', 'Education',
               'Agriculture', 'Automotive', 'Gaming', 'Legal', 'Insurance', 'Energy',
               'Media', 'Transportation', 'Government', 'Real Estate'].includes(tag)
            );
            industryTags.forEach(tag => categories.add(tag));
          }
          break;
      }
    });

    return Array.from(categories).sort();
  };

  const getSubFilterOptionsForActiveFilter = (resourceList: Resource[]) => {
    const options: Array<{ value: string; label: string; count: number }> = [
      { value: 'all', label: 'All', count: resourceList.length }
    ];

    let categories: string[] = [];

    switch (activeFilter) {
      case "Blog Posts":
        // Create meaningful topic-based categories for blog posts
        const blogCategories = new Set<string>();

        resourceList.forEach(resource => {
          resource.tags.forEach(tag => {
            const tagLower = tag.toLowerCase();

            if (['ai', 'artificial intelligence', 'machine learning', 'ml', 'neural', 'deep learning', 'llm', 'gpt', 'ai model', 'claude', 'chatgpt', 'gemini', 'grok'].some(term => tagLower.includes(term))) {
              blogCategories.add('AI & Machine Learning');
            }
            if (['business', 'strategy', 'productivity', 'efficiency', 'roi', 'success', 'metric', 'value', 'transformation'].some(term => tagLower.includes(term))) {
              blogCategories.add('Business Strategy');
            }
            if (['tutorial', 'how-to', 'guide', 'implementation', 'setup', 'getting started', 'beginner', 'step'].some(term => tagLower.includes(term))) {
              blogCategories.add('Tutorials & Guides');
            }
            if (['industry', 'trends', 'news', 'updates', 'market', 'forecast', '2025', 'future', 'analysis'].some(term => tagLower.includes(term))) {
              blogCategories.add('Industry Insights');
            }
            if (['technology', 'tools', 'software', 'platform', 'framework', 'development', 'comparison', 'chatgpt', 'claude', 'grok'].some(term => tagLower.includes(term))) {
              blogCategories.add('Technology & Tools');
            }
            if (['automation', 'workflow', 'process', 'optimization', 'efficiency', 'roi'].some(term => tagLower.includes(term))) {
              blogCategories.add('Process Automation');
            }
            if (['real estate', 'crm', 'agent', 'broker', 'transaction', 'lead', 'property'].some(term => tagLower.includes(term))) {
              blogCategories.add('Real Estate');
            }
          });
        });

        categories = Array.from(blogCategories).sort();
        break;
      case "Case Studies":
        categories = extractUniqueCategories(resourceList, 'industry');
        break;
      case "Whitepapers":
        // Create meaningful categories based on whitepaper tags
        const whitepaperCategories = new Set<string>();

        resourceList.forEach(resource => {
          resource.tags.forEach(tag => {
            const tagLower = tag.toLowerCase();

            if (['ai/ml', 'deep learning', 'neural networks', 'predictive analytics', 'nlp', 'language models', 'conversational ai', 'computer vision', 'image recognition', 'object detection', 'visual ai', 'text analytics'].some(term => tagLower.includes(term.toLowerCase()))) {
              whitepaperCategories.add('AI & Machine Learning');
            } else if (['cloud security', 'compliance', 'risk management', 'cybersecurity'].some(term => tagLower.includes(term.toLowerCase()))) {
              whitepaperCategories.add('Security & Compliance');
            }
          });
        });

        categories = Array.from(whitepaperCategories).sort();
        break;
      default:
        return options;
    }

    // Add category options with counts
    categories.forEach(category => {
      const count = countResourcesByCategory(resourceList, category, activeFilter);
      if (count > 0) {
        options.push({
          value: category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'),
          label: category,
          count
        });
      }
    });

    return options;
  };

  const countResourcesByCategory = (resourceList: Resource[], category: string, filterType: string) => {
    return resourceList.filter(resource => {
      switch (filterType) {
        case "Blog Posts":
          const categoryLowerBlog = category.toLowerCase();
          if (categoryLowerBlog === 'ai & machine learning' || categoryLowerBlog === 'ai-machine-learning' || categoryLowerBlog === 'ai-and-machine-learning') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['ai', 'artificial intelligence', 'machine learning', 'ml', 'neural', 'deep learning', 'llm', 'gpt', 'ai model', 'claude', 'chatgpt', 'gemini', 'grok'].some(term => tagLower.includes(term));
            });
          } else if (categoryLowerBlog === 'business strategy' || categoryLowerBlog === 'business-strategy') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['business', 'strategy', 'productivity', 'efficiency', 'roi', 'success', 'metric', 'value', 'transformation'].some(term => tagLower.includes(term));
            });
          } else if (categoryLowerBlog === 'tutorials & guides' || categoryLowerBlog === 'tutorials-guides' || categoryLowerBlog === 'tutorials-and-guides') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['tutorial', 'how-to', 'guide', 'implementation', 'setup', 'getting started', 'beginner', 'step'].some(term => tagLower.includes(term));
            });
          } else if (categoryLowerBlog === 'industry insights' || categoryLowerBlog === 'industry-insights') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['industry', 'trends', 'news', 'updates', 'market', 'forecast', '2025', 'future', 'analysis'].some(term => tagLower.includes(term));
            });
          } else if (categoryLowerBlog === 'technology & tools' || categoryLowerBlog === 'technology-tools' || categoryLowerBlog === 'technology-and-tools') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['technology', 'tools', 'software', 'platform', 'framework', 'development', 'comparison', 'chatgpt', 'claude', 'grok'].some(term => tagLower.includes(term));
            });
          } else if (categoryLowerBlog === 'process automation' || categoryLowerBlog === 'process-automation') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['automation', 'workflow', 'process', 'optimization', 'efficiency', 'roi'].some(term => tagLower.includes(term));
            });
          } else if (categoryLowerBlog === 'real estate' || categoryLowerBlog === 'real-estate') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['real estate', 'crm', 'agent', 'broker', 'transaction', 'lead', 'property'].some(term => tagLower.includes(term));
            });
          }
          return false;
        case "Whitepapers":
          const categoryLower = category.toLowerCase();
          if (categoryLower === 'ai & machine learning' || categoryLower === 'ai-machine-learning') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['ai/ml', 'deep learning', 'neural networks', 'predictive analytics', 'nlp', 'language models', 'conversational ai', 'computer vision', 'image recognition', 'object detection', 'visual ai', 'text analytics'].some(term => tagLower.includes(term.toLowerCase()));
            });
          } else if (categoryLower === 'security & compliance' || categoryLower === 'security-compliance') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['cloud security', 'compliance', 'risk management', 'cybersecurity'].some(term => tagLower.includes(term.toLowerCase()));
            });
          }
          return false;
        case "Case Studies":
          return resource.metadata?.toLowerCase() === category.toLowerCase() ||
                 resource.tags.some(tag => tag.toLowerCase() === category.toLowerCase());
        default:
          return false;
      }
    }).length;
  };

  const applySubFilters = (resourceList: Resource[]) => {
    let filtered = resourceList;

    // Apply category filter
    if (subFilter.category !== 'all') {
      filtered = filtered.filter(resource => {
        // Handle Blog Posts with grouped categories
        if (activeFilter === "Blog Posts") {
          const categoryLower = subFilter.category;
          if (categoryLower === 'ai-machine-learning' || categoryLower === 'ai-and-machine-learning') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['ai', 'artificial intelligence', 'machine learning', 'ml', 'neural', 'deep learning', 'llm', 'gpt', 'ai model', 'claude', 'chatgpt', 'gemini', 'grok'].some(term => tagLower.includes(term));
            });
          } else if (categoryLower === 'business-strategy') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['business', 'strategy', 'productivity', 'efficiency', 'roi', 'success', 'metric', 'value', 'transformation'].some(term => tagLower.includes(term));
            });
          } else if (categoryLower === 'tutorials-guides' || categoryLower === 'tutorials-and-guides') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['tutorial', 'how-to', 'guide', 'implementation', 'setup', 'getting started', 'beginner', 'step'].some(term => tagLower.includes(term));
            });
          } else if (categoryLower === 'industry-insights') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['industry', 'trends', 'news', 'updates', 'market', 'forecast', '2025', 'future', 'analysis'].some(term => tagLower.includes(term));
            });
          } else if (categoryLower === 'technology-tools' || categoryLower === 'technology-and-tools') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['technology', 'tools', 'software', 'platform', 'framework', 'development', 'comparison', 'chatgpt', 'claude', 'grok'].some(term => tagLower.includes(term));
            });
          } else if (categoryLower === 'process-automation') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['automation', 'workflow', 'process', 'optimization', 'efficiency', 'roi'].some(term => tagLower.includes(term));
            });
          } else if (categoryLower === 'real-estate') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['real estate', 'crm', 'agent', 'broker', 'transaction', 'lead', 'property'].some(term => tagLower.includes(term));
            });
          }
          return false;
        }

        // Handle Whitepapers with grouped categories
        if (activeFilter === "Whitepapers") {
          const categoryLower = subFilter.category;
          if (categoryLower === 'ai-machine-learning') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['ai/ml', 'deep learning', 'neural networks', 'predictive analytics', 'nlp', 'language models', 'conversational ai', 'computer vision', 'image recognition', 'object detection', 'visual ai', 'text analytics'].some(term => tagLower.includes(term.toLowerCase()));
            });
          } else if (categoryLower === 'security-compliance') {
            return resource.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['cloud security', 'compliance', 'risk management', 'cybersecurity'].some(term => tagLower.includes(term.toLowerCase()));
            });
          }
          return false;
        }

        // Handle other resource types with direct tag matching
        const categoryMatch = resource.tags.some(tag =>
          tag.toLowerCase().replace(/\s+/g, '-') === subFilter.category
        ) || (resource.metadata?.toLowerCase().replace(/\s+/g, '-') === subFilter.category);
        return categoryMatch;
      });
    }

    // Apply search filter
    if (subFilter.searchTerm.trim()) {
      const searchTerm = subFilter.searchTerm.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.shortDescription.toLowerCase().includes(searchTerm) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        resource.author?.toLowerCase().includes(searchTerm) ||
        resource.metadata?.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  // Updated filtering logic that applies both main filter and subfilters
  const getMainFilteredResources = () => {
    if (activeFilter === "All") return resources;

    return resources.filter(resource => {
      if (activeFilter === "Blog Posts") return resource.type === "BLOG POST";
      if (activeFilter === "Whitepapers") return resource.type === "WHITEPAPER";
      if (activeFilter === "Case Studies") return resource.type === "CASE STUDY";
      return false;
    });
  };

  const mainFilteredResources = getMainFilteredResources();
  const filteredResources = applySubFilters(mainFilteredResources);

  const getTypeIcon = (type: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      "BLOG POST": <BookOpen className="h-5 w-5" />,
      "WHITEPAPER": <FileText className="h-5 w-5" />,
      "CASE STUDY": <BarChart3 className="h-5 w-5" />
    };
    return iconMap[type] || <FileText className="h-5 w-5" />;
  };

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      "BLOG POST": "bg-blue-500",
      "WHITEPAPER": "bg-purple-500",
      "CASE STUDY": "bg-green-500"
    };
    return colorMap[type] || "bg-gray-500";
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsNewsletterSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Successfully subscribed!",
          description: result.message || "Welcome to our newsletter!",
        });
        setNewsletterEmail("");
      } else {
        toast({
          title: "Subscription failed",
          description: result.message || "Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <>
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
                <BookOpen className="text-primary h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 text-white px-4"
              data-testid="text-hero-title"
            >
              Real Estate <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block pb-2">Resources</span> & Insights
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#94a3b8] max-w-4xl mx-auto mb-6 sm:mb-7 md:mb-8 px-4"
              data-testid="text-hero-subtitle"
            >
              Industry research, AI trends, and expert insights on how technology is transforming real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 min-h-[44px] w-full sm:w-auto"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-explore-resources"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl min-h-[44px] w-full sm:w-auto"
                onClick={() => document.getElementById('resource-library')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-get-insights"
              >
                Explore Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Library Section - White Background */}
      <section id="resource-library" className="py-16 bg-[#ffffffeb] shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Descriptions */}
          {activeFilter === "Blog Posts" && (
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 text-slate-800">
                Agent Insights & <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Guides</span>
              </h3>
              <p className="text-slate-600 text-lg">
                Practical guides, CRM strategies, and productivity tips for real estate professionals.
              </p>
            </div>
          )}

          {activeFilter === "Case Studies" && (
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 text-slate-800">
                Success Stories & <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Results</span>
              </h3>
              <p className="text-slate-600 text-lg">
                Real results from real estate agents and teams who transformed their business with SAI Platform.
              </p>
            </div>
          )}

          {/* Featured Whitepaper - Only show on All filter */}
          {activeFilter === "All" && (
            <div className="bg-off-white rounded-2xl overflow-hidden mb-16 shadow-lg border border-slate-100">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative">
                    <img
                      src={featuredResource.imageUrl}
                      alt={featuredResource.imageAlt}
                      className="w-full h-64 md:h-full object-cover"
                      data-testid="img-featured-resource"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
                        data-testid="text-trending-badge"
                      >
                        <Sparkles className="h-3 w-3 mr-1" /> FEATURED
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  <div
                    className="text-sm text-orange-500 uppercase tracking-wide font-semibold mb-4 flex items-center"
                    data-testid="text-featured-type"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {featuredResource.type}
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4 text-slate-800"
                    data-testid="text-featured-title"
                  >
                    {featuredResource.title}
                  </h3>
                  <p
                    className="text-slate-600 mb-6 leading-relaxed"
                    data-testid="text-featured-description"
                  >
                    {featuredResource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button
                      className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2"
                      data-testid="button-download-featured"
                      onClick={() => {
                        setSelectedResource(ethicalAIImplementation);
                        setShowWhitepaperViewer(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Whitepaper
                    </Button>
                    <div className="text-sm text-slate-500 flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      <span data-testid="text-download-count">
                        {featuredResource.downloads} downloads
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resource Categories - Filter buttons moved after section titles */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 md:mb-12">
            {/* Mobile Dropdown */}
            <div className="sm:hidden w-full max-w-xs">
              <Select value={activeFilter} onValueChange={(value) => {
                if (activeFilter === value) {
                  // Deselect if already selected
                  setActiveFilter("All");
                } else {
                  setActiveFilter(value);
                }
              }}>
                <SelectTrigger className="w-full bg-[#020a1c] border-orange-500 text-white focus:border-orange-400">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      {filters.find(f => f.name === activeFilter)?.icon}
                    </div>
                    <span className="flex-grow text-left">
                      {filters.find(f => f.name === activeFilter)?.name}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#020a1c] border-orange-500">
                  {filters.map((filter) => (
                    <SelectItem
                      key={filter.name}
                      value={filter.name}
                      className={`text-white cursor-pointer hover:bg-orange-500/20 focus:bg-orange-500/20 hover:text-[#ff7033] hover:[&_svg]:text-[#ff7033] ${
                        activeFilter === filter.name
                          ? "bg-orange-500/20 text-[#ff7033] [&_svg]:text-[#ff7033]"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {filter.icon}
                        <span>{filter.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Buttons - Only All and Filter */}
            <div className="hidden sm:flex gap-2">
              <Button
                variant={activeFilter === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("All")}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  activeFilter === "All"
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'border-primary/20 text-foreground hover:border-primary hover:text-primary hover:scale-105'
                }`}
              >
                <Globe className="h-4 w-4" />
                All
              </Button>
              <Select value={activeFilter === "All" ? "" : activeFilter} onValueChange={(value) => {
                if (activeFilter === value) {
                  // Deselect if already selected
                  setActiveFilter("All");
                } else {
                  setActiveFilter(value);
                }
              }}>
                <SelectTrigger className={`w-auto min-w-[60px] px-2 py-1 text-sm transition-all duration-200 ${
                  activeFilter !== "All" && activeFilter
                    ? "bg-primary text-white shadow-lg scale-105 border-primary"
                    : "border-primary/20 text-foreground hover:border-primary hover:text-primary"
                }`}>
                  <div className="flex items-center gap-1">
                    <Filter className="h-3 w-3 flex-shrink-0" />
                    <span className="flex-grow text-left text-xs">
                      {activeFilter !== "All" && activeFilter
                        ? filters.find(f => f.name === activeFilter)?.name || "Filter"
                        : "Filter"
                      }
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {filters.filter(f => f.name !== "All").map((filter) => (
                    <SelectItem
                      key={filter.name}
                      value={filter.name}
                      className={`cursor-pointer hover:text-[#ff7033] hover:[&_svg]:text-[#ff7033] ${
                        activeFilter === filter.name
                          ? "bg-[#ff7033]/10 text-[#ff7033] [&_svg]:text-[#ff7033]"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {filter.icon}
                        <span>{filter.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SubFilter Bar - Only show when a specific filter is selected */}
          {activeFilter !== "All" && subFilterOptions.length > 0 && (
            <div className="mb-8">
              <SubFilterBar
                searchTerm={subFilter.searchTerm}
                selectedCategory={subFilter.category}
                options={subFilterOptions}
                onSearchChange={(term) => setSubFilter(prev => ({ ...prev, searchTerm: term }))}
                onCategoryChange={(category) => setSubFilter(prev => ({ ...prev, category }))}
                maxVisibleCategories={5}
              />
            </div>
          )}

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
            {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 h-full flex flex-col"
              onClick={() => {
                setSelectedResource(resource);
                if (resource.type === "WHITEPAPER" && resource.fullContent) {
                  setShowWhitepaperViewer(true);
                }
              }}
              data-testid={`card-resource-${resource.id}`}
            >
              {/* Mobile: Horizontal Layout, Desktop: Vertical Layout */}
              <div className="flex flex-row md:flex-col h-full">
                {/* Left Side - Photo and Metadata (Mobile) / Top (Desktop) */}
                <div className="flex flex-col justify-between flex-shrink-0 w-28 md:w-full">
                  {/* Image Container */}
                  <div className="relative overflow-hidden w-28 h-40 md:w-full md:h-48 lg:h-48 flex-shrink-0">
                    <img
                      src={resource.imageUrl}
                      alt={resource.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      data-testid={`img-resource-${resource.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 left-2">
                      <Badge className={`${getTypeColor(resource.type)} text-white border-0 text-xs px-2 py-1`}>
                        {resource.type}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-1">
                        <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only Metadata Section */}
                  <div className="md:hidden px-2 py-2 mt-auto">
                    <div className="flex flex-col gap-1 text-xs text-[#1e3a8a]">
                      <span className="truncate font-medium" data-testid={`text-resource-metadata-${resource.id}`}>
                        {resource.metadata}
                      </span>
                      <span className="truncate text-muted-foreground" data-testid={`text-resource-date-${resource.id}`}>
                        {resource.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content (Mobile) / Below photo (Desktop) */}
                <CardContent className="p-4 md:p-6 flex flex-col flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <div className="text-primary">
                      {getTypeIcon(resource.type)}
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wide text-[#020a1c] hidden sm:inline">
                      {resource.type}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-xl font-bold text-[#ff7033] mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                    {resource.title}
                  </h3>

                  <p className="text-muted-foreground mb-3 md:mb-4 line-clamp-3 text-xs md:text-sm flex-grow leading-relaxed">
                    {resource.shortDescription}
                  </p>

                  <div className="flex gap-1 mb-3 md:mb-4 overflow-hidden">
                    {resource.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1 whitespace-nowrap flex-shrink-0">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs px-2 py-1 whitespace-nowrap flex-shrink-0">
                        +{resource.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Desktop-only Metadata Section */}
                  <div className="hidden md:flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="text-sm font-medium" data-testid={`text-resource-metadata-${resource.id}`}>
                      {resource.metadata}
                    </span>
                    <span className="text-sm" data-testid={`text-resource-date-${resource.id}`}>
                      {resource.date}
                    </span>
                  </div>

                  <Button
                    className="w-full mt-auto group-hover:bg-primary group-hover:text-white transition-all duration-300 text-sm py-2 min-h-[40px]"
                    variant="outline"
                  >
                    View Details
                    <Eye className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-slate-100 rounded-2xl p-8 md:p-12 text-center mt-16">
            <div
              className="inline-flex items-center text-sm text-orange-500 uppercase tracking-wide font-semibold mb-4"
              data-testid="text-exclusive-badge"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              EXCLUSIVE CONTENT
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 text-slate-800"
              data-testid="text-newsletter-title"
            >
              Get Real Estate <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Insights</span>
            </h2>
            <p
              className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto"
              data-testid="text-newsletter-description"
            >
              Agent productivity tips, CRM strategies, and SAI Platform updates delivered to your inbox. Join real estate professionals growing their business.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-off-white border-slate-200 text-slate-800 px-4 py-3 rounded-lg"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-newsletter-subscribe"
                >
                  {isNewsletterSubmitting ? "Subscribing..." : "Get Started"}
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mt-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Free to join
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Weekly insights
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Unsubscribe anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whitepaper Viewer Modal */}
      <Dialog open={showWhitepaperViewer} onOpenChange={(open) => {
        if (!open) {
          setShowWhitepaperViewer(false);
          setSelectedResource(null);
        }
      }}>
        {showWhitepaperViewer && selectedResource?.fullContent && (
          <WhitepaperViewer
            resource={selectedResource}
            onClose={() => {
              setShowWhitepaperViewer(false);
              setSelectedResource(null);
            }}
          />
        )}
      </Dialog>

      {/* Resource Detail Modal */}
      <Dialog open={!!selectedResource && !showWhitepaperViewer} onOpenChange={() => setSelectedResource(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            "max-h-[90vh] overflow-y-auto modal-scrollbar"
          )}>
          {selectedResource && (
            <>
              <DialogTitle className="sr-only">{selectedResource.title}</DialogTitle>
              <DialogDescription className="sr-only">
                Detailed view of {selectedResource.title} resource including full content, key insights, and actionable recommendations
              </DialogDescription>
              <div className="relative">
                <img
                  src={selectedResource.imageUrl}
                  alt={selectedResource.imageAlt}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <DialogPrimitive.Close className="absolute right-4 top-4 bg-gray-800/80 hover:bg-gray-700/90 border-2 border-orange-500/50 hover:border-orange-500 rounded-lg h-10 w-10 p-0 z-50 transition-all duration-200">
                <X className="h-5 w-5 text-white m-auto" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    {getTypeIcon(selectedResource.type)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedResource.title}</h2>
                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {selectedResource.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedResource.readTime || selectedResource.metadata}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {selectedResource.date}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed">{selectedResource.fullDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Points</h3>
                    <ul className="space-y-2">
                      {selectedResource.content.keyPoints.map((point: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Insights</h3>
                    <ul className="space-y-2">
                      {selectedResource.content.insights.map((insight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Action Items</h3>
                    <ul className="space-y-2">
                      {selectedResource.content.actionItems.map((action: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Sources</h3>
                  <div className="space-y-2">
                    {selectedResource.sources?.map((source, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <ExternalLink className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {source.title}
                          </a>
                          {source.description && (
                            <p className="text-xs text-muted-foreground mt-1">{source.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-6 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-6 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Expert Insight
                  </Button>
                </div>
              </div>
            </>
          )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </Dialog>
    </div>
    </>
  );
};

export default Resources;
