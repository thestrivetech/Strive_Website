import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface NavSection {
  id: string;
  label: string;
  background: 'light' | 'dark';
}

interface PageNavigationProps {
  sections: NavSection[];
}

/**
 * PageNavigation - Vertical dot navigation for scrolling between page sections
 *
 * Desktop: Fixed left side with hover labels
 * Mobile: Fixed bottom center bar
 */
export function PageNavigation({ sections }: PageNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  // Determine if current section has light background (for nav dot contrast)
  const currentSection = sections.find(s => s.id === activeSection);
  const isLightBackground = currentSection?.background === 'light';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  if (sections.length === 0) return null;

  return (
    <>
      {/* Desktop Navigation - Fixed left side */}
      <div className="hidden lg:flex fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 flex-col gap-2 z-40">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
            aria-label={`Navigate to ${section.label}`}
          >
            <div
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer",
                activeSection === section.id
                  ? "bg-orange-500 scale-125"
                  : isLightBackground
                    ? "bg-gray-800/50 hover:bg-gray-800/80"
                    : "bg-white/30 hover:bg-white/60"
              )}
            />
            <span className={cn(
              "absolute left-6 whitespace-nowrap text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none",
              isLightBackground
                ? "bg-white/95 text-gray-900 shadow-lg border border-gray-200"
                : "bg-gray-900/90 text-white"
            )}>
              {section.label}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Navigation - Fixed bottom center with safe area for notched devices */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-1 z-40 bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`Navigate to ${section.label}`}
          >
            <span
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeSection === section.id
                  ? "bg-orange-500 scale-125"
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}
