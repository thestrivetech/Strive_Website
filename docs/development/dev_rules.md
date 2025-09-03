# Strive Website - Development Rules

## 🎯 Core Mandate
All Claude Code agents MUST follow these rules when building the Strive Tech website. These rules are non-negotiable and take precedence over any conflicting instructions.

**Project Context**: Modern React/TypeScript website with Express backend, PostgreSQL database with Drizzle ORM, and Supabase AI integration. Features business solutions pages, authentication, and comprehensive company portfolio.

---

## 📋 Rule 1: Test-Driven Development (TDD) is MANDATORY

### 1.1 Test-First Approach
```
SEQUENCE: Test → Implementation → Refactor
NEVER: Implementation → Test
```

### 1.2 TDD Workflow
1. **RED Phase**: Write a failing test FIRST
2. **GREEN Phase**: Write minimal code to pass the test
3. **REFACTOR Phase**: Improve code while keeping tests green

### 1.3 Test Coverage Requirements
- **Minimum Coverage**: 80% for all modules
- **Critical Path Coverage**: 100% for:
  - Authentication flows (Supabase integration)
  - Contact form submissions and validation
  - Database operations (Drizzle ORM)
  - Business solution pages rendering
  - State management and routing

### 1.4 Test File Structure
```typescript
// ALWAYS create test file BEFORE implementation file
client/src/
├── components/
│   └── ui/
│       ├── __tests__/
│       │   ├── hero-section.test.tsx     // Create FIRST
│       │   ├── solution-card.test.tsx    // Create FIRST
│       │   └── team-member.test.tsx      // Create FIRST
│       ├── hero-section.tsx              // Create SECOND
│       ├── solution-card.tsx             // Create SECOND
│       └── team-member.tsx               // Create SECOND
├── pages/
│   └── solutions/
│       ├── __tests__/
│       │   ├── ai-automation.test.tsx    // Create FIRST
│       │   └── data-analytics.test.tsx   // Create FIRST
│       ├── ai-automation.tsx             // Create SECOND
│       └── data-analytics.tsx            // Create SECOND
```

### 1.5 Test Template (MUST USE)
```typescript
// Start EVERY test file with this structure
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'wouter/memory'

describe('[ComponentName]', () => {
  // Setup
  beforeEach(() => {
    // Test setup
  })
  
  afterEach(() => {
    // Cleanup
  })
  
  // Unit tests
  describe('Unit Tests', () => {
    it('should [specific behavior]', () => {
      // Arrange
      // Act
      // Assert
    })
  })
  
  // Integration tests
  describe('Integration Tests', () => {
    it('should [integration scenario]', () => {
      // Test integration points
    })
  })
  
  // Edge cases
  describe('Edge Cases', () => {
    it('should handle [edge case]', () => {
      // Test edge conditions
    })
  })
})
```

---

## 📋 Rule 2: Context7 Integration is MANDATORY

### 2.1 Context7 Usage
**EVERY agent MUST use Context7 for ALL code generation**
```
Command: "Use Context7"
Libraries: /vercel/next.js, /microsoft/TypeScript, /facebook/react
```

### 2.2 Context7 Requirements
- **Before Writing Code**: Query Context7 for React 18, TypeScript, shadcn/ui, Express.js, Drizzle ORM, Supabase best practices
- **During Development**: Reference Context7 documentation for Vite, TailwindCSS, Wouter routing
- **Code Reviews**: Validate against Context7 patterns for modern business website development

### 2.3 Context7 Integration Points
```typescript
// ALWAYS prefix code generation with Context7 query
// Examples for Strive Website:
// Query: Context7 -> React 18 + TypeScript + shadcn/ui best practices for business components
// Query: Context7 -> Express.js + Drizzle ORM + Supabase authentication patterns
// Query: Context7 -> TailwindCSS + responsive design for business websites
// Query: Context7 -> Vitest + React Testing Library for component testing
// Then: Generate code following Context7 guidelines
```

---

