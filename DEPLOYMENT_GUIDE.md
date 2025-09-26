# Deployment Guide - Strive Tech Website

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual values

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Run production build locally
npm start
```

## 📦 Deployment Options

### Option 1: Vercel with Serverless Functions (Recommended)

**Use this for:** Quick deployment with minimal configuration

1. **Connect GitHub to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

2. **Environment Variables in Vercel Dashboard**
   ```
   # Required for production
   SITE_URL=https://strivetech.ai
   DATABASE_URL=your_postgres_connection_string

   # Email configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=contact@strivetech.ai
   SMTP_PASS=your_app_password
   SMTP_FROM=contact@strivetech.ai
   SMTP_SECURE=false

   # Optional
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   ```

3. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Preview deployments for pull requests

### Option 2: Traditional Node.js Hosting

**Use this for:** Full control over the Express server

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set environment variables on your server**
   ```bash
   export PORT=3000  # Or your preferred port
   export NODE_ENV=production
   export SITE_URL=https://strivetech.ai
   # ... other environment variables
   ```

3. **Start the server**
   ```bash
   npm start
   # Or use PM2 for process management
   pm2 start dist/index.js --name strive-website
   ```

## 🔧 Configuration Files

### `vercel.json` (Current)
- Static site deployment with API routes
- Serverless functions in `/api` folder
- Optimized caching headers

### `vercel-serverless.json` (Alternative)
- Full serverless configuration
- Better for scaling
- Includes all security headers

### `.env.example`
- Template for environment variables
- Copy to `.env` for local development
- Add values to Vercel dashboard for production

## 📝 Important Notes

### Port Configuration
- **Local development**: Default port is 3000 (configurable via `PORT` env var)
- **Vercel deployment**: Port is managed by Vercel (ignore local port settings)
- **Traditional hosting**: Set `PORT` environment variable

### API Endpoints
Your app has two API implementations:
1. **Express routes** (`server/routes.ts`) - Used in local dev and traditional hosting
2. **Vercel functions** (`/api` folder) - Used in Vercel deployment

Both implement the same endpoints:
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter` - Newsletter signup
- `POST /api/service-request` - Service request form

### Database
- Uses PostgreSQL (can be Supabase, Neon, or any PostgreSQL provider)
- Ensure `DATABASE_URL` is set in production
- Run migrations: `npm run db:push`

### Email Service
- Configured for Gmail SMTP
- Requires app-specific password (not regular Gmail password)
- Test locally with: `curl http://localhost:3000/api/debug/email`

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Find process on port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # Mac/Linux

# Kill the process or use different port
PORT=3001 npm run dev
```

### Environment Variables Not Loading
- Ensure `.env` file exists in root directory
- Check that `dotenv` is loaded early in `server/index.ts`
- Verify variable names match exactly

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `vercel.json` is valid JSON
- Check that `/api` functions have proper exports

### Email Not Sending
- Verify SMTP credentials are correct
- Check if Gmail app-specific password is used
- Ensure "Less secure app access" is NOT the method (use app passwords)
- Test with: `curl -X POST http://localhost:3000/api/debug/email`

## 📊 Performance Optimization

### Already Implemented
- ✅ PWA with service workers
- ✅ Image optimization (WebP/AVIF)
- ✅ Code splitting and lazy loading
- ✅ Compression middleware
- ✅ Proper cache headers
- ✅ Bundle size optimization

### Monitoring
- Check bundle size: `npm run build:analyze`
- Lighthouse CI config available in `.lighthouserc.json`
- Core Web Vitals tracking implemented

## 🔐 Security

### Implemented Security Features
- ✅ Helmet.js security headers
- ✅ Rate limiting on API routes
- ✅ Input validation with Zod
- ✅ JWT authentication
- ✅ bcrypt password hashing
- ✅ CORS configuration
- ✅ CSP headers for iframe security

### Environment Security
- Never commit `.env` file
- Use different secrets for development and production
- Rotate secrets regularly
- Use strong, random secrets (minimum 32 characters)

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- Project documentation: `CLAUDE.md`

## 🆘 Support

For deployment issues:
1. Check this guide first
2. Review error logs
3. Check environment variables
4. Ensure database connectivity
5. Verify build output in `dist/` folder

---

**Last Updated**: 2024
**Default Port**: 3000
**Node Version**: 22.x
**Build Time**: ~15 seconds
**Bundle Size Target**: <200KB gzipped