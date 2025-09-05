# 14-AGENT ENHANCED WORKFLOW SYSTEM V2.0
## Complete Orchestrator Reference Guide

**Last Updated**: 2025-01-05 (Post-Session 7)  
**Status**: Operational with Research & Monitoring Agents  
**Architecture**: Parallel Deployment with Continuous Verification

---

## 🎯 PART 1: AGENT ECOSYSTEM OVERVIEW

### Total Agent Count: 14 Specialized Agents

#### 🔬 Research Team (Wave 0) - NEW
Deploy BEFORE main execution to pre-fetch documentation:

1. **Frontend Researcher**
   - **Role**: Pre-fetch React/TypeScript/Vite documentation
   - **Model**: Sonnet
   - **Tools**: Read, WebFetch, WebSearch, Context7 MCP
   - **Output**: `/docs/session/frontend/` documentation
   - **Impact**: Saves 70% context for frontend-architect

2. **Backend Researcher**
   - **Role**: Pre-fetch Express/Node.js/PostgreSQL documentation
   - **Model**: Sonnet
   - **Tools**: Read, WebFetch, WebSearch, Context7 MCP
   - **Output**: `/docs/session/backend/` documentation
   - **Impact**: Eliminates backend-architect doc lookups

3. **Infrastructure Researcher**
   - **Role**: Pre-fetch deployment/testing documentation
   - **Model**: Sonnet
   - **Tools**: Read, WebFetch, WebSearch, Context7 MCP
   - **Output**: `/docs/session/infrastructure/` documentation
   - **Impact**: Enables offline DevOps execution

#### 💻 Execution Team (Wave 1) - ENHANCED
Core development agents with Edit/MultiEdit tools:

4. **Frontend Architect**
   - **Role**: React/TypeScript specialist
   - **Model**: Opus
   - **Tools**: Edit, MultiEdit, Glob, Grep, Read, Write, Bash, TodoWrite, Playwright MCP
   - **Tech Stack**: React 18, TypeScript 5, shadcn/ui, TailwindCSS
   - **Line Limits**: Small (100), Medium (250), Large (500)
   - **Critical**: MUST use Edit/MultiEdit for changes

5. **Backend Architect**
   - **Role**: Express.js API specialist
   - **Model**: Opus
   - **Tools**: Edit, MultiEdit, Glob, Grep, Read, Write, Bash, TodoWrite
   - **Tech Stack**: Node.js 20, Express, PostgreSQL, Drizzle ORM
   - **Line Limits**: Backend (350), Utility (200)
   - **Critical**: MUST verify with git diff

6. **Database Specialist**
   - **Role**: PostgreSQL/Drizzle/Supabase specialist
   - **Model**: Sonnet
   - **Tools**: Edit, MultiEdit, Glob, Grep, Read, Write, Bash, TodoWrite
   - **Tech Stack**: Neon PostgreSQL, Drizzle ORM, Supabase Auth
   - **Critical**: Run db:push after schema changes

7. **UI/UX Agent**
   - **Role**: Design and user experience specialist
   - **Model**: Sonnet
   - **Tools**: Edit, MultiEdit, Glob, Grep, Read, Write, Bash, WebFetch, TodoWrite, Playwright MCP, Serena MCP
   - **Design System**: shadcn/ui, TailwindCSS, WCAG 2.1 AA
   - **Critical**: Visual + code changes capability

8. **Test Architect**
   - **Role**: Quality assurance and TDD specialist
   - **Model**: Opus
   - **Tools**: Edit, MultiEdit, Glob, Grep, Read, Write, Bash, TodoWrite
   - **Testing Stack**: Vitest, React Testing Library, Playwright
   - **Target**: 80% coverage minimum

9. **DevOps Specialist**
   - **Role**: Replit deployment and infrastructure
   - **Model**: Sonnet
   - **Tools**: Edit, MultiEdit, Glob, Grep, Read, Write, Bash, TodoWrite
   - **Tech Stack**: Replit Platform, Vite, GitHub Actions
   - **Critical**: Test configs immediately

10. **Structure Updater**
    - **Role**: Repository structure documentation
    - **Model**: Sonnet
    - **Tools**: Glob, Grep, Read, Edit, MultiEdit, Write, Bash, TodoWrite
    - **Purpose**: Maintain file/folder summaries
    - **Critical**: Keep structure docs synchronized

