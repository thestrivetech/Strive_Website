// server/index.ts
import dotenv2 from "dotenv";
import express3 from "express";
import compression from "compression";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  emailVerified: text("email_verified").notNull().default("false"),
  verificationToken: text("verification_token"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone"),
  companySize: text("company_size"),
  message: text("message").notNull(),
  privacyConsent: text("privacy_consent").notNull().default("false"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull()
});
var newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull()
});
var requests = pgTable("requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // Contact Information
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company").notNull(),
  jobTitle: text("job_title"),
  // Business Information
  industry: text("industry"),
  companySize: text("company_size"),
  currentChallenges: text("current_challenges"),
  // JSON array as text
  projectTimeline: text("project_timeline"),
  budgetRange: text("budget_range"),
  // Request Information
  requestTypes: text("request_types").notNull(),
  // Comma-separated: 'demo,showcase,assessment'
  demoFocusAreas: text("demo_focus_areas"),
  // JSON array as text
  additionalRequirements: text("additional_requirements"),
  preferredDate: text("preferred_date"),
  // Status and Assignment (Production Features)
  status: text("status").notNull().default("pending"),
  // pending, contacted, scheduled, completed, cancelled
  assignedTo: text("assigned_to"),
  // Team member assigned to handle this request
  priority: text("priority").notNull().default("normal"),
  // low, normal, high, urgent
  // Audit Trail
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  contactedAt: timestamp("contacted_at"),
  // When first contact was made
  scheduledAt: timestamp("scheduled_at"),
  // When meeting/demo was scheduled
  completedAt: timestamp("completed_at"),
  // When request was completed
  // Soft Delete Support
  deletedAt: timestamp("deleted_at"),
  // For GDPR compliance and data recovery
  deletedBy: text("deleted_by"),
  // Who deleted the record
  // Analytics and Tracking
  source: text("source").notNull().default("website"),
  // website, referral, social, etc.
  utm: text("utm_data"),
  // UTM parameters as JSON for tracking
  ipAddress: text("ip_address"),
  // For security and analytics
  userAgent: text("user_agent")
  // Browser/device info
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  firstName: true,
  lastName: true,
  email: true,
  company: true,
  phone: true,
  companySize: true,
  message: true,
  privacyConsent: true
}).extend({
  // Allow boolean values for privacyConsent and transform to string
  privacyConsent: z.union([z.boolean(), z.string()]).transform((val) => String(val))
});
var insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).pick({
  email: true
});
var insertRequestSchema = createInsertSchema(requests).pick({
  firstName: true,
  lastName: true,
  fullName: true,
  email: true,
  phone: true,
  company: true,
  jobTitle: true,
  industry: true,
  companySize: true,
  currentChallenges: true,
  projectTimeline: true,
  budgetRange: true,
  requestTypes: true,
  demoFocusAreas: true,
  additionalRequirements: true,
  preferredDate: true
});

// server/storage.ts
import { randomUUID } from "crypto";

