import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Download, MessageCircle, ChevronDown, ChevronUp, Users, Eye, FileText, Calendar } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { validatePhone } from "@/lib/validation";
import ProfessionalBrochure from "@/components/ui/professional-brochure";
import { generatePDF, generateProfessionalBrochurePDF } from "@/lib/pdf-generator";

const Contact = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    companySize: "",
    message: "",
    privacyConsent: false
  });
  const [validationErrors, setValidationErrors] = useState({
    phone: ""
  });
  
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved form data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('contactFormData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Only restore fields that were actually filled
        setFormData(prev => ({
          ...prev,
          firstName: parsed.firstName || prev.firstName,
          lastName: parsed.lastName || prev.lastName,
          email: parsed.email || prev.email,
          company: parsed.company || prev.company,
          phone: parsed.phone || prev.phone,
          companySize: parsed.companySize || prev.companySize
          // Don't restore message or privacyConsent for security
        }));
      }
    } catch (error) {
      console.error('Failed to load saved contact form data:', error);
    }
  }, []);

  // Save form data to localStorage when it changes (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        // Only save if there's actual data entered
        if (formData.firstName || formData.lastName || formData.email || formData.company) {
          const dataToSave = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
            companySize: formData.companySize
            // Don't save message or privacyConsent for security
          };
          localStorage.setItem('contactFormData', JSON.stringify(dataToSave));
        }
      } catch (error) {
        console.error('Failed to save contact form data:', error);
      }
    }, 500); // Debounce by 500ms

    return () => clearTimeout(timeout);
  }, [formData]);

  // Validation function using reusable utility
  const isPhoneValid = (phone: string) => validatePhone(phone, false).isValid;

  const contactInfo = [
    {
      icon: <MapPin className="text-primary w-6" />,
      title: "Location",
      content: "Nashville, TN"
    },
    {
      icon: <Phone className="text-primary w-6" />,
      title: "Phone", 
      content: "(731)-431-2320"
    },
    {
      icon: <Mail className="text-primary w-6" />,
      title: "Email",
      content: "contact@strivetech.ai"
    },
    {
      icon: <Clock className="text-primary w-6" />,
      title: "Business Hours",
      content: "Mon-Fri: 8:00 AM - 8:00 PM EST"
    }
  ];

  const quickActions = [
    {
      icon: <Eye className="mr-1 sm:mr-2 flex-shrink-0" />,
      text: (
        <span className="flex items-center gap-1.5">
          <span className="hidden sm:inline">Download Brochure</span>
          <span className="sm:hidden text-xs">Download</span>
        </span>
      ),
      action: "brochure"
    },
    {
      icon: <MessageCircle className="mr-1 sm:mr-2 flex-shrink-0" />,
      text: (
        <span className="flex items-center gap-1 sm:gap-2">
          <span className="hidden sm:inline">Chat Live with AI Specialist</span>
          <span className="sm:hidden text-xs leading-tight">Chat with AI</span>
        </span>
      ),
      action: "chat"
    }
  ];

  const faqs = [
    {
      question: "How quickly can we start seeing results with Strive's AI solutions?",
      answer: "Most clients launch their first AI-powered project in as little as 2 to 4 weeks with measurable business value soon after."
    },
    {
      question: "What support can we expect after implementation?",
      answer: "Our experts guide you from onboarding through ongoing optimization. You'll have a dedicated success manager, proactive monitoring, and 24/7 support."
    },
    {
      question: "Which industries have you helped?",
      answer: "We empower teams in real estate, dental practices, finance, logistics, healthcare, and beyond. If your industry isn't listed, chances are, we can help."
    },
    {
      question: "How does Strive protect our data?",
      answer: "Your data security is our top priority. Strive adheres to leading compliance standards and uses advanced encryption to keep your information safe."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyConsent) {
      toast({
        title: "Privacy consent required",
        description: "Please agree to our privacy policy to continue.",
        variant: "destructive"
      });
      return;
    }

    // Validate phone if provided
    if (formData.phone) {
      const phoneValidation = validatePhone(formData.phone, false);
      if (!phoneValidation.isValid) {
        setValidationErrors({ phone: phoneValidation.errorMessage || "" });
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid phone number or leave it blank.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Create a clean submission object with proper typing
      const submissionData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company?.trim() || "",
        phone: formData.phone?.trim() || "",
        companySize: formData.companySize || "",
        message: formData.message.trim(),
        privacyConsent: formData.privacyConsent
      };

      console.log('Submitting contact form:', {
        ...submissionData,
        privacyConsent: typeof submissionData.privacyConsent,
        privacyConsentValue: submissionData.privacyConsent
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      console.log('Contact form response:', { status: response.status, result });

      if (response.ok && result.success) {
        toast({
          title: "Message sent successfully!",
          description: result.message || "Thank you for contacting SAI Platform! We'll get back to you within one business day to discuss how we can help you grow your real estate business.",
        });

        // Clear localStorage
        try {
          localStorage.removeItem('contactFormData');
        } catch (error) {
          console.error('Failed to clear contact form data:', error);
        }

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          phone: "",
          companySize: "",
          message: "",
          privacyConsent: false
        });
      } else {
        console.error('Contact form error response:', result);
        toast({
          title: "Failed to send message",
          description: result.message || "Invalid form data - please check all fields and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "brochure":
        setIsBrochureModalOpen(true);
        break;
      case "chat":
        // Navigate to the full Sai chatbot page
        setLocation('/chatbot-sai');
        break;
    }
  };

  const handleDownloadBrochure = async () => {
    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we prepare your brochure download."
      });

      await generateProfessionalBrochurePDF({
        filename: 'SAI-Platform-Brochure.pdf'
      });

      toast({
        title: "Brochure Downloaded!",
        description: "The SAI Platform brochure has been downloaded to your device."
      });
    } catch (error) {
      console.error('Error downloading brochure:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the brochure. Please try again.",
        variant: "destructive"
      });
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="pt-16">
      <section className="hero-gradient pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight"
              data-testid="text-contact-title"
            >
              Let's Talk About <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">Your Real Estate Business</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              data-testid="text-contact-subtitle"
            >
              Ready to replace 10+ tools with one unified platform? Have questions about SAI Platform? We're here to help you streamline your real estate workflow and close more deals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <Card className="p-6 md:p-8" style={{ backgroundColor: '#ffffffeb' }}>
              <CardContent className="p-0">
                <h2
                  className="text-xl md:text-2xl font-bold mb-4 md:mb-6"
                  style={{ color: '#ff7033' }}
                  data-testid="text-form-title"
                >
                  Get in Touch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#020a1c' }}>First Name *</label>
                      <Input
                        type="text"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                        className="focus:ring-primary focus:border-primary h-12 sm:h-11 md:h-10"
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Last Name *</label>
                      <Input
                        type="text"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                        className="focus:ring-primary focus:border-primary h-12 sm:h-11 md:h-10"
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Business Email *</label>
                    <Input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                      className="focus:ring-primary focus:border-primary h-11 md:h-10"
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="(731)-431-2320"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => ({ ...prev, phone: value }));
                        // Clear validation error when user starts typing
                        if (validationErrors.phone) {
                          setValidationErrors({ phone: "" });
                        }
                        // Validate on change if phone is provided
                        if (value) {
                          const phoneValidation = validatePhone(value, false);
                          if (!phoneValidation.isValid) {
                            setValidationErrors({ phone: phoneValidation.errorMessage || "" });
                          }
                        }
                      }}
                      style={{ 
                        backgroundColor: '#ffffff', 
                        color: '#020a1c', 
                        borderColor: validationErrors.phone ? '#ef4444' : '#ff7033' 
                      }}
                      className="focus:ring-primary focus:border-primary h-11 md:h-10"
                      data-testid="input-phone"
                    />
                    {validationErrors.phone && (
                      <p className="text-sm text-red-500 mt-1">{validationErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Company Name</label>
                    <Input
                      type="text"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                      className="focus:ring-primary focus:border-primary h-11 md:h-10"
                      data-testid="input-company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Company Size</label>
                    <Select value={formData.companySize} onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                      <SelectTrigger data-testid="select-company-size" className="gap-2 h-12 sm:h-11 md:h-10" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-1000">201-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#020a1c' }}>How can we help? *</label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Describe your biggest challenge or opportunity and our team will craft a personalized AI strategy..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                      className="focus:ring-primary focus:border-primary resize-none"
                      data-testid="textarea-message"
                    />
                  </div>

                  <div className="flex items-start space-x-3 py-1">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyConsent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, privacyConsent: !!checked }))}
                      data-testid="checkbox-privacy"
                      style={{ borderColor: '#ff7033' }}
                    />
                    <label htmlFor="privacy" className="text-sm" style={{ color: '#020a1c' }}>
                      By submitting, you consent to a follow-up from our AI advisors and agree to our{" "}
                      <a href="#" className="text-primary hover:underline" data-testid="link-privacy-policy">
                        Privacy Policy
                      </a>.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground py-3 md:py-3 px-4 text-base md:text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[3rem]"
                    data-testid="button-send-message"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 md:space-y-8">
              {/* Contact Details */}
              <Card className="p-6 md:p-8" style={{ backgroundColor: '#ffffffeb' }}>
                <CardContent className="p-0">
                  <h3 
                    className="text-lg md:text-xl font-bold mb-4 md:mb-6"
                    style={{ color: '#020a1c' }}
                    data-testid="text-contact-info-title"
                  >
                    Connect With Us
                  </h3>
                  <div className="space-y-4 md:space-y-4">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className="flex items-center py-1"
                        data-testid={`contact-info-${info.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <div className="flex-shrink-0">
                          {info.icon}
                        </div>
                        <div className="ml-4 md:ml-4">
                          <div className="font-medium text-sm md:text-base" style={{ color: '#020a1c' }}>{info.title}</div>
                          <div className="text-muted-foreground text-sm md:text-base" style={{ color: '#666' }}>{info.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions - Enhanced */}
              <Card className="p-6 md:p-8 shadow-xl" style={{ backgroundColor: '#ffffffeb', border: '1px solid #ff7033' }}>
                <CardContent className="p-0">
                  <div className="text-center mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                      <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <h3 
                      className="text-lg md:text-2xl font-bold mb-1 md:mb-2"
                      style={{ color: '#020a1c' }}
                      data-testid="text-quick-actions-title"
                    >
                      Ready to Take the Next Step?
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base" style={{ color: '#666' }}>
                      Explore our resources and get in touch with our team
                    </p>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {/* Quick action buttons */}
                    <div className="grid grid-cols-1 gap-3">
                      {quickActions.slice(0, 2).map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-center py-2 sm:py-3 px-2 sm:px-4 border-2 border-muted hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-md text-xs sm:text-sm md:text-base min-h-[2.5rem] sm:min-h-[2.75rem] whitespace-normal sm:whitespace-nowrap"
                          onClick={() => handleQuickAction(action.action)}
                          data-testid={`button-${action.action}`}
                        >
                          {action.icon}
                          {action.text}
                        </Button>
                      ))}
                    </div>
                    {/* Chat button spans full width */}
                    {quickActions[2] && (
                      <Button
                        variant="outline"
                        className="w-full justify-center py-2 sm:py-3 px-2 sm:px-4 border-2 border-muted hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-md relative overflow-hidden text-xs sm:text-sm md:text-base min-h-[2.5rem] sm:min-h-[2.75rem] whitespace-normal sm:whitespace-nowrap"
                        onClick={() => handleQuickAction(quickActions[2].action)}
                        data-testid={`button-${quickActions[2].action}`}
                      >
                        {quickActions[2].icon}
                        {quickActions[2].text}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 md:mt-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
                data-testid="text-faq-title"
              >
                Frequently Asked Questions
              </h2>
              <p 
                className="text-lg md:text-xl text-muted-foreground"
                data-testid="text-faq-subtitle"
              >
                Quick answers to common questions.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden" style={{ backgroundColor: '#ffffffeb' }}>
                  <button
                    className="w-full text-left p-5 sm:p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors min-h-[64px] sm:min-h-[60px] md:min-h-auto"
                    onClick={() => toggleFaq(index)}
                    data-testid={`button-faq-${index}`}
                  >
                    <span className="font-medium text-sm md:text-base pr-4" data-testid={`text-faq-question-${index}`} style={{ color: '#020a1c' }}>
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {expandedFaq === index ? (
                        <ChevronUp className="text-primary w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <ChevronDown className="text-primary w-5 h-5 md:w-6 md:h-6" />
                      )}
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <div 
                      className="px-4 md:px-6 pb-4 md:pb-6 text-sm md:text-base leading-relaxed"
                      style={{ color: '#666' }}
                      data-testid={`text-faq-answer-${index}`}
                    >
                      {faq.answer}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brochure Modal */}
      <Dialog open={isBrochureModalOpen} onOpenChange={setIsBrochureModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] w-[95vw] sm:w-auto overflow-y-auto modal-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Strive Business Solutions Brochure
            </DialogTitle>
          </DialogHeader>

          <ProfessionalBrochure onDownload={handleDownloadBrochure} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
