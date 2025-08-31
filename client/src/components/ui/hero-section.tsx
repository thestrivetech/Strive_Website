import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection = ({
  title,
  subtitle,
  primaryButtonText = "Get Started",
  secondaryButtonText = "Watch Demo",
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) => {
  return (
    <section className="hero-gradient pt-20 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in"
            data-testid="hero-title"
          >
            {title}
          </h1>
          <p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in"
            data-testid="hero-subtitle"
          >
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              onClick={onPrimaryClick}
              className="bg-primary text-primary-foreground px-8 py-3 text-lg hover:bg-primary/90"
              size="lg"
              data-testid="button-hero-primary"
            >
              {primaryButtonText}
            </Button>
            <Button
              onClick={onSecondaryClick}
              variant="outline"
              className="border-border text-foreground px-8 py-3 text-lg hover:bg-muted hover:text-muted-foreground"
              size="lg"
              data-testid="button-hero-secondary"
            >
              {secondaryButtonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