## 📋 Rule 3: Modular Architecture is MANDATORY

### 3.1 File Size Limits (Based on Codebase Analysis)
```
HARD LIMITS (Established from existing code patterns):
- Small components: MAX 100 lines (e.g., SolutionCard - 47 lines)
- Medium components: MAX 250 lines (e.g., HeroSection - 230 lines)
- Large components/pages: MAX 500 lines (e.g., Home page - 408 lines)
- Backend API files: MAX 350 lines (e.g., routes.ts - 315 lines)
- Service/utility files: MAX 200 lines
- Test files: MAX 400 lines

If exceeding limits → MUST split into smaller modules
```

### 3.2 Module Boundaries
```typescript
// GOOD: Clear module separation
client/src/
├── pages/solutions/        // Business solution pages (AI, Healthcare, etc.)
├── components/ui/         // Reusable UI components (shadcn/ui based)
├── components/layout/     // Layout components (navigation, footer)
├── hooks/                // Custom React hooks
└── lib/                 // Utility functions and configurations

// BAD: Mixed concerns
components/
├── HeroWithNavigationAndFooter.tsx  // ❌ NEVER DO THIS
├── SolutionCardWithContactForm.tsx  // ❌ NEVER DO THIS
```

### 3.3 Single Responsibility Principle
**ONE file = ONE responsibility**
```typescript
// GOOD: Single responsibility
export class AuthService {
  login() {}
  logout() {}
  validateSession() {}
}

export class ContactService {
  submitForm() {}
  validateEmail() {}
  sendNotification() {}
}

// BAD: Multiple responsibilities
export class WebsiteService {
  authenticateUser() {}   // ❌ Auth operations
  sendContactForm() {}    // ❌ Contact operations
  renderSolutions() {}    // ❌ UI operations
  queryDatabase() {}      // ❌ Database operations
}
```

### 3.4 Module Communication Rules
```typescript
// Modules communicate via:
1. React Query for server state
2. React Context for app-wide state
3. Props (React components)
4. Custom hooks for shared logic

// NEVER:
- Direct imports between page modules
- Circular dependencies
- Global variables
- Prop drilling beyond 3 levels
```

---

## 📋 Rule 4: Clean Code Standards

### 4.1 Naming Conventions
```typescript
// Components: PascalCase with descriptive names
HeroSection.tsx, SolutionCard.tsx, TeamMember.tsx

// Pages: kebab-case files, PascalCase exports
ai-automation.tsx -> AIAutomation component
business-intelligence.tsx -> BusinessIntelligence component

// Hooks: camelCase with 'use' prefix
useAuth.ts, useMobile.tsx, useToast.ts

// Types: PascalCase with descriptive names
User, Solution, ContactForm, TeamMember

// Constants: SCREAMING_SNAKE_CASE
MAX_EMAIL_LENGTH, API_ENDPOINTS, SOLUTION_CATEGORIES
```

### 4.2 Function Complexity
```typescript
// Cyclomatic Complexity: MAX 5
// If complexity > 5 → MUST refactor

// GOOD: Simple, testable functions (following Strive Website patterns)
function validateContactForm(data: ContactFormData): boolean {
  if (!data.name || data.name.length < 2) return false
  if (!data.email || !isValidEmail(data.email)) return false
  if (!data.message || data.message.length < 10) return false
  return true
}

// BAD: Complex, hard to test
function processContactSubmission(data) {
  if (data) {
    if (data.type === 'contact') {
      if (data.name) {
        if (data.email) {
          // ... 10 more nested ifs ❌
        }
      }
    }
  }
}
```

### 4.3 Documentation Requirements
```typescript
/**
 * EVERY public function MUST have JSDoc
 * @description Clear description of purpose
 * @param {Type} name - Parameter description
 * @returns {Type} Return value description
 * @throws {ErrorType} When this error occurs
 * @example
 * const result = functionName(param)
 */
export function functionName(param: Type): ReturnType {
  // Implementation
}
```