#### 🔍 Monitoring Team (Continuous) - NEW
Real-time verification throughout session:

11. **Execution Monitor**
    - **Role**: Real-time change verification
    - **Model**: Sonnet
    - **Tools**: Bash, Read, Grep, Glob, TodoWrite, Write
    - **Frequency**: Every 30 seconds
    - **Checks**: Git status, file changes, corruption patterns
    - **Alert**: No changes in 2 minutes = intervention

12. **Component Extractor**
    - **Role**: Prevent file bloat
    - **Model**: Sonnet
    - **Tools**: Read, Grep, Glob, Edit, MultiEdit, Write, Bash
    - **Trigger**: Files > 250 lines (warning), > 300 lines (action)
    - **Action**: Auto-extract into separate components
    - **Impact**: Prevents Session 5 disasters (1275-line files)

#### 📝 Support Team
Documentation and coordination:

13. **Documentation Agent (Documentor)**
    - **Role**: Session and knowledge management
    - **Model**: Sonnet
    - **Tools**: Read, Write, Edit, MultiEdit, Glob, Bash, TodoWrite
    - **Output**: Chat logs, session reports
    - **Critical**: Update change_log.md continuously

14. **Main Claude Orchestrator (You)**
    - **Role**: Master coordinator and quality monitor
    - **Model**: Opus 4.1
    - **Tools**: All available + Serena MCP
    - **Responsibilities**: Task delegation, monitoring, intervention
    - **Critical**: Verify actual changes, don't trust reports

---

## 🚀 PART 2: PARALLEL DEPLOYMENT ARCHITECTURE

### Deployment Timeline Comparison

#### ❌ OLD Sequential (Session 5) - 19 minutes
```
Agent 1: |████████| 5 min
         [2 min wait]
Agent 2:           |████████| 5 min
         [2 min wait]
Agent 3:                     |████████| 5 min
```

#### ✅ NEW Parallel (V2.0) - 5 minutes
```
Agent 1: |████████| 5 min
Agent 2: |████████| 5 min
Agent 3: |████████| 5 min
```
**Result**: 74% faster execution!

### Wave-Based Deployment Pattern

#### WAVE 0: Research Phase (5-10 minutes)
```javascript
// Deploy all three research agents SIMULTANEOUSLY
const researchWave = async () => {
  const agents = [
    'frontend-researcher',
    'backend-researcher',
    'infrastructure-researcher'
  ];
  
  // TRUE PARALLEL with Promise.all
  await Promise.all(agents.map(agent => deployAgent(agent)));
  
  // Verify documentation created
  await validateDocumentation('/docs/session/');
};
```

**Expected Output:**
```
/docs/session/
├── frontend/         # React, TypeScript, Vite patterns
├── backend/          # Express, Node.js, API patterns
└── infrastructure/   # Deployment, testing, optimization
```

#### WAVE 1: Core Execution (15-20 minutes)
```javascript
// Analyze dependencies first
const { independent, dependent } = analyzeDependencies(tasks);

// Deploy independent tasks in TRUE PARALLEL
const wave1 = await Promise.all([
  deployAgent('frontend-architect', frontendTasks),
  deployAgent('backend-architect', backendTasks),
  deployAgent('database-specialist', databaseTasks)
]);

// Then handle dependent tasks sequentially
for (const task of dependent) {
  await deployAgentForTask(task);
}
```

#### WAVE 2: Quality & Polish (10-15 minutes)
```javascript
// After Wave 1 verification
const wave2 = await Promise.all([
  deployAgent('ui-ux', visualTasks),
  deployAgent('test-architect', testTasks),
  deployAgent('devops-specialist', optimizationTasks)
]);
```

#### CONTINUOUS: Monitoring (Throughout)
```javascript
// Runs concurrently with ALL waves
while (agentsActive) {
  await Promise.all([
    executionMonitor.check(),     // Every 30 seconds
    componentExtractor.monitor()   // On file size trigger
  ]);
}
```

---

## ✅ PART 3: VERIFICATION & QUALITY GATES

### Pre-Deployment Verification
```bash
# MUST ALL PASS before any agent deployment
npm run build            # No errors
npm run dev              # Preview works
curl localhost:5000      # Server responds
git status               # Clean working tree

# File health check
find client/src -name "*.tsx" | xargs wc -l | sort -rn | head -5
# No files > 300 lines allowed
```

