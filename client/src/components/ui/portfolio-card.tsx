import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PortfolioCardProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  duration: string;
  href?: string;
  className?: string;
}

const PortfolioCard = ({ 
  category, 
  title, 
  description, 
  imageUrl, 
  imageAlt, 
  duration, 
  href,
  className 
}: PortfolioCardProps) => {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    }
  };

  return (
    <Card 
      className={`card-hover cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden ${className}`}
      onClick={handleClick}
      data-testid={`card-portfolio-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="w-full h-full object-cover"
          data-testid={`img-${title.toLowerCase().replace(/\s+/g, "-")}`}
        />
      </div>
      <CardContent className="p-6">
        <div 
          className="text-sm text-primary uppercase tracking-wide font-semibold mb-2"
          data-testid={`text-category-${category.toLowerCase()}`}
        >
          {category}
        </div>
        <h3 
          className="text-xl font-bold mb-3"
          data-testid={`text-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {title}
        </h3>
        <p 
          className="text-muted-foreground mb-4"
          data-testid={`text-description-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-primary font-semibold hover:underline">
            <span data-testid={`link-case-study-${title.toLowerCase().replace(/\s+/g, "-")}`}>
              View Case Study
            </span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
          <div 
            className="text-sm text-muted-foreground"
            data-testid={`text-duration-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {duration}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
