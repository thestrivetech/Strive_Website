# Strive Tech AI Consulting Platform - Claude Code Best Practices

This guide provides best practices for using Claude Code with the Strive Tech AI consulting platform, featuring React 18, Express, Neon PostgreSQL, and the 7-agent development system.

# 1. Customize your setup for AI Consulting Platform

## a. Create CLAUDE.md files for Strive Tech Context
CLAUDE.md is essential for documenting AI consulting platform specifics:

**Tech Stack Commands & Guidelines**
**Database Evolution Strategy** (Neon → Supabase migration planning)
**8-Agent Development Workflow** integration points
**AI Service Integration** patterns (DocuMaster AI, client portal)
**Business Context** for consulting workflows and client management

Example Strive Tech CLAUDE.md structure:

```markdown
# Strive Tech AI Consulting Platform Commands
- npm run dev: Start development server (Vite + React 18)
- npm run build: Build for production with Vite
- npm run typecheck: TypeScript validation
- npm run db:generate: Generate Drizzle schemas
- npm run db:migrate: Run database migrations (Neon PostgreSQL)
- npm run test: Run Jest + Playwright test suites

# Tech Stack Guidelines
- React 18.3.1 with TypeScript 5.6.3 
- Wouter 3.3.5 for routing (NOT React Router)
- TanStack Query 5.60.5 for server state management
- Tailwind CSS 3.4.17 + shadcn/ui components
- Drizzle ORM with Neon PostgreSQL (current) → Supabase (future)

# Business Context
- AI consulting platform for enterprise and SMB clients
- DocuMaster AI: Document generation workflows
- Client portal: Secure client interaction and project management
- Performance: Core Web Vitals compliance, WCAG 2.1 AA accessibility

# Agent Workflow Integration
- Document architectural decisions for session continuity
- Coordinate with Database Specialist for schema changes
- Follow quality gates before production deployments
```
You can place CLAUDE.md files in several locations:

The root of your repo, or wherever you run claude from (the most common usage). Name it CLAUDE.md and check it into git so that you can share it across sessions and with your team (recommended), or name it CLAUDE.local.md and .gitignore it
Any parent of the directory where you run claude. This is most useful for monorepos, where you might run claude from root/foo, and have CLAUDE.md files in both root/CLAUDE.md and root/foo/CLAUDE.md. Both of these will be pulled into context automatically
Any child of the directory where you run claude. This is the inverse of the above, and in this case, Claude will pull in CLAUDE.md files on demand when you work with files in child directories
Your home folder (~/.claude/CLAUDE.md), which applies it to all your claude sessions
When you run the /init command, Claude will automatically generate a CLAUDE.md for you.

## b. Tune your CLAUDE.md files for AI Consulting Context
Your CLAUDE.md files become critical for maintaining the 7-agent development workflow and business context. Focus on:

**Agent Coordination**: Document inter-agent communication patterns and handoff procedures
**Database Evolution**: Keep current Neon PostgreSQL patterns and future Supabase migration plans
**AI Service Integration**: Document DocuMaster AI workflows and client portal patterns
**Performance Standards**: Core Web Vitals compliance and WCAG 2.1 AA accessibility requirements

Example AI consulting platform optimizations:

```markdown
# IMPORTANT: Database Strategy
- Current: Neon PostgreSQL + Drizzle ORM (production)  
- Future: Supabase migration for real-time features
- YOU MUST coordinate schema changes with Database Specialist agent

# CRITICAL: AI Service Patterns
- DocuMaster AI uses TanStack Query for document generation state
- Client portal requires WCAG 2.1 AA compliance for all components
- YOU MUST follow shadcn/ui component patterns for consistency

# Business Performance Requirements
- Page load times: <2.5s Core Web Vitals compliance
- Consultation booking conversion: >15% target
- Client satisfaction: >85% retention requirement
```

### Claude Code tool allowlist
## c. Curate Claude's list of allowed tools
By default, Claude Code requests permission for any action that might modify your system: file writes, many bash commands, MCP tools, etc. We designed Claude Code with this deliberately conservative approach to prioritize safety. You can customize the allowlist to permit additional tools that you know are safe, or to allow potentially unsafe tools that are easy to undo (e.g., file editing, git commit).

