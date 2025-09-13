import { useState, useEffect } from "react";
import { Download, FileText, BookOpen, BarChart3, Sparkles, Eye, X, ExternalLink, Clock, User, Calendar, BrainCircuit, Play, CheckCircle, AlertCircle, Trophy, Target, Wrench, Filter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Import data from new modular structure
import { Resource, technologyCards, resources } from "@/data/resources";
import { Quiz, QuizQuestion, QuizResult, allQuizzes } from "@/data/resources/quizzes";
import { featuredResource } from "@/data/resources/featured";
import { getSolutionById } from "@/data/solutions-mapping";

// Types are now imported from the modular structure

const Resources = () => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  
  // Quiz state
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  

  
  const filters = [
    { name: "All", icon: null },
    { name: "Blog Posts", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "Whitepapers", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Case Studies", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { name: "Tools & Tech", icon: <Wrench className="h-4 w-4 mr-2" /> },
    { name: "Quizzes", icon: <BrainCircuit className="h-4 w-4 mr-2" /> },
  ];
  
  // featuredResource is now imported from @/data/featured

  // technologyCards is now imported from @/data/resources

  // resources is now imported from @/data/resources

  // Handle navigation from Portfolio and Solutions page technology badges
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    const tech = urlParams.get('tech');
    
    // Handle filter parameter
    if (filterParam === 'tools-tech') {
      setActiveFilter('Tools & Tech');
    }
    
    if (tech) {
      // First check technology cards for portfolio navigation
      const techCard = technologyCards.find(card => 
        card.tags?.some(tag => tag.toLowerCase() === tech.toLowerCase()) ||
        card.title.toLowerCase().includes(tech.toLowerCase())
      );
      
      if (techCard && filterParam === 'tools-tech') {
        // Open the tech card modal
        setTimeout(() => {
          setSelectedResource(techCard);
        }, 500);
      } else {
        // Fallback: Find and open the corresponding resource
        const techResource = resources.find(resource => 
          resource.tags?.some(tag => tag.toLowerCase() === tech.toLowerCase()) ||
          resource.title.toLowerCase().includes(tech.toLowerCase())
        );
        
        if (techResource) {
          // Set appropriate filter based on resource type
          if (techResource.type === "WHITEPAPER") {
            setActiveFilter("Whitepapers");
          } else if (techResource.type === "CASE STUDY") {
            setActiveFilter("Case Studies");
          }
          
          // Open the resource modal
          setTimeout(() => {
            setSelectedResource(techResource);
          }, 500);
        }
      }
      
      // Clean the URL
      setTimeout(() => {
        window.history.replaceState({}, document.title, '/resources');
      }, 1000);
    }
  }, [technologyCards]);

  // quizzes is now imported from @/data/quizzes as allQuizzes

  const filteredResources = activeFilter === "All" 
    ? resources 
    : resources.filter(resource => {
        if (activeFilter === "Blog Posts") return resource.type === "BLOG POST";
        if (activeFilter === "Whitepapers") return resource.type === "WHITEPAPER";
        if (activeFilter === "Case Studies") return resource.type === "CASE STUDY";
        return true;
      });

  const filteredTechCards = activeFilter === "Tools & Tech" ? technologyCards : [];

  const filteredQuizzes = activeFilter === "Quizzes" ? allQuizzes : [];

  // Quiz functionality
  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizStartTime(Date.now());
    setQuizResult(null);
    setShowQuizResult(false);
    setIsQuizModalOpen(true);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!selectedQuiz) return;
    
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === selectedQuiz.questions[index].correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    const timeSpent = Math.round((Date.now() - quizStartTime) / 1000 / 60); // minutes
    const passed = score >= selectedQuiz.passingScore;

    const result: QuizResult = {
      score,
      totalQuestions: selectedQuiz.questions.length,
      correctAnswers,
      timeSpent,
      passed
    };

    setQuizResult(result);
    setShowQuizResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    setShowQuizResult(false);
  };

  const closeQuizModal = () => {
    setIsQuizModalOpen(false);
    setSelectedQuiz(null);
    resetQuiz();
  };

  const getTypeIcon = (type: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      "BLOG POST": <BookOpen className="h-5 w-5" />,
      "WHITEPAPER": <FileText className="h-5 w-5" />,
      "CASE STUDY": <BarChart3 className="h-5 w-5" />
    };
    return iconMap[type] || <FileText className="h-5 w-5" />;
  };

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      "BLOG POST": "bg-blue-500",
      "WHITEPAPER": "bg-purple-500",
      "CASE STUDY": "bg-green-500"
    };
    return colorMap[type] || "bg-gray-500";
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsNewsletterSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Successfully subscribed!",
          description: result.message || "Welcome to our newsletter!",
        });
        setNewsletterEmail("");
      } else {
        toast({
          title: "Subscription failed",
          description: result.message || "Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section with AI-themed animated background */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-primary rounded-full animate-ping opacity-60`}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <BookOpen className="text-primary h-16 w-16 animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              data-testid="text-hero-title"
            >
              Business <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block pb-2">Intelligence</span> Hub
            </h1>
            <p 
              className="text-xl md:text-2xl text-[#94a3b8] max-w-4xl mx-auto mb-8"
              data-testid="text-hero-subtitle"
            >
              Gain exclusive strategies, actionable research, and expert insights to guide your team through every stage of digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-explore-resources"
              >
                Unlock Actionable Insights
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('resource-library')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-get-insights"
              >
                Let's Learn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Library Section - White Background */}
      <section id="resource-library" className="py-16 bg-[#ffffffeb] shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-800" data-testid="text-library-title">
              Explore Our Resource Library
            </h2>
            <p className="text-slate-600 text-lg" data-testid="text-library-subtitle">
              Find tailored playbooks, case studies, and guides, each designed to help you solve your top business challenges with AI.
            </p>
          </div>

          {/* Featured Resource */}
          <div className="bg-off-white rounded-2xl overflow-hidden mb-16 shadow-lg border border-slate-100">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative">
                  <img 
                    src={featuredResource.imageUrl} 
                    alt={featuredResource.imageAlt}
                    className="w-full h-64 md:h-full object-cover"
                    data-testid="img-featured-resource"
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
                      data-testid="text-trending-badge"
                    >
                      📈 TRENDING
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div 
                  className="text-sm text-orange-500 uppercase tracking-wide font-semibold mb-4 flex items-center"
                  data-testid="text-featured-type"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {featuredResource.type}
                </div>
                <h3 
                  className="text-2xl md:text-3xl font-bold mb-4 text-slate-800"
                  data-testid="text-featured-title"
                >
                  {featuredResource.title}
                </h3>
                <p 
                  className="text-slate-600 mb-6 leading-relaxed"
                  data-testid="text-featured-description"
                >
                  {featuredResource.description}
                </p>
                <div className="flex items-center justify-between">
                  <Button 
                    className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2"
                    data-testid="button-download-featured"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Now
                  </Button>
                  <div className="text-sm text-slate-500 flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    <span data-testid="text-download-count">
                      {featuredResource.downloads} downloads
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 md:mb-12">
            {/* Mobile Dropdown */}
            <div className="sm:hidden w-full max-w-xs">
              <Select value={activeFilter} onValueChange={(value) => {
                if (activeFilter === value) {
                  // Deselect if already selected
                  setActiveFilter("All");
                } else {
                  setActiveFilter(value);
                }
              }}>
                <SelectTrigger className="w-full bg-[#020a1c] border-orange-500 text-white focus:border-orange-400">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      {filters.find(f => f.name === activeFilter)?.icon}
                    </div>
                    <span className="flex-grow text-left">
                      {filters.find(f => f.name === activeFilter)?.name}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#020a1c] border-orange-500">
                  {filters.map((filter) => (
                    <SelectItem 
                      key={filter.name} 
                      value={filter.name}
                      className={`text-white cursor-pointer hover:bg-orange-500/20 focus:bg-orange-500/20 hover:text-[#ff7033] hover:[&_svg]:text-[#ff7033] ${
                        activeFilter === filter.name 
                          ? "bg-orange-500/20 text-[#ff7033] [&_svg]:text-[#ff7033]" 
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {filter.icon}
                        <span>{filter.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Buttons - Only All and Filter */}
            <div className="hidden sm:flex gap-2">
              <Button
                variant={activeFilter === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("All")}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  activeFilter === "All"
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'border-primary/20 text-foreground hover:border-primary hover:text-primary hover:scale-105'
                }`}
              >
                <Globe className="h-4 w-4" />
                All
              </Button>
              <Select value={activeFilter === "All" ? "" : activeFilter} onValueChange={(value) => {
                if (activeFilter === value) {
                  // Deselect if already selected
                  setActiveFilter("All");
                } else {
                  setActiveFilter(value);
                }
              }}>
                <SelectTrigger className={`w-auto min-w-[60px] px-2 py-1 text-sm transition-all duration-200 ${
                  activeFilter !== "All" && activeFilter
                    ? "bg-primary text-white shadow-lg scale-105 border-primary"
                    : "border-primary/20 text-foreground hover:border-primary hover:text-primary"
                }`}>
                  <div className="flex items-center gap-1">
                    <Filter className="h-3 w-3 flex-shrink-0" />
                    <span className="flex-grow text-left text-xs">
                      {activeFilter !== "All" && activeFilter 
                        ? filters.find(f => f.name === activeFilter)?.name || "Filter"
                        : "Filter"
                      }
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {filters.filter(f => f.name !== "All").map((filter) => (
                    <SelectItem 
                      key={filter.name} 
                      value={filter.name}
                      className={`cursor-pointer hover:text-[#ff7033] hover:[&_svg]:text-[#ff7033] ${
                        activeFilter === filter.name 
                          ? "bg-[#ff7033]/10 text-[#ff7033] [&_svg]:text-[#ff7033]" 
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {filter.icon}
                        <span>{filter.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* AI Knowledge Quizzes Section */}
          {activeFilter === "Quizzes" && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4 text-slate-800">
                  AI Knowledge <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Quizzes</span>
                </h3>
                <p className="text-slate-600 text-lg">
                  Test your AI expertise across different domains and difficulty levels.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredQuizzes.map((quiz) => (
                  <Card 
                    key={quiz.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-blue-900 to-purple-900 h-full flex flex-col"
                    onClick={() => startQuiz(quiz)}
                    data-testid={`card-quiz-${quiz.id}`}
                  >
                    <div className="relative overflow-hidden flex-shrink-0">
                      <div className="h-32 md:h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <BrainCircuit className="w-8 h-8 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 opacity-80" />
                          <div className="text-xs md:text-sm font-medium uppercase tracking-wide">
                            {quiz.topic}
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 md:top-4 md:left-4">
                        <Badge className={`${
                          quiz.difficulty === 'beginner' ? 'bg-green-500' :
                          quiz.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                        } text-white border-0 capitalize text-xs px-2 py-1`}>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-3 md:p-6 text-white flex flex-col flex-grow">
                      {/* Mobile: Centered title, Desktop: Left-aligned */}
                      <h4 className="text-base md:text-xl font-bold mb-2 md:mb-3 group-hover:text-blue-300 transition-colors line-clamp-2 text-center md:text-left">
                        {quiz.title}
                      </h4>
                      
                      {/* Description - Left aligned */}
                      <p className="text-slate-300 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed line-clamp-3 flex-grow text-left">
                        {quiz.description}
                      </p>
                      
                      {/* Quiz Metrics - Centered on mobile */}
                      <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between text-xs text-slate-400 mb-3 md:mb-4 gap-2 md:gap-4">
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {quiz.questions.length} questions
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {quiz.timeLimit} min
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {quiz.passingScore}% to pass
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 mt-auto text-sm py-2 min-h-[44px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          startQuiz(quiz);
                        }}
                        data-testid={`button-start-quiz-${quiz.id}`}
                      >
                        <Play className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Technology Cards Section */}
          {activeFilter === "Tools & Tech" && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4 text-slate-800">
                  Technology <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Stack</span>
                </h3>
                <p className="text-slate-600 text-lg">
                  Explore the cutting-edge technologies powering our solutions and learn how to implement them.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTechCards.map((tech) => (
                  <Card 
                    key={tech.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-slate-900 to-slate-800 h-full flex flex-col"
                    onClick={() => setSelectedResource(tech)}
                    data-testid={`card-tech-${tech.id}`}
                  >
                    <CardContent className="p-3 md:p-6 text-white flex flex-col h-full relative">
                      {/* Decorative gradient overlay */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-transparent rounded-full blur-3xl" />
                      
                      {/* Mobile: Centered layout, Desktop: Left-aligned layout */}
                      <div className="flex flex-col h-full">
                        {/* Icon and Title Section */}
                        <div className="flex flex-col items-center md:items-start mb-3 md:mb-3">
                          {/* Icon Section */}
                          <div className="mb-2 md:mb-2">
                            <div className="text-blue-400 transition-transform duration-300 group-hover:scale-110 text-2xl md:text-xl flex justify-center">
                              <Wrench className="h-8 w-8 md:h-5 md:w-5" />
                            </div>
                          </div>
                          
                          {/* Title Section - Centered on mobile */}
                          <h3 className="text-base md:text-xl font-bold group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 text-center md:text-left mb-1 md:mb-3">
                            {tech.title}
                          </h3>
                          
                          {/* Type - Desktop only */}
                          <span className="text-xs md:text-sm font-medium uppercase tracking-wide text-blue-400 hidden md:inline">
                            {tech.type}
                          </span>
                        </div>
                        
                        {/* Content Section - Left aligned */}
                        <div className="flex-1 flex flex-col text-left">
                          {/* Description Section */}
                          <div className="mb-3 md:mb-4">
                            <p className="text-slate-300 line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-sm">
                              {tech.shortDescription}
                            </p>
                          </div>
                          
                          {/* Tags Section */}
                          <div className="mb-4 md:mb-6">
                            <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                              {tech.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300 px-2 py-1">
                                  {tag}
                                </Badge>
                              ))}
                              {tech.tags.length > 2 && (
                                <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300 px-2 py-1">
                                  +{tech.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Action Button Section */}
                          <div className="mt-auto pt-2">
                            <Button 
                              className="w-full group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 text-sm py-2 min-h-[44px]"
                              variant="outline"
                            >
                              Learn More
                              <Eye className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Resource Grid */}
          {activeFilter !== "Quizzes" && activeFilter !== "Tools & Tech" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
              {filteredResources.map((resource) => (
              <Card 
                key={resource.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 h-full flex flex-col"
                onClick={() => setSelectedResource(resource)}
                data-testid={`card-resource-${resource.id}`}
              >
                {/* Mobile: Horizontal Layout, Desktop: Vertical Layout */}
                <div className="flex flex-row md:flex-col">
                  {/* Left Side - Photo and Metadata (Mobile) / Top (Desktop) */}
                  <div className="flex flex-col md:w-full flex-shrink-0">
                    {/* Image Container */}
                    <div className="relative overflow-hidden w-28 h-32 md:w-full md:h-32 lg:h-48">
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        data-testid={`img-resource-${resource.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-1 left-1 md:top-2 md:left-2">
                        <Badge className={`${getTypeColor(resource.type)} text-white border-0 text-xs px-1 py-0.5`}>
                          {resource.type}
                        </Badge>
                      </div>
                      <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-1">
                          <Button size="sm" variant="secondary" className="h-5 w-5 md:h-6 md:w-6 p-0">
                            <Eye className="h-2 w-2 md:h-3 md:w-3" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-5 w-5 md:h-6 md:w-6 p-0">
                            <Download className="h-2 w-2 md:h-3 md:w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile-only Metadata Section - Below image */}
                    <div className="md:hidden px-1 py-1">
                      <div className="flex flex-col gap-0.5 text-xs text-[#1e3a8a]">
                        <span className="truncate" data-testid={`text-resource-metadata-${resource.id}`}>
                          {resource.metadata}
                        </span>
                        <span className="truncate" data-testid={`text-resource-date-${resource.id}`}>
                          {resource.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Content (Mobile) / Below photo (Desktop) */}
                  <CardContent className="p-3 md:p-6 flex flex-col flex-grow min-w-0">
                    <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-3">
                      <div className="text-primary text-sm">
                        {getTypeIcon(resource.type)}
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wide text-[#020a1c] hidden sm:inline">
                        {resource.type}
                      </span>
                    </div>
                    
                    <h3 className="text-sm md:text-xl font-bold text-[#ff7033] mb-1 md:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-2 md:mb-4 line-clamp-2 text-xs md:text-sm flex-grow">
                      {resource.shortDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-2 md:mb-4">
                      {resource.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-1 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs px-1 py-0.5">
                          +{resource.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Desktop-only Metadata Section - Below content */}
                    <div className="hidden md:flex items-center justify-between text-sm text-muted-foreground mb-2 md:mb-4">
                      <span className="text-xs md:text-sm" data-testid={`text-resource-metadata-${resource.id}`}>
                        {resource.metadata}
                      </span>
                      <span className="text-xs md:text-sm" data-testid={`text-resource-date-${resource.id}`}>
                        {resource.date}
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full mt-auto group-hover:bg-primary group-hover:text-white transition-all duration-300 text-xs md:text-sm py-1 md:py-2"
                      variant="outline"
                    >
                      View Details
                      <Eye className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
            </div>
          )}

          {/* Newsletter Section */}
          <div className="bg-slate-100 rounded-2xl p-8 md:p-12 text-center mt-16">
            <div 
              className="inline-flex items-center text-sm text-orange-500 uppercase tracking-wide font-semibold mb-4"
              data-testid="text-exclusive-badge"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              EXCLUSIVE CONTENT
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-slate-800"
              data-testid="text-newsletter-title"
            >
              Stay Ahead of the <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Curve</span>
            </h2>
            <p 
              className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto"
              data-testid="text-newsletter-description"
            >
              Get premium insights, exclusive resources, and industry trends delivered directly to your inbox. Join 10,000+ business leaders.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-off-white border-slate-200 text-slate-800 px-4 py-3 rounded-lg"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-newsletter-subscribe"
                >
                  {isNewsletterSubmitting ? "Subscribing..." : "Get Started"}
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mt-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Free to join
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Weekly insights
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Unsubscribe anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Detail Modal */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            "max-h-[90vh] overflow-y-auto modal-scrollbar"
          )}>
          {selectedResource && (
            <>
              <DialogTitle className="sr-only">{selectedResource.title}</DialogTitle>
              <DialogDescription className="sr-only">
                Detailed view of {selectedResource.title} resource including full content, key insights, and actionable recommendations
              </DialogDescription>
              <div className="relative">
                <img 
                  src={selectedResource.imageUrl} 
                  alt={selectedResource.imageAlt}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <DialogPrimitive.Close className="absolute right-4 top-4 bg-gray-800/80 hover:bg-gray-700/90 border-2 border-orange-500/50 hover:border-orange-500 rounded-lg h-10 w-10 p-0 z-50 transition-all duration-200">
                <X className="h-5 w-5 text-white m-auto" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    {getTypeIcon(selectedResource.type)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedResource.title}</h2>
                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {selectedResource.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedResource.readTime || selectedResource.metadata}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {selectedResource.date}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed">{selectedResource.fullDescription}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Points</h3>
                    <ul className="space-y-2">
                      {selectedResource.content.keyPoints.map((point: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Insights</h3>
                    <ul className="space-y-2">
                      {selectedResource.content.insights.map((insight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Action Items</h3>
                    <ul className="space-y-2">
                      {selectedResource.content.actionItems.map((action: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Solutions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.relatedSolutions?.map((solutionId: string, index: number) => {
                      const solution = getSolutionById(solutionId);
                      return solution ? (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="px-3 py-1 cursor-pointer hover:bg-[#ff7033] hover:text-white transition-colors"
                          onClick={() => {
                            window.location.href = `/solutions?solution=${solutionId}`;
                          }}
                        >
                          {solution.title}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Sources</h3>
                  <div className="space-y-2">
                    {selectedResource.sources?.map((source, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <ExternalLink className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <a 
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {source.title}
                          </a>
                          {source.description && (
                            <p className="text-xs text-muted-foreground mt-1">{source.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-6 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button 
                    variant="outline"
                    className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-6 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Expert Insight
                  </Button>
                </div>
              </div>
            </>
          )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </Dialog>

      {/* Quiz Modal */}
      <Dialog open={isQuizModalOpen} onOpenChange={closeQuizModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto modal-scrollbar">
          {selectedQuiz && !showQuizResult && (
            <>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-blue-600" />
                {selectedQuiz.title}
              </DialogTitle>
              
              <div className="space-y-6">
                {/* Quiz Progress */}
                <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Badge className={`${
                      selectedQuiz.difficulty === 'beginner' ? 'bg-green-500' :
                      selectedQuiz.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white capitalize`}>
                      {selectedQuiz.difficulty}
                    </Badge>
                    <span className="text-sm text-slate-600">
                      Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    {selectedQuiz.timeLimit} min limit
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
                  />
                </div>

                {/* Current Question */}
                {selectedQuiz.questions[currentQuestionIndex] && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-blue-600">
                      {selectedQuiz.questions[currentQuestionIndex].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={userAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                          className={`w-full text-left justify-start p-4 h-auto ${
                            userAnswers[currentQuestionIndex] === index 
                              ? "bg-blue-600 text-white hover:bg-blue-700" 
                              : "bg-off-white text-slate-700 hover:bg-blue-50 border-slate-200"
                          }`}
                          onClick={() => handleQuizAnswer(index)}
                          data-testid={`button-quiz-option-${index}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              userAnswers[currentQuestionIndex] === index 
                                ? "border-off-white bg-off-white" 
                                : "border-slate-300"
                            }`}>
                              {userAnswers[currentQuestionIndex] === index && (
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </Button>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={closeQuizModal}
                        className="flex-1"
                        data-testid="button-quit-quiz"
                      >
                        Quit Quiz
                      </Button>
                      <Button
                        onClick={nextQuestion}
                        disabled={userAnswers[currentQuestionIndex] === undefined}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        data-testid="button-next-question"
                      >
                        {currentQuestionIndex === selectedQuiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Quiz Results */}
          {selectedQuiz && showQuizResult && quizResult && (
            <>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Quiz Complete!
              </DialogTitle>
              
              <div className="space-y-8">
                {/* Score Display */}
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${
                    quizResult.passed ? "text-green-500" : "text-red-500"
                  }`}>
                    {quizResult.score}%
                  </div>
                  <div className={`text-xl font-semibold ${
                    quizResult.passed ? "text-green-600" : "text-red-600"
                  }`}>
                    {quizResult.passed ? "🎉 Congratulations! You Passed!" : "📚 Keep Learning!"}
                  </div>
                  <p className="text-slate-600">
                    You answered {quizResult.correctAnswers} out of {quizResult.totalQuestions} questions correctly
                  </p>
                </div>

                {/* Performance Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {quizResult.score}%
                    </div>
                    <div className="text-sm text-slate-600">Final Score</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {quizResult.correctAnswers}/{quizResult.totalQuestions}
                    </div>
                    <div className="text-sm text-slate-600">Correct Answers</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {quizResult.timeSpent} min
                    </div>
                    <div className="text-sm text-slate-600">Time Spent</div>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Question Review</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto modal-scrollbar">
                    {selectedQuiz.questions.map((question, index) => {
                      const userAnswer = userAnswers[index];
                      const isCorrect = userAnswer === question.correctAnswer;
                      
                      return (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isCorrect ? "bg-green-100" : "bg-red-100"
                            }`}>
                              {isCorrect ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm mb-2">{question.question}</p>
                              <div className="text-xs space-y-1">
                                <div className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>
                                  Your answer: {question.options[userAnswer]}
                                </div>
                                {!isCorrect && (
                                  <div className="text-green-600">
                                    Correct answer: {question.options[question.correctAnswer]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={closeQuizModal}
                    className="flex-1"
                    data-testid="button-close-results"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      resetQuiz();
                      startQuiz(selectedQuiz);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    data-testid="button-retake-quiz"
                  >
                    Retake Quiz
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/contact'}
                    className="flex-1"
                    data-testid="button-get-consulting"
                  >
                    Get AI Insights
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;