# 🚀 Production Deployment Guide - Supabase + Vercel

# Precheck before pushing to production #

  Here's the pre-production checklist:

  Essential:
  npm run check          # TypeScript type checking (REQUIRED)
  npm run build          # Verify production build works

  Recommended:
  npm run test:run       # Run all tests once
  npm run test:e2e       # Run end-to-end tests (if applicable)

  Optional but helpful:
  npm run build:analyze  # Check bundle sizes
  npm run test:coverage  # Check test coverage

  The build process now automatically injects cache-busting versions, so the new cache fixes will be applied automatically on your next deployment to production.


## Prerequisites
```bash
# Install required CLIs
npm install -g @supabase/cli
npm install -g vercel
```

## Step 1: Supabase Setup

### 1.1 Create Supabase Project
```bash
# Login to Supabase
supabase login

# Initialize project locally
supabase init

# Link to your Supabase project (create one at supabase.com first)
supabase link --project-ref YOUR_PROJECT_REF
```

### 1.2 Run Database Migration
```bash
# Push the database schema to Supabase
supabase db push

# OR run the migration SQL manually:
# 1. Go to https://supabase.com/dashboard
# 2. Select your project
# 3. Go to SQL Editor
# 4. Copy and run the contents of supabase-migration.sql
```

### 1.3 Get Supabase Environment Variables
```bash
# Get your project details
supabase status

# Copy these values:
# - API URL: https://YOUR_PROJECT_ID.supabase.co
# - anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# - service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 2: Vercel Deployment

### 2.1 Prepare Environment Variables
Create a `.env.production` file:
```bash
# Database Configuration
DATABASE_URL=postgresql://postgres.YOUR_PROJECT_ID:YOUR_DB_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@strivetech.ai

# Application Configuration
NODE_ENV=production
PORT=3000
```

### 2.2 Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy the project
vercel

# Follow the prompts:
# ? Set up and deploy "Strive_Website_Replit"? [Y/n] y
# ? Which scope do you want to deploy to? (your-team)
# ? Link to existing project? [y/N] n
# ? What's your project's name? strive-website
# ? In which directory is your code located? ./

# Add environment variables to Vercel
vercel env add DATABASE_URL
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASSWORD
vercel env add SMTP_FROM
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

## Step 3: Post-Deployment Verification

### 3.1 Test Database Connection
```bash
# Visit your deployed site and check browser console
# Look for: "✅ Supabase database connection verified"
# Or: "❌ Supabase connection failed"

# Test each form:
# 1. Contact form: /contact
# 2. Newsletter signup: (footer of any page)
# 3. Request form: /request
```

### 3.2 Verify Data in Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Table Editor
4. Check that data appears in:
   - `contact_submissions`
   - `newsletter_subscriptions`
   - `requests`

### 3.3 Test Email Delivery
- Submit a contact form
- Check if emails are received at the team addresses:
  - garrettholland@strivetech.ai
  - jeffmeyer@strivetech.ai
  - grantramey@strivetech.ai
  - contact@strivetech.ai

## Step 4: Domain Setup (Optional)

### 4.1 Add Custom Domain to Vercel
```bash
# Add your domain
vercel domains add yourdomain.com

# Add www subdomain
vercel domains add www.yourdomain.com

# Follow DNS configuration instructions from Vercel
```

## Step 5: Monitoring & Health Checks

### 5.1 Create Health Check Endpoint
Add this to your deployment verification:
```bash
# Check database health
curl https://your-domain.com/api/health/database

# Expected response:
{
  "healthy": true,
  "checks": {
    "supabase_configured": true,
    "database_url_configured": true,
    "storage_type": "supabase",
    "connection_test": true
  }
}
```

### 5.2 Set Up Monitoring
- Enable Vercel Analytics in your dashboard
- Set up Supabase monitoring for database performance
- Configure email delivery monitoring

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   ```bash
   # Check environment variables
   vercel env ls

   # Verify DATABASE_URL format
   # Should be: postgresql://postgres.PROJECT_ID:PASSWORD@host:6543/postgres
   ```

2. **Email Not Sending**
   ```bash
   # Check SMTP credentials
   # For Gmail, use App Password, not regular password
   # Enable 2-factor authentication first
   ```

3. **Build Failures**
   ```bash
   # Check TypeScript errors
   npm run check

   # Check build locally
   npm run build
   ```

4. **Forms Not Submitting**
   - Check browser console for JavaScript errors
   - Verify CORS settings if needed
   - Check network tab for failed API calls

## Emergency Rollback
```bash
# Roll back to previous deployment
vercel rollback
```

## Success Checklist ✅

- [ ] Supabase project created and linked
- [ ] Database migration completed
- [ ] All environment variables configured in Vercel
- [ ] Site deployed and accessible
- [ ] Database connection verified (green checkmark in logs)
- [ ] Contact form saves data to Supabase
- [ ] Newsletter signup saves data to Supabase
- [ ] Request form saves data to Supabase
- [ ] Email notifications working
- [ ] Custom domain configured (if applicable)
- [ ] Health check endpoint responding correctly

## Support

If you encounter issues:

1. Check Vercel deployment logs: `vercel logs`
2. Check Supabase logs in the dashboard
3. Test database connection manually using the SQL editor
4. Verify environment variables are set correctly

Your Strive Tech website should now be fully operational in production! 🎉