### 4.4 Code Comment Requirements
```typescript
// MANDATORY: Every code block MUST have explanatory comments

// 1. FILE HEADER COMMENT (Required for every file)
/**
 * @file MonacoEditor.tsx
 * @description Wrapper component for Monaco Editor providing syntax highlighting,
 *              file operations, and integration with the IDE's file system
 * @author [Agent Name]
 * @date [Creation Date]
 * @modified [Last Modified Date]
 */

// 2. SECTION COMMENTS (Required for logical sections)
// ============================================
// INITIALIZATION SECTION
// ============================================
// This section handles the editor initialization,
// loading configuration, and setting up event listeners

// 3. FUNCTION/METHOD COMMENTS (Required for ALL functions)
/**
 * Validates and processes user input before saving
 * Ensures data integrity and prevents injection attacks
 */
function processInput(data: string): ProcessedData {
  // Step 1: Validate input format
  if (!isValidFormat(data)) {
    throw new ValidationError('Invalid format')
  }
  
  // Step 2: Sanitize potential security threats
  const sanitized = sanitizeInput(data)
  
  // Step 3: Transform to internal format
  return transformData(sanitized)
}

// 4. COMPLEX LOGIC COMMENTS (Required for non-obvious code)
// Calculate the debounce delay based on file size
// Larger files need more delay to prevent UI freezing
const debounceDelay = Math.min(
  MAX_DELAY,
  Math.max(MIN_DELAY, fileSize / 1000)
)

// 5. INLINE COMMENTS (Required for complex expressions)
const isEligible = 
  user.age >= 18 &&           // Legal age requirement
  user.verified &&             // Email verification completed
  !user.suspended &&           // Account in good standing
  user.credits > MIN_CREDITS   // Sufficient credits

// 6. TODO/FIXME COMMENTS (Must include issue number)
// TODO(#123): Implement caching for improved performance
// FIXME(#456): Handle edge case when file > 10MB
// HACK(#789): Temporary workaround until library updates

// 7. WARNING COMMENTS (For critical sections)
// WARNING: Do not modify without updating tests
// CRITICAL: This must run before initialization
// SECURITY: Validate all inputs to prevent XSS
```

### 4.5 Comment Quality Standards
```typescript
// GOOD COMMENTS (Explain WHY, not WHAT):
// Use binary search for O(log n) performance on large datasets
// Cache results to prevent expensive recalculation on each render
// Delay execution to batch DOM updates for better performance

// BAD COMMENTS (State the obvious):
// Increment counter by 1 ❌
// Set name to value ❌
// Return result ❌

// Comment-to-Code Ratio:
// - Complex algorithms: 1:2 (1 line comment per 2 lines code)
// - Business logic: 1:5 
// - Simple CRUD: 1:10
// - Test files: 1:3 (explain test intent)
```

### 4.6 Self-Documenting Code Rules
```typescript
// PREFER self-documenting code with comments for context

// GOOD: Clear names + context comment
// Calculate compound interest using continuous compounding formula
// This provides more accurate results for high-frequency calculations
const continuousCompoundInterest = principal * Math.exp(rate * time)

// BAD: Unclear code with no explanation
const cci = p * Math.exp(r * t) // ❌ What is this?

// BETTER: Clear variable names reduce comment needs
const userAuthenticationToken = generateToken(user)
const isPaymentOverdue = daysSincePayment > MAX_PAYMENT_DELAY
const sanitizedHtml = DOMPurify.sanitize(userInput)
```

---

## 📋 Rule 5: Error Handling Standards

### 5.1 Error Boundaries
```typescript
// EVERY module MUST have error boundaries
class EditorErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to service
    ErrorService.log(error, errorInfo)
    // Show user-friendly message
    this.setState({ hasError: true })
  }
}
```

### 5.2 Try-Catch Requirements
```typescript
// EVERY async operation MUST have try-catch
async function riskyOperation() {
  try {
    const result = await someAsyncCall()
    return result
  } catch (error) {
    // 1. Log error
    console.error('Operation failed:', error)
    // 2. Handle gracefully
    return fallbackValue
    // 3. Report to monitoring
    ErrorService.report(error)
  }
}
```

