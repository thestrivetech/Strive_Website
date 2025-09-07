import { MessageCircle, Send, Bot, Sparkles, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatBotSai = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm Sai, your AI-powered assistant from Strive Tech. I'm here to help you explore our solutions, answer questions about our services, and guide you to the right resources. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // AI Solutions
    if (lowerMessage.includes("ai") || lowerMessage.includes("artificial intelligence")) {
      return "We offer cutting-edge AI solutions including machine learning models, natural language processing, computer vision, and predictive analytics. Would you like to explore our portfolio or schedule a demo to see these solutions in action?";
    }
    
    // Pricing
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
      return "Our pricing is customized based on your specific needs and scale. We offer flexible plans starting from small businesses to enterprise solutions. I can help you schedule a consultation to discuss your budget and requirements. Would you like me to arrange that?";
    }
    
    // Demo
    if (lowerMessage.includes("demo") || lowerMessage.includes("trial")) {
      return "Excellent! We offer personalized demos tailored to your industry and use case. You can request a free demo at our demo page, or I can help guide you through our interactive portfolio showcasing real implementations. Which would you prefer?";
    }
    
    // Industries
    if (lowerMessage.includes("industry") || lowerMessage.includes("industries")) {
      return "We serve multiple industries including Healthcare, Finance, Manufacturing, Retail, Technology, Education, Real Estate, and Legal. Each solution is tailored to address specific industry pain points. Which industry are you interested in learning more about?";
    }
    
    // Support
    if (lowerMessage.includes("support") || lowerMessage.includes("help")) {
      return "We provide 24/7 support for all our clients. Our support includes technical assistance, training resources, and dedicated account managers for enterprise clients. You can reach our support team through the Contact page or continue chatting with me for immediate assistance!";
    }
    
    // Integration
    if (lowerMessage.includes("integrate") || lowerMessage.includes("integration")) {
      return "Our solutions are designed to integrate seamlessly with your existing systems. We support APIs, webhooks, and custom integrations with popular platforms like Salesforce, SAP, Microsoft Azure, AWS, and more. Would you like to discuss your specific integration requirements?";
    }
    
    // About Company
    if (lowerMessage.includes("about") || lowerMessage.includes("company") || lowerMessage.includes("strive")) {
      return "Strive Tech is a leading AI solutions provider with 8+ years of experience, serving 150+ clients globally. We're committed to transforming businesses through innovative technology. Our team of experts specializes in creating custom AI solutions that drive real results. Would you like to learn more about our team or success stories?";
    }
    
    // Default response
    return "That's a great question! I'd be happy to help you explore that further. Could you provide more details about what specific aspect you're interested in? You can also check out our Solutions page for comprehensive information, or I can help schedule a consultation with our experts.";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate bot response with typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: "bot",
        content: generateBotResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    "Tell me about your AI solutions",
    "I need a demo",
    "What industries do you serve?",
    "Pricing information",
    "How can AI help my business?"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="pt-16 min-h-screen bg-[#ffffffeb]">
      {/* Header */}
      <div className="hero-gradient py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Bot className="h-12 w-12 text-primary animate-pulse" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-[#ff7033]" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Chat with <span className="gradient-text">Sai</span>
            </h1>
            <p className="text-white/90">
              Your AI-Powered Business Solutions Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-[#020a1c] to-[#0f172a] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <span className="font-semibold">Sai is Online</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  AI Assistant
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea className="h-[500px] p-6">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.type === 'user' ? 'bg-primary' : 'bg-gradient-to-r from-[#ff7033] to-primary'
                        }`}>
                          {msg.type === 'user' ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div className={`rounded-2xl px-4 py-3 ${
                            msg.type === 'user' 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-100 text-[#020a1c]'
                          }`}>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 ${
                            msg.type === 'user' ? 'justify-end' : 'justify-start'
                          }`}>
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#ff7033] to-primary flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="px-6 py-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setMessage(action);
                          inputRef.current?.focus();
                        }}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    className="bg-primary hover:bg-primary/90"
                    disabled={!message.trim() || isTyping}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-4">
                <MessageCircle className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-[#020a1c] mb-1">Instant Responses</h3>
                <p className="text-sm text-gray-600">Get immediate answers to your questions about our AI solutions</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#ff7033]/10 to-[#ff7033]/5">
              <CardContent className="p-4">
                <Sparkles className="w-8 h-8 text-[#ff7033] mb-2" />
                <h3 className="font-semibold text-[#020a1c] mb-1">AI-Powered</h3>
                <p className="text-sm text-gray-600">Intelligent responses tailored to your specific needs</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
              <CardContent className="p-4">
                <Clock className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="font-semibold text-[#020a1c] mb-1">Available 24/7</h3>
                <p className="text-sm text-gray-600">Always here to help, any time of day or night</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotSai;