#!/usr/bin/env node

/**
 * Database Initialization Script
 * Run this after updating .env with your Supabase credentials
 *
 * Usage: node scripts/init-database.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Strive Tech App - Database Initialization\n');

// Check if .env or .env.local exists
const envPath = fs.existsSync('.env.local') ? '.env.local' : '.env';
if (!fs.existsSync(envPath)) {
  console.error('❌ Error: No .env or .env.local file found!');
  console.log('Please create one with your Supabase credentials.');
  process.exit(1);
}

// Load environment variables
require('dotenv').config({ path: envPath });

// Check required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'DIRECT_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
];

const missingVars = requiredEnvVars.filter(
  (varName) => !process.env[varName] || process.env[varName].includes('[')
);

if (missingVars.length > 0) {
  console.error('❌ Missing or incomplete environment variables:');
  missingVars.forEach((varName) => {
    console.error(`   - ${varName}`);
  });
  console.log('\n📝 Please update your .env file with actual values from Supabase dashboard:');
  console.log('   1. Go to https://supabase.com/dashboard');
  console.log('   2. Select your project in "Strive-App-Creation" organization');
  console.log('   3. Go to Settings > Database for connection strings');
  console.log('   4. Go to Settings > API for API keys\n');
  process.exit(1);
}

console.log('✅ Environment variables loaded successfully\n');

// Function to run commands with error handling
function runCommand(command, description) {
  console.log(`⏳ ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed!\n`);
  } catch (error) {
    console.error(`❌ Failed to ${description.toLowerCase()}`);
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Main initialization flow
async function initDatabase() {
  try {
    // 1. Generate Prisma Client
    runCommand('npx prisma generate', 'Generating Prisma Client');

    // 2. Push schema to database (creates tables)
    console.log('📊 Creating database tables...');
    console.log('This will create all tables defined in prisma/schema.prisma\n');
    runCommand('npx prisma db push', 'Pushing schema to database');

    // 3. Check connection
    console.log('🔍 Verifying database connection...');
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    try {
      await prisma.$connect();
      console.log('✅ Successfully connected to database!\n');

      // Get table count
      const result = await prisma.$queryRaw`
        SELECT COUNT(*) as count
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      `;
      console.log(`📊 Created ${result[0].count} tables in the database\n`);

      await prisma.$disconnect();
    } catch (error) {
      console.error('❌ Failed to connect to database');
      console.error('Error:', error.message);
      process.exit(1);
    }

    console.log('🎉 Database initialization complete!\n');
    console.log('Next steps:');
    console.log('1. Run `npm run dev` to start the development server');
    console.log('2. Visit http://localhost:3000 to see your app');
    console.log('3. Use `npx prisma studio` to explore your database\n');

  } catch (error) {
    console.error('❌ Initialization failed:', error.message);
    process.exit(1);
  }
}

// Run the initialization
initDatabase();