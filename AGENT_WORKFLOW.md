# The Strive Tech 7-Agent Parallel Workflow System

## 🧠 Central Brain System (memory.json)

**CRITICAL**: All agents must read the central brain file at session start.

**Brain File Location**: `.claude/memory.json`

**Purpose**: Contains rules, reminders, agent configurations, and workflow protocols - NEVER task lists or session data.

### Session Start Protocol for All Agents:
1. **Read memory.json** for rules and reminders (NOT tasks)
2. **Read previous session's chat log** for context  
3. **Check plan.md** for current implementation progress
4. **Review change_log.md** for recent code changes

---

## 🎯 7-Agent Ecosystem Overview

### **Main Claude Code (Orchestrator & Quality Monitor)**
- **Role**: Master coordinator, quality monitor, strategic planner & evaluator
- **Model**: Opus 4.1  
- **Chat Log Path**: `chat_logs/orchestrator/`
- **Evaluation Path**: `chat_logs/orchestrator/evaluations/`
- **MCP Tools**: serena, context7, playwright
- **Primary Responsibilities**:
  - Task analysis and parallel multi-agent delegation
  - Real-time quality monitoring and coaching  
  - Session continuity and context preservation
  - Agent performance evaluation and improvement documentation
  - Code comment compliance monitoring
  - Tool usage optimization across all agents

### **Frontend Architect**
- **Role**: React/TypeScript specialist
- **Model**: Opus
- **Chat Log Path**: `chat_logs/frontend-architect/`
- **MCP Tools**: playwright, context7, Serena
- **Tech Stack**: React 18, TypeScript 5, shadcn/ui, TailwindCSS, TanStack Query, Wouter
- **Line Limits**: Small (100), Medium (250), Large (500)
- **Primary Responsibilities**:
  - React 18 component development with comments
  - shadcn/ui component implementation
  - TailwindCSS styling and responsive design
  - State management with TanStack Query
  - Wouter routing implementation

### **Backend Architect**  
- **Role**: Express.js API specialist
- **Model**: Opus
- **Chat Log Path**: `chat_logs/backend-architect/`
- **MCP Tools**: context7, Serena
- **Tech Stack**: Node.js 20, Express, PostgreSQL, Drizzle ORM, Supabase, Zod
- **Line Limits**: Backend files (350), Utility files (200)
- **Primary Responsibilities**:
  - Express.js API development with comprehensive comments
  - Supabase authentication integration
  - Database integration with Drizzle ORM
  - Server-side logic and security middleware

### **Database Specialist**
- **Role**: PostgreSQL/Drizzle/Supabase specialist  
- **Model**: Sonnet
- **Chat Log Path**: `chat_logs/database-specialist/`
- **MCP Tools**: context7, Serena
- **Tech Stack**: Neon PostgreSQL, Drizzle ORM, Supabase Auth, Zod validation
- **Primary Responsibilities**:
  - Database schema design and optimization with documentation
  - Drizzle ORM implementation
  - Supabase integration and configuration
  - Query optimization and indexing

### **DevOps Specialist**
- **Role**: Replit deployment and infrastructure specialist
- **Model**: Sonnet
- **Chat Log Path**: `chat_logs/devops-specialist/`
- **MCP Tools**: context7
- **Tech Stack**: Replit Platform, Vite, TypeScript, GitHub Actions
- **Primary Responsibilities**:
  - Replit platform deployment with configuration comments
  - Performance optimization
  - CI/CD pipeline setup (GitHub Actions)
  - Infrastructure management and monitoring

### **UI/UX Agent**
- **Role**: Design and user experience specialist
- **Model**: Sonnet
- **Chat Log Path**: `chat_logs/ui-ux/`
- **MCP Tools**: playwright, context7, serena  
- **Design System**: shadcn/ui, TailwindCSS, WCAG 2.1 AA, Mobile-first
- **Primary Responsibilities**:
  - User interface design and optimization
  - shadcn/ui design system implementation
  - Accessibility compliance (WCAG 2.1 AA)
  - Visual consistency validation

### **Test Architect**
- **Role**: Quality assurance and TDD specialist
- **Model**: Opus
- **Chat Log Path**: `chat_logs/test-architect/`
- **MCP Tools**: context7
- **Testing Stack**: Vitest, React Testing Library, Playwright, 80% coverage target
- **Primary Responsibilities**:
  - Test-driven development implementation with clear test documentation
  - Vitest and React Testing Library setup
  - Playwright E2E testing
  - Coverage optimization and reporting

