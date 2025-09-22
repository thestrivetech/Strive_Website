import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, MemStorage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema, insertUserSchema, insertRequestSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { supabase, db } from "./supabase";
import { authenticateToken, generateToken, type AuthenticatedRequest } from "./auth";
import { emailService } from "./services/email";
import { sql } from "drizzle-orm";
import { log } from "./lib/logger";
import { sitemapRouter } from "./routes/sitemap";
import analyticsRouter from "./routes/analytics";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for production monitoring
  app.get("/api/health/database", async (req, res) => {
    const checks = {
      supabase_configured: !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
      database_url_configured: !!process.env.DATABASE_URL,
      storage_type: storage.constructor.name === 'SupabaseStorage' ? 'supabase' : 'memory',
      connection_test: false
    };

    if (storage.constructor.name === 'SupabaseStorage') {
      try {
        await storage.getContactSubmissions();
        checks.connection_test = true;
      } catch (error) {
        checks.connection_test = false;
      }
    }

    const healthy = checks.supabase_configured && checks.connection_test;

    res.status(healthy ? 200 : 503).json({
      healthy,
      checks,
      timestamp: new Date().toISOString()
    });
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    log.debug('Contact form submission received', {
      body: req.body,
      privacyConsent: {
        value: req.body.privacyConsent,
        type: typeof req.body.privacyConsent
      }
    });

    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      log.debug('Contact form data validated successfully', {
        privacyConsent: validatedData.privacyConsent,
        privacyConsentType: typeof validatedData.privacyConsent
      });

      // Store submission in database (if available)
      let databaseStored = true;
      try {
        await storage.createContactSubmission(validatedData);
        log.database('Contact form stored successfully');
      } catch (dbError) {
        databaseStored = false;
        log.warn('Database unavailable, continuing without storing submission', dbError);
      }

      // Send email notifications to all recipients (if email service is configured)
      try {
        const emailSent = await emailService.sendContactFormNotification(validatedData);
        if (!emailSent) {
          log.email('Contact form notification not sent - email service not configured', false);
        } else {
          log.email('Contact form notification email sent successfully', true);
        }
      } catch (emailError) {
        log.email('Email sending failed', false, emailError);
      }

      // Send confirmation email to user
      try {
        const confirmationSent = await emailService.sendContactFormConfirmation(validatedData);
        if (!confirmationSent) {
          log.email('Contact form confirmation email could not be sent', false);
        } else {
          log.email('Contact form confirmation email sent successfully', true);
        }
      } catch (confirmationError) {
        log.email('Contact form confirmation email failed', false, confirmationError);
      }

      res.json({
        success: true,
        message: databaseStored 
          ? "Thank you for your message. We'll get back to you within one business day."
          : "Thank you for your message. We'll get back to you within one business day. Note: Your message was sent but there was a temporary database issue.",
        databaseStored
      });
    } catch (error) {
      log.error('Contact form submission error', error);
      if (error instanceof z.ZodError) {
        log.error('Validation errors', error.errors);
        res.status(400).json({
          success: false,
          message: "Invalid form data - please check all required fields",
          errors: error.errors,
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to submit contact form. Please try again or contact us directly."
        });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if email already exists (if database is available)
      try {
        const existing = await storage.getNewsletterSubscriptionByEmail(validatedData.email);
        if (existing) {
          res.status(409).json({ 
            success: false, 
            message: "Email is already subscribed to our newsletter." 
          });
          return;
        }
        
        // Store subscription in database
        await storage.createNewsletterSubscription(validatedData);
      } catch (dbError) {
        log.warn('Database unavailable for newsletter subscription', dbError);
      }
      
      // Send confirmation email to subscriber (if email service is configured)
      try {
        const emailSent = await emailService.sendNewsletterConfirmation(validatedData.email);
        if (!emailSent) {
          log.email('Newsletter confirmation not sent - email service not configured', false);
        }
      } catch (emailError) {
        log.email('Newsletter confirmation email failed', false, emailError);
      }
      
      res.json({ 
        success: true, 
        message: "Successfully subscribed to our newsletter!"
      });
    } catch (error) {
      log.error('Newsletter subscription error', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid email address", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to subscribe to newsletter. Please try again."
        });
      }
    }
  });

  // Demo/Showcase request submission
  app.post("/api/request", async (req, res) => {
    try {
      const validatedData = insertRequestSchema.parse(req.body);
      
      // Store request in database (if available)
      let databaseStored = true;
      try {
        await storage.createRequest(validatedData);
      } catch (dbError) {
        databaseStored = false;
        log.warn('Database unavailable, continuing without storing request', dbError);
      }
      
      // Send email notifications to team (if email service is configured)
      try {
        const emailSent = await emailService.sendRequestNotification(validatedData);
        if (!emailSent) {
          log.email('Request notification not sent - email service not configured', false);
        }
      } catch (emailError) {
        log.email('Request notification email failed', false, emailError);
      }

      // Send confirmation email to user
      try {
        const confirmationSent = await emailService.sendRequestConfirmation(validatedData);
        if (!confirmationSent) {
          log.email('Request confirmation email could not be sent', false);
        }
      } catch (confirmationError) {
        log.email('Request confirmation email failed', false, confirmationError);
      }
      
      res.json({ 
        success: true, 
        message: databaseStored
          ? "Thank you for your request! We'll contact you within one business day to schedule your demo."
          : "Thank you for your request! We'll contact you within one business day to schedule your demo. Note: Your request was sent but there was a temporary database issue.",
        databaseStored
      });
    } catch (error) {
      log.error('Request submission error', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit request. Please try again or contact us directly."
        });
      }
    }
  });

  // Get contact submissions (admin endpoint)
  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact submissions" 
      });
    }
  });

  // Get newsletter subscriptions (admin endpoint)
  app.get("/api/admin/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch newsletter subscriptions" 
      });
    }
  });

  // Email service debug endpoint
  app.get("/api/debug/email", async (req, res) => {
    try {
      console.log('🔍 Email service debug endpoint called');

      // Check if email service is initialized
      const isConnected = await emailService.verifyConnection();

      // Try sending a test email
      let testEmailResult = null;
      if (isConnected) {
        console.log('🧪 Attempting to send test email...');
        testEmailResult = await emailService.sendEmail({
          to: ['grantramey@strivetech.ai'],
          subject: 'Email Service Debug Test',
          html: `
            <h2>Email Service Debug Test</h2>
            <p>This is a test email sent from the debug endpoint at ${new Date().toISOString()}</p>
            <p>If you receive this, the email service is working correctly in production!</p>
          `
        });
      }

      res.json({
        success: true,
        emailService: {
          initialized: !!emailService,
          connectionVerified: isConnected,
          testEmailSent: testEmailResult,
          smtpConfig: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            user: process.env.SMTP_USER,
            from: process.env.SMTP_FROM,
            passConfigured: !!process.env.SMTP_PASS
          }
        }
      });
    } catch (error) {
      console.error('❌ Email debug endpoint error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        emailService: {
          initialized: !!emailService,
          smtpConfig: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            user: process.env.SMTP_USER,
            from: process.env.SMTP_FROM,
            passConfigured: !!process.env.SMTP_PASS
          }
        }
      });
    }
  });

  // Get all requests (admin endpoint) - Demo, Assessment, Solution Showcase
  app.get("/api/admin/requests", async (req, res) => {
    try {
      const requests = await storage.getRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch requests"
      });
    }
  });

  // Database health check endpoint
  app.get("/api/health/database", async (req, res) => {
    try {
      // Test basic database connectivity
      const healthCheck = {
        timestamp: new Date().toISOString(),
        database: {
          connected: false,
          type: 'unknown',
          tables: [] as string[],
          error: null as string | null
        },
        supabase: {
          configured: false,
          url: null as string | null
        }
      };

      // Check Supabase configuration
      if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        healthCheck.supabase.configured = true;
        healthCheck.supabase.url = process.env.SUPABASE_URL;
      }

      // Test database connection by querying information schema
      try {
        // Use raw SQL to check table existence
        const tablesResult = await db.execute(sql`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
          ORDER BY table_name
        `);

        healthCheck.database.connected = true;
        healthCheck.database.type = process.env.DATABASE_URL ? 'postgresql' : 'memory';
        healthCheck.database.tables = Array.isArray(tablesResult)
          ? tablesResult.map((row: any) => row.table_name)
          : [];

      } catch (dbError) {
        healthCheck.database.error = dbError instanceof Error ? dbError.message : 'Unknown database error';

        // Fallback check - if using memory storage, it's still "healthy"
        if (storage instanceof MemStorage) {
          healthCheck.database.connected = true;
          healthCheck.database.type = 'memory';
          healthCheck.database.tables = ['memory_storage'];
        }
      }

      const statusCode = healthCheck.database.connected ? 200 : 503;
      res.status(statusCode).json(healthCheck);

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Health check failed",
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  });

  // User signup
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if username already exists in our database
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        res.status(409).json({ 
          success: false, 
          message: "Username already exists" 
        });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 12);
      
      if (supabase) {
        // Create user with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email: validatedData.email,
          password: validatedData.password,
          options: {
            data: {
              username: validatedData.username,
            }
          }
        });

        if (error) {
          res.status(400).json({ 
            success: false, 
            message: error.message || "Failed to create account" 
          });
          return;
        }

        if (!data.user) {
          res.status(400).json({ 
            success: false, 
            message: "Failed to create user" 
          });
          return;
        }

        // Store user info in our database for username lookup
        const user = await storage.createUser({
          ...validatedData,
          password: hashedPassword,
        });
        
        res.json({ 
          success: true, 
          message: "Account created successfully! Please check your email for verification.",
          user: { 
            id: data.user.id, 
            username: validatedData.username,
            email: validatedData.email,
            emailVerified: data.user.email_confirmed_at ? "true" : "false"
          }
        });
      } else {
        // Use local database only
        const user = await storage.createUser({
          ...validatedData,
          password: hashedPassword,
        });
        
        res.json({ 
          success: true, 
          message: "Account created successfully!",
          user: { 
            id: user.id, 
            username: user.username,
            email: user.email,
            emailVerified: "true" // Local accounts are auto-verified
          }
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create account" 
        });
      }
    }
  });

  // User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        res.status(400).json({ 
          success: false, 
          message: "Username or email and password are required" 
        });
        return;
      }
      
      // Find user by username or email
      const user = await storage.getUserByUsernameOrEmail(username);
      if (!user) {
        res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
        return;
      }

      if (supabase) {
        // Authenticate with Supabase using email
        const { data, error } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: password,
        });

        if (error || !data.user) {
          res.status(401).json({ 
            success: false, 
            message: "Invalid credentials" 
          });
          return;
        }

        // Generate JWT token for client
        const token = generateToken({
          id: data.user.id,
          email: data.user.email || '',
          username: user.username
        });
        
        res.json({ 
          success: true, 
          message: "Login successful",
          user: { 
            id: data.user.id, 
            username: user.username, 
            email: data.user.email,
            emailVerified: data.user.email_confirmed_at ? "true" : "false"
          },
          token: token,
          session: data.session
        });
      } else {
        // Use local authentication with bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          res.status(401).json({ 
            success: false, 
            message: "Invalid credentials" 
          });
          return;
        }

        // Generate JWT token for client
        const token = generateToken({
          id: user.id,
          email: user.email,
          username: user.username
        });
        
        res.json({ 
          success: true, 
          message: "Login successful",
          user: { 
            id: user.id, 
            username: user.username, 
            email: user.email,
            emailVerified: user.emailVerified
          },
          token: token
        });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to login" 
      });
    }
  });

  // Get current user (protected route)
  app.get("/api/auth/me", authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        res.status(401).json({ 
          success: false, 
          message: "User not authenticated" 
        });
        return;
      }

      // Get user details from our database
      const user = await storage.getUserByUsername(req.user.username);
      if (!user) {
        res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
        return;
      }

      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to get user information" 
      });
    }
  });

  // Logout user
  app.post("/api/auth/logout", authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
      if (supabase) {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          // Supabase logout error handled silently
        }
      }

      res.json({ 
        success: true, 
        message: "Logged out successfully" 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to logout" 
      });
    }
  });

  // Email template testing and preview endpoints
  app.get("/api/debug/email-templates", async (req, res) => {
    try {
      const availableTemplates = emailService.getTemplateEngine().getAvailableTemplates();
      const serviceStatus = emailService.getServiceStatus();

      res.json({
        success: true,
        availableTemplates,
        serviceStatus,
        message: "Email template debug information"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get email template debug info",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get("/api/debug/email-preview/:type", async (req, res) => {
    try {
      const { type } = req.params;

      // Sample data for different template types
      const sampleData: { [key: string]: any } = {
        'contact-form-confirmation': {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@techcorp.com',
          company: 'TechCorp Solutions',
          companySize: '100-500 employees',
          jobTitle: 'Chief Technology Officer',
          phone: '+1 (555) 123-4567',
          message: 'We are interested in implementing AI automation solutions for our customer service department. We currently handle 500+ inquiries daily and need a scalable solution.'
        },
        'contact-form-notification': {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@techcorp.com',
          company: 'TechCorp Solutions',
          companySize: '100-500 employees',
          jobTitle: 'Chief Technology Officer',
          phone: '+1 (555) 123-4567',
          message: 'We are interested in implementing AI automation solutions for our customer service department. We currently handle 500+ inquiries daily and need a scalable solution.'
        },
        'newsletter-confirmation': {
          email: 'subscriber@example.com',
          firstName: 'Sarah',
          interests: ['AI Automation', 'Data Analytics', 'Business Intelligence'],
          source: 'Website signup'
        },
        'service-request-confirmation': {
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.johnson@enterprise.com',
          company: 'Enterprise Analytics Corp',
          serviceType: 'AI Automation Implementation',
          timeline: '3-6 months',
          budget: '$100,000+',
          projectDescription: 'We need comprehensive AI automation across customer service, data analysis, and reporting systems.'
        },
        'service-request-notification': {
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.johnson@enterprise.com',
          company: 'Enterprise Analytics Corp',
          companySize: '500+ employees',
          jobTitle: 'Chief Technology Officer',
          phone: '+1 (555) 987-6543',
          serviceType: 'AI Automation Implementation',
          timeline: '3-6 months',
          budget: '$100,000+',
          projectDescription: 'We need comprehensive AI automation across customer service, data analysis, and reporting systems.',
          currentSoftware: 'Salesforce, Microsoft Dynamics, Custom Python scripts',
          desiredOutcomes: 'Reduce customer response time by 60%, automate 80% of routine processing'
        }
      };

      const templateData = sampleData[type];
      if (!templateData) {
        return res.status(400).json({
          success: false,
          message: `No sample data available for template type: ${type}`,
          availableTypes: Object.keys(sampleData)
        });
      }

      console.log(`🔍 Preview request for template: ${type}`);
      const result = await emailService.getTemplateEngine().renderTemplate(type as any, templateData);

      if (result.success) {
        res.setHeader('Content-Type', 'text/html');
        res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Email Preview: ${type}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .preview-info { background: #f0f0f0; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .email-content { border: 2px solid #ddd; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="preview-info">
        <h2>📧 Email Template Preview: ${type}</h2>
        <p><strong>Subject:</strong> ${result.subject}</p>
        <p><strong>Success:</strong> ${result.success ? '✅ Yes' : '❌ No'}</p>
        ${result.error ? `<p><strong>Error:</strong> ${result.error}</p>` : ''}
        <p><strong>HTML Length:</strong> ${result.html.length} characters</p>
        <p><strong>Text Length:</strong> ${result.text?.length || 0} characters</p>
    </div>
    <div class="email-content">
        ${result.html}
    </div>
</body>
</html>
        `);
      } else {
        res.status(500).json({
          success: false,
          message: "Template rendering failed",
          error: result.error,
          subject: result.subject
        });
      }
    } catch (error) {
      console.error('❌ Preview endpoint error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to preview email template",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Analytics routes
  app.use("/api/analytics", analyticsRouter);

  // SEO and Sitemap routes
  app.use("/api", sitemapRouter);

  const httpServer = createServer(app);
  return httpServer;
}

  // Database connection verification
  const checkDatabaseConnection = async () => {
    if (!process.env.DATABASE_URL && !process.env.SUPABASE_URL) {
      console.error('⚠️ DATABASE NOT CONFIGURED - Data will not persist! Forms will work but data is lost on restart.');
      console.error('   Add DATABASE_URL or SUPABASE_URL to environment variables for persistent storage.');
      return false;
    }
    
    try {
      // Test connection by attempting to query a table
      await storage.getContactSubmissions();
      console.log('✅ Supabase database connection verified - Data will persist');
      return true;
    } catch (error) {
      console.error('❌ Supabase connection failed - Using memory storage (data lost on restart):', error);
      return false;
    }
  };

  // Verify database connection on startup
  await checkDatabaseConnection();
