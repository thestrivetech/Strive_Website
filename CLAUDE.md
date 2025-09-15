# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Strive Tech website - a full-stack TypeScript application for an AI-powered business solutions company. The website showcases AI/ML services, resources, case studies, and provides client portals.

**Tech Stack:**
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS + Wouter routing
- Backend: Express.js + Node.js 22 + PostgreSQL (Supabase) + Drizzle ORM
- UI: Radix UI + shadcn/ui components
- Testing: Vitest + Playwright
- Deployment: Vercel

## Essential Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production (client + server)
npm run build:analyze # Build with bundle analyzer
npm start           # Start production server
npm run check       # TypeScript type checking
```

### Database (Supabase + Drizzle)
```bash
npm run db:push      # Push schema changes
npm run db:migrate   # Push to Supabase database
npm run db:reset     # Reset Supabase database
npm run supabase:start # Start local Supabase
```

### Testing
```bash
npm run test         # Run Vitest tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run with coverage
npm run test:e2e     # Run Playwright E2E tests
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
└── data/           # Static content

server/             # Express.js backend
├── routes/         # API handlers
├── middleware/     # Express middleware
└── lib/            # Server utilities

shared/             # Shared types and Drizzle schema
```

### Key Patterns

**Frontend:**
- Lazy loading for pages and non-critical components
- Path aliases: `@/` → `client/src/`, `@shared/` → `shared/`
- PWA with service workers and offline support
- Performance optimized with code splitting and image optimization

**Backend:**
- Express.js with security middleware (Helmet, rate limiting)
- Passport.js authentication with local strategy + JWT
- Drizzle ORM with PostgreSQL via Supabase
- Winston logging with structured output

**Database Schema (shared/schema.ts):**
- Users, contact submissions, requests, newsletter subscriptions
- Proper TypeScript types generated from Drizzle schema

## Development Notes

### Environment Setup
- Requires Node.js 22.x
- Environment variables needed: `DATABASE_URL` for Supabase connection
- Uses ES modules (`"type": "module"` in package.json)

### Code Conventions
- Strict TypeScript with full type coverage
- UI components follow shadcn/ui patterns in `components/ui/`
- All pages lazy-loaded except home page for performance
- Image assets optimized with multiple formats (webp, avif) in `assets/optimized/`

### Performance Optimizations
- Manual bundle chunks for vendor, UI, utils libraries
- PWA with comprehensive caching strategies
- Compression and security headers configured
- Build analyzer available with `npm run build:analyze`

### Testing Strategy
- Unit tests with Vitest + Testing Library
- E2E tests with Playwright
- Coverage reporting enabled

Always run `npm run check` before committing to ensure TypeScript compliance.