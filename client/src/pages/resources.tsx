import { useState } from "react";
import { Download, FileText, BookOpen, BarChart3, Sparkles, Eye, X, ExternalLink, Clock, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Resource {
  id: number;
  type: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  imageAlt: string;
  metadata: string;
  date: string;
  author?: string;
  readTime?: string;
  downloadCount?: string;
  tags: string[];
  content: {
    keyPoints: string[];
    insights: string[];
    actionItems: string[];
  };
}

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  const filters = [
    { name: "All", icon: null },
    { name: "Blog Posts", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "Whitepapers", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Case Studies", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
  ];
  
  const featuredResource = {
    type: "FEATURED WHITEPAPER",
    title: "The Future of Business Automation: AI-Driven Transformation",
    description: "Explore how artificial intelligence is revolutionizing business operations and discover strategies to implement AI-driven automation in your organization.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    imageAlt: "Advanced AI robot technology representing business automation",
    downloads: "2,543"
  };

  const resources: Resource[] = [
    {
      id: 1,
      type: "BLOG POST",
      title: "10 Steps to Successful Digital Transformation",
      shortDescription: "A comprehensive guide to planning and executing digital transformation initiatives that deliver real business value.",
      fullDescription: "Digital transformation is no longer optional for businesses seeking to remain competitive in today's rapidly evolving marketplace. This comprehensive guide outlines a proven 10-step methodology for successfully planning, executing, and measuring digital transformation initiatives. From initial assessment to full implementation, learn how leading organizations have leveraged technology to streamline operations, enhance customer experiences, and drive sustainable growth. Our framework has been tested across industries and company sizes, delivering measurable results including increased efficiency, reduced costs, and improved customer satisfaction.",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with digital transformation",
      metadata: "5 min read",
      date: "Jan 15, 2024",
      author: "Sarah Chen",
      readTime: "5 min",
      tags: ["Digital Transformation", "Strategy", "Technology", "Business Growth"],
      content: {
        keyPoints: [
          "Assess current digital maturity and identify gaps",
          "Define clear transformation objectives and success metrics",
          "Create a phased implementation roadmap",
          "Invest in employee training and change management",
          "Establish governance and security protocols"
        ],
        insights: [
          "Companies with structured transformation plans are 2.5x more likely to succeed",
          "Employee engagement during transformation increases success rates by 35%",
          "Phased approaches reduce implementation risks by 60%"
        ],
        actionItems: [
          "Conduct a digital readiness assessment for your organization",
          "Identify 3-5 high-impact areas for initial transformation efforts",
          "Develop a 12-month transformation timeline with key milestones",
          "Create a cross-functional transformation team"
        ]
      }
    },
    {
      id: 2,
      type: "WHITEPAPER",
      title: "Cloud Security Best Practices", 
      shortDescription: "Essential security measures and compliance frameworks for cloud-based business operations.",
      fullDescription: "As organizations increasingly migrate to cloud environments, security remains the top concern for IT leaders and business executives. This comprehensive whitepaper provides a detailed framework for implementing robust cloud security measures that protect sensitive data, ensure regulatory compliance, and maintain business continuity. Drawing from real-world implementations and industry best practices, we cover everything from identity management and access controls to advanced threat detection and incident response protocols. Learn how to build a security-first cloud strategy that enables innovation while minimizing risk.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions cybersecurity and cloud infrastructure",
      metadata: "12 pages",
      date: "Free Download",
      author: "Dr. Michael Rodriguez",
      downloadCount: "1,247",
      tags: ["Cloud Security", "Compliance", "Risk Management", "Cybersecurity"],
      content: {
        keyPoints: [
          "Implement zero-trust architecture principles",
          "Establish comprehensive identity and access management",
          "Deploy automated threat detection and response systems",
          "Ensure compliance with industry regulations (SOC 2, ISO 27001)",
          "Create incident response and disaster recovery plans"
        ],
        insights: [
          "Zero-trust implementations reduce security breaches by 45%",
          "Automated threat detection responds 10x faster than manual processes",
          "Proper IAM reduces unauthorized access incidents by 78%"
        ],
        actionItems: [
          "Audit your current cloud security posture",
          "Implement multi-factor authentication across all systems",
          "Deploy continuous monitoring and logging solutions",
          "Establish regular security training programs for staff"
        ]
      }
    },
    {
      id: 3,
      type: "CASE STUDY",
      title: "Enterprise AI Implementation Success",
      shortDescription: "How a Fortune 500 company achieved 40% efficiency gains through strategic AI implementation.",
      fullDescription: "This detailed case study examines how GlobalTech Industries, a Fortune 500 manufacturing company, successfully implemented AI-driven automation across their operations, resulting in unprecedented efficiency gains and cost savings. Over 18 months, they deployed machine learning models for predictive maintenance, AI-powered quality control systems, and intelligent supply chain optimization. The results speak for themselves: 40% reduction in operational costs, 60% improvement in quality metrics, and 50% decrease in unplanned downtime. Learn the strategies, challenges, and solutions that made this transformation possible.",
      imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Corporate business meeting with handshake and partnership", 
      metadata: "8 min read",
      date: "Success Story",
      author: "Jennifer Liu",
      readTime: "8 min",
      tags: ["AI Implementation", "Case Study", "Enterprise", "ROI"],
      content: {
        keyPoints: [
          "Phased AI implementation approach reduced risks and costs",
          "Predictive maintenance models prevented $2M in equipment failures",
          "AI-powered quality control improved product consistency by 60%",
          "Supply chain optimization reduced inventory costs by 25%",
          "Employee training programs ensured smooth technology adoption"
        ],
        insights: [
          "Companies starting with pilot programs see 80% higher success rates",
          "AI implementations show positive ROI within 8-12 months on average",
          "Cross-functional teams are crucial for successful AI adoption"
        ],
        actionItems: [
          "Identify high-impact use cases for AI in your organization",
          "Start with a pilot program in one department or process",
          "Invest in employee training and change management",
          "Establish clear success metrics and measurement frameworks"
        ]
      }
    },
    {
      id: 4,
      type: "BLOG POST",
      title: "Automation ROI: Measuring Success",
      shortDescription: "Key metrics and methodologies for calculating the return on investment of automation initiatives.",
      fullDescription: "Measuring the return on investment (ROI) of automation projects is crucial for demonstrating value and securing future technology investments. This comprehensive guide provides practical frameworks and proven methodologies for quantifying the impact of automation initiatives. We cover both direct financial benefits (cost savings, revenue increases) and indirect value creation (improved employee satisfaction, enhanced customer experience, risk reduction). Learn how to establish baseline metrics, track progress over time, and communicate results effectively to stakeholders at all levels of your organization.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions automation and workflow optimization",
      metadata: "7 min read", 
      date: "Dec 20, 2023",
      author: "David Park",
      readTime: "7 min",
      tags: ["ROI", "Automation", "Metrics", "Business Value"],
      content: {
        keyPoints: [
          "Establish clear baseline metrics before automation implementation",
          "Track both quantitative and qualitative benefits",
          "Include indirect benefits like employee satisfaction and risk reduction",
          "Use standardized calculation methodologies for consistency",
          "Regular monitoring and adjustment ensure continued success"
        ],
        insights: [
          "Organizations tracking ROI see 40% higher automation success rates",
          "Indirect benefits often account for 30-50% of total automation value",
          "Regular measurement cycles improve ROI by 25% over time"
        ],
        actionItems: [
          "Define your automation ROI measurement framework",
          "Identify key performance indicators for each automation project",
          "Implement regular reporting cycles and stakeholder reviews",
          "Create standardized ROI calculation templates"
        ]
      }
    },
    {
      id: 5,
      type: "BLOG POST",
      title: "Building a Culture of Innovation",
      shortDescription: "Strategies for fostering innovation and adaptability in rapidly changing business environments.",
      fullDescription: "Innovation is the lifeblood of successful organizations, but creating a culture that consistently generates breakthrough ideas and adapts to change requires intentional effort and strategic planning. This article explores proven strategies for building and sustaining innovation culture within your organization. From leadership practices and organizational structures to employee empowerment and experimentation frameworks, discover how industry leaders create environments where innovation thrives. Learn practical techniques for overcoming common barriers to innovation and establishing processes that turn creative ideas into business value.",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with team collaboration and innovation",
      metadata: "6 min read",
      date: "Latest Post",
      author: "Emma Thompson",
      readTime: "6 min",
      tags: ["Innovation", "Culture", "Leadership", "Change Management"],
      content: {
        keyPoints: [
          "Leadership commitment is essential for innovation culture success",
          "Create safe spaces for experimentation and calculated failure",
          "Establish cross-functional collaboration and idea sharing",
          "Implement structured innovation processes and evaluation criteria",
          "Reward both successful innovations and valuable learning experiences"
        ],
        insights: [
          "Companies with strong innovation cultures grow 30% faster than competitors",
          "Organizations allowing failure see 50% more breakthrough innovations",
          "Cross-functional teams generate 40% more innovative solutions"
        ],
        actionItems: [
          "Assess your current innovation culture maturity",
          "Create dedicated time and resources for innovation activities",
          "Establish innovation metrics and regular evaluation processes",
          "Launch pilot programs to test new ideas safely"
        ]
      }
    }
  ];

  const filteredResources = activeFilter === "All" 
    ? resources 
    : resources.filter(resource => {
        if (activeFilter === "Blog Posts") return resource.type === "BLOG POST";
        if (activeFilter === "Whitepapers") return resource.type === "WHITEPAPER";
        if (activeFilter === "Case Studies") return resource.type === "CASE STUDY";
        return true;
      });

  const getTypeIcon = (type: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert("Newsletter signup functionality would be implemented here");
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Gradient Background */}
      <section className="hero-gradient text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center text-sm text-orange-400 uppercase tracking-wide font-semibold mb-6"
              data-testid="text-knowledge-center-badge"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              KNOWLEDGE CENTER
            </div>
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-hero-title"
            >
              Business <span className="gradient-text">Intelligence</span> Hub
            </h1>
            <p 
              className="text-xl text-slate-300 max-w-3xl mx-auto"
              data-testid="text-hero-subtitle"
            >
              Unlock your potential with expert insights, cutting-edge research, and proven strategies from industry leaders.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2" data-testid="text-stat-articles">
                50+
              </div>
              <div className="text-slate-300" data-testid="text-stat-articles-label">
                Expert Articles
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2" data-testid="text-stat-downloads">
                10K+
              </div>
              <div className="text-slate-300" data-testid="text-stat-downloads-label">
                Downloads
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2" data-testid="text-stat-success">
                95%
              </div>
              <div className="text-slate-300" data-testid="text-stat-success-label">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Library Section - White Background */}
      <section className="py-16 bg-[#ffffffeb] shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-800" data-testid="text-library-title">
              Explore Our <span className="gradient-text">Resource Library</span>
            </h2>
            <p className="text-slate-600 text-lg" data-testid="text-library-subtitle">
              Filter and discover the perfect resources for your business journey.
            </p>
          </div>

          {/* Resource Categories */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.name}
                variant={activeFilter === filter.name ? "default" : "outline"}
                className={`rounded-full flex items-center ${
                  activeFilter === filter.name 
                    ? "bg-orange-500 text-white hover:bg-orange-600" 
                    : "bg-white text-slate-600 hover:bg-orange-500 hover:text-white border-slate-200"
                }`}
                onClick={() => setActiveFilter(filter.name)}
                data-testid={`filter-${filter.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {filter.icon}
                {filter.name}
              </Button>
            ))}
          </div>

          {/* Featured Resource */}
          <div className="bg-white rounded-2xl overflow-hidden mb-16 shadow-lg border border-slate-100">
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
                      📈 TRENDING
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div 
                  className="text-sm text-orange-500 uppercase tracking-wide font-semibold mb-4 flex items-center"
                  data-testid="text-featured-type"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
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
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Now
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

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <Card 
                key={resource.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-slate-900 to-slate-800"
                onClick={() => setSelectedResource(resource)}
                data-testid={`card-resource-${resource.id}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={resource.imageUrl} 
                    alt={resource.imageAlt}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    data-testid={`img-resource-${resource.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getTypeColor(resource.type)} text-white border-0`}>
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-orange-400">
                      {getTypeIcon(resource.type)}
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wide text-orange-400">
                      {resource.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 line-clamp-2">
                    {resource.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                        +{resource.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span data-testid={`text-resource-metadata-${resource.id}`}>
                      {resource.metadata}
                    </span>
                    <span data-testid={`text-resource-date-${resource.id}`}>
                      {resource.date}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    View Details
                    <Eye className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
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
              Stay Ahead of the <span className="gradient-text">Curve</span>
            </h2>
            <p 
              className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto"
              data-testid="text-newsletter-description"
            >
              Get premium insights, exclusive resources, and industry trends delivered directly to your inbox. Join 10,000+ business leaders.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white border-slate-200 text-slate-800 px-4 py-3 rounded-lg"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit"
                  className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 rounded-lg"
                  data-testid="button-newsletter-subscribe"
                >
                  Get Started
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

      {/* Resource Detail Modal */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
                <Button
                  onClick={() => setSelectedResource(null)}
                  className="absolute top-4 right-4 h-8 w-8 p-0"
                  variant="secondary"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
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
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resource
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                    Get Consulting
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