// server/supabase.ts
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
dotenv.config();
var supabase = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null;
var databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl || databaseUrl.includes("[PROJECT-ID]") || databaseUrl.includes("[DB-PASSWORD]")) {
  if (!process.env.SUPABASE_URL) {
    throw new Error("Either DATABASE_URL or SUPABASE_URL is required for database connection");
  }
  const projectId = process.env.SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (!projectId) {
    throw new Error("Could not extract project ID from SUPABASE_URL");
  }
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  databaseUrl = `postgresql://postgres.${projectId}:${serviceKey}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
}
var client = postgres(databaseUrl);
var db = drizzle(client);

// server/storage.ts
import { eq } from "drizzle-orm";
var MemStorage = class {
  users;
  contactSubmissions;
  newsletterSubscriptions;
  requests;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.newsletterSubscriptions = /* @__PURE__ */ new Map();
    this.requests = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  async getUserByUsernameOrEmail(usernameOrEmail) {
    return Array.from(this.users.values()).find(
      (user) => user.username === usernameOrEmail || user.email === usernameOrEmail
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = {
      ...insertUser,
      id,
      emailVerified: "false",
      verificationToken: null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    return user;
  }
  async createContactSubmission(insertSubmission) {
    const id = randomUUID();
    const submission = {
      ...insertSubmission,
      phone: insertSubmission.phone || null,
      companySize: insertSubmission.companySize || null,
      privacyConsent: insertSubmission.privacyConsent || "false",
      id,
      submittedAt: /* @__PURE__ */ new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values());
  }
  async createNewsletterSubscription(insertSubscription) {
    const id = randomUUID();
    const subscription = {
      ...insertSubscription,
      id,
      subscribedAt: /* @__PURE__ */ new Date()
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }
  async getNewsletterSubscriptions() {
    return Array.from(this.newsletterSubscriptions.values());
  }
  async getNewsletterSubscriptionByEmail(email) {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (subscription) => subscription.email === email
    );
  }
  async createRequest(insertRequest) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const request = {
      ...insertRequest,
      id,
      phone: insertRequest.phone || null,
      jobTitle: insertRequest.jobTitle || null,
      industry: insertRequest.industry || null,
      companySize: insertRequest.companySize || null,
      currentChallenges: insertRequest.currentChallenges || null,
      projectTimeline: insertRequest.projectTimeline || null,
      budgetRange: insertRequest.budgetRange || null,
      demoFocusAreas: insertRequest.demoFocusAreas || null,
      additionalRequirements: insertRequest.additionalRequirements || null,
      preferredDate: insertRequest.preferredDate || null,
      // Production fields
      status: "pending",
      assignedTo: null,
      priority: "normal",
      submittedAt: now,
      updatedAt: now,
      contactedAt: null,
      scheduledAt: null,
      completedAt: null,
      deletedAt: null,
      deletedBy: null,
      source: "website",
      utm: null,
      ipAddress: null,
      userAgent: null
    };
    this.requests.set(id, request);
    return request;
  }
  async getRequests() {
    return Array.from(this.requests.values());
  }
};
var SupabaseStorage = class {
  async getUser(id) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }
  async getUserByUsername(username) {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }
  async getUserByEmail(email) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }
  async getUserByUsernameOrEmail(usernameOrEmail) {
    const result = await db.select().from(users).where(
      eq(users.username, usernameOrEmail)
    ).limit(1);
    if (result[0]) {
      return result[0];
    }
    const emailResult = await db.select().from(users).where(
      eq(users.email, usernameOrEmail)
    ).limit(1);
    return emailResult[0];
  }
  async createUser(insertUser) {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  async createContactSubmission(insertSubmission) {
    const result = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return result[0];
  }
  async getContactSubmissions() {
    return await db.select().from(contactSubmissions);
  }
  async createNewsletterSubscription(insertSubscription) {
    const result = await db.insert(newsletterSubscriptions).values(insertSubscription).returning();
    return result[0];
  }
  async getNewsletterSubscriptions() {
    return await db.select().from(newsletterSubscriptions);
  }
  async getNewsletterSubscriptionByEmail(email) {
    const result = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email)).limit(1);
    return result[0];
  }
  async createRequest(insertRequest) {
    const result = await db.insert(requests).values(insertRequest).returning();
    return result[0];
  }
  async getRequests() {
    return await db.select().from(requests);
  }
};
var storage = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? new SupabaseStorage() : new MemStorage();

// server/routes.ts
import { z as z2 } from "zod";
import bcrypt from "bcrypt";

// server/auth.ts
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key";
var authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required"
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username
    };
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid token"
    });
  }
};
var generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// server/email.ts
import nodemailer from "nodemailer";
var EmailService = class {
  transporter = null;
  constructor() {
    this.initializeTransporter();
  }
  initializeTransporter() {
    console.log("\u{1F527} Initializing email service...");
    const emailConfig = {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || ""
      }
    };
    console.log(`\u{1F4E7} Email config: ${emailConfig.host}:${emailConfig.port} | User: ${emailConfig.auth.user} | Secure: ${emailConfig.secure}`);
    console.log(`\u{1F511} Auth configured: User=${!!emailConfig.auth.user} | Pass=${!!emailConfig.auth.pass} (${emailConfig.auth.pass.length} chars)`);
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        this.transporter = nodemailer.createTransporter(emailConfig);
        console.log("\u2705 Email transporter created successfully");
        this.verifyConnection().catch((error) => {
          console.error("\u274C Email connection verification failed during initialization:", error);
        });
      } catch (error) {
        console.error("\u274C Failed to create email transporter:", error);
        this.transporter = null;
      }
    } else {
      console.warn("\u26A0\uFE0F Email service not configured. Missing SMTP_USER or SMTP_PASS environment variables.");
      console.log(`   SMTP_USER present: ${!!process.env.SMTP_USER}`);
      console.log(`   SMTP_PASS present: ${!!process.env.SMTP_PASS}`);
    }
  }
  async sendEmail(options, retries = 3) {
    console.log(`\u{1F4E4} Attempting to send email to: ${options.to.join(", ")} | Subject: "${options.subject}"`);
    if (!this.transporter) {
      console.error("\u274C Email not sent - email service not configured or transporter is null");
      return false;
    }
    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@strivetech.ai",
      to: options.to.join(", "),
      subject: options.subject,
      text: options.text || options.html.replace(/<[^>]*>/g, ""),
      html: options.html
    };
    console.log(`\u{1F4E7} Mail options: From=${mailOptions.from} | To=${mailOptions.to}`);
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`\u{1F504} Email send attempt ${attempt}/${retries}...`);
        const info = await this.transporter.sendMail(mailOptions);
        console.log(`\u2705 Email sent successfully to: ${options.to.join(", ")} (attempt ${attempt})`);
        console.log(`\u{1F4C4} Message info:`, {
          messageId: info.messageId,
          response: info.response,
          accepted: info.accepted,
          rejected: info.rejected
        });
        return true;
      } catch (error) {
        console.error(`\u274C Email sending failed on attempt ${attempt}:`, error);
        if (error instanceof Error) {
          console.error(`   Error name: ${error.name}`);
          console.error(`   Error message: ${error.message}`);
          if ("code" in error) console.error(`   Error code: ${error.code}`);
          if ("command" in error) console.error(`   SMTP command: ${error.command}`);
        }
        if (attempt === retries) {
          console.error(`\u{1F4A5} Failed to send email after ${retries} attempts to: ${options.to.join(", ")}`);
          return false;
        }
        const waitTime = Math.pow(2, attempt - 1) * 1e3;
        console.log(`\u23F3 Retrying email send in ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
    return false;
  }
  async verifyConnection() {
    if (!this.transporter) {
      console.warn("\u26A0\uFE0F Cannot verify email connection - transporter not configured");
      return false;
    }
    try {
      console.log("\u{1F50D} Verifying SMTP connection...");
      await this.transporter.verify();
      console.log("\u2705 Email service connection verified successfully");
      return true;
    } catch (error) {
      console.error("\u274C Email service connection verification failed:", error);
      if (error instanceof Error) {
        console.error(`   Verification error: ${error.name}: ${error.message}`);
        if ("code" in error) console.error(`   Error code: ${error.code}`);
        if ("errno" in error) console.error(`   Error number: ${error.errno}`);
        if ("syscall" in error) console.error(`   System call: ${error.syscall}`);
        if ("hostname" in error) console.error(`   Hostname: ${error.hostname}`);
      }
      return false;
    }
  }
  async sendContactFormNotification(formData) {
    const recipients = [
      "garrettholland@strivetech.ai",
      "jeffmeyer@strivetech.ai",
      "grantramey@strivetech.ai",
      "contact@strivetech.ai"
    ];
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Company:</strong> ${formData.company || "Not provided"}</p>
          <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
          <p><strong>Company Size:</strong> ${formData.companySize || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 3px;">${formData.message}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This email was sent from the Strive Tech contact form.
        </p>
      </div>
    `;
    return await this.sendEmail({
      to: recipients,
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      html
    });
  }
  async sendNewsletterConfirmation(email) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">Welcome to Strive Tech Newsletter!</h2>
        <p>Thank you for subscribing to our newsletter. You'll receive updates about:</p>
        <ul>
          <li>Latest AI innovations and solutions</li>
          <li>Industry insights and best practices</li>
          <li>Exclusive offers and events</li>
        </ul>
        <p>If you have any questions, feel free to reach out to us at contact@strivetech.ai</p>
      </div>
    `;
    return await this.sendEmail({
      to: [email],
      subject: "Welcome to Strive Tech Newsletter",
      html
    });
  }
  async sendMeetingRequestNotification(requestData) {
    const recipients = [
      "garrettholland@strivetech.ai",
      "jeffmeyer@strivetech.ai",
      "grantramey@strivetech.ai",
      "contact@strivetech.ai"
    ];
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">New Meeting Request</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}</p>
          <p><strong>Email:</strong> ${requestData.email}</p>
          <p><strong>Company:</strong> ${requestData.company}</p>
          <p><strong>Phone:</strong> ${requestData.phone || "Not provided"}</p>
          <p><strong>Meeting Type:</strong> ${requestData.meetingType || "General"}</p>
          <p><strong>Preferred Date:</strong> ${requestData.preferredDate || "Not specified"}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 3px;">${requestData.message || "No additional message"}</p>
        </div>
      </div>
    `;
    return await this.sendEmail({
      to: recipients,
      subject: `New Meeting Request from ${requestData.firstName} ${requestData.lastName}`,
      html
    });
  }
  async sendContactFormConfirmation(formData) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">Thank You for Contacting Strive Tech!</h2>
        <p>Dear ${formData.firstName},</p>
        <p>Thank you for reaching out to us! We've received your message and will get back to you within one business day.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Message Details:</h3>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 3px;">${formData.message}</p>
        </div>

        <p>In the meantime, feel free to explore our <a href="https://strivetech.ai/solutions" style="color: #ff7033;">AI solutions</a> and learn more about how we can help transform your business.</p>
        
        <p>Best regards,<br>The Strive Tech Team</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated confirmation email. If you need immediate assistance, please call us directly.
        </p>
      </div>
    `;
    return await this.sendEmail({
      to: [formData.email],
      subject: "Thank you for contacting Strive Tech - We'll be in touch soon!",
      html
    });
  }
  async sendRequestConfirmation(requestData) {
    const requestTypes = requestData.requestTypes ? requestData.requestTypes.split(",") : [];
    const serviceList = requestTypes.map((type) => {
      switch (type) {
        case "demo":
          return "Product Demo";
        case "showcase":
          return "Solution Showcase";
        case "assessment":
          return "AI Assessment";
        default:
          return type;
      }
    }).join(", ");
    const currentChallenges = requestData.currentChallenges ? JSON.parse(requestData.currentChallenges) : [];
    const demoFocusAreas = requestData.demoFocusAreas ? JSON.parse(requestData.demoFocusAreas) : [];
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">Your Request is Confirmed!</h2>
        <p>Dear ${requestData.firstName || requestData.fullName.split(" ")[0]},</p>
        <p>Thank you for your interest in Strive Tech's AI solutions! We've received your request for <strong>${serviceList}</strong> and will contact you within one business day to schedule your sessions.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Request Details:</h3>
          <p><strong>Name:</strong> ${requestData.fullName}</p>
          <p><strong>Company:</strong> ${requestData.company}</p>
          <p><strong>Services Requested:</strong> ${serviceList}</p>
          ${requestData.industry ? `<p><strong>Industry:</strong> ${requestData.industry}</p>` : ""}
          ${requestData.companySize ? `<p><strong>Company Size:</strong> ${requestData.companySize}</p>` : ""}
          ${currentChallenges.length > 0 ? `<p><strong>Current Challenges:</strong> ${currentChallenges.join(", ")}</p>` : ""}
          ${demoFocusAreas.length > 0 ? `<p><strong>Focus Areas:</strong> ${demoFocusAreas.join(", ")}</p>` : ""}
          ${requestData.projectTimeline ? `<p><strong>Timeline:</strong> ${requestData.projectTimeline}</p>` : ""}
          ${requestData.additionalRequirements ? `<p><strong>Additional Requirements:</strong></p><p style="background-color: white; padding: 15px; border-radius: 3px;">${requestData.additionalRequirements}</p>` : ""}
        </div>

        <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; border-left: 4px solid #ff7033;">
          <h3 style="color: #333; margin-top: 0;">What to Expect:</h3>
          <ul style="margin: 10px 0;">
            <li>A team member will contact you within 24 hours to confirm details</li>
            <li>You'll receive calendar invites for all requested services</li>
            <li>Sessions will be tailored to your specific business needs and industry</li>
            ${requestTypes.includes("demo") ? "<li>Live product demonstrations of our AI solutions</li>" : ""}
            ${requestTypes.includes("showcase") ? "<li>Custom solution presentations based on your challenges</li>" : ""}
            ${requestTypes.includes("assessment") ? "<li>Comprehensive AI readiness evaluation and recommendations</li>" : ""}
          </ul>
        </div>
        
        <p>We're excited to show you how Strive Tech can help transform your business with cutting-edge AI solutions!</p>
        
        <p>Best regards,<br>The Strive Tech Team</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated confirmation email. If you have any questions or need to reschedule, please reply to this email.
        </p>
      </div>
    `;
    return await this.sendEmail({
      to: [requestData.email],
      subject: `Your ${serviceList} Request with Strive Tech - Confirmed!`,
      html
    });
  }
  async sendRequestNotification(requestData) {
    const recipients = [
      "garrettholland@strivetech.ai",
      "jeffmeyer@strivetech.ai",
      "grantramey@strivetech.ai",
      "contact@strivetech.ai"
    ];
    const requestTypes = requestData.requestTypes ? requestData.requestTypes.split(",") : [];
    const serviceList = requestTypes.map((type) => {
      switch (type) {
        case "demo":
          return "Product Demo";
        case "showcase":
          return "Solution Showcase";
        case "assessment":
          return "AI Assessment";
        default:
          return type;
      }
    }).join(", ");
    const currentChallenges = requestData.currentChallenges ? JSON.parse(requestData.currentChallenges) : [];
    const demoFocusAreas = requestData.demoFocusAreas ? JSON.parse(requestData.demoFocusAreas) : [];
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">New Service Request</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Services Requested:</strong> ${serviceList}</p>
          <p><strong>Name:</strong> ${requestData.fullName}</p>
          <p><strong>Email:</strong> ${requestData.email}</p>
          <p><strong>Phone:</strong> ${requestData.phone || "Not provided"}</p>
          <p><strong>Company:</strong> ${requestData.company}</p>
          <p><strong>Job Title:</strong> ${requestData.jobTitle || "Not provided"}</p>
          <p><strong>Industry:</strong> ${requestData.industry || "Not provided"}</p>
          <p><strong>Company Size:</strong> ${requestData.companySize || "Not provided"}</p>
          <p><strong>Timeline:</strong> ${requestData.projectTimeline || "Not specified"}</p>
          <p><strong>Budget:</strong> ${requestData.budgetRange || "Not specified"}</p>
          
          ${currentChallenges.length > 0 ? `
            <p><strong>Current Challenges:</strong></p>
            <ul>${currentChallenges.map((challenge) => `<li>${challenge}</li>`).join("")}</ul>
          ` : ""}
          
          ${demoFocusAreas.length > 0 ? `
            <p><strong>Focus Areas:</strong></p>
            <ul>${demoFocusAreas.map((area) => `<li>${area}</li>`).join("")}</ul>
          ` : ""}
          
          ${requestData.additionalRequirements ? `
            <p><strong>Additional Requirements:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 3px;">${requestData.additionalRequirements}</p>
          ` : ""}
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #ff7033;">
          <h3 style="color: #333; margin-top: 0;">Next Steps:</h3>
          <ul style="margin: 10px 0;">
            <li>Contact within 24 hours to schedule ${serviceList.toLowerCase()}</li>
            <li>Send calendar invites for all requested services</li>
            <li>Prepare materials based on their industry and challenges</li>
            ${requestTypes.includes("assessment") ? "<li>Schedule technical assessment session</li>" : ""}
          </ul>
        </div>
      </div>
    `;
    return await this.sendEmail({
      to: recipients,
      subject: `New ${serviceList} Request from ${requestData.fullName}`,
      html
    });
  }
};
var emailService = new EmailService();

