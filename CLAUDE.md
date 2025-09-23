# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Strive Tech website - a full-stack TypeScript application for an AI-powered business solutions company. The website showcases AI/ML services, resources, case studies, and provides client portals.

**Tech Stack:**
- Frontend: React 19 + TypeScript + Vite + Tailwind CSS + Wouter routing
- Backend: Express.js + Node.js 22 + PostgreSQL (Supabase) + Drizzle ORM
- UI: Radix UI + shadcn/ui components
- Email: Custom template engine with sophisticated HTML email components
- Testing: Vitest + Playwright + Testing Library
- Deployment: Vercel

## Essential Commands

### Development
```bash
npm run dev          # Start development server at localhost:5000
npm run build        # Build for production (client + server via esbuild)
npm run build:analyze # Build with rollup bundle analyzer → stats.html
npm start           # Start production server
npm run check       # TypeScript type checking (run before commits)
```

### Database (Supabase + Drizzle)
```bash
npm run db:push      # Push schema changes to database
npm run db:migrate   # Push to Supabase database (alias: npx supabase db push)
npm run db:reset     # Reset Supabase database (⚠️ DESTRUCTIVE)
npm run supabase:start # Start local Supabase instance
npm run supabase:stop  # Stop local Supabase
npm run supabase:status # Check local Supabase status
```

### Testing
```bash
npm run test         # Run Vitest tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run with coverage report
npm run test:ui      # Open Vitest UI interface
npm run test:watch   # Explicit watch mode
npm run test:changed # Run tests for changed files only
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:install # Install Playwright browsers
```

### Utility Scripts
```bash
npm run session:init # Initialize session (custom script)
npm run map:directory # Directory mapping utility
```

## Architecture

### Project Structure
```
client/src/          # React frontend
├── components/ui/   # shadcn/ui components
├── components/layout/ # Navigation, footer
├── pages/          # Route components (lazy-loaded)
├── hooks/          # Custom React hooks
├── lib/            # Utilities, configs
└── data/           # Static content, blog posts

server/             # Express.js backend
├── index.ts        # Main server entry point
├── routes/         # API handlers
├── middleware/     # Express middleware
├── services/       # Business logic (email, etc.)
└── lib/            # Server utilities

shared/             # Shared types and Drizzle schema
├── schema.ts       # Drizzle database schema
└── types.ts        # Shared TypeScript types

scripts/            # Utility scripts
api/                # Vercel serverless functions
migrations/         # Database migrations
supabase/           # Supabase configuration
```

### Key Patterns

**Frontend:**
- Lazy loading for pages and non-critical components
- Path aliases: `@/` → `client/src/`, `@shared/` → `shared/`
- PWA with service workers and offline support via vite-plugin-pwa
- Performance optimized with manual bundle chunking
- Mobile-first responsive design with touch optimization

**Backend:**
- Express.js with comprehensive security middleware (Helmet, rate limiting)
- Authentication via Passport.js with local strategy + JWT sessions
- Drizzle ORM with PostgreSQL via Supabase
- Winston structured logging
- Custom email template engine with reusable HTML components

**Email System:**
- Sophisticated template engine in `server/services/email/`
- Reusable email components (intelligence dashboards, timelines, etc.)
- 100% delivery rate confirmed for production emails
- Templates for contact forms, newsletters, service requests

**Database Schema (shared/schema.ts):**
- Users, contact submissions, service requests, newsletter subscriptions
- UUID primary keys with `gen_random_uuid()`
- Proper TypeScript types auto-generated from Drizzle schema
- Zod validation schemas for API endpoints

## Development Notes

### Environment Setup
- Requires Node.js 22.x (specified in engines)
- Environment variables: `DATABASE_URL`, `SMTP_*` for email service
- Uses ES modules (`"type": "module"` in package.json)
- Development server runs on port 5000 by default

### Code Conventions
- Strict TypeScript with full type coverage
- All UI components follow shadcn/ui patterns in `components/ui/`
- Pages are lazy-loaded (except home) for performance
- Image assets optimized with multiple formats in `assets/optimized/`
- Email templates use sophisticated HTML with inline CSS

### Performance Optimizations
- Manual bundle chunks: vendor, UI components, utilities
- PWA with workbox caching strategies
- Compression and security headers configured
- Bundle analysis with rollup-plugin-visualizer
- React 19 with concurrent features

### Email Development
- Custom template engine with BaseTemplate class
- EmailComponents library for reusable elements
- Template factory pattern for email types
- Comprehensive testing with curl commands available

### Testing Strategy
- Unit tests: Vitest + @testing-library/react + jsdom
- E2E tests: Playwright with cross-browser support
- MSW for API mocking in tests
- Coverage reporting with @vitest/coverage-v8

### Mobile Optimization
- Touch targets ≥ 44px minimum
- Keyboard-aware layouts (viewport adjustments)
- Safe area support for notched devices
- Responsive breakpoints: mobile → md → lg → xl

### Common Development Tasks

**API Endpoint Testing:**
```bash
# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","company":"Test Corp","companySize":"50-100 employees","message":"Test message","privacyConsent":true}'

# Health checks
curl http://localhost:5000/api/health/database
curl http://localhost:5000/api/debug/email
```

**Process Management:**
```bash
# Find process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Alternative port usage
cross-env PORT=5001 npm run dev
```

Always run `npm run check` before committing to ensure TypeScript compliance.