There are four ways to manage allowed tools:

Select "Always allow" when prompted during a session.
Use the /permissions command after starting Claude Code to add or remove tools from the allowlist. For example, you can add Edit to always allow file edits, Bash(git commit:*) to allow git commits, or mcp__puppeteer__puppeteer_navigate to allow navigating with the Puppeteer MCP server.
Manually edit your .claude/settings.json or ~/.claude.json (we recommend checking the former into source control to share with your team).
Use the --allowedTools CLI flag for session-specific permissions.
## d. If using GitHub, install the gh CLI
Claude knows how to use the gh CLI to interact with GitHub for creating issues, opening pull requests, reading comments, and more. Without gh installed, Claude can still use the GitHub API or MCP server (if you have it installed).

# 2. Give Claude more tools
Claude has access to your shell environment, where you can build up sets of convenience scripts and functions for it just like you would for yourself. It can also leverage more complex tools through MCP and REST APIs.

## a. Use Claude with bash tools
Claude Code inherits your bash environment, giving it access to all your tools. While Claude knows common utilities like unix tools and gh, it won't know about your custom bash tools without instructions:

Tell Claude the tool name with usage examples
Tell Claude to run --help to see tool documentation
Document frequently used tools in CLAUDE.md
## b. Use Claude with MCP
Claude Code functions as both an MCP server and client. As a client, it can connect to any number of MCP servers to access their tools in three ways:

In project config (available when running Claude Code in that directory)
In global config (available in all projects)
In a checked-in .mcp.json file (available to anyone working in your codebase). For example, you can add Puppeteer and Sentry servers to your .mcp.json, so that every engineer working on your repo can use these out of the box.
When working with MCP, it can also be helpful to launch Claude with the --mcp-debug flag to help identify configuration issues.

## c. Use custom slash commands for AI Consulting Workflows
Store AI consulting platform workflow templates in `.claude/commands` for repeated patterns:

**Database migration workflows** (Neon → Supabase planning)
**AI service integration** debugging and optimization  
**Client portal feature** development with WCAG compliance
**DocuMaster AI** workflow enhancements and testing

Example Strive Tech slash commands:

**.claude/commands/add-ai-service.md**:
```markdown
Please implement a new AI service integration: $ARGUMENTS.

Follow the Strive Tech AI consulting platform patterns:

1. Coordinate with Database Specialist agent for schema requirements
2. Use TanStack Query for server state management
3. Implement with shadcn/ui components for consistency
4. Ensure WCAG 2.1 AA accessibility compliance
5. Add comprehensive TypeScript types
6. Write Playwright e2e tests for user workflows
7. Document integration points for session continuity
8. Run performance validation against Core Web Vitals
9. Update Documentation Agent memory files

Tech Stack Requirements:
- React 18.3.1 + TypeScript 5.6.3
- Wouter routing (NOT React Router)
- Current: Neon PostgreSQL + Drizzle ORM
- Follow existing DocuMaster AI patterns for consistency
```

**.claude/commands/client-portal-feature.md**:
```markdown
Implement client portal feature: $ARGUMENTS.

Follow Strive Tech client portal patterns:

1. Review existing client portal architecture in `/StriveSite/src/components/Portal`
2. Use shadcn/ui components for consistent business-grade UI
3. Implement proper authentication with current Passport.js patterns
4. Ensure WCAG 2.1 AA compliance (mandatory for enterprise clients)
5. Add proper TypeScript interfaces for client data
6. Coordinate with Database Specialist for client data schema
7. Write comprehensive tests (Jest unit + Playwright e2e)
8. Validate against business performance requirements
9. Document for session continuity and agent handoffs
```

# 3. Try common workflows
Claude Code doesn’t impose a specific workflow, giving you the flexibility to use it how you want. Within the space this flexibility affords, several successful patterns for effectively using Claude Code have emerged across our community of users:

## a. Explore, plan, code, commit - AI Consulting Platform Workflow
This workflow is essential for AI service integration and client portal features:

