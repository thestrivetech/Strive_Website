import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";

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
      
      // Check if username already exists
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
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      res.json({ 
        success: true, 
        message: "Account created successfully",
        user: { id: user.id, username: user.username }
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
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
        return;
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
        return;
      }
      
      res.json({ 
        success: true, 
        message: "Login successful",
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to login" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
