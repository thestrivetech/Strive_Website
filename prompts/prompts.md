# Session Management Prompts

**Purpose:** Standardized prompts for consistent development sessions
**Version:** 1.0.0
**Last Updated:** January 2025

---

## 🚀 Session Start Prompt

Use this prompt at the beginning of each development session:

```markdown


I'm starting a new development session for the Strive Tech SaaS Platform. Please help me continue building this production-ready enterprise B2B platform.

**First, load the project context:**
1. Read and internalize `CLAUDE.md` - This contains critical development rules, tech stack (Next.js 15.5.4, React 19.1.0, TypeScript 5.6+, Prisma 6.16.2), and production standards
2. Review `README.md` for comprehensive project documentation
3. Check `APP_BUILD_PLAN.md` for the overall roadmap

**Next, identify the current session:**
1. Check the `chat-logs/` directory to find the current session number
2. Read the current session's task list (e.g., `chat-logs/Session3.md`)
3. Use TodoWrite tool to track today's tasks from the session file

**Development priorities for this session:**
1. Focus on completing Phase [2] tasks marked as incomplete
2. Follow the production standards from CLAUDE.md strictly:
   - Server Components by default (80% of components)
   - File size limits: Components 200 lines, Services 300 lines
   - No cross-module imports
   - Zod validation on all inputs
   - Security-first approach (never trust user input)
3. After each feature implementation, run:
   ```bash
   npm run lint && npx tsc --noEmit && npm test
   ```

**Key reminders:**
- Working directory: `app/` (SaaS platform, NOT `old/` marketing site)
- Database: Prisma + Supabase (NOT Drizzle)
- Auth: Supabase Auth with JWT (NOT Passport)
- Performance: Keep bundle under 500KB, Core Web Vitals targets
- Multi-tenancy: Every query must filter by organization_id

**Make sure to** Create a in depth to-do list for all tasks to ensure successful implementation and updates
```

---

## 🏁 Session End Prompt

Use this prompt at the end of each development session:

```markdown


We're ending the current development session. Please help me document progress and prepare for the next session.

**Step 1 - Update Master Build Plan:**
1. Read `APP_BUILD_PLAN.md`
2. Update the "✅ Completed Tasks" section under the current phase
3. Mark completed items with checkboxes [x]
4. Add completion notes if needed
5. Update the "🚧 In Progress" section with current status

**Step 2 - Document Current Session:**
1. Review what was accomplished in this session
2. Update the current session's log file (`chat-logs/Session[X].md`) with:
   - ✅ Mark completed tasks with checkmarks
   - 📝 Add notes for partially completed tasks
   - ⚠️ Document any blockers or issues encountered
   - 💡 Include important decisions made
   - 🔗 Add references to files created/modified
   - Explain why you did things the way you did and how everything functions for future reference.

**Step 3 - Prepare Next Session:**
1. Review updated `APP_BUILD_PLAN.md` to identify next priorities
2. Create the next session's task list (`chat-logs/Session[X+1].md`) including:
   - Uncompleted tasks from current session (carry over)
   - Next phase tasks from APP_BUILD_PLAN.md
   - Priority order based on dependencies
   - Technical debt or fixes needed
   - Testing requirements
   - Reference specific phase and week from the build plan

**Session summary format:**
```markdown
## Session [X] Summary
**Date:** [Date]
**Duration:** [Approximate hours]
**Phase Progress:** Phase [X] - [Phase Name] ([X]% complete)

### ✅ Completed
- [List completed tasks with file references]
- [Reference to APP_BUILD_PLAN.md line items]

### 🚧 In Progress
- [List partially completed tasks with % complete]
- [Current phase status from build plan]

### ❌ Blocked/Deferred
- [List blocked items with reasons]

### 📝 Key Decisions
- [Important architectural or technical decisions]

### 📁 Files Modified
- [List of files created/modified with paths]

### 🐛 Known Issues
- [Any bugs or issues to address]

### 💭 Notes for Next Session
- [Important context or reminders]
- [Next phase/milestone from build plan]
```

**Quality checklist before ending:** - Unless already performed
- [ ] APP_BUILD_PLAN.md updated with progress
- [ ] All code committed to git (if requested)
- [ ] TypeScript has zero errors (`npx tsc --noEmit`)
- [ ] ESLint passing (`npm run lint`)
- [ ] Tests passing (`npm test`)
- [ ] Documentation updated
- [ ] Environment variables documented
- [ ] No console.logs left in code
- [ ] No exposed secrets or keys

Please update the build plan, create the session summary, and prepare next session's task list.
```

---

## 📋 Usage Guidelines

### When to Use Session Start Prompt
- Beginning of each development session
- After a break or context switch
- When resuming work after deployment
- When onboarding new team members

### When to Use Session End Prompt
- End of workday/session
- Before switching to different project
- After completing major milestone
- Before deployment or release

### Best Practices
1. **Always start with context loading** - CLAUDE.md is the source of truth
2. **Track tasks religiously** - Use TodoWrite tool throughout session
3. **Run quality checks frequently** - Don't wait until session end
4. **Document decisions** - Future you will thank you
5. **Update task lists immediately** - Don't let them get stale

### Session Numbering Convention
- Session1.md - Initial setup and architecture
- Session2.md - Foundation (database, auth, layout)
- Session3.md - Core features (CRM, projects)
- Session[N].md - Incremental progress

### File References Quick Links
- **Rules & Standards:** `CLAUDE.md`
- **Full Documentation:** `README.md`
- **Implementation Plan:** `APP_BUILD_PLAN.md`
- **Feature Matrix:** `feature-&-tool-marketplace.md`
- **Session Logs:** `chat-logs/Session*.md`

---

## 🔧 Customization

### For Specific Features
Add feature context to session start:
```markdown
**Today's focus: [Feature Name]**
- Review design in `docs/[feature].md`
- Check Figma/mockups at [URL]
- API specifications in `api/[feature]/README.md`
```

### For Bug Fixes
Add debugging context:
```markdown
**Priority: Fix [Issue #]**
- Error details: [Error message]
- Reproduction steps in `bugs/[issue].md`
- Related files: [List files]
```

### For Performance Optimization
Add metrics context:
```markdown
**Performance targets:**
- Current: [Current metrics]
- Target: [Target metrics]
- Focus areas: [Specific optimizations]
```

---

## 🎯 Expected Outcomes

### After Session Start
- Claude understands project context
- Current tasks are loaded and tracked
- Development environment is verified
- Ready to write production code

### After Session End
- Progress is documented
- Next session is planned
- Code quality is verified
- Knowledge is transferred

---

**Remember:** These prompts ensure consistency, quality, and continuity across all development sessions. Treat them as your development ritual for maintaining high standards in this production system.