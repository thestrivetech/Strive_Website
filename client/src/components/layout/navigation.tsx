import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, User, LogOut, Stethoscope, CreditCard, Factory, ShoppingCart, Cpu, GraduationCap, Brain, Code, Link2, Monitor, Palette, Wrench, BookOpen, FileText, BarChart3, Video, Map, Settings, Building2, Truck, Zap, Cloud, Shield, Database, Cog, BarChart, Users, Calculator, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import LazyImage from "@/components/ui/lazy-image";
import logoImage from "@assets/logo&text.png";
import healthcareIcon from "@assets/generated_images/Healthcare_industry_icon_f2723fd3.png";
import financialIcon from "@assets/generated_images/Financial_services_icon_6bb00680.png";
import manufacturingIcon from "@assets/generated_images/Manufacturing_industry_icon_f22de001.png";
import retailIcon from "@assets/generated_images/Retail_industry_icon_5c33f611.png";
import technologyIcon from "@assets/generated_images/Technology_industry_icon_e199aae4.png";
import educationIcon from "@assets/generated_images/Education_industry_icon_b1549875.png";
import resourcesIcon from "@assets/generated_images/Business_resources_gradient_icons_b8398c2d.png";
import portfolioIcon from "@assets/generated_images/Portfolio_categories_gradient_icons_d4012d22.png";

