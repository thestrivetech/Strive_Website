# Session Log - [DATE] [TIME]

## Session Metadata
- **Date**: [YYYY-MM-DD]
- **Time Started**: [HH:MM UTC]
- **Time Ended**: [HH:MM UTC]
- **Session ID**: [UNIQUE_ID]
- **Previous Session**: [LINK_TO_PREVIOUS]
- **Branch**: [GIT_BRANCH]
- **Initial Commit**: [COMMIT_HASH]
- **Final Commit**: [COMMIT_HASH]

## Session Context

### Current Project State
- **Project Phase**: [Development/Testing/Debugging/Feature Addition/Refactoring]
- **Active Features**: 
  - [ ] Feature 1
  - [ ] Feature 2
- **Known Issues**:
  - [ ] Issue 1
  - [ ] Issue 2
- **Tech Debt**:
  - [ ] Item 1
  - [ ] Item 2

### Session Goals
1. **Primary Objective**: [Main goal for this session]
2. **Secondary Objectives**:
   - [ ] Objective 1
   - [ ] Objective 2
   - [ ] Objective 3

### Environment State
```json
{
  "node_version": "",
  "npm_version": "",
  "database_status": "",
  "env_variables_configured": [],
  "services_running": [],
  "ports_in_use": []
}
```

## Work Completed

### Tasks Accomplished
1. **Task**: [Description]
   - **Status**: ✅ Complete / ⚠️ Partial / ❌ Blocked
   - **Files Modified**: 
     - `file1.ts` - [Brief description of changes]
     - `file2.tsx` - [Brief description of changes]
   - **Commits**: [commit_hash] - [commit message]
   - **Notes**: [Any important details]

2. **Task**: [Description]
   - **Status**: [Status]
   - **Files Modified**: []
   - **Commits**: []
   - **Notes**: []

### Code Changes Summary

#### New Files Created
```
- /path/to/new/file1.ts - [Purpose]
- /path/to/new/file2.tsx - [Purpose]
```

#### Files Modified
```
- /path/to/modified/file1.ts
  - Lines 10-25: [What was changed and why]
  - Lines 50-75: [What was changed and why]
  
- /path/to/modified/file2.tsx
  - Lines 100-150: [What was changed and why]
```

#### Files Deleted
```
- /path/to/deleted/file.ts - [Reason for deletion]
```

### API Endpoints Changed
- **NEW** `POST /api/endpoint` - [Description]
- **MODIFIED** `GET /api/endpoint` - [What changed]
- **DEPRECATED** `DELETE /api/endpoint` - [Replacement]

### Database Changes
- **Schema Updates**:
  - Added table: `table_name`
  - Modified column: `table.column` - [Change description]
  - Added index: `index_name` on `table.column`
- **Migrations Run**: 
  - `migration_001.sql` - [Description]

### Dependencies Updated
- **Added**:
  - `package-name@version` - [Purpose]
- **Updated**:
  - `package-name@old_version` → `@new_version` - [Reason]
- **Removed**:
  - `package-name` - [Reason]

## Testing & Validation

### Tests Run
```bash
# Commands executed
npm run test
npm run check
npm run lint
```

### Test Results
- **Unit Tests**: ✅ Passed / ❌ Failed (X/Y tests)
- **Integration Tests**: ✅ Passed / ❌ Failed
- **Type Checking**: ✅ Clean / ⚠️ Warnings / ❌ Errors
- **Linting**: ✅ Clean / ⚠️ Warnings / ❌ Errors

### Manual Testing Performed
1. **Feature**: [What was tested]
   - **Steps**: [How it was tested]
   - **Result**: [Outcome]
   - **Issues Found**: [Any problems]

## Challenges & Solutions

### Problem 1
- **Issue**: [Description of the problem]
- **Root Cause**: [What caused it]
- **Solution Applied**: [How it was fixed]
- **Alternatives Considered**: [Other approaches]
- **Impact**: [What this affects]

### Problem 2
- **Issue**: [Description]
- **Status**: 🔧 Resolved / ⏳ In Progress / 🔴 Blocked
- **Next Steps**: [If not resolved]

## Discoveries & Learnings

### Code Insights
- [Important discovery about the codebase]
- [Pattern or convention identified]
- [Performance consideration noted]

### Technical Notes
- [Library behavior discovered]
- [Configuration requirement identified]
- [Best practice learned]

## TODO & Follow-up

### Immediate Next Steps
1. ⭐ **HIGH PRIORITY**: [Task that must be done next]
2. 🔄 **CONTINUE**: [Work in progress to resume]
3. 📝 **DOCUMENT**: [What needs documentation]

### Future Considerations
- **Technical Debt Added**: [What shortcuts were taken]
- **Refactoring Needed**: [What should be improved]
- **Performance Optimizations**: [Potential improvements]
- **Security Considerations**: [Any security items to address]

### Questions & Blockers
- ❓ **Question**: [Unresolved question]
- 🚧 **Blocker**: [What's preventing progress]
- 💡 **Idea**: [Potential improvement or feature]

## Session Handoff Notes

### Critical Information for Next Session
⚠️ **IMPORTANT**: [Anything critical the next session must know]

### Current State
- **Application Status**: 🟢 Running / 🟡 Partial / 🔴 Broken
- **Build Status**: ✅ Clean / ⚠️ Warnings / ❌ Errors
- **Database Status**: 🟢 Synced / 🟡 Pending Migrations / 🔴 Issues
- **Services Running**: [List of active services]

### Where to Resume
1. **File**: `current_file.ts` - Line XXX
2. **Task**: [Specific task to continue]
3. **Context**: [Brief context about what was being done]

### Commands to Run on Resume
```bash
# Environment setup
npm install  # If dependencies changed

# Start services
npm run dev

# Check status
git status
npm run check
```

## Additional Notes
[Any other relevant information, observations, or context that doesn't fit above categories]

---
**Session Signature**: [Auto-generated hash or ID]
**Log Version**: 1.0.0