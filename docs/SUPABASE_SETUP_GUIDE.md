# Supabase Database Setup Guide

This guide will help you set up the Supabase database for the Strive website.

## Quick Setup (5 minutes)

### Step 1: Create Supabase Project

1. **Go to [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Click "New Project"**
3. **Fill in project details:**
   - Name: `Strive Website`
   - Database Password: Choose a strong password (save this!)
   - Region: Choose closest to your users
4. **Click "Create new project"**
5. **Wait 2-3 minutes for project to be ready**

### Step 2: Get Your Keys

Once your project is ready:

1. **Go to Settings → API**
2. **Copy these values:**
   - Project URL (looks like: `https://abcdefgh.supabase.co`)
   - `anon` / `public` key (starts with `eyJ...`)
   - `service_role` / `secret` key (starts with `eyJ...`)

### Step 3: Update Environment Variables

Edit your `.env` file:

```env
# Replace these with your actual values from Supabase dashboard
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database URL will be constructed automatically
DATABASE_URL=postgresql://postgres.your-project-id:your-db-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# For frontend (copy the same values)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Create Database Tables

1. **Go to your Supabase project dashboard**
2. **Click "SQL Editor" in the sidebar**
3. **Copy and paste the contents of either migration file:**
   - `supabase/migrations/20250912184748_create_initial_schema.sql` (complete schema)
   - OR `supabase/migrations/20250912185000_add_requests_table.sql` (requests table only)
4. **Click "Run" to execute the SQL**
5. **Verify tables were created by checking the "Table Editor"**

### Step 5: Test the Connection

```bash
# Test database connection
npm run db:push

# Start the application
npm run dev
```

You should see the application start without database errors!

## Detailed Setup Instructions

### Finding Your Database URL

Your database URL follows this pattern:
```
postgresql://postgres.[PROJECT_ID]:[DB_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

Where:
- `PROJECT_ID` is from your Supabase URL (the subdomain)
- `DB_PASSWORD` is the password you set when creating the project

### Database Schema Overview

The migration will create these tables:

| Table | Purpose | Fields |
|-------|---------|--------|
| `users` | User authentication | id, username, email, password, names |
| `contact_submissions` | Contact form | id, names, email, company, message |
| `newsletter_subscriptions` | Newsletter signups | id, email, subscribed_at |
| `requests` | Demo/Assessment/Showcase | id, contact info, business info, request types |

### Row Level Security (RLS)

All tables have RLS enabled with these policies:
- **Public forms**: Anyone can insert (contact, newsletter, requests)
- **Admin access**: Authenticated users can view all data
- **User data**: Users can only see their own profile data

### Environment Variables Reference

```env
# Required for database connection
SUPABASE_URL=https://[PROJECT_ID].supabase.co
SUPABASE_ANON_KEY=[ANON_KEY_FROM_DASHBOARD]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY_FROM_DASHBOARD]

# Auto-constructed (optional override)
DATABASE_URL=postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Frontend environment (for Vite)
VITE_SUPABASE_URL=https://[PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=[ANON_KEY_FROM_DASHBOARD]

# Email configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@strivetech.ai
SMTP_PASS=[GMAIL_APP_PASSWORD]
SMTP_FROM=contact@strivetech.ai

# JWT secret (generate a random string)
JWT_SECRET=[RANDOM_SECRET_STRING]
```

## Troubleshooting

### Common Issues

**"Tenant or user not found"**
- Check your PROJECT_ID in the DATABASE_URL
- Verify your database password is correct
- Make sure your Supabase project is active

**"Connection refused"**
- Check your internet connection
- Verify the Supabase URL is correct
- Try using the connection pooler endpoint

**"Invalid API key"**
- Double-check you copied the keys correctly
- Make sure you're using the right key for the right variable
- Regenerate keys if needed from Supabase dashboard

### Testing Connection

```bash
# Quick connection test
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
console.log('Testing connection...');
supabase.from('users').select('count').then(r => console.log('✅ Connected!', r)).catch(e => console.log('❌ Error:', e.message));
"
```

### Alternative Setup Methods

**Option 1: Local Supabase (Development)**
```bash
npx supabase start
# This starts a local Supabase instance
```

**Option 2: Docker PostgreSQL (Development)**
```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
# Then use: DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
```

## Production Deployment

For production deployment:

1. **Create a production Supabase project**
2. **Set up environment variables in your hosting platform**
3. **Configure domain settings in Supabase**
4. **Set up backups and monitoring**
5. **Configure SMTP for email notifications**

## Next Steps

After successful setup:

1. **Test all forms:** Contact, Assessment, Demo Request
2. **Verify admin endpoints:** `/api/admin/contacts`, `/api/admin/requests`
3. **Configure email notifications** (SMTP setup)
4. **Set up monitoring and backups**
5. **Deploy to production**

## Support

- **Session Logs:** Check `chat_logs/website_updates/Database/` for detailed setup context
- **Supabase Docs:** https://supabase.com/docs
- **Migration Files:** `supabase/migrations/` folder contains the SQL schemas