### 5.3 Error Messages
```typescript
// User-facing errors MUST be:
- Clear and actionable
- Non-technical language
- Include recovery steps

// GOOD:
"Unable to save file. Please check your permissions and try again."

// BAD:
"EACCES: permission denied, open '/usr/local/file.txt'"
```

---

## 📋 Rule 6: Performance Requirements

### 6.1 Performance Budgets (Strive Website Targets)
```
MANDATORY LIMITS:
- Initial Page Load: < 1.5 seconds
- Route Navigation: < 200ms
- Form Submission: < 1 second
- Image Loading: < 2 seconds
- Build Size: < 500KB initial bundle
- Lighthouse Score: > 95
```

### 6.2 Optimization Rules
```typescript
// MUST use React optimization
- React.memo() for expensive components
- useMemo() for expensive calculations
- useCallback() for stable references
- Virtual scrolling for long lists
- Code splitting for features
```

### 6.3 Memory Management
```typescript
// MUST clean up resources
useEffect(() => {
  const subscription = service.subscribe()
  
  // MANDATORY: Cleanup function
  return () => {
    subscription.unsubscribe()
  }
}, [])
```

---

## 📋 Rule 7: Security Standards

### 7.1 Input Validation
```typescript
// EVERY input MUST be validated
function processUserInput(input: unknown): string {
  // 1. Type check
  if (typeof input !== 'string') {
    throw new ValidationError('Input must be string')
  }
  
  // 2. Sanitize
  const sanitized = DOMPurify.sanitize(input)
  
  // 3. Validate bounds
  if (sanitized.length > MAX_LENGTH) {
    throw new ValidationError('Input too long')
  }
  
  return sanitized
}
```

### 7.2 Secure Communication
```typescript
// WebSocket MUST use:
- WSS (not WS) in production
- Authentication tokens
- Message validation
- Rate limiting
```

---

## 📋 Rule 8: Git Commit Standards

### 8.1 Commit Message Format
```
TYPE(SCOPE): Description

Types:
- feat: New feature
- fix: Bug fix
- test: Add tests (TDD commits)
- refactor: Code improvement
- docs: Documentation
- perf: Performance improvement

Example:
test(editor): add tests for Monaco Editor initialization
feat(editor): implement Monaco Editor wrapper
refactor(editor): optimize editor performance
```

### 8.2 Commit Frequency
```
RULES:
1. Commit after writing failing test (RED)
2. Commit after making test pass (GREEN)
3. Commit after refactoring (REFACTOR)
4. NEVER commit code without tests
```

---

## 📋 Rule 9: Code Review Checklist

### Before ANY merge, verify:
- [ ] Tests written BEFORE implementation
- [ ] All tests passing (100% green)
- [ ] Test coverage >= 80%
- [ ] Context7 consulted and followed
- [ ] No file exceeds size limits
- [ ] Error handling implemented
- [ ] Documentation complete
- [ ] Performance budgets met
- [ ] Security validated
- [ ] No console.logs in production code

---

## 📋 Rule 10: Agent-Specific Rules

### 10.1 Frontend Agents
```typescript
MUST:
- Use React 18 + TypeScript with Vite
- Implement accessibility (WCAG 2.1 AA)
- Test with React Testing Library + Vitest
- Use TailwindCSS + shadcn/ui components
- Use Wouter for client-side routing
- Implement responsive design for all viewports
- Use React Query for server state management
```

### 10.2 Backend Agents
```typescript
MUST:
- Use Express.js with TypeScript strict mode
- Implement Passport.js authentication
- Use Drizzle ORM with PostgreSQL
- Integrate Supabase for AI features
- Validate all inputs with Zod schemas
- Handle errors gracefully with proper HTTP codes
- Use session-based authentication
```

