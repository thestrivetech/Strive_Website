import { useState, useEffect } from "react";
import { Download, FileText, BookOpen, BarChart3, Sparkles, Eye, X, ExternalLink, Clock, User, Calendar, BrainCircuit, Play, CheckCircle, AlertCircle, Trophy, Target, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Import data from new modular structure
import { Resource, technologyCards, resources } from "@/data/resources";
import { Quiz, QuizQuestion, QuizResult, allQuizzes } from "@/data/resources/quizzes";
import { featuredResource } from "@/data/resources/featured";

// Types are now imported from the modular structure

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
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
        window.history.replaceState(null, '', '/resources');
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert("Newsletter signup functionality would be implemented here");
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
              Business <span className="gradient-text">Intelligence</span> Hub
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8"
              data-testid="text-hero-subtitle"
            >
              Unlock your potential with expert insights, cutting-edge research, and proven strategies from industry leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                onClick={() => document.getElementById('resource-library')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-explore-resources"
              >
                Explore Resources
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-get-insights"
              >
                Get Expert Insights
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
              Explore Our <span className="gradient-text">Resource Library</span>
            </h2>
            <p className="text-slate-600 text-lg" data-testid="text-library-subtitle">
              Filter and discover the perfect resources for your business journey.
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
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.name}
                variant={activeFilter === filter.name ? "default" : "outline"}
                className={`rounded-full flex items-center ${
                  activeFilter === filter.name 
                    ? "bg-orange-500 text-white hover:bg-orange-600" 
                    : "bg-off-white text-slate-600 hover:bg-orange-500 hover:text-white border-slate-200"
                }`}
                onClick={() => setActiveFilter(filter.name)}
                data-testid={`filter-${filter.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {filter.icon}
                {filter.name}
              </Button>
            ))}
          </div>

          {/* AI Knowledge Quizzes Section */}
          {activeFilter === "Quizzes" && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4 text-slate-800">
                  AI Knowledge <span className="gradient-text">Quizzes</span>
                </h3>
                <p className="text-slate-600 text-lg">
                  Test your AI expertise across different domains and difficulty levels.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredQuizzes.map((quiz) => (
                  <Card 
                    key={quiz.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-blue-900 to-purple-900"
                    onClick={() => startQuiz(quiz)}
                    data-testid={`card-quiz-${quiz.id}`}
                  >
                    <div className="relative overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <BrainCircuit className="w-16 h-16 mx-auto mb-4 opacity-80" />
                          <div className="text-sm font-medium uppercase tracking-wide">
                            {quiz.topic}
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className={`${
                          quiz.difficulty === 'beginner' ? 'bg-green-500' :
                          quiz.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                        } text-white border-0 capitalize`}>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                          <Play className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 text-white">
                      <h4 className="text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors">
                        {quiz.title}
                      </h4>
                      <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                        {quiz.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                        <div className="flex items-center gap-4">
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
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          startQuiz(quiz);
                        }}
                        data-testid={`button-start-quiz-${quiz.id}`}
                      >
                        <Play className="h-4 w-4 mr-2" />
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
                  Technology <span className="gradient-text">Stack</span>
                </h3>
                <p className="text-slate-600 text-lg">
                  Explore the cutting-edge technologies powering our solutions and learn how to implement them.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTechCards.map((tech) => (
                  <Card 
                    key={tech.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-slate-900 to-slate-800"
                    onClick={() => setSelectedResource(tech)}
                    data-testid={`card-tech-${tech.id}`}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={tech.imageUrl} 
                        alt={tech.imageAlt}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        data-testid={`img-tech-${tech.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-500 text-white border-0">
                          {tech.type}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Navigate to portfolio with this tech filter
                              window.location.href = '/portfolio';
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="text-blue-400">
                          <Wrench className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium uppercase tracking-wide text-blue-400">
                          {tech.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                        {tech.title}
                      </h3>
                      
                      <p className="text-slate-300 mb-4 line-clamp-2">
                        {tech.shortDescription}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tech.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                            {tag}
                          </Badge>
                        ))}
                        {tech.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                            +{tech.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span data-testid={`text-tech-metadata-${tech.id}`}>
                          {tech.metadata}
                        </span>
                        <span data-testid={`text-tech-date-${tech.id}`}>
                          {tech.date}
                        </span>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                        variant="outline"
                      >
                        Learn More
                        <Eye className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Resource Grid */}
          {activeFilter !== "Quizzes" && activeFilter !== "Tools & Tech" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
              <Card 
                key={resource.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                onClick={() => setSelectedResource(resource)}
                data-testid={`card-resource-${resource.id}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={resource.imageUrl} 
                    alt={resource.imageAlt}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    data-testid={`img-resource-${resource.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getTypeColor(resource.type)} text-white border-0`}>
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-primary">
                      {getTypeIcon(resource.type)}
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wide text-[#020a1c]">
                      {resource.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#ff7033] mb-3 group-hover:text-primary transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {resource.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resource.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span data-testid={`text-resource-metadata-${resource.id}`}>
                      {resource.metadata}
                    </span>
                    <span data-testid={`text-resource-date-${resource.id}`}>
                      {resource.date}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    View Details
                    <Eye className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
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
              Stay Ahead of the <span className="gradient-text">Curve</span>
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
                  placeholder="Enter your email address"
                  className="flex-1 bg-off-white border-slate-200 text-slate-800 px-4 py-3 rounded-lg"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit"
                  className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 rounded-lg"
                  data-testid="button-newsletter-subscribe"
                >
                  Get Started
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
                <Button
                  onClick={() => setSelectedResource(null)}
                  className="absolute top-4 right-4 h-10 w-10 p-0 bg-gray-800/80 hover:bg-gray-700/90 border-2 border-orange-500/50 hover:border-orange-500 rounded-lg transition-all duration-200"
                  variant="ghost"
                >
                  <X className="h-5 w-5 text-white" />
                </Button>
              </div>
              
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
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resource
                  </Button>
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
                    Get Consulting
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Quiz Modal */}
      <Dialog open={isQuizModalOpen} onOpenChange={closeQuizModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
                    <h3 className="text-xl font-semibold text-slate-800">
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
                  <div className="space-y-3 max-h-64 overflow-y-auto">
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
                    Get AI Consulting
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