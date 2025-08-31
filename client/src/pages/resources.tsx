import { useState } from "react";
import { Download } from "lucide-react";
import ResourceCard from "@/components/ui/resource-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filters = ["All", "Blog Posts", "Whitepapers", "Case Studies", "Webinars"];
  
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
      type: "WEBINAR", 
      title: "Data-Driven Decision Making in 2024",
      description: "Learn how to leverage data analytics and business intelligence to make informed strategic decisions.",
      imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Professional business team meeting with data analytics",
      metadata: "45 min",
      date: "Available On-Demand"
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
      type: "WEBINAR",
      title: "Building a Culture of Innovation",
      description: "Strategies for fostering innovation and adaptability in rapidly changing business environments.",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with team collaboration and innovation",
      metadata: "60 min",
      date: "Live Event"
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert("Newsletter signup functionality would be implemented here");
  };

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              data-testid="text-resources-title"
            >
              Resources
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-resources-subtitle"
            >
              Stay informed with the latest insights, best practices, and industry trends to help your business thrive.
            </p>
          </div>

          {/* Resource Categories */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                className={`rounded-full ${
                  activeFilter === filter 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setActiveFilter(filter)}
                data-testid={`filter-${filter.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Featured Resource */}
          <div className="bg-card text-card-foreground rounded-2xl overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredResource.imageUrl} 
                  alt={featuredResource.imageAlt}
                  className="w-full h-64 md:h-full object-cover"
                  data-testid="img-featured-resource"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div 
                  className="text-sm text-primary uppercase tracking-wide font-semibold mb-4"
                  data-testid="text-featured-type"
                >
                  {featuredResource.type}
                </div>
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-4"
                  data-testid="text-featured-title"
                >
                  {featuredResource.title}
                </h2>
                <p 
                  className="text-muted-foreground mb-6"
                  data-testid="text-featured-description"
                >
                  {featuredResource.description}
                </p>
                <div className="flex items-center justify-between">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-download-featured"
                  >
                    Download Now
                  </Button>
                  <div className="text-sm text-muted-foreground flex items-center">
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

          {/* Newsletter Signup */}
          <div className="bg-muted rounded-2xl p-8 md:p-12 text-center mt-16">
            <h2 
              className="text-3xl font-bold mb-4"
              data-testid="text-newsletter-title"
            >
              Stay Updated
            </h2>
            <p 
              className="text-xl text-muted-foreground mb-8"
              data-testid="text-newsletter-description"
            >
              Get the latest insights and resources delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-background border-border"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="button-newsletter-subscribe"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