### **Documentation Agent**
- **Role**: Session and knowledge management specialist
- **Model**: Sonnet  
- **Chat Log Path**: `chat_logs/documentation-agent/`
- **MCP Tools**: none
- **Primary Responsibilities**:
  - Session logging and context preservation
  - Technical documentation maintenance  
  - Workflow continuity management
  - Knowledge base updates (in chat_logs/ - NEVER in memory.json)

---

## 🔄 Parallel Workflow Execution Model

### **Optimal Workflow Summary:**
- **Phase 1**: Project analysis and brain consultation (15 min)
- **Phase 2**: Parallel foundation development (2-4 hours) 
- **Phase 3**: Iterative parallel feature development (1-2 hour cycles)
- **Phase 4**: Integration and testing (1-2 hours)
- **Phase 5**: Deployment and monitoring (30 min)

### **Agent Collaboration Matrix:**
```
Main Claude Code (Orchestrator) → All Agents (Parallel Delegation)
    ↓
Frontend ↔ UI/UX → Design implementation  
Backend ↔ Database → Data layer integration
DevOps → All → Infrastructure support
Test → Frontend & Backend → Quality assurance
Documentation ← All → Activity recording
```

---

## 📋 Detailed Workflow Phases

### **Phase 1: Project Analysis & Brain Consultation (15 minutes)**
**ALL AGENTS MUST**:
1. **Read memory.json** for current rules and agent configurations
2. **Review previous session chat log** for context
3. **Check plan.md** for implementation progress
4. **Main Claude Code** analyzes requirements and delegates tasks in parallel

### **Phase 2: Parallel Foundation Development (2-4 hours)**
**Simultaneous Execution:**
1. **Database Specialist**: Schema design and Supabase setup (with comments)
2. **Backend Architect**: API structure and authentication (with comments)  
3. **DevOps Specialist**: Environment setup and CI/CD pipeline (with comments)
4. **Frontend Architect**: Component library and routing setup (with comments)
5. **Main Claude Code**: Monitors all agents and provides real-time coaching
6. **Documentation Agent**: Records all parallel activities

### **Phase 3: Iterative Feature Development (1-2 hours per cycle)**
**Parallel Feature Cycles:**
1. **UI/UX Agent**: Detailed designs for current feature
2. **Frontend Architect**: UI component implementation (with comments)
3. **Backend Architect**: API endpoint development (with comments)
4. **Database Specialist**: Query optimization (with comments)
5. **Test Architect**: Comprehensive test creation (with documentation)
6. **Main Claude Code**: Code reviews and quality validation
7. **Documentation Agent**: Process documentation updates

### **Phase 4: Integration & Testing (1-2 hours)**
**Quality Assurance Phase:**
1. **DevOps Specialist**: Deployment environment management
2. **Test Architect**: Integration and E2E testing coordination
3. **Main Claude Code**: Comprehensive testing oversight and validation
4. **All Agents**: Collaborative integration testing  
5. **Documentation Agent**: Test result documentation

### **Phase 5: Deployment & Monitoring (30 minutes)**
**Production Readiness:**
1. **DevOps Specialist**: Production deployment execution  
2. **Main Claude Code**: Performance metrics monitoring
3. **Documentation Agent**: Deployment process documentation
4. **Main Claude Code**: Project retrospective and agent evaluation

---

## 🔍 Quality Monitoring & Evaluation System

### **Main Claude Code Evaluation Responsibilities:**
1. **Agent Performance Monitoring**:
   - Document improvement opportunities in `chat_logs/orchestrator/evaluations/`
   - Monitor code comment compliance across all architect agents
   - Track tool usage effectiveness and optimization opportunities

2. **Code Quality Standards**:
   - Ensure ALL code written by architect agents includes comments
   - Verify line limit compliance per agent specifications
   - Validate TypeScript strict mode and best practices

3. **Tool Optimization Monitoring**:
   - Assess MCP tool effectiveness for each agent
   - Identify workflow bottlenecks and tool gaps
   - Recommend tool adjustments for speed and accuracy

