# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Strive Tech website - a modern React/TypeScript application with Express backend, using Drizzle ORM with PostgreSQL database. The project includes AI-powered features and comprehensive business solutions pages.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express.js, TypeScript, Passport authentication
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Replit platform
- **AI Integration**: Supabase for vector storage and AI features

## Essential Commands

```bash
# Development
npm run dev          # Start development server (Vite + Express)

# Build & Production  
npm run build        # Build frontend with Vite and backend with esbuild
npm start            # Run production server

# Type Checking
npm run check        # Run TypeScript type checking

# Database
npm run db:push      # Push schema changes to database using Drizzle
```

## Architecture Overview

### Directory Structure
```
/client              # React frontend application
  /src
    /components      # Reusable UI components (shadcn/ui)
    /pages          # Page components and routes
    /hooks          # Custom React hooks
    /lib            # Utilities and configuration
/server             # Express backend
  auth.ts           # Passport authentication setup
  routes.ts         # API route definitions
  supabase.ts       # Supabase client configuration
/shared             # Shared TypeScript types and schema
  schema.ts         # Drizzle database schema
```

### Key Architectural Patterns

1. **Component Library**: Uses shadcn/ui components in `/client/src/components/ui/` - pre-built, customizable components following Radix UI patterns

2. **Routing**: Client-side routing with Wouter library, server routes registered via `registerRoutes()` function

3. **Authentication**: Session-based auth using Passport with local strategy, sessions stored in memory (MemoryStore)

4. **API Pattern**: RESTful endpoints under `/api` prefix, JSON request/response format

5. **Database Access**: Drizzle ORM with PostgreSQL, schema defined in `/shared/schema.ts`

6. **State Management**: React Query (TanStack Query) for server state, local state with React hooks

## Development Workflow

### Agent Coordination System
The project uses a simplified 7-agent workflow system documented in `AGENT_WORKFLOW.md`:

- **Main Claude Code Session**: Project management, coordination, and quality evaluation
- **Frontend Agent**: React/TypeScript UI development (with Playwright testing tools)
- **Backend Agent**: API and server-side logic
- **Database Agent**: Schema and query optimization
- **DevOps Agent**: Deployment and infrastructure
- **UI/UX Agent**: Design and user experience (with Playwright testing tools)
- **Test Architect**: Testing strategy and implementation
- **Documentation Agent**: Maintains project documentation

### Working with Agents
1. Main Claude Code session analyzes requirements and delegates tasks directly
2. Specialized subagents work on their domains with direct communication to main session
3. Main Claude Code provides quality oversight (formerly handled by separate Evaluator)
4. Use chat logs in `/chat_logs/` for agent communication tracking
5. Follow the 5-phase workflow: Planning → Foundation → Features → Integration → Deployment

### MCP Tools Available
- **Serena MCP**: For intelligent code search and analysis (main orchestrator)
- **Context7 MCP**: For library documentation (all coding agents)
- **Playwright MCP**: For UI testing and validation (Frontend & UI/UX agents)

## Code Conventions

- **TypeScript**: Strict mode enabled, ESNext module syntax
- **Imports**: Use path aliases `@/*` for client src, `@shared/*` for shared code
- **Components**: Functional components with TypeScript, follow shadcn/ui patterns
- **API Routes**: Express async handlers with proper error handling
- **Database**: Use Drizzle schema types, avoid raw SQL

## Critical Notes

- **Environment Variables**: `DATABASE_URL` required for database connection
- **Session Security**: Currently uses MemoryStore - upgrade for production
- **Authentication**: Passport local strategy configured but needs proper user management implementation
- **Deployment**: Configured for Replit platform with specific Vite plugins