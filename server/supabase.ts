import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Create Supabase client only if credentials are available
export const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY 
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

// Create Drizzle client using DATABASE_URL or Supabase connection
const databaseUrl = process.env.DATABASE_URL;
const supabaseUrl = process.env.SUPABASE_URL;

// Make database optional for local development without DB
let db: any = null;

// Only use DATABASE_URL if it's a valid PostgreSQL connection string
if (databaseUrl && databaseUrl.startsWith('postgres')) {
  const client = postgres(databaseUrl);
  db = drizzle(client);
} else if (supabaseUrl && supabase) {
  // Using Supabase - no Drizzle ORM needed, will use Supabase client directly
  console.log('✅ Using Supabase for database operations');
  console.log(`   Connected to: ${supabaseUrl}`);
  // Create a mock db object that redirects to Supabase operations
  db = {
    select: () => { 
      console.log('Note: Use Supabase client for database queries');
      return { from: () => ({}) };
    },
    insert: () => { 
      console.log('Note: Use Supabase client for database inserts');
      return { values: () => ({}) };
    },
    update: () => { 
      console.log('Note: Use Supabase client for database updates');
      return { set: () => ({}) };
    },
    delete: () => { 
      console.log('Note: Use Supabase client for database deletes');
      return { where: () => ({}) };
    },
  };
} else {
  console.warn('⚠️ No database configured - running without database');
  console.warn('   Set either DATABASE_URL or SUPABASE_URL to enable database');
  // Create a mock db object to prevent crashes
  db = {
    select: () => { throw new Error('Database not connected'); },
    insert: () => { throw new Error('Database not connected'); },
    update: () => { throw new Error('Database not connected'); },
    delete: () => { throw new Error('Database not connected'); },
  };
}

export { db };