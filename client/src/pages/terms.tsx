const Terms = () => {
  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="text-terms-title">
              Terms of Service
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using Strive's services, you accept and agree to be bound by these 
                  Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
                <p className="text-muted-foreground mb-4">
                  You agree to use our services only for lawful purposes and in accordance with these 
                  Terms. You are prohibited from using our services to transmit harmful, offensive, 
                  or illegal content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  All content, features, and functionality on our platform are owned by Strive and are 
                  protected by copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  Strive shall not be liable for any indirect, incidental, special, consequential, or 
                  punitive damages resulting from your use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify these terms at any time. We will notify you of any 
                  material changes by posting the new Terms of Service on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, please contact us at 
                  <a href="mailto:legal@strive.com" className="text-primary hover:underline ml-1">
                    legal@strive.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;