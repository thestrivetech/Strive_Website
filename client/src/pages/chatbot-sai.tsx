import { Bot, Sparkles, AlertCircle, Loader2, MessageCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import chatbotManager from "@/lib/chatbot-iframe-communication";
import performanceMonitor from "@/lib/chatbot-performance-monitor";

const ChatBotSai = () => {
  const [isLoading, setIsLoading] = useState(false); // Start false, only true when user clicks Enter Chat
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const performanceId = useRef(`fullpage-${Date.now()}`);
  const retryTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Chatbot URL
  const chatbotUrl = import.meta.env.VITE_CHATBOT_URL || 'https://chatbot.strivetech.ai';
  const fullPageUrl = `${chatbotUrl}/full`;

  useEffect(() => {
    // Enhanced message debugging for development
    const debugMessageListener = (event: MessageEvent) => {
      if (import.meta.env.DEV && event.data?.type) {
        console.log(`🔍 PostMessage: ${event.data.type} from ${event.origin}`);
      }
    };
    
    window.addEventListener('message', debugMessageListener);

    // Setup message handlers IMMEDIATELY (before iframe loads)
    if (import.meta.env.DEV) {
      console.log('🔧 Setting up chatbot message handlers...');
    }
    const unsubscribeReady = chatbotManager.onMessage('ready', handleChatbotReady);
    const unsubscribeError = chatbotManager.onMessage('error', handleChatbotError);
    const unsubscribeNavigate = chatbotManager.onMessage('navigate', handleNavigate);
    const unsubscribeAnalytics = chatbotManager.onMessage('analytics', handleAnalytics);

    // Preconnect to chatbot domain for faster loading
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = chatbotUrl;
    preconnectLink.crossOrigin = 'anonymous';
    document.head.appendChild(preconnectLink);

    // DNS prefetch
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'dns-prefetch';
    prefetchLink.href = chatbotUrl;
    document.head.appendChild(prefetchLink);

    // Intersection Observer for performance tracking (iframe already loads immediately)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            performanceMonitor.trackEvent(performanceId.current, 'chatbot_container_visible');
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Start performance tracking
    performanceMonitor.startTracking(performanceId.current);

    // Loading timeout will be set up when user clicks "Enter Chat"
    // No timeout needed on page load since iframe doesn't auto-load

    // DON'T auto-load iframe - wait for user to click "Enter Chat" button
    if (import.meta.env.DEV) {
      console.log('🚀 Chat page loaded - waiting for user to initiate chat...');
    }
    // setShouldLoadIframe(true); // Removed auto-loading

    return () => {
      observer.disconnect();
      unsubscribeReady();
      unsubscribeError();
      unsubscribeNavigate();
      unsubscribeAnalytics();
      // loadTimeout removed - now handled in handleEnterChat
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
      performanceMonitor.cleanup(performanceId.current);
      
      // Cleanup debug listener
      window.removeEventListener('message', debugMessageListener);
      
      // Cleanup preconnect links
      document.head.removeChild(preconnectLink);
      document.head.removeChild(prefetchLink);
    };
  }, [isLoading, iframeReady, chatbotUrl]);

  const handleChatbotReady = (data: any) => {
    console.log('✅ Received chatbot ready message!', data);
    
    // Clear fallback timeout since we got the proper ready message
    if (fallbackTimeoutRef.current) {
      console.log('⏱️ Clearing fallback timeout - proper ready message received');
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }

    setIsLoading(false);
    setHasError(false);
    setErrorMessage('');
    setIframeReady(true);

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
    console.error('❌ Chatbot error received:', data);
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
    console.log('🔗 Iframe loaded successfully:', fullPageUrl);
    performanceMonitor.trackEvent(performanceId.current, 'iframe_loaded');
    
    // Clear any existing fallback timeout before setting a new one
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
    
    // Fallback: If no ready message received within 5 seconds, assume chatbot is ready
    if (import.meta.env.DEV) {
      console.log('⏱️ Starting 5-second fallback timer for chatbot ready state');
    }
    fallbackTimeoutRef.current = window.setTimeout(() => {
      if (isLoading && !iframeReady && !hasError) {
        if (import.meta.env.DEV) {
          console.warn('⚠️ Chatbot ready message timeout - activating fallback ready state');
          console.log('🔧 This indicates the chatbot is not sending the required postMessage');
        }
        setIsLoading(false);
        setIframeReady(true);
        setHasError(false);
        
        // Track fallback activation
        performanceMonitor.trackEvent(performanceId.current, 'chatbot_ready_fallback');
        
        // Register iframe
        if (iframeRef.current) {
          chatbotManager.registerIframe(iframeRef.current);
        }
        
        // Track page view
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_title: 'Chat with Sai - Fallback Ready',
            page_location: window.location.href
          });
        }
      }
    }, 5000); // 5 second fallback for better reliability timeout
  };

  const handleIframeError = () => {
    console.error('❌ Iframe failed to load:', fullPageUrl);
    performanceMonitor.trackEvent(performanceId.current, 'iframe_error');
    
    // Clear any timeouts since we have an error
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    
    setHasError(true);
    setErrorMessage('Unable to connect to the chat service. This might be due to network connectivity or the service being temporarily unavailable.');
    setIsLoading(false);
    setIframeReady(false);
    
    // Track error analytics
    if (window.gtag) {
      window.gtag('event', 'chatbot_error', {
        error_type: 'iframe_load_failed',
        page_location: window.location.href
      });
    }
  };

  const handleRetry = () => {
    console.log('🔄 User initiated retry...');
    
    // Clear any existing timeouts
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
    
    // Reset states
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');
    setIframeReady(false);

    if (iframeRef.current) {
      // Force reload with cache buster to avoid cached errors
      const timestamp = Date.now();
      iframeRef.current.src = `${fullPageUrl}?retry=${timestamp}`;
    }
    
    // Set up new timeout for retry attempt
    const retryTimeout = setTimeout(() => {
      if (isLoading && !iframeReady) {
        console.warn('Retry attempt taking longer than expected...');
        retryTimeoutRef.current = window.setTimeout(() => {
          if (isLoading && !iframeReady && !hasError) {
            setHasError(true);
            setErrorMessage('The chat service is still unavailable after retry. Please check your internet connection and try again later.');
            setIsLoading(false);
          }
        }, 10000);
      }
    }, 15000);
    
    retryTimeoutRef.current = retryTimeout;
    
    // Track retry analytics
    if (window.gtag) {
      window.gtag('event', 'chatbot_retry', {
        page_location: window.location.href
      });
    }
  };;

  const handleContactSupport = () => {
    window.location.href = '/contact';
  };

  const handleEnterChat = () => {
    console.log('🚀 User clicked Enter Chat - starting iframe load...');
    
    // Clear any existing timeouts
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
    
    // Reset all states for fresh start
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');
    setIframeReady(false);
    setShouldLoadIframe(true);
    
    // Set up loading timeout ONLY after user initiates chat
    const loadTimeout = setTimeout(() => {
      if (isLoading && !iframeReady) {
        console.warn('Chatbot taking longer than expected, but continuing to wait...');
        // Don't set error immediately, give it more time
        retryTimeoutRef.current = window.setTimeout(() => {
          if (isLoading && !iframeReady && !hasError) {
            setHasError(true);
            setErrorMessage('The chat service is taking longer than expected to load. Please try refreshing the page.');
            setIsLoading(false);
          }
        }, 10000); // Additional 10 seconds
      }
    }, 15000); // 15 second initial timeout
    
    // Store timeout reference for cleanup
    retryTimeoutRef.current = loadTimeout;
    
    // Track the manual initiation
    performanceMonitor.trackEvent(performanceId.current, 'manual_chat_start');
    
    // Analytics
    if (window.gtag) {
      window.gtag('event', 'chat_initiated', {
        method: 'enter_chat_button',
        page_location: window.location.href
      });
    }
  };

  // Render error state
  const renderErrorState = () => (
    <div className="w-full">
      <Card className="shadow-2xl border-0 bg-transparent">
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
  );

  // Render welcome state with Enter Chat button
  const renderWelcomeState = () => (
    <div className="w-full">
      <Card className="shadow-2xl border-0 bg-transparent">
        <CardContent className="p-0">
          <div className="h-[600px] flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6 animate-fade-in">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff7033] to-purple-600 flex items-center justify-center shadow-2xl mx-auto">
                  <Bot className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-[#ff7033] flex items-center justify-center animate-pulse">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">Ready to Chat with Sai?</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                Your AI-powered business assistant is standing by to help with solutions, 
                answer questions, and provide expert guidance tailored to your needs.
              </p>

              <button
                onClick={handleEnterChat}
                className="w-full bg-gradient-to-r from-[#ff7033] to-orange-500 hover:from-orange-500 hover:to-[#ff7033] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
              >
                <span className="flex items-center justify-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  Enter Chat
                </span>
              </button>

              <p className="text-white/60 text-sm mt-4">
                Click to start your conversation with Sai
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render loading state with skeleton UI
  const renderLoadingState = () => (
    <div className="w-full">
      <Card className="shadow-2xl border-0 bg-transparent">
        <CardHeader className="bg-gradient-to-r from-[#020a1c] via-purple-900 to-[#020a1c] text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div>
                  <span className="font-bold text-lg">Connecting to Sai...</span>

                </div>
              </div>
              <Badge className="bg-gradient-to-r from-[#ff7033] to-yellow-500 text-white px-4 py-2">
                AI Assistant
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff7033] to-purple-600 flex items-center justify-center shadow-2xl mx-auto">
                    <Bot className="h-8 w-8 text-white" />
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

      {/* Debug Panel - Development Mode Only */}
      {import.meta.env.DEV && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <h3 className="font-bold text-yellow-800 mb-3">🔧 Debug Tools (Dev Mode Only)</h3>
                <div className="flex flex-wrap gap-3 mb-3">
                  <Button
                    onClick={() => {
                      console.log('🧪 Manual Ready Trigger');
                      handleChatbotReady({ 
                        version: 'manual-test', 
                        mode: 'full',
                        timestamp: Date.now() 
                      });
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm"
                    size="sm"
                  >
                    🚀 Manual Ready Trigger
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('🧪 Manual Error Trigger');
                      handleChatbotError({ error: 'Manual test error' });
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm"
                    size="sm"
                  >
                    ❌ Manual Error Trigger
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('🧪 Send Test Message to iframe');
                      if (iframeRef.current && iframeRef.current.contentWindow) {
                        iframeRef.current.contentWindow.postMessage({
                          type: 'test',
                          data: { test: true },
                          source: 'website-debug'
                        }, '*');
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    size="sm"
                  >
                    📤 Send Test to iframe
                  </Button>
                </div>
                <div className="text-sm text-yellow-700">
                  <p><strong>Status:</strong> Loading: {isLoading.toString()}, Ready: {iframeReady.toString()}, Error: {hasError.toString()}</p>
                  <p><strong>iframe URL:</strong> {fullPageUrl}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {hasError ? (
            <div className="h-[600px] flex items-center justify-center">
              {renderErrorState()}
            </div>
          ) : !shouldLoadIframe ? (
            <div className="h-[600px] flex items-center justify-center">
              {renderWelcomeState()}
            </div>
          ) : isLoading ? (
            <div className="h-[600px] flex items-center justify-center">
              {renderLoadingState()}
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={fullPageUrl}
              className={`w-full rounded-lg shadow-2xl border-0 transition-opacity duration-500 ${
                iframeReady ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                height: 'calc(100vh - 300px)',
                minHeight: '600px',
                backgroundColor: 'transparent'
              }}
              frameBorder="0"
              allow="microphone; camera"
              title="Chat with Sai - Strive Tech AI Assistant"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              data-testid="chatbot-full-iframe"
              loading="eager"
            />
          )}
        </div>
      </div>



      {/* Info Cards */}
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
    </div>
  );
};

export default ChatBotSai;

/*
## TODO LIST - React 19.1.1 Upgrade & Chatbot Integration

### COMPLETED ✅
1. Analyze differences between chatbot team's implementation and current website integration
2. Add plan and todo list to end of chatbot-sai.tsx file
3. Update iframe URL to use correct /full path instead of /full?t=timestamp
4. Add proper security headers to vercel.json for iframe embedding
5. Update iframe attributes to match integration guide recommendations
6. Fix message handling to match chatbot's expected format
7. Test iframe loading and full-screen display
8. Stop development servers to prevent conflicts

### IN PROGRESS 🔄
9. Update chatbot-sai.tsx with React 19 upgrade plan

### PENDING ⏳
10. Update React and React-DOM to version 19.1.1
11. Update React TypeScript types to match React 19
12. Clear node_modules and package-lock.json
13. Reinstall dependencies with npm install
14. Run TypeScript check to identify any type issues
15. Run tests to verify functionality
16. Test development server and chatbot integration
17. Build production bundle to verify no build issues

## REACT 19.1.1 UPGRADE PLAN

### Current State:
- React: 18.3.1 → Upgrading to 19.1.1
- React-DOM: 18.3.1 → Upgrading to 19.1.1
- @types/react: 18.3.11 → Upgrading to 19.1.10
- @types/react-dom: 18.3.1 → Upgrading to 19.1.7

### Why This Upgrade:
- **Chatbot Compatibility**: Chatbot uses React 19.1.1, matching versions prevents conflicts
- **Performance**: React 19 has better rendering optimizations
- **Future-Proofing**: Latest stable React version
- **Integration**: Ensures optimal iframe communication

### Commands to Execute:
```bash
# Stop dev servers (✅ DONE)
# Update React packages
npm install react@^19.1.1 react-dom@^19.1.1
npm install --save-dev @types/react@^19.1.10 @types/react-dom@^19.1.7

# Clean installation
rm -rf node_modules package-lock.json
npm install

# Verification
npm run check      # TypeScript compilation
npm run test:run   # Test suite
npm run dev        # Development server
npm run build      # Production build
```

### Files That May Need Updates:

#### Core React Files:
- ✅ client/src/main.tsx (already uses createRoot - compatible)
- ⚠️ Any files using deprecated React APIs (none detected)
- ⚠️ Third-party libraries that may need React 19 compatibility

#### Testing Files:
- ⚠️ Test files may need updates if testing library needs React 19 support
- ⚠️ Any snapshot tests may need updating

#### Build Configuration:
- ⚠️ Vite configuration may need adjustments for React 19
- ⚠️ TypeScript configuration may need updates
- ⚠️ ESLint rules may need React 19 specific updates

#### Potential Breaking Changes to Check:
1. **Strict Mode Changes**: React 19 has stricter development mode
2. **Event Handling**: Minor changes in synthetic event handling
3. **Type Definitions**: TypeScript types may have minor changes
4. **Third-party Libraries**: Check compatibility with React 19

### Dependencies to Monitor:
- **react-helmet-async**: Ensure React 19 compatibility
- **@radix-ui/***: Check all Radix components work with React 19
- **wouter**: Routing library compatibility
- **framer-motion**: Animation library compatibility
- **lucide-react**: Icon library compatibility

### Post-Upgrade Checklist:
- [ ] All TypeScript errors resolved
- [ ] All tests passing
- [ ] Development server starts without errors
- [ ] Production build completes successfully
- [ ] Chatbot iframe loads and functions properly
- [ ] No console errors in browser
- [ ] All existing functionality works
- [ ] Performance is maintained or improved

### Rollback Plan:
If issues arise:
```bash
npm install react@^18.3.1 react-dom@^18.3.1
npm install --save-dev @types/react@^18.3.11 @types/react-dom@^18.3.1
rm -rf node_modules package-lock.json
npm install
```

## COMPLETED CHATBOT INTEGRATION FIXES

### What Was Fixed:
1. **Missing Security Headers**: Added X-Frame-Options and CSP to vercel.json
2. **Incorrect iframe URL**: Removed timestamp parameter from /full path
3. **Message Source Validation**: Made 'sai-chatbot' source check optional
4. **iframe Attributes**: Updated to match integration guide exactly

### Expected Outcome:
These changes will:
- Allow the chatbot iframe to load properly without security restrictions
- Fix full-screen display formatting issues
- Ensure proper message communication between parent and iframe
- Match the chatbot team's tested configuration exactly
- Provide optimal compatibility with React 19.1.1 chatbot
*/