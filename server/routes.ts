import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { supabase } from "./supabase";
import { authenticateToken, generateToken, type AuthenticatedRequest } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // In a real application, you might send an email notification here
      console.log("New contact submission:", submission);
      
      res.json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you within one business day."
      });
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
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getNewsletterSubscriptionByEmail(validatedData.email);
      if (existing) {
        res.status(409).json({ 
          success: false, 
          message: "Email is already subscribed to our newsletter." 
        });
        return;
      }
      
      const subscription = await storage.createNewsletterSubscription(validatedData);
      
      // In a real application, you might add the email to a mailing list service here
      console.log("New newsletter subscription:", subscription);
      
      res.json({ 
        success: true, 
        message: "Successfully subscribed to our newsletter!"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid email address", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to subscribe to newsletter" 
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
        console.error('Supabase signup error:', error);
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
      const hashedPassword = await bcrypt.hash(validatedData.password, 12);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword, // Keep local backup for username lookup
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
    } catch (error) {
      console.error('Signup error:', error);
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
          message: "Username and password are required" 
        });
        return;
      }
      
      // Find user by username to get email
      const user = await storage.getUserByUsername(username);
      if (!user) {
        res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
        return;
      }

      // Authenticate with Supabase using email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: password,
      });

      if (error || !data.user) {
        console.error('Supabase login error:', error);
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
    } catch (error) {
      console.error('Login error:', error);
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
      console.error('Get user error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get user information" 
      });
    }
  });

  // Logout user
  app.post("/api/auth/logout", authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase logout error:', error);
      }

      res.json({ 
        success: true, 
        message: "Logged out successfully" 
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to logout" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
