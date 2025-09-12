-- Migration to update demo_requests table for multiple request types
-- Run this in Supabase SQL Editor

-- Add new columns to demo_requests table
ALTER TABLE demo_requests 
  ADD COLUMN IF NOT EXISTS full_name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS industry text,
  ADD COLUMN IF NOT EXISTS company_size text,
  ADD COLUMN IF NOT EXISTS current_challenges text,
  ADD COLUMN IF NOT EXISTS project_timeline text,
  ADD COLUMN IF NOT EXISTS budget_range text,
  ADD COLUMN IF NOT EXISTS demo_focus_areas text,
  ADD COLUMN IF NOT EXISTS additional_requirements text;

-- Rename request_type to request_types to support multiple selections
ALTER TABLE demo_requests 
  RENAME COLUMN request_type TO request_types;

-- Remove message column if it exists (replaced by additional_requirements)
ALTER TABLE demo_requests 
  DROP COLUMN IF EXISTS message;

-- Update any existing data to have request_types as comma-separated values
UPDATE demo_requests 
SET request_types = 'demo,showcase' 
WHERE request_types IN ('demo', 'showcase');

-- Add check constraint to ensure at least one request type is selected
ALTER TABLE demo_requests 
ADD CONSTRAINT check_request_types_not_empty 
CHECK (length(trim(request_types)) > 0);