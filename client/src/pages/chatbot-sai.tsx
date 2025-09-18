import { Bot, Sparkles, AlertCircle, Loader2, MessageCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import chatbotManager from "@/lib/chatbot-iframe-communication";
import performanceMonitor from "@/lib/chatbot-performance-monitor";

// Responsive viewport detection hook
const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return viewport;
};

// Dynamic chat height calculation hook
const useDynamicChatHeight = () => {
  const [chatHeight, setChatHeight] = useState('70vh');
  const viewport = useViewport();

  const calculateHeight = useCallback(() => {
    const vh = viewport.height;
    const vw = viewport.width;

    // Calculate space taken by fixed elements
    const navbarHeight = 64; // pt-16 = 4rem = 64px
    const headerHeight = vw < 768 ? 120 : 200; // Responsive header
    const debugHeight = 0; // Only in dev, ignore for calculation
    const paddingAndMargins = 32; // Container padding
    const infoCardsHeight = viewport.isMobile ? 0 : 200; // Hide on mobile

    let availableHeight = vh - navbarHeight - headerHeight - paddingAndMargins;

    if (viewport.isMobile) {
      // Mobile: Use most of viewport, prioritize chat
      availableHeight = Math.max(vh - navbarHeight - 100, 400);
    } else if (viewport.isTablet) {
      // Tablet: Balanced layout
      availableHeight = vh - navbarHeight - headerHeight - 100;
    } else {
      // Desktop: Full layout with space for info cards
      availableHeight = vh - navbarHeight - headerHeight - infoCardsHeight - 50;
    }

    setChatHeight(`${Math.max(availableHeight, 350)}px`);
  }, [viewport]);

  useEffect(() => {
    calculateHeight();
  }, [calculateHeight]);

  return { chatHeight, viewport };
};

