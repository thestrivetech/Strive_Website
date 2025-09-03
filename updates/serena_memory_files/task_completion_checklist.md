# Task Completion Checklist

## Before Marking a Task Complete

### Code Quality Checks
- [ ] TypeScript compilation passes without errors (`npm run check`)
- [ ] No ESLint warnings or errors
- [ ] Code follows established patterns and conventions
- [ ] Complex logic has clear comments
- [ ] No console.log statements left in production code

### Testing Requirements
- [ ] Feature works as expected in development
- [ ] Manual testing completed for all user flows
- [ ] Edge cases considered and handled
- [ ] Error states properly handled with user feedback
- [ ] Loading states implemented where needed

### UI/UX Verification
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessibility checked (keyboard navigation, screen reader)
- [ ] Visual consistency with design system
- [ ] Animations and transitions smooth
- [ ] Dark mode support (if applicable)

### Performance Checks
- [ ] Page load time acceptable
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Bundle size impact assessed
- [ ] API calls optimized (no N+1 queries)

### Documentation
- [ ] Component/function documentation updated
- [ ] API endpoint documentation current
- [ ] README updated if needed
- [ ] Complex logic explained in comments
- [ ] Chat logs updated for session continuity

### Git Workflow
- [ ] Changes committed with descriptive message
- [ ] Branch up to date with main
- [ ] No merge conflicts
- [ ] PR description clear and complete

### Database Changes (if applicable)
- [ ] Schema migrations created
- [ ] Database seeded with test data
- [ ] Rollback plan documented
- [ ] Performance impact assessed

### Security Considerations
- [ ] Input validation implemented
- [ ] SQL injection prevention verified
- [ ] XSS protection in place
- [ ] Authentication/authorization checked
- [ ] Sensitive data properly handled

### Agent Coordination
- [ ] Dependencies from other agents resolved
- [ ] Handoff documentation complete
- [ ] Integration points tested
- [ ] Blocker communication sent if needed

## Post-Completion Actions

1. **Update Session Log**
   - Document what was completed
   - Note any issues encountered
   - Record decisions made

2. **Update Plan.md**
   - Check off completed items
   - Update timeline if needed
   - Note any scope changes

3. **Communicate Status**
   - Inform orchestrator of completion
   - Note any follow-up tasks needed
   - Flag any risks or concerns

4. **Prepare Handoff**
   - Document integration points
   - Provide usage examples
   - Note any gotchas or special considerations

## Quality Gates

### Phase Transitions
Before moving from one development phase to another:
- All checklist items must be complete
- Evaluator agent review passed
- Performance benchmarks met
- Security scan clean
- Accessibility audit passed

### Production Deployment
- All tests passing
- Code review completed
- Documentation current
- Rollback plan ready
- Monitoring configured