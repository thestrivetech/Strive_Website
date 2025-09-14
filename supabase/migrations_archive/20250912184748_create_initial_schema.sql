-- Create database tables for Strive Website
-- Based on shared/schema.ts

-- Users table
CREATE TABLE IF NOT EXISTS users (
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

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    phone TEXT,
    company_size TEXT,
    message TEXT NOT NULL,
    privacy_consent TEXT NOT NULL DEFAULT 'false',
    submitted_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);

-- Enable Row Level Security (RLS) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update their own data" ON users  
    FOR UPDATE USING (auth.uid()::text = id);

-- Contact submissions can be inserted by anyone (public form)
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Newsletter subscriptions can be inserted by anyone (public form)  
CREATE POLICY "Anyone can insert newsletter subscriptions" ON newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

-- Requests table for handling all request types
-- This table handles: Demo requests, Solution Showcase requests, and Assessment requests
CREATE TABLE IF NOT EXISTS requests (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    
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
    current_challenges TEXT, -- JSON array stored as text
    project_timeline TEXT,
    budget_range TEXT,
    
    -- Request Information
    request_types TEXT NOT NULL, -- Comma-separated: 'demo,showcase,assessment'
    demo_focus_areas TEXT, -- JSON array stored as text
    additional_requirements TEXT,
    preferred_date TEXT,
    
    -- Submission metadata
    submitted_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create additional indexes for better performance
CREATE INDEX IF NOT EXISTS idx_requests_email ON requests(email);
CREATE INDEX IF NOT EXISTS idx_requests_request_types ON requests(request_types);
CREATE INDEX IF NOT EXISTS idx_requests_submitted_at ON requests(submitted_at);
CREATE INDEX IF NOT EXISTS idx_requests_company ON requests(company);
CREATE INDEX IF NOT EXISTS idx_requests_industry ON requests(industry);

-- Enable Row Level Security (RLS) for requests
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Requests can be inserted by anyone (public form)
CREATE POLICY "Anyone can insert requests" ON requests
    FOR INSERT WITH CHECK (true);

-- Admin users can view requests
CREATE POLICY "Admin can view all requests" ON requests
    FOR SELECT USING (true);

-- Add constraints for data validation
ALTER TABLE requests 
ADD CONSTRAINT check_request_types_not_empty 
CHECK (length(trim(request_types)) > 0);

ALTER TABLE requests 
ADD CONSTRAINT check_valid_email_requests 
CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Admin users can view contact submissions and newsletter subscriptions
-- (You can adjust these policies based on your admin user setup)