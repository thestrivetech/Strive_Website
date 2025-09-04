# 🚀 Strive Website - 7-Agent Parallel Workflow System

## 📋 Purpose & Overview

This document serves as the comprehensive guide for the **Strive Website 7-Agent Parallel Workflow System**, designed specifically for efficient development and maintenance of our modern React/TypeScript business website with Express backend.

**Key Features:**
- **Parallel Execution**: Multiple agents work simultaneously on different aspects
- **Real-Time Documentation**: Continuous recording of all agent activities
- **Quality Oversight**: Main Claude provides ongoing monitoring and coaching
- **Perfect Context Preservation**: Seamless session handoffs and continuity

---

## 🎯 Agent Ecosystem Overview

### **Main Claude Code (Orchestrator)**
- **Role**: Master coordinator, quality monitor, and strategic planner
- **Model**: Opus 4.1
- **Status**: ✅ Active
- **MCP Tools**: Serena USE THIS TOOL FOR MAINLY EVERYTHING (code analysis, task delegation), Context7 (documentation)
- **Responsibilities**:
  - Task analysis and multi-agent delegation
  - Real-time quality monitoring and coaching
  - Session continuity and context preservation
  - Parallel workflow coordination
  - Strategic planning and bottleneck identification

### **Frontend Architect** 
- **Role**: React/TypeScript specialist
- **Model**: Opus
- **Status**: ✅ Active
- **MCP Tools**: Playwright (UI testing), Context7 (React/Vite docs)
- **Responsibilities**:
  - React 18 component development
  - shadcn/ui component implementation
  - TailwindCSS styling and responsive design
  - State management with TanStack Query
  - Wouter routing implementation

### **Backend Architect**
- **Role**: Express.js API specialist  
- **Model**: Opus
- **Status**: ⚠️ Needs Context7 MCP verification
- **MCP Tools**: Context7 (Express.js/Node.js docs)
- **Responsibilities**:
  - Express.js API development
  - Supabase authentication integration
  - Database integration with Drizzle ORM
  - Server-side logic and middleware

### **Database Specialist**
- **Role**: PostgreSQL/Drizzle ORM specialist
- **Model**: Sonnet
- **Status**: ⚠️ Needs Context7 MCP verification
- **MCP Tools**: Context7 (PostgreSQL/Drizzle docs)
- **Responsibilities**:
  - Database schema design and optimization
  - Drizzle ORM implementation
  - Supabase integration and configuration
  - Query optimization and indexing

### **DevOps Specialist**
- **Role**: Replit deployment and infrastructure specialist
- **Model**: Sonnet  
- **Status**: ⚠️ Needs Context7 MCP verification
- **MCP Tools**: Context7 (deployment/infrastructure docs)
- **Responsibilities**:
  - Replit platform deployment
  - Performance optimization
  - CI/CD pipeline setup (GitHub Actions)
  - Infrastructure management

### **UI/UX Agent**
- **Role**: Design and user experience specialist
- **Model**: Opus
- **Status**: ✅ Active
- **MCP Tools**: Playwright (visual testing), Context7 (design systems), Serena (code analysis)
- **Responsibilities**:
  - User interface design and optimization
  - shadcn/ui design system implementation
  - Accessibility compliance
  - Visual consistency validation

### **Test Architect**
- **Role**: Quality assurance and TDD specialist
- **Model**: Opus
- **Status**: ⚠️ Needs Context7 MCP verification  
- **MCP Tools**: Context7 (testing framework docs)
- **Responsibilities**:
  - Test-driven development implementation
  - Vitest and React Testing Library setup
  - Playwright E2E testing
  - Coverage optimization and reporting

### **Documentation Agent**
- **Role**: Session and knowledge management specialist
- **Model**: Sonnet
- **Status**: ✅ Active
- **MCP Tools**: None required
- **Responsibilities**:
  - Session logging and context preservation
  - Technical documentation maintenance
  - Workflow continuity management
  - Knowledge base updates

---

## 🔄 Parallel Workflow Patterns

### **Simultaneous Multi-Agent Operations**
```
MAIN CLAUDE CODE (Orchestrator + Quality Monitor)
    ↓ PARALLEL TASK DELEGATION ↓
                                                     
  CONCURRENT DEVELOPMENT STREAMS                     
                                                     
  Frontend Architect    Backend Architect    Database Specialist
      ↓                        ↓                      ↓
  UI/UX Agent          DevOps Specialist     Test Architect
                                ↓
              Documentation Agent (Records ALL in parallel)
```

### **Real-Time Coordination Patterns**

#### **Feature Development Workflow**
1. **Main Claude** analyzes requirements → parallel delegation
2. **3 Core Agents** work simultaneously:
   - Frontend Architect: UI/UX implementation
   - Backend Architect: API development  
   - Database Specialist: Schema design
3. **UI/UX Agent** collaborates with Frontend for design refinement
4. **Test Architect** creates comprehensive tests for all components
5. **Documentation Agent** records all activities in parallel
6. **Main Claude** monitors progress and provides real-time coaching

#### **Critical Infrastructure Implementation**
1. **Backend Architect**: Security middleware (helmet, rate limiting)
2. **Test Architect**: Testing infrastructure (Vitest, Playwright)
3. **DevOps Specialist**: CI/CD pipeline (GitHub Actions)
4. **Main Claude**: Automation scripts and coordination
5. **Documentation Agent**: Infrastructure documentation updates

---

## 🛠️ Technology Stack Integration

### **Frontend Stack**
- **Framework**: React 18 with TypeScript 5
- **Build Tool**: Vite 5.4.19
- **Styling**: TailwindCSS 3.4.17
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Routing**: Wouter
- **State**: TanStack Query

### **Backend Stack**
- **Runtime**: Node.js 20
- **Framework**: Express 4.21.2
- **Language**: TypeScript 5
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Auth**: Supabase
- **Validation**: Zod

### **Infrastructure**
- **Platform**: Replit
- **CI/CD**: GitHub Actions (pending)
- **Monitoring**: Prometheus + Grafana (planned)

---

## 📊 Quality Gates & Standards

### **Code Quality Requirements**
- **Line Limits**:
  - Small components: ≤ 100 lines
  - Medium components: ≤ 250 lines
  - Large components: ≤ 500 lines
  - Backend files: ≤ 350 lines

### **Testing Standards**
- **Minimum Coverage**: 80% overall
- **Critical Path Coverage**: 100%
- **Testing Stack**: Vitest + React Testing Library + Playwright

### **Performance Standards**
- **Page Load Time**: ≤ 1.5 seconds
- **Lighthouse Score**: ≥ 95
- **Bundle Size**: ≤ 500KB initial load

---

## 🚨 Current Action Items

### **IMMEDIATE PRIORITY** (Next 24 hours)
1. **Context7 MCP Integration Verification**:
   - Backend Architect: Express.js/Node.js documentation access
   - Database Specialist: PostgreSQL/Drizzle documentation access
   - DevOps Specialist: Deployment/infrastructure documentation access
   - Test Architect: Testing framework documentation access

2. **Critical Infrastructure Implementation**:
   - Security middleware (helmet + rate limiting)
   - Testing infrastructure setup (Vitest + Playwright)
   - Automated session initialization script

### **HIGH PRIORITY** (Next 48 hours)
1. CI/CD pipeline setup with GitHub Actions
2. Performance optimization implementation
3. Comprehensive testing coverage achievement

---

## 🔄 Session Handoff Protocol

### **Required Context Files**
- `chat_logs/orchestrator/session[N].md` - Complete session timeline
- `updates/plan.md` - Advanced implementation blueprint
- `.claude/memory.json` - Project-specific details and agent coordination
- `docs/development/dev_rules.md` - Coding standards and patterns

### **Context Preservation Standards**
- **100% Session Continuity**: All activities documented in real-time
- **TodoWrite System**: Systematic progress tracking
- **Parallel Documentation**: Continuous recording by Documentation Agent
- **Quality Monitoring**: Real-time oversight by Main Claude

---

## 📈 Success Metrics

### **Agent Efficiency**
- **Parallel Task Execution**: >3 agents simultaneously
- **Communication Latency**: <30 seconds between agents
- **Session Initialization**: <2 minutes automated
- **Documentation Overhead**: <10% of development time

### **Development Velocity**
- **Feature Development**: 50% faster than sequential workflow
- **Bug Resolution**: <24 hours average
- **Deployment Frequency**: Daily automated deployments
- **Mean Time to Recovery**: <1 hour

### **Quality Achievements**
- **Zero Critical Bugs**: Through comprehensive testing
- **Performance Excellence**: <1.5s page loads consistently
- **Security Compliance**: Enterprise-grade protection
- **Maintainable Code**: Clear agent responsibilities and patterns

---

## 🔧 Agent Communication Protocols

### **Direct Communication Model**
- **Main Claude** ↔ All Agents: Bidirectional coordination
- **Documentation Agent** ← All Agents: Continuous activity recording
- **Cross-Agent Collaboration**: When features span multiple domains
- **Quality Feedback Loop**: Main Claude provides coaching and optimization

### **Parallel Execution Guidelines**
- **Maximum Simultaneous Agents**: 3 (optimal performance)
- **Task Distribution**: Based on expertise and capacity
- **Conflict Resolution**: Main Claude arbitrates disputes
- **Resource Allocation**: Dynamic based on project priorities

---

## 🚀 Getting Started

### **For New Sessions**
1. Review latest session log in `chat_logs/orchestrator/`
2. Check `updates/plan.md` for current implementation phase  
3. Verify agent status in `.claude/memory.json`
4. Use TodoWrite for task tracking and progress monitoring

### **For Agent Coordination**
1. Main Claude analyzes requirements and delegates tasks
2. Agents work in parallel on their specialized domains
3. Documentation Agent records all activities continuously  
4. Real-time quality monitoring ensures standards compliance

### **For Infrastructure Tasks**
1. Follow the 4-phase roadmap in `updates/plan.md`
2. Prioritize security, testing, and automation
3. Implement with parallel agent execution
4. Document all changes for session continuity

---

**System Version**: 7-Agent Parallel Workflow v2.0  
**Last Updated**: January 3, 2025  
**Status**: Operational - Ready for Critical Infrastructure Implementation  
**Next Review**: After Phase 1 completion from updates/plan.md

---

*"The best workflows are invisible - they enable excellence without getting in the way."*  
**- Strive Website Development Philosophy**