### 10.3 Testing Agents
```typescript
MUST:
- Write E2E tests with Playwright (UI/Frontend agents only)
- Unit test with Vitest for React components
- Integration test API endpoints
- Test authentication flows
- Test database operations with Drizzle
- Verify responsive design across devices
```

---

## 🚨 Enforcement

### Automatic Checks
```json
// .pre-commit-config.yaml
{
  "hooks": [
    "test-coverage-check",    // Fails if < 80%
    "file-size-check",       // Fails if > limits
    "complexity-check",      // Fails if > 5
    "comment-check",         // Fails if missing required comments
    "type-check",           // Fails on TS errors
    "lint-check"           // Fails on lint errors
  ]
}
```

### Violations
```
WARNING: First violation = Warning + Required fix
ERROR: Second violation = Blocked merge
CRITICAL: Third violation = Agent reconfiguration
```

---

## 📝 Rule Amendments

These rules can only be modified through:
1. Team consensus (all agents agree)
2. Technical necessity (proven limitation)
3. Performance requirement (measured impact)

**Last Updated**: [Current Date]
**Version**: 1.0.0
**Status**: ACTIVE and ENFORCED

---

## ⚡ Quick Reference Card

```
TDD WORKFLOW:
1. Write test ✍️
2. Run test (RED) 🔴
3. Write code 💻
4. Add comments 📝
5. Run test (GREEN) 🟢
6. Refactor ♻️
7. Update comments 📝
8. Commit 📦

BEFORE EVERY CODE:
□ Test exists?
□ Context7 checked?
□ Module < limit?
□ Comments planned?
□ Errors handled?
□ Documented?

COMMENT CHECKLIST:
□ File header comment
□ Section comments
□ Function JSDoc
□ Complex logic explained
□ TODOs have issue #
□ Warnings marked

NEVER:
❌ Code without test
❌ Code without comments
❌ File > 300 lines
❌ Direct module imports
❌ Global variables
❌ Console.log in production
❌ Unhandled promises
❌ Any 'any' types
❌ Magic numbers
❌ Commented-out code
❌ TODO without issue #
```

---

## 📋 Rule 11: Session Management & Context Preservation

### 11.1 Session Start Protocol
```typescript
// EVERY session MUST begin with:
1. Read previous session summary
2. Load current test results
3. Verify all dependencies
4. Check breaking changes
5. State session objectives

// Session initialization template:
/**
 * SESSION: [DATE] - [AGENT_NAME]
 * PREVIOUS: [Last achievement]
 * CURRENT: [Current objective]
 * BLOCKS: [Any blockers]
 * PLAN: [Step-by-step plan]
 */
```

### 11.2 Context Documentation
```markdown
# Every session MUST maintain:
session-logs/
├── YYYY-MM-DD-session.md    # Daily session log
├── decisions.md              # Architectural decisions
├── blockers.md              # Current blockers
├── progress.md              # Progress tracking
└── handoff.md               # Next session prep
```

### 11.3 Inter-Agent Handoff Protocol
```typescript
interface AgentHandoff {
  completedTasks: string[]      // What was done
  currentState: string          // Where we are
  nextSteps: string[]          // What's next
  warnings: string[]           // Known issues
  testResults: TestSummary    // Current test state
  performance: Metrics        // Performance metrics
}

// MANDATORY: Update handoff.md after EVERY session
```

---

## 📋 Rule 12: Incremental Development Protocol

### 12.1 Task Breakdown Rules
```
MAX task size: 2 hours of work
If task > 2 hours → MUST break down:

LARGE TASK: "Implement editor module"
BREAKDOWN:
├── Task 1: Write editor tests (30 min)
├── Task 2: Create Monaco wrapper (45 min)
├── Task 3: Implement file tabs (45 min)
└── Task 4: Integration testing (30 min)
```

### 12.2 Validation Checkpoints
```typescript
// MUST validate after EVERY:
- [ ] 10 test cases written
- [ ] 100 lines of code
- [ ] 30 minutes of work
- [ ] New feature completion
- [ ] Integration point

// Validation includes:
1. Run all tests
2. Check coverage
3. Verify performance
4. Review code quality
```

