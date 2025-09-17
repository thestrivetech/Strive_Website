import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, BotMessageSquare, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import chatbotManager from "@/lib/chatbot-iframe-communication";
import performanceMonitor from "@/lib/chatbot-performance-monitor";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const performanceId = useRef(`widget-${Date.now()}`);
  const retryCount = useRef(0);
  const maxRetries = 3;

  // Chatbot URL - can be environment variable
  const chatbotUrl = import.meta.env.VITE_CHATBOT_URL || 'https://chatbot.strivetech.ai';
  const widgetUrl = `${chatbotUrl}/widget`;

  useEffect(() => {
    // Setup message handlers
    const unsubscribeReady = chatbotManager.onMessage('ready', handleChatbotReady);
    const unsubscribeError = chatbotManager.onMessage('error', handleChatbotError);
    const unsubscribeClose = chatbotManager.onMessage('close', handleChatbotClose);
    const unsubscribeMinimize = chatbotManager.onMessage('minimize', handleChatbotMinimize);
    const unsubscribeAnalytics = chatbotManager.onMessage('analytics', handleAnalytics);

    // Preconnect to chatbot domain for performance
    preconnectToChatbot();

    return () => {
      unsubscribeReady();
      unsubscribeError();
      unsubscribeClose();
      unsubscribeMinimize();
      unsubscribeAnalytics();
      performanceMonitor.cleanup(performanceId.current);
    };
  }, []);

  const preconnectToChatbot = () => {
    // DNS prefetch
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = chatbotUrl;
    document.head.appendChild(dnsPrefetch);

    // Preconnect
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = chatbotUrl;
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);
  };

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsLoading(true);
    setHasError(false);
    setIsMinimized(false);
    retryCount.current = 0;

    // Start performance tracking
    performanceMonitor.startTracking(performanceId.current);
    performanceMonitor.trackEvent(performanceId.current, 'open_clicked');
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsLoading(false);
    setHasError(false);
    setUnreadCount(0);

    // End performance tracking
    const report = performanceMonitor.endTracking(performanceId.current);
    console.log('Chat session performance:', report);

    // Send analytics
    if (window.gtag) {
      window.gtag('event', 'chatbot_closed', {
        session_duration: report?.totalTime
      });
    }
  }, []);

  const handleMinimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const handleRestore = useCallback(() => {
    setIsMinimized(false);
  }, []);

  const handleChatbotReady = useCallback((data: any) => {
    setIsLoading(false);
    setHasError(false);
    performanceMonitor.trackEvent(performanceId.current, 'chatbot_ready', data);

    // Register iframe
    if (iframeRef.current) {
      chatbotManager.registerIframe(iframeRef.current);
    }
  }, []);

  const handleChatbotError = useCallback((data: any) => {
    console.error('Chatbot error:', data);
    setIsLoading(false);
    setHasError(true);
    performanceMonitor.trackEvent(performanceId.current, 'chatbot_error', data);
  }, []);

  const handleChatbotClose = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleChatbotMinimize = useCallback(() => {
    handleMinimize();
  }, [handleMinimize]);

  const handleAnalytics = useCallback((data: any) => {
    // Forward analytics to your analytics service
    if (window.gtag) {
      window.gtag('event', `chatbot_${data.event}`, data.properties);
    }
  }, []);

  // Handle chat open/close
  const handleChatToggle = () => {
    if (isOpen) {
      handleClose();
      return;
    }

    handleOpen();
  };

  const handleIframeLoad = useCallback(() => {
    performanceMonitor.trackEvent(performanceId.current, 'iframe_loaded');
    // Don't set loading to false here - wait for 'ready' message
    
    // Send message to control scroll position - keep at top
    if (iframeRef.current && iframeRef.current.contentWindow) {
      setTimeout(() => {
        chatbotManager.sendMessage('scroll_control', { 
          position: 'top',
          focusInput: true 
        }, iframeRef.current);
      }, 500);
    }
  }, []);

  const handleIframeError = useCallback(() => {
    performanceMonitor.trackEvent(performanceId.current, 'iframe_error');

    if (retryCount.current < maxRetries) {
      retryCount.current++;
      setTimeout(() => {
        setIsLoading(true);
        setHasError(false);
        // Force reload by updating key
        if (iframeRef.current) {
          iframeRef.current.src = `${widgetUrl}?retry=${retryCount.current}`;
        }
      }, 1000 * retryCount.current);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  }, [widgetUrl]);

  // Preconnect on hover for better performance
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRetry = useCallback(() => {
    retryCount.current = 0;
    setIsLoading(true);
    setHasError(false);
    if (iframeRef.current) {
      iframeRef.current.src = widgetUrl;
    }
  }, [widgetUrl]);

  // Render error state
  const renderErrorState = () => (
    <Card className="h-full flex flex-col bg-white/10 backdrop-blur-xl border-border shadow-2xl">
      <div className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Connection Error</h3>
              <p className="text-xs opacity-90">Unable to load chat</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 hover:text-white transition-all duration-200 hover:scale-110 rounded-full w-8 h-8"
          >
            <X className="w-5 h-5 font-bold stroke-2" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="font-semibold text-lg mb-2">Chat Temporarily Unavailable</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          We're having trouble connecting to our chat service. Please try again or contact us directly.
        </p>

        <div className="space-y-2 w-full">
          <Button
            onClick={handleRetry}
            className="w-full bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 text-white hover:from-orange-500 hover:to-[#ff7033]"
          >
            Try Again
          </Button>

          <div className="flex space-x-2">
            <Button
              onClick={() => window.location.href = '/contact'}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
            >
              Contact Us
            </Button>
            <Button
              onClick={() => window.location.href = '/chatbot-sai'}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
            >
              Full Chat Page
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  // Render loading state
  const renderLoadingState = () => (
    <Card className="h-full flex flex-col bg-white/10 backdrop-blur-xl border-border shadow-2xl">
      <div className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            </div>
            <div>
              <h3 className="font-semibold">Connecting...</h3>
              <p className="text-xs opacity-90">Loading Sai</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 hover:text-white transition-all duration-200 hover:scale-110 rounded-full w-8 h-8"
          >
            <X className="w-5 h-5 font-bold stroke-2" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading your AI assistant...</p>
        </div>
      </div>
    </Card>
  );

  return (
    <>
      {/* Chat Button */}
      <div className="floating-chat fixed bottom-8 right-4 sm:bottom-12 sm:right-16 z-50">
        {/* Peek-a-boo preview panel */}
        {!isOpen && isHovered && (
          <div
            className="absolute bottom-16 right-0 bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap transform transition-all duration-300 ease-out animate-in slide-in-from-right-2 fade-in"
            style={{ zIndex: 1000 }}
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Chat with Sai!</span>
            </div>
            {/* Arrow pointing to button */}
            <div className="absolute -bottom-1 right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-orange-500"></div>
          </div>
        )}
        <button
          onClick={handleChatToggle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg border-none outline-none flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110"
          data-testid="button-floating-chat"
          aria-label={isOpen ? "Close chat" : "Open chat with Sai"}
        >
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <BotMessageSquare className="w-7 h-7" />
          )}
        </button>
      </div>



      {/* Chat Widget Container */}
      {isOpen && (
        <div
          ref={containerRef}
          className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            isMinimized ? 'w-72 h-14' : 'w-[calc(100vw-48px)] h-[calc(100vh-120px)] sm:w-[400px] sm:h-[calc(100vh-80px)] max-h-[700px]'
          }`}
        >
          {/* Widget Header (for minimize/close) */}
          <div className="bg-gradient-to-r from-[#ff7033] to-orange-500 rounded-t-lg px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Sai AI Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={isMinimized ? handleRestore : handleMinimize}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={isMinimized ? 'Restore' : 'Minimize'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMinimized ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  )}
                </svg>
              </button>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="bg-white rounded-b-lg shadow-2xl h-[calc(100%-40px)] relative">
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-10 rounded-b-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-700 text-sm font-medium">Connecting to Sai...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {hasError && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-10 rounded-b-lg">
                  <div className="text-center px-6">
                    <div className="text-red-500 mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-gray-900 font-medium mb-2">Connection Failed</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Unable to connect to the chat service. Please try again.
                    </p>
                    <button
                      onClick={handleRetry}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Iframe - Only load when widget is opened */}
              {isOpen && (
                <iframe
                  ref={iframeRef}
                  src={widgetUrl}
                  className="w-full h-full border-none"
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto'
                  }}
                  scrolling="yes"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  allow="microphone; camera; clipboard-write; autoplay"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Sai AI Assistant Chat"
                  loading="eager"
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChat;