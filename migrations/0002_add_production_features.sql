-- Production Enhancement Migration
-- Adds status tracking, audit trail, and analytics to requests table
-- Adds enhanced security and GDPR compliance features

-- Add production columns to requests table
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "status" text NOT NULL DEFAULT 'pending';
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "assigned_to" text;
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "priority" text NOT NULL DEFAULT 'normal';
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "contacted_at" timestamp;
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "scheduled_at" timestamp;
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "completed_at" timestamp;
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "deleted_at" timestamp;
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "deleted_by" text;
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "source" text NOT NULL DEFAULT 'website';
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "utm_data" text;
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "ip_address" text;
ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "user_agent" text;

-- Add constraints for data integrity
ALTER TABLE "requests" ADD CONSTRAINT IF NOT EXISTS "check_status_valid"
  CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled'));

ALTER TABLE "requests" ADD CONSTRAINT IF NOT EXISTS "check_priority_valid"
  CHECK (priority IN ('low', 'normal', 'high', 'urgent'));

-- Create additional indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_requests_status ON "requests"(status);
CREATE INDEX IF NOT EXISTS idx_requests_priority ON "requests"(priority);
CREATE INDEX IF NOT EXISTS idx_requests_assigned_to ON "requests"(assigned_to);
CREATE INDEX IF NOT EXISTS idx_requests_updated_at ON "requests"(updated_at);
CREATE INDEX IF NOT EXISTS idx_requests_deleted_at ON "requests"(deleted_at);
CREATE INDEX IF NOT EXISTS idx_requests_source ON "requests"(source);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_requests_status_priority ON "requests"(status, priority);
CREATE INDEX IF NOT EXISTS idx_requests_assigned_status ON "requests"(assigned_to, status);

-- Add updated_at trigger to automatically update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_requests_updated_at ON "requests";
CREATE TRIGGER update_requests_updated_at
    BEFORE UPDATE ON "requests"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add audit trail for contact_submissions
ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "deleted_at" timestamp;
ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "ip_address" text;
ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "user_agent" text;
ALTER TABLE "contact_submissions" ADD COLUMN IF NOT EXISTS "source" text NOT NULL DEFAULT 'website';

-- Add trigger for contact_submissions updated_at
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON "contact_submissions";
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON "contact_submissions"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add audit trail for newsletter_subscriptions
ALTER TABLE "newsletter_subscriptions" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "newsletter_subscriptions" ADD COLUMN IF NOT EXISTS "deleted_at" timestamp;
ALTER TABLE "newsletter_subscriptions" ADD COLUMN IF NOT EXISTS "ip_address" text;
ALTER TABLE "newsletter_subscriptions" ADD COLUMN IF NOT EXISTS "source" text NOT NULL DEFAULT 'website';

-- Add trigger for newsletter_subscriptions updated_at
DROP TRIGGER IF EXISTS update_newsletter_subscriptions_updated_at ON "newsletter_subscriptions";
CREATE TRIGGER update_newsletter_subscriptions_updated_at
    BEFORE UPDATE ON "newsletter_subscriptions"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create analytics helper views
CREATE OR REPLACE VIEW requests_analytics AS
SELECT
    date_trunc('day', submitted_at) as date,
    status,
    priority,
    request_types,
    source,
    COUNT(*) as count,
    AVG(EXTRACT(epoch FROM (contacted_at - submitted_at))/3600) as avg_response_time_hours
FROM "requests"
WHERE deleted_at IS NULL
GROUP BY date_trunc('day', submitted_at), status, priority, request_types, source
ORDER BY date DESC;

-- Create performance monitoring view
CREATE OR REPLACE VIEW team_performance AS
SELECT
    assigned_to,
    COUNT(*) as total_requests,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_requests,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_requests,
    AVG(CASE WHEN completed_at IS NOT NULL
        THEN EXTRACT(epoch FROM (completed_at - submitted_at))/86400
        END) as avg_completion_days
FROM "requests"
WHERE deleted_at IS NULL
GROUP BY assigned_to;

-- Add Row Level Security policies for soft deleted records
CREATE POLICY "Hide soft deleted requests" ON "requests"
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Hide soft deleted contacts" ON "contact_submissions"
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Hide soft deleted newsletters" ON "newsletter_subscriptions"
    FOR SELECT USING (deleted_at IS NULL);

-- Create backup/audit table for critical changes
CREATE TABLE IF NOT EXISTS audit_log (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    record_id TEXT NOT NULL,
    action TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    old_values JSONB,
    new_values JSONB,
    changed_by TEXT,
    changed_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_log_table_name ON audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_log_record_id ON audit_log(record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_changed_at ON audit_log(changed_at);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, changed_by)
        VALUES (TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD), current_user);
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(OLD), row_to_json(NEW), current_user);
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, record_id, action, new_values, changed_by)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(NEW), current_user);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply audit triggers to critical tables
DROP TRIGGER IF EXISTS audit_requests ON "requests";
CREATE TRIGGER audit_requests
    AFTER INSERT OR UPDATE OR DELETE ON "requests"
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

DROP TRIGGER IF EXISTS audit_contact_submissions ON "contact_submissions";
CREATE TRIGGER audit_contact_submissions
    AFTER INSERT OR UPDATE OR DELETE ON "contact_submissions"
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();