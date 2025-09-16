import { Bot, Sparkles, AlertCircle, Loader2, MessageCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import chatbotManager from "@/lib/chatbot-iframe-communication";
import performanceMonitor from "@/lib/chatbot-performance-monitor";

const ChatBotSai = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const performanceId = useRef(`fullpage-${Date.now()}`);
  const retryTimeoutRef = useRef<number | null>(null);

  // Chatbot URL
  const chatbotUrl = import.meta.env.VITE_CHATBOT_URL || 'https://chatbot.strivetech.ai';
  const fullPageUrl = `${chatbotUrl}/full`;

  useEffect(() => {
    // Start performance tracking
    performanceMonitor.startTracking(performanceId.current);

    // Setup message handlers
    const unsubscribeReady = chatbotManager.onMessage('ready', handleChatbotReady);
    const unsubscribeError = chatbotManager.onMessage('error', handleChatbotError);
    const unsubscribeNavigate = chatbotManager.onMessage('navigate', handleNavigate);
    const unsubscribeAnalytics = chatbotManager.onMessage('analytics', handleAnalytics);

    // Set a timeout for loading
    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setErrorMessage('The chat service is taking longer than expected to load.');
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => {
      unsubscribeReady();
      unsubscribeError();
      unsubscribeNavigate();
      unsubscribeAnalytics();
      clearTimeout(loadTimeout);
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      performanceMonitor.cleanup(performanceId.current);
    };
  }, [isLoading]);

  const handleChatbotReady = (data: any) => {
    setIsLoading(false);
    setHasError(false);
    setErrorMessage('');

    performanceMonitor.trackEvent(performanceId.current, 'chatbot_ready', data);

    // Register iframe
    if (iframeRef.current) {
      chatbotManager.registerIframe(iframeRef.current);
    }

    // Track page view
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Chat with Sai',
        page_location: window.location.href
      });
    }
  };

  const handleChatbotError = (data: any) => {
    console.error('Chatbot error:', data);
    setHasError(true);
    setErrorMessage(data.error || 'An error occurred while loading the chat.');
    setIsLoading(false);

    performanceMonitor.trackEvent(performanceId.current, 'chatbot_error', data);
  };

  const handleNavigate = (data: any) => {
    if (data.url) {
      // Handle navigation requests from chatbot
      if (data.url.startsWith('http')) {
        window.open(data.url, '_blank');
      } else {
        window.location.href = data.url;
      }
    }
  };

  const handleAnalytics = (data: any) => {
    // Forward analytics events
    if (window.gtag) {
      window.gtag('event', `chatbot_${data.event}`, data.properties);
    }
  };

  const handleIframeLoad = () => {
    performanceMonitor.trackEvent(performanceId.current, 'iframe_loaded');
    // Don't set loading to false here - wait for 'ready' message
  };

  const handleIframeError = () => {
    performanceMonitor.trackEvent(performanceId.current, 'iframe_error');
    setHasError(true);
    setErrorMessage('Failed to load the chat service.');
    setIsLoading(false);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');

    if (iframeRef.current) {
      // Force reload with cache buster
      iframeRef.current.src = `${fullPageUrl}?t=${Date.now()}`;
    }
  };

  const handleContactSupport = () => {
    window.location.href = '/contact';
  };

  // Render error state
  const renderErrorState = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Unable to Connect</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {errorMessage || 'We\'re experiencing technical difficulties with our chat service. Our team has been notified and is working to resolve this issue as quickly as possible.'}
            </p>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleRetry}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleContactSupport}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Support
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  You can also call us at{' '}
                  <a href="tel:+17314312320" className="text-orange-500 hover:text-orange-400">
                    (731) 431-2320
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render loading state
  const renderLoadingState = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#020a1c] via-purple-900 to-[#020a1c] text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div>
                  <span className="font-bold text-lg">Connecting to Sai...</span>
                  <p className="text-white/80 text-sm">Intelligent Assistant</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-[#ff7033] to-yellow-500 text-white px-4 py-2">
                AI Assistant
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-[600px] flex items-center justify-center bg-gradient-to-b from-white/50 to-white/80">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff7033] to-purple-600 flex items-center justify-center shadow-2xl mx-auto">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-[#ff7033] flex items-center justify-center animate-pulse">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#020a1c] mb-2">Loading Sai...</h3>
                <p className="text-muted-foreground mb-6">
                  Your AI assistant is starting up. This may take a moment.
                </p>

                <div className="flex justify-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-[#ff7033] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen hero-gradient">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7033]/10 via-transparent to-purple-600/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff7033] to-purple-600 flex items-center justify-center shadow-2xl">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-[#ff7033] flex items-center justify-center animate-pulse">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Chat with <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Sai</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Your AI-Powered Business Solutions Assistant - Available 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {hasError ? renderErrorState() : isLoading ? renderLoadingState() : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <iframe
              ref={iframeRef}
              src={fullPageUrl}
              className="w-full rounded-lg shadow-2xl border-0"
              style={{
                height: 'calc(100vh - 300px)',
                minHeight: '600px',
                backgroundColor: 'transparent'
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              allow="microphone; camera; clipboard-write; autoplay; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Chat with Sai - Strive Tech AI Assistant"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              data-testid="chatbot-full-iframe"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Coming Soon Banner - Mobile Only */}
      <div className="md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
        <ComingSoonBadge size="md" variant="hero" className="text-sm font-semibold shadow-lg" />
      </div>

      {/* Info Cards - Only show if chatbot loads successfully */}
      {!hasError && !isLoading && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-gradient-to-br from-[#020a1c]/90 to-purple-900/90 backdrop-blur-sm border-[#ff7033]/20 shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#ff7033] to-orange-500 flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">Instant Responses</h3>
                  <p className="text-sm text-white/80">Get immediate answers to your questions about our AI solutions</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 backdrop-blur-sm border-purple-600/20 shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#020a1c] to-purple-900 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-8 h-8 text-[#ff7033]" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">AI-Powered</h3>
                  <p className="text-sm text-white/80">Intelligent responses tailored to your specific needs</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#020a1c]/90 to-purple-900/90 backdrop-blur-sm border-[#ff7033]/20 shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#ff7033] to-orange-500 flex items-center justify-center shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">Available 24/7</h3>
                  <p className="text-sm text-white/80">Always here to help, any time of day or night</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotSai;