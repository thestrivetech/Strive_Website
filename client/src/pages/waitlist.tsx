import { useState } from "react";
import { Send, CheckCircle2, Sparkles, Rocket, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { MetaTags } from "@/components/seo/meta-tags";
import { useSEO } from "@/hooks/use-seo";

/**
 * Waitlist page for SAI Platform early access
 * MVP stage - users request demo/meeting to discuss pricing
 */
export default function Waitlist() {
  const { toast } = useToast();
  const { seoConfig } = useSEO();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    companySize: "",
    message: "",
    privacyConsent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.privacyConsent) {
      toast({
        title: "Privacy Consent Required",
        description: "Please accept our privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        toast({
          title: "Welcome to the Waitlist!",
          description: "We'll be in touch soon to schedule your demo.",
        });
      } else {
        toast({
          title: "Submission Failed",
          description:
            data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      toast({
        title: "Network Error",
        description:
          "Unable to submit. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <MetaTags
          seo={{
            ...seoConfig,
            title: "You're on the List! | SAI Platform Waitlist",
            description:
              "Thank you for joining the SAI Platform waitlist. We'll contact you soon to schedule your personalized demo.",
          }}
        />
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center px-4 pt-24 pb-12">
          <Card className="max-w-2xl w-full shadow-2xl border-primary/20">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                You're on the List!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your interest in SAI Platform. Our team will
                reach out within 1-2 business days to schedule your
                personalized demo and discuss how SAI can transform your real
                estate business.
              </p>
              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-3">
                  What happens next?
                </h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      You'll receive a confirmation email with next steps
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Our team will contact you to schedule your demo
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      We'll discuss pricing and how SAI fits your needs
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/platform")}
                  className="min-h-[44px]"
                >
                  Learn More About SAI
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                  className="min-h-[44px]"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <MetaTags
        seo={{
          ...seoConfig,
          title: "Join the Waitlist | SAI Platform Early Access",
          description:
            "Request early access to SAI Platform - the all-in-one real estate CRM built for modern agents. Get a personalized demo and discover how SAI can transform your business.",
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Early Access - Limited Spots Available
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Join the SAI Platform Waitlist
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Be among the first real estate agents to experience the future of
              CRM. Request your personalized demo and see how SAI Platform can
              transform your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-primary" />
                    What You Get
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Personalized Demo
                      </p>
                      <p className="text-sm text-muted-foreground">
                        1-on-1 walkthrough tailored to your business
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Early Access Pricing
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Special rates for waitlist members
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Priority Support
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Dedicated onboarding and training
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Shape the Product
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your feedback helps us build features you need
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-lg bg-muted/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <p className="font-semibold text-foreground">
                      Join 5,000+ Agents
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Real estate professionals already using SAI Platform to
                    close more deals and save 10+ hours per week.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Form */}
            <Card className="lg:col-span-2 shadow-2xl border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Request Early Access</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll contact you within 1-2
                  business days to schedule your demo.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        First Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="min-h-[44px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Last Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        className="min-h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@example.com"
                      required
                      className="min-h-[44px]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="min-h-[44px]"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Brokerage/Company Name
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="ABC Realty"
                      className="min-h-[44px]"
                    />
                  </div>

                  {/* Company Size */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Team Size
                    </label>
                    <Input
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      placeholder="e.g., Solo agent, 5-10 agents, 50+ agents"
                      className="min-h-[44px]"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      What are you looking for in a CRM?
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your current workflow, pain points, or specific features you need..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {/* Privacy Consent */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacyConsent"
                      checked={formData.privacyConsent}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          privacyConsent: checked === true,
                        }))
                      }
                      className="mt-1"
                    />
                    <label
                      htmlFor="privacyConsent"
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      I agree to receive communications from SAI Platform and
                      understand that I can unsubscribe at any time.{" "}
                      <span className="text-destructive">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full min-h-[44px] text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Join Waitlist
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to our privacy policy.
                    We respect your privacy and will never share your
                    information.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