// server/routes.ts
import { sql as sql2 } from "drizzle-orm";

// server/lib/logger.ts
import winston from "winston";
var isProduction = process.env.NODE_ENV === "production";
var isDevelopment = process.env.NODE_ENV === "development";
var logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
var logColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue"
};
winston.addColors(logColors);
var developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message, timestamp: timestamp2, stack }) => {
    if (stack) {
      return `[${timestamp2}] ${level}: ${message}
${stack}`;
    }
    return `[${timestamp2}] ${level}: ${message}`;
  })
);
var productionFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);
var transports = [];
if (isDevelopment) {
  transports.push(
    new winston.transports.Console({
      level: "debug",
      format: developmentFormat
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      level: "info",
      format: productionFormat
    })
  );
  if (process.env.ENABLE_FILE_LOGGING === "true") {
    transports.push(
      new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
        format: productionFormat,
        maxsize: 5242880,
        // 5MB
        maxFiles: 5
      }),
      new winston.transports.File({
        filename: "logs/combined.log",
        level: "info",
        format: productionFormat,
        maxsize: 5242880,
        // 5MB
        maxFiles: 5
      })
    );
  }
}
var logger = winston.createLogger({
  levels: logLevels,
  level: isProduction ? "info" : "debug",
  format: isProduction ? productionFormat : developmentFormat,
  transports,
  // Don't exit on handled exceptions
  exitOnError: false
});
var log = {
  error: (message, meta) => {
    if (meta) {
      logger.error(message, { meta });
    } else {
      logger.error(message);
    }
  },
  warn: (message, meta) => {
    if (meta) {
      logger.warn(message, { meta });
    } else {
      logger.warn(message);
    }
  },
  info: (message, meta) => {
    if (meta) {
      logger.info(message, { meta });
    } else {
      logger.info(message);
    }
  },
  debug: (message, meta) => {
    if (meta) {
      logger.debug(message, { meta });
    } else {
      logger.debug(message);
    }
  },
  // Special methods for common use cases
  apiRequest: (method, url, meta) => {
    logger.info(`API ${method} ${url}`, { meta, type: "api_request" });
  },
  apiResponse: (method, url, statusCode, responseTime) => {
    const level = statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";
    logger[level](`API ${method} ${url} - ${statusCode}`, {
      statusCode,
      responseTime: responseTime ? `${responseTime}ms` : void 0,
      type: "api_response"
    });
  },
  database: (operation, meta) => {
    logger.info(`Database: ${operation}`, { meta, type: "database" });
  },
  email: (operation, success, meta) => {
    const level = success ? "info" : "warn";
    logger[level](`Email: ${operation}`, { success, meta, type: "email" });
  },
  auth: (operation, username, meta) => {
    logger.info(`Auth: ${operation}`, { username, meta, type: "auth" });
  }
};
if (isProduction) {
  process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception:", error);
    process.exit(1);
  });
  process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection at:", { promise, reason });
  });
}