const ChatBotSai = () => {
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'ready' | 'error' | 'timeout'>('loading');
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(Date.now());

  // Use responsive hooks
  const { chatHeight, viewport } = useDynamicChatHeight();

  // Chatbot URL
  const chatbotUrl = import.meta.env.VITE_CHATBOT_URL || 'https://chatbot.strivetech.ai';
  const fullPageUrl = `${chatbotUrl}/full`;

  const addDebugInfo = (message: string) => {
    if (import.meta.env.DEV) {
      const timestamp = new Date().toLocaleTimeString();
      const elapsed = Date.now() - startTime.current;
      const debugMessage = `[${timestamp}] +${elapsed}ms: ${message}`;
      console.log(`🔍 ${debugMessage}`);
      setDebugInfo(prev => [...prev.slice(-4), debugMessage]);
    }
  };

  useEffect(() => {
    addDebugInfo('ChatBot component mounted');

    // Start loading iframe immediately on mount
    setIsIframeVisible(true);
    addDebugInfo('Iframe set to visible, starting load');

    // Set up message listener for chatbot communication (optional - not required for loading)
    const messageListener = (event: MessageEvent) => {
      // Allow messages from chatbot domains
      const allowedOrigins = [
        chatbotUrl,
        'https://chatbot.strivetech.ai',
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:3001'
      ];

      if (!allowedOrigins.includes(event.origin)) {
        return; // Silently ignore unknown origins
      }

      addDebugInfo(`Received message from ${event.origin}: ${JSON.stringify(event.data)}`);

      const { type, data } = event.data || {};

      if (type === 'ready') {
        addDebugInfo('Chatbot ready message received');
        handleChatbotReady();
      } else if (type === 'error') {
        addDebugInfo(`Chatbot error: ${data?.error || 'Unknown error'}`);
        handleChatbotError(data?.error);
      }
    };

    window.addEventListener('message', messageListener);

    // Primary loading strategy: Visibility-based detection
    // Show iframe immediately, fade out loading overlay after a short delay
    const visibilityTimeout = setTimeout(() => {
      addDebugInfo('Visibility timeout reached - assuming iframe is ready');
      setShowLoadingOverlay(false);
      setConnectionStatus('ready');
    }, 2000); // 2 second timeout for smooth UX

    visibilityTimeoutRef.current = visibilityTimeout;

    // Secondary timeout: Show warning but keep iframe visible
    const errorTimeout = setTimeout(() => {
      if (connectionStatus === 'loading') {
        addDebugInfo('Connection timeout reached');
        setConnectionStatus('timeout');
        setShowLoadingOverlay(false);
      }
    }, 10000); // 10 second timeout

    loadTimeoutRef.current = errorTimeout;

    // Preconnect for better performance
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = chatbotUrl;
    preconnectLink.crossOrigin = 'anonymous';
    document.head.appendChild(preconnectLink);

    // Track page view
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Chat with Sai - Direct Load',
        page_location: window.location.href
      });
    }

    return () => {
      window.removeEventListener('message', messageListener);
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      if (visibilityTimeoutRef.current) clearTimeout(visibilityTimeoutRef.current);
      document.head.removeChild(preconnectLink);
    };
  }, [chatbotUrl, connectionStatus]);

  const handleChatbotReady = () => {
    addDebugInfo('Chatbot confirmed ready');
    setConnectionStatus('ready');
    setShowLoadingOverlay(false);
    setHasError(false);
    setErrorMessage('');

    // Clear timeouts since we got confirmation
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    if (visibilityTimeoutRef.current) {
      clearTimeout(visibilityTimeoutRef.current);
      visibilityTimeoutRef.current = null;
    }
  };

  const handleChatbotError = (error?: string) => {
    addDebugInfo(`Chatbot error: ${error}`);
    setConnectionStatus('error');
    setHasError(true);
    setErrorMessage(error || 'Failed to load chatbot');
    setShowLoadingOverlay(false);
  };

  const handleIframeLoad = () => {
    addDebugInfo('Iframe onLoad event fired');

    // Don't automatically set ready - let the visibility timeout handle it
    // This prevents premature loading state removal
  };

  const handleIframeError = () => {
    addDebugInfo('Iframe onError event fired');
    handleChatbotError('Failed to load chatbot iframe');
  };

  const handleRetry = () => {
    addDebugInfo('User clicked retry');

    // Reset all states
    setHasError(false);
    setErrorMessage('');
    setConnectionStatus('loading');
    setShowLoadingOverlay(true);
    startTime.current = Date.now();

    // Reload iframe with cache buster
    if (iframeRef.current) {
      const timestamp = Date.now();
      iframeRef.current.src = `${fullPageUrl}?retry=${timestamp}`;
    }

    // Restart timeouts
    const visibilityTimeout = setTimeout(() => {
      addDebugInfo('Retry visibility timeout reached');
      setShowLoadingOverlay(false);
      setConnectionStatus('ready');
    }, 2000);

    const errorTimeout = setTimeout(() => {
      if (connectionStatus === 'loading') {
        addDebugInfo('Retry timeout reached');
        setConnectionStatus('timeout');
        setShowLoadingOverlay(false);
      }
    }, 10000);

    visibilityTimeoutRef.current = visibilityTimeout;
    loadTimeoutRef.current = errorTimeout;

    // Track retry
    if (window.gtag) {
      window.gtag('event', 'chatbot_retry', {
        page_location: window.location.href
      });
    }
  };

  const handleOpenInNewWindow = () => {
    addDebugInfo('User clicked open in new window');
    window.open(fullPageUrl, '_blank', 'width=800,height=600');

    if (window.gtag) {
      window.gtag('event', 'chatbot_external_open', {
        page_location: window.location.href
      });
    }
  };

  const handleContactSupport = () => {
    window.location.href = '/contact';
  };

  // Render timeout warning (but still show iframe)
  const renderTimeoutWarning = () => (
    <div className="absolute top-4 left-4 right-4 z-20 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
        <div className="flex-1">
          <p className="text-sm text-yellow-800">
            Chatbot is taking longer than expected to load, but you can still try using it below.
          </p>
          <div className="flex space-x-2 mt-2">
            <Button size="sm" onClick={handleRetry} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Retry
            </Button>
            <Button size="sm" onClick={handleOpenInNewWindow} variant="outline">
              Open in New Tab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render error overlay (still shows iframe underneath)
  const renderErrorOverlay = () => (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30 rounded-lg">
      <Card className="shadow-2xl border-0 bg-white max-w-md mx-4">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Connection Issue</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {errorMessage || 'Unable to establish a connection with the chat service.'}
          </p>

          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleRetry}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Try Again
              </Button>
              <Button
                onClick={handleOpenInNewWindow}
                variant="outline"
                className="px-6 py-3 rounded-lg font-medium"
              >
                Open in New Tab
              </Button>
              <Button
                onClick={handleContactSupport}
                variant="outline"
                className="px-6 py-3 rounded-lg font-medium"
              >
                Contact Support
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Call us directly:{' '}
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

  // Render loading overlay
  const renderLoadingOverlay = () => (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff7033] to-purple-600 flex items-center justify-center shadow-2xl mx-auto">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-[#ff7033] flex items-center justify-center">
            <Loader2 className="h-4 w-4 text-white animate-spin" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Sai...</h3>
        <p className="text-gray-600 mb-6">
          Your AI assistant is starting up.
        </p>

        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-[#ff7033] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`pt-16 min-h-screen hero-gradient flex flex-col ${viewport.isMobile ? 'pb-16' : ''}`}>
      {/* Header */}
      <div className={`relative ${viewport.isMobile ? 'py-6' : viewport.isTablet ? 'py-8' : 'py-12'} overflow-hidden flex-shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7033]/10 via-transparent to-purple-600/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`flex items-center justify-center ${viewport.isMobile ? 'mb-4' : 'mb-6'}`}>
              <div className="relative">
                <div className={`${viewport.isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-full bg-gradient-to-br from-[#ff7033] to-purple-600 flex items-center justify-center shadow-2xl`}>
                  <Bot className={`${viewport.isMobile ? 'h-8 w-8' : 'h-10 w-10'} text-white`} />
                </div>
                <div className={`absolute -top-2 -right-2 ${viewport.isMobile ? 'w-6 h-6' : 'w-8 h-8'} rounded-full bg-gradient-to-r from-yellow-400 to-[#ff7033] flex items-center justify-center animate-pulse`}>
                  <Sparkles className={`${viewport.isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-white`} />
                </div>
              </div>
            </div>
            <h1 className={`${viewport.isMobile ? 'text-2xl' : viewport.isTablet ? 'text-3xl md:text-4xl' : 'text-4xl md:text-6xl'} font-bold text-white mb-4`}>
              Chat with <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Sai</span>
            </h1>
            <p className={`${viewport.isMobile ? 'text-base' : 'text-xl'} text-white/90 max-w-2xl mx-auto`}>
              Your AI-Powered Business Solutions Assistant - Available 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Debug Panel - Development Mode Only */}
      {import.meta.env.DEV && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-800 mb-3">🔧 Debug Info (Dev Mode Only)</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Status:</strong> {connectionStatus}</p>
                  <p><strong>Show Loading Overlay:</strong> {showLoadingOverlay.toString()}</p>
                  <p><strong>Has Error:</strong> {hasError.toString()}</p>
                  <p><strong>iframe URL:</strong> {fullPageUrl}</p>
                </div>
                {debugInfo.length > 0 && (
                  <div className="mt-3 p-2 bg-blue-100 rounded text-xs font-mono">
                    <div className="font-bold mb-1">Recent Events:</div>
                    {debugInfo.map((info, index) => (
                      <div key={index}>{info}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div ref={containerRef} className={`container mx-auto px-4 sm:px-6 lg:px-8 ${viewport.isMobile ? 'py-4' : 'py-8'} flex-1 flex flex-col`}>
        <div className="max-w-5xl mx-auto flex-1 flex flex-col">
          <div className="relative flex-1 flex flex-col">
            {/* Always render iframe */}
            {isIframeVisible && (
              <iframe
                ref={iframeRef}
                src={fullPageUrl}
                className="w-full rounded-lg shadow-2xl border-0 bg-white transition-all duration-300"
                style={{
                  height: chatHeight,
                  minHeight: viewport.isMobile ? '350px' : '400px',
                  maxHeight: '85vh'
                }}
                frameBorder="0"
                allow="microphone; camera; clipboard-write; autoplay"
                title="Chat with Sai - Strive Tech AI Assistant"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                data-testid="chatbot-full-iframe"
                loading="eager"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            )}

            {/* Overlays */}
            {showLoadingOverlay && renderLoadingOverlay()}
            {connectionStatus === 'timeout' && renderTimeoutWarning()}
            {hasError && renderErrorOverlay()}
          </div>
        </div>
      </div>

      {/* Responsive Info Cards */}
      {!viewport.isMobile && (
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${viewport.isTablet ? 'py-4' : 'py-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className={`grid ${viewport.isTablet ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-3 gap-6'} mt-4`}>
              <Card className="bg-gradient-to-br from-[#020a1c]/90 to-purple-900/90 backdrop-blur-sm border-[#ff7033]/20 shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className={`${viewport.isTablet ? 'p-4' : 'p-6'} text-center`}>
                  <div className={`${viewport.isTablet ? 'w-12 h-12' : 'w-16 h-16'} mx-auto mb-4 rounded-full bg-gradient-to-r from-[#ff7033] to-orange-500 flex items-center justify-center shadow-lg`}>
                    <MessageCircle className={`${viewport.isTablet ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
                  </div>
                  <h3 className={`font-bold text-white mb-2 ${viewport.isTablet ? 'text-base' : 'text-lg'}`}>Instant Responses</h3>
                  <p className="text-sm text-white/80">Get immediate answers to your questions about our AI solutions</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 backdrop-blur-sm border-purple-600/20 shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className={`${viewport.isTablet ? 'p-4' : 'p-6'} text-center`}>
                  <div className={`${viewport.isTablet ? 'w-12 h-12' : 'w-16 h-16'} mx-auto mb-4 rounded-full bg-gradient-to-r from-[#020a1c] to-purple-900 flex items-center justify-center shadow-lg`}>
                    <Sparkles className={`${viewport.isTablet ? 'w-6 h-6' : 'w-8 h-8'} text-[#ff7033]`} />
                  </div>
                  <h3 className={`font-bold text-white mb-2 ${viewport.isTablet ? 'text-base' : 'text-lg'}`}>AI-Powered</h3>
                  <p className="text-sm text-white/80">Intelligent responses tailored to your specific needs</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#020a1c]/90 to-purple-900/90 backdrop-blur-sm border-[#ff7033]/20 shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className={`${viewport.isTablet ? 'p-4' : 'p-6'} text-center`}>
                  <div className={`${viewport.isTablet ? 'w-12 h-12' : 'w-16 h-16'} mx-auto mb-4 rounded-full bg-gradient-to-r from-[#ff7033] to-orange-500 flex items-center justify-center shadow-lg`}>
                    <Clock className={`${viewport.isTablet ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
                  </div>
                  <h3 className={`font-bold text-white mb-2 ${viewport.isTablet ? 'text-base' : 'text-lg'}`}>Available 24/7</h3>
                  <p className="text-sm text-white/80">Always here to help, any time of day or night</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Info Banner - Alternative for small screens */}
      {viewport.isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#020a1c]/95 to-purple-900/95 backdrop-blur-sm border-t border-[#ff7033]/20 p-3 z-30">
          <div className="flex items-center justify-center space-x-6 text-white">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-[#ff7033]" />
              <span className="text-xs font-medium">Instant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#ff7033]" />
              <span className="text-xs font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#ff7033]" />
              <span className="text-xs font-medium">24/7</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotSai;