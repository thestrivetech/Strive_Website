import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

/**
 * Platform Demo Video Section
 * Showcases SAI Platform in action with YouTube embed
 */
export function PlatformDemoSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <PlayCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Watch Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            See SAI Platform in Action
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            Watch how one platform replaces 5+ tools and streamlines your entire workflow—from first contact to closing.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
            {/* 16:9 Aspect Ratio Container */}
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/psE2sshwsVM?rel=0&modestbranding=1"
                title="SAI Platform Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Video Caption */}
          <div className="text-center mt-8">
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              See how agents and brokers are replacing multiple platforms with SAI to close more deals faster
            </p>

            {/* CTA Button */}
            <Button
              onClick={() => window.location.href = "/waitlist"}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              Join the Waitlist
            </Button>
          </div>
        </div>

        {/* Optional: Key Features Below Video */}
        <div className="max-w-4xl mx-auto mt-16 sm:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Setup</h3>
              <p className="text-sm text-gray-600">
                Go from signup to your first deal in under 10 minutes
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All-in-One Platform</h3>
              <p className="text-sm text-gray-600">
                Replace 10+ tools with one integrated solution
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven ROI</h3>
              <p className="text-sm text-gray-600">
                Agents save 15+ hours per week on admin tasks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
