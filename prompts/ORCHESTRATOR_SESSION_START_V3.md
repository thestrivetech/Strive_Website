# 🚀 ORCHESTRATOR SESSION START PROTOCOL V3.0
## Complete Blueprint for Agentic Team Work Sessions

**Version**: 3.0 (Post-Session 7 Improvements)  
**Architecture**: 14-Agent Parallel System with Research & Monitoring  
**Critical**: This is your ONLY required input at session start

---

## 📋 PHASE 0: SESSION INITIALIZATION (5 minutes)

### Step 1: Read Critical Intelligence Files
```markdown
MANDATORY READ ORDER:
1. .claude/memory.json                      # Central brain - rules and configurations
2. .serena/memories/*                       # Project intelligence and patterns
3. chat_logs/orchestrator/[latest].txt      # Previous session context (not necessary in test_session_2)
4. change_log.md                            # Recent code changes with rollback info
5. updates/agentic_team_plan.md             # Current implementation progress of agentic team
6. [User-provided plan/update file]         # Today's specific tasks
```

### Step 2: Pre-Flight Health Check
```bash
# Run these checks BEFORE any agent deployment
echo "=== PRE-FLIGHT VERIFICATION ==="

# 1. Infrastructure Check
npm run build || { echo "❌ BUILD FAILED - FIX BEFORE PROCEEDING"; exit 1; }
npm run dev &
sleep 5
curl -s http://localhost:5000 > /dev/null || { echo "❌ PREVIEW BROKEN"; exit 1; }

# 2. File Size Check  
echo "=== FILE SIZE VERIFICATION ==="
find client/src -name "*.tsx" -exec wc -l {} \; | sort -rn | head -5
# ABORT if any file > 300 lines

# 3. Git Status Check
git status --short
# ABORT if uncommitted critical changes

# 4. Agent Configuration Check
echo "=== AGENT VERIFICATION ==="
ls -la .claude/agents/*.md | wc -l
# Expected: 14+ agent files

# 5. Parallel Test
node test_parallel_deployment.js
# Expected: ~1500ms (not 3300ms)

echo "✅ ALL SYSTEMS GO - READY FOR DEPLOYMENT"
```

### Step 3: Create Session Structure
```bash
# Create session documentation directories
mkdir -p docs/session/{frontend,backend,infrastructure,tasks}
mkdir -p chat_logs/orchestrator/session_$(date +%Y%m%d_%H%M)

# Backup critical files
cp client/src/pages/home.tsx backups/home.tsx.$(date +%Y%m%d_%H%M)
cp vite.config.ts backups/vite.config.ts.$(date +%Y%m%d_%H%M)
```

---

## 🔬 PHASE 1: RESEARCH WAVE (10 minutes)

### Deploy Research Agents SIMULTANEOUSLY
```javascript
// CRITICAL: Deploy ALL THREE at once with Promise.all
const researchTasks = {
  'frontend-researcher': {
    prompt: `Gather documentation for:
    - React 18 hooks and patterns
    - TypeScript strict mode best practices  
    - shadcn/ui components: [LIST SPECIFIC COMPONENTS]
    - TailwindCSS utilities for [SPECIFIC FEATURES]
    - Vite optimization techniques
    Output to: /docs/session/frontend/`,
    expectedTime: '8-10 minutes'
  },
  
  'backend-researcher': {
    prompt: `Fetch documentation for:
    - Express.js middleware patterns
    - Drizzle ORM query optimization
    - PostgreSQL performance tuning
    - Supabase authentication flows
    - API rate limiting strategies
    Output to: /docs/session/backend/`,
    expectedTime: '8-10 minutes'
  },
  
  'infrastructure-researcher': {
    prompt: `Collect documentation for:
    - Replit deployment configurations
    - Vite build optimization
    - GitHub Actions workflows
    - Testing framework setup (Vitest/Playwright)
    - Performance monitoring tools
    Output to: /docs/session/infrastructure/`,
    expectedTime: '8-10 minutes'
  }
};

// Deploy and wait
await Promise.all(Object.entries(researchTasks).map(([agent, task]) => 
  deployAgent(agent, task)
));

// Verify documentation created
if (!fs.existsSync('/docs/session/frontend/patterns.md')) {
  console.error('❌ Research agents failed - no documentation created');
}
```

