import { Target, Eye, Heart, CheckCircle, Calendar, Rocket, Zap, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowTrendingUpIcon, LightBulbIcon, GlobeAltIcon, CpuChipIcon } from "@heroicons/react/24/outline";
import TeamMember from "@/components/ui/team-member";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import GarrettHeadshot from "@/assets/Garrett-Headshot.webp";
import JeffHeadshot from "@/assets/Jeff-Headshot.webp";
import GrantHeadshot from "@/assets/Grant-Headshot.webp";

const Company = () => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  
  const nextTeamMember = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teamMembers.length);
  };
  
  const prevTeamMember = () => {
    setCurrentTeamIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const missionVisionValues = [
    {
      icon: <Target className="text-primary text-2xl" />,
      title: "Our Mission",
      description: "Help you boost revenues, cut costs, and outpace your competitors through the right AI, delivered at the right time."
    },
    {
      icon: <Eye className="text-primary text-2xl" />,
      title: "Our Vision", 
      description: "To be the trusted partner B2B leaders call for transformation and breakthrough growth."
    },
    {
      icon: <Heart className="text-primary text-2xl" />,
      title: "Our Values",
      description: "Your success is our standard through excellence, integrity, bold innovation, and relentless commitment."
    }
  ];

  const teamMembers = [
    {
      name: "Garrett Holland",
      title: "Founder & CEO",
      description: "Visionary leader transforming businesses through strategic AI innovation and operational excellence.",
      imageUrl: GarrettHeadshot,
      imageAlt: "Garrett Holland - CEO & Founder headshot"
    },
    {
      name: "Grant Ramey",
      title: "Co-Founder, VP",
      description: "Operational excellence architect scaling breakthrough solutions and delivering measurable results.",
      imageUrl: GrantHeadshot,
      imageAlt: "Grant Ramey - Co-Founder, VP headshot"
    },
    {
      name: "Jeff Meyer",
      title: "Co-Founder, Head of Sales",
      description: "Expert relationship builder driving exponential growth through strategic partnerships and client success.",
      imageUrl: JeffHeadshot,
      imageAlt: "Jeff Meyer - Co-Founder, Head of Sales headshot"
    }
  ];

  const stats = [
    { number: "203", label: "Total Projects Completed" },
    { number: "12", label: "Fortune 500 Clients", note: "Can't list names on website due to NDAs" },
    { number: "95%", label: "Retention Rate, Year After Year" },
    { number: "24/7", label: "Always-On Support for Your Success" }
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
      title: "50 Custom Solutions Delivered",
      description: "Reaching our first 50 successful AI implementations, helping 40 businesses streamline key processes and save an average of 15 hours per week",
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
      status: "upcoming"
    },
    {
      year: "Q2 2027",
      title: "100 Businesses Transformed",
      description: "Celebrating 100 businesses enhanced with custom AI solutions, achieving 95% client satisfaction and expanding to 10 industry verticals",
      icon: <GlobeAltIcon className="h-6 w-6" />,
      status: "future"
    },
    {
      year: "Q3 2027",
      title: "10,000 Hours Saved Monthly",
      description: "Saving clients 10,000+ hours monthly through 200 intelligent workflow solutions, equivalent to 60+ full-time employees focused on strategic work",
      icon: <LightBulbIcon className="h-6 w-6" />,
      status: "future"
    },
    {
      year: "Q4 2027",
      title: "$50M in Client Savings Generated",
      description: "Achieving $50 million in documented cost savings and efficiency gains for our clients through 300+ deployed AI solutions",
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
      status: "future"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section - Our Vision & Roadmap to the Future */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-vision-label"
            >
              OUR VISION
            </div>
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
              data-testid="text-vision-title"
            >
              Roadmap to the <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Future</span>
            </h1>
            <p className="text-[#94a3b8] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              What's Ahead for Us and For You: Continuous innovation in AI & emerging tech, so you're always a step ahead.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line - Desktop: Center, Mobile: Left */}
            <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary/20 rounded-full"></div>
            
            {visionMilestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative mb-12 md:mb-16 md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                data-testid={`milestone-${milestone.year}`}
              >
                {/* Content - Mobile: Full width left-aligned, Desktop: Alternating */}
                <div className={`pl-16 md:pl-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                  <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 hover:scale-105 transition-all duration-300 ${
                    milestone.status === 'current' ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
                  }`}>
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center text-white">
                        <div className="scale-75 md:scale-100">
                          {milestone.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-white">{milestone.year}</div>
                        {milestone.status === 'current' && (
                          <div className="text-xs text-primary font-semibold uppercase tracking-wide">Current Focus</div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{milestone.title}</h3>
                    <p className="text-sm md:text-base text-white/80">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot - Mobile: Left aligned, Desktop: Center */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full border-2 md:border-4 border-white shadow-lg z-10"></div>
                
                {/* Spacer - Desktop only */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Moved outside hero */}
      <section className="py-12 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile & Tablet: 2x2 Grid layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="text-2xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300" 
                  data-testid={`text-stat-number-${index}`}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-muted-foreground font-medium text-sm md:text-base leading-tight"
                  data-testid={`text-stat-label-${index}`}
                >
                  {stat.label}
                </div>
                {stat.note && (
                  <div className="text-xs text-muted-foreground mt-1 italic text-center leading-tight">
                    {stat.note}
                  </div>
                )}
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
                  In 2015, our founders met business leaders overwhelmed by tech change who were facing wasted resources, siloed data, and operational bottlenecks. We created Strive to help organizations like yours turn chaos into clarity, using AI and automation as a competitive edge.
                </p>
                <p data-testid="text-story-paragraph-2" className="text-lg leading-relaxed">
                  What started as a small consulting firm has evolved into a full-service technology partner, serving enterprises across multiple industries. We've helped over 150 organizations streamline their operations, reduce costs, and accelerate growth through strategic technology implementation.
                </p>
                <p data-testid="text-story-paragraph-3" className="text-lg leading-relaxed">
                  Today we partner with forward-thinking teams to build scalable, efficient businesses that are ready for tomorrow. Continuous innovation in AI ensures you're always a step ahead.
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
          
          {/* Mobile: 1x2 Layout - Values on top, Mission and Vision below */}
          <div className="block md:hidden">
            <div className="space-y-6">
              {/* Values card first */}
              {missionVisionValues.filter(item => item.title === "Our Values").map((item, index) => (
                <div 
                  key={index} 
                  className="group"
                  data-testid={`card-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="bg-white rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                    <div className="w-14 h-14 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-primary text-lg">
                        {item.icon}
                      </div>
                    </div>
                    <h3 
                      className="text-base font-bold mb-2 text-[#020a1c]"
                      data-testid={`text-${item.title.toLowerCase().replace(/\s+/g, "-")}-title`}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="text-sm text-muted-foreground leading-relaxed"
                      data-testid={`text-${item.title.toLowerCase().replace(/\s+/g, "-")}-description`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Mission and Vision in a 2-column grid */}
              <div className="grid grid-cols-2 gap-4">
                {missionVisionValues.filter(item => item.title !== "Our Values").map((item, index) => (
                  <div 
                    key={index} 
                    className="group"
                    data-testid={`card-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="bg-white rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                      <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-primary text-lg">
                          {item.icon}
                        </div>
                      </div>
                      <h3 
                        className="text-base font-bold mb-2 text-[#020a1c]"
                        data-testid={`text-${item.title.toLowerCase().replace(/\s+/g, "-")}-title`}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-xs text-muted-foreground leading-relaxed"
                        data-testid={`text-${item.title.toLowerCase().replace(/\s+/g, "-")}-description`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop: Original 3-column grid */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {missionVisionValues.map((item, index) => (
              <div 
                key={index} 
                className="group"
                data-testid={`card-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary text-2xl">
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
                    className="text-base text-muted-foreground leading-relaxed"
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
              Meet Your Transformation Partners
            </h2>
            <p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              data-testid="text-team-subtitle"
            >
              Trusted advisors to global enterprises, delivering proven growth with every partnership.
            </p>
          </div>

          {/* Mobile: Horizontal Swipe Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentTeamIndex * 100}%)` }}
              >
                {teamMembers.map((member, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden relative group">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                      
                      <div className="relative overflow-hidden">
                        <img 
                          src={member.imageUrl}
                          alt={member.imageAlt}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Decorative border effect */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-t-3xl transition-colors duration-500"></div>
                      </div>
                      
                      <div className="p-6 relative z-10">
                        <h3 className="text-xl font-bold mb-3 text-[#020a1c] group-hover:text-primary transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-primary font-bold mb-3 text-base tracking-wide">
                          {member.title}
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {member.description}
                        </p>
                        
                        {/* Decorative accent */}
                        <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-primary to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevTeamMember}
              className="absolute -left-6 top-1/2 -translate-y-1/2 rounded-full p-3 hover:scale-110 transition-all duration-300 z-10"
              aria-label="Previous team member"
            >
              <ChevronLeft className="h-8 w-8 text-[#ff7033] hover:text-[#ff7033]/80" />
            </button>
            
            <button
              onClick={nextTeamMember}
              className="absolute -right-6 top-1/2 -translate-y-1/2 rounded-full p-3 hover:scale-110 transition-all duration-300 z-10"
              aria-label="Next team member"
            >
              <ChevronRight className="h-8 w-8 text-[#ff7033] hover:text-[#ff7033]/80" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTeamIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTeamIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to team member ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Original Grid Layout */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden relative">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.imageUrl}
                      alt={member.imageAlt}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Decorative border effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-t-3xl transition-colors duration-500"></div>
                  </div>
                  
                  <div className="p-8 relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-[#020a1c] group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-primary font-bold mb-4 text-lg tracking-wide">
                      {member.title}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {member.description}
                    </p>
                    
                    {/* Decorative accent */}
                    <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-primary to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
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
              Ready to See AI Work For You?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Book a free custom automation assessment and discover your roadmap to stronger growth, efficiency, and market leadership starting today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                size="lg"
                onClick={() => window.location.href = "/contact"}
                data-testid="button-get-started-cta"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline"
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                size="lg"
                onClick={() => window.location.href = "/contact"}
                data-testid="button-join-team"
              >
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
