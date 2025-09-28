import React from 'react';
import {
  Download,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Target,
  Zap,
  Shield,
  Cloud,
  BarChart3,
  Cog,
  Brain,
  Database,
  Code,
  Smartphone,
  Globe,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import STLogo from '@/assets/ST-Transparent.png';

interface ProfessionalBrochureProps {
  onDownload: () => void;
}

const ProfessionalBrochure: React.FC<ProfessionalBrochureProps> = ({ onDownload }) => {
  const services = [
    {
      icon: <Brain className="w-8 h-8" style={{ color: '#ff7033' }} />,
      title: "AI & Machine Learning Solutions",
      description: "Custom AI models, machine learning pipelines, and intelligent automation systems tailored to your business needs."
    },
    {
      icon: <Cog className="w-8 h-8" style={{ color: '#ff7033' }} />,
      title: "Intelligent Process Automation",
      description: "Streamline operations with AI-powered automation that reduces costs and improves efficiency."
    },
    {
      icon: <BarChart3 className="w-8 h-8" style={{ color: '#ff7033' }} />,
      title: "Predictive Analytics & BI",
      description: "Transform data into actionable insights with advanced analytics and real-time business intelligence."
    },
    {
      icon: <Code className="w-8 h-8" style={{ color: '#ff7033' }} />,
      title: "Custom AI Development",
      description: "End-to-end development of bespoke AI solutions that integrate seamlessly with your existing systems."
    },
    {
      icon: <Database className="w-8 h-8" style={{ color: '#ff7033' }} />,
      title: "Data Engineering & Architecture",
      description: "Robust data infrastructure design and implementation for scalable AI and analytics platforms."
    },
    {
      icon: <Cloud className="w-8 h-8" style={{ color: '#ff7033' }} />,
      title: "Cloud Infrastructure & DevOps",
      description: "Modern cloud architecture with automated deployment pipelines and infrastructure management."
    }
  ];

  const industries = [
    { name: "Healthcare & Life Sciences", icon: "🏥" },
    { name: "Financial Services & Banking", icon: "🏦" },
    { name: "Manufacturing & Supply Chain", icon: "🏭" },
    { name: "Retail & E-commerce", icon: "🛍️" },
    { name: "Technology & SaaS", icon: "💻" },
    { name: "Education & EdTech", icon: "🎓" },
    { name: "Real Estate & PropTech", icon: "🏢" },
    { name: "Legal & Compliance", icon: "⚖️" }
  ];

  const metrics = [
    { number: "500+", label: "AI Models Deployed", icon: <Brain className="w-6 h-6" /> },
    { number: "95%", label: "Client Retention Rate", icon: <Users className="w-6 h-6" /> },
    { number: "40%", label: "Average Cost Reduction", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "3x", label: "ROI Within First Year", icon: <Target className="w-6 h-6" /> }
  ];

  const technologies = [
    { category: "AI/ML", tools: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI GPT", "Hugging Face"] },
    { category: "Cloud", tools: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker"] },
    { category: "Data", tools: ["Snowflake", "Databricks", "Apache Spark", "PostgreSQL", "MongoDB"] },
    { category: "DevOps", tools: ["Jenkins", "GitLab CI/CD", "Terraform", "Ansible", "Prometheus"] }
  ];

  const whyChooseStrive = [
    {
      icon: <Award className="w-6 h-6" style={{ color: '#ff7033' }} />,
      title: "Proven Track Record",
      description: "500+ successful AI implementations across diverse industries"
    },
    {
      icon: <Users className="w-6 h-6" style={{ color: '#ff7033' }} />,
      title: "Expert Team",
      description: "Certified AI engineers, data scientists, and business strategists"
    },
    {
      icon: <Zap className="w-6 h-6" style={{ color: '#ff7033' }} />,
      title: "End-to-End Solutions",
      description: "From strategy to deployment, we handle every aspect of your AI journey"
    },
    {
      icon: <Shield className="w-6 h-6" style={{ color: '#ff7033' }} />,
      title: "24/7 Support",
      description: "Continuous monitoring, maintenance, and optimization of your AI systems"
    }
  ];

  return (
    <div id="professional-brochure" className="space-y-8 py-6 text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Cover Section */}
      <div className="text-center space-y-6 py-8 px-6 rounded-xl bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <img
              src={STLogo}
              alt="Strive Tech Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            STRIVE TECH
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Transforming Business Through AI Innovation
          </p>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
            Empowering organizations with cutting-edge AI solutions that drive growth, efficiency, and competitive advantage
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <div className="space-y-6 px-6">
        <h2 className="text-3xl font-black text-center" style={{ color: '#ff7033' }}>
          Company Overview
        </h2>
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <p className="text-lg leading-relaxed text-gray-700">
            <strong className="text-[#ff7033]">Strive</strong> is a leading provider of AI-powered business solutions,
            helping organizations across industries transform their operations, improve efficiency, and drive sustainable growth.
            Our comprehensive suite of services combines cutting-edge artificial intelligence with deep industry expertise
            to deliver measurable results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ff7033] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#ff7033' }}>Our Mission</h3>
              <p className="text-sm text-gray-700">Democratizing AI to make intelligent solutions accessible to businesses of all sizes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ff7033] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#ff7033' }}>Our Vision</h3>
              <p className="text-sm text-gray-700">Creating a future where AI amplifies human potential and drives innovation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ff7033] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#ff7033' }}>Our Values</h3>
              <p className="text-sm text-gray-700">Innovation, integrity, and impact in everything we deliver</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services & Solutions */}
      <div className="space-y-6 px-6">
        <h2 className="text-3xl font-black text-center" style={{ color: '#ff7033' }}>
          Services & Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#ff7033]/10 rounded-lg flex items-center justify-center">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: '#ff7033' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Expertise */}
      <div className="space-y-6 px-6">
        <h2 className="text-3xl font-bold text-center" style={{ color: '#ff7033' }}>
          Industry Expertise - 20+ Industries Served
        </h2>
        <p className="text-center text-[#94a3b8] max-w-3xl mx-auto font-medium">
          We bring deep domain knowledge and industry-specific AI solutions across 20+ industries to help you navigate unique challenges and opportunities.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((industry, index) => (
            <div key={index} className="text-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{industry.icon}</div>
              <p className="text-sm font-medium text-gray-700">{industry.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="space-y-6 px-6">
        <h2 className="text-3xl font-bold text-center" style={{ color: '#ff7033' }}>
          Proven Results
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-[#ff7033]/5 to-purple-600/5 rounded-xl border border-[#ff7033]/20">
              <div className="w-12 h-12 bg-[#ff7033] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
                {metric.icon}
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-br from-[#ff7033] to-purple-600 bg-clip-text text-transparent">
                {metric.number}
              </div>
              <p className="text-sm font-medium text-[#94a3b8]">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="space-y-6 px-6">
        <h2 className="text-3xl font-bold text-center" style={{ color: '#ff7033' }}>
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4" style={{ color: '#ff7033' }}>
                {tech.category}
              </h3>
              <div className="space-y-2">
                {tech.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Strive */}
      <div className="space-y-6 px-6">
        <h2 className="text-3xl font-bold text-center" style={{ color: '#ff7033' }}>
          Why Choose Strive?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyChooseStrive.map((reason, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-white border border-gray-200 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ff7033]/10 rounded-lg flex items-center justify-center">
                {reason.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: '#ff7033' }}>
                  {reason.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-6 px-6">
        <h2 className="text-3xl font-bold text-center" style={{ color: '#ff7033' }}>
          Get Started Today
        </h2>
        <div className="bg-gradient-to-br from-[#ff7033]/5 to-purple-600/5 rounded-xl p-8 border border-[#ff7033]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#ff7033' }}>
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#ff7033]" />
                  <span className="text-[#94a3b8]">(731)-431-2320</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#ff7033]" />
                  <span className="text-[#94a3b8]">contact@strivetech.ai</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#ff7033]" />
                  <span className="text-[#94a3b8]">Nashville, TN</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#ff7033]" />
                  <span className="text-[#94a3b8]">Mon-Fri: 8:00 AM - 8:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-[#ff7033]" />
                  <span className="text-[#94a3b8]">www.strivetech.ai</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#ff7033' }}>
                Ready to Transform Your Business?
              </h3>
              <p className="text-[#94a3b8] mb-6">
                Schedule a free consultation to discuss how AI can accelerate your growth and competitive advantage.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-[#94a3b8]">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free initial consultation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-[#94a3b8]">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Custom AI strategy development</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-[#94a3b8]">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ROI-focused implementation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center pt-6 border-t border-gray-200">
        <Button
          onClick={onDownload}
          className="bg-gradient-to-r from-[#ff7033] to-purple-600 hover:from-[#ff7033]/90 hover:to-purple-600/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Download className="w-5 h-5 mr-3" />
          Download PDF Brochure
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
        <p>© 2025 Strive Tech. All rights reserved. | Transforming Business Through AI Innovation</p>
      </div>
    </div>
  );
};

export default ProfessionalBrochure;