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
        this.transporter = nodemailer.createTransport(emailConfig);
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
    const content = `
    <tr>
      <td class="content-padding" style="padding: 40px 30px;">
        
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h1 style="color: #0f172a; font-size: 28px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.3;">
            \u{1F389} Welcome to the Strive Tech Community!
          </h1>
          <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #ff7033, #f97316); margin: 0 auto 20px;"></div>
          <p style="color: #64748b; font-size: 18px; margin: 0; font-weight: 400;">
            Thank you for subscribing to our newsletter. You're now part of an exclusive community of forward-thinking business leaders.
          </p>
        </div>

        <!-- What You'll Receive -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 30px; border-radius: 12px; border-left: 4px solid #ff7033; margin: 30px 0;">
          <h3 style="color: #0f172a; font-size: 20px; margin: 0 0 25px 0; font-weight: 600; text-align: center;">
            \u{1F4EC} What You'll Receive
          </h3>
          
          <div style="display: grid; gap: 20px;">
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 15px; flex-shrink: 0;">\u{1F680}</span>
              <div>
                <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 5px;">AI Industry Insights</strong>
                <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Latest trends, breakthrough technologies, and how they impact your industry specifically.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 15px; flex-shrink: 0;">\u{1F4CA}</span>
              <div>
                <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 5px;">Success Stories & Case Studies</strong>
                <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Real transformation stories from companies like yours, with measurable results and lessons learned.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 15px; flex-shrink: 0;">\u{1F3AF}</span>
              <div>
                <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 5px;">Exclusive Resources</strong>
                <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Whitepapers, implementation guides, and tools available only to newsletter subscribers.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 15px; flex-shrink: 0;">\u{1F381}</span>
              <div>
                <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 5px;">Special Offers & Early Access</strong>
                <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Priority access to new services, exclusive webinars, and subscriber-only discounts.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Newsletter Schedule -->
        <div style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); padding: 25px; border-radius: 12px; border: 1px solid #fed7aa; margin: 30px 0; text-align: center;">
          <h3 style="color: #ea580c; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
            \u{1F4C5} Newsletter Schedule
          </h3>
          <p style="color: #9a3412; margin: 0; font-size: 15px; line-height: 1.5;">
            <strong>Weekly AI Insights:</strong> Every Tuesday<br>
            <strong>Monthly Deep Dive:</strong> First Friday of each month<br>
            <strong>Breaking News:</strong> As needed for major industry developments
          </p>
          <p style="color: #9a3412; margin: 15px 0 0 0; font-size: 13px; font-style: italic;">
            Don't worry - we respect your time and your inbox. Quality content, no spam.
          </p>
        </div>

        <!-- Get Started -->
        <div style="text-align: center; margin: 35px 0;">
          <h3 style="color: #0f172a; font-size: 20px; margin: 0 0 20px 0; font-weight: 600;">
            Start Exploring While You Wait
          </h3>
          <p style="color: #64748b; font-size: 16px; margin: 0 0 25px 0; line-height: 1.5;">
            Discover our comprehensive resources and see how AI can transform your business today.
          </p>
          
          <div style="margin: 20px 0;">
            <div style="display: inline-block; margin: 10px;">
              <a href="https://strivetech.ai/solutions" class="button" style="display: inline-block; padding: 14px 28px; background-color: #ff7033; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Explore AI Solutions
              </a>
            </div>
            
            <div style="display: inline-block; margin: 10px;">
              <a href="https://strivetech.ai/resources" class="button" style="display: inline-block; padding: 14px 28px; background-color: transparent; color: #ff7033; text-decoration: none; border: 2px solid #ff7033; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Browse Resources
              </a>
            </div>
          </div>
        </div>

        <!-- Ready for More -->
        <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border: 1px solid #bbf7d0; margin: 30px 0; text-align: center;">
          <h3 style="color: #166534; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
            \u{1F4A1} Ready to Take the Next Step?
          </h3>
          <p style="color: #15803d; margin: 0 0 20px 0; font-size: 15px; line-height: 1.5;">
            Don't wait for transformation to happen. Schedule a free consultation to discuss your specific AI needs.
          </p>
          <a href="https://strivetech.ai/request" style="display: inline-block; padding: 12px 24px; background-color: #16a34a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
            Request Free Consultation
          </a>
        </div>

        <!-- Team Signature -->
        <div style="text-align: center; margin: 40px 0 20px;">
          <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
            Welcome aboard,
          </p>
          <p style="color: #ff7033; font-size: 20px; font-weight: 700; margin: 0 0 8px 0;">
            The Strive Tech Team
          </p>
          <p style="color: #64748b; font-size: 14px; margin: 0; font-style: italic;">
            Your AI transformation partners
          </p>
        </div>

        <!-- Unsubscribe Notice -->
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 30px;">
          <p style="color: #64748b; font-size: 12px; margin: 0; text-align: center; line-height: 1.4;">
            You can manage your subscription preferences or unsubscribe at any time by 
            <a href="mailto:contact@strivetech.ai?subject=Newsletter%20Unsubscribe" style="color: #ff7033; text-decoration: none;">contacting us</a>.
            Your email: <strong>${email}</strong>
          </p>
        </div>
        
      </td>
    </tr>
    `;
    const html = this.wrapContent(content);
    return await this.sendEmail({
      to: [email],
      subject: "\u{1F389} Welcome to Strive Tech Newsletter - Your AI Journey Starts Here!",
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
    const content = `
    <tr>
      <td class="content-padding" style="padding: 40px 30px;">
        
        <!-- Main Greeting -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h1 style="color: #0f172a; font-size: 28px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.3;">
            Thank You, ${formData.firstName}! 
          </h1>
          <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #ff7033, #f97316); margin: 0 auto 20px;"></div>
          <p style="color: #64748b; font-size: 18px; margin: 0; font-weight: 400;">
            Your message has been received and is now in our priority queue.
          </p>
        </div>

        <!-- Confirmation Details -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #ff7033; margin: 30px 0;">
          <h3 style="color: #0f172a; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">
            \u{1F4CB} Your Inquiry Details
          </h3>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 120px;">Name:</span>
            <span style="color: #0f172a; font-weight: 500;">${formData.firstName} ${formData.lastName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 120px;">Company:</span>
            <span style="color: #0f172a; font-weight: 500;">${formData.company || "Individual Inquiry"}</span>
          </div>
          
          ${formData.companySize ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 120px;">Company Size:</span>
            <span style="color: #0f172a; font-weight: 500;">${formData.companySize}</span>
          </div>
          ` : ""}
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 120px;">Email:</span>
            <span style="color: #0f172a; font-weight: 500;">${formData.email}</span>
          </div>
          
          <div style="margin-top: 20px;">
            <span style="color: #475569; font-weight: 600;">Your Message:</span>
            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-top: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; margin: 0; line-height: 1.6;">${formData.message}</p>
            </div>
          </div>
        </div>

        <!-- What Happens Next -->
        <div style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); padding: 25px; border-radius: 12px; border: 1px solid #fed7aa; margin: 30px 0;">
          <h3 style="color: #ea580c; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; display: flex; align-items: center;">
            <span style="margin-right: 10px;">\u23F0</span>
            What Happens Next
          </h3>
          
          <div style="margin: 15px 0;">
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Initial Review (Within 2 hours)</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">Our team will review your inquiry and identify the best specialist to help you.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Personal Response (Within 24 hours)</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">You'll receive a detailed response with next steps tailored to your specific needs.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Discovery Call (If Applicable)</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">For complex inquiries, we'll schedule a call to better understand your requirements.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- While You Wait -->
        <div style="text-align: center; margin: 35px 0;">
          <h3 style="color: #0f172a; font-size: 20px; margin: 0 0 20px 0; font-weight: 600;">
            While You Wait, Explore Our Solutions
          </h3>
          <p style="color: #64748b; font-size: 16px; margin: 0 0 25px 0; line-height: 1.5;">
            Discover how we've helped companies like yours transform their operations with AI.
          </p>
          
          <div style="display: inline-block; margin: 10px;">
            <a href="https://strivetech.ai/solutions" class="button" style="display: inline-block; padding: 14px 28px; background-color: #ff7033; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
              View Industry Solutions
            </a>
          </div>
          
          <div style="display: inline-block; margin: 10px;">
            <a href="https://strivetech.ai/resources" class="button" style="display: inline-block; padding: 14px 28px; background-color: transparent; color: #ff7033; text-decoration: none; border: 2px solid #ff7033; border-radius: 8px; font-weight: 600; font-size: 15px;">
              Browse Resources
            </a>
          </div>
        </div>

        <!-- Team Signature -->
        <div style="text-align: center; margin: 40px 0 20px;">
          <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
            Best regards,
          </p>
          <p style="color: #ff7033; font-size: 20px; font-weight: 700; margin: 0 0 8px 0;">
            The Strive Tech Team
          </p>
          <p style="color: #64748b; font-size: 14px; margin: 0; font-style: italic;">
            Your partners in AI transformation
          </p>
        </div>

        <!-- Emergency Contact -->
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 30px;">
          <p style="color: #475569; font-size: 13px; margin: 0; text-align: center; line-height: 1.4;">
            <strong>Need immediate assistance?</strong><br>
            For urgent matters, please call us directly or send a follow-up email to 
            <a href="mailto:contact@strivetech.ai" style="color: #ff7033; text-decoration: none; font-weight: 600;">contact@strivetech.ai</a>
            with "URGENT" in the subject line.
          </p>
        </div>
        
      </td>
    </tr>
    `;
    const html = this.wrapContent(content);
    return await this.sendEmail({
      to: [formData.email],
      subject: "Thank you for contacting Strive Tech - We'll be in touch within 24 hours!",
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
    const content = `
    <tr>
      <td class="content-padding" style="padding: 40px 30px;">
        
        <!-- Main Confirmation -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h1 style="color: #0f172a; font-size: 28px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.3;">
            \u{1F3AF} Your Request is Confirmed!
          </h1>
          <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #ff7033, #f97316); margin: 0 auto 20px;"></div>
          <p style="color: #64748b; font-size: 18px; margin: 0; font-weight: 400;">
            Thank you for your interest in <strong>${serviceList}</strong>, ${requestData.firstName}!<br>
            We'll contact you within 24 hours to schedule your sessions.
          </p>
        </div>

        <!-- Request Summary -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #ff7033; margin: 30px 0;">
          <h3 style="color: #0f172a; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">
            \u{1F4CB} Your Request Summary
          </h3>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Name:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.firstName} ${requestData.lastName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Company:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.company}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Services:</span>
            <span style="color: #ff7033; font-weight: 600;">${serviceList}</span>
          </div>
          
          ${requestData.industry ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Industry:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.industry}</span>
          </div>
          ` : ""}
          
          ${requestData.companySize ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Company Size:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.companySize}</span>
          </div>
          ` : ""}
          
          ${currentChallenges.length > 0 ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: block; margin-bottom: 5px;">Current Challenges:</span>
            <div style="margin-left: 0;">
              ${currentChallenges.map((challenge) => `
                <span style="background: #fef3e2; color: #ea580c; padding: 4px 8px; border-radius: 6px; font-size: 12px; margin: 2px 4px 2px 0; display: inline-block;">${challenge}</span>
              `).join("")}
            </div>
          </div>
          ` : ""}
          
          ${demoFocusAreas.length > 0 ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: block; margin-bottom: 5px;">Focus Areas:</span>
            <div style="margin-left: 0;">
              ${demoFocusAreas.map((area) => `
                <span style="background: #f0f9ff; color: #0369a1; padding: 4px 8px; border-radius: 6px; font-size: 12px; margin: 2px 4px 2px 0; display: inline-block;">${area}</span>
              `).join("")}
            </div>
          </div>
          ` : ""}
          
          ${requestData.projectTimeline ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Timeline:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.projectTimeline}</span>
          </div>
          ` : ""}
          
          ${requestData.additionalRequirements ? `
          <div style="margin-top: 20px;">
            <span style="color: #475569; font-weight: 600;">Additional Requirements:</span>
            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-top: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; margin: 0; line-height: 1.6;">${requestData.additionalRequirements}</p>
            </div>
          </div>
          ` : ""}
        </div>

        <!-- What to Expect -->
        <div style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); padding: 25px; border-radius: 12px; border: 1px solid #fed7aa; margin: 30px 0;">
          <h3 style="color: #ea580c; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; display: flex; align-items: center;">
            <span style="margin-right: 10px;">\u23F0</span>
            What to Expect Next
          </h3>
          
          <div style="margin: 15px 0;">
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Personal Outreach (Within 24 hours)</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">A dedicated team member will contact you to confirm details and understand your specific needs.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Calendar Invites & Preparation</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">You'll receive detailed calendar invites with preparation materials tailored to your industry.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Customized Sessions</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">Sessions will be customized to your specific business needs, challenges, and industry requirements.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Service-Specific Information -->
        <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border: 1px solid #bbf7d0; margin: 30px 0;">
          <h3 style="color: #166534; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">
            \u{1F3AF} Your Personalized Experience
          </h3>
          
          <div style="margin: 15px 0;">
            ${requestTypes.includes("demo") ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #15803d; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">\u{1F4FA} Product Demo Session</h4>
              <ul style="color: #16a34a; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Live demonstration of AI solutions relevant to your industry</li>
                <li>Interactive Q&A with our technical experts</li>
                <li>Customized use case scenarios based on your challenges</li>
                <li>ROI projections and implementation timelines</li>
              </ul>
            </div>
            ` : ""}
            
            ${requestTypes.includes("showcase") ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #15803d; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">\u{1F3C6} Solution Showcase</h4>
              <ul style="color: #16a34a; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Deep dive into solutions addressing your specific challenges</li>
                <li>Case studies from similar companies in your industry</li>
                <li>Detailed technical architecture and integration plans</li>
                <li>Custom proposal with pricing and timeline</li>
              </ul>
            </div>
            ` : ""}
            
            ${requestTypes.includes("assessment") ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #15803d; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">\u{1F50D} AI Assessment</h4>
              <ul style="color: #16a34a; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Comprehensive evaluation of your current AI readiness</li>
                <li>Detailed analysis of your data infrastructure and capabilities</li>
                <li>Strategic roadmap with prioritized recommendations</li>
                <li>Implementation plan with milestones and success metrics</li>
              </ul>
            </div>
            ` : ""}
          </div>
        </div>

        <!-- Preparation Tips -->
        <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; border: 1px solid #bae6fd; margin: 30px 0;">
          <h3 style="color: #0369a1; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
            \u{1F4DA} How to Prepare
          </h3>
          <ul style="color: #0284c7; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
            <li><strong>Gather stakeholders:</strong> Identify key team members who should participate</li>
            <li><strong>Document processes:</strong> Note current workflows you'd like to improve</li>
            <li><strong>Define goals:</strong> Think about specific outcomes you want to achieve</li>
            <li><strong>Prepare questions:</strong> List any specific concerns or requirements</li>
            <li><strong>Review your data:</strong> Consider what data sources you have available</li>
          </ul>
        </div>

        <!-- Team Signature -->
        <div style="text-align: center; margin: 40px 0 20px;">
          <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
            We're excited to show you what's possible,
          </p>
          <p style="color: #ff7033; font-size: 20px; font-weight: 700; margin: 0 0 8px 0;">
            The Strive Tech Team
          </p>
          <p style="color: #64748b; font-size: 14px; margin: 0; font-style: italic;">
            Your AI transformation experts
          </p>
        </div>

        <!-- Contact Information -->
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 30px;">
          <p style="color: #475569; font-size: 13px; margin: 0; text-align: center; line-height: 1.4;">
            <strong>Questions or need to reschedule?</strong><br>
            Reply to this email or contact us directly at 
            <a href="mailto:contact@strivetech.ai" style="color: #ff7033; text-decoration: none; font-weight: 600;">contact@strivetech.ai</a>
          </p>
        </div>
        
      </td>
    </tr>
    `;
    const html = this.wrapContent(content);
    return await this.sendEmail({
      to: [requestData.email],
      subject: `\u{1F3AF} Your ${serviceList} Request Confirmed - We'll Contact You Within 24 Hours!`,
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
          <p><strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}</p>
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
      subject: `New ${serviceList} Request from ${requestData.firstName} ${requestData.lastName}`,
      html
    });
  }
  // Professional email template helpers
  getEmailHeader() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Strive Tech</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .header-logo { height: 40px !important; max-width: 160px !important; }
      .content-padding { padding: 20px 15px !important; }
      .button { padding: 12px 20px !important; font-size: 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Inter', 'Segoe UI', 'Arial', sans-serif; line-height: 1.6;">
  
  <!-- Header Section -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <img src="https://strivetech.ai/assets/STRIVE_Orange_Text_Transparent_1483x320px.webp" 
             alt="Strive Tech" class="header-logo" style="height: 50px; max-width: 200px; display: block; margin: 0 auto;">
        <div style="height: 2px; background: linear-gradient(90deg, transparent, #ff7033, transparent); margin: 25px auto 15px; max-width: 300px;"></div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0; font-weight: 300;">Transforming Business with AI Solutions</p>
      </td>
    </tr>
  </table>
  
  <!-- Main Content Container -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="width: 100%; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 0;">
`;
  }
  getEmailFooter() {
    return `
  </table>
  
  <!-- Footer Section -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <div style="border-top: 1px solid #334155; padding-top: 30px; margin-bottom: 25px;"></div>
        
        <!-- Social Links & Quick Actions -->
        <div style="margin-bottom: 25px;">
          <a href="https://strivetech.ai/solutions" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #ff7033; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">Explore Solutions</a>
          <a href="https://strivetech.ai/request" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: transparent; color: #ff7033; text-decoration: none; border: 1px solid #ff7033; border-radius: 6px; font-size: 14px; font-weight: 500;">Request Demo</a>
        </div>
        
        <!-- Contact Information -->
        <div style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">
          <p style="margin: 5px 0;">
            <strong style="color: #f8fafc;">Contact:</strong> 
            <a href="mailto:contact@strivetech.ai" style="color: #ff7033; text-decoration: none;">contact@strivetech.ai</a>
          </p>
          <p style="margin: 5px 0;">
            <strong style="color: #f8fafc;">Website:</strong> 
            <a href="https://strivetech.ai" style="color: #ff7033; text-decoration: none;">strivetech.ai</a>
          </p>
        </div>
        
        <!-- Company Info -->
        <div style="color: #64748b; font-size: 12px; line-height: 1.4;">
          <p style="margin: 8px 0;">\xA9 2024 Strive Tech. All rights reserved.</p>
          <p style="margin: 8px 0;">Empowering businesses through cutting-edge artificial intelligence solutions.</p>
          <p style="margin: 8px 0;">
            <a href="https://strivetech.ai/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a> | 
            <a href="https://strivetech.ai/terms" style="color: #64748b; text-decoration: none;">Terms of Service</a>
          </p>
        </div>
      </td>
    </tr>
  </table>
  
</body>
</html>
`;
  }
  wrapContent(content) {
    return this.getEmailHeader() + content + this.getEmailFooter();
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
  app2.get("/api/debug/email", async (req, res) => {
    try {
      console.log("\u{1F50D} Email service debug endpoint called");
      const isConnected = await emailService.verifyConnection();
      let testEmailResult = null;
      if (isConnected) {
        console.log("\u{1F9EA} Attempting to send test email...");
        testEmailResult = await emailService.sendEmail({
          to: ["grantramey@strivetech.ai"],
          subject: "Email Service Debug Test",
          html: `
            <h2>Email Service Debug Test</h2>
            <p>This is a test email sent from the debug endpoint at ${(/* @__PURE__ */ new Date()).toISOString()}</p>
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
      console.error("\u274C Email debug endpoint error:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
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
