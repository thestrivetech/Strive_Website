# AGENT VERIFICATION CHECKLIST
## Preventing Session 5 Disasters

---

## PRE-DEPLOYMENT VERIFICATION

### Infrastructure Health
```bash
# MUST ALL PASS before any agent deployment
✅ npm run build            # No errors
✅ npm run dev              # Preview works
✅ curl localhost:5000      # Server responds  
✅ git status               # Clean working tree
```

### File Health Check
```bash
# No bloated files
✅ No file > 300 lines
✅ No syntax errors
✅ No "const const" patterns
✅ All exports valid
```

---

## DURING AGENT EXECUTION

### 30-Second Checks (Automated)
```bash
while agent_running; do
  # 1. Activity Check
  [ ] Git status shows changes?
  [ ] Modified files count > 0?
  [ ] No idle time > 60 seconds?
  
  # 2. Corruption Check  
  [ ] No duplicate declarations?
  [ ] No code after exports?
  [ ] Syntax still valid?
  
  # 3. Progress Check
  [ ] At least 1 file changed per 2 minutes?
  [ ] Changes match requirements?
  
  sleep 30
done
```

### Per-Task Verification
```markdown
TASK: [Description]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Task assigned to agent
□ Agent acknowledged with plan
□ Agent used Edit/MultiEdit tool
□ Git diff shows expected changes
□ No syntax errors introduced
□ File size still < 300 lines
□ Tests still pass
□ Preview still works
✓ VERIFIED COMPLETE
```

---

## AGENT-SPECIFIC CHECKS

### Frontend Architect
```
□ Components created/modified
□ TypeScript types correct
□ No console errors
□ Styles applied correctly
□ Event handlers work
□ Props passed correctly
```

### Backend Architect
```
□ API endpoints created
□ Routes registered
□ Middleware applied
□ Error handling present
□ TypeScript types match
□ Responses return JSON
```

### Database Specialist
```
□ Schema.ts updated
□ Types generated
□ Migrations ready
□ No breaking changes
□ Relationships correct
□ Indexes optimized
```

### UI/UX Agent
```
□ Visual improvements visible
□ Responsive design works
□ Accessibility maintained
□ Colors/fonts correct
□ Animations smooth
□ Layout not broken
```

### DevOps Specialist
```
□ Config changes tested
□ Build still works
□ Preview functional
□ Environment vars set
□ Performance maintained
□ Rollback prepared
```

### Test Architect
```
□ Test files created
□ Tests actually run
□ Coverage improved
□ Edge cases covered
□ Mocks appropriate
□ No flaky tests
```

---

## CORRUPTION PATTERNS TO DETECT

### Syntax Corruption (Session 5 Issues)
```javascript
// ❌ CORRUPTED - Duplicate const
const const Home = () => {

// ❌ CORRUPTED - Code after export
export default Home;
  onClick={() => handleClick()}  // Random code

// ❌ CORRUPTED - Mismatched brackets
const Component = () => {
  return (
    <div>
      Content
    </div>
  );  // Missing closing }

// ❌ CORRUPTED - Truncated content  
return (
  <Button onClick={handleCli  // Incomplete
```

### File Bloat Patterns
```
❌ File grew from 300 → 1275 lines
❌ Duplicate sections appended
❌ Multiple exports in same file
❌ Entire components duplicated
```

---

## INTERVENTION DECISION TREE

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
│   ├─ Identify corruption cause
│   └─ Restart with clearer prompt
└─ NO → Continue

Preview broken?
├─ YES → EMERGENCY
│   ├─ Stop ALL agents
│   ├─ Git stash changes
│   ├─ Fix manually
│   └─ Document failure
└─ NO → Continue
```

---

## POST-AGENT VERIFICATION

### Individual Agent Completion
```bash
# Run after EACH agent completes
echo "=== AGENT VERIFICATION ==="

# 1. Expected files modified?
git diff --name-only

# 2. Changes are correct?
git diff [expected-file]

# 3. No corruption?
npm run build

# 4. Functionality works?
[test specific feature]

echo "=== RESULT: PASS/FAIL ==="
```

### Wave Completion Checks
```bash
# After each wave of agents
✅ All agents reported complete
✅ All changes verified in git
✅ Build succeeds
✅ Preview functional
✅ No files > 300 lines
✅ change_log.md updated
```

---

## FINAL SESSION VERIFICATION

### Comprehensive Checklist
```
INFRASTRUCTURE
□ Build passes
□ Preview works
□ Tests pass
□ No console errors

CODE QUALITY
□ No syntax errors
□ No corrupted files
□ All files < 300 lines
□ Clean exports

FUNCTIONALITY  
□ All features work
□ No regressions
□ Performance maintained
□ Accessibility preserved

DOCUMENTATION
□ change_log.md complete
□ Session report written
□ Issues documented
□ Improvements noted

SUCCESS CRITERIA
✅ > 90% tasks completed
✅ 0 corrupted files
✅ 0 broken features
✅ 100% verified changes
```

---

## VERIFICATION COMMANDS REFERENCE

### Quick Health Check
```bash
# One command to check everything
npm run build && \
git status --short && \
find client/src -name "*.tsx" | xargs wc -l | sort -rn | head -5 && \
curl -s http://localhost:5000 > /dev/null && \
echo "✅ ALL SYSTEMS GO" || echo "❌ ISSUES DETECTED"
```

### Corruption Scanner
```bash
# Detect all corruption patterns
grep -r "const const" client/src && echo "❌ Duplicate const" || \
grep -r "^export.*\n.*[^}]$" client/src && echo "❌ Code after export" || \
echo "✅ No corruption detected"
```

### Progress Monitor
```bash
# Show real progress
watch -n 30 'echo "=== PROGRESS ===" && \
  git diff --stat && \
  echo "=== MODIFIED ===" && \
  git diff --name-only && \
  echo "=== STATUS ===" && \
  git status --short'
```

---

## METRICS TO TRACK

### Per Agent
- Time to first change
- Files modified
- Lines changed
- Corruption incidents
- Rollback needed?
- Verification passed?

### Per Session
- Total tasks completed
- Actual vs claimed changes
- Context window usage
- Parallel execution %
- Intervention count
- Session duration

---

This checklist ensures we catch issues IMMEDIATELY, not after 45 minutes of broken edits like Session 5.