### 12.3 Stop Conditions
```typescript
MUST STOP development when:
- Test coverage drops below 80%
- Build time exceeds 30 seconds
- Bundle size increases by >100KB
- Memory usage increases by >50MB
- Any security vulnerability detected

// Recovery: Fix issue BEFORE continuing
```

---

## 📋 Rule 13: Code Generation Efficiency

### 13.1 Reference Before Regenerate
```typescript
// BEFORE generating new code:
1. CHECK: Does similar code exist?
2. REUSE: Can we extend existing code?
3. REFACTOR: Can we extract common logic?
4. GENERATE: Only if 1-3 are "No"

// Use artifact updates, not full rewrites
@artifacts.update(
  file: "existing-file.ts",
  changes: "specific-changes-only"
)
```

### 13.2 Partial Update Rules
```typescript
// PREFER partial updates:
GOOD: Update specific function
BAD: Regenerate entire file

GOOD: Extend existing class
BAD: Rewrite entire class

GOOD: Add test case
BAD: Regenerate test suite
```

### 13.3 Code Memory System
```typescript
// Maintain code registry:
code-registry/
├── components.json     // List of all components
├── services.json      // List of all services
├── patterns.json      // Reusable patterns
└── snippets.json      // Common code snippets

// Query before creating:
"Has FileService been implemented?" → Check registry
"Need validation logic" → Check patterns
```

---

## 📋 Rule 14: Agent Communication Protocol

### 14.1 Request Format
```typescript
interface AgentRequest {
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW'
  type: 'FEATURE' | 'FIX' | 'TEST' | 'REFACTOR'
  description: string
  context: {
    files: string[]        // Affected files
    tests: string[]        // Related tests
    dependencies: string[] // Required modules
  }
  constraints: {
    timeLimit: string     // "2 hours"
    performance: Metrics  // Performance requirements
    coverage: number      // Min test coverage
  }
  validation: {
    criteria: string[]    // Success criteria
    tests: string[]       // Must-pass tests
  }
}
```

### 14.2 Response Format
```typescript
interface AgentResponse {
  status: 'SUCCESS' | 'PARTIAL' | 'BLOCKED' | 'FAILED'
  completed: string[]     // What was done
  pending: string[]       // What remains
  issues: Issue[]        // Problems encountered
  metrics: {
    testsWritten: number
    testsPassing: number
    coverage: number
    linesOfCode: number
    timeSpent: string
  }
  nextAgent: string      // Recommended next agent
}
```

### 14.3 Status Broadcasting
```typescript
// MUST broadcast status every:
- 15 minutes (time-based)
- 5 test cases (test-based)
- 50 lines of code (code-based)
- On any blocker (event-based)

// Status format:
"[AGENT_NAME] [TIME]: [STATUS] - [DESCRIPTION]"
"Frontend-Agent 14:30: IN_PROGRESS - Implementing Monaco Editor (3/5 tests passing)"
```

---

## 📋 Rule 15: Continuous Validation Protocol

### 15.1 Real-time Checks
```typescript
// Run automatically on file save:
- TypeScript compilation
- Linting (ESLint)
- Comment coverage check
- Unit tests for changed files
- Complexity analysis
- Size check

// Run every 5 changes:
- Full test suite
- Coverage report
- Comment-to-code ratio
- Performance profile
- Security scan
```

### 15.2 Performance Monitoring
```typescript
// Track during development:
interface PerformanceMetrics {
  buildTime: number        // Must be < 30s
  bundleSize: number       // Must be < 2MB
  testTime: number         // Must be < 60s
  memoryUsage: number      // Must be < 500MB
  cpuUsage: number         // Must be < 80%
}

// Alert if degradation > 10%
```

