import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string, timestamp: Date}>>([
    {
      type: "bot" as const,
      content: "Hi! I'm Sai, your AI assistant. How can I help you learn more about Strive's AI solutions?",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      type: "user" as const,
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: "bot" as const,
        content: "Thanks for your message! Our team will get back to you soon. In the meantime, feel free to explore our solutions or schedule a demo.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="floating-chat fixed bottom-12 right-16 z-50">
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
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg border-none outline-none flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110"
          data-testid="button-floating-chat"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Coming Soon Badge - Always visible, centered under chat button */}
      <div className="fixed bottom-4 z-[60] transform -translate-x-1/2" style={{ right: '-36px' }}>
        <ComingSoonBadge size="sm" variant="hero" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-16 w-96 h-[500px] z-40">
          <Card className="h-full flex flex-col bg-white/10 backdrop-blur-xl border-border shadow-2xl">
            {/* Chat Header */}
            <div className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold" data-testid="chat-avatar">S</span>
                  </div>
                  <div>
                    <h3 className="font-semibold" data-testid="chat-bot-name">Sai</h3>
                    <p className="text-xs opacity-90" data-testid="chat-status">AI Assistant</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 hover:text-white transition-all duration-200 hover:scale-110 rounded-full w-8 h-8"
                  data-testid="button-close-chat"
                >
                  <X className="w-5 h-5 font-bold stroke-2" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 bg-transparent">
              <div className="p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    data-testid={`message-${msg.type}-${index}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 text-white'
                          : 'bg-gradient-to-br from-[#020a1c] via-purple-900 to-[#020a1c] text-white border border-[#ff7033]/20'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions - Always show */}
            <div className="px-4 py-2 border-t border-border/50 bg-transparent">
              <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-2 border-transparent bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 p-[2px] text-white hover:text-[#ff7033] transition-all duration-300 hover:shadow-md hover:scale-105"
                  onClick={() => {
                    window.location.href = '/demo';
                  }}
                  style={{
                    background: 'linear-gradient(to bottom right, #ff7033, #f97316, #9333ea)',
                    padding: '2px'
                  }}
                >
                  <span className="bg-[#020a1c] hover:bg-[#020a1c] px-2 py-1 rounded text-xs w-full h-full flex items-center justify-center">
                    Request Demo
                  </span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-2 border-transparent bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 p-[2px] text-white hover:text-[#ff7033] transition-all duration-300 hover:shadow-md hover:scale-105"
                  onClick={() => {
                    window.location.href = '/request';
                  }}
                  style={{
                    background: 'linear-gradient(to bottom right, #ff7033, #f97316, #9333ea)',
                    padding: '2px'
                  }}
                >
                  <span className="bg-[#020a1c] hover:bg-[#020a1c] px-2 py-1 rounded text-xs w-full h-full flex items-center justify-center">
                    Get Custom Solution
                  </span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-2 border-transparent bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 p-[2px] text-white hover:text-[#ff7033] transition-all duration-300 hover:shadow-md hover:scale-105"
                  onClick={() => {
                    window.location.href = '/contact';
                  }}
                  style={{
                    background: 'linear-gradient(to bottom right, #ff7033, #f97316, #9333ea)',
                    padding: '2px'
                  }}
                >
                  <span className="bg-[#020a1c] hover:bg-[#020a1c] px-2 py-1 rounded text-xs w-full h-full flex items-center justify-center">
                    Contact Us
                  </span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-2 border-transparent bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 p-[2px] text-white hover:text-[#ff7033] transition-all duration-300 hover:shadow-md hover:scale-105"
                  onClick={() => {
                    window.location.href = '/chatbot-sai';
                  }}
                  style={{
                    background: 'linear-gradient(to bottom right, #ff7033, #f97316, #9333ea)',
                    padding: '2px'
                  }}
                >
                  <span className="bg-[#020a1c] hover:bg-[#020a1c] px-2 py-1 rounded text-xs w-full h-full flex items-center justify-center">
                    Live Chat Support
                  </span>
                </Button>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border bg-transparent">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  data-testid="input-chat-message"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 text-white hover:from-orange-500 hover:to-[#ff7033] shadow-lg"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default FloatingChat;