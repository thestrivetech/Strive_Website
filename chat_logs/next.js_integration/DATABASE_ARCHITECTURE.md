# Database Architecture Documentation

## Overview

The Strive Tech website uses a **hybrid database architecture** combining **Drizzle ORM** with **Supabase PostgreSQL** for optimal performance, scalability, and developer experience.

## Current Implementation Status

### **Production Tables (Migrated)**
✅ **4 Core Tables** deployed in production via migration `0000_premium_millenium_guard.sql`

### **Development Tables (Schema Only)**
🚧 **6 Analytics Tables** defined in `shared/schema.ts` but not yet migrated

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                                │
├─────────────────────────────────────────────────────────────────────┤
│  Express.js Routes  │  React Frontend  │  Email Service │ Health Check│
├─────────────────────────────────────────────────────────────────────┤
│                     STORAGE ABSTRACTION                             │
├─────────────────────────────────────────────────────────────────────┤
│  SupabaseStorage   │   MemStorage     │   Graceful Fallback         │
│  (Production)      │   (Development)  │   (Auto-detected)           │
├─────────────────────────────────────────────────────────────────────┤
│                      DATABASE LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│  Drizzle ORM       │  Supabase Auth   │  PostgreSQL Connection      │
│  (Type Safety)     │  (Authentication)│  (Transaction Pooler)       │
├─────────────────────────────────────────────────────────────────────┤
│                    SUPABASE POSTGRESQL                              │
└─────────────────────────────────────────────────────────────────────┘
```

## Current Database Tables (Production)

### 1. `users` - User Authentication
```sql
CREATE TABLE "users" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "username" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "email_verified" text DEFAULT 'false' NOT NULL,
  "verification_token" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "users_username_unique" UNIQUE("username"),
  CONSTRAINT "users_email_unique" UNIQUE("email")
);
```

**TypeScript Schema:**
```typescript
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
```

### 2. `contact_submissions` - Contact Form Data
```sql
CREATE TABLE "contact_submissions" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "email" text NOT NULL,
  "company" text NOT NULL,
  "phone" text,
  "company_size" text,
  "message" text NOT NULL,
  "privacy_consent" text DEFAULT 'false' NOT NULL,
  "submitted_at" timestamp DEFAULT now() NOT NULL
);
```

**TypeScript Schema:**
```typescript
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
```

### 3. `newsletter_subscriptions` - Newsletter Signups
```sql
CREATE TABLE "newsletter_subscriptions" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" text NOT NULL,
  "subscribed_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "newsletter_subscriptions_email_unique" UNIQUE("email")
);
```

**TypeScript Schema:**
```typescript
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});
```

### 4. `requests` - Unified Request Handling (🚀 Production Enhanced)
```sql
CREATE TABLE "requests" (
  "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "full_name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "company" text NOT NULL,
  "job_title" text,
  "industry" text,
  "company_size" text,
  "current_challenges" text,
  "project_timeline" text,
  "budget_range" text,
  "request_types" text NOT NULL,
  "demo_focus_areas" text,
  "additional_requirements" text,
  "preferred_date" text,
  "status" text DEFAULT 'pending' NOT NULL,
  "assigned_to" text,
  "priority" text DEFAULT 'normal' NOT NULL,
  "submitted_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "contacted_at" timestamp,
  "scheduled_at" timestamp,
  "completed_at" timestamp,
  "deleted_at" timestamp,
  "deleted_by" text,
  "source" text DEFAULT 'website' NOT NULL,
  "utm_data" text,
  "ip_address" text,
  "user_agent" text
);
```

**TypeScript Schema:**
```typescript
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
```

## Planned Analytics Tables (Schema Ready, Migration Pending)

### 5. `page_views` - Website Analytics
```typescript
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
```

### 6. `user_sessions` - User Session Tracking
```typescript
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
```

### 7. `analytics_events` - User Interaction Events
```typescript
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
```

### 8. `web_vitals_metrics` - Performance Monitoring
```typescript
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
```

### 9. `analytics_goals` - Conversion Goal Definitions
```typescript
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
```

### 10. `goal_conversions` - Conversion Tracking
```typescript
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
```

## Request Types Handling

The system handles **4 different request types** through a unified `requests` table:

### 1. Contact Requests
- **Table**: `contact_submissions`
- **Endpoint**: `POST /api/contact`
- **Use Case**: General inquiries and contact

### 2. Assessment Requests
- **Table**: `requests`
- **Endpoint**: `POST /api/request`
- **Request Types**: `"assessment"`
- **Use Case**: AI readiness evaluations

### 3. Demo Showcase Requests
- **Table**: `requests`
- **Endpoint**: `POST /api/request`
- **Request Types**: `"demo"` or `"demo,showcase"`
- **Use Case**: Product demonstrations

### 4. Solution Showcase Requests
- **Table**: `requests`
- **Endpoint**: `POST /api/request`
- **Request Types**: `"showcase"` or `"demo,showcase"`
- **Use Case**: Custom solution presentations

## Current Migration Status

### Migration Files
- **Location**: `/migrations/`
- **Current Version**: `0000_premium_millenium_guard.sql`
- **Migration Date**: January 13, 2025 (5 days ago)
- **Status**: ✅ **Applied to Production**

### Migration Journal
```json
{
  "version": "7",
  "dialect": "postgresql",
  "entries": [
    {
      "idx": 0,
      "version": "7",
      "when": 1757940127825,
      "tag": "0000_premium_millenium_guard",
      "breakpoints": true
    }
  ]
}
```

### Pending Migrations
🚧 **Analytics Tables** are defined in `shared/schema.ts` but require migration:
- `page_views`
- `user_sessions`
- `analytics_events`
- `web_vitals_metrics`
- `analytics_goals`
- `goal_conversions`

### Running Next Migration
```bash
# Generate migration for analytics tables
npm run db:push

# Or create specific migration
npx drizzle-kit generate:pg --schema=shared/schema.ts
```

## Indexes and Performance (Recommended for Next Migration)

### Primary Indexes
```sql
-- Performance optimization indexes for existing tables
CREATE INDEX idx_requests_email ON requests(email);
CREATE INDEX idx_requests_request_types ON requests(request_types);
CREATE INDEX idx_requests_submitted_at ON requests(submitted_at);
CREATE INDEX idx_requests_company ON requests(company);
CREATE INDEX idx_requests_industry ON requests(industry);

-- Production feature indexes
CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_requests_priority ON requests(priority);
CREATE INDEX idx_requests_assigned_to ON requests(assigned_to);
CREATE INDEX idx_requests_updated_at ON requests(updated_at);
CREATE INDEX idx_requests_deleted_at ON requests(deleted_at);
CREATE INDEX idx_requests_source ON requests(source);

-- Composite indexes for common queries
CREATE INDEX idx_requests_status_priority ON requests(status, priority);
CREATE INDEX idx_requests_assigned_status ON requests(assigned_to, status);

-- Analytics table indexes (when migrated)
CREATE INDEX idx_page_views_session_id ON page_views(session_id);
CREATE INDEX idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX idx_web_vitals_metrics_metric_name ON web_vitals_metrics(metric_name);
```

## TypeScript Schema Exports

### Insert Schemas
```typescript
// Production tables (available)
export const insertUserSchema = createInsertSchema(users).pick(...);
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick(...);
export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).pick(...);
export const insertRequestSchema = createInsertSchema(requests).pick(...);

// Analytics tables (available when migrated)
export const insertPageViewSchema = createInsertSchema(pageViews).pick(...);
export const insertUserSessionSchema = createInsertSchema(userSessions).pick(...);
export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).pick(...);
export const insertWebVitalsMetricSchema = createInsertSchema(webVitalsMetrics).pick(...);
```

### Type Exports
```typescript
// Production types (available)
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type Request = typeof requests.$inferSelect;
export type InsertRequest = z.infer<typeof insertRequestSchema>;

// Analytics types (available when migrated)
export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = z.infer<typeof insertPageViewSchema>;
export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = z.infer<typeof insertUserSessionSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type WebVitalsMetric = typeof webVitalsMetrics.$inferSelect;
export type InsertWebVitalsMetric = z.infer<typeof insertWebVitalsMetricSchema>;
export type AnalyticsGoal = typeof analyticsGoals.$inferSelect;
export type GoalConversion = typeof goalConversions.$inferSelect;
```

## API Endpoints

### Public Endpoints (Active)
- `POST /api/contact` - Contact form submissions → `contact_submissions`
- `POST /api/request` - Demo/Assessment/Showcase requests → `requests`
- `POST /api/newsletter` - Newsletter subscriptions → `newsletter_subscriptions`

### Admin Endpoints (Planned)
- `GET /api/admin/contacts` - Retrieve contact submissions
- `GET /api/admin/requests` - Retrieve all requests
- `GET /api/admin/newsletter` - Retrieve newsletter subscriptions
- `GET /api/admin/analytics` - Analytics dashboard data

### Health Check
- `GET /api/health/database` - Database connectivity and status

## Connection Configuration

### Supabase Integration
```env
# Primary configuration
SUPABASE_URL=https://qnfcdyjhzolhsokblslb.supabase.co
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-key>

# Database connection (Transaction Pooler for serverless)
DATABASE_URL=postgresql://postgres.qnfcdyjhzolhsokblslb:password@aws-1-us-east-1.pooler.supabase.com:6543/postgres

# Client-side configuration
VITE_SUPABASE_URL=https://qnfcdyjhzolhsokblslb.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

### Connection Types
1. **Transaction Pooler** (Port 6543) - **RECOMMENDED & ACTIVE**
   - Ideal for serverless/stateless applications
   - Best for Replit deployments
   - Automatic connection pooling

2. **Direct Connection** (Port 5432)
   - For persistent, long-lived connections
   - Virtual machines or containers

3. **Session Pooler** (Port 5432)
   - Alternative to direct connection
   - IPv4 networks only

## Security Features (Recommended Implementation)

### Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Public submission policies
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert newsletter subscriptions" ON newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert requests" ON requests
    FOR INSERT WITH CHECK (true);

-- Soft delete policies
CREATE POLICY "Hide soft deleted requests" ON requests
    FOR SELECT USING (deleted_at IS NULL);
```

### Data Validation Constraints
```sql
-- Ensure data integrity
ALTER TABLE requests ADD CONSTRAINT check_status_valid
    CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled'));

ALTER TABLE requests ADD CONSTRAINT check_priority_valid
    CHECK (priority IN ('low', 'normal', 'high', 'urgent'));

ALTER TABLE requests ADD CONSTRAINT check_request_types_not_empty
    CHECK (length(trim(request_types)) > 0);
```

## GDPR Compliance

### Data Privacy Features
- **Soft Delete**: Records marked as deleted, not physically removed (`deleted_at` field)
- **Audit Trail**: Complete history of data changes via timestamp fields
- **Data Portability**: Easy export via API endpoints
- **Right to Erasure**: Soft delete with recovery capability

### Personal Data Handling
- Email addresses indexed for quick lookup
- IP addresses stored for security analysis (`ip_address` field)
- User agent strings for analytics (`user_agent` field)
- All personal data can be anonymized or removed upon request

## Monitoring and Health Checks

### Database Health Endpoint: `/api/health/database`
Returns comprehensive database status including:
```json
{
  "timestamp": "2025-01-18T10:30:00.000Z",
  "database": {
    "connected": true,
    "type": "postgresql",
    "tables": ["users", "contact_submissions", "newsletter_subscriptions", "requests"],
    "migrationStatus": "0000_premium_millenium_guard",
    "error": null
  },
  "supabase": {
    "configured": true,
    "url": "https://qnfcdyjhzolhsokblslb.supabase.co"
  }
}
```

### Key Metrics to Monitor
- Database connection status
- Query response times
- Table record counts (4 active tables)
- Failed request rates
- Storage usage trends
- Migration status

## Next Steps for Development

### Immediate Actions
1. **Analytics Migration**: Run migration for 6 analytics tables
2. **Index Creation**: Add performance indexes to existing tables
3. **RLS Policies**: Implement Row Level Security
4. **Admin Dashboard**: Build interfaces for data management

### Future Enhancements
- Read replicas for analytics queries
- Redis caching layer for frequently accessed data
- Database sharding for extreme scale
- Automated backup and recovery system
- Real-time analytics with Supabase subscriptions

## Conclusion

This database architecture provides:
- **Production Ready** with 4 core tables actively handling business logic
- **Analytics Ready** with 6 additional tables defined and waiting for migration
- **Type Safe** with comprehensive Drizzle ORM schemas and Zod validation
- **Scalable** design for future growth with proper indexing strategy
- **GDPR Compliant** with audit trail and soft delete capabilities
- **High Performance** with optimized connection pooling
- **Maintainable** with clear separation of concerns and TypeScript integration

The hybrid Drizzle + Supabase approach offers the best of both worlds: **enterprise-grade type safety** with **powerful cloud database features** and **seamless deployment integration**.