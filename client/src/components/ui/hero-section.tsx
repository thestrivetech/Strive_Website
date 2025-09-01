import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection = ({
  title,
  subtitle,
  primaryButtonText = "Get Started",
  secondaryButtonText = "Watch Demo",
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const demoVideos = [
    {
      title: "AI Model Training",
      description: "Watch how our custom AI models are trained for your specific business needs",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      duration: "2:30"
    },
    {
      title: "Data Analytics Dashboard",
      description: "See real-time insights and predictive analytics in action",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      duration: "1:45"
    },
    {
      title: "Automation Workflows",
      description: "Discover how AI automates complex business processes",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      duration: "3:10"
    },
    {
      title: "Industry Solutions",
      description: "Explore custom AI solutions across different industries",
      thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      duration: "2:50"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoVideos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, demoVideos.length]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="hero-gradient min-h-screen flex items-center relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
          {/* Left Content */}
          <div className="space-y-8 slide-in-left">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-primary text-sm font-medium" data-testid="hero-badge">
                  AI Solutions Company
                </span>
              </div>
              
              <h1 
                className="text-5xl md:text-7xl font-bold leading-tight"
                data-testid="hero-title"
              >
                Custom <span className="gradient-text">AI Models</span> for Your Business
              </h1>
              
              <p 
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
                data-testid="hero-subtitle"
              >
                {subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onPrimaryClick}
                className="bg-primary text-primary-foreground px-8 py-4 text-lg hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                size="lg"
                data-testid="button-hero-primary"
              >
                {primaryButtonText}
              </Button>
              <Button
                onClick={onSecondaryClick}
                variant="outline"
                className="border-2 border-primary text-primary px-8 py-4 text-lg hover:bg-primary hover:text-primary-foreground transition-all"
                size="lg"
                data-testid="button-hero-secondary"
              >
                {secondaryButtonText}
              </Button>
            </div>

            {/* Demo Navigation Dots */}
            <div className="flex items-center space-x-3">
              {demoVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDemo(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentDemo 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  data-testid={`demo-dot-${index}`}
                />
              ))}
            </div>
          </div>

          {/* Right Demo Video */}
          <div className="space-y-8 slide-in-right">
            <div className="demo-video-container">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={demoVideos[currentDemo].thumbnail}
                  alt={demoVideos[currentDemo].title}
                  className="w-full object-cover transform scale-105 hover:scale-100 transition-transform duration-500"
                  style={{ aspectRatio: '16/27' }}
                  data-testid="demo-thumbnail"
                />
                
                {/* Play/Pause Overlay */}
                <div className="absolute top-0 left-0 right-0 bottom-[10px] bg-black/30 flex items-center justify-center group">
                  <button
                    onClick={togglePlayback}
                    className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 hover:bg-primary/90"
                    data-testid="button-demo-play"
                  >
                    {isPlaying ? (
                      <Pause className="text-primary-foreground w-6 h-6" />
                    ) : (
                      <Play className="text-primary-foreground w-8 h-8 ml-1" />
                    )}
                  </button>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                  <div className="text-white">
                    <h3 
                      className="text-lg font-semibold mb-1"
                      data-testid="demo-title"
                    >
                      {demoVideos[currentDemo].title}
                    </h3>
                    <p 
                      className="text-sm text-gray-300 mb-2"
                      data-testid="demo-description"
                    >
                      {demoVideos[currentDemo].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xs text-gray-400"
                        data-testid="demo-duration"
                      >
                        {demoVideos[currentDemo].duration}
                      </span>
                      <div className="flex space-x-1">
                        {demoVideos.map((_, index) => (
                          <div
                            key={index}
                            className={`w-1 h-1 rounded-full ${
                              index === currentDemo ? 'bg-primary' : 'bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Rotating demo • Auto-plays every 6 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
