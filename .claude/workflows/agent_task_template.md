# 📋 AGENT TASK ASSIGNMENT TEMPLATE
## Standardized Format for Delegating Tasks to Agents

**Version**: 1.0.0  
**Purpose**: Ensure consistent, clear, and verifiable task assignments  
**Critical**: Every task MUST include explicit tool requirements and verification steps

---

## 🎯 MASTER TASK TEMPLATE

```markdown
═══════════════════════════════════════════════════════════════
AGENT: [Agent Name]
MODEL: [opus/sonnet]
WAVE: [0-Research/1-Core/2-Quality/Continuous]
═══════════════════════════════════════════════════════════════

## TASK ID: [XX-###]
## PRIORITY: [CRITICAL/HIGH/MEDIUM/LOW]
## ESTIMATED TIME: [X-Y minutes]

### 📝 REQUIREMENT
[Clear, specific, measurable requirement. Be explicit about what needs to change.]

Example:
- ❌ BAD: "Update the homepage"
- ✅ GOOD: "Change the hero section button text from 'Watch Demo' to 'View Demos' and update the onClick handler to navigate to /demos"

### 📁 FILES TO MODIFY
```
File: [absolute path]
Lines: [specific line numbers if known]
Current: [what it looks like now]
Target: [what it should look like after]
```

### 🛠️ MANDATORY TOOLS
You MUST use these tools in this order:
1. ✅ Read - to understand current implementation
2. ✅ Edit or MultiEdit - for ALL code changes (NO exceptions)
3. ✅ Bash - run `git diff [file]` after EVERY change
4. ✅ Bash - run `npm run build` to verify no errors

### ❌ FORBIDDEN ACTIONS
- DO NOT use Context7 MCP (docs in /docs/session/)
- DO NOT write code without using Edit/MultiEdit
- DO NOT claim completion without git verification
- DO NOT create files > 300 lines
- DO NOT modify files outside the scope

### ✔️ VERIFICATION STEPS
```bash
# 1. Confirm file was modified
git diff --name-only | grep "[expected file]"

# 2. Show actual changes
git diff [specific file]

# 3. Verify no syntax errors
npm run build

# 4. Check file size
wc -l [file path]  # Must be < 300 lines
```

### 📊 SUCCESS CRITERIA
□ File modified with correct changes
□ Git diff shows expected modifications
□ No syntax errors introduced
□ Build passes successfully
□ File size < 300 lines
□ Preview still functional

### 🔄 ROLLBACK PLAN
If corruption detected:
```bash
git checkout -- [file path]
# Then retry with clearer instructions
```

### 📝 COMPLETION REPORT
When done, provide:
1. Files modified (with line counts)
2. Git diff summary
3. Build status
4. Any issues encountered

═══════════════════════════════════════════════════════════════
```

---

## 🎨 AGENT-SPECIFIC TEMPLATES

### Frontend Architect Task
```markdown
AGENT: frontend-architect
MODEL: opus
WAVE: 1-Core
═══════════════════════════════════════════════════════════════

## TASK ID: FE-001
## PRIORITY: HIGH
## ESTIMATED TIME: 5-10 minutes

### 📝 REQUIREMENT
Update the navigation bar gradient transition to be smoother (from 200ms to 300ms) and add hover effect on menu items.

### 📁 FILES TO MODIFY
```
File: /client/src/components/layout/navigation.tsx
Lines: 45-67 (CSS classes), 123-145 (hover handlers)
Current: transition-all duration-200
Target: transition-all duration-300 hover:scale-105
```

### 🛠️ MANDATORY TOOLS
1. ✅ Read - navigation.tsx to understand structure
2. ✅ Grep - search for "transition" classes
3. ✅ MultiEdit - update multiple transition values
4. ✅ Bash - `git diff navigation.tsx`
5. ✅ Bash - `npm run dev` to test visually

### SPECIAL NOTES
- Use Playwright MCP for visual testing if needed
- Reference /docs/session/frontend/tailwind-transitions.md
- Ensure accessibility (WCAG 2.1 AA compliance)
```

### Backend Architect Task
```markdown
AGENT: backend-architect  
MODEL: opus
WAVE: 1-Core
═══════════════════════════════════════════════════════════════

## TASK ID: BE-001
## PRIORITY: CRITICAL
## ESTIMATED TIME: 10-15 minutes

### 📝 REQUIREMENT
Create new API endpoint POST /api/contact with rate limiting (5 requests/minute) and Zod validation for email, name, message fields.

### 📁 FILES TO MODIFY
```
File: /server/routes.ts
Lines: Add after line 234
New endpoint with validation

File: /server/middleware/rateLimiter.ts  
Lines: Add new rate limit rule
```

### 🛠️ MANDATORY TOOLS
1. ✅ Read - routes.ts to find insertion point
2. ✅ Edit - add new endpoint
3. ✅ Edit - add rate limiting rule
4. ✅ Bash - `git diff server/`
5. ✅ Bash - test endpoint with curl

### VALIDATION SCHEMA
```typescript
const contactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  message: z.string().min(10).max(1000)
});
```
```

### Database Specialist Task
```markdown
AGENT: database-specialist
MODEL: sonnet
WAVE: 1-Core
═══════════════════════════════════════════════════════════════

## TASK ID: DB-001
## PRIORITY: HIGH
## ESTIMATED TIME: 5-8 minutes

### 📝 REQUIREMENT
Add new 'contactSubmissions' table with fields: id, email, name, message, createdAt, status

### 📁 FILES TO MODIFY
```
File: /shared/schema.ts
Lines: Add after line 156
New table definition using Drizzle ORM
```

### 🛠️ MANDATORY TOOLS
1. ✅ Read - schema.ts for syntax patterns
2. ✅ Edit - add new table definition
3. ✅ Bash - `npm run db:push`
4. ✅ Bash - verify with `git diff schema.ts`

### SCHEMA DEFINITION
```typescript
export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow()
});
```
```

---

## 🔄 PARALLEL TASK BATCH TEMPLATE

For deploying multiple agents simultaneously:

```javascript
const parallelBatch = {
  wave: 1,
  agents: [
    {
      name: 'frontend-architect',
      taskIds: ['FE-001', 'FE-002', 'FE-003'],
      priority: 'high',
      dependencies: []
    },
    {
      name: 'backend-architect',
      taskIds: ['BE-001', 'BE-002'],
      priority: 'high',
      dependencies: []
    },
    {
      name: 'database-specialist',
      taskIds: ['DB-001'],
      priority: 'medium',
      dependencies: []
    }
  ],
  monitoring: {
    checkInterval: 30000, // 30 seconds
    interventionThreshold: 120000, // 2 minutes
    completionTimeout: 1200000 // 20 minutes
  }
};

// Deploy with Promise.all
await Promise.all(parallelBatch.agents.map(agent => 
  deployAgentWithTasks(agent)
));
```

---

## 📊 TASK TRACKING MATRIX

Use this format to track progress:

```markdown
| Task ID | Agent | Status | Started | Modified | Verified | Issues |
|---------|-------|--------|---------|----------|----------|---------|
| FE-001 | Frontend | 🟡 In Progress | 10:00 | 2 files | ⏳ | None |
| BE-001 | Backend | ✅ Complete | 10:01 | 1 file | ✅ | None |
| DB-001 | Database | 🔴 Blocked | 10:02 | 0 files | ❌ | Schema conflict |
| FE-002 | Frontend | ⏸️ Pending | - | - | - | - |

Legend:
- ⏸️ Pending (not started)
- 🟡 In Progress (actively working)
- ✅ Complete (verified)
- 🔴 Blocked (needs intervention)
- ❌ Failed (requires rollback)
```

---

## 🚨 INTERVENTION TRIGGERS

When to intervene with specific instructions:

```markdown
## INTERVENTION NEEDED: [Agent Name]

### Issue Detected
- [ ] No changes in 2 minutes
- [ ] Incorrect tool usage
- [ ] File corruption detected
- [ ] Agent confused/stuck

### Intervention Action
```
ATTENTION [Agent Name]:

You must NOW use the Edit tool to modify [specific file].
The exact change needed is:
- Line [X]: Change "[old text]" to "[new text]"

Run these commands immediately:
1. Edit [file] 
2. git diff [file]
3. npm run build

Do this NOW, not later.
```

### Expected Response
Agent should acknowledge and execute within 30 seconds.
If no response, consider agent restart.
```

---

## 📝 COMPLETION VERIFICATION TEMPLATE

```markdown
## TASK COMPLETION VERIFICATION

### Task ID: [XX-###]
### Agent: [Name]

### Checklist
- [x] Git diff shows expected changes
- [x] File sizes within limits
- [x] Build passes
- [x] No corruption patterns
- [x] Preview functional
- [x] Tests pass (if applicable)

### Evidence
```bash
$ git diff --stat
client/src/pages/home.tsx | 12 ++++++------
1 file changed, 6 insertions(+), 6 deletions(-)

$ npm run build
✓ 247 modules transformed.
Build successful!

$ wc -l client/src/pages/home.tsx
285 client/src/pages/home.tsx
```

### Status: ✅ VERIFIED COMPLETE
```

---

## 🎯 BEST PRACTICES

1. **Be Explicit**: Never assume the agent knows file paths or line numbers
2. **Provide Context**: Include current vs target state
3. **Enforce Tools**: Always specify Edit/MultiEdit requirement
4. **Verify Everything**: Never trust without git diff
5. **Set Boundaries**: Clear scope prevents scope creep
6. **Plan Rollback**: Always have recovery strategy
7. **Track Progress**: Update status in real-time
8. **Document Issues**: Record problems for improvement

---

## 🔧 QUICK REFERENCE

### Task Priority Levels
- **CRITICAL**: Blocking other work, must complete immediately
- **HIGH**: Important feature/fix, complete in current wave
- **MEDIUM**: Should complete in session
- **LOW**: Nice to have, if time permits

### Wave Assignments
- **Wave 0**: Research agents (documentation gathering)
- **Wave 1**: Core development (independent tasks)
- **Wave 2**: Quality/polish (dependent on Wave 1)
- **Continuous**: Monitoring agents (throughout session)

### Tool Requirements by Agent Type
- **Execution Agents**: MUST have Edit/MultiEdit
- **Research Agents**: Read, WebFetch, Context7
- **Monitoring Agents**: Bash, Grep, Read
- **Support Agents**: Full toolset

---

**Remember**: Clear task assignment is the difference between Session 5's failure and Session 8's success!