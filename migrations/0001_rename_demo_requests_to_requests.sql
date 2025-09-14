-- Migration to rename demo_requests table to requests for consistency
-- This aligns Drizzle migrations with the schema.ts definition

ALTER TABLE "demo_requests" RENAME TO "requests";