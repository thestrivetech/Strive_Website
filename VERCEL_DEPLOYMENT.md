# Vercel Deployment Guide

## Environment Variables Required for Vercel

Set these environment variables in your Vercel dashboard:

### Database Configuration
```bash
NODE_ENV=production
DATABASE_URL=postgresql://postgres.qnfcdyjhzolhsokblslb:StriveDatabase$99@aws-1-us-east-1.pooler.supabase.com:6543/postgres
```

### Supabase Configuration
```bash
SUPABASE_URL=https://qnfcdyjhzolhsokblslb.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZmNkeWpoemvbaHNva2Jsc2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0Njg5OTIsImV4cCI6MjA0ODA0NDk5Mn0.wRR2WDz0bxzBEYh-8_ks9D0e15Nm99OAq2OyMT0qL2g
```

### Email Configuration (Gmail SMTP)
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=striveautomated@gmail.com
EMAIL_PASS=mttz fvcr xbxr rbuf
```

### Session Configuration
```bash
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
```

### Team Email Configuration
```bash
TEAM_EMAILS=garrettholland@strivetech.ai,jeffmeyer@strivetech.ai,grantramey@strivetech.ai,contact@strivetech.ai
```

## Deployment Steps

### 1. Push to GitHub
Ensure your code is pushed to a GitHub repository.

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select "Express.js" as the framework preset (or use custom settings)

### 3. Configure Build Settings
Vercel should automatically detect the settings from `vercel.json`, but verify:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### 4. Set Environment Variables
In the Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add all the environment variables listed above
3. Make sure to set them for "Production", "Preview", and "Development"

### 5. Deploy
Click "Deploy" and Vercel will build and deploy your application.

## Verification Steps

After deployment, verify:

1. **Health Check**: Visit `https://your-app.vercel.app/api/health/database`
   - Should return database connection status
   
2. **Contact Form**: Test form submissions at contact page
   - Should send emails and save to database
   
3. **Request Forms**: Test all 4 request types (Demo, Assessment, Showcase, Contact)
   - Should process and save correctly

4. **Admin Endpoints**: Check admin data endpoints
   - `/api/admin/requests` - Should return request data
   - `/api/admin/contacts` - Should return contact submissions
   - `/api/admin/newsletter` - Should return newsletter subscriptions

## Important Notes

### Database
- Uses Supabase PostgreSQL with Drizzle ORM
- No Supabase functions or triggers needed
- All security handled at application level

### Build Process
- Frontend: Vite builds React app to `dist/public/`
- Backend: esbuild bundles Express server to `dist/index.js`
- Vercel serves static files from `dist/public/` and API routes through `dist/index.js`

### Architecture
- **No direct client-to-database access**
- **Server-side authentication** with Passport.js
- **Express API** handles all database operations
- **Type-safe** with TypeScript and Drizzle ORM

## Troubleshooting

### Common Issues

1. **Environment Variables**: Double-check all env vars are set correctly
2. **Database Connection**: Verify DATABASE_URL is accessible from Vercel
3. **Email Issues**: Confirm Gmail app password is correct
4. **Build Failures**: Check Node.js version (should be 20.x as specified in package.json)

### Support Commands

Test locally before deploying:
```bash
# Test production build
npm run build
npm start

# Test health endpoint
curl http://localhost:3000/api/health/database

# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","company":"Test Co","message":"Test message","privacyConsent":true}'
```

## Success Criteria

✅ **Ready for Production** when:
- All environment variables are set
- Health endpoint returns 200
- Contact and request forms work
- Emails are being sent
- Database is receiving data
- No console errors in browser