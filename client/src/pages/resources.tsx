import { useState, useEffect } from "react";
import React from "react";
import { Download, FileText, BookOpen, BarChart3, Sparkles, Eye, X, ExternalLink, Clock, User, Calendar, BrainCircuit, Play, CheckCircle, AlertCircle, Trophy, Target, Wrench, Filter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Import data from new modular structure
import { Resource, technologyCards, resources } from "@/data/resources";
import { Quiz, QuizQuestion, QuizResult, allQuizzes } from "@/data/resources/quizzes";
import { featuredResource } from "@/data/resources/featured";
import { ethicalAIImplementation } from "@/data/resources/whitepapers";
import { SubFilterBar } from "@/components/ui/sub-filter-bar";
import { WhitepaperViewer } from "@/components/resources/WhitepaperViewer";

// Types are now imported from the modular structure

const Resources = () => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showWhitepaperViewer, setShowWhitepaperViewer] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  
  // Quiz state
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  
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
  
  // featuredResource is now imported from @/data/featured

  // technologyCards is now imported from @/data/resources

  // resources is now imported from @/data/resources

  // Handle navigation from Portfolio and Solutions page technology badges
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    const tech = urlParams.get('tech');
    
    // Handle filter parameter
    if (filterParam === 'tools-tech') {
      setActiveFilter('Tools & Tech');
    }
    
    if (tech) {
      // First check technology cards for portfolio navigation
      const techCard = technologyCards.find(card => 
        card.tags?.some(tag => tag.toLowerCase() === tech.toLowerCase()) ||
        card.title.toLowerCase().includes(tech.toLowerCase())
      );
      
      if (techCard && filterParam === 'tools-tech') {
        // Open the tech card modal
        setTimeout(() => {
          setSelectedResource(techCard);
        }, 500);
      } else {
        // Fallback: Find and open the corresponding resource
        const techResource = resources.find(resource => 
          resource.tags?.some(tag => tag.toLowerCase() === tech.toLowerCase()) ||
          resource.title.toLowerCase().includes(tech.toLowerCase())
        );
        
        if (techResource) {
          // Set appropriate filter based on resource type
          if (techResource.type === "WHITEPAPER") {
            setActiveFilter("Whitepapers");
          } else if (techResource.type === "CASE STUDY") {
            setActiveFilter("Case Studies");
          }
          
          // Open the resource modal
          setTimeout(() => {
            setSelectedResource(techResource);
          }, 500);
        }
      }
      
      // Clean the URL
      setTimeout(() => {
        window.history.replaceState({}, document.title, '/resources');
      }, 1000);
    }
  }, [technologyCards]);

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
  }, [activeFilter, resources, technologyCards, allQuizzes]);

  // quizzes is now imported from @/data/quizzes as allQuizzes

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
               'Media', 'Transportation', 'Government'].includes(tag)
            );
            industryTags.forEach(tag => categories.add(tag));
          }
          break;
        case 'difficulty':
          // For quizzes, extract difficulty levels
          if (activeFilter === "Quizzes") {
            // This would be handled by the quizzes separately
          }
          break;
      }
    });
    
    return Array.from(categories).sort();
  };

  const getSubFilterOptionsForActiveFilter = (resourceList: Resource[]) => {
    const options: Array<{ value: string; label: string; count: number }> = [
      { value: 'all', label: 'All', count: activeFilter === "Tools & Tech" ? technologyCards.length : activeFilter === "Quizzes" ? allQuizzes.length : resourceList.length }
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
      case "Tools & Tech":
        // Create meaningful categories based on technology card tags and content
        const techCategories = new Set<string>();
        
        technologyCards.forEach(card => {
          card.tags.forEach(tag => {
            // Categorize based on common patterns in tags
            const tagLower = tag.toLowerCase();
            
            if (['gpt-4', 'claude', 'gemini', 'grok', 'deepseek', 'nemotron', 'perplexity', 'ai assistant', 'llm'].some(term => tagLower.includes(term))) {
              techCategories.add('LLMs & AI Models');
            } else if (['python', 'typescript', 'rust', 'javascript', 'programming'].some(term => tagLower.includes(term))) {
              techCategories.add('Programming Languages');
            } else if (['tensorflow', 'langchain', 'fastapi', 'multi-agent', 'langgraph', 'computer vision', 'machine learning', 'ai development'].some(term => tagLower.includes(term))) {
              techCategories.add('AI/ML Frameworks');
            } else if (['docker', 'kubernetes', 'redis', 'supabase', 'node.js', 'vector database', 'drizzle', 'websocket', 'infrastructure', 'devops'].some(term => tagLower.includes(term))) {
              techCategories.add('Infrastructure & DevOps');
            } else if (['n8n', 'atlassian', 'openrouter', 'tailwind', 'recharts', 'development', 'tools'].some(term => tagLower.includes(term))) {
              techCategories.add('Development Tools');
            } else if (['f5', 'red hat', 'vmware', 'graph rag', 'knowledge graph', 'mcp', 'enterprise'].some(term => tagLower.includes(term))) {
              techCategories.add('Enterprise Solutions');
            }
          });
        });
        
        categories = Array.from(techCategories).sort();
        break;
      case "Quizzes":
        // For quizzes, extract difficulty levels
        categories = Array.from(new Set(allQuizzes.map(quiz => quiz.difficulty))).sort();
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
  };;

  const countResourcesByCategory = (resourceList: Resource[], category: string, filterType: string) => {
    if (filterType === "Tools & Tech") {
      // Count technology cards that match the category
      return technologyCards.filter(card => {
        const categoryLower = category.toLowerCase();
        
        switch (categoryLower) {
          case 'llms & ai models':
          case 'llms-and-ai-models':
            return card.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['gpt-4', 'claude', 'gemini', 'grok', 'deepseek', 'nemotron', 'perplexity', 'ai assistant', 'llm'].some(term => tagLower.includes(term));
            });
          case 'programming languages':
          case 'programming-languages':
            return card.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['python', 'typescript', 'rust', 'javascript', 'programming'].some(term => tagLower.includes(term));
            });
          case 'ai/ml frameworks':
          case 'ai-ml-frameworks':
          case 'aiml-frameworks':
          case 'ai/ml-frameworks':
          case 'ai-and-ml-frameworks':
          case 'aiandml-frameworks':
            return card.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['tensorflow', 'langchain', 'fastapi', 'multi-agent', 'langgraph', 'computer vision', 'machine learning', 'ai development', 'ai framework'].some(term => tagLower.includes(term));
            });
          case 'infrastructure & devops':
          case 'infrastructure-and-devops':
            return card.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['docker', 'kubernetes', 'redis', 'supabase', 'node.js', 'vector database', 'drizzle', 'websocket', 'infrastructure', 'devops'].some(term => tagLower.includes(term));
            });
          case 'development tools':
          case 'development-tools':
            return card.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['n8n', 'atlassian', 'openrouter', 'tailwind', 'recharts', 'development', 'tools'].some(term => tagLower.includes(term));
            });
          case 'enterprise solutions':
          case 'enterprise-solutions':
            return card.tags.some(tag => {
              const tagLower = tag.toLowerCase();
              return ['f5', 'red hat', 'vmware', 'graph rag', 'knowledge graph', 'mcp', 'enterprise'].some(term => tagLower.includes(term));
            });
          default:
            return false;
        }
      }).length;
    }

    if (filterType === "Quizzes") {
      // Count quizzes by difficulty level
      return allQuizzes.filter(quiz => quiz.difficulty.toLowerCase() === category.toLowerCase()).length;
    }

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
  };;

  const applySubFilters = (resourceList: Resource[]) => {
    // For Tools & Tech, we need to handle filtering differently since it uses technologyCards
    if (activeFilter === "Tools & Tech") {
      let filteredTech = technologyCards;

      // Apply category filter for tech cards
      if (subFilter.category !== 'all') {
        const categoryLower = subFilter.category;
        
        filteredTech = filteredTech.filter(card => {
          switch (categoryLower) {
            case 'llms-and-ai-models':
              return card.tags.some(tag => {
                const tagLower = tag.toLowerCase();
                return ['gpt-4', 'claude', 'gemini', 'grok', 'deepseek', 'nemotron', 'perplexity', 'ai assistant', 'llm'].some(term => tagLower.includes(term));
              });
            case 'programming-languages':
              return card.tags.some(tag => {
                const tagLower = tag.toLowerCase();
                return ['python', 'typescript', 'rust', 'javascript', 'programming'].some(term => tagLower.includes(term));
              });
            case 'ai-ml-frameworks':
            case 'aiml-frameworks':
            case 'ai/ml-frameworks':
            case 'ai-and-ml-frameworks':
            case 'aiandml-frameworks':
              return card.tags.some(tag => {
                const tagLower = tag.toLowerCase();
                return ['tensorflow', 'langchain', 'fastapi', 'multi-agent', 'langgraph', 'computer vision', 'machine learning', 'ai development', 'ai framework'].some(term => tagLower.includes(term));
              });
            case 'infrastructure-and-devops':
              return card.tags.some(tag => {
                const tagLower = tag.toLowerCase();
                return ['docker', 'kubernetes', 'redis', 'supabase', 'node.js', 'vector database', 'drizzle', 'websocket', 'infrastructure', 'devops'].some(term => tagLower.includes(term));
              });
            case 'development-tools':
              return card.tags.some(tag => {
                const tagLower = tag.toLowerCase();
                return ['n8n', 'atlassian', 'openrouter', 'tailwind', 'recharts', 'development', 'tools'].some(term => tagLower.includes(term));
              });
            case 'enterprise-solutions':
              return card.tags.some(tag => {
                const tagLower = tag.toLowerCase();
                return ['f5', 'red hat', 'vmware', 'graph rag', 'knowledge graph', 'mcp', 'enterprise'].some(term => tagLower.includes(term));
              });
            default:
              return false;
          }
        });
      }

      // Apply search filter for tech cards
      if (subFilter.searchTerm.trim()) {
        const searchTerm = subFilter.searchTerm.toLowerCase();
        filteredTech = filteredTech.filter(card => 
          card.title.toLowerCase().includes(searchTerm) ||
          card.shortDescription.toLowerCase().includes(searchTerm) ||
          card.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          card.type?.toLowerCase().includes(searchTerm)
        );
      }

      // Return as Resource[] to maintain type compatibility
      return filteredTech as Resource[];
    }

    // For Quizzes, handle separately
    if (activeFilter === "Quizzes") {
      let filteredQuizzes = allQuizzes;

      // Apply difficulty filter for quizzes
      if (subFilter.category !== 'all') {
        filteredQuizzes = filteredQuizzes.filter(quiz => 
          quiz.difficulty.toLowerCase().replace(/\s+/g, '-') === subFilter.category
        );
      }

      // Apply search filter for quizzes
      if (subFilter.searchTerm.trim()) {
        const searchTerm = subFilter.searchTerm.toLowerCase();
        filteredQuizzes = filteredQuizzes.filter(quiz => 
          quiz.title.toLowerCase().includes(searchTerm) ||
          quiz.description.toLowerCase().includes(searchTerm) ||
          quiz.topic.toLowerCase().includes(searchTerm)
        );
      }

      // Return as Resource[] to maintain type compatibility
      return filteredQuizzes as unknown as Resource[];
    }

    // For regular resource types (Blog Posts, Case Studies, Whitepapers), use the original logic
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
  };;;

  // Updated filtering logic that applies both main filter and subfilters
  const getMainFilteredResources = () => {
    if (activeFilter === "All") return resources;
    
    return resources.filter(resource => {
      if (activeFilter === "Blog Posts") return resource.type === "BLOG POST";
      if (activeFilter === "Whitepapers") return resource.type === "WHITEPAPER";
      if (activeFilter === "Case Studies") return resource.type === "CASE STUDY";
      if (activeFilter === "Tools & Tech") return false; // Tech cards are handled separately
      if (activeFilter === "Quizzes") return false; // Quizzes are handled separately
      return false; // Default to false to prevent showing unfiltered resources
    });
  };;

  const mainFilteredResources = getMainFilteredResources();
  const filteredResources = applySubFilters(mainFilteredResources);

  const filteredTechCards = activeFilter === "Tools & Tech" ? (applySubFilters(technologyCards as Resource[]) as Resource[]) : [];

  const filteredQuizzes = activeFilter === "Quizzes" ? (applySubFilters([]) as unknown as Quiz[]) : [];

  // Quiz functionality
  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizStartTime(Date.now());
    setQuizResult(null);
    setShowQuizResult(false);
    setIsQuizModalOpen(true);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!selectedQuiz) return;
    
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === selectedQuiz.questions[index].correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    const timeSpent = Math.round((Date.now() - quizStartTime) / 1000 / 60); // minutes
    const passed = score >= selectedQuiz.passingScore;

    const result: QuizResult = {
      score,
      totalQuestions: selectedQuiz.questions.length,
      correctAnswers,
      timeSpent,
      passed
    };

    setQuizResult(result);
    setShowQuizResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    setShowQuizResult(false);
  };

  const closeQuizModal = () => {
    setIsQuizModalOpen(false);
    setSelectedQuiz(null);
    resetQuiz();
  };

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
              Discover how real estate professionals are transforming their businesses with SAI Platform—the all-in-one CRM built for agents, teams, and brokerages.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 min-h-[44px] w-full sm:w-auto"
                onClick={() => window.location.href = '/waitlist'}
                data-testid="button-explore-resources"
              >
                Join Waitlist
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
          {/* Only show "Explore Our Resource Library" on All filter */}
          {activeFilter === "All" && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-800" data-testid="text-library-title">
                Real Estate Success Stories & Insights
              </h2>
              <p className="text-slate-600 text-lg" data-testid="text-library-subtitle">
                Learn how real estate professionals are closing more deals, saving time, and growing their business with SAI Platform.
              </p>
            </div>
          )}

          {/* Section Descriptions */}
          {activeFilter === "All" && (
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 text-slate-800">
                Real Estate <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Resources</span>
              </h3>
              <p className="text-slate-600 text-lg">
                Browse our collection of real estate insights and success stories from agents using SAI Platform.
              </p>
            </div>
          )}

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

          {activeFilter === "Quizzes" && (
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 text-slate-800">
                AI Knowledge <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Quizzes</span>
              </h3>
              <p className="text-slate-600 text-lg">
                Test your AI expertise across different domains and difficulty levels.
              </p>
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

          {/* AI Knowledge Quizzes Section */}
          {activeFilter === "Quizzes" && (
            <div className="mb-16">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredQuizzes.map((quiz) => (
                  <Card 
                    key={quiz.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-blue-900 to-purple-900 h-full flex flex-col"
                    onClick={() => startQuiz(quiz)}
                    data-testid={`card-quiz-${quiz.id}`}
                  >
                    <div className="relative overflow-hidden flex-shrink-0">
                      <div className="h-32 md:h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <BrainCircuit className="w-8 h-8 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 opacity-80" />
                          <div className="text-xs md:text-sm font-medium uppercase tracking-wide">
                            {quiz.topic}
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 md:top-4 md:left-4">
                        <Badge className={`${
                          quiz.difficulty === 'beginner' ? 'bg-green-500' :
                          quiz.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                        } text-white border-0 capitalize text-xs px-2 py-1`}>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-3 md:p-6 text-white flex flex-col flex-grow">
                      {/* Mobile: Centered title, Desktop: Left-aligned */}
                      <h4 className="text-base md:text-xl font-bold mb-2 md:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 text-center md:text-left">
                        {quiz.title}
                      </h4>
                      
                      {/* Description - Left aligned */}
                      <p className="text-slate-300 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed line-clamp-3 flex-grow text-left">
                        {quiz.description}
                      </p>
                      
                      {/* Quiz Metrics - Centered on mobile */}
                      <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between text-xs text-slate-400 mb-3 md:mb-4 gap-2 md:gap-4">
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {quiz.questions.length} questions
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {quiz.timeLimit} min
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {quiz.passingScore}% to pass
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 mt-auto text-sm py-2 min-h-[44px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          startQuiz(quiz);
                        }}
                        data-testid={`button-start-quiz-${quiz.id}`}
                      >
                        <Play className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Technology Cards Section */}
          {activeFilter === "Tools & Tech" && (
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTechCards.map((tech) => (
                  <Card 
                    key={tech.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-slate-900 to-slate-800 h-full flex flex-col"
                    onClick={() => setSelectedResource(tech)}
                    data-testid={`card-tech-${tech.id}`}
                  >
                    <CardContent className="p-3 md:p-6 text-white flex flex-col h-full relative">
                      {/* Decorative gradient overlay */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-transparent rounded-full blur-3xl" />
                      
                      {/* Mobile: Centered layout, Desktop: Left-aligned layout */}
                      <div className="flex flex-col h-full">
                        {/* Icon and Title Section */}
                        <div className="flex flex-col items-center md:items-start mb-3 md:mb-3">
                          {/* Icon Section */}
                          <div className="mb-2 md:mb-2">
                            <div className="text-blue-400 transition-transform duration-300 group-hover:scale-110 text-2xl md:text-xl flex justify-center">
                              <Wrench className="h-8 w-8 md:h-5 md:w-5" />
                            </div>
                          </div>
                          
                          {/* Title Section - Centered on mobile */}
                          <h3 className="text-base md:text-xl font-bold group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 text-center md:text-left mb-1 md:mb-3">
                            {tech.title}
                          </h3>
                          
                          {/* Type - Desktop only */}
                          <span className="text-xs md:text-sm font-medium uppercase tracking-wide text-blue-400 hidden md:inline">
                            {tech.type}
                          </span>
                        </div>
                        
                        {/* Content Section - Left aligned */}
                        <div className="flex-1 flex flex-col text-left">
                          {/* Description Section */}
                          <div className="mb-3 md:mb-4">
                            <p className="text-slate-300 line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-sm">
                              {tech.shortDescription}
                            </p>
                          </div>
                          
                          {/* Tags Section */}
                          <div className="mb-4 md:mb-6">
                            <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                              {tech.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300 px-2 py-1">
                                  {tag}
                                </Badge>
                              ))}
                              {tech.tags.length > 2 && (
                                <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300 px-2 py-1">
                                  +{tech.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Action Button Section */}
                          <div className="mt-auto pt-2">
                            <Button 
                              className="w-full group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 text-sm py-2 min-h-[44px]"
                              variant="outline"
                            >
                              Learn More
                              <Eye className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Resource Grid */}
          {(activeFilter === "Blog Posts" || activeFilter === "Case Studies" || activeFilter === "Whitepapers" || activeFilter === "All") && (
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
          )}

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

      {/* Quiz Modal */}
      <Dialog open={isQuizModalOpen} onOpenChange={closeQuizModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto modal-scrollbar">
          {selectedQuiz && !showQuizResult && (
            <>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-blue-600" />
                {selectedQuiz.title}
              </DialogTitle>
              
              <div className="space-y-6">
                {/* Quiz Progress */}
                <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Badge className={`${
                      selectedQuiz.difficulty === 'beginner' ? 'bg-green-500' :
                      selectedQuiz.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white capitalize`}>
                      {selectedQuiz.difficulty}
                    </Badge>
                    <span className="text-sm text-slate-600">
                      Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    {selectedQuiz.timeLimit} min limit
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
                  />
                </div>

                {/* Current Question */}
                {selectedQuiz.questions[currentQuestionIndex] && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-blue-600">
                      {selectedQuiz.questions[currentQuestionIndex].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={userAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                          className={`w-full text-left justify-start p-4 h-auto transition-all duration-200 group ${
                            userAnswers[currentQuestionIndex] === index 
                              ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white shadow-lg" 
                              : "bg-off-white text-slate-700 hover:bg-blue-500 hover:text-white hover:shadow-md hover:scale-[1.02] border-slate-200 hover:border-blue-500"
                          }`}
                          onClick={() => handleQuizAnswer(index)}
                          data-testid={`button-quiz-option-${index}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              userAnswers[currentQuestionIndex] === index 
                                ? "border-off-white bg-off-white" 
                                : "border-slate-300 group-hover:border-white group-hover:bg-blue-400"
                            }`}>
                              {userAnswers[currentQuestionIndex] === index && (
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                              )}
                              {userAnswers[currentQuestionIndex] !== index && (
                                <div className="w-3 h-3 rounded-full bg-slate-300 group-hover:bg-white transition-all duration-200" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </Button>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={closeQuizModal}
                        className="flex-1"
                        data-testid="button-quit-quiz"
                      >
                        Quit Quiz
                      </Button>
                      <Button
                        onClick={nextQuestion}
                        disabled={userAnswers[currentQuestionIndex] === undefined}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        data-testid="button-next-question"
                      >
                        {currentQuestionIndex === selectedQuiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Quiz Results */}
          {selectedQuiz && showQuizResult && quizResult && (
            <>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Quiz Complete!
              </DialogTitle>
              
              <div className="space-y-8">
                {/* Score Display */}
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${
                    quizResult.passed ? "text-green-500" : "text-red-500"
                  }`}>
                    {quizResult.score}%
                  </div>
                  <div className={`text-xl font-semibold ${
                    quizResult.passed ? "text-green-600" : "text-red-600"
                  }`}>
                    {quizResult.passed ? "🎉 Congratulations! You Passed!" : "📚 Keep Learning!"}
                  </div>
                  <p className="text-slate-600">
                    You answered {quizResult.correctAnswers} out of {quizResult.totalQuestions} questions correctly
                  </p>
                </div>

                {/* Performance Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {quizResult.score}%
                    </div>
                    <div className="text-sm text-slate-600">Final Score</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {quizResult.correctAnswers}/{quizResult.totalQuestions}
                    </div>
                    <div className="text-sm text-slate-600">Correct Answers</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {quizResult.timeSpent} min
                    </div>
                    <div className="text-sm text-slate-600">Time Spent</div>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Question Review</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto modal-scrollbar">
                    {selectedQuiz.questions.map((question, index) => {
                      const userAnswer = userAnswers[index];
                      const isCorrect = userAnswer === question.correctAnswer;
                      
                      return (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isCorrect ? "bg-green-100" : "bg-red-100"
                            }`}>
                              {isCorrect ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm mb-2">{question.question}</p>
                              <div className="text-xs space-y-1">
                                <div className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>
                                  Your answer: {question.options[userAnswer]}
                                </div>
                                {!isCorrect && (
                                  <div className="text-green-600">
                                    Correct answer: {question.options[question.correctAnswer]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={closeQuizModal}
                    className="flex-1"
                    data-testid="button-close-results"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      resetQuiz();
                      startQuiz(selectedQuiz);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    data-testid="button-retake-quiz"
                  >
                    Retake Quiz
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/contact'}
                    className="flex-1"
                    data-testid="button-get-consulting"
                  >
                    Get AI Insights
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;