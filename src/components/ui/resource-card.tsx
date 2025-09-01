import { Card, CardContent } from "@/components/ui/card";

interface ResourceCardProps {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  metadata?: string;
  date?: string;
  className?: string;
}

const ResourceCard = ({ 
  type, 
  title, 
  description, 
  imageUrl, 
  imageAlt, 
  metadata, 
  date, 
  className 
}: ResourceCardProps) => {
  return (
    <Card 
      className={`card-hover cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden ${className}`}
      data-testid={`card-resource-${title.toLowerCase().replace(/\s+/g, "-")}`}
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
          data-testid={`text-type-${type.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {type}
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
        {(metadata || date) && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {metadata && (
              <span data-testid={`text-metadata-${title.toLowerCase().replace(/\s+/g, "-")}`}>
                {metadata}
              </span>
            )}
            {date && (
              <span data-testid={`text-date-${title.toLowerCase().replace(/\s+/g, "-")}`}>
                {date}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
