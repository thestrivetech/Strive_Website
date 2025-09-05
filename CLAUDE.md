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

### Agent Coordination System - VERSION 2.0
The project uses an enhanced parallel workflow system with Research Agents, Execution Agents, and Monitoring Agents for optimal performance:

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

#### **New Architecture Components (Post-Session 5 Improvements)**

##### **Research Team (Wave 0)** - Deploys BEFORE execution
- **frontend-researcher**: Pre-fetches React/TypeScript/Vite documentation
- **backend-researcher**: Gathers Express/Node.js/PostgreSQL documentation  
- **infrastructure-researcher**: Collects deployment and testing docs
- **Impact**: 70% context savings for execution agents

##### **Execution Team (Wave 1)** - TRUE PARALLEL deployment
- **frontend-architect**: UI implementation (WITH Edit/MultiEdit tools)
- **backend-architect**: API implementation (WITH Edit/MultiEdit tools)
- **database-specialist**: Schema changes (WITH Edit/MultiEdit tools)
- **All agents MUST use Edit/MultiEdit**: No more corrupted edits

##### **Monitoring Team (Continuous)**
- **execution-monitor**: Verifies actual changes every 30 seconds
- **component-extractor**: Prevents file bloat (300 line limit)
- **Impact**: 100% verification rate, 0% false success reports

##### **Quality Team (Wave 2)**
- **ui-ux**: Visual polish (WITH Edit/MultiEdit tools)
- **test-architect**: Test creation (WITH Edit/MultiEdit tools)
- **devops-specialist**: Deployment optimization (WITH verification)

#### **Critical Session 5 Lessons Learned**
- **Agents MUST use Edit/MultiEdit tools explicitly** - No assumptions
- **Verification required every 30 seconds** - No blind trust
- **File size limit: 300 lines MAXIMUM** - Enforced by component-extractor
- **Parallel deployment with Promise.all pattern** - True concurrency
- **Documentation pre-fetched to save context** - 70% reduction
- **Manual intervention after 2 minutes idle** - No passive monitoring

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

## Serena MCP Integration & Intelligent Code Analysis

### **Onboarding Status & Memory System**
✅ **Serena MCP Onboarding Complete** - The AI assistant has been fully onboarded to your project with comprehensive memory files containing:

#### **Project Intelligence Memory Files:**
1. **`project_overview`** - Complete project purpose, tech stack, and architectural patterns
2. **`suggested_commands`** - All essential development, testing, and deployment commands
3. **`code_style_conventions`** - TypeScript patterns, React conventions, and coding standards
4. **`task_completion_checklist`** - Complete development workflow from setup to deployment

### **Serena Integration for Main Orchestrator**
The main Claude orchestrator now has access to intelligent code search and analysis capabilities through Serena MCP:

#### **Core Capabilities:**
- **Intelligent Code Search**: Find symbols, patterns, and references across the entire codebase
- **Project-Aware Context**: Instant understanding of project structure, conventions, and patterns  
- **Symbol Analysis**: Deep understanding of classes, functions, components, and their relationships
- **Pattern Recognition**: Identify coding patterns and architectural decisions automatically
- **Memory-Driven Development**: Leverage comprehensive project knowledge for faster decision-making

#### **Essential Serena Commands for Orchestrator:**
```bash
# Session initialization with Serena memory consultation
mcp__serena__list_memories         # Review available project intelligence
mcp__serena__read_memory          # Consult specific memory files for context

# Intelligent code analysis and search
mcp__serena__get_symbols_overview  # Understand file structure and symbols
mcp__serena__find_symbol          # Locate specific functions, classes, components
mcp__serena__search_for_pattern   # Find patterns across codebase
mcp__serena__find_referencing_symbols # Analyze symbol relationships and dependencies
```

### **Agent Optimization with Serena**
Agents that benefit most from Serena MCP integration:

#### **High-Priority Serena Integration:**
- **Main Claude Orchestrator**: Project intelligence and code analysis (✅ Active)
- **UI/UX Agent**: Component analysis and pattern recognition (✅ Active) 
- **Frontend Architect**: React component structure understanding (*Consider adding)
- **Backend Architect**: API endpoint and middleware analysis (*Consider adding)

#### **Serena Usage Patterns:**
- **Session Start**: Always consult Serena memory files for project context
- **Code Analysis**: Use Serena's symbol analysis before making architectural decisions
- **Pattern Recognition**: Leverage Serena to maintain consistency with existing patterns
- **Dependency Mapping**: Use referencing symbol analysis for safe refactoring

### **Memory-Driven Development Workflow**

#### **Session Initialization Protocol with Serena:**
1. **Read Serena Memories**: `mcp__serena__read_memory` for project context
2. **Check Recent Changes**: Review `change_log.md` for latest modifications
3. **Analyze Current State**: Use `mcp__serena__get_symbols_overview` for codebase understanding
4. **Plan with Intelligence**: Leverage comprehensive project knowledge for informed decisions