### **Agent Performance Metrics:**
- **Code Comment Compliance**: 100% for all architect agents
- **Line Limit Adherence**: Per agent specifications in memory.json
- **MCP Tool Utilization**: Context7 usage for documentation lookups
- **Session Continuity**: Perfect handoff documentation

---

## 📊 Communication Protocols

### **Session Start Checklist (ALL AGENTS):**
1. ✅ Read memory.json for rules and reminders
2. ✅ Read previous session chat log for context  
3. ✅ Check plan.md for current progress
4. ✅ Review change_log.md for recent changes
5. ✅ Report to Main Claude Code for task assignment

### **During Session Protocol:**
- **Task Updates**: Real-time reporting to Main Claude Code
- **Cross-Agent Communication**: Direct coordination when features span domains
- **Code Comments**: Mandatory for all architect agent code
- **Tool Usage**: Report effectiveness and optimization needs
- **Quality Gates**: Continuous validation by Main Claude Code

### **Session End Protocol:**  
- **Progress Documentation**: Update respective chat logs
- **Quality Review**: Main Claude Code evaluates all agent work
- **Plan Updates**: Ensure plan.md reflects completed work
- **Change Logging**: Document all code modifications
- **Evaluation Notes**: Main Claude Code documents improvement opportunities

---

## 🛠️ Technology Stack Integration

### **Frontend Stack (Frontend Architect + UI/UX)**
- React 18, TypeScript 5, Vite, TailwindCSS, shadcn/ui, Wouter, TanStack Query

### **Backend Stack (Backend Architect + Database Specialist)**  
- Node.js 20, Express, PostgreSQL (Neon), Drizzle ORM, Supabase Auth, Zod

### **Infrastructure Stack (DevOps Specialist)**
- Replit Platform, GitHub Actions, Vite bundling, TypeScript compilation

### **Quality Stack (Test Architect)**
- Vitest, React Testing Library, Playwright, 80% coverage target

---

## 📈 Success Metrics

### **Agent Efficiency:**
- **Parallel Execution**: >3 agents working simultaneously  
- **Code Comment Rate**: 100% compliance for architect agents
- **Brain Consultation**: All agents read memory.json at session start
- **Tool Optimization**: Continuous improvement in MCP tool usage

### **Development Quality:**
- **Code Coverage**: >80% overall, 100% critical paths
- **Performance**: <1.5s page loads, Lighthouse score >95
- **Documentation**: Complete session activity recording
- **Security**: Enterprise-grade protection with comprehensive middleware

### **Workflow Effectiveness:**
- **Feature Velocity**: 50% faster than sequential development
- **Session Continuity**: Perfect context preservation between sessions
- **Quality Gates**: Zero critical bugs through comprehensive oversight
- **Agent Development**: Continuous improvement through evaluation system

---

## 🚀 Getting Started

### **For New Sessions:**
1. **Main Claude Code**: Read memory.json, analyze requirements, delegate in parallel
2. **All Agents**: Follow session start checklist (memory.json → chat logs → plan.md → change_log.md)
3. **Documentation Agent**: Begin parallel activity recording
4. **Quality Monitoring**: Main Claude Code provides continuous oversight and coaching

### **For Agent Coordination:**
1. **Parallel Task Assignment**: Based on expertise and capacity from memory.json
2. **Real-Time Collaboration**: Cross-agent communication for integrated features
3. **Quality Validation**: Continuous code comment and standard compliance checking
4. **Improvement Documentation**: Evaluation notes in orchestrator/evaluations/

### **For Infrastructure Development:**
1. **Foundation Phase**: Database + Backend + DevOps + Frontend in parallel
2. **Feature Cycles**: UI/UX + Frontend + Backend + Database + Test coordination  
3. **Integration Phase**: All agents collaborate on testing and deployment
4. **Evaluation Phase**: Main Claude Code documents lessons learned and improvements

---

**System Version**: 7-Agent Parallel Workflow v3.0  
**Last Updated**: Session 4 - Workflow Fix Implementation  
**Brain File**: `.claude/memory.json` (Central rules and agent configurations)  
**Status**: Operational with Enhanced Quality Monitoring  
**Next Review**: After major feature implementation or agent performance assessment

---

*"Excellence through parallel execution, guided by the central brain, monitored by continuous evaluation."*  
**- Strive Website 7-Agent Development Philosophy**