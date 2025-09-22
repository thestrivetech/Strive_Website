import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, real, boolean, jsonb } from "drizzle-orm/pg-core";
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

  // Status and Assignment (Production Features)
  status: text("status").notNull().default("pending"), // pending, contacted, scheduled, completed, cancelled
  priority: text("priority").notNull().default("normal"), // low, normal, high, urgent

  // Audit Trail
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  // Analytics and Tracking
  source: text("source").notNull().default("website"), // website, referral, social, etc.
});
// Analytics Tables
export const pageViews = pgTable("page_views", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  userId: text("user_id"), // Optional: link to users table
  url: text("url").notNull(),
  path: text("path").notNull(),
  title: text("title"),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  country: text("country"),
  city: text("city"),
  device: text("device"), // mobile, desktop, tablet
  browser: text("browser"),
  os: text("os"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  viewDuration: integer("view_duration"), // Time spent on page in seconds
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const userSessions = pgTable("user_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull().unique(),
  userId: text("user_id"), // Optional: link to users table
  startTime: timestamp("start_time").defaultNow().notNull(),
  endTime: timestamp("end_time"),
  duration: integer("duration"), // Session duration in seconds
  pageViews: integer("page_views").default(0),
  bounced: boolean("bounced").default(false), // Single page session
  converted: boolean("converted").default(false), // Goal completion
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  country: text("country"),
  city: text("city"),
  device: text("device"),
  browser: text("browser"),
  os: text("os"),
  referrer: text("referrer"),
  entryPage: text("entry_page"),
  exitPage: text("exit_page"),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  userId: text("user_id"), // Optional: link to users table
  eventType: text("event_type").notNull(), // click, scroll, form_submit, etc.
  eventName: text("event_name").notNull(),
  elementId: text("element_id"),
  elementClass: text("element_class"),
  elementText: text("element_text"),
  url: text("url").notNull(),
  path: text("path").notNull(),
  xPosition: integer("x_position"),
  yPosition: integer("y_position"),
  scrollDepth: integer("scroll_depth"), // Percentage
  properties: jsonb("properties"), // Additional event data
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const webVitalsMetrics = pgTable("web_vitals_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  userId: text("user_id"), // Optional: link to users table
  url: text("url").notNull(),
  path: text("path").notNull(),
  metricName: text("metric_name").notNull(), // LCP, FID, CLS, FCP, TTFB
  metricValue: real("metric_value").notNull(),
  metricRating: text("metric_rating").notNull(), // good, needs-improvement, poor
  metricId: text("metric_id").notNull(),
  userAgent: text("user_agent"),
  device: text("device"),
  browser: text("browser"),
  connectionType: text("connection_type"), // 4g, wifi, etc.
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const analyticsGoals = pgTable("analytics_goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // page_view, event, duration
  conditions: jsonb("conditions").notNull(), // Goal conditions as JSON
  value: real("value"), // Monetary value of conversion
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const goalConversions = pgTable("goal_conversions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  goalId: varchar("goal_id").notNull(),
  sessionId: text("session_id").notNull(),
  userId: text("user_id"), // Optional: link to users table
  value: real("value"), // Conversion value
  url: text("url").notNull(),
  path: text("path").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
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
}).extend({
  // Allow boolean values for privacyConsent and transform to string
  privacyConsent: z.union([z.boolean(), z.string()]).transform((val) => String(val)),
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
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertRequest = z.infer<typeof insertRequestSchema>;
export type Request = typeof requests.$inferSelect;
// Analytics Schema Types
export const insertPageViewSchema = createInsertSchema(pageViews).pick({
  sessionId: true,
  userId: true,
  url: true,
  path: true,
  title: true,
  referrer: true,
  userAgent: true,
  ipAddress: true,
  country: true,
  city: true,
  device: true,
  browser: true,
  os: true,
  utmSource: true,
  utmMedium: true,
  utmCampaign: true,
  viewDuration: true,
});

export const insertUserSessionSchema = createInsertSchema(userSessions).pick({
  sessionId: true,
  userId: true,
  endTime: true,
  duration: true,
  pageViews: true,
  bounced: true,
  converted: true,
  userAgent: true,
  ipAddress: true,
  country: true,
  city: true,
  device: true,
  browser: true,
  os: true,
  referrer: true,
  entryPage: true,
  exitPage: true,
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).pick({
  sessionId: true,
  userId: true,
  eventType: true,
  eventName: true,
  elementId: true,
  elementClass: true,
  elementText: true,
  url: true,
  path: true,
  xPosition: true,
  yPosition: true,
  scrollDepth: true,
  properties: true,
});

export const insertWebVitalsMetricSchema = createInsertSchema(webVitalsMetrics).pick({
  sessionId: true,
  userId: true,
  url: true,
  path: true,
  metricName: true,
  metricValue: true,
  metricRating: true,
  metricId: true,
  userAgent: true,
  device: true,
  browser: true,
  connectionType: true,
});

export type InsertPageView = z.infer<typeof insertPageViewSchema>;
export type PageView = typeof pageViews.$inferSelect;
export type InsertUserSession = z.infer<typeof insertUserSessionSchema>;
export type UserSession = typeof userSessions.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertWebVitalsMetric = z.infer<typeof insertWebVitalsMetricSchema>;
export type WebVitalsMetric = typeof webVitalsMetrics.$inferSelect;
export type AnalyticsGoal = typeof analyticsGoals.$inferSelect;
export type GoalConversion = typeof goalConversions.$inferSelect;