**Explore with Business Context**: Ask Claude to analyze existing AI consulting patterns before coding:
- "Read the DocuMaster AI integration files in `/StriveSite/src/services/documentai` but don't write code yet"
- "Analyze the client portal authentication patterns in `/StriveSite/src/components/Portal/auth` for context"
- "Review the database schema for client data models in `/database/schema` to understand relationships"

**Plan with Agent Coordination**: Use extended thinking for complex AI consulting workflows:
- "Think hard about implementing a new consultation booking system that integrates with existing client portal patterns"
- "Think harder about the database evolution strategy - how should this feature work with both current Neon PostgreSQL and future Supabase migration"
- "Ultrathink the performance implications for enterprise clients requiring <2.5s page loads"

**Implementation with Quality Gates**: Follow Strive Tech development standards:
```markdown
Please implement the planned consultation booking feature:

1. Coordinate with Database Specialist patterns for schema updates
2. Use TanStack Query for server state management 
3. Implement shadcn/ui components for business-grade UI consistency
4. Ensure WCAG 2.1 AA compliance for enterprise accessibility requirements
5. Add comprehensive TypeScript types for client consultation data
6. Write Playwright e2e tests covering the full booking workflow
7. Validate Core Web Vitals performance benchmarks
8. Document integration points for session continuity
```

**Commit with Business Impact**: Document business value and agent coordination:
- Include performance metrics vs. business requirements (>15% consultation conversion)
- Note any database evolution considerations for future Supabase migration
- Update Documentation Agent memory files for session continuity

## b. Write tests, commit; code, iterate, commit - AI Service TDD
Test-driven development is critical for AI consulting platform reliability and enterprise client confidence:

**Write AI Service Tests First**: Focus on business-critical workflows:
```javascript
// Example: DocuMaster AI document generation tests
describe('DocuMaster AI Document Generation', () => {
  test('should generate consultation report with client data', async () => {
    const clientData = { companyName: 'Enterprise Corp', consultationType: 'AI Strategy' }
    const result = await generateConsultationReport(clientData)
    
    expect(result.document).toContain('Enterprise Corp')
    expect(result.sections).toInclude('AI Strategy Recommendations')
    expect(result.performance.generationTime).toBeLessThan(3000) // Business requirement
  })
})
```

**Test Business Requirements**: Validate performance and accessibility standards:
```javascript  
// Core Web Vitals compliance for enterprise clients
test('consultation booking page loads within 2.5s', async () => {
  const startTime = performance.now()
  await renderConsultationBooking()
  const loadTime = performance.now() - startTime
  
  expect(loadTime).toBeLessThan(2500) // Business requirement: <2.5s
})

// WCAG 2.1 AA compliance tests
test('client portal navigation is keyboard accessible', async () => {
  const { container } = renderClientPortal()
  const focusableElements = container.querySelectorAll('[tabindex="0"]')
  expect(focusableElements.length).toBeGreaterThan(0)
})
```

**Database Evolution Testing**: Ensure compatibility with current Neon and future Supabase:
```typescript
// Test data layer abstraction for database evolution
describe('Client Data Service', () => {
  test('should work with current Neon PostgreSQL patterns', async () => {
    // Test current Drizzle ORM implementation
  })
  
  test('should be compatible with planned Supabase migration', async () => {
    // Test interface compatibility for future migration
  })
})
```

**TDD Implementation Cycle**: 
1. Write failing tests that validate business requirements (consultation booking conversion >15%)
2. Run tests to confirm they fail (don't implement AI service logic yet)
3. Commit comprehensive test suite covering enterprise client workflows
4. Implement code using TanStack Query + shadcn/ui patterns until tests pass
5. Use independent agents to verify implementation meets WCAG 2.1 AA standards
6. Commit working implementation with performance metrics documentation

## c. Write code, screenshot result, iterate
Similar to the testing workflow, you can provide Claude with visual targets:

Give Claude a way to take browser screenshots (e.g., with the Puppeteer MCP server, an iOS simulator MCP server, or manually copy / paste screenshots into Claude).
Give Claude a visual mock by copying / pasting or drag-dropping an image, or giving Claude the image file path.
Ask Claude to implement the design in code, take screenshots of the result, and iterate until its result matches the mock.
Ask Claude to commit when you're satisfied.
Like humans, Claude's outputs tend to improve significantly with iteration. While the first version might be good, after 2-3 iterations it will typically look much better. Give Claude the tools to see its outputs for best results.

### Safe yolo mode
## d. Safe YOLO mode
Instead of supervising Claude, you can use claude --dangerously-skip-permissions to bypass all permission checks and let Claude work uninterrupted until completion. This works well for workflows like fixing lint errors or generating boilerplate code.

Letting Claude run arbitrary commands is risky and can result in data loss, system corruption, or even data exfiltration (e.g., via prompt injection attacks). To minimize these risks, use --dangerously-skip-permissions in a container without internet access. You can follow this reference implementation using Docker Dev Containers.

## e. Codebase Q&A - AI Consulting Platform Onboarding
Use Claude Code for learning the Strive Tech AI consulting platform architecture. Ask business-context questions like:

**AI Service Architecture**:
- "How does DocuMaster AI document generation work with the client portal?"
- "How do we implement new AI services that integrate with TanStack Query state management?"
- "What patterns do we use for WCAG 2.1 AA compliance in the client portal components?"

**Database Evolution Strategy**:
- "How does the current Neon PostgreSQL + Drizzle ORM setup work for client data?"
- "What's the migration strategy for moving from Neon to Supabase in the future?"
- "How do we handle real-time features in the current database setup vs. planned Supabase features?"

**Business Logic & Performance**:
- "How does the consultation booking conversion tracking work in `/StriveSite/src/analytics/`?"
- "What Core Web Vitals optimizations are implemented for enterprise client performance?"
- "How do we ensure <2.5s page loads for the client portal under high enterprise usage?"

**8-Agent Development Workflow**:
- "How does the Documentation Agent maintain session continuity between development sessions?"
- "What patterns does the Database Specialist agent use for schema coordination?"
- "How do we coordinate frontend changes with the Backend Specialist agent for AI service integration?"

**Technology Stack Questions**:
- "Why do we use Wouter routing instead of React Router for the client portal?"
- "How does shadcn/ui integration work with our business-grade enterprise client requirements?"
- "What's the authentication flow using Passport.js for enterprise client security?"

This AI consulting platform-specific onboarding significantly reduces ramp-up time for new agents and human developers working on enterprise client features.

### Use Claude to interact with git
## f. Use Claude to interact with git
Claude can effectively handle many git operations. Many Anthropic engineers use Claude for 90%+ of our git interactions:

Searching git history to answer questions like "What changes made it into v1.2.3?", "Who owns this particular feature?", or "Why was this API designed this way?" It helps to explicitly prompt Claude to look through git history to answer queries like these.
Writing commit messages. Claude will look at your changes and recent history automatically to compose a message taking all the relevant context into account
Handling complex git operations like reverting files, resolving rebase conflicts, and comparing and grafting patches
## g. Use Claude to interact with GitHub
Claude Code can manage many GitHub interactions:

Creating pull requests: Claude understands the shorthand "pr" and will generate appropriate commit messages based on the diff and surrounding context.
Implementing one-shot resolutions for simple code review comments: just tell it to fix comments on your PR (optionally, give it more specific instructions) and push back to the PR branch when it's done.
Fixing failing builds or linter warnings
Categorizing and triaging open issues by asking Claude to loop over open GitHub issues
This eliminates the need to remember gh command line syntax while automating routine tasks.

## h. Use Claude to work with Jupyter notebooks
Researchers and data scientists at Anthropic use Claude Code to read and write Jupyter notebooks. Claude can interpret outputs, including images, providing a fast way to explore and interact with data. There are no required prompts or workflows, but a workflow we recommend is to have Claude Code and a .ipynb file open side-by-side in VS Code.

You can also ask Claude to clean up or make aesthetic improvements to your Jupyter notebook before you show it to colleagues. Specifically telling it to make the notebook or its data visualizations “aesthetically pleasing” tends to help remind it that it’s optimizing for a human viewing experience.

# 4. Optimize your workflow
The suggestions below apply across all workflows:

## a. Be specific in your instructions - AI Consulting Platform Examples
Claude Code's success rate improves significantly with Strive Tech business context and specific technical requirements.

AI Consulting Platform Examples:

| Poor | Good |
|------|------|
| add tests for client portal | Write comprehensive Playwright e2e tests for the client consultation booking workflow in `/StriveSite/src/components/Portal/ConsultationBooking.tsx`. Test the complete flow from enterprise client login → service selection → calendar scheduling → confirmation email. Validate WCAG 2.1 AA accessibility and <2.5s page load performance. Use existing test patterns from `/tests/portal/` and ensure 15%+ conversion rate tracking. |
| why is the database slow? | Analyze the current Neon PostgreSQL + Drizzle ORM performance in `/database/queries/client-data.ts`. Review git history to understand query optimization decisions and identify bottlenecks affecting DocuMaster AI document generation. Consider implications for planned Supabase migration and recommend optimizations that work with both database systems. |
| add AI document generation | Study existing DocuMaster AI patterns in `/StriveSite/src/services/documentai/` to understand the current architecture. Implement a new consultation report generator that integrates with client portal data, uses TanStack Query for state management, follows shadcn/ui component patterns, and maintains enterprise-grade performance (<3s generation time). Coordinate with Database Specialist agent for client data schema requirements and ensure TypeScript type safety throughout. |

**Business Context Specificity**: Always include Strive Tech performance and accessibility requirements:
- **Performance**: Core Web Vitals compliance, <2.5s page loads, >15% consultation conversion
- **Accessibility**: WCAG 2.1 AA compliance for enterprise clients  
- **Database Strategy**: Current Neon PostgreSQL compatibility + future Supabase migration planning
- **Agent Coordination**: Document decisions for session continuity and inter-agent communication

### Give Claude images
## b. Give Claude images
Claude excels with images and diagrams through several methods:

Paste screenshots (pro tip: hit cmd+ctrl+shift+4 in macOS to screenshot to clipboard and ctrl+v to paste. Note that this is not cmd+v like you would usually use to paste on mac and does not work remotely.)
Drag and drop images directly into the prompt input
Provide file paths for images
This is particularly useful when working with design mocks as reference points for UI development, and visual charts for analysis and debugging. If you are not adding visuals to context, it can still be helpful to be clear with Claude about how important it is for the result to be visually appealing.

### Mention files you want Claude to look at or work on
## c. Mention files you want Claude to look at or work on
Use tab-completion to quickly reference files or folders anywhere in your repository, helping Claude find or update the right resources.

### Give Claude URLs
## d. Give Claude URLs
Paste specific URLs alongside your prompts for Claude to fetch and read. To avoid permission prompts for the same domains (e.g., docs.foo.com), use /permissions to add domains to your allowlist.

## e. Course correct early and often
While auto-accept mode (shift+tab to toggle) lets Claude work autonomously, you'll typically get better results by being an active collaborator and guiding Claude's approach. You can get the best results by thoroughly explaining the task to Claude at the beginning, but you can also course correct Claude at any time.

These four tools help with course correction:

Ask Claude to make a plan before coding. Explicitly tell it not to code until you’ve confirmed its plan looks good.
Press Escape to interrupt Claude during any phase (thinking, tool calls, file edits), preserving context so you can redirect or expand instructions.
Double-tap Escape to jump back in history, edit a previous prompt, and explore a different direction. You can edit the prompt and repeat until you get the result you're looking for.
Ask Claude to undo changes, often in conjunction with option #2 to take a different approach.
Though Claude Code occasionally solves problems perfectly on the first attempt, using these correction tools generally produces better solutions faster.

## f. Use /clear to keep context focused
During long sessions, Claude's context window can fill with irrelevant conversation, file contents, and commands. This can reduce performance and sometimes distract Claude. Use the /clear command frequently between tasks to reset the context window.

## g. Use checklists and scratchpads for complex workflows
For large tasks with multiple steps or requiring exhaustive solutions—like code migrations, fixing numerous lint errors, or running complex build scripts—improve performance by having Claude use a Markdown file (or even a GitHub issue!) as a checklist and working scratchpad:

For example, to fix a large number of lint issues, you can do the following:

Tell Claude to run the lint command and write all resulting errors (with filenames and line numbers) to a Markdown checklist
Instruct Claude to address each issue one by one, fixing and verifying before checking it off and moving to the next
## h. Pass data into Claude
Several methods exist for providing data to Claude:

Copy and paste directly into your prompt (most common approach)
Pipe into Claude Code (e.g., cat foo.txt | claude), particularly useful for logs, CSVs, and large data
Tell Claude to pull data via bash commands, MCP tools, or custom slash commands
Ask Claude to read files or fetch URLs (works for images too)
Most sessions involve a combination of these approaches. For example, you can pipe in a log file, then tell Claude to use a tool to pull in additional context to debug the logs.

# 5. Use headless mode to automate your infra
Claude Code includes headless mode for non-interactive contexts like CI, pre-commit hooks, build scripts, and automation. Use the -p flag with a prompt to enable headless mode, and --output-format stream-json for streaming JSON output.

Note that headless mode does not persist between sessions. You have to trigger it each session.

## a. Use Claude for issue triage
Headless mode can power automations triggered by GitHub events, such as when a new issue is created in your repository. For example, the public Claude Code repository uses Claude to inspect new issues as they come in and assign appropriate labels.

## b. Use Claude as a linter
Claude Code can provide subjective code reviews beyond what traditional linting tools detect, identifying issues like typos, stale comments, misleading function or variable names, and more.

# 6. Uplevel with multi-Claude workflows - 8-Agent Development System
The Strive Tech AI consulting platform uses a 7-agent development system for maximum efficiency:

## a. Specialist Agent Workflows - AI Consulting Platform Pattern
Implement the proven 7-agent coordination model for enterprise-grade development:

**Frontend Architect + Database Specialist Coordination**:
- Frontend Architect Claude: Implements TanStack Query patterns for DocuMaster AI state management
- Database Specialist Claude: Reviews schema requirements and Neon PostgreSQL optimization needs
- Documentation Agent Claude: Records integration decisions and performance benchmarks
- Communication via shared `/project-context/agent-memory/` markdown files

**UI/UX Designer + Evaluator Agent Validation**:
- UI/UX Designer Claude: Creates WCAG 2.1 AA compliant shadcn/ui components for client portal
- Evaluator Agent Claude: Validates accessibility compliance and Core Web Vitals performance
- Testing coordination ensures >15% consultation booking conversion rates

**Example AI Service Integration Workflow**:
```bash
# Terminal 1: Frontend Architect Agent
claude -p "Implement DocuMaster AI document generation UI with TanStack Query state management. Coordinate with Database Specialist agent via /project-context/agent-memory/frontend-context.md"

# Terminal 2: Database Specialist Agent  
claude -p "Review DocuMaster AI data requirements in /project-context/agent-memory/frontend-context.md. Design Neon PostgreSQL schema that's compatible with future Supabase migration."

# Terminal 3: Evaluator Agent
claude -p "Validate integration between frontend and database for DocuMaster AI. Ensure WCAG 2.1 AA compliance and <3s document generation performance."
```

This 7-agent separation yields superior results for complex AI consulting platform features compared to single-agent development.

## b. Have multiple checkouts of your repo
Rather than waiting for Claude to complete each step, something many engineers at Anthropic do is:

Create 3-4 git checkouts in separate folders
Open each folder in separate terminal tabs
Start Claude in each folder with different tasks
Cycle through to check progress and approve/deny permission requests
## c. Use git worktrees for AI Consulting Platform Features
Git worktrees enable parallel development of independent AI consulting platform features using the 7-agent system:

**AI Service Parallel Development**: Run specialized agents on isolated features:
```bash
# DocuMaster AI enhancement worktree
git worktree add ../strive-documaster-v2 feature/documaster-ai-v2
cd ../strive-documaster-v2 && claude

# Client portal booking system worktree  
git worktree add ../strive-booking-system feature/client-booking-system
cd ../strive-booking-system && claude

# Database evolution planning worktree
git worktree add ../strive-db-migration feature/neon-to-supabase-migration
cd ../strive-db-migration && claude
```

**Agent-Specific Worktree Strategy**:
- **Frontend Architect Agent**: Works on React 18 + TanStack Query patterns in isolation
- **Database Specialist Agent**: Plans Neon → Supabase migration without interfering with current production
- **UI/UX Designer Agent**: Develops new shadcn/ui components for enterprise client requirements
- **DevOps Specialist Agent**: Updates deployment configurations for enhanced AI service scaling

**Enterprise Client Feature Isolation**:
```bash
# Enterprise features that don't impact SMB client workflows
git worktree add ../strive-enterprise-dashboard feature/enterprise-analytics
git worktree add ../strive-enterprise-api feature/enterprise-client-api
git worktree add ../strive-compliance-features feature/enterprise-wcag-enhancements
```

**AI Consulting Platform Tips**:
- Use consistent naming: `strive-[feature-type]-[description]`
- Coordinate agent context via shared `/project-context/agent-memory/` files
- Maintain separate IDE windows for different business contexts (enterprise vs SMB)
- Document integration points for session continuity across worktrees
## d. Use headless mode for AI Consulting Platform Automation
Headless mode powers enterprise-grade automation for the Strive Tech AI consulting platform:

**1. AI Service Migration and Analysis** - Large-scale platform improvements:
```bash
# Generate task list for DocuMaster AI optimization across all templates
claude -p "Generate a list of all DocuMaster AI document templates in /StriveSite/src/templates/ that need performance optimization for <3s generation time requirements."

# Automated optimization loop
while read template; do
  claude -p "Optimize DocuMaster AI template $template for enterprise client performance. Ensure WCAG 2.1 AA compliance and TanStack Query integration. Return OK if successful, FAIL if issues remain." --allowedTools Edit Bash(npm run test:*)
done < template_list.txt
```

**2. Database Evolution Pipeline** - Neon to Supabase migration preparation:
```bash  
# Automated schema analysis for migration planning
claude -p "Analyze client data schema compatibility between current Neon PostgreSQL and planned Supabase migration. Output JSON with migration recommendations." --json | supabase-migration-planner

# Enterprise client data validation pipeline
client_data_exports | claude -p "Validate enterprise client data integrity for Supabase migration. Check GDPR compliance and performance requirements." --json | data-validation-service
```

**3. AI Consulting Platform Quality Assurance** - Enterprise compliance automation:
```bash
# WCAG 2.1 AA compliance validation across client portal
claude -p "Run comprehensive accessibility audit on client portal components. Validate WCAG 2.1 AA compliance for enterprise clients. Return JSON report with findings." --json | wcag-compliance-dashboard

# Performance monitoring for business requirements  
claude -p "Analyze Core Web Vitals across consultation booking workflow. Validate <2.5s page loads and >15% conversion rates. Output performance metrics JSON." --json | business-metrics-tracker
```

**4. 8-Agent Coordination Automation** - Session continuity management:
```bash
# Automated context file updates for agent coordination
claude -p "Update all agent memory files in /project-context/agent-memory/ with current session state. Ensure Documentation Agent has complete context for next session handoff." --allowedTools Edit

# Agent workflow validation
claude -p "Validate agent coordination patterns documented in /project-context/. Identify any gaps in session continuity or integration points." --json | agent-workflow-monitor
```

**Enterprise AI Consulting Platform Benefits**:
- **Automated Quality Gates**: Ensure WCAG 2.1 AA and Core Web Vitals compliance
- **Database Evolution Support**: Smooth Neon → Supabase migration preparation  
- **Business Metrics Validation**: Automated >15% consultation conversion tracking
- **Agent Coordination**: Seamless 7-agent development workflow management

For production AI consulting platform automation, use `--verbose` for debugging but disable in enterprise client-facing environments for cleaner output.