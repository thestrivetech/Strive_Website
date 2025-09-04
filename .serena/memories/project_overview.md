# Strive Tech Website - Project Overview

## Project Purpose
The Strive Tech website is a modern, professional React/TypeScript web application showcasing comprehensive business solutions and AI-powered services. It serves as the primary digital presence for Strive Tech, featuring:

- Advanced portfolio showcasing for technology solutions
- 12+ specialized industry solution pages (healthcare, financial, manufacturing, retail, etc.)
- AI automation and data analytics service demonstrations
- Contact and consultation booking system
- Resource center with educational content
- Professional business presentation with modern UI/UX

## Current Tech Stack (2025-09-04)

### Frontend
- **React 18.3.1** with TypeScript (strict mode)
- **Vite 5.4.19** for development and build tooling
- **Tailwind CSS 3.4.17** with shadcn/ui component library
- **Wouter 3.3.5** for client-side routing
- **TanStack Query 5.60.5** for server state management
- **Framer Motion 11.13.1** for animations
- **Radix UI** component primitives (20+ packages)

### Backend
- **Express.js 4.21.2** with TypeScript
- **Passport.js** authentication with local strategy
- **PostgreSQL** database with Drizzle ORM 0.39.3
- **Neon Database** serverless PostgreSQL (@neondatabase/serverless 0.10.4)
- **Express Session** with MemoryStore for session management
- **Helmet** security middleware

### Development & Build
- **TypeScript 5.6.3** (strict configuration)
- **ESNext** module syntax with bundler resolution
- **tsx 4.20.5** for development server
- **esbuild 0.25.9** for backend building
- **Vitest 3.2.4** with Playwright for testing

### Deployment Platform
- **Replit** platform with specialized Vite plugins
- Environment configured for Node.js 20
- Auto-scaling deployment target

## Recent Major Changes (per change_log.md)
- **React.lazy Code Splitting**: All route components converted to lazy loading except Home page
- **PageSkeleton Component**: Added professional loading states
- **Bundle Optimization**: Main bundle reduced from 500KB+ to 392KB
- **Performance Improvements**: Significant initial load time improvements

## Architecture Patterns
1. **Component-Based Architecture** using shadcn/ui design system
2. **Lazy Loading Strategy** for optimal performance
3. **Server-Side Express API** with RESTful endpoints
4. **PostgreSQL Integration** via Drizzle ORM
5. **Session-Based Authentication** using Passport.js
6. **TypeScript Path Aliases**: `@/*` for client src, `@shared/*` for shared code

## Key Features
- 12+ industry-specific solution pages
- Interactive portfolio showcasing
- Contact form with database storage
- Newsletter subscription system
- AI-powered chatbot integration (FloatingChat component)
- Responsive design with mobile-first approach
- SEO-optimized page structure
- Professional business presentation

## Development Environment
- **Platform**: Linux-based Replit environment
- **Node Version**: 20.x
- **Package Manager**: npm
- **Module System**: ESM (type: "module")
- **Build System**: Hybrid Vite (frontend) + esbuild (backend)

## Deployment Architecture
- **Development**: Hot reloading via Vite dev server + tsx
- **Production**: Built frontend + Express server
- **Database**: External PostgreSQL (Neon serverless)
- **Session Storage**: In-memory (MemoryStore) - needs upgrade for production scaling