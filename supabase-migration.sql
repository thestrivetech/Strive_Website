-- Strive Tech Website Database Migration
-- Run this SQL in your Supabase SQL Editor to create all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email_verified TEXT NOT NULL DEFAULT 'false',
    verification_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    phone TEXT,
    company_size TEXT,
    message TEXT NOT NULL,
    privacy_consent TEXT NOT NULL DEFAULT 'false',
    submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Service/Demo requests
CREATE TABLE IF NOT EXISTS requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- Contact Information
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT NOT NULL,
    job_title TEXT,

    -- Business Information
    industry TEXT,
    company_size TEXT,
    current_challenges TEXT, -- JSON array as text
    project_timeline TEXT,
    budget_range TEXT,

    -- Request Information
    request_types TEXT NOT NULL, -- Comma-separated values
    demo_focus_areas TEXT, -- JSON array as text
    additional_requirements TEXT,
    preferred_date TEXT,

    -- Status and Assignment
    status TEXT NOT NULL DEFAULT 'pending',
    assigned_to TEXT,
    priority TEXT NOT NULL DEFAULT 'normal',

    -- Audit Trail
    submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    contacted_at TIMESTAMPTZ,
    scheduled_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,

    -- Soft Delete Support
    deleted_at TIMESTAMPTZ,
    deleted_by TEXT,

    -- Analytics and Tracking
    source TEXT NOT NULL DEFAULT 'website',
    utm_data TEXT, -- UTM parameters as JSON
    ip_address TEXT,
    user_agent TEXT
);

-- Analytics tables for tracking
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    user_id TEXT,
    url TEXT NOT NULL,
    path TEXT NOT NULL,
    title TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    country TEXT,
    city TEXT,
    device TEXT,
    browser TEXT,
    os TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    view_duration INTEGER,
    timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL UNIQUE,
    user_id TEXT,
    start_time TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    end_time TIMESTAMPTZ,
    duration INTEGER,
    page_views INTEGER DEFAULT 0,
    bounced BOOLEAN DEFAULT false,
    converted BOOLEAN DEFAULT false,
    user_agent TEXT,
    ip_address TEXT,
    country TEXT,
    city TEXT,
    device TEXT,
    browser TEXT,
    os TEXT,
    referrer TEXT,
    entry_page TEXT,
    exit_page TEXT
);

CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    user_id TEXT,
    event_type TEXT NOT NULL,
    event_name TEXT NOT NULL,
    element_id TEXT,
    element_class TEXT,
    element_text TEXT,
    url TEXT NOT NULL,
    path TEXT NOT NULL,
    x_position INTEGER,
    y_position INTEGER,
    scroll_depth INTEGER,
    properties JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS web_vitals_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    user_id TEXT,
    url TEXT NOT NULL,
    path TEXT NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value REAL NOT NULL,
    metric_rating TEXT NOT NULL,
    metric_id TEXT NOT NULL,
    user_agent TEXT,
    device TEXT,
    browser TEXT,
    connection_type TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS analytics_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    conditions JSONB NOT NULL,
    value REAL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS goal_conversions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id UUID NOT NULL,
    session_id TEXT NOT NULL,
    user_id TEXT,
    value REAL,
    url TEXT NOT NULL,
    path TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_requests_email ON requests(email);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_submitted_at ON requests(submitted_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);

-- Enable Row Level Security (RLS) for security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_vitals_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_conversions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
-- These allow your application to read/write data using the service role key

-- Contact submissions - allow insert for public, full access for authenticated
CREATE POLICY "Allow public contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role access to contact submissions" ON contact_submissions FOR ALL USING (auth.role() = 'service_role');

-- Newsletter subscriptions - allow insert for public, full access for authenticated
CREATE POLICY "Allow public newsletter signups" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role access to newsletter" ON newsletter_subscriptions FOR ALL USING (auth.role() = 'service_role');

-- Requests - allow insert for public, full access for authenticated
CREATE POLICY "Allow public request submissions" ON requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role access to requests" ON requests FOR ALL USING (auth.role() = 'service_role');

-- Analytics tables - allow insert for public, full access for authenticated
CREATE POLICY "Allow public analytics" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role access to page_views" ON page_views FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public user sessions" ON user_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role access to user_sessions" ON user_sessions FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public analytics events" ON analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role access to analytics_events" ON analytics_events FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public web vitals" ON web_vitals_metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role access to web_vitals" ON web_vitals_metrics FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role access to analytics_goals" ON analytics_goals FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service role access to goal_conversions" ON goal_conversions FOR ALL USING (auth.role() = 'service_role');

-- Users table - full access for service role only
CREATE POLICY "Allow service role access to users" ON users FOR ALL USING (auth.role() = 'service_role');

NOTIFY pgrst, 'reload schema';