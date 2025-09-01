import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL environment variable is required');
}

if (!process.env.SUPABASE_ANON_KEY) {
  throw new Error('SUPABASE_ANON_KEY environment variable is required');
}

// Create Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Create Drizzle client using Supabase's database URL
// Note: For direct database access, we need the database connection string
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL or SUPABASE_URL is required for database connection');
}

const client = postgres(databaseUrl);
export const db = drizzle(client);