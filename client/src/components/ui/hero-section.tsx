import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// Removed unused imports: Play, Pause, ChevronLeft, ChevronRight
import LazyImage from "@/components/ui/lazy-image";

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
  const [isHovering, setIsHovering] = useState(false);



  // Chatbot URL - using the same URL as the floating widget
  const chatbotUrl = import.meta.env.VITE_CHATBOT_URL || 'https://chatbot.strivetech.ai';
  const widgetUrl = `${chatbotUrl}/widget`;





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


          </div>

          {/* Right Chatbot Widget */}
          <div className="space-y-4 lg:space-y-8 slide-in-right mt-8 lg:mt-0 order-1 lg:order-2">
            <div className="chatbot-container w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-white"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ aspectRatio: '400/600' }} // Same aspect ratio as floating widget
              >
                {/* Chatbot Header */}
                <div className="bg-gradient-to-r from-[#ff7033] to-orange-500 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Chat with Sai AI Assistant</span>
                  </div>
                  <div className="text-white text-xs opacity-75">
                    Live Demo
                  </div>
                </div>

                {/* Chatbot Iframe */}
                <div className="h-[calc(100%-48px)] bg-white">
                  <iframe
                    src={widgetUrl}
                    className="w-full h-full border-none"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      background: 'white'
                    }}
                    scrolling="yes"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    allow="microphone; camera; clipboard-write; autoplay"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Sai AI Assistant Chat Demo"
                    loading="eager"
                    data-testid="hero-chatbot-iframe"
                  />
                </div>
              </div>
            </div>

            {/* Full Chat Button */}
            <div className="text-center mt-4">
              <Button
                onClick={() => window.location.href = '/chatbot-sai'}
                variant="outline"
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                data-testid="button-open-full-chat"
              >
                Open Full Chat
              </Button>
            </div>

            {/* Info text */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Try Sai now • Get instant AI assistance
              </p>
            </div>
          </div>
        </div>{/* Close grid line 77 */}  
      </div>{/* Close container line 76 */}
    </section>
  );
};

export default HeroSection;
