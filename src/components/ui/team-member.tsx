interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
}

const TeamMember = ({ name, title, description, imageUrl, imageAlt, className }: TeamMemberProps) => {
  return (
    <div className={`text-center ${className}`} data-testid={`team-member-${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <img 
        src={imageUrl} 
        alt={imageAlt}
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
};

export default TeamMember;