---

## 📝 PHASE 2: TASK PREPARATION (5 minutes)

### Analyze User's Plan/Update File
```markdown
1. Parse the user-provided plan file for:
   - Specific feature requirements
   - Bug fixes needed
   - Performance improvements
   - UI/UX enhancements

2. Categorize tasks by:
   - Priority (Critical/High/Medium/Low)
   - Dependencies (Independent/Sequential)
   - Agent assignment (Which agent handles what)
   - Estimated complexity (Simple/Medium/Complex)
```

### Create Task Matrix
```javascript
const taskMatrix = {
  independent: [  // Can run in parallel
    { agent: 'frontend-architect', tasks: [], priority: 'high' },
    { agent: 'backend-architect', tasks: [], priority: 'high' },
    { agent: 'database-specialist', tasks: [], priority: 'medium' }
  ],
  dependent: [    // Must run sequentially
    { agent: 'ui-ux', tasks: [], requires: ['frontend-architect'] },
    { agent: 'test-architect', tasks: [], requires: ['frontend', 'backend'] }
  ],
  continuous: [   // Run throughout session
    { agent: 'execution-monitor', frequency: '30 seconds' },
    { agent: 'component-extractor', trigger: 'file > 250 lines' },
    { agent: 'documentor', mode: 'real-time' }
  ]
};
```

### Generate Agent Task Cards
```markdown
## TASK CARD: Frontend Architect
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**TASK ID**: FE-001
**PRIORITY**: HIGH
**REQUIREMENT**: Change button text from "Watch Demo" to "View Demos"

**FILES TO MODIFY**:
- `/client/src/pages/home.tsx` (Line 145)
- `/client/src/components/layout/cta-section.tsx` (Line 67)

**TOOLS REQUIRED**:
✅ MUST use Edit or MultiEdit for changes
✅ MUST run `git diff [file]` after each change
✅ MUST check file size remains < 300 lines

**FORBIDDEN**:
❌ DO NOT use Context7 (docs provided in /docs/session/)
❌ DO NOT claim completion without git verification
❌ DO NOT create files > 300 lines

**VERIFICATION**:
```bash
git diff --name-only | grep -E "home\.tsx|cta-section\.tsx"
npm run build  # Must succeed
```

**SUCCESS CRITERIA**:
□ Text changed in both files
□ No syntax errors introduced
□ Build passes
□ Preview still functional
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🚀 PHASE 3: PARALLEL EXECUTION (20 minutes)

### Wave 1: Core Development (Independent Tasks)
```javascript
// Deploy independent agents SIMULTANEOUSLY
const wave1Deployment = async () => {
  console.log("🚀 WAVE 1: Deploying core agents in parallel...");
  
  const startTime = Date.now();
  const results = await Promise.all([
    deployAgent('frontend-architect', frontendTasks),
    deployAgent('backend-architect', backendTasks),
    deployAgent('database-specialist', databaseTasks)
  ]);
  
  console.log(`✅ Wave 1 complete in ${Date.now() - startTime}ms`);
  return results;
};

// Start monitoring IMMEDIATELY
const monitoringLoop = setInterval(() => {
  executionMonitor.check();
  
  // Intervention triggers
  if (noChangesFor2Minutes()) {
    console.warn("⚠️ INTERVENTION: No changes detected");
    sendExplicitEditInstruction();
  }
  
  if (corruptionDetected()) {
    console.error("🔴 CORRUPTION DETECTED");
    rollbackAndRestart();
  }
}, 30000);
```

### Wave 2: Quality & Polish (Dependent Tasks)
```javascript
// After Wave 1 verification
const wave2Deployment = async () => {
  // Verify Wave 1 completion
  const wave1Status = await verifyWave1();
  if (!wave1Status.allComplete) {
    console.error("❌ Wave 1 incomplete - cannot proceed");
    return;
  }
  
  console.log("🎨 WAVE 2: Deploying quality agents...");
  
  await Promise.all([
    deployAgent('ui-ux', uiTasks),
    deployAgent('test-architect', testTasks),
    deployAgent('devops-specialist', devOpsTasks)
  ]);
};
```

---

## 🔍 PHASE 4: CONTINUOUS MONITORING (Throughout)

### Real-Time Verification Dashboard
```javascript
// Monitor every 30 seconds throughout session
const monitoringDashboard = () => {
  console.clear();
  console.log(`
╔════════════════════════════════════════════════════╗
║           AGENT EXECUTION MONITOR                  ║
╠════════════════════════════════════════════════════╣
║ Time: ${new Date().toLocaleTimeString()}          ║
║                                                    ║
║ AGENT STATUS:                                      ║
║ • Frontend:    ${getStatus('frontend')}           ║
║ • Backend:     ${getStatus('backend')}            ║
║ • Database:    ${getStatus('database')}           ║
║ • UI/UX:       ${getStatus('ui-ux')}              ║
║                                                    ║
║ FILES MODIFIED: ${getModifiedFileCount()}         ║
║ • home.tsx:        ${getFileLines('home.tsx')}    ║
║ • portfolio.tsx:   ${getFileLines('portfolio.tsx')}║
║                                                    ║
║ HEALTH CHECKS:                                     ║
║ • Build:       ${getBuildStatus()}                ║
║ • Preview:     ${getPreviewStatus()}              ║
║ • Corruption:  ${getCorruptionStatus()}           ║
╚════════════════════════════════════════════════════╝
  `);
};

setInterval(monitoringDashboard, 30000);
```

### Intervention Decision Matrix
```javascript
const interventionMatrix = {
  'no_changes_2min': {
    detection: () => timeSinceLastChange() > 120000,
    action: () => {
      console.log("🔧 INTERVENTION: Sending explicit Edit instruction");
      sendMessage(currentAgent, "Use Edit or MultiEdit tool NOW on [specific file]");
    }
  },
  
  'file_corrupted': {
    detection: () => checkForCorruption(),
    action: () => {
      console.log("🔴 EMERGENCY: Rolling back corrupted file");
      exec('git checkout -- ' + corruptedFile);
      restartAgent(currentAgent);
    }
  },
  
  'file_too_large': {
    detection: () => getMaxFileSize() > 300,
    action: () => {
      console.log("📦 EXTRACTION: Deploying component-extractor");
      deployAgent('component-extractor', { file: largeFile });
    }
  },
  
  'preview_broken': {
    detection: () => !isPreviewWorking(),
    action: () => {
      console.log("🚨 CRITICAL: Stopping all agents");
      stopAllAgents();
      exec('git stash && npm run dev');
    }
  }
};
```

---

## ✅ PHASE 5: SESSION COMPLETION (10 minutes)

### Final Verification Checklist
```bash
#!/bin/bash
echo "=== FINAL VERIFICATION CHECKLIST ==="

# 1. Task Completion
echo "📋 Task Verification:"
for task in "${tasks[@]}"; do
  if git diff --name-only | grep -q "$task"; then
    echo "✅ $task - COMPLETE"
  else
    echo "❌ $task - INCOMPLETE"
  fi
done

# 2. Build Status
echo "🔨 Build Verification:"
npm run build && echo "✅ Build passes" || echo "❌ Build fails"

# 3. File Sizes
echo "📏 File Size Check:"
find client/src -name "*.tsx" -exec wc -l {} \; | sort -rn | head -5

# 4. Corruption Check
echo "🔍 Corruption Scan:"
grep -r "const const\|export.*\n.*[^}]$" client/src && echo "❌ Corruption found" || echo "✅ No corruption"

# 5. Documentation
echo "📝 Documentation Status:"
ls -la change_log.md
ls -la chat_logs/orchestrator/session_*

echo "=== SESSION COMPLETE ==="
```

### Session Report Generation
```markdown
## Agentic Team Session Report - [DATE]

### Execution Metrics
- **Session Duration**: X minutes
- **Agents Deployed**: 14 (3 research, 7 execution, 2 monitoring, 2 support)
- **Parallel Efficiency**: X% (agents running simultaneously)
- **Tasks Completed**: Y/Z (verified with git diff)
- **Files Modified**: A files, B lines changed
- **Context Usage**: C% (D% saved by research agents)

### Performance Analysis
| Agent | Tasks | Completed | Verified | Issues |
|-------|-------|-----------|----------|---------|
| Frontend | 5 | 5 | ✅ | None |
| Backend | 3 | 2 | ⚠️ | 1 incomplete |
| Database | 2 | 2 | ✅ | None |

### Critical Events
- [TIME]: Intervention required for [AGENT] - no changes detected
- [TIME]: File extraction triggered for home.tsx (350 lines)
- [TIME]: All tasks verified complete

### Improvements for Next Session
1. [Specific improvement based on session]
2. [Another improvement]

### Files Updated
- change_log.md ✅
- agentic_team_plan.md ✅
- Session log created ✅
```

### 📝 Session Chat Log Documentation (MANDATORY)

**CRITICAL**: This step MUST be completed before ending any session!

**Location**: `chat_logs/orchestrator/[session_name].md`

**Required Content**:
1. **Complete Timeline**: Every phase with timestamps and durations
2. **Agent Deployments**: All attempts, successes, failures with details
3. **File Modifications**: Every change with before/after code snippets
4. **API Interactions**: Calls, responses, errors (especially 529s)
5. **Manual Interventions**: Direct edits when agents fail
6. **Verification Outputs**: All git diff and test results
7. **Task Tracking**: Complete list with status and reasons
8. **Decision Rationale**: Why tasks were prioritized/deferred
9. **Lessons Learned**: What worked, what failed, improvements needed
10. **Performance Metrics**: Time distribution, context usage, success rates

**Format**: 
- Detailed narrative with code blocks
- Maintain full context for future sessions
- Include all terminal outputs and error messages
- Document fallback strategies used

**Example Structure**:
```markdown
# Agentic Team Session [X] - Complete Session Log
## Session Overview
## Initial Task List
## Phase 0: Initialization
## Phase 1: Research Wave
## Phase 2: Task Preparation
## Phase 3: Execution Waves
## Phase 4: Monitoring
## Phase 5: Verification
## Task Completion Summary
## Lessons Learned
## Performance Metrics
## Next Session Priorities
```

**Why This Matters**:
- Enables session continuity across different instances
- Provides data for workflow optimization
- Documents what actually happened vs. what was planned
- Critical for debugging and improvement iterations

---

## 🚨 CRITICAL REMINDERS

### NEVER FORGET (Session 5 Disasters)
1. **Agents created 1275-line CORRUPTED files** - Always monitor file sizes
2. **No verification led to false reports** - ALWAYS verify with git diff
3. **Context explosion from Context7** - Use research agents FIRST
4. **Sequential execution wasted time** - Use Promise.all ALWAYS
5. **No intervention = total failure** - Monitor every 30 seconds

### ALWAYS ENFORCE
1. **Edit/MultiEdit tools are MANDATORY** - Agents won't edit without explicit instruction
2. **300-line file limit is ABSOLUTE** - Deploy extractor at 250 lines
3. **Verify EVERYTHING with git diff** - Never trust agent reports
4. **Test configs IMMEDIATELY** - Vite broke everything in Session 5
5. **Document in REAL-TIME** - Update change_log.md continuously

### SUCCESS FORMULA
```
Research First → Parallel Execution → Continuous Monitoring → Real Verification → Complete Documentation
```

---

## 📊 Quick Reference Commands

```bash
# One-line health check
npm run build && curl -s localhost:5000 && echo "✅ OK" || echo "❌ BROKEN"

# Monitor progress
watch -n 30 'git status --short && git diff --stat'

# Detect corruption
grep -r "const const\|export.*\n" client/src

# Emergency rollback
git stash && git checkout . && npm run dev

# Test parallel deployment
node test_parallel_deployment.js

# Count agent edits
git diff --name-only | wc -l

# Check file sizes
find client/src -name "*.tsx" -exec wc -l {} \; | sort -rn | head -5
```

---

**END OF ORCHESTRATOR SESSION START PROTOCOL V3.0**

*This is your complete blueprint. Follow it exactly for 100% success rate.*