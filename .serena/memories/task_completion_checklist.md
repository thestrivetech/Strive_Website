# Task Completion Checklist

## Pre-Development Setup

### Session Initialization
- [ ] Check previous session's chat log for context
- [ ] Review `plan.md` for current implementation progress  
- [ ] Check `change_log.md` for recent code changes
- [ ] Verify environment variables (DATABASE_URL, etc.)
- [ ] Run `npm run session:init` for workflow compliance

### Development Environment Verification
```bash
# Verify Node.js and npm versions
node --version  # Should be 20.x
npm --version   # Should be recent

# Check project dependencies
npm list --depth=0

# Verify database connection
npm run db:push --dry-run
```

## During Development

### Code Quality Checks
- [ ] **TypeScript validation**: Run `npm run check` after any code changes
- [ ] **Lint adherence**: Follow ESLint rules and TypeScript strict mode
- [ ] **Import organization**: External libs first, then internal with path aliases
- [ ] **Component conventions**: Use functional components with proper TypeScript typing

### Performance Considerations
- [ ] **Code splitting**: Use React.lazy for new route components
- [ ] **Loading states**: Implement proper loading/skeleton components
- [ ] **Bundle analysis**: Check impact on bundle size for new dependencies
- [ ] **Database queries**: Optimize Drizzle ORM queries for efficiency

### Security Practices
- [ ] **Input validation**: Validate all user inputs on frontend and backend
- [ ] **SQL injection prevention**: Use Drizzle ORM parameterized queries only
- [ ] **Environment variables**: Never commit secrets to repository
- [ ] **Security headers**: Ensure Helmet middleware properly configured

## Testing Requirements

### Unit Testing
```bash
# Run tests during development
npm run test:watch

# Before committing - run full test suite
npm run test:run

# Check test coverage
npm run test:coverage
```

### E2E Testing (when applicable)
```bash
# Install Playwright browsers if needed
npm run test:e2e:install

# Run end-to-end tests
npm run test:e2e
```

### Manual Testing Checklist
- [ ] **Navigation**: All routes load correctly
- [ ] **Forms**: Contact and newsletter forms submit successfully
- [ ] **Responsive design**: Test on mobile, tablet, desktop viewports
- [ ] **Loading states**: Verify skeleton components display properly
- [ ] **Error handling**: Test error scenarios and fallbacks

## Pre-Commit Requirements

### Code Validation
```bash
# REQUIRED: TypeScript type checking
npm run check

# REQUIRED: Run all tests
npm run test:run

# Database schema validation (if schema changed)
npm run db:push --dry-run
```

### Documentation Updates
- [ ] **Change log**: Document all code modifications with before/after states
- [ ] **Plan.md**: Update implementation progress status
- [ ] **Comments**: Add JSDoc for new exported functions/components
- [ ] **README updates**: Modify if new features or setup steps added

## Post-Development Verification

### Production Build Testing
```bash
# Verify production build works
npm run build

# Test production server (optional)
npm start
```

### Database Operations
```bash
# Apply schema changes to database
npm run db:push

# Verify database connection and operations
# (Run a simple query test if major DB changes made)
```

### Performance Validation
- [ ] **Bundle size**: Check that main bundle remains under 400KB
- [ ] **Loading time**: Verify initial page load performance
- [ ] **Memory usage**: Check for potential memory leaks in development
- [ ] **Network requests**: Validate API calls are optimized

## Session Completion Protocol

### Documentation Requirements
- [ ] **Change log**: All edits/deletions documented with rollback information
- [ ] **Plan.md**: Updated to reflect completed tasks and current progress
- [ ] **Session handoff**: Create comprehensive notes in chat log
- [ ] **Memory.json**: Keep unchanged (brain content only - no task lists)

### Code Quality Final Check
- [ ] **No console.logs**: Remove debugging statements
- [ ] **No TODO comments**: Either implement or create proper task tracking
- [ ] **Proper error handling**: All async operations have try/catch
- [ ] **TypeScript strict**: No `any` types or TypeScript warnings

## Deployment Readiness

### Environment Configuration
- [ ] **Environment variables**: All required vars documented and available
- [ ] **Database migration**: Schema changes applied successfully
- [ ] **Build optimization**: Production build completes without warnings
- [ ] **Security review**: No sensitive data exposed in client-side code

### Final Validation Commands
```bash
# Complete validation sequence
npm run check           # TypeScript validation
npm run test:run        # All tests pass
npm run build          # Production build succeeds
npm run db:push        # Database schema sync
```

## Critical Reminders

### File System Operations
- **NEVER create unnecessary files** - prefer editing existing files
- **NEVER use system commands** like `cat`, `grep`, `find` - use appropriate tools
- **ALWAYS use absolute paths** when possible
- **PREFER ripgrep (`rg`)** over grep for searching

### Project-Specific Notes
- **Home page**: Never lazy load - keep immediate for UX
- **shadcn/ui**: Always prefer shadcn components over custom implementations
- **Replit platform**: Trust proxy setting required for proper functionality
- **Session storage**: Currently MemoryStore - upgrade needed for production scaling

### Error Recovery
- **Rollback information**: Always available in change_log.md
- **Git history**: Use for reverting problematic changes
- **Database backup**: Consider backup before major schema changes
- **Dependency lockfile**: Commit package-lock.json to ensure consistent builds