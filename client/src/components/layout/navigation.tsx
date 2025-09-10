import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import LazyImage from "@/components/ui/lazy-image";
import logoImage from "@assets/STRIVE_Orange_Text_Transparent_1483 x 320px.webp";
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
  // Navbar always shows gradient - no scroll detection needed
  // Removed dropdown state - simplified navigation
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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // If not on home page, let the Link component handle navigation normally
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Resources", path: "/resources" },
    { name: "Company", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Removed dropdown arrays - navigation simplified

  // Scroll effect removed - navbar always displays gradient

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 hero-gradient border-b border-white/20 shadow-lg" style={{ overflow: 'visible' }}>
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
              <SheetContent side="left" className="w-[320px] bg-gradient-to-br from-[#020a1c] to-[#0f172a] border-r border-primary/20">
                <div className="flex flex-col space-y-1 mt-8">
                  {/* Logo in mobile menu */}
                  <div className="mb-8 text-center">
                    <Link href="/" onClick={(e) => { handleLogoClick(e); setMobileMenuOpen(false); }}>
                      <LazyImage 
                        src={logoImage} 
                        alt="Strive" 
                        className="h-12 w-auto max-w-[240px] mx-auto"
                        loading="eager"
                      />
                    </Link>
                  </div>
                  {/* Home */}
                  <Link
                    href="/"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 ${
                      isActive("/") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-home"
                  >
                    Home
                  </Link>
                  
                  {/* Solutions - Simple Link */}
                  <Link
                    href="/solutions"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 font-medium ${
                      isActive("/solutions") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-solutions"
                  >
                    Solutions
                  </Link>
                  
                  {/* Portfolio - Simple Link */}
                  <Link
                    href="/portfolio"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 font-medium ${
                      isActive("/portfolio") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-portfolio"
                  >
                    Portfolio
                  </Link>
                  
                  {/* Resources - Simple Link */}
                  <Link
                    href="/resources"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 font-medium ${
                      isActive("/resources") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-resources"
                  >
                    Resources
                  </Link>
                  
                  <Link
                    href="/about"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 ${
                      isActive("/about") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-about-us"
                  >
                    Company
                  </Link>
                  <Link
                    href="/contact"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 ${
                      isActive("/contact") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-nav-contact"
                  >
                    Contact
                  </Link>
                  <div className="space-y-3 mt-8 pt-6 border-t border-white/20">
                    {isAuthenticated ? (
                      <>
                        <Link href="/dashboard">
                          <Button 
                            variant="ghost"
                            className="w-full bg-white/10 text-white hover:bg-primary hover:text-white transition-all duration-300 rounded-xl"
                            data-testid="mobile-button-dashboard"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button 
                          variant="outline"
                          className="w-full bg-white/10 text-white hover:bg-red-500 hover:text-white transition-all duration-300 rounded-xl"
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
                            className="w-full bg-white/10 text-white hover:bg-primary hover:text-white transition-all duration-300 rounded-xl"
                            data-testid="mobile-button-login"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Login
                          </Button>
                        </Link>
                        <Link href="/request">
                          <Button 
                            className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded-xl shadow-lg"
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
          <Link href="/" className="flex items-center absolute left-1/2 transform -translate-x-1/2" onClick={handleLogoClick}>
            <LazyImage 
              src={logoImage} 
              alt="Strive" 
              className="h-10 w-auto max-w-[200px]"
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
          <Link href="/" className="flex items-center" onClick={handleLogoClick}>
            <LazyImage 
              src={logoImage} 
              alt="Strive" 
              className="h-10 w-auto"
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
            
            {/* Solutions - Simple Link */}
            <Link
              href="/solutions"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/solutions") ? "active" : ""
              }`}
              data-testid="nav-solutions"
            >
              Solutions
            </Link>

            {/* Portfolio - Simple Link */}
            <Link
              href="/portfolio"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/portfolio") ? "active" : ""
              }`}
              data-testid="nav-portfolio"
            >
              Portfolio
            </Link>

            {/* Resources - Simple Link */}
            <Link
              href="/resources"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/resources") ? "active" : ""
              }`}
              data-testid="nav-resources"
            >
              Resources
            </Link>

            {/* Other Navigation Items */}
            <Link
              href="/about"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/about") ? "active" : ""
              }`}
              data-testid="nav-about"
            >
              Company
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
                <Link href="/request">
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