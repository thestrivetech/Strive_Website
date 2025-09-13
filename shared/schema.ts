import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  emailVerified: text("email_verified").notNull().default("false"),
  verificationToken: text("verification_token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(), 
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone"),
  companySize: text("company_size"),
  message: text("message").notNull(),
  privacyConsent: text("privacy_consent").notNull().default("false"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const requests = pgTable("requests", {
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
  currentChallenges: text("current_challenges"), // JSON array as text
  projectTimeline: text("project_timeline"),
  budgetRange: text("budget_range"),

  // Request Information
  requestTypes: text("request_types").notNull(), // Comma-separated: 'demo,showcase,assessment'
  demoFocusAreas: text("demo_focus_areas"), // JSON array as text
  additionalRequirements: text("additional_requirements"),
  preferredDate: text("preferred_date"),

  // Status and Assignment (Production Features)
  status: text("status").notNull().default("pending"), // pending, contacted, scheduled, completed, cancelled
  assignedTo: text("assigned_to"), // Team member assigned to handle this request
  priority: text("priority").notNull().default("normal"), // low, normal, high, urgent

  // Audit Trail
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  contactedAt: timestamp("contacted_at"), // When first contact was made
  scheduledAt: timestamp("scheduled_at"), // When meeting/demo was scheduled
  completedAt: timestamp("completed_at"), // When request was completed

  // Soft Delete Support
  deletedAt: timestamp("deleted_at"), // For GDPR compliance and data recovery
  deletedBy: text("deleted_by"), // Who deleted the record

  // Analytics and Tracking
  source: text("source").notNull().default("website"), // website, referral, social, etc.
  utm: text("utm_data"), // UTM parameters as JSON for tracking
  ipAddress: text("ip_address"), // For security and analytics
  userAgent: text("user_agent"), // Browser/device info
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  firstName: true,
  lastName: true,
  email: true,
  company: true,
  phone: true,
  companySize: true,
  message: true,
  privacyConsent: true,
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).pick({
  email: true,
});

export const insertRequestSchema = createInsertSchema(requests).pick({
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
  preferredDate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertRequest = z.infer<typeof insertRequestSchema>;
export type Request = typeof requests.$inferSelect;
