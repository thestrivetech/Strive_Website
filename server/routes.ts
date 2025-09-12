import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema, insertUserSchema, insertDemoRequestSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { supabase } from "./supabase";
import { authenticateToken, generateToken, type AuthenticatedRequest } from "./auth";
import { emailService } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store submission in database (if available)
      try {
        await storage.createContactSubmission(validatedData);
      } catch (dbError) {
        console.warn('Database unavailable, continuing without storing submission:', dbError);
      }
      
      // Send email notifications to all recipients (if email service is configured)
      try {
        const emailSent = await emailService.sendContactFormNotification(validatedData);
        if (!emailSent) {
          console.warn('Email service not configured - contact form submission not sent via email');
        }
      } catch (emailError) {
        console.warn('Email sending failed:', emailError);
      }

      // Send confirmation email to user
      try {
        const confirmationSent = await emailService.sendContactFormConfirmation(validatedData);
        if (!confirmationSent) {
          console.warn('Contact form confirmation email could not be sent');
        }
      } catch (confirmationError) {
        console.warn('Contact form confirmation email failed:', confirmationError);
      }
      
      res.json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you within one business day."
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
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
        console.warn('Database unavailable for newsletter subscription:', dbError);
      }
      
      // Send confirmation email to subscriber (if email service is configured)
      try {
        const emailSent = await emailService.sendNewsletterConfirmation(validatedData.email);
        if (!emailSent) {
          console.warn('Email service not configured - newsletter confirmation not sent');
        }
      } catch (emailError) {
        console.warn('Newsletter confirmation email failed:', emailError);
      }
      
      res.json({ 
        success: true, 
        message: "Successfully subscribed to our newsletter!"
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
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
      const validatedData = insertDemoRequestSchema.parse(req.body);
      
      // Store request in database (if available)
      try {
        await storage.createDemoRequest(validatedData);
      } catch (dbError) {
        console.warn('Database unavailable, continuing without storing demo request:', dbError);
      }
      
      // Send email notifications to team (if email service is configured)
      try {
        const emailSent = await emailService.sendRequestNotification(validatedData);
        if (!emailSent) {
          console.warn('Email service not configured - request notification not sent via email');
        }
      } catch (emailError) {
        console.warn('Request notification email failed:', emailError);
      }

      // Send confirmation email to user
      try {
        const confirmationSent = await emailService.sendRequestConfirmation(validatedData);
        if (!confirmationSent) {
          console.warn('Request confirmation email could not be sent');
        }
      } catch (confirmationError) {
        console.warn('Request confirmation email failed:', confirmationError);
      }
      
      res.json({ 
        success: true, 
        message: "Thank you for your request! We'll contact you within one business day to schedule your demo."
      });
    } catch (error) {
      console.error('Demo request submission error:', error);
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

  const httpServer = createServer(app);
  return httpServer;
}
