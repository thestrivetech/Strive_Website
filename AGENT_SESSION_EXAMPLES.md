# Agent Session Examples

Real-world examples of how to use the session initialization prompts:

---

## Example 1: Feature Development Session

```markdown
## 🚀 INITIALIZE STRIVE TECH AGENT WORKFLOW

Please perform the following initialization sequence:

### 1. Load Project Context
- Read CLAUDE.md for project specifications
- Read AGENTS_HANDBOOK.md for agent capabilities

### 2. Review Previous Session
From our last session, we need to:
- Complete the user authentication system with JWT tokens
- Add forgot password functionality
- Implement 2FA for admin accounts
- Create unit tests for auth endpoints
- Optimize the login page for mobile devices

### 3. Create Action Plan
[Claude will generate TodoWrite list and agent assignments]
```

**Expected Claude Response:**
```markdown
📋 TODO LIST:
1. Complete JWT authentication system
   → Lead: backend-security-coder
   → Support: backend-architect, typescript-pro
   → Command: Task backend-security-coder "Implement JWT with refresh tokens"

2. Add forgot password functionality
   → Lead: backend-security-coder
   → Support: frontend-developer, mobile-developer
   → Command: /strive-component "password reset flow with email verification"

3. Implement 2FA for admin accounts
   → Lead: backend-security-coder
   → Support: frontend-developer, ui-ux-designer
   → Command: Task backend-security-coder "Add TOTP-based 2FA for admin users"

4. Create unit tests for auth endpoints
   → Lead: test-automator
   → Support: debugger, code-reviewer
   → Command: /strive-test "authentication endpoints with edge cases"

5. Optimize login page for mobile
   → Lead: mobile-developer
   → Support: frontend-developer, performance-engineer
   → Command: Task mobile-developer "Optimize login form for mobile with touch ID support"

🔄 PARALLEL EXECUTION GROUPS:
- Group A: (Task 1 + Task 5) - Backend auth and mobile optimization run in parallel
- Group B: (Task 2 + Task 3) - Password reset and 2FA run in parallel after JWT
- Group C: Task 4 - Testing after all features complete

Parallel command example:
(Task backend-security-coder "JWT auth" + Task mobile-developer "Optimize login")

Starting with parallel Group A: JWT auth + mobile optimization...
Executing: (Task backend-security-coder "JWT" + Task mobile-developer "Mobile login")
```

---

## Example 2: Bug Fix and Optimization Session

```markdown
⚡ QUICK START: STRIVE TECH AGENT TEAM

1. Read project docs: CLAUDE.md and AGENTS_HANDBOOK.md
2. Review this chat log/task list:
   - Dashboard is loading slowly on mobile (3+ seconds)
   - TypeScript errors in server/routes/analytics.ts
   - Contact form not sending emails in production
   - SEO meta tags missing on service pages
   - Database queries timing out on analytics endpoint

3. Create TodoWrite list with agent assignments
4. Start with the highest priority task
```

**Expected Claude Response:**
```markdown
📋 TODO LIST (by priority):

🔴 CRITICAL - Fix production issues (PARALLEL):
Group 1: (Contact form + Database timeouts)
1. Contact form email failure
   → Lead: debugger
   → Support: backend-architect, error-detective
   → Command: Task debugger "Fix email service in production environment"

2. Database query timeouts
   → Lead: database-optimizer
   → Support: sql-pro, performance-engineer
   → Command: Task database-optimizer "Optimize analytics queries with proper indexing"

Parallel execution: (Task debugger "Fix email" + Task database-optimizer "Fix timeouts")

🟡 IMPORTANT - Fix errors and performance:
3. TypeScript errors in analytics
   → Lead: typescript-pro
   → Support: debugger
   → Command: Task typescript-pro "Fix type errors in server/routes/analytics.ts"

4. Dashboard mobile performance
   → Lead: mobile-developer
   → Support: performance-engineer, frontend-developer
   → Command: /strive-optimize "dashboard mobile load time under 1.5s"

🟢 NICE-TO-HAVE - SEO improvements:
5. Add SEO meta tags
   → Lead: seo-meta-optimizer
   → Support: frontend-developer
   → Command: Task seo-meta-optimizer "Add meta tags to all service pages"

Starting with Critical Task 1: Debugging contact form emails...
```

---

## Example 3: Next.js Migration Planning

```markdown
Read CLAUDE.md and AGENTS_HANDBOOK.md, then create a TodoWrite list from this chat log:
"We need to start migrating from Vite to Next.js 15. Begin with the marketing pages (home, about, services) and set up the initial Next.js project structure. Ensure all components remain mobile-optimized during migration."

Assign optimal agents from the 40 available and begin executing using appropriate slash commands.
```

**Expected Claude Response:**
```markdown
📋 NEXT.JS MIGRATION TODO LIST:

1. Analyze current Vite architecture
   → Lead: architect-review
   → Support: frontend-developer
   → Command: Task architect-review "Analyze Vite structure for Next.js migration"

2. Setup Next.js 15 project
   → Lead: frontend-developer
   → Support: typescript-pro, deployment-engineer
   → Command: /strive-nextjs "initialize Next.js 15 with TypeScript"

3. Migrate home page
   → Lead: frontend-developer
   → Support: mobile-developer, ui-visual-validator
   → Command: /strive-nextjs "migrate home page with mobile optimization"

4. Migrate about page
   → Lead: frontend-developer
   → Support: mobile-developer
   → Command: /strive-nextjs "migrate about page"

5. Migrate services page
   → Lead: frontend-developer
   → Support: mobile-developer, seo-meta-optimizer
   → Command: /strive-nextjs "migrate services page with SEO preservation"

6. Validate mobile responsiveness
   → Lead: mobile-developer
   → Support: ui-visual-validator, performance-engineer
   → Command: Task mobile-developer "Validate all migrated pages on mobile devices"

Beginning Task 1: Architecture analysis...
Next: Tasks 3-5 can run in PARALLEL after Task 2 completes:
(Task frontend-developer "Home" + Task frontend-developer "About" + Task frontend-developer "Services")
```

---

## Example 4: Complex Multi-Feature Session

```markdown
## ONE-LINER VERSION

Read CLAUDE.md and AGENTS_HANDBOOK.md, then create a TodoWrite list from this: "Add Stripe payments, implement admin analytics dashboard with real-time updates, add PWA offline support, fix all security vulnerabilities found in last audit", assigning optimal agents and begin with the highest priority task using slash commands.
```

---

## Tips for Effective Session Initialization

1. **Be Specific**: Include task details, not just high-level descriptions
2. **Mention Constraints**: Include deadlines, performance targets, or specific requirements
3. **Previous Context**: Reference what was completed in the last session
4. **Priority Indicators**: Use 🔴🟡🟢 or HIGH/MEDIUM/LOW to indicate urgency
5. **Batch Related Tasks**: Group similar tasks together for efficient agent assignment
6. **PARALLEL EXECUTION**: Always identify which tasks can run simultaneously:
   - Independent tasks: `(agent1 + agent2 + agent3)`
   - Sequential tasks: `agent1 && agent2 && agent3`
   - Mixed: `agent1 && (agent2 + agent3) && agent4`

---

## Session State Persistence

At the end of each session, ask Claude to:
```markdown
Please summarize the current session state:
1. What was completed ✅
2. What's in progress 🔄
3. What's pending 📋
4. Any blockers or issues discovered 🚨

Format this as a chat log I can paste into the next session.
```

This ensures seamless continuation across sessions.