### 15.3 Automated Fixes
```typescript
// Auto-fix on detection:
- Format issues → Prettier
- Import order → ESLint fix
- Unused imports → Remove
- Type errors → Suggest fix
- Simple lint errors → Auto-fix

// Require manual fix:
- Test failures
- Security issues
- Performance degradation
- Complex type errors
```

---

## 📋 Rule 16: AI-Specific Best Practices

### 16.1 Request Clarity Rules
```typescript
// EVERY request MUST include:
interface ClearRequest {
  what: string          // Specific task
  why: string          // Purpose/context
  where: string        // File/module location
  when: string         // Priority/deadline
  how: string[]        // Constraints/requirements
  examples?: string[]  // Optional examples
}

// GOOD Request:
"Create MonacoEditor component wrapper with TypeScript, 
 must support syntax highlighting for JS/TS/Python,
 located in src/features/editor/MonacoEditor.tsx,
 needed for core editor functionality,
 must have 100% test coverage,
 reference VS Code's implementation"

// BAD Request:
"Make an editor"
```

### 16.2 Validation Questions
```typescript
// ASK before implementing:
1. "Is the requirement clear?"
2. "Are there existing patterns to follow?"
3. "What are the test criteria?"
4. "What are the performance constraints?"
5. "Are there security considerations?"

// If ANY answer is "unclear" → REQUEST CLARIFICATION
```

### 16.3 Code Verification Protocol
```typescript
// AFTER generating code:
1. Run through TypeScript compiler
2. Check against Context7 patterns
3. Verify test coverage
4. Validate performance impact
5. Review security implications

// If ANY check fails → REGENERATE with fixes
```

---

## 📋 Rule 17: Failure Recovery Protocol

### 17.1 Test Failure Recovery
```typescript
// When tests fail:
1. STOP all development
2. Identify failure cause
3. Document in failures.log
4. Fix or rollback
5. Verify all tests pass
6. Document fix in session log

// NEVER skip failing tests
// NEVER comment out tests
// NEVER reduce coverage to pass
```

### 17.2 Breaking Change Protocol
```typescript
// On breaking change detection:
interface BreakingChangeHandler {
  detect: () => boolean      // Check for breaks
  document: () => void       // Log the change
  notify: () => void        // Alert all agents
  migrate: () => void       // Update dependents
  validate: () => boolean   // Verify fixes
}

// Migration must include:
- Update all affected tests
- Update all imports
- Update documentation
- Verify no runtime errors
```

### 17.3 Rollback Procedures
```typescript
// Automatic rollback triggers:
- Coverage drops below 70%
- Build fails 3 times
- Performance degrades >25%
- Security vulnerability detected

// Rollback process:
1. Git stash current changes
2. Revert to last passing commit
3. Document rollback reason
4. Create fix branch
5. Implement fix with tests
```

---

## 📋 Rule 18: Knowledge Preservation

### 18.1 Documentation Requirements
```typescript
// MUST document:
- WHY decisions were made (not just what)
- FAILED approaches (prevent repetition)
- PERFORMANCE impacts (with numbers)
- SECURITY considerations
- FUTURE improvements

// Documentation format:
/**
 * Decision: Use Zustand over Redux
 * Date: [DATE]
 * Author: [AGENT]
 * Reason: Simpler API, smaller bundle (12KB vs 36KB)
 * Trade-offs: Less middleware support
 * Alternatives considered: Redux, MobX, Valtio
 */
```

### 18.2 Pattern Library
```typescript
// Extract and document patterns:
patterns/
├── ErrorHandling.md      // Error patterns
├── StateManagement.md    // State patterns
├── Testing.md           // Test patterns
├── Performance.md       // Optimization patterns
└── Security.md         // Security patterns

// Before implementing: CHECK PATTERN LIBRARY
```

### 18.3 Learning Log
```markdown
# Track what doesn't work:
learning-log/
├── failed-approaches.md
├── performance-bottlenecks.md
├── security-issues.md
└── testing-challenges.md

# Format:
## [DATE] - [ISSUE]
**Attempted**: What we tried
**Result**: What happened
**Learning**: What we learned
**Solution**: What worked
```

