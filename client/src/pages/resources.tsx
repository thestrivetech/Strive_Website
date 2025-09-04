import { useState } from "react";
import { Download, FileText, BookOpen, BarChart3, Sparkles } from "lucide-react";
import ResourceCard from "@/components/ui/resource-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
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

  const resources = [
    {
      type: "BLOG POST",
      title: "10 Steps to Successful Digital Transformation",
      description: "A comprehensive guide to planning and executing digital transformation initiatives that deliver real business value.",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with digital transformation",
      metadata: "5 min read",
      date: "Jan 15, 2024"
    },
    {
      type: "WHITEPAPER",
      title: "Cloud Security Best Practices", 
      description: "Essential security measures and compliance frameworks for cloud-based business operations.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions cybersecurity and cloud infrastructure",
      metadata: "12 pages",
      date: "Free Download"
    },
    {
      type: "CASE STUDY",
      title: "Enterprise AI Implementation Success",
      description: "How a Fortune 500 company achieved 40% efficiency gains through strategic AI implementation.",
      imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Corporate business meeting with handshake and partnership", 
      metadata: "8 min read",
      date: "Success Story"
    },
    {
      type: "BLOG POST",
      title: "Automation ROI: Measuring Success",
      description: "Key metrics and methodologies for calculating the return on investment of automation initiatives.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions automation and workflow optimization",
      metadata: "7 min read", 
      date: "Dec 20, 2023"
    },
    {
      type: "BLOG POST",
      title: "Building a Culture of Innovation",
      description: "Strategies for fostering innovation and adaptability in rapidly changing business environments.",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with team collaboration and innovation",
      metadata: "6 min read",
      date: "Latest Post"
    }
  ];

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
      <section className="py-16 bg-white shadow-lg">
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
            {resources.map((resource, index) => (
              <div key={index} className="bg-slate-900 text-white rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={resource.imageUrl} 
                  alt={resource.imageAlt}
                  className="w-full h-48 object-cover"
                  data-testid={`img-resource-${index}`}
                />
                <div className="p-6">
                  <div 
                    className="text-xs text-orange-400 uppercase tracking-wide font-semibold mb-3"
                    data-testid={`text-resource-type-${index}`}
                  >
                    {resource.type}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3"
                    data-testid={`text-resource-title-${index}`}
                  >
                    {resource.title}
                  </h3>
                  <p 
                    className="text-slate-300 mb-4 text-sm leading-relaxed"
                    data-testid={`text-resource-description-${index}`}
                  >
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span data-testid={`text-resource-metadata-${index}`}>
                      {resource.metadata}
                    </span>
                    <span data-testid={`text-resource-date-${index}`}>
                      {resource.date}
                    </span>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default Resources;