#### **Development Workflow Enhancement:**
- **Before Code Changes**: Use `mcp__serena__find_symbol` to understand existing implementations
- **Pattern Consistency**: Consult `code_style_conventions` memory for consistent styling
- **Command Reference**: Use `suggested_commands` memory for proper development workflows
- **Quality Assurance**: Reference `task_completion_checklist` memory for comprehensive validation

### **Integration Benefits for Orchestrator**

#### **Immediate Performance Gains:**
- **50%+ Faster Session Starts**: Instant project context without manual research
- **Consistent Code Quality**: Automatic adherence to established patterns and conventions
- **Intelligent Task Delegation**: Better understanding of codebase for optimal agent assignment
- **Enhanced Decision Making**: Data-driven architectural choices based on existing patterns

#### **Long-term Strategic Advantages:**
- **Session Continuity**: Perfect context preservation across all sessions
- **Knowledge Accumulation**: Continuously improving project intelligence
- **Pattern Evolution**: Track and optimize coding patterns over time
- **Quality Consistency**: Maintain high standards across all development activities

### **Best Practices for Serena Integration**

#### **Memory File Consultation:**
- **Always start sessions** by reading relevant Serena memory files
- **Update memory files** when architectural patterns change significantly
- **Reference task completion checklist** for comprehensive development workflows
- **Use suggested commands memory** for consistent tooling usage

#### **Intelligent Code Analysis:**
- **Search before implementing** to understand existing patterns
- **Analyze symbol relationships** before major refactoring
- **Use pattern search** to maintain consistency across similar components
- **Leverage symbol overview** to understand file organization

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

## Workflow Rules & Documentation System

### File Purpose Matrix
**CRITICAL**: Each file has a specific purpose. Never mix file types or misuse documentation files.

| File | Purpose | What Goes Here | What NOT to Put Here |
|------|---------|----------------|---------------------|
| **`memory.json`** | Central brain - rules and reminders ONLY | Workflow rules, file purposes, agent configs, coding standards | Task lists, session logs, completed items, progress tracking |
| **`chat_logs/`** | Session work documentation | Detailed activities, decisions, context, handoff instructions | Rules, reminders, architecture definitions |
| **`change_log.md`** | Code change tracking | All edits/deletions with before/after states for rollback | Session activities, task progress, discussions |
| **`plan.md`** | Living implementation progress tracker | Current phase status, completed tasks, next priorities | Rules, completed session details, agent instructions | - Currently not using this for where we're at in the development process
| **`updates/`** | Implementation blueprints | Strategic plans, architecture designs, roadmaps | Daily progress, session logs, temporary notes |
| **`.claude/agents/`** | Agent-specific configurations | Agent roles, MCP tools, responsibilities | Session data, task tracking, implementation details |

### Mandatory Workflow Actions

#### Session Start Protocol
1. **Read previous session's chat log** for complete context
2. **Check plan.md** for current implementation progress  
3. **Check change_log.md** for recent code changes
4. **Use memory.json ONLY** for rules and reminders - NEVER as task list

#### During Session Protocol  
1. **Update plan.md immediately** when tasks are completed
2. **Document ALL code changes** in change_log.md with rollback info
3. **Use chat logs** for session documentation - NEVER memory.json
4. **Never add task lists** or session details to memory.json

#### Session End Protocol
1. **Ensure plan.md** reflects all completed work
2. **Verify change_log.md** has all code modifications  
3. **Create comprehensive handoff** in session chat log
4. **Memory.json remains unchanged** (brain content only)

### Critical Reminders
- **NEVER use memory.json as a task list or session log**
- **NEVER leave plan.md outdated after completing tasks**
- **ALWAYS document code changes in change_log.md**  
- **ALWAYS check all 4 files at session start**: memory.json (rules), chat_logs (context), plan.md (progress), change_log.md (changes)
- **Memory.json is the BRAIN** - it contains rules, not tasks or session data

### Common Mistakes to Avoid
- Adding `completed_session_X` arrays to memory.json
- Adding `immediate_priorities` or task lists to memory.json  
- Using memory.json for session timestamps or progress tracking
- Forgetting to update plan.md when infrastructure is complete
- Not documenting code changes with rollback information

### Session Automation
Use `npm run session:init` to run automated workflow compliance checking:
- Verifies memory.json is properly structured as central brain
- Checks for workflow violations and misused file purposes  
- Validates documentation file status and updates
- Provides session start guidance and critical reminders

## Critical Notes

- **Environment Variables**: `DATABASE_URL` required for database connection
- **Session Security**: Currently uses MemoryStore - upgrade for production
- **Authentication**: Passport local strategy configured but needs proper user management implementation
- **Deployment**: Configured for Replit platform with specific Vite plugins


# User reminder for next session #
- Look at scripts and see what they do to see which one we should be running when doing agentic team sessions