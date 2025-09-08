import { Target, Eye, Heart, CheckCircle, Calendar, Rocket, Zap, Users } from "lucide-react";
import { ArrowTrendingUpIcon, LightBulbIcon, GlobeAltIcon, CpuChipIcon } from "@heroicons/react/24/outline";
import TeamMember from "@/components/ui/team-member";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

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

  // Vision Timeline Data
  const visionMilestones = [
    {
      year: "Q4 2026",
      title: "AI Platform Beta Launch",
      description: "Rolling out beta version of our next-gen AI automation platform to select enterprise clients",
      icon: <CpuChipIcon className="h-6 w-6" />,
      status: "current"
    },
    {
      year: "Q1 2027",
      title: "Global Market Entry",
      description: "Expanding operations to European and Asian markets with localized AI solutions",
      icon: <GlobeAltIcon className="h-6 w-6" />,
      status: "upcoming"
    },
    {
      year: "Q2 2027",
      title: "Innovation Lab Launch",
      description: "Opening dedicated R&D facility for quantum computing and advanced AI research",
      icon: <LightBulbIcon className="h-6 w-6" />,
      status: "future"
    },
    {
      year: "Q3 2027",
      title: "Enterprise Scale",
      description: "Achieving 500+ enterprise clients with comprehensive AI transformation programs",
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
      status: "future"
    },
    {
      year: "Q4 2027",
      title: "Industry Leadership",
      description: "Establishing position as top-tier AI business solutions provider globally",
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
      status: "future"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section with AI-themed animated background */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-primary rounded-full animate-ping opacity-60`}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Users className="text-primary h-16 w-16 animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              data-testid="text-about-title"
            >
              Transforming Business Through Innovation
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8"
              data-testid="text-about-subtitle"
            >
              We're not just another tech company. We're visionaries building the future of business automation, one intelligent solution at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-learn-more"
              >
                Learn Our Story
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-join-team"
              >
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved outside hero */}
      <section className="py-12 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300" 
                  data-testid={`text-stat-number-${index}`}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-muted-foreground font-medium"
                  data-testid={`text-stat-label-${index}`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section id="our-story" className="py-16 md:py-24 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div 
                className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
                data-testid="text-story-label"
              >
                OUR JOURNEY
              </div>
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-[#020a1c]"
                data-testid="text-story-title"
              >
                From Vision to Reality
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p data-testid="text-story-paragraph-1" className="text-lg leading-relaxed">
                  Founded in 2015, Strive emerged from a simple observation: businesses were struggling to keep pace with rapid technological advancement while maintaining operational efficiency. Our founders, seasoned technology executives with decades of combined experience, recognized the need for a comprehensive approach to business transformation.
                </p>
                <p data-testid="text-story-paragraph-2" className="text-lg leading-relaxed">
                  What started as a small consulting firm has evolved into a full-service technology partner, serving enterprises across multiple industries. We've helped over 150 organizations streamline their operations, reduce costs, and accelerate growth through strategic technology implementation.
                </p>
                <p data-testid="text-story-paragraph-3" className="text-lg leading-relaxed">
                  Today, we continue to push the boundaries of what's possible, leveraging cutting-edge AI, cloud technologies, and automation to deliver solutions that not only meet current needs but anticipate future challenges.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
                  size="lg"
                  onClick={() => window.location.href = "/contact"}
                  data-testid="button-learn-more"
                >
                  Partner With Us
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-2xl rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional business team in modern corporate office"
                className="rounded-2xl w-full h-full object-cover relative z-10 shadow-2xl"
                data-testid="img-company-story"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Timeline */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-vision-label"
            >
              OUR VISION
            </div>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
              data-testid="text-vision-title"
            >
              Roadmap to the <span className="gradient-text">Future</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Our strategic roadmap shows how we're building tomorrow's business solutions today.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary/20 rounded-full"></div>
            
            {visionMilestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                data-testid={`milestone-${milestone.year}`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 ${
                    milestone.status === 'current' ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center text-white">
                        {milestone.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{milestone.year}</div>
                        {milestone.status === 'current' && (
                          <div className="text-xs text-primary font-semibold uppercase tracking-wide">Current Focus</div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{milestone.title}</h3>
                    <p className="text-white/80">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Spacer */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-24 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-mvv-label"
            >
              OUR FOUNDATION
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-[#020a1c]"
              data-testid="text-mvv-title"
            >
              Mission, Vision & Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionVisionValues.map((item, index) => (
              <div 
                key={index} 
                className="group"
                data-testid={`card-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="bg-off-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white text-2xl">
                      {item.icon}
                    </div>
                  </div>
                  <h3 
                    className="text-xl font-bold mb-4 text-[#020a1c]"
                    data-testid={`text-${item.title.toLowerCase().replace(/\s+/g, "-")}-title`}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-muted-foreground leading-relaxed"
                    data-testid={`text-${item.title.toLowerCase().replace(/\s+/g, "-")}-description`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-team-label"
            >
              OUR LEADERSHIP
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-[#020a1c]"
              data-testid="text-team-title"
            >
              Meet the Visionaries
            </h2>
            <p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              data-testid="text-team-subtitle"
            >
              Experienced leaders driving innovation and excellence across every aspect of our business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-off-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.imageUrl}
                      alt={member.imageAlt}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[#020a1c]">{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join the businesses that have already discovered the power of intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg"
                size="lg"
                onClick={() => window.location.href = "/contact"}
                data-testid="button-get-started-cta"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
                size="lg"
                onClick={() => window.location.href = "/portfolio"}
                data-testid="button-view-work"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
