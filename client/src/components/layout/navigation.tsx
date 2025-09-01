import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Resources", path: "/resources" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const industrySolutions = [
    { name: "Healthcare", path: "/solutions/healthcare", icon: healthcareIcon },
    { name: "Financial Services", path: "/solutions/financial", icon: financialIcon },
    { name: "Manufacturing", path: "/solutions/manufacturing", icon: manufacturingIcon },
    { name: "Retail", path: "/solutions/retail", icon: retailIcon },
    { name: "Technology", path: "/solutions/technology", icon: technologyIcon },
    { name: "Education", path: "/solutions/education", icon: educationIcon },
  ];

  const portfolioCategories = [
    { name: "AI Models", path: "/portfolio#ai-models", icon: portfolioIcon },
    { name: "Custom Software", path: "/portfolio#custom-software", icon: portfolioIcon },
    { name: "Blockchain", path: "/portfolio#blockchain", icon: portfolioIcon },
    { name: "Web Design", path: "/portfolio#web-design", icon: portfolioIcon },
    { name: "UI/UX Design", path: "/portfolio#ui-ux", icon: portfolioIcon },
    { name: "Prototypes", path: "/portfolio#prototypes", icon: portfolioIcon },
  ];

  const resourceTypes = [
    { name: "Blog Posts", path: "/resources#blog", icon: resourcesIcon },
    { name: "Whitepapers", path: "/resources#whitepapers", icon: resourcesIcon },
    { name: "Case Studies", path: "/resources#case-studies", icon: resourcesIcon },
    { name: "Webinars", path: "/resources#webinars", icon: resourcesIcon },
    { name: "Guides", path: "/resources#guides", icon: resourcesIcon },
    { name: "Tools", path: "/resources#tools", icon: resourcesIcon },
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
        <div className="flex justify-between items-center h-16" style={{ overflow: 'visible' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src={logoImage} 
              alt="Strive" 
              className="h-14 w-auto"
              data-testid="logo"
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
              
              {/* Hover Dropdown Content - 2 Columns */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-background border border-border rounded-md shadow-lg transition-all duration-200 z-[200] ${
                solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="p-6 grid grid-cols-2 gap-4">
                  {industrySolutions.map((industry) => (
                    <Link 
                      key={industry.path}
                      href={industry.path} 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg group"
                      data-testid={`dropdown-${industry.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="flex-shrink-0">
                        <img 
                          src={industry.icon} 
                          alt={`${industry.name} icon`}
                          className="w-8 h-8 rounded-md shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="font-medium text-left leading-tight">{industry.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio with Hover Dropdown */}
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
                data-testid="nav-portfolio"
              >
                Portfolio
              </Link>
              
              {/* Hover Dropdown Content - 2 Columns */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-background border border-border rounded-md shadow-lg transition-all duration-200 z-[200] ${
                portfolioOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="p-6 grid grid-cols-2 gap-4">
                  {portfolioCategories.map((category) => (
                    <Link 
                      key={category.path}
                      href={category.path} 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg group"
                      data-testid={`portfolio-dropdown-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="flex-shrink-0">
                        <img 
                          src={category.icon} 
                          alt={`${category.name} icon`}
                          className="w-8 h-8 rounded-md shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="font-medium text-left leading-tight">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources with Hover Dropdown */}
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
                data-testid="nav-resources"
              >
                Resources
              </Link>
              
              {/* Hover Dropdown Content - 2 Columns */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-background border border-border rounded-md shadow-lg transition-all duration-200 z-[200] ${
                resourcesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="p-6 grid grid-cols-2 gap-4">
                  {resourceTypes.map((resource) => (
                    <Link 
                      key={resource.path}
                      href={resource.path} 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg group"
                      data-testid={`resources-dropdown-${resource.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="flex-shrink-0">
                        <img 
                          src={resource.icon} 
                          alt={`${resource.name} icon`}
                          className="w-8 h-8 rounded-md shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="font-medium text-left leading-tight">{resource.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Remaining Nav Items */}
            <Link
              href="/about"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/about") ? "active" : ""
              }`}
              data-testid="nav-about-us"
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

          {/* CTA and Login Buttons */}
          <div className="hidden md:flex items-center space-x-3">
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
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
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
              <SheetContent side="right" className="w-[300px] bg-background">
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
                      {industrySolutions.map((industry) => (
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
                      {portfolioCategories.map((category) => (
                        <Link
                          key={category.path}
                          href={category.path}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors p-1"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-portfolio-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {category.name}
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
                      {resourceTypes.map((resource) => (
                        <Link
                          key={resource.path}
                          href={resource.path}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors p-1"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-resources-${resource.name.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {resource.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Remaining Nav Items */}
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
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
