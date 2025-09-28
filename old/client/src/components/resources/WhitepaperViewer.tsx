import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, FileText, Download, X, Menu, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Resource } from '@/data/resources/types';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface WhitepaperViewerProps {
  resource: Resource;
  onClose: () => void;
}

export const WhitepaperViewer: React.FC<WhitepaperViewerProps> = ({ resource, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [showToc, setShowToc] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement }>({});

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        setShowScrollTop(scrollTop > 500);

        // Update active section based on scroll position
        if (resource.fullContent?.sections) {
          const containerRect = contentRef.current.getBoundingClientRect();
          const viewportMiddle = containerRect.top + containerRect.height / 3;

          // Find the section that's most visible in the viewport
          let closestSection = resource.fullContent.sections[0].id;
          let closestDistance = Infinity;

          for (const section of resource.fullContent.sections) {
            const element = sectionRefs.current[section.id];
            if (element) {
              const rect = element.getBoundingClientRect();
              const distance = Math.abs(rect.top - viewportMiddle);

              // If this section is visible and closer to the middle of viewport
              if (rect.top < containerRect.bottom && rect.bottom > containerRect.top) {
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestSection = section.id;
                }
              }
            }
          }

          setActiveSection(closestSection);
        }
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Trigger initial scroll check
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [resource.fullContent]);

  // Set initial active section
  useEffect(() => {
    if (resource.fullContent?.sections && resource.fullContent.sections.length > 0) {
      setActiveSection(resource.fullContent.sections[0].id);
    }
  }, [resource.fullContent]);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element && contentRef.current) {
      const containerRect = contentRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollTop = elementRect.top - containerRect.top + contentRef.current.scrollTop - 100;
      contentRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
    setShowToc(false);
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const formatContent = (content: string) => {
    // Replace **bold** with <strong>
    content = content.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');

    // Replace citations numbers with superscript links
    content = content.replace(/\[(\d+)\]/g, '<sup class="text-blue-600 cursor-help">[$1]</sup>');

    // Add proper paragraph breaks
    const paragraphs = content.split('\n\n').map(p => p.trim()).filter(p => p);
    return paragraphs.map(p => `<p class="mb-6 leading-relaxed text-slate-700">${p}</p>`).join('');
  };

  return (
    <>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="w-full h-full bg-white flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 md:px-8 py-4 border-b border-slate-700 shadow-xl">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-orange-400" />
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold">{resource.title}</h1>
                    <p className="text-sm text-slate-300 mt-1">
                      {resource.author} • {resource.readTime} • {resource.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hidden md:flex items-center gap-2 text-white border-slate-600 hover:bg-slate-700"
                    onClick={() => window.print()}
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="md:hidden text-white border-slate-600 hover:bg-slate-700 p-2"
                    onClick={() => setShowToc(!showToc)}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                  <DialogPrimitive.Close
                    onClick={onClose}
                    className="bg-slate-700 hover:bg-slate-600 rounded-lg h-9 w-9 flex items-center justify-center transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </DialogPrimitive.Close>
                </div>
              </div>
            </div>

            <div className="flex-1 flex relative overflow-hidden">
              {/* Table of Contents - Desktop */}
              <div className="hidden lg:block w-80 border-r border-slate-200 bg-slate-50 overflow-y-auto">
                <div className="p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Table of Contents</h2>
                  <nav className="space-y-2">
                    {resource.fullContent?.sections.map((section, index) => (
                      <div key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                            activeSection === section.id
                              ? "bg-orange-100 text-orange-700 font-medium"
                              : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <ChevronRight className={cn(
                              "h-3 w-3 transition-transform",
                              activeSection === section.id && "rotate-90"
                            )} />
                            <span className="line-clamp-2">
                              {index + 1}. {section.title}
                            </span>
                          </span>
                        </button>
                        {section.subsections && activeSection === section.id && (
                          <div className="ml-6 mt-1 space-y-1">
                            {section.subsections.map((subsection) => (
                              <button
                                key={subsection.id}
                                onClick={() => scrollToSection(subsection.id)}
                                className="w-full text-left px-3 py-1 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                              >
                                {subsection.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.slice(0, 5).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile TOC */}
              {showToc && (
                <div className="lg:hidden absolute inset-0 z-40 bg-white overflow-y-auto">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Table of Contents</h2>
                    <button
                      onClick={() => setShowToc(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <nav className="p-4 space-y-2">
                    {resource.fullContent?.sections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-sm"
                      >
                        {index + 1}. {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* Main Content */}
              <div
                ref={contentRef}
                className="flex-1 overflow-y-auto bg-white modal-scrollbar"
              >
                <article className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
                  {/* Document Header */}
                  <div className="mb-12 pb-8 border-b border-slate-200">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      {resource.title}
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {resource.fullDescription}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-500">
                      <span>{resource.author}</span>
                      <span>•</span>
                      <span>{resource.date}</span>
                      <span>•</span>
                      <span>{resource.readTime}</span>
                      <span>•</span>
                      <span>{resource.downloadCount} downloads</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Key Highlights
                    </h2>
                    <ul className="space-y-2">
                      {resource.content.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Document Content */}
                  {resource.fullContent?.sections.map((section) => (
                    <section
                      key={section.id}
                      ref={(el) => { if (el) sectionRefs.current[section.id] = el; }}
                      className="mb-16 scroll-mt-24"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-orange-400">
                        {section.title}
                      </h2>

                      {section.content && (
                        <div
                          className="prose prose-lg max-w-none text-slate-700"
                          dangerouslySetInnerHTML={{ __html: formatContent(section.content) }}
                        />
                      )}

                      {section.subsections?.map((subsection) => (
                        <div
                          key={subsection.id}
                          ref={(el) => { if (el) sectionRefs.current[subsection.id] = el; }}
                          className="mt-8 scroll-mt-24"
                        >
                          <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4">
                            {subsection.title}
                          </h3>
                          <div
                            className="prose prose-lg max-w-none text-slate-700"
                            dangerouslySetInnerHTML={{ __html: formatContent(subsection.content) }}
                          />
                        </div>
                      ))}
                    </section>
                  ))}

                  {/* Citations */}
                  {resource.fullContent?.citations && resource.fullContent.citations.length > 0 && (
                    <section className="mt-16 pt-8 border-t-2 border-slate-200">
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">References</h2>
                      <ol className="space-y-3">
                        {resource.fullContent.citations.map((citation) => (
                          <li key={citation.number} className="flex gap-3 text-sm">
                            <span className="font-semibold text-slate-600">[{citation.number}]</span>
                            <div>
                              {citation.url ? (
                                <a
                                  href={citation.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  {citation.text}
                                </a>
                              ) : (
                                <span className="text-slate-700">{citation.text}</span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}

                  {/* Footer CTA */}
                  <div className="mt-16 p-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl text-white">
                    <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business with Ethical AI?</h3>
                    <p className="mb-6 text-white/90">
                      Partner with Strive Tech to implement responsible AI solutions that drive measurable results.
                    </p>
                    <Button
                      size="lg"
                      className="bg-white text-slate-900 hover:bg-slate-100"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Start Your AI Journey
                    </Button>
                  </div>
                </article>
              </div>

              {/* Scroll to Top Button */}
              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 z-30 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Scroll to top"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </>
  );
};