const Navigation = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Resources", path: "/resources" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const byIndustry = [
    { name: "Healthcare", path: "/solutions/healthcare", icon: <Stethoscope className="h-5 w-5 text-primary" /> },
    { name: "Financial Services", path: "/solutions/financial", icon: <CreditCard className="h-5 w-5 text-primary" /> },
    { name: "Manufacturing", path: "/solutions/manufacturing", icon: <Factory className="h-5 w-5 text-primary" /> },
    { name: "Retail", path: "/solutions/retail", icon: <ShoppingCart className="h-5 w-5 text-primary" /> },
    { name: "Technology", path: "/solutions/technology", icon: <Cpu className="h-5 w-5 text-primary" /> },
    { name: "Education", path: "/solutions/education", icon: <GraduationCap className="h-5 w-5 text-primary" /> },
  ];

  const byProductService = [
    { name: "AI & Automation", path: "/solutions/ai-automation", icon: <Brain className="h-5 w-5 text-primary" /> },
    { name: "Data Analytics", path: "/solutions/data-analytics", icon: <BarChart className="h-5 w-5 text-primary" /> },
    { name: "Cloud Infrastructure", path: "/solutions/cloud", icon: <Cloud className="h-5 w-5 text-primary" /> },
    { name: "Security & Compliance", path: "/solutions/security", icon: <Shield className="h-5 w-5 text-primary" /> },
    { name: "Process Optimization", path: "/solutions/process", icon: <Cog className="h-5 w-5 text-primary" /> },
    { name: "Business Intelligence", path: "/solutions/business-intelligence", icon: <Target className="h-5 w-5 text-primary" /> },
  ];

  const portfolioDemos = [
    { name: "AI Chat Assistant", path: "/portfolio#ai-chat-demo", icon: <Brain className="h-5 w-5 text-primary" /> },
    { name: "E-commerce Platform", path: "/portfolio#ecommerce-demo", icon: <ShoppingCart className="h-5 w-5 text-primary" /> },
    { name: "Data Visualization", path: "/portfolio#data-viz-demo", icon: <BarChart3 className="h-5 w-5 text-primary" /> },
    { name: "Real-time Analytics", path: "/portfolio#analytics-demo", icon: <BarChart className="h-5 w-5 text-primary" /> },
  ];

  const portfolioPrototypes = [
    { name: "Smart Business Suite", path: "/portfolio#smart-business-prototype", icon: <Building2 className="h-5 w-5 text-primary" /> },
    { name: "AI Vision System", path: "/portfolio#ai-vision-prototype", icon: <Monitor className="h-5 w-5 text-primary" /> },
    { name: "Logistics Optimizer", path: "/portfolio#logistics-prototype", icon: <Truck className="h-5 w-5 text-primary" /> },
    { name: "Energy Management", path: "/portfolio#energy-prototype", icon: <Zap className="h-5 w-5 text-primary" /> },
  ];

  const portfolioTemplates = [
    { name: "CRM Template", path: "/portfolio#crm-template", icon: <Users className="h-5 w-5 text-primary" /> },
    { name: "Dashboard Template", path: "/portfolio#dashboard-template", icon: <BarChart className="h-5 w-5 text-primary" /> },
    { name: "E-learning Template", path: "/portfolio#elearning-template", icon: <BookOpen className="h-5 w-5 text-primary" /> },
    { name: "Finance Template", path: "/portfolio#finance-template", icon: <Calculator className="h-5 w-5 text-primary" /> },
  ];

  const resourcesCategories = [
    { name: "Case Studies", path: "/resources#case-studies", icon: <FileText className="h-5 w-5 text-primary" /> },
    { name: "Whitepapers", path: "/resources#whitepapers", icon: <BookOpen className="h-5 w-5 text-primary" /> },
    { name: "Webinars", path: "/resources#webinars", icon: <Video className="h-5 w-5 text-primary" /> },
    { name: "Industry Reports", path: "/resources#reports", icon: <BarChart3 className="h-5 w-5 text-primary" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the hero section (roughly viewport height)
      const scrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight * 0.9; // 90vh as per hero section
      setIsScrolled(scrollY > heroSectionHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
      isScrolled 
        ? 'hero-gradient border-white/20' 
        : 'bg-background/95 backdrop-blur-md border-border'
    }`} style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ overflow: 'visible' }}>
        
        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Left: Mobile Menu */}
          <div className="flex items-center">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-background">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Home */}
                  <Link
                    href="/"
                    className={`text-foreground hover:text-primary transition-colors p-2 ${
                      isActive("/") ? "text-primary font-medium" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-home"
                  >
                    Home
                  </Link>
                  
                  {/* Solutions Group */}
                  <div className="space-y-2">
                    <Link
                      href="/solutions"
                      className={`text-foreground hover:text-primary transition-colors p-2 font-medium ${
                        isActive("/solutions") ? "text-primary font-medium" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="mobile-nav-solutions"
                    >
                      Solutions
                    </Link>
                    <div className="pl-4 space-y-1">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        By Industry
                      </div>
                      {byIndustry.map((industry) => (
                        <Link
                          key={industry.path}
                          href={industry.path}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors p-1"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-dropdown-${industry.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {industry.name}
                        </Link>
                      ))}
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-3 mb-2">
                        By Product & Service
                      </div>
                      {byProductService.map((service) => (
                        <Link
                          key={service.path}
                          href={service.path}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors p-1"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-dropdown-${service.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Portfolio Group */}
                  <div className="space-y-2">
                    <Link
                      href="/portfolio"
                      className={`text-foreground hover:text-primary transition-colors p-2 font-medium ${
                        isActive("/portfolio") ? "text-primary font-medium" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="mobile-nav-portfolio"
                    >
                      Portfolio
                    </Link>
                    <div className="pl-4 space-y-1">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Demo's
                      </div>
                      {portfolioDemos.map((demo) => (
                        <Link
                          key={demo.path}
                          href={demo.path}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors p-1"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-dropdown-${demo.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {demo.name}
                        </Link>
                      ))}
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-3 mb-2">
                        Prototypes
                      </div>
                      {portfolioPrototypes.map((prototype) => (
                        <Link
                          key={prototype.path}
                          href={prototype.path}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors p-1"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-dropdown-${prototype.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {prototype.name}
                        </Link>
                      ))}
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-3 mb-2">
                        Templates
                      </div>
                      {portfolioTemplates.map((template) => (
                        <Link
                          key={template.path}
                          href={template.path}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors p-1"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-dropdown-${template.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {template.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Resources Group */}
                  <div className="space-y-2">
                    <Link
                      href="/resources"
                      className={`text-foreground hover:text-primary transition-colors p-2 font-medium ${
                        isActive("/resources") ? "text-primary font-medium" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="mobile-nav-resources"
                    >
                      Resources
                    </Link>
                    <div className="pl-4 space-y-1">
                      {resourcesCategories.map((category) => (
                        <Link
                          key={category.path}
                          href={category.path}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors p-1"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-dropdown-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    href="/about"
                    className={`text-foreground hover:text-primary transition-colors p-2 ${
                      isActive("/about") ? "text-primary font-medium" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-about-us"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className={`text-foreground hover:text-primary transition-colors p-2 ${
                      isActive("/contact") ? "text-primary font-medium" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-contact"
                  >
                    Contact
                  </Link>
                  <div className="space-y-3 mt-4">
                    {isAuthenticated ? (
                      <>
                        <Link href="/dashboard">
                          <Button 
                            variant="ghost"
                            className="w-full text-foreground hover:text-primary"
                            data-testid="mobile-button-dashboard"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button 
                          variant="outline"
                          className="w-full text-foreground hover:text-primary"
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          data-testid="mobile-button-logout"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button 
                            variant="ghost"
                            className="w-full text-foreground hover:text-primary"
                            data-testid="mobile-button-login"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Login
                          </Button>
                        </Link>
                        <Link href="/get-started">
                          <Button 
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            data-testid="mobile-button-get-started"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Get Started
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Center: Logo */}
          <Link href="/" className="flex items-center absolute left-1/2 transform -translate-x-1/2">
            <LazyImage 
              src={logoImage} 
              alt="Strive" 
              className="h-14 w-auto max-w-[200px]"
              loading="eager"
            />
          </Link>
          
          {/* Right: Login/User Icon */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary"
                  data-testid="mobile-button-user-icon"
                >
                  <User className="h-6 w-6" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary text-sm px-3"
                  data-testid="mobile-button-login-nav"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center h-16" style={{ overflow: 'visible' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <LazyImage 
              src={logoImage} 
              alt="Strive" 
              className="h-16 w-auto"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" style={{ overflow: 'visible' }}>
            {/* Home */}
            <Link
              href="/"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/") ? "active" : ""
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            
            {/* Solutions Dropdown with Hover */}
            <div 
              className="relative group"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <Link
                href="/solutions" 
                className={`nav-link text-foreground hover:text-primary transition-colors ${
                  isActive("/solutions") ? "active" : ""
                }`}
                data-testid="nav-solutions-dropdown"
              >
                Solutions
              </Link>
              
              {/* Hover Dropdown Content - Horizontal Motive Style */}
              <div className={`absolute top-full left-0 mt-2 w-[700px] bg-background border border-border rounded-lg shadow-lg transition-all duration-200 z-[200] ${
                solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-8">
                    {/* By Industry Section */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 pl-2">
                        BY INDUSTRY
                      </h3>
                      <div className="space-y-2">
                        {byIndustry.map((industry) => (
                          <Link 
                            key={industry.path}
                            href={industry.path} 
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg group"
                            data-testid={`dropdown-${industry.name.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-all group-hover:scale-105">
                              {industry.icon}
                            </div>
                            <span className="font-medium text-left leading-tight">{industry.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* By Product & Service Section */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 pl-2">
                        BY PRODUCT & SERVICE
                      </h3>
                      <div className="space-y-2">
                        {byProductService.map((service) => (
                          <Link 
                            key={service.path}
                            href={service.path} 
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg group"
                            data-testid={`dropdown-${service.name.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-all group-hover:scale-105">
                              {service.icon}
                            </div>
                            <span className="font-medium text-left leading-tight">{service.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Dropdown with Hover */}
            <div 
              className="relative group"
              onMouseEnter={() => setPortfolioOpen(true)}
              onMouseLeave={() => setPortfolioOpen(false)}
            >
              <Link
                href="/portfolio" 
                className={`nav-link text-foreground hover:text-primary transition-colors ${
                  isActive("/portfolio") ? "active" : ""
                }`}
                data-testid="nav-portfolio-dropdown"
              >
                Portfolio
              </Link>
              
              {/* Hover Dropdown Content - Horizontal Three Column Style */}
              <div className={`absolute top-full left-0 mt-2 w-[900px] bg-background border border-border rounded-lg shadow-lg transition-all duration-200 z-[200] ${
                portfolioOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Demo's Section */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 pl-2">
                        DEMO'S
                      </h3>
                      <div className="space-y-2">
                        {portfolioDemos.map((demo) => (
                          <Link 
                            key={demo.path}
                            href={demo.path} 
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg group"
                            data-testid={`dropdown-${demo.name.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-all group-hover:scale-105">
                              {demo.icon}
                            </div>
                            <span className="font-medium text-left leading-tight">{demo.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Prototypes Section */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 pl-2">
                        PROTOTYPES
                      </h3>
                      <div className="space-y-2">
                        {portfolioPrototypes.map((prototype) => (
                          <Link 
                            key={prototype.path}
                            href={prototype.path} 
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg group"
                            data-testid={`dropdown-${prototype.name.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-all group-hover:scale-105">
                              {prototype.icon}
                            </div>
                            <span className="font-medium text-left leading-tight">{prototype.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Templates Section */}
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 pl-2">
                        TEMPLATES
                      </h3>
                      <div className="space-y-2">
                        {portfolioTemplates.map((template) => (
                          <Link 
                            key={template.path}
                            href={template.path} 
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg group"
                            data-testid={`dropdown-${template.name.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-all group-hover:scale-105">
                              {template.icon}
                            </div>
                            <span className="font-medium text-left leading-tight">{template.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Dropdown with Hover */}
            <div 
              className="relative group"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <Link
                href="/resources" 
                className={`nav-link text-foreground hover:text-primary transition-colors ${
                  isActive("/resources") ? "active" : ""
                }`}
                data-testid="nav-resources-dropdown"
              >
                Resources
              </Link>
              
              {/* Hover Dropdown Content - Simple Single Column */}
              <div className={`absolute top-full left-0 mt-2 w-[280px] bg-background border border-border rounded-lg shadow-lg transition-all duration-200 z-[200] ${
                resourcesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="p-4">
                  <div className="space-y-2">
                    {resourcesCategories.map((category) => (
                      <Link 
                        key={category.path}
                        href={category.path} 
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg group"
                        data-testid={`dropdown-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-all group-hover:scale-105">
                          {category.icon}
                        </div>
                        <span className="font-medium text-left leading-tight">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Navigation Items */}
            <Link
              href="/about"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/about") ? "active" : ""
              }`}
              data-testid="nav-about"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/contact") ? "active" : ""
              }`}
              data-testid="nav-contact"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button 
                    variant="ghost"
                    className="text-foreground hover:text-primary hover:bg-transparent"
                    data-testid="button-dashboard"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {user?.username || 'Dashboard'}
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  className="text-foreground hover:text-primary"
                  data-testid="button-logout"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    variant="ghost"
                    className="text-foreground hover:text-primary hover:bg-transparent"
                    data-testid="button-login"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-get-started"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;