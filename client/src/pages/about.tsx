import { Target, Eye, Heart } from "lucide-react";
import TeamMember from "@/components/ui/team-member";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const missionVisionValues = [
    {
      icon: <Target className="text-primary text-2xl" />,
      title: "Our Mission",
      description: "To empower businesses with innovative technology solutions that drive efficiency, productivity, and sustainable growth."
    },
    {
      icon: <Eye className="text-primary text-2xl" />,
      title: "Our Vision", 
      description: "To be the world's most trusted partner for business transformation and technological innovation."
    },
    {
      icon: <Heart className="text-primary text-2xl" />,
      title: "Our Values",
      description: "Excellence, integrity, innovation, and customer success guide everything we do."
    }
  ];

  const teamMembers = [
    {
      name: "Michael Chen",
      title: "CEO & Founder",
      description: "20+ years in enterprise technology and business transformation.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      imageAlt: "Professional business executive headshot"
    },
    {
      name: "Sarah Johnson",
      title: "CTO",
      description: "AI and cloud computing expert with a passion for innovation.",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b812?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      imageAlt: "Professional business woman executive"
    },
    {
      name: "David Rodriguez", 
      title: "VP of Operations",
      description: "Operations excellence and process optimization specialist.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      imageAlt: "Professional business man in suit"
    },
    {
      name: "Emily Zhang",
      title: "Head of Customer Success",
      description: "Dedicated to ensuring client satisfaction and long-term success.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      imageAlt: "Professional business woman in corporate setting"
    }
  ];

  const stats = [
    { number: "150+", label: "Clients Served" },
    { number: "8", label: "Years of Excellence" },
    { number: "95%", label: "Client Retention" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              data-testid="text-about-title"
            >
              About Strive
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-about-subtitle"
            >
              We're dedicated to helping businesses transform their operations through innovative technology solutions and expert guidance.
            </p>
          </div>

          {/* Company Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 
                className="text-3xl font-bold mb-6"
                data-testid="text-story-title"
              >
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p data-testid="text-story-paragraph-1">
                  Founded in 2015, Strive emerged from a simple observation: businesses were struggling to keep pace with rapid technological advancement while maintaining operational efficiency. Our founders, seasoned technology executives with decades of combined experience, recognized the need for a comprehensive approach to business transformation.
                </p>
                <p data-testid="text-story-paragraph-2">
                  What started as a small consulting firm has evolved into a full-service technology partner, serving enterprises across multiple industries. We've helped over 150 organizations streamline their operations, reduce costs, and accelerate growth through strategic technology implementation.
                </p>
                <p data-testid="text-story-paragraph-3">
                  Today, we continue to push the boundaries of what's possible, leveraging cutting-edge AI, cloud technologies, and automation to deliver solutions that not only meet current needs but anticipate future challenges.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional business team in modern corporate office"
                className="rounded-2xl w-full h-full object-cover"
                data-testid="img-company-story"
              />
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {missionVisionValues.map((item, index) => (
              <Card 
                key={index} 
                className="p-8 text-center"
                data-testid={`card-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    {item.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-4"
                    data-testid={`text-${item.title.toLowerCase().replace(/\s+/g, "-")}-title`}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-muted-foreground"
                    data-testid={`text-${item.title.toLowerCase().replace(/\s+/g, "-")}-description`}
                  >
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              data-testid="text-team-title"
            >
              Meet Our Leadership
            </h2>
            <p 
              className="text-xl text-muted-foreground"
              data-testid="text-team-subtitle"
            >
              Experienced leaders driving innovation and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                title={member.title}
                description={member.description}
                imageUrl={member.imageUrl}
                imageAlt={member.imageAlt}
              />
            ))}
          </div>

          {/* Company Stats */}
          <div className="bg-muted rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                data-testid="text-impact-title"
              >
                Our Impact
              </h2>
              <p 
                className="text-xl text-muted-foreground"
                data-testid="text-impact-subtitle"
              >
                Numbers that reflect our commitment to excellence.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div 
                    className="text-4xl font-bold text-primary mb-2"
                    data-testid={`text-stat-number-${index}`}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-muted-foreground"
                    data-testid={`text-stat-label-${index}`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
