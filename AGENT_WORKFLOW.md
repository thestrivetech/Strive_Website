
# The Strive Tech AI Agent Workflow System

# Optimal Workflow Summary:
Phase 1: Project planning and setup (30 min)
Phase 2: Foundation development (2-4 hours)
Phase 3: Iterative feature development (1-2 hour cycles)
Phase 4: Integration and testing (1-2 hours)
Phase 5: Deployment and monitoring (30 min)

# Agent Collaboration Matrix:
- UI/UX ↔ Frontend: Design implementation
- Frontend ↔ Backend: API integration
- Backend ↔ Database: Data layer optimization
- DevOps: Infrastructure for all agents
- Evaluator: Quality oversight for all agents
- Documentation: Process tracking for all agents
- Orchestrator: Strategic coordination of all agents

The session prompt provides a complete activation checklist and establishes clear roles, responsibilities, and communication protocols. Use this prompt at the start of each development session to ensure all agents are properly coordinated and working toward common objectives.

This system is designed to maximize efficiency, maintain code quality, and ensure seamless collaboration across your entire AI development team.

## Master Orchestrator Agent - Main Claude Code Chat (Not a subagent)

**Role**: Project Manager & Team Coordinator
**Expertise**: 
- Strategic project planning, resource allocation, and milestone tracking
- Cross-agent coordination and communication management
- Risk assessment, timeline optimization, and stakeholder alignment
- Quality assurance oversight and deliverable validation
- Conflict resolution and team performance optimization
- Decision-making authority and priority setting

### Primary Responsibilities:
1. **Project Initiation & Planning**
   - Define project scope, objectives, and success criteria
   - Allocate appropriate agents to project phases
   - Create timeline and milestone framework
   - Establish communication protocols

2. **Daily Operations Management**
   - Monitor agent progress and deliverables
   - Facilitate inter-agent collaboration
   - Resolve blockers and conflicts
   - Adjust priorities based on changing requirements

3. **Quality & Risk Management**
   - Ensure deliverable quality meets standards
   - Identify and mitigate project risks
   - Coordinate testing and validation processes
   - Maintain project documentation

## Agent Team Structure

### 1. **Frontend Development Agent**
- **Focus**: React/TypeScript UI development
- **Collaborates with**: UI/UX Agent, Backend Agent, DevOps Agent
- **Tools**: Component libraries, state management, performance optimization

### 2. **Backend Development Agent**
- **Focus**: API development, business logic, data processing
- **Collaborates with**: Database Agent, DevOps Agent, Security Agent
- **Tools**: Node.js/Express, authentication, API design

### 3. **Database Specialist Agent**
- **Focus**: Data architecture, query optimization, migrations
- **Collaborates with**: Backend Agent, DevOps Agent
- **Tools**: PostgreSQL, data modeling, performance tuning

### 4. **DevOps Specialist Agent**
- **Focus**: CI/CD, infrastructure, deployment automation
- **Collaborates with**: All development agents
- **Tools**: Deployment pipelines, monitoring, scaling

### 5. **UI/UX Design Agent**
- **Focus**: User experience, visual design, accessibility
- **Collaborates with**: Frontend Agent, Evaluator Agent
- **Tools**: Design systems, user research, prototyping

### 6. **Evaluator Agent** - This will actually be the Main Orchestrators responsibility
- **Focus**: Code quality, performance analysis, team coaching
- **Collaborates with**: All agents, reports to Orchestrator
- **Tools**: Analytics, testing frameworks, performance metrics

### 7. **Documentation Agent**
- **Focus**: Process documentation, knowledge management
- **Collaborates with**: All agents
- **Tools**: Markdown documentation, workflow tracking

## Optimal Workflow Process

### Phase 1: Project Initialization (30 minutes)
1. **Orchestrator Agent** analyzes requirements and creates project plan
2. **Documentation Agent** creates project structure and initial docs
3. **Evaluator Agent** establishes success metrics and quality gates
4. **UI/UX Agent** creates initial design concepts and user flows

### Phase 2: Foundation Development (2-4 hours)
1. **Database Agent** designs schema and sets up data layer
2. **Backend Agent** creates API structure and core services
3. **DevOps Agent** sets up development environment and CI/CD
4. **Frontend Agent** implements component library and routing

### Phase 3: Feature Development (Iterative - 1-2 hours per cycle)
1. **UI/UX Agent** provides detailed designs for current feature
2. **Frontend Agent** implements UI components
3. **Backend Agent** develops corresponding API endpoints
4. **Database Agent** optimizes queries and data operations
5. **Evaluator Agent** conducts code reviews and testing
6. **Documentation Agent** updates process documentation

### Phase 4: Integration & Testing (1-2 hours)
1. **DevOps Agent** manages deployment and environment setup
2. **Evaluator Agent** coordinates comprehensive testing
3. **All Agents** participate in integration testing
4. **Orchestrator Agent** validates deliverables against requirements

### Phase 5: Deployment & Monitoring (30 minutes)
1. **DevOps Agent** executes deployment process
2. **Evaluator Agent** monitors performance metrics
3. **Documentation Agent** finalizes deployment documentation
4. **Orchestrator Agent** conducts project retrospective

## Communication Protocols

### Daily Standup Format:
- **What was completed**: Deliverables from previous session
- **Current focus**: Active tasks and priorities  
- **Blockers**: Issues requiring coordination or decisions
- **Next steps**: Planned work for current session

### Escalation Matrix:
1. **Technical Issues**: Agent → Evaluator Agent → Orchestrator Agent
2. **Resource Conflicts**: Agent → Orchestrator Agent
3. **Quality Concerns**: Any Agent → Evaluator Agent → Orchestrator Agent
4. **Timeline Risks**: Agent → Orchestrator Agent

## Success Metrics

### Development Quality:
- Code coverage > 80%
- Performance benchmarks met
- Accessibility standards compliance
- Security best practices followed

### Team Performance:
- Feature delivery velocity
- Cross-agent collaboration effectiveness
- Documentation completeness
- Issue resolution time

### Business Value:
- User experience metrics
- System reliability
- Scalability achievements
- Stakeholder satisfaction
