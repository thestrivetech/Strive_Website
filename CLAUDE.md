# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Tech Stack

- **Frontend**: React 19 + Vite (in `old/` - current React/Vite app)
- **Backend**: Express.js + Node 22.x
- **Database**: PostgreSQL via Supabase
- **ORM**: Drizzle ORM with schema in `shared/schema.ts`
- **Auth**: Passport.js (local strategy) with session management
- **Email**: Nodemailer with Gmail SMTP (configured in `old/server/services/email/`)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: Wouter (client-side)
- **State**: TanStack Query (React Query)
- **Testing**: Vitest + Playwright
- **Deployment**: Vercel

# Migration Status

This repository is in active migration from React/Vite to Next.js 14+:
- `old/` directory contains the current working React/Vite application
- Migration checklist tracked in `strive_tech_migration_checklist.txt`
- Target stack: React + Next.js, Supabase + Prisma, Stripe, SMTP
- `.vercel/` and `.env` contain deployment credentials (already configured)

# Project Structure

## Current (old/) - React/Vite Application
```
old/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components (shadcn/ui based)
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and helpers
│   │   ├── App.tsx      # Main app component with routing
│   │   └── sw.ts        # Service worker for PWA
│   └── index.html       # Entry HTML
├── server/              # Express backend
│   ├── routes/          # API route handlers
│   │   ├── analytics.ts # Analytics tracking endpoints
│   │   └── sitemap.ts   # Sitemap generation
│   ├── services/        # Business logic services
│   ├── middleware/      # Express middleware
│   ├── lib/             # Server utilities
│   ├── index.ts         # Server entry point
│   ├── auth.ts          # Authentication logic
│   └── routes.ts        # Route definitions
├── shared/              # Shared code between client/server
│   └── schema.ts        # Drizzle database schema
├── supabase/            # Supabase configuration
└── scripts/             # Utility scripts
```

## Key Database Tables (shared/schema.ts)
- `users` - User accounts with email verification
- `contactSubmissions` - Contact form submissions
- `newsletterSubscriptions` - Newsletter signups
- `requests` - Demo/showcase requests with status tracking
- `pageViews` - Analytics page view tracking
- `userSessions` - Session analytics

# Common Development Commands

**Development:**
```bash
npm run dev              # Start development server (tsx server/index.ts)
```

**Building:**
```bash
npm run build            # Build client + server (Vite + esbuild)
npm run build:analyze    # Build with bundle analysis
```

**Type Checking:**
```bash
npm run check            # TypeScript type checking
```

**Database:**
```bash
npm run db:push          # Push schema changes with Drizzle
npm run db:migrate       # Run Supabase migrations
npm run db:reset         # Reset Supabase database
npm run supabase:start   # Start local Supabase
npm run supabase:stop    # Stop local Supabase
npm run supabase:status  # Check Supabase status
```

**Testing:**
```bash
npm run test             # Run Vitest in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open Vitest UI
npm run test:e2e         # Run Playwright e2e tests
npm run test:watch       # Watch mode for tests
npm run test:changed     # Test only changed files
```

**Production:**
```bash
npm start                # Start production server (node dist/index.js)
```

# Architecture Notes

## Authentication Flow
- Passport.js with local strategy in `server/auth.ts`
- Session-based authentication using express-session
- Password hashing with bcrypt
- Email verification tokens stored in users table

## API Structure
- Express routes defined in `server/routes.ts`
- Main route handlers in `server/routes/` directory
- Middleware stack includes helmet, compression, rate limiting

## Frontend Patterns
- Component-based architecture with shadcn/ui
- Wouter for client-side routing (SPA)
- TanStack Query for server state management
- Tailwind CSS with custom configuration
- PWA support with service worker in `client/src/sw.ts`

## Build Configuration
- Vite with React plugin for client build
- Manual chunk splitting for optimal caching (vendor, ui, utils, etc.)
- Asset optimization with separate directories for images/fonts
- esbuild for server bundling

## Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## Environment Variables
Required variables documented in `old/.env.example`:
- `DATABASE_URL` - PostgreSQL connection string
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `SMTP_*` - Email configuration (Gmail SMTP)
- `SESSION_SECRET`, `JWT_SECRET` - Auth secrets
- `SITE_URL` - Base URL for the application
- `PORT` - Server port (default: 3000)

# Important Reminders

- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary
- ALWAYS prefer editing existing files to creating new ones
- NEVER proactively create documentation files unless explicitly requested
- The `old/` directory contains the current working application
- Migration to Next.js is planned but not yet implemented