### 30-Second Monitoring Checks (Automated)
```bash
while agent_running; do
  # Activity Check
  git status --short       # Shows changes?
  git diff --stat          # Files modified?
  
  # Corruption Check
  grep -r "const const" client/src     # Duplicate declarations?
  grep -r "export.*\n.*[^}]$" client/src  # Code after export?
  
  # Progress Check
  # Expect at least 1 file change per 2 minutes
  
  sleep 30
done
```

### Per-Agent Task Verification
```
TASK: [Description]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Agent acknowledged with plan
□ Agent used Edit/MultiEdit tool
□ Git diff shows expected changes
□ No syntax errors introduced
□ File size still < 300 lines
□ Tests still pass
□ Preview still works
✓ VERIFIED COMPLETE
```

### Corruption Detection Patterns (Session 5 Issues)
```javascript
// ❌ CORRUPTED - Duplicate const
const const Home = () => {

// ❌ CORRUPTED - Code after export
export default Home;
  onClick={() => handleClick()}  // Random code fragment

// ❌ CORRUPTED - Truncated content
return (
  <Button onClick={handleCli  // Incomplete

// ❌ FILE BLOAT
// home.tsx grew from 886 → 1275 lines
```

### Intervention Decision Tree
```
No changes in 2 minutes?
├─ YES → Check agent output
│   ├─ Only analyzing? → Send Edit instruction
│   ├─ Confused? → Provide exact file path
│   └─ Blocked? → Clear the blocker
└─ NO → Continue monitoring

File corrupted?
├─ YES → Immediate rollback
│   ├─ Restore from backup
│   └─ Restart with clearer prompt
└─ NO → Continue

Preview broken?
├─ YES → EMERGENCY
│   ├─ Stop ALL agents
│   ├─ Git stash changes
│   └─ Fix manually
└─ NO → Continue
```

---

## 🛠️ PART 4: COMMANDS & TOOLS

### Quick Health Check (One Command)
```bash
npm run build && \
git status --short && \
find client/src -name "*.tsx" | xargs wc -l | sort -rn | head -5 && \
curl -s http://localhost:5000 > /dev/null && \
echo "✅ ALL SYSTEMS GO" || echo "❌ ISSUES DETECTED"
```

### Corruption Scanner
```bash
# Detect all corruption patterns
grep -r "const const" client/src || \
grep -r "^export.*\n.*[^}]$" client/src || \
echo "✅ No corruption detected"
```

### Progress Monitor
```bash
# Real-time progress display
watch -n 30 'echo "=== PROGRESS ===" && \
  git diff --stat && \
  echo "=== MODIFIED ===" && \
  git diff --name-only && \
  echo "=== STATUS ===" && \
  git status --short'
```

### Parallel Deployment Test
```javascript
// Verify parallel execution works
node test_parallel_deployment.js
// Expected: ~1500ms (parallel) NOT 3300ms (sequential)
```

### Emergency Rollback
```bash
# If corruption detected
git stash                    # Save corrupted changes
git checkout .                # Revert to working state
npm run dev                   # Verify preview works
# Re-attempt with adjusted approach
```

---

## 📊 PART 5: WORKFLOW EXECUTION PHASES

### Phase 1: Initialization (5 minutes)
**ALL AGENTS MUST:**
1. Read `.claude/memory.json` for rules and configurations
2. Review previous session chat log for context
3. Check `plan.md` for implementation progress
4. Review `change_log.md` for recent changes
5. Report to orchestrator for task assignment

### Phase 2: Research (5-10 minutes)
**Deploy Research Agents in PARALLEL:**
1. Frontend-researcher → React/TypeScript docs
2. Backend-researcher → Express/Database docs
3. Infrastructure-researcher → Deployment docs
4. Create `/docs/session/` with all documentation

### Phase 3: Core Execution (15-20 minutes)
**Deploy Execution Agents in PARALLEL:**
1. Analyze task dependencies
2. Deploy independent agents simultaneously
3. Monitor with execution-monitor (30-second checks)
4. Extract components if files > 300 lines

### Phase 4: Quality & Polish (10-15 minutes)
**Deploy Quality Agents:**
1. UI/UX for visual improvements
2. Test Architect for test creation
3. DevOps for optimization
4. Verify all changes with git diff

