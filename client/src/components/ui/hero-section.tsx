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

  const handleViewDemo = () => {
    window.location.href = '/chatbot-sai';
  };





  return (
    <section className="hero-gradient min-h-screen lg:flex lg:items-center relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 xl:gap-28 2xl:gap-32 lg:items-center lg:min-h-[80vh] pt-4 pb-8 sm:pt-6 sm:pb-10 lg:py-12">
          {/* Left Content - Order 1 on mobile (appears first) */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 slide-in-left order-1 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white"
                data-testid="hero-title"
              >
                {title}
              </h1>

              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed"
                data-testid="hero-subtitle"
              >
                {subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-4">
              <Button
                onClick={onPrimaryClick}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base lg:text-lg min-h-[48px] relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                size="lg"
                data-testid="button-hero-primary"
              >
                {primaryButtonText}
              </Button>
              <Button
                onClick={onSecondaryClick}
                variant="outline"
                className="w-full sm:w-auto hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl transition-all duration-300 min-h-[48px] hover:scale-105 shadow-lg hover:shadow-xl"
                size="lg"
                data-testid="button-hero-secondary"
              >
                {secondaryButtonText}
              </Button>
            </div>


          </div>

          {/* Right Chatbot Widget - Order 2 on mobile (appears after text) */}
          <div className="slide-in-right mt-6 sm:mt-8 lg:mt-0 order-2 lg:order-2">
            <div className="w-full">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-white mx-auto"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                  width: '100%',
                  maxWidth: '100%'
                }}
              >
                {/* Chatbot Header */}
                <div className="bg-gradient-to-r from-[#ff7033] to-orange-500 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs sm:text-sm font-medium">Global SAI Assistant</span>
                  </div>
                  <div className="text-white text-xs opacity-75">
                    AI for Real Estate
                  </div>
                </div>

                {/* Chatbot Content */}
                <div className="bg-white flex items-center justify-center" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', minHeight: '350px' }}>
                  <div className="text-center p-4 sm:p-6 md:p-8">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#ff7033] to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2">
                        Try Global SAI Assistant
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-2">
                        Experience AI trained specifically for real estate—score leads, generate listings, and automate follow-ups instantly.
                      </p>
                    </div>
                    <Button
                      onClick={handleViewDemo}
                      className="bg-gradient-to-r from-[#ff7033] to-orange-500 hover:from-[#e85a29] hover:to-orange-600 text-white px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[44px]"
                      data-testid="button-view-demo"
                    >
                      View Interactive Demo
                    </Button>
                    <p className="text-xs text-gray-500 mt-3 sm:mt-4">
                      Try Global SAI now • Real estate AI at your fingertips
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{/* Close grid line 77 */}  
      </div>{/* Close container line 76 */}
    </section>
  );
};

export default HeroSection;
