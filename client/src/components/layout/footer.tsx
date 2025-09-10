import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import LazyImage from "@/components/ui/lazy-image";
import logoImage from "@assets/STRIVE_Orange_Text_Transparent_1483 x 320px.webp";

// Discord Icon Component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hero-gradient text-white border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-4" data-testid="footer-logo">
              <LazyImage 
                src={logoImage} 
                alt="Strive" 
                className="h-14 w-auto max-w-[280px]"
                loading="eager"
              />
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              To empower businesses with innovative technology solutions that drive efficiency, productivity, and sustainable growth.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://discord.gg/q3djnrvP29" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                data-testid="link-discord"
              >
                <DiscordIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-white/70 hover:text-white transition-colors"
                  data-testid="footer-link-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/portfolio" 
                  className="text-white/70 hover:text-white transition-colors"
                  data-testid="footer-link-portfolio"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link 
                  href="/solutions" 
                  className="text-white/70 hover:text-white transition-colors"
                  data-testid="footer-link-solutions"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link 
                  href="/resources" 
                  className="text-white/70 hover:text-white transition-colors"
                  data-testid="footer-link-resources"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-white/70 hover:text-white transition-colors"
                  data-testid="footer-link-about"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-white/70 hover:text-white transition-colors"
                  data-testid="footer-link-contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-white/70" data-testid="text-address">
                Nashville, TN
              </li>
              <li className="text-white/70" data-testid="text-phone">
                (731)-431-2320
              </li>
              <li>
                <a 
                  href="mailto:contact@strivetech.ai" 
                  className="text-white/70 hover:text-white transition-colors"
                  data-testid="link-email"
                >
                  contact@strivetech.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-white/60 mb-4 md:mb-0" data-testid="text-copyright">
            © {currentYear} STRIVE. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link 
              href="/privacy" 
              className="text-white/70 hover:text-white transition-colors"
              data-testid="link-privacy"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-white/70 hover:text-white transition-colors"
              data-testid="link-terms"
            >
              Terms of Service
            </Link>
            <Link 
              href="/cookies" 
              className="text-white/70 hover:text-white transition-colors"
              data-testid="link-cookies"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