---

## 📋 Rule 19: Resource Optimization

### 19.1 Memory Management Rules
```typescript
// Monitor memory usage:
- Check before: performance.memory.usedJSHeapSize
- Execute operation
- Check after: performance.memory.usedJSHeapSize
- If increase > 10MB → Investigate

// Cleanup requirements:
- Remove event listeners
- Clear timers/intervals
- Dispose subscriptions
- Clear caches periodically
- Unload unused modules
```

### 19.2 Build Optimization
```typescript
// Optimize builds:
- Use dynamic imports for features
- Tree-shake unused code
- Minify production builds
- Compress assets
- Cache dependencies

// Build budget alerts:
if (buildTime > 20s) console.warn('Build too slow')
if (bundleSize > 1.5MB) console.warn('Bundle too large')
```

### 19.3 Development Efficiency
```typescript
// Speed up development:
- Use HMR (Hot Module Replacement)
- Cache test results
- Parallel test execution
- Incremental TypeScript compilation
- Selective test running

// Time tracking:
console.time('Operation')
// ... operation ...
console.timeEnd('Operation') // Must be < 1000ms
```

---

## 📋 Rule 20: Final Checklist System

### 20.1 Pre-Commit Checklist
```markdown
BEFORE EVERY COMMIT:
□ Tests written and passing
□ Coverage >= 80%
□ No TypeScript errors
□ No ESLint warnings
□ All code sections commented
□ Complex logic explained
□ JSDoc for all functions
□ Performance budget met
□ Documentation updated
□ Context7 patterns followed
□ File sizes within limits
□ No console.logs
□ No commented-out code
□ No TODO without issue number
□ Changeset documented
```

### 20.2 Session End Checklist
```markdown
BEFORE ENDING SESSION:
□ All tests passing
□ Handoff document updated
□ Session log completed
□ Breaking changes documented
□ Performance metrics recorded
□ Next steps clearly defined
□ Blockers identified
□ Code registry updated
□ Pattern library updated
□ Learning log updated
```

### 20.3 Feature Complete Checklist
```markdown
BEFORE MARKING FEATURE COMPLETE:
□ 100% test coverage for feature
□ Integration tests passing
□ E2E tests implemented
□ Performance validated
□ Security reviewed
□ Accessibility checked
□ Documentation complete
□ Error handling robust
□ Edge cases covered
□ Code review passed
□ Demo prepared
□ Rollback plan ready
```

---

## 🚀 Efficiency Accelerators

### Quick Commands
```bash
# Session start
npm run session:start        # Runs all checks, loads context

# During development  
npm run test:watch          # Continuous testing
npm run test:changed        # Test only changes
npm run validate            # Full validation
npm run perf:check         # Performance check

# Session end
npm run session:end         # Generates reports, updates logs
```

### AI Agent Macros
```typescript
// Frequently used patterns:
@test-module [module-name]     // Generate test suite
@implement-tdd [feature]       // TDD workflow
@refactor-large [file]        // Split large file
@optimize-performance [metric] // Performance fix
@document-decision [topic]     // Document choice
@check-patterns [feature]      // Find patterns
@validate-all                  // Run all checks
```

---

## 🎯 Mission Statement

**"We build quality through discipline. Every test written before code, every module kept small, every error handled gracefully - these are not just rules, they are our commitment to excellence."**

All agents operating on the Strive Website project are bound by these rules. No exceptions. No shortcuts. Quality first, always.

**Project-Specific Goals:**
- Create a professional, modern business website showcasing Strive Tech's capabilities
- Implement comprehensive solution pages (AI, Healthcare, Finance, etc.)
- Ensure excellent user experience with responsive design and fast loading
- Maintain clean, scalable codebase following React/TypeScript best practices
- Integrate authentication and database features seamlessly

**USE CONTEXT7. WRITE TESTS FIRST. KEEP IT MODULAR. FOLLOW EXISTING PATTERNS. SHIP QUALITY.**