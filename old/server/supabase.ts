import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Create Supabase client only if credentials are available
export const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY 
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

// Create Drizzle client using Supabase PostgreSQL connection
let databaseUrl = process.env.DATABASE_URL;

// If DATABASE_URL is not properly set, construct it from Supabase credentials
if (!databaseUrl || databaseUrl.includes('[PROJECT-ID]') || databaseUrl.includes('[DB-PASSWORD]')) {
  if (!process.env.SUPABASE_URL) {
    throw new Error('Either DATABASE_URL or SUPABASE_URL is required for database connection');
  }
  
  // Extract project ID from SUPABASE_URL for PostgreSQL connection
  const projectId = process.env.SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (!projectId) {
    throw new Error('Could not extract project ID from SUPABASE_URL');
  }
  
  // Use Supabase's PostgreSQL connection with service role key as password
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  databaseUrl = `postgresql://postgres.${projectId}:${serviceKey}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
}

const client = postgres(databaseUrl);
export const db = drizzle(client);