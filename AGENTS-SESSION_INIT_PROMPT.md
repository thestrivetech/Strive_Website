# Session Initialization Prompt for Strive Tech Development

Copy and paste this prompt at the start of each new Claude Code session:

---

## 🚀 INITIALIZE STRIVE TECH AGENT WORKFLOW

Please perform the following initialization sequence:

### 1. Load Project Context
- Read `/Users/grant/Documents/GitHub/Strive_Website/CLAUDE.md` for project specifications
- Read `/Users/grant/Documents/GitHub/Strive_Website/AGENTS_HANDBOOK.md` for agent capabilities
- Acknowledge the 40 specialized agents available for this project

### 2. Current Chat Log & Task List
/Users/grant/Documents/GitHub/Strive_Website/chat_logs/session2.md

### 3. Create Action Plan
Based on the chat log/task list above, please:
1. **Create a TodoWrite list** organizing all pending tasks by priority
2. **Assign optimal agents** to each task using the AGENTS_HANDBOOK mappings
3. **Identify task dependencies** and create an execution sequence
4. **PARALLEL EXECUTION**: Use `+` operator for simultaneous agent execution
5. **Group independent tasks** as `(agent1 + agent2 + agent3)` for parallel processing

### 4. Agent Assignment Strategy
For each task, select agents using this hierarchy:
- **Primary Agent**: The specialist best suited for the core task
- **Supporting Agents**: Additional specialists for comprehensive coverage
- **Quality Agents**: `code-reviewer`, `test-automator` for validation
- **Fallback Agent**: `search-specialist` for troubleshooting if needed

### 5. Execution Plan Format
Present your plan as:
```
📋 TODO LIST:
1. [Task description]
   → Lead: [primary-agent]
   → Support: [supporting-agents]
   → Command: [specific command or workflow]

2. [Next task]
   → Lead: [primary-agent]
   → Support: [supporting-agents]
   → Command: [specific command or workflow]

🔄 PARALLEL EXECUTION GROUPS:
- Group A: (task1 + task2 + task3) - Run simultaneously
- Group B: (task4 + task5) - Next parallel batch after Group A
- Use `+` for parallel: `agent1 + agent2`
- Use `&&` for sequential: `agent1 && agent2`

🎯 CRITICAL PATH:
[Tasks that must be completed sequentially]
```

### 6. Optimization Reminders
- **Mobile-First**: Always include `mobile-developer` for UI tasks
- **Security**: Include `mobile-security-coder` for any user-facing features
- **Performance**: Run `performance-engineer` after major changes
- **Next.js Ready**: Consider migration implications for all new features

### 7. Begin Execution
After presenting the plan, immediately begin with the highest priority task unless I specify otherwise. Use the custom slash commands from AGENTS_HANDBOOK when applicable:
- `/strive-component` for full-stack features
- `/strive-optimize` for performance improvements
- `/strive-security` for security audits
- `/strive-dashboard` for dashboard features
- `/strive-nextjs` for migration tasks

**Current Project Phase**: [Preparing for Next.js migration, building dashboards]
**Key Focus Areas**: Mobile responsiveness, PWA features, TypeScript strict mode, Vercel deployment

---

## 📝 QUICK REFERENCE FOR TASK ASSIGNMENT

**Frontend Tasks** → `frontend-developer` + `mobile-developer` + `typescript-pro`
**Backend Tasks** → `backend-architect` + `database-optimizer` + `sql-pro`
**Security Tasks** → `security-auditor` + `mobile-security-coder` + `backend-security-coder`
**Performance Tasks** → `performance-engineer` + `mobile-developer` + `database-optimizer`
**Documentation Tasks** → `api-documenter` + `docs-architect` + `tutorial-engineer`
**Troubleshooting** → `debugger` + `error-detective` + `search-specialist`
**AI Features** → `ai-engineer` + `prompt-engineer` + `ml-engineer`

---

Now, please proceed with the initialization and create the action plan based on the provided context.