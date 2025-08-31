import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

const SolutionCard = ({ icon, title, description, href, className }: SolutionCardProps) => {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    }
  };

  return (
    <Card 
      className={`card-hover cursor-pointer transition-all duration-300 hover:shadow-lg ${className}`}
      onClick={handleClick}
      data-testid={`card-solution-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <CardContent className="p-8">
        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4" data-testid={`text-title-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          {title}
        </h3>
        <p className="text-muted-foreground mb-6" data-testid={`text-description-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          {description}
        </p>
        <div className="flex items-center text-primary font-semibold hover:underline">
          <span data-testid={`link-learn-more-${title.toLowerCase().replace(/\s+/g, "-")}`}>
            Learn more
          </span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