// server/routes/sitemap.ts
import express from "express";
var router = express.Router();
router.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/solutions</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/company</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/portfolio</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/resources</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${baseUrl}/assessment</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/request</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/solutions/ai-automation</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/computer-vision</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/data-analytics</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/healthcare</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/financial</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/retail</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/manufacturing</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/education</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});
router.get("/sitemap", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${baseUrl}/api/sitemap.xml</loc><lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod></sitemap>
</sitemapindex>`;
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(sitemapIndex);
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    res.status(500).send("Error generating sitemap index");
  }
});
router.get("/sitemap-solutions.xml", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/solutions</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/solutions/ai-automation</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/computer-vision</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/data-analytics</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/healthcare</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/financial</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/retail</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/manufacturing</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/education</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating solutions sitemap:", error);
    res.status(500).send("Error generating solutions sitemap");
  }
});
router.get("/sitemap-pages.xml", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/company</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/portfolio</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/resources</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${baseUrl}/assessment</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/request</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating pages sitemap:", error);
    res.status(500).send("Error generating pages sitemap");
  }
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    log.debug("Contact form submission received", {
      body: req.body,
      privacyConsent: {
        value: req.body.privacyConsent,
        type: typeof req.body.privacyConsent
      }
    });
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      log.debug("Contact form data validated successfully", {
        privacyConsent: validatedData.privacyConsent,
        privacyConsentType: typeof validatedData.privacyConsent
      });
      try {
        await storage.createContactSubmission(validatedData);
        log.database("Contact form stored successfully");
      } catch (dbError) {
        log.warn("Database unavailable, continuing without storing submission", dbError);
      }
      try {
        const emailSent = await emailService.sendContactFormNotification(validatedData);
        if (!emailSent) {
          log.email("Contact form notification not sent - email service not configured", false);
        } else {
          log.email("Contact form notification email sent successfully", true);
        }
      } catch (emailError) {
        log.email("Email sending failed", false, emailError);
      }
      try {
        const confirmationSent = await emailService.sendContactFormConfirmation(validatedData);
        if (!confirmationSent) {
          log.email("Contact form confirmation email could not be sent", false);
        } else {
          log.email("Contact form confirmation email sent successfully", true);
        }
      } catch (confirmationError) {
        log.email("Contact form confirmation email failed", false, confirmationError);
      }
      res.json({
        success: true,
        message: "Thank you for your message. We'll get back to you within one business day."
      });
    } catch (error) {
      log.error("Contact form submission error", error);
      if (error instanceof z2.ZodError) {
        log.error("Validation errors", error.errors);
        res.status(400).json({
          success: false,
          message: "Invalid form data - please check all required fields",
          errors: error.errors,
          details: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ")
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to submit contact form. Please try again or contact us directly."
        });
      }
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      try {
        const existing = await storage.getNewsletterSubscriptionByEmail(validatedData.email);
        if (existing) {
          res.status(409).json({
            success: false,
            message: "Email is already subscribed to our newsletter."
          });
          return;
        }
        await storage.createNewsletterSubscription(validatedData);
      } catch (dbError) {
        log.warn("Database unavailable for newsletter subscription", dbError);
      }
      try {
        const emailSent = await emailService.sendNewsletterConfirmation(validatedData.email);
        if (!emailSent) {
          log.email("Newsletter confirmation not sent - email service not configured", false);
        }
      } catch (emailError) {
        log.email("Newsletter confirmation email failed", false, emailError);
      }
      res.json({
        success: true,
        message: "Successfully subscribed to our newsletter!"
      });
    } catch (error) {
      log.error("Newsletter subscription error", error);
      if (error instanceof z2.ZodError) {
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
  app2.post("/api/request", async (req, res) => {
    try {
      const validatedData = insertRequestSchema.parse(req.body);
      try {
        await storage.createRequest(validatedData);
      } catch (dbError) {
        log.warn("Database unavailable, continuing without storing request", dbError);
      }
      try {
        const emailSent = await emailService.sendRequestNotification(validatedData);
        if (!emailSent) {
          log.email("Request notification not sent - email service not configured", false);
        }
      } catch (emailError) {
        log.email("Request notification email failed", false, emailError);
      }
      try {
        const confirmationSent = await emailService.sendRequestConfirmation(validatedData);
        if (!confirmationSent) {
          log.email("Request confirmation email could not be sent", false);
        }
      } catch (confirmationError) {
        log.email("Request confirmation email failed", false, confirmationError);
      }
      res.json({
        success: true,
        message: "Thank you for your request! We'll contact you within one business day to schedule your demo."
      });
    } catch (error) {
      log.error("Request submission error", error);
      if (error instanceof z2.ZodError) {
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
  app2.get("/api/admin/contacts", async (req, res) => {
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
  app2.get("/api/admin/newsletter", async (req, res) => {
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
  app2.get("/api/admin/requests", async (req, res) => {
    try {
      const requests2 = await storage.getRequests();
      res.json(requests2);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch requests"
      });
    }
  });
  app2.get("/api/health/database", async (req, res) => {
    try {
      const healthCheck = {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        database: {
          connected: false,
          type: "unknown",
          tables: [],
          error: null
        },
        supabase: {
          configured: false,
          url: null
        }
      };
      if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        healthCheck.supabase.configured = true;
        healthCheck.supabase.url = process.env.SUPABASE_URL;
      }
      try {
        const tablesResult = await db.execute(sql2`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
          ORDER BY table_name
        `);
        healthCheck.database.connected = true;
        healthCheck.database.type = process.env.DATABASE_URL ? "postgresql" : "memory";
        healthCheck.database.tables = Array.isArray(tablesResult) ? tablesResult.map((row) => row.table_name) : [];
      } catch (dbError) {
        healthCheck.database.error = dbError instanceof Error ? dbError.message : "Unknown database error";
        if (storage instanceof MemStorage) {
          healthCheck.database.connected = true;
          healthCheck.database.type = "memory";
          healthCheck.database.tables = ["memory_storage"];
        }
      }
      const statusCode = healthCheck.database.connected ? 200 : 503;
      res.status(statusCode).json(healthCheck);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "Username already exists"
        });
        return;
      }
      const hashedPassword = await bcrypt.hash(validatedData.password, 12);
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email: validatedData.email,
          password: validatedData.password,
          options: {
            data: {
              username: validatedData.username
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
        const user = await storage.createUser({
          ...validatedData,
          password: hashedPassword
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
        const user = await storage.createUser({
          ...validatedData,
          password: hashedPassword
        });
        res.json({
          success: true,
          message: "Account created successfully!",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            emailVerified: "true"
            // Local accounts are auto-verified
          }
        });
      }
    } catch (error) {
      if (error instanceof z2.ZodError) {
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
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({
          success: false,
          message: "Username or email and password are required"
        });
        return;
      }
      const user = await storage.getUserByUsernameOrEmail(username);
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
        return;
      }
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: user.email,
          password
        });
        if (error || !data.user) {
          res.status(401).json({
            success: false,
            message: "Invalid credentials"
          });
          return;
        }
        const token = generateToken({
          id: data.user.id,
          email: data.user.email || "",
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
          token,
          session: data.session
        });
      } else {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          res.status(401).json({
            success: false,
            message: "Invalid credentials"
          });
          return;
        }
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
          token
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to login"
      });
    }
  });
  app2.get("/api/auth/me", authenticateToken, async (req, res) => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "User not authenticated"
        });
        return;
      }
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
  app2.post("/api/auth/logout", authenticateToken, async (req, res) => {
    try {
      if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) {
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
  app2.use("/api", router);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    // PWA Plugin with basic configuration
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Strive Tech - AI-Powered Business Solutions",
        short_name: "Strive Tech",
        description: "Transform your business with AI-powered solutions and cutting-edge technology",
        theme_color: "#00C5A1",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,avif}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /\/api\/.*/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          },
          {
            urlPattern: /\.(png|jpg|jpeg|svg|webp|avif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 90
              }
            }
          }
        ],
        skipWaiting: true,
        clientsClaim: true
      },
      devOptions: {
        enabled: false
      }
    }),
    // Bundle analyzer - generates stats.html after build
    process.env.ANALYZE === "true" && visualizer({
      filename: "dist/bundle-analyzer.html",
      open: true,
      brotliSize: true,
      gzipSize: true,
      template: "treemap"
    }),
    // Temporarily disabled runtime error overlay due to frame property issues
    // runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Enable source maps only in development
    sourcemap: process.env.NODE_ENV === "development",
    // Use esbuild for minification (faster than terser)
    minify: "esbuild",
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1e3,
    rollupOptions: {
      output: {
        // Manual chunk optimization for better caching
        manualChunks: {
          // Vendor libraries that change rarely
          vendor: ["react", "react-dom"],
          router: ["wouter"],
          // UI component libraries
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group"
          ],
          // Utility libraries
          utils: [
            "date-fns",
            "clsx",
            "tailwind-merge",
            "class-variance-authority"
          ],
          // Animation and motion
          motion: ["framer-motion"],
          // Data visualization
          charts: ["recharts"],
          // Icons and visual assets
          icons: ["lucide-react", "@heroicons/react"],
          // Form handling
          forms: ["react-hook-form", "@hookform/resolvers"],
          // Query and state management
          query: ["@tanstack/react-query"],
          // PWA and Service Worker
          pwa: ["workbox-window", "idb"]
        },
        // Optimize asset file names for better caching
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return "assets/[name]-[hash][extname]";
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js"
      }
    }
  },
  // Production-specific esbuild optimizations
  esbuild: {
    // Remove console.log and debugger statements in production
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    // Optimize for modern browsers in production
    target: process.env.NODE_ENV === "production" ? "es2020" : "es2017"
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log2(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath, {
    maxAge: "1y",
    // Cache static assets for 1 year
    etag: true,
    // Enable ETag generation
    lastModified: true,
    // Send Last-Modified header
    setHeaders: (res, filePath) => {
      const ext = path2.extname(filePath).toLowerCase();
      if (ext === ".html") {
        res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
      } else if ([".js", ".css", ".woff2", ".woff", ".ttf", ".otf"].includes(ext)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".svg", ".ico"].includes(ext)) {
        res.setHeader("Cache-Control", "public, max-age=2592000");
      } else {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
      res.setHeader("X-Content-Type-Options", "nosniff");
      if ([".js", ".css", ".html", ".json", ".xml", ".svg"].includes(ext)) {
        res.setHeader("Vary", "Accept-Encoding");
      }
    }
  }));
  app2.use("*", (_req, res) => {
    res.setHeader("Cache-Control", "public, max-age=300");
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/middleware/security.ts
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
var createRateLimiter = () => {
  const isReplit = !!(process.env.REPL_ID || process.env.REPLIT_DB_URL || process.env.REPL_SLUG);
  const isDevelopment2 = process.env.NODE_ENV === "development";
  const windowMs = isDevelopment2 || isReplit ? 1 * 60 * 1e3 : 15 * 60 * 1e3;
  const maxRequests = isDevelopment2 || isReplit ? 1e3 : 500;
  return rateLimit({
    windowMs,
    max: maxRequests,
    message: {
      error: "Too many requests from this IP, please try again later.",
      retryAfter: windowMs < 6e4 ? "1 minute" : "15 minutes"
    },
    standardHeaders: true,
    // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
    // Disable the `X-RateLimit-*` headers
    // Skip rate limiting entirely in development or Replit, partial skip in production
    skip: (req) => {
      if (isDevelopment2 || isReplit) {
        return true;
      }
      return req.url.startsWith("/assets/") || req.url.startsWith("/favicon");
    }
  });
};
var securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        // Needed for Vite in development
        "'unsafe-eval'",
        // Needed for development
        "https://cdn.jsdelivr.net",
        // For CDN assets if needed
        "https://assets.calendly.com",
        "https://calendly.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        // Needed for styled-components and Tailwind
        "https://fonts.googleapis.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",
        // Allow external images for portfolio/solutions
        "blob:"
      ],
      connectSrc: [
        "'self'",
        "https://*.supabase.co",
        // Supabase API calls
        "wss://*.supabase.co",
        // Supabase realtime
        "https://api.github.com",
        // If needed for portfolio data
        "https://calendly.com",
        "https://*.calendly.com"
      ],
      frameSrc: [
        "'self'",
        "https://calendly.com",
        "https://*.calendly.com",
        "https://assets.calendly.com"
      ],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      ...process.env.NODE_ENV === "production" ? { upgradeInsecureRequests: [] } : {}
    }
  },
  // Additional security headers
  hsts: {
    maxAge: 31536e3,
    // 1 year
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  frameguard: { action: "deny" },
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
});
var securityLogger = (req, res, next) => {
  const suspiciousPatterns = [
    /sql injection/i,
    /<script/i,
    /javascript:/i,
    /eval\(/i,
    /union.*select/i
  ];
  const userAgent = req.headers["user-agent"] || "";
  const requestBody = JSON.stringify(req.body);
  const queryString = JSON.stringify(req.query);
  const isSuspicious = suspiciousPatterns.some(
    (pattern) => pattern.test(requestBody) || pattern.test(queryString) || pattern.test(userAgent)
  );
  if (isSuspicious) {
    console.warn(`[SECURITY] Suspicious request detected:`, {
      ip: req.ip,
      userAgent,
      path: req.path,
      method: req.method,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  next();
};
var applySecurity = [
  securityHeaders,
  createRateLimiter(),
  securityLogger
];

// server/index.ts
dotenv2.config();
var app = express3();
app.set("trust proxy", true);
app.use(applySecurity);
app.use(compression({
  level: 6,
  // Compression level (1-9, 6 is good balance of speed vs compression)
  threshold: 1024,
  // Only compress responses larger than 1KB
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
  }
}));
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log2(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  if (!process.env.VERCEL) {
    const port = parseInt(process.env.PORT || "5000", 10);
    const host = process.env.NODE_ENV === "development" ? "127.0.0.1" : "0.0.0.0";
    const options = { port, host };
    server.listen(options, () => {
      log2(`serving on port ${port} (${host})`);
    });
  }
})();
var index_default = app;
export {
  index_default as default
};
