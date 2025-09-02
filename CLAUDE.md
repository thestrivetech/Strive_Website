# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack React + Express application built with TypeScript, using Vite for development and bundling. The project appears to be a business/portfolio website with user authentication, contact forms, and solution pages.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Wouter (routing), TanStack Query, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, TypeScript, Drizzle ORM, PostgreSQL (Neon/Supabase)
- **Authentication**: Passport.js with local strategy, bcrypt for password hashing
- **Build Tools**: Vite, esbuild, tsx

## Development Commands

```bash
# Start development server (runs both frontend and backend)
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Start production server
npm run start

# Database migrations
npm run db:push
```

## Project Structure

```
/client                 # Frontend React application
  /src
    /components        # Reusable UI components
    /pages            # Route pages
    /lib              # Utilities and configurations
    /hooks            # Custom React hooks
/server               # Backend Express application
  index.ts           # Main server entry
  routes.ts          # API route definitions
  auth.ts            # Authentication logic
  storage.ts         # Database operations
  supabase.ts        # Supabase client
  vite.ts            # Vite dev server integration
/shared              # Shared code between frontend and backend
  schema.ts          # Drizzle ORM schema definitions
/attached_assets     # Static images and assets
```

## Key Architectural Patterns

### Database Schema
- Uses Drizzle ORM with PostgreSQL
- Tables: `users`, `contact_submissions`, `newsletter_subscriptions`
- Schema validation with Zod
- Database URL must be set in `DATABASE_URL` environment variable

### API Routes
- All API routes are prefixed with `/api`
- Authentication endpoints: `/api/login`, `/api/register`, `/api/logout`
- Protected routes check session authentication
- JSON responses with consistent error handling

### Frontend Routing
- Uses Wouter for client-side routing
- Main pages: Home, Portfolio, Solutions, Resources, About, Contact
- Protected dashboard route requires authentication
- Solution-specific pages for different industries

### Path Aliases
- `@/` → `/client/src/`
- `@shared/` → `/shared/`
- `@assets/` → `/attached_assets/`

### Authentication Flow
- Session-based authentication with Express sessions
- Passport.js local strategy
- Password hashing with bcrypt
- Protected routes check `req.isAuthenticated()`

## Environment Requirements

- Node.js with ESM support
- PostgreSQL database (URL in `DATABASE_URL`)
- Port configuration via `PORT` env variable (default: 5000)
- Development mode uses Vite dev server with HMR

## Important Notes

- The server runs on port specified by `PORT` env variable (default 5000)
- In development, Vite middleware handles client assets
- In production, static files are served from `dist/public`
- Database migrations use `drizzle-kit push`
- TypeScript strict mode is enabled