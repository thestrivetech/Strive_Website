# Database Architecture Documentation

## Overview

The Strive Tech website uses a **hybrid database architecture** combining **Drizzle ORM** with **Supabase PostgreSQL** for optimal performance, scalability, and developer experience.

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

## Database Tables

### Core Tables

#### 1. `users` - User Authentication
```sql
CREATE TABLE users (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email_verified TEXT NOT NULL DEFAULT 'false',
    verification_token TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

#### 2. `contact_submissions` - Contact Form Data
```sql
CREATE TABLE contact_submissions (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    phone TEXT,
    company_size TEXT,
    message TEXT NOT NULL,
    privacy_consent TEXT NOT NULL DEFAULT 'false',
    submitted_at TIMESTAMP DEFAULT NOW() NOT NULL,
    -- Production Features --
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,  -- Soft delete for GDPR
    ip_address TEXT,       -- Security tracking
    user_agent TEXT,       -- Browser info
    source TEXT NOT NULL DEFAULT 'website'
);
```

#### 3. `newsletter_subscriptions` - Newsletter Signups
```sql
CREATE TABLE newsletter_subscriptions (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT NOW() NOT NULL,
    -- Production Features --
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP,  -- Soft delete for GDPR
    ip_address TEXT,       -- Security tracking
    source TEXT NOT NULL DEFAULT 'website'
);
```

#### 4. `requests` - Unified Request Handling (🚀 Production Enhanced)
```sql
CREATE TABLE requests (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Contact Information --
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT NOT NULL,
    job_title TEXT,

    -- Business Information --
    industry TEXT,
    company_size TEXT,
    current_challenges TEXT,  -- JSON array as text
    project_timeline TEXT,
    budget_range TEXT,

    -- Request Information --
    request_types TEXT NOT NULL,  -- Comma-separated: 'demo,showcase,assessment'
    demo_focus_areas TEXT,        -- JSON array as text
    additional_requirements TEXT,
    preferred_date TEXT,

    -- Status and Assignment (Production Features) --
    status TEXT NOT NULL DEFAULT 'pending',  -- pending, contacted, scheduled, completed, cancelled
    assigned_to TEXT,                         -- Team member assigned
    priority TEXT NOT NULL DEFAULT 'normal', -- low, normal, high, urgent

    -- Audit Trail --
    submitted_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    contacted_at TIMESTAMP,    -- When first contact was made
    scheduled_at TIMESTAMP,    -- When meeting/demo was scheduled
    completed_at TIMESTAMP,    -- When request was completed

    -- Soft Delete Support --
    deleted_at TIMESTAMP,      -- For GDPR compliance
    deleted_by TEXT,           -- Who deleted the record

    -- Analytics and Tracking --
    source TEXT NOT NULL DEFAULT 'website',  -- website, referral, social, etc.
    utm_data TEXT,                            -- UTM parameters as JSON
    ip_address TEXT,                          -- For security and analytics
    user_agent TEXT                           -- Browser/device info
);
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

## Indexes and Performance

### Primary Indexes
```sql
-- Performance optimization indexes
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
```

## Security Features

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

## Audit Trail and Compliance

