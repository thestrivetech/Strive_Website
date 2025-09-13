-- Create requests table for handling all request types
-- This table handles: Demo requests, Solution Showcase requests, and Assessment requests
-- Based on shared/schema.ts requests definition

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_requests_email ON requests(email);
CREATE INDEX IF NOT EXISTS idx_requests_request_types ON requests(request_types);
CREATE INDEX IF NOT EXISTS idx_requests_submitted_at ON requests(submitted_at);
CREATE INDEX IF NOT EXISTS idx_requests_company ON requests(company);
CREATE INDEX IF NOT EXISTS idx_requests_industry ON requests(industry);

-- Enable Row Level Security (RLS) for better security
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Requests can be inserted by anyone (public form)
CREATE POLICY "Anyone can insert requests" ON requests
    FOR INSERT WITH CHECK (true);

-- Only authenticated admin users can view requests
-- Note: This policy will need to be updated once admin authentication is implemented
CREATE POLICY "Admin can view all requests" ON requests
    FOR SELECT USING (true); -- Temporarily allow all reads for testing

-- Add check constraint to ensure at least one request type is selected
ALTER TABLE requests 
ADD CONSTRAINT check_request_types_not_empty 
CHECK (length(trim(request_types)) > 0);

-- Add check constraint to ensure valid email format (basic check)
ALTER TABLE requests 
ADD CONSTRAINT check_valid_email 
CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add comments for documentation
COMMENT ON TABLE requests IS 'Handles all types of service requests: demos, solution showcases, and assessments';
COMMENT ON COLUMN requests.request_types IS 'Comma-separated list of requested services (demo, showcase, assessment)';
COMMENT ON COLUMN requests.current_challenges IS 'JSON array of business challenges stored as text';
COMMENT ON COLUMN requests.demo_focus_areas IS 'JSON array of specific focus areas for demos stored as text';