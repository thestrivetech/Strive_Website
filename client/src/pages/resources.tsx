import { useState } from "react";
import { Download, BookOpen, FileText, Award, Sparkles, TrendingUp } from "lucide-react";
import ResourceCard from "@/components/ui/resource-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Blog Posts", "Whitepapers", "Case Studies"];
  
  const featuredResource = {
    type: "FEATURED WHITEPAPER",
    title: "The Future of Business Automation: AI-Driven Transformation",
    description: "Explore how artificial intelligence is revolutionizing business operations and discover strategies to implement AI-driven automation in your organization.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    imageAlt: "Technology solutions with AI and automation focus",
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
      {/* Hero Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4 flex items-center justify-center gap-2"
              data-testid="text-resources-label"
            >
              <Sparkles className="w-4 h-4" />
              KNOWLEDGE CENTER
            </div>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
              data-testid="text-resources-title"
            >
              Business <span className="gradient-text">Intelligence</span> Hub
            </h1>
            <p 
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8"
              data-testid="text-resources-subtitle"
            >
              Unlock your potential with expert insights, cutting-edge research, and proven strategies from industry leaders.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-white/80 text-sm">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-white/80 text-sm">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-white/80 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
      </section>

      {/* Main Content Section */}
      <section className="pt-16 pb-16 bg-gradient-to-br from-[#ffffffeb] via-[#fff7f0] to-primary/10 relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffffeb] via-transparent to-primary/5 pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#020a1c]">
              Explore Our <span className="gradient-text">Resource Library</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Filter and discover the perfect resources for your business journey.
            </p>
          </div>

          {/* Enhanced Resource Categories */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {filters.map((filter, index) => {
              const icons = [null, <BookOpen className="w-4 h-4" />, <FileText className="w-4 h-4" />, <Award className="w-4 h-4" />];
              return (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  className={`rounded-full px-6 py-3 transition-all duration-300 ${
                    activeFilter === filter 
                      ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105" 
                      : "bg-white/70 backdrop-blur-sm border border-primary/20 text-[#020a1c] hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                  data-testid={`filter-${filter.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="flex items-center gap-2">
                    {icons[index]}
                    {filter}
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Enhanced Featured Resource */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden mb-16 shadow-xl hover:shadow-2xl transition-all duration-500 group relative">
            {/* Glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-3xl"></div>
            
            <div className="md:flex">
              <div className="md:w-1/2 relative overflow-hidden">
                <img 
                  src={featuredResource.imageUrl} 
                  alt={featuredResource.imageAlt}
                  className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-testid="img-featured-resource"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    TRENDING
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 relative">
                <div 
                  className="text-sm text-primary uppercase tracking-wide font-semibold mb-4 flex items-center gap-2"
                  data-testid="text-featured-type"
                >
                  <Sparkles className="w-4 h-4" />
                  {featuredResource.type}
                </div>
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-4 text-[#020a1c] group-hover:text-primary transition-colors duration-300"
                  data-testid="text-featured-title"
                >
                  {featuredResource.title}
                </h2>
                <p 
                  className="text-muted-foreground mb-6 leading-relaxed"
                  data-testid="text-featured-description"
                >
                  {featuredResource.description}
                </p>
                <div className="flex items-center justify-between">
                  <Button 
                    className="bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    data-testid="button-download-featured"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Now
                  </Button>
                  <div className="text-sm text-muted-foreground flex items-center bg-white/50 backdrop-blur-sm px-3 py-2 rounded-full">
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
              <ResourceCard
                key={index}
                type={resource.type}
                title={resource.title}
                description={resource.description}
                imageUrl={resource.imageUrl}
                imageAlt={resource.imageAlt}
                metadata={resource.metadata}
                date={resource.date}
              />
            ))}
          </div>

          {/* Premium Newsletter Signup */}
          <div className="relative mt-20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-orange-500/5 to-primary/10 rounded-3xl"></div>
            <div className="relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">EXCLUSIVE CONTENT</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6 text-[#020a1c]"
                  data-testid="text-newsletter-title"
                >
                  Stay Ahead of the <span className="gradient-text">Curve</span>
                </h2>
                <p 
                  className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                  data-testid="text-newsletter-description"
                >
                  Get premium insights, exclusive resources, and industry trends delivered directly to your inbox. Join 10,000+ business leaders.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="max-w-lg mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                      required
                      data-testid="input-newsletter-email"
                    />
                    <Button 
                      type="submit"
                      className="bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      data-testid="button-newsletter-subscribe"
                    >
                      <span className="font-semibold">Get Started</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Free to join
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      Weekly insights
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      Unsubscribe anytime
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
