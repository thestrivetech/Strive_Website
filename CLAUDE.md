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
The project uses a sophisticated 7-agent parallel workflow system with continuous documentation and real-time quality oversight:

```
STRIVE WEBSITE - 7-AGENT PARALLEL WORKFLOW SYSTEM
┌─────────────────────────────────────────────────────────────────────────────┐
│  🎯 MAIN CLAUDE CODE SESSION (Orchestrator)                                 │
│  • Real-time monitoring and quality analysis of all agent activities        │
│  • Strategic planning, task delegation, and resource allocation             │
│  • Continuous improvement coaching and workflow optimization                 │
│  • Performance analysis and bottleneck identification                       │
│  • Serena MCP: Intelligent code search and analysis capabilities           │
└───────────────────────────┬─────────────────────────────────────────────────┘
                            │
                    ┌───────┴───────┐
                    │ PARALLEL TASK │
                    │  DELEGATION   │
                    └───────┬───────┘
                            │
    ┌───────────────────────┼───────────────────────┐
    │                       │                       │
    ▼                       ▼                       ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 🎨 FRONTEND     │ │ ⚙️  BACKEND     │ │ 🗄️  DATABASE    │
│ ARCHITECT       │ │ ARCHITECT       │ │ SPECIALIST      │
│ • React/TypeScript│ • Express.js/API │ • PostgreSQL     │
│ • shadcn/ui      │ • Authentication │ • Drizzle ORM    │
│ • State Mgmt     │ • Server Logic   │ • Schema Design  │
│ • Playwright MCP │ • Context7 MCP*  │ • Context7 MCP*  │
│ • Context7 MCP   │                 │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 🚀 DEVOPS       │ │ 🎭 UI/UX AGENT  │ │ 🧪 TEST         │
│ SPECIALIST      │ │                 │ │ ARCHITECT       │
│ • Replit Deploy │ │ • User Experience│ • TDD Methodology│
│ • Infrastructure│ │ • Visual Design  │ • E2E Testing    │
│ • Performance   │ │ • Accessibility  │ • Quality Gates  │
│ • Context7 MCP* │ │ • Playwright MCP │ • Context7 MCP*  │
│                 │ │ • Context7 MCP   │                 │
│                 │ │ • Serena MCP     │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ 📚 DOCUMENTATION│
                    │ AGENT           │
                    │ • Session Logs  │
                    │ • Process Track │
                    │ • Knowledge Mgmt│
                    │ • Context Preserv│
                    └─────────────────┘
                              ▲
         ┌────────────────────┼────────────────────┐
         │ CONTINUOUS PARALLEL DOCUMENTATION OF ALL AGENTS │
         └────────────────────────────────────────────────┘

* = Context7 MCP needs to be added to agent configuration
```

#### **Parallel Execution Model:**
- **Simultaneous Operations**: Multiple agents work concurrently on different aspects
- **Real-Time Documentation**: Documentation Agent records ALL agent activities in parallel
- **Continuous Monitoring**: Main Claude provides ongoing quality oversight and coaching
- **Dynamic Task Distribution**: Tasks delegated based on real-time capacity and priority

### Working with Agents

#### **Parallel Execution Workflow:**
1. **Task Analysis & Multi-Agent Delegation**: Main Claude analyzes requirements and delegates to multiple agents simultaneously
2. **Concurrent Agent Operations**: Specialized agents work in parallel on their domains (Frontend + Backend + Database + DevOps + UI/UX + Testing)
3. **Real-Time Documentation**: Documentation Agent continuously records ALL agent activities, decisions, and outputs in parallel
4. **Continuous Quality Monitoring**: Main Claude provides ongoing analysis of agent performance, identifies bottlenecks, and coaches improvements
5. **Dynamic Resource Allocation**: Tasks redistributed based on agent capacity, expertise overlap, and project priorities

#### **Communication Patterns:**
- **Main Claude ↔ All Agents**: Direct bidirectional communication for task delegation and progress reporting
- **Documentation Agent ← All Agents**: Continuous recording of activities, decisions, and outputs
- **Agents ↔ Agents**: Cross-functional collaboration when features span multiple domains
- **Quality Feedback Loop**: Main Claude analyzes patterns and provides coaching for workflow optimization

#### **Session Management:**
- Use chat logs in `/chat_logs/` for comprehensive agent communication tracking
- Documentation Agent maintains detailed session logs for perfect continuity
- Follow adaptive workflow phases based on project needs: Planning → Parallel Development → Integration → Quality Gates → Deployment

### MCP Tools Available

#### **Current Tool Assignments:**
- **Main Claude Code (Orchestrator)**: 
  - Serena MCP: Intelligent code search and analysis capabilities
- **Frontend Architect**: 
  - Playwright MCP: UI testing and browser automation
  - Context7 MCP: Library documentation for React/TypeScript/Vite
- **UI/UX Agent**: 
  - Playwright MCP: Visual testing and browser interaction
  - Context7 MCP: Library documentation for design systems
  - Serena MCP: Advanced code analysis capabilities
- **Backend Architect**: *Context7 MCP needed for Express.js/Node.js documentation
- **Database Specialist**: *Context7 MCP needed for PostgreSQL/Drizzle ORM documentation  
- **DevOps Specialist**: *Context7 MCP needed for deployment and infrastructure documentation
- **Test Architect**: *Context7 MCP needed for testing framework documentation
- **Documentation Agent**: Context tracking and session management tools

#### **Tool Usage Patterns:**
- **Context7 MCP**: All coding agents should use for up-to-date library documentation and best practices
- **Playwright MCP**: UI-focused agents use for visual testing and user interaction validation
- **Serena MCP**: Main orchestrator and advanced agents use for intelligent code search and analysis

*Note: Backend, Database, DevOps, and Test Architect agent configurations need Context7 MCP tools added

### Agent Communication Flow & Coordination

#### **Task Initiation & Delegation:**
```
User Request → Main Claude Analysis → Parallel Task Delegation
                         ↓
    ┌────────────────────┼────────────────────┐
    ▼                    ▼                    ▼
Frontend Architect   Backend Architect   Database Specialist
    ▼                    ▼                    ▼
UI/UX Agent         DevOps Specialist   Test Architect
    ▼                    ▼                    ▼
Documentation Agent (Records ALL activities simultaneously)
```

#### **Real-Time Coordination Patterns:**

**1. Parallel Development Scenario:**
- Main Claude delegates feature development to Frontend Architect, Backend Architect, and Database Specialist simultaneously
- Documentation Agent begins recording all three development streams in parallel
- UI/UX Agent collaborates with Frontend Architect on design implementation
- Test Architect creates tests for both frontend and backend components concurrently
- Main Claude monitors progress, identifies dependencies, and coaches optimization

**2. Cross-Agent Collaboration:**
- Backend API changes trigger Frontend Architect notification
- Database schema updates prompt Backend Architect and Test Architect coordination
- UI/UX design decisions influence both Frontend and Backend implementation
- Documentation Agent tracks all inter-agent communications and decisions

**3. Quality Oversight Loop:**
- Main Claude continuously analyzes agent outputs and performance metrics
- Identifies bottlenecks, redundancies, or missed requirements
- Provides real-time coaching and resource reallocation
- Documentation Agent records improvement patterns for future optimization

#### **Session Continuity & Context Preservation:**
- **Live Session**: All agents work with shared context and real-time coordination
- **Session Handoff**: Documentation Agent provides comprehensive activity logs
- **Context Recovery**: Main Claude can resume any session with complete agent status
- **Performance Learning**: Patterns from previous sessions inform future task distribution

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