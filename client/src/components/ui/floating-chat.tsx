import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, BotMessageSquare, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { chatbotManager, preconnectToChatbot, createSecureIframe } from "@/lib/chatbot-iframe-communication";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPreconnected, setIsPreconnected] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Chatbot configuration
  const chatbotOrigin = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://chat.strivetech.ai';
  const widgetUrl = `${chatbotOrigin}/widget`;

  // Setup chatbot communication
  useEffect(() => {
    // Setup message handlers
    chatbotManager.onMessage('ready', () => {
      setIsLoading(false);
      setHasError(false);
    });

    chatbotManager.onMessage('close', () => {
      setIsOpen(false);
    });

    chatbotManager.onMessage('minimize', () => {
      setIsOpen(false);
    });

    chatbotManager.onMessage('error', (data) => {
      console.error('Chatbot error:', data);
      setHasError(true);
      setIsLoading(false);
    });

    chatbotManager.onMessage('navigate', (data) => {
      if (data?.url) {
        // Close chat and navigate
        setIsOpen(false);
        setTimeout(() => {
          window.location.href = data.url;
        }, 100);
      }
    });

    // Cleanup on unmount
    return () => {
      chatbotManager.offMessage('ready');
      chatbotManager.offMessage('close');
      chatbotManager.offMessage('minimize');
      chatbotManager.offMessage('error');
      chatbotManager.offMessage('navigate');
    };
  }, []);

  // Handle chat open/close
  const handleChatToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    // Open chat and load iframe if needed
    setIsOpen(true);
    setIsLoading(true);
    setHasError(false);

    // Preconnect if not already done
    if (!isPreconnected) {
      preconnectToChatbot(chatbotOrigin);
      setIsPreconnected(true);
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    if (iframeRef.current) {
      chatbotManager.setIframe(iframeRef.current);
      // Notify iframe of container visibility
      chatbotManager.notifyVisibilityChange(isOpen);
    }
  };

  // Handle iframe error
  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Preconnect on hover for better performance
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isPreconnected) {
      preconnectToChatbot(chatbotOrigin);
      setIsPreconnected(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle retry
  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);

    // Reload iframe
    if (iframeRef.current) {
      iframeRef.current.src = widgetUrl;
    }
  };

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
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <BotMessageSquare className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Coming Soon Badge - Always visible, centered under chat button */}
      <div className="fixed bottom-1 right-4 sm:right-16 z-[60] flex justify-center w-14">
        <ComingSoonBadge size="sm" variant="hero" className="text-[9px] px-1.5 py-0.5 whitespace-nowrap" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={containerRef}
          className="fixed bottom-28 right-16 w-96 h-[500px] z-40"
          style={{
            transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease-out'
          }}
        >
          {hasError ? renderErrorState() : isLoading ? renderLoadingState() : (
            <iframe
              ref={iframeRef}
              src={widgetUrl}
              className="w-full h-full border-none rounded-lg shadow-2xl"
              style={{
                backgroundColor: 'transparent',
                colorScheme: 'normal'
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              allow="microphone; camera; clipboard-write; autoplay"
              referrerPolicy="strict-origin"
              title="Sai AI Assistant Chat"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              data-testid="chatbot-iframe"
            />
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChat;