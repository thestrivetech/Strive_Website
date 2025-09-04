import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Calendar, Download, MessageCircle, ChevronDown, ChevronUp, Users, Eye, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
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
  
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  const contactInfo = [
    {
      icon: <MapPin className="text-primary w-6" />,
      title: "Headquarters",
      content: "123 Business District, Tech City, TC 12345"
    },
    {
      icon: <Phone className="text-primary w-6" />,
      title: "Phone", 
      content: "+1 (555) 123-4567"
    },
    {
      icon: <Mail className="text-primary w-6" />,
      title: "Email",
      content: "hello@strive.com"
    },
    {
      icon: <Clock className="text-primary w-6" />,
      title: "Business Hours",
      content: "Mon-Fri: 9:00 AM - 6:00 PM PST"
    }
  ];

  const quickActions = [
    { icon: <Calendar className="mr-2" />, text: "Request a Demo", action: "demo" },
    { icon: <Eye className="mr-2" />, text: "View Brochure", action: "brochure" },
    { icon: <MessageCircle className="mr-2" />, text: "Live Chat Support", action: "chat" }
  ];

  const faqs = [
    {
      question: "How long does a typical implementation take?",
      answer: "Implementation timelines vary based on project scope and complexity. Most projects range from 3-12 months, with our team providing detailed timelines during initial consultations."
    },
    {
      question: "Do you provide ongoing support after implementation?",
      answer: "Yes, we provide comprehensive ongoing support including 24/7 monitoring, regular maintenance, training, and dedicated customer success management."
    },
    {
      question: "What industries do you serve?",
      answer: "We serve a wide range of industries including healthcare, finance, manufacturing, retail, technology, and education, with specialized solutions for each sector."
    },
    {
      question: "How do you ensure data security?",
      answer: "We implement enterprise-grade security measures including encryption, access controls, compliance monitoring, and regular security audits to protect your data."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyConsent) {
      toast({
        title: "Privacy consent required",
        description: "Please agree to our privacy policy to continue.",
        variant: "destructive"
      });
      return;
    }

    // Handle form submission
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within one business day.",
    });
    
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
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "demo":
        toast({ title: "Demo scheduled!", description: "A calendar invite will be sent to your email." });
        break;
      case "brochure":
        setIsBrochureModalOpen(true);
        break;
      case "chat":
        toast({ title: "Chat opening...", description: "Connecting you with our support team." });
        break;
    }
  };

  const handleDownloadBrochure = () => {
    // Create a mock PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,';
    link.download = 'Strive-Business-Solutions-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ 
      title: "Brochure Downloaded!", 
      description: "The Strive brochure has been downloaded to your device." 
    });
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              data-testid="text-contact-title"
            >
              Get in Touch
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-contact-subtitle"
            >
              Ready to transform your business? Let's discuss how Strive can help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="p-8">
              <CardContent className="p-0">
                <h2 
                  className="text-2xl font-bold mb-6"
                  data-testid="text-form-title"
                >
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <Input
                        type="text"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <Input
                        type="text"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Email *</label>
                    <Input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name *</label>
                    <Input
                      type="text"
                      required
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      data-testid="input-company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Company Size</label>
                    <Select value={formData.companySize} onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                      <SelectTrigger data-testid="select-company-size" className="gap-2">
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
                    <label className="block text-sm font-medium mb-2">How can we help? *</label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Tell us about your project or business needs..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      data-testid="textarea-message"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyConsent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, privacyConsent: !!checked }))}
                      data-testid="checkbox-privacy"
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground">
                      I agree to Strive's{" "}
                      <a href="#" className="text-primary hover:underline" data-testid="link-privacy-policy">
                        Privacy Policy
                      </a>{" "}
                      and consent to being contacted about my inquiry.
                    </label>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 text-lg hover:bg-primary/90"
                    data-testid="button-send-message"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="p-8">
                <CardContent className="p-0">
                  <h3 
                    className="text-xl font-bold mb-6"
                    data-testid="text-contact-info-title"
                  >
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div 
                        key={index} 
                        className="flex items-center"
                        data-testid={`contact-info-${info.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {info.icon}
                        <div className="ml-4">
                          <div className="font-medium">{info.title}</div>
                          <div className="text-muted-foreground">{info.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions - Enhanced */}
              <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-primary/20 p-8 shadow-xl">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <h3 
                      className="text-2xl font-bold mb-2"
                      data-testid="text-quick-actions-title"
                    >
                      Quick Actions
                    </h3>
                    <p className="text-muted-foreground">
                      Get started immediately or explore our resources
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Primary consultation button */}
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-primary/20"
                      onClick={() => window.location.href = '/consultation'}
                      data-testid="button-schedule-consultation"
                    >
                      <Calendar className="mr-2 w-5 h-5" />
                      Schedule a Consultation
                    </Button>
                    
                    {/* Secondary actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-center py-3 border-2 border-muted hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                          onClick={() => handleQuickAction(action.action)}
                          data-testid={`button-${action.action}`}
                        >
                          {action.icon}
                          {action.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                data-testid="text-faq-title"
              >
                Frequently Asked Questions
              </h2>
              <p 
                className="text-xl text-muted-foreground"
                data-testid="text-faq-subtitle"
              >
                Quick answers to common questions.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <button
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                    onClick={() => toggleFaq(index)}
                    data-testid={`button-faq-${index}`}
                  >
                    <span className="font-medium" data-testid={`text-faq-question-${index}`}>
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="text-primary" />
                    ) : (
                      <ChevronDown className="text-primary" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div 
                      className="px-6 pb-6 text-muted-foreground"
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Strive Business Solutions Brochure
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8 py-6">
            {/* Brochure Header */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-white">S</span>
              </div>
              <h2 className="text-3xl font-bold gradient-text">Strive</h2>
              <p className="text-xl text-muted-foreground">Transforming Business Through AI Innovation</p>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">About Strive</h3>
              <p className="text-muted-foreground leading-relaxed">
                Strive is a leading provider of AI-powered business solutions, helping organizations across industries 
                transform their operations, improve efficiency, and drive growth. Our comprehensive suite of services 
                includes AI automation, data analytics, cloud infrastructure, and security compliance solutions.
              </p>
            </div>

            {/* Services Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Our Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-primary">AI & Automation</h4>
                  <p className="text-sm text-muted-foreground">
                    Intelligent process automation, machine learning models, and predictive analytics platforms.
                  </p>
                </div>
                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-primary">Data Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time dashboards, business intelligence platforms, and advanced data visualization.
                  </p>
                </div>
                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-primary">Cloud Infrastructure</h4>
                  <p className="text-sm text-muted-foreground">
                    Scalable cloud solutions, DevOps automation, and modern application architecture.
                  </p>
                </div>
                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-primary">Security & Compliance</h4>
                  <p className="text-sm text-muted-foreground">
                    Enterprise security, compliance monitoring, and data protection solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Industries */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Industries We Serve</h3>
              <div className="flex flex-wrap gap-2">
                {['Healthcare', 'Financial Services', 'Manufacturing', 'Retail', 'Technology', 'Education', 'Real Estate', 'Legal'].map((industry) => (
                  <span key={industry} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-xl font-semibold">Get Started Today</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>hello@strive.com</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>123 Business District, Tech City, TC 12345</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Mon-Fri: 9:00 AM - 6:00 PM PST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center pt-6 border-t">
              <Button 
                onClick={handleDownloadBrochure}
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-3 text-lg"
                data-testid="button-download-brochure"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF Brochure
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
