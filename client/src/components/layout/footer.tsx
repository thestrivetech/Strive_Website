import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="text-2xl font-bold text-primary mb-4" data-testid="footer-logo">
              Strive
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering businesses with innovative technology solutions that drive efficiency, productivity, and sustainable growth.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/portfolio" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-portfolio"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link 
                  href="/solutions" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-solutions"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link 
                  href="/resources" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-resources"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-link-contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground" data-testid="text-address">
                123 Business District
              </li>
              <li className="text-muted-foreground" data-testid="text-address-line2">
                Tech City, TC 12345
              </li>
              <li className="text-muted-foreground" data-testid="text-phone">
                +1 (555) 123-4567
              </li>
              <li>
                <a 
                  href="mailto:hello@strive.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-email"
                >
                  hello@strive.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0" data-testid="text-copyright">
            © {currentYear} Strive. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-privacy"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-terms"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-cookies"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