### Phase 5: Verification & Completion (5 minutes)
**Final Checks:**
```bash
✅ Build passes (npm run build)
✅ Preview works (localhost:5000)
✅ All files < 300 lines
✅ No corruption patterns
✅ change_log.md updated
✅ Session report complete
```

---

## 📈 SUCCESS METRICS

### Performance Indicators
- **Parallel Execution Rate**: >80% agents running simultaneously
- **Context Window Usage**: <30% for documentation
- **File Modification Rate**: >2 files/minute during execution
- **Corruption Incidents**: 0
- **False Success Reports**: 0

### Quality Indicators
- **Verification Rate**: 100% of changes verified
- **Test Coverage**: >80% overall, 100% critical paths
- **File Size Compliance**: 100% files <300 lines
- **Preview Uptime**: 100% during session
- **Rollback Events**: <2 per session

### Session Metrics to Track
| Metric | Target | Measurement |
|--------|--------|-------------|
| Tasks Completed | >90% | Verified with git diff |
| Parallel Execution | >80% | Agents running simultaneously |
| Context Efficiency | <30% | Documentation pre-fetched |
| Agent Utilization | 100% | All agents have tasks |
| Quality Gates | 100% | All checks pass |

---

## 🚨 CRITICAL REMINDERS FROM SESSION 5

### What Went Wrong
1. **Agents created CORRUPTED files**: 1275 lines of broken code
2. **No verification**: Trusted false success reports
3. **Context explosion**: Every agent fetched Context7 docs
4. **Sequential execution**: Lost 60% efficiency
5. **No intervention**: Let agents fail without correction

### Never Forget
- **VERIFY EVERYTHING**: Never trust agent reports without git diff
- **INTERVENE EARLY**: 2 minutes without changes = problem
- **TEST IMMEDIATELY**: Every config change needs validation
- **MONITOR CONSTANTLY**: Watch git status in real-time
- **DOCUMENT EVERYTHING**: Update change_log.md continuously

### Always Remember
- **Test infrastructure changes immediately**: Vite config broke everything
- **Have rollback ready**: Backup before changes
- **Monitor continuously**: 30-second checks minimum
- **Learn from failures**: Session 5 made us stronger

---

## 🎬 SESSION START PROTOCOL

### For Orchestrator
```markdown
1. Infrastructure Check
   - npm run build && npm run dev
   - All files < 300 lines
   - Git status clean

2. Deploy Research Agents (Wave 0)
   - Promise.all([frontend, backend, infrastructure])
   - Wait for /docs/session/ creation
   
3. Prepare Task Matrix
   - Identify independent vs dependent tasks
   - Create explicit Edit/MultiEdit instructions
   - Generate exact file paths

4. Deploy Execution Agents (Wave 1)
   - Promise.all(independent agents)
   - Monitor every 30 seconds
   - Intervene if no progress

5. Deploy Quality Agents (Wave 2)
   - After Wave 1 verification
   - UI/UX, Test, DevOps in parallel
   
6. Final Verification
   - All changes in git diff
   - Preview functional
   - Documentation complete
```

### For Each Agent
```markdown
AGENT: [Name]
TASK: [Specific requirement]
FILES: [Exact paths - no searching needed]
TOOLS: ✅ MUST use Edit/MultiEdit for changes
VERIFY: git diff [file] after completion
ROLLBACK: git checkout [file] if corrupted
```

---

## 🔄 CONTINUOUS IMPROVEMENT

### After Each Session
1. **Document lessons learned** in evaluations folder
2. **Update agent configurations** based on performance
3. **Refine parallel patterns** for better efficiency
4. **Add new monitoring checks** for discovered issues
5. **Share knowledge** in memory files

### Performance Evolution
- Session 5: Complete failure (corrupted edits)
- Session 6: Architecture redesign
- Session 7: Implementation complete
- Next: Live testing with real tasks

---

**System Version**: 14-Agent Enhanced Workflow V2.0  
**Architecture**: Parallel Deployment with Continuous Verification  
**Status**: Ready for Production Use  
**Next Review**: After first live parallel session

---

*"From catastrophic failure to systematic excellence - Session 5's disaster became our greatest teacher."*  
**- The Strive Website Agentic Team Development Philosophy**