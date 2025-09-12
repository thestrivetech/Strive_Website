import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const goToPreviousDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + demoVideos.length) % demoVideos.length);
  };

  const goToNextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % demoVideos.length);
  };

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
    <section className="hero-gradient min-h-screen lg:flex lg:items-center relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-20 xl:gap-28 2xl:gap-32 lg:items-center lg:min-h-[80vh] pt-0 pb-4 sm:pt-2 sm:pb-6 lg:py-12">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 slide-in-left order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white"
                data-testid="hero-title"
              >
                Custom <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">AI Solutions</span> Built for Real World Performance
              </h1>
              
              <p 
                className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed"
                data-testid="hero-subtitle"
              >
                {subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Button
                onClick={onPrimaryClick}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 lg:px-8 py-3 lg:py-4 text-sm sm:text-base lg:text-lg min-h-[48px] relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                size="lg"
                data-testid="button-hero-primary"
              >
                {primaryButtonText}
              </Button>
              <Button
                onClick={onSecondaryClick}
                variant="outline"
                className="w-full sm:w-auto hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-6 lg:px-8 py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl transition-all duration-300 min-h-[48px] hover:scale-105 shadow-lg hover:shadow-xl"
                size="lg"
                data-testid="button-hero-secondary"
              >
                {secondaryButtonText}
              </Button>
            </div>

            {/* Demo Navigation Dots - Hidden on mobile */}
            <div className="hidden sm:flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3">
              {demoVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDemo(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
                    index === currentDemo 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-purple-800 hover:bg-purple-700'
                  }`}
                  data-testid={`demo-dot-${index}`}
                />
              ))}
            </div>
          </div>

          {/* Right Demo Video */}
          <div className="space-y-4 lg:space-y-8 slide-in-right mt-8 lg:mt-0 order-1 lg:order-2">
            {/* Desktop Navigation Container */}
            <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 2xl:gap-8">
              {/* Left Arrow */}
              <button
                onClick={goToPreviousDemo}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center transition-all duration-300 hover:bg-primary/20 hover:border-primary hover:scale-110"
                data-testid="button-demo-prev"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              
              {/* Demo Video Container */}
              <div className="demo-video-container w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <img 
                    src={demoVideos[currentDemo].thumbnail}
                    alt={demoVideos[currentDemo].title}
                    className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-500"
                    data-testid="demo-thumbnail"
                  />
                
                {/* Play/Pause Overlay - Show when paused or when playing and hovering */}
                {(!isPlaying || (isPlaying && isHovering)) && (
                  <div className={`absolute top-0 left-0 right-0 bottom-[10px] flex items-center justify-center group transition-all duration-200 ${
                    isPlaying && isHovering ? 'bg-black/20' : 'bg-black/30'
                  }`}>
                    <button
                      onClick={togglePlayback}
                      className="w-16 h-16 lg:w-20 lg:h-20 bg-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 hover:bg-primary/90"
                      data-testid="button-demo-play"
                    >
                      {isPlaying ? (
                        <Pause className="text-primary-foreground w-5 h-5 lg:w-6 lg:h-6" />
                      ) : (
                        <Play className="text-primary-foreground w-6 h-6 lg:w-8 lg:h-8 ml-1" />
                      )}
                    </button>
                  </div>
                )}

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 lg:p-8">
                  <div className="text-white">
                    <h3 
                      className="text-base lg:text-lg font-semibold mb-1"
                      data-testid="demo-title"
                    >
                      {demoVideos[currentDemo].title}
                    </h3>
                    <p 
                      className="text-xs lg:text-sm text-gray-300 mb-2"
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
                      <div className="hidden sm:flex space-x-1">
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
            </div>{/* Close demo-video-container */}
              
              {/* Right Arrow */}
              <button
                onClick={goToNextDemo}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center transition-all duration-300 hover:bg-primary/20 hover:border-primary hover:scale-110"
                data-testid="button-demo-next"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>
            
            {/* Mobile demo container for screens smaller than lg */}
            <div className="lg:hidden demo-video-container w-full max-w-md sm:max-w-lg mx-auto">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Left Arrow - Mobile */}
                <button
                  onClick={goToPreviousDemo}
                  className="absolute left-2 bottom-4 w-10 h-10 bg-white/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border-2 border-primary/30 hover:border-primary hover:scale-105 z-10"
                  data-testid="button-demo-prev-mobile-inside"
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </button>
                
                {/* Right Arrow - Mobile */}
                <button
                  onClick={goToNextDemo}
                  className="absolute right-2 bottom-4 w-10 h-10 bg-white/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border-2 border-primary/30 hover:border-primary hover:scale-105 z-10"
                  data-testid="button-demo-next-mobile-inside"
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </button>
                <img 
                  src={demoVideos[currentDemo].thumbnail}
                  alt={demoVideos[currentDemo].title}
                  className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-500"
                  data-testid="demo-thumbnail-mobile"
                />
                
                {/* Play/Pause Overlay - Show when paused or when playing and hovering */}
                {(!isPlaying || (isPlaying && isHovering)) && (
                  <div className={`absolute top-0 left-0 right-0 bottom-[10px] flex items-center justify-center group transition-all duration-200 ${
                    isPlaying && isHovering ? 'bg-black/20' : 'bg-black/30'
                  }`}>
                    <button
                      onClick={togglePlayback}
                      className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 hover:bg-primary/90"
                      data-testid="button-demo-play-mobile"
                    >
                      {isPlaying ? (
                        <Pause className="text-primary-foreground w-5 h-5" />
                      ) : (
                        <Play className="text-primary-foreground w-6 h-6 ml-1" />
                      )}
                    </button>
                  </div>
                )}

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <div className="text-white">
                    <h3 className="text-base font-semibold mb-1">
                      {demoVideos[currentDemo].title}
                    </h3>
                    <p className="text-xs text-gray-300 mb-2">
                      {demoVideos[currentDemo].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {demoVideos[currentDemo].duration}
                      </span>
                      <div className="hidden sm:flex space-x-1">
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

            {/* Mobile info text */}
            <div className="lg:hidden text-center mt-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Rotating demo • Auto-plays every 6 seconds
              </p>
            </div>

            {/* Desktop text */}
            <div className="hidden lg:block text-center">
              <p className="text-sm text-muted-foreground">
                Rotating demo • Auto-plays every 6 seconds
              </p>
            </div>
          </div>{/* Close Right Demo Video line 136 */}
        </div>{/* Close grid line 77 */}  
      </div>{/* Close container line 76 */}
    </section>
  );
};

export default HeroSection;
