import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Calendar, Download, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    { icon: <Calendar className="mr-2" />, text: "Schedule a Demo", action: "demo" },
    { icon: <Download className="mr-2" />, text: "Download Brochure", action: "brochure" },
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
        toast({ title: "Brochure downloading...", description: "Your download will start shortly." });
        break;
      case "chat":
        toast({ title: "Chat opening...", description: "Connecting you with our support team." });
        break;
    }
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
                      <SelectTrigger data-testid="select-company-size">
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

              {/* Office Image */}
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                  alt="Corporate building exterior with modern architecture"
                  className="w-full h-48 object-cover"
                  data-testid="img-office"
                />
                <CardContent className="p-6">
                  <h3 
                    className="text-xl font-bold mb-2"
                    data-testid="text-visit-office-title"
                  >
                    Visit Our Office
                  </h3>
                  <p 
                    className="text-muted-foreground"
                    data-testid="text-visit-office-description"
                  >
                    Schedule a visit to our headquarters and meet our team in person. We'd love to show you our workspace and discuss your project over coffee.
                  </p>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="p-8">
                <CardContent className="p-0">
                  <h3 
                    className="text-xl font-bold mb-6"
                    data-testid="text-quick-actions-title"
                  >
                    Quick Actions
                  </h3>
                  <div className="space-y-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant={index === 0 ? "default" : "outline"}
                        className="w-full justify-center"
                        onClick={() => handleQuickAction(action.action)}
                        data-testid={`button-${action.action}`}
                      >
                        {action.icon}
                        {action.text}
                      </Button>
                    ))}
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
    </div>
  );
};

export default Contact;