### Automatic Timestamp Updates
```sql
-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all relevant tables
CREATE TRIGGER update_requests_updated_at
    BEFORE UPDATE ON requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### Comprehensive Audit Logging
```sql
-- Audit log table for critical changes
CREATE TABLE audit_log (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    record_id TEXT NOT NULL,
    action TEXT NOT NULL,  -- INSERT, UPDATE, DELETE
    old_values JSONB,
    new_values JSONB,
    changed_by TEXT,
    changed_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Audit triggers on critical tables
CREATE TRIGGER audit_requests
    AFTER INSERT OR UPDATE OR DELETE ON requests
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```

## Analytics and Reporting

### Performance Views
```sql
-- Request analytics view
CREATE VIEW requests_analytics AS
SELECT
    date_trunc('day', submitted_at) as date,
    status,
    priority,
    request_types,
    source,
    COUNT(*) as count,
    AVG(EXTRACT(epoch FROM (contacted_at - submitted_at))/3600) as avg_response_time_hours
FROM requests
WHERE deleted_at IS NULL
GROUP BY date_trunc('day', submitted_at), status, priority, request_types, source;

-- Team performance view
CREATE VIEW team_performance AS
SELECT
    assigned_to,
    COUNT(*) as total_requests,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_requests,
    AVG(CASE WHEN completed_at IS NOT NULL
        THEN EXTRACT(epoch FROM (completed_at - submitted_at))/86400
        END) as avg_completion_days
FROM requests
WHERE deleted_at IS NULL
GROUP BY assigned_to;
```

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
1. **Transaction Pooler** (Port 6543) - **RECOMMENDED**
   - Ideal for serverless/stateless applications
   - Best for Replit deployments
   - Automatic connection pooling

2. **Direct Connection** (Port 5432)
   - For persistent, long-lived connections
   - Virtual machines or containers

3. **Session Pooler** (Port 5432)
   - Alternative to direct connection
   - IPv4 networks only

## Migration Strategy

### Migration Files Location
- **Drizzle Migrations**: `/migrations/*.sql`
- **Supabase Migrations**: `/supabase/migrations/*.sql`

### Execution Order
1. `0000_loose_ironclad.sql` - Initial schema creation
2. `0001_rename_demo_requests_to_requests.sql` - Table name alignment
3. `0002_add_production_features.sql` - Production enhancements

### Running Migrations
```bash
# Apply Drizzle migrations
npm run db:push

# Or apply Supabase migrations manually in dashboard
# Execute SQL files in Supabase SQL Editor
```

## API Endpoints

### Public Endpoints
- `POST /api/contact` - Contact form submissions
- `POST /api/request` - Demo/Assessment/Showcase requests
- `POST /api/newsletter` - Newsletter subscriptions

### Admin Endpoints
- `GET /api/admin/contacts` - Retrieve contact submissions
- `GET /api/admin/requests` - Retrieve all requests
- `GET /api/admin/newsletter` - Retrieve newsletter subscriptions

### Health Check
- `GET /api/health/database` - Database connectivity and status

## Scalability Considerations

### Current Optimizations
- Connection pooling via Transaction Pooler
- Proper indexing strategy
- Soft delete for data recovery
- Audit logging for compliance

### Future Enhancements
- Read replicas for analytics queries
- Redis caching layer for frequently accessed data
- Database sharding for extreme scale
- Automated backup and recovery system

## GDPR Compliance

### Data Privacy Features
- **Soft Delete**: Records marked as deleted, not physically removed
- **Audit Trail**: Complete history of data changes
- **Data Portability**: Easy export via API endpoints
- **Right to Erasure**: Soft delete with recovery capability

### Personal Data Handling
- Email addresses indexed for quick lookup
- IP addresses stored for security analysis
- User agent strings for analytics
- All personal data can be anonymized or removed upon request

## Monitoring and Health Checks

### Database Health Endpoint: `/api/health/database`
Returns comprehensive database status including:
```json
{
  "timestamp": "2025-01-13T10:30:00.000Z",
  "database": {
    "connected": true,
    "type": "postgresql",
    "tables": ["users", "contact_submissions", "newsletter_subscriptions", "requests"],
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
- Table record counts
- Failed request rates
- Storage usage trends

## Conclusion

This database architecture provides:
- **100% Production Ready** with robust error handling
- **Scalable** design for future growth
- **GDPR Compliant** with audit trail and soft delete
- **High Performance** with optimized indexes
- **Maintainable** with clear separation of concerns
- **Secure** with RLS policies and validation

The hybrid Drizzle + Supabase approach offers the best of both worlds: type safety with powerful cloud database features.