const Cookies = () => {
  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="text-cookies-title">
              Cookie Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files that are placed on your device when you visit our website. 
                  They help us provide you with a better user experience by remembering your preferences 
                  and improving our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
                <div className="text-muted-foreground mb-4">
                  <p className="mb-2"><strong>Essential Cookies:</strong> Required for basic website functionality</p>
                  <p className="mb-2"><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</p>
                  <p className="mb-2"><strong>Preference Cookies:</strong> Remember your settings and preferences</p>
                  <p className="mb-2"><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Managing Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  You can control and manage cookies through your browser settings. Please note that 
                  disabling certain cookies may affect the functionality of our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  We may use third-party services that set cookies on your device. These services have 
                  their own privacy policies and cookie practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about our Cookie Policy, please contact us at 
                  <a href="mailto:privacy@strive.com" className="text-primary hover:underline ml-1">
                    privacy@strive.com
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

export default Cookies;