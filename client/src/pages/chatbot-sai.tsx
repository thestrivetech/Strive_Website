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
      return "Our pricing is customized based on your specific needs and scale. We offer flexible plans starting from small businesses to enterprise solutions. I can help you schedule an assessment to discuss your budget and requirements. Would you like me to arrange that?";
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
    return "That's a great question! I'd be happy to help you explore that further. Could you provide more details about what specific aspect you're interested in? You can also check out our Solutions page for comprehensive information, or I can help schedule an assessment with our experts.";
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
            {/* Coming Soon Banner */}
            <div className="mt-6">
              <Badge className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-[#ff7033] to-orange-500 text-white border-0 shadow-lg animate-pulse hover:animate-none transition-all duration-300">
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#020a1c] via-purple-900 to-[#020a1c] text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <span className="font-bold text-lg">Sai is Online</span>
                    <p className="text-white/80 text-sm">Intelligent Assistant</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-[#ff7033] to-yellow-500 text-white px-4 py-2">
                  AI Assistant
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea className="h-[600px] p-8 bg-gradient-to-b from-white/50 to-white/80">
                <div className="space-y-6">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-4 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                          msg.type === 'user' 
                            ? 'bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600' 
                            : 'bg-gradient-to-br from-[#020a1c] via-purple-900 to-[#020a1c] border-2 border-[#ff7033]/30'
                        }`}>
                          {msg.type === 'user' ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`rounded-3xl px-6 py-4 shadow-lg ${
                            msg.type === 'user' 
                              ? 'bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 text-white' 
                              : 'bg-gradient-to-br from-[#020a1c] via-purple-900 to-[#020a1c] text-white border border-[#ff7033]/20'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                          </div>
                          <div className={`flex items-center gap-2 mt-2 ${
                            msg.type === 'user' ? 'justify-end' : 'justify-start'
                          }`}>
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-4 max-w-[85%]">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#020a1c] via-purple-900 to-[#020a1c] border-2 border-[#ff7033]/30 flex items-center justify-center shadow-lg">
                          <Bot className="w-5 h-5 text-white animate-pulse" />
                        </div>
                        <div className="bg-gradient-to-br from-[#020a1c] via-purple-900 to-[#020a1c] border border-[#ff7033]/20 rounded-3xl px-6 py-4 shadow-lg">
                          <div className="flex gap-2">
                            <span className="w-3 h-3 bg-[#ff7033] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                            <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
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
                <div className="px-8 py-4 border-t border-gray-200/50 bg-gradient-to-r from-white/80 to-white/60">
                  <p className="text-sm font-semibold text-[#020a1c] mb-3">Quick questions to get started:</p>
                  <div className="flex flex-wrap gap-3">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs border-2 border-transparent bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 p-[2px] text-white hover:text-[#ff7033] transition-all duration-300 hover:shadow-md hover:scale-105"
                        onClick={() => {
                          setMessage(action);
                          inputRef.current?.focus();
                        }}
                        style={{
                          background: 'linear-gradient(to bottom right, #ff7033, #f97316, #9333ea)',
                          padding: '2px'
                        }}
                      >
                        <span className="bg-[#020a1c] hover:bg-[#020a1c] px-3 py-1 rounded text-xs w-full h-full flex items-center justify-center">
                          {action}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-white/90 to-white/70">
                <div className="flex gap-4">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message to Sai..."
                    className="flex-1 border-2 border-gray-200 focus:border-[#ff7033] focus:ring-[#ff7033] rounded-2xl px-4 py-3 text-white placeholder:text-gray-400"
                    disabled={isTyping}
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    className="bg-gradient-to-r from-[#ff7033] to-orange-500 hover:from-orange-500 hover:to-[#ff7033] w-12 h-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    disabled={!message.trim() || isTyping}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
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