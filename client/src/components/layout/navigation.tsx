import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoImage from "@assets/logo&text_small.png";

const Navigation = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Resources", path: "/resources" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const industrySolutions = [
    { name: "Healthcare", path: "/solutions/healthcare" },
    { name: "Financial Services", path: "/solutions/financial" },
    { name: "Manufacturing", path: "/solutions/manufacturing" },
    { name: "Retail", path: "/solutions/retail" },
    { name: "Technology", path: "/solutions/technology" },
    { name: "Education", path: "/solutions/education" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link text-foreground hover:text-primary transition-colors ${
                  isActive(item.path) ? "active" : ""
                }`}
                data-testid={`nav-${item.name.toLowerCase().replace(" ", "-")}`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Solutions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger 
                className={`nav-link text-foreground hover:text-primary transition-colors flex items-center ${
                  isActive("/solutions") ? "active" : ""
                }`}
                data-testid="nav-solutions-dropdown"
              >
                Solutions
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem asChild>
                  <Link 
                    href="/solutions" 
                    className="flex w-full cursor-pointer"
                    data-testid="dropdown-solutions-overview"
                  >
                    All Solutions
                  </Link>
                </DropdownMenuItem>
                {industrySolutions.map((industry) => (
                  <DropdownMenuItem key={industry.path} asChild>
                    <Link 
                      href={industry.path} 
                      className="flex w-full cursor-pointer"
                      data-testid={`dropdown-${industry.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {industry.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`text-foreground hover:text-primary transition-colors p-2 ${
                        isActive(item.path) ? "text-primary font-medium" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-nav-${item.name.toLowerCase().replace(" ", "-")}`}
                    >
                      {item.name}
                    </Link>
                  ))}
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
