# Environment Variable Configuration Guide

## Overview

This document outlines the proper setup of environment variables for the Strive Tech website, covering database connections, SMTP configuration, and authentication setup for all 4 request types (Contact, Assessment, Demo Showcase, Solution Showcase).

## Required Environment Variables

### Database Configuration

#### Option 1: Direct Supabase URL Configuration (Recommended)
```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Client-side Supabase (for Vite)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Option 2: Direct Database URL Configuration
```env
# Database URL (alternative to Supabase config)
DATABASE_URL=postgresql://postgres.project-id:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

#### Option 3: Complete Configuration (Both Methods)
```env
# Supabase Configuration
SUPABASE_URL=https://qnfcdyjhzolhsokblslb.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Direct Database Connection (Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres.qnfcdyjhzolhsokblslb:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Client-side Configuration
VITE_SUPABASE_URL=https://qnfcdyjhzolhsokblslb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### SMTP Email Configuration

```env
# Email Service Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@strivetech.ai
SMTP_PASS=your-google-app-password
SMTP_FROM=contact@strivetech.ai
```

### Authentication Configuration

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Master Admin Credentials (Optional)
MASTER_ADMIN_EMAIL=admin@strivetech.ai
MASTER_ADMIN_PASSWORD=your-secure-admin-password
```

## Deployment-Specific Configurations

### Development (.env.local)
```env
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-dev-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-dev-service-key
DATABASE_URL=postgresql://postgres.project-id:password@db.your-project.supabase.co:5432/postgres

# Development SMTP (optional - can use production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=dev@strivetech.ai
SMTP_PASS=your-dev-app-password
SMTP_FROM=dev@strivetech.ai

# Client-side
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-dev-anon-key
```

### Production (Replit/Vercel)
```env
NODE_ENV=production

# Production Supabase
SUPABASE_URL=https://your-prod-project.supabase.co
SUPABASE_ANON_KEY=your-prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-prod-service-key
DATABASE_URL=postgresql://postgres.prod-project:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Production SMTP
SMTP_HOST=smtp-relay.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@strivetech.ai
SMTP_PASS=your-production-app-password
SMTP_FROM=contact@strivetech.ai

# Production Client-side
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-prod-anon-key
```

## Connection Type Options

### Supabase Database Connection Types

Based on deployment needs, choose the appropriate DATABASE_URL format:

#### 1. Transaction Pooler (Recommended for Serverless)
```env
DATABASE_URL=postgresql://postgres.project-id:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```
- **Best for**: Vercel, Netlify, serverless functions
- **Use case**: Brief, isolated database interactions

#### 2. Direct Connection (Recommended for Traditional Servers)
```env
DATABASE_URL=postgresql://postgres:password@db.project-id.supabase.co:5432/postgres
```
- **Best for**: VPS, dedicated servers, long-running processes
- **Use case**: Persistent connections

#### 3. Session Pooler (Alternative for IPv4 Networks)
```env
DATABASE_URL=postgresql://postgres.project-id:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```
- **Best for**: Networks with IPv4 constraints
- **Use case**: Alternative to direct connection

## Email Configuration Details

### Gmail SMTP Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password as `SMTP_PASS`

3. **Gmail SMTP Settings**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-digit-app-password
   ```

### Custom SMTP Provider
```env
SMTP_HOST=mail.your-domain.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=noreply@your-domain.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@your-domain.com
```

## Request Type Configuration

The system handles 4 request types with the following data flow:

### 1. Contact Requests
- **Endpoint**: `/api/contact`
- **Database**: `contact_submissions` table
- **Email**: Uses `SMTP_*` configuration
- **Recipients**: All team members listed in `server/email.ts`

### 2. Assessment Requests
- **Endpoint**: `/api/request`
- **Database**: `demo_requests` table with `request_types: "assessment"`
- **Email**: Dynamic email templates based on request type
- **Integration**: Calendly scheduling integration

### 3. Demo Showcase Requests  
- **Endpoint**: `/api/request`
- **Database**: `demo_requests` table with `request_types: "demo"` or `"demo,showcase"`
- **Email**: Multi-service email templates
- **Features**: Multiple request type selection

### 4. Solution Showcase Requests
- **Endpoint**: `/api/request`
- **Database**: `demo_requests` table with `request_types: "showcase"`
- **Email**: Industry-specific email content
- **Features**: Business challenge mapping

## Validation and Testing

### Database Connection Test
```javascript
// Test database connectivity
import { db } from './server/supabase';
import { users } from './shared/schema';

async function testDatabase() {
  try {
    const result = await db.select().from(users).limit(1);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}
```

### Email Service Test
```javascript
// Test email connectivity
import { emailService } from './server/email';

async function testEmail() {
  try {
    const isConnected = await emailService.verifyConnection();
    console.log('Email service status:', isConnected);
  } catch (error) {
    console.error('Email service test failed:', error);
  }
}
```

## Security Considerations

### Environment Variable Security
1. **Never commit `.env` files** to version control
2. **Use strong, unique passwords** for all services
3. **Rotate keys regularly**, especially service role keys
4. **Use least privilege principle** for database access

### Database Security
1. **Enable Row Level Security (RLS)** on all tables
2. **Use service role key only for server-side operations**
3. **Use anon key for client-side operations**
4. **Implement proper authentication policies**

### SMTP Security
1. **Use App Passwords** instead of account passwords
2. **Enable SSL/TLS encryption** when available
3. **Limit SMTP access** to specific IP ranges if possible
4. **Monitor email sending quotas** and usage

## Troubleshooting

### Common Database Issues

#### "Either DATABASE_URL or SUPABASE_URL is required"
- **Solution**: Ensure either `DATABASE_URL` or both `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
- **Check**: Environment variables are properly loaded

#### "Connection refused" or "Timeout"
- **Solution**: Verify Supabase project is active and URL is correct
- **Check**: Network connectivity and firewall settings

#### "Role does not exist" or "Authentication failed"
- **Solution**: Verify database credentials and permissions
- **Check**: Service role key has proper permissions

### Common Email Issues

#### "Authentication failed"
- **Solution**: Verify SMTP credentials and app password
- **Check**: Gmail 2FA is enabled and app password is generated

#### "Connection timeout"
- **Solution**: Check SMTP host and port settings
- **Check**: Network allows SMTP connections (port 587/465)

#### "Emails not being received"
- **Solution**: Check spam folders and email addresses
- **Check**: DNS records (SPF, DKIM) for custom domains

## Migration and Setup Commands

### Database Setup
```bash
# Install dependencies
npm install

# Push schema to database
npm run db:push

# Run migrations
npx supabase db push
```

### Environment Setup
```bash
# Copy example environment file
cp .env.example .env

# Edit environment variables
nano .env

# Verify configuration
npm run dev
```

## Support and Resources

- **Supabase Documentation**: https://supabase.com/docs
- **Gmail SMTP Guide**: https://support.google.com/mail/answer/7126229
- **Drizzle ORM Documentation**: https://orm.drizzle.team/
- **Node Mailer Documentation**: https://nodemailer.com/

For additional support with environment configuration, refer to the session logs in `/chat_logs/website_updates/Database/` for specific implementation details and troubleshooting steps.