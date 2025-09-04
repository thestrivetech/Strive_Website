import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Create Supabase client only if credentials are available
export const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY 
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

// Create Drizzle client using DATABASE_URL (Replit's built-in database)
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL or SUPABASE_URL is required for database connection');
}

const client = postgres(databaseUrl);
export const db = drizzle(client);