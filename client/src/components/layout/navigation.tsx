import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, User, LogOut, Home, DollarSign, BookOpen, Building, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import LazyImage from "@/components/ui/lazy-image";
import logoImage from "@assets/STRIVE_Orange_Text_Transparent_1483 x 320px.webp";

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

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (location === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // If not on same page, let the Link component handle navigation normally
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Our Company", path: "/about" },
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
    <nav className="fixed top-0 left-0 right-0 z-50 hero-gradient border-b border-white/20 shadow-lg overflow-visible">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-visible">
        
        {/* Mobile Layout */}
        <div className="md:hidden flex items-center h-16">
          {/* Left: Mobile Menu */}
          <div className="flex items-center flex-1">
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
                    onClick={(e) => { handleNavClick(e, "/"); setMobileMenuOpen(false); }}
                    data-testid="mobile-nav-home"
                  >
                    <Home className="w-5 h-5 mr-3 text-[#ff7033]" />
                    Home
                  </Link>

                  {/* Pricing - Simple Link */}
                  <Link
                    href="/pricing"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 font-medium ${
                      isActive("/pricing") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={(e) => { handleNavClick(e, "/pricing"); setMobileMenuOpen(false); }}
                    data-testid="mobile-nav-pricing"
                  >
                    <DollarSign className="w-5 h-5 mr-3 text-[#ff7033]" />
                    Pricing
                  </Link>

                  {/* Resources - Simple Link */}
                  <Link
                    href="/resources"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 font-medium ${
                      isActive("/resources") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={(e) => { handleNavClick(e, "/resources"); setMobileMenuOpen(false); }}
                    data-testid="mobile-nav-resources"
                  >
                    <BookOpen className="w-5 h-5 mr-3 text-[#ff7033]" />
                    Resources
                  </Link>

                  <Link
                    href="/about"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 ${
                      isActive("/about") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={(e) => { handleNavClick(e, "/about"); setMobileMenuOpen(false); }}
                    data-testid="mobile-nav-about-us"
                  >
                    <Building className="w-5 h-5 mr-3 text-[#ff7033]" />
                    Our Company
                  </Link>
                  <Link
                    href="/contact"
                    className={`flex items-center text-white hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-white/10 ${
                      isActive("/contact") ? "text-primary bg-white/10 font-medium" : ""
                    }`}
                    onClick={(e) => { handleNavClick(e, "/contact"); setMobileMenuOpen(false); }}
                    data-testid="mobile-nav-contact"
                  >
                    <Mail className="w-5 h-5 mr-3 text-[#ff7033]" />
                    Contact
                  </Link>
                  <div className="space-y-3 mt-8 pt-6 border-t border-white/20">
                    {isAuthenticated ? (
                      <>
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
                        <Link href="/contact">
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
          <Link href="/" className="flex items-center flex-1 justify-center" onClick={handleLogoClick}>
            <LazyImage
              src={logoImage}
              alt="Strive"
              className="h-10 w-auto max-w-[200px]"
              loading="eager"
            />
          </Link>

          {/* Right: Login/User Icon */}
          <div className="flex items-center flex-1 justify-end">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary"
                data-testid="mobile-button-user-icon"
              >
                <User className="h-6 w-6" />
              </Button>
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
        <div className="hidden md:flex justify-between items-center h-16 overflow-visible">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={handleLogoClick}>
            <LazyImage
              src={logoImage}
              alt="Strive"
              className="h-10 w-auto max-w-[180px]"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 overflow-visible">
            {/* Home */}
            <Link
              href="/"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/") ? "active" : ""
              }`}
              onClick={(e) => handleNavClick(e, "/")}
              data-testid="nav-home"
            >
              Home
            </Link>
            
            {/* Pricing - Simple Link */}
            <Link
              href="/pricing"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/pricing") ? "active" : ""
              }`}
              onClick={(e) => handleNavClick(e, "/pricing")}
              data-testid="nav-pricing"
            >
              Pricing
            </Link>

            {/* Resources - Simple Link */}
            <Link
              href="/resources"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/resources") ? "active" : ""
              }`}
              onClick={(e) => handleNavClick(e, "/resources")}
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
              onClick={(e) => handleNavClick(e, "/about")}
              data-testid="nav-about"
            >
              Our Company
            </Link>
            <Link
              href="/contact"
              className={`nav-link text-foreground hover:text-primary transition-colors ${
                isActive("/contact") ? "active" : ""
              }`}
              onClick={(e) => handleNavClick(e, "/contact")}
              data-testid="nav-contact"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
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
                <Link href="/contact">
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