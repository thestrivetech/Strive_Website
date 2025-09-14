import { memo } from "react";
import LazyImage from "@/components/ui/lazy-image";

interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
}

const TeamMember = memo(({ name, title, description, imageUrl, imageAlt, className }: TeamMemberProps) => {
  return (
    <div className={`text-center ${className}`} data-testid={`team-member-${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <LazyImage
        src={imageUrl}
        alt={imageAlt}
        width={128}
        height={128}
        sizes="128px"
        loading="lazy"
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        data-testid={`img-${name.toLowerCase().replace(/\s+/g, "-")}`}
      />
      <h3 
        className="text-xl font-bold mb-2"
        data-testid={`text-name-${name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {name}
      </h3>
      <p 
        className="text-primary font-medium mb-2"
        data-testid={`text-title-${name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {title}
      </p>
      <p 
        className="text-sm text-muted-foreground"
        data-testid={`text-description-${name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {description}
      </p>
    </div>
  );
});

TeamMember.displayName = "TeamMember";

export default TeamMember;
