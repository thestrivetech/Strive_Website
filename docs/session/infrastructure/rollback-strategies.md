# Rollback Strategies and Recovery Procedures

## Overview
Comprehensive rollback strategies for the Strive Tech website, including Git-based rollbacks, partial file recovery, and environment-specific rollback procedures.

## Git Rollback Patterns

### Single File Rollbacks
```bash
# Revert specific file to last committed version
git checkout HEAD -- path/to/file.js

# Revert file to specific commit
git checkout <commit-hash> -- path/to/file.js

# Using git restore (Git 2.23+)
git restore --source=<commit-hash> path/to/file.js

# Revert to previous commit (one commit back)
git checkout HEAD~1 -- path/to/file.js
```

### Multiple File Selective Rollbacks
```bash
# Revert multiple specific files
git checkout HEAD -- file1.js file2.css components/Header.tsx

# Revert entire directory
git checkout HEAD -- src/components/

# Revert files matching pattern
git checkout HEAD -- "*.css"
git checkout HEAD -- "src/pages/*.tsx"
```

### Staged Changes Management
```bash
# Remove file from staging area (keep changes in working directory)
git reset HEAD path/to/file.js

# Remove all files from staging area
git reset HEAD

# Unstage specific files while preserving others
git reset HEAD -- file1.js file2.js
```

### Commit-Level Rollbacks
```bash
# Safe revert - creates new commit that undoes changes
git revert <commit-hash>

# Revert multiple commits
git revert <oldest-commit>..<newest-commit>

# Revert merge commit
git revert -m 1 <merge-commit-hash>

# Interactive revert for commit range
git revert --no-commit <commit-hash>
# Edit files manually if needed
git commit -m "Revert: custom message"
```

### Advanced Rollback Scenarios
```bash
# Rollback specific commit but keep subsequent commits
git revert --no-edit <commit-hash>

# Rollback last N commits safely (public repos)
git revert HEAD~N..HEAD

# Reset to specific commit (DANGEROUS - only for private branches)
git reset --hard <commit-hash>

# Soft reset - keep changes in staging area
git reset --soft <commit-hash>

# Mixed reset - keep changes in working directory
git reset --mixed <commit-hash>
```

## Project-Specific Rollback Procedures

### Asset Rollback Strategies
```bash
# Rollback logo changes while preserving other assets
git checkout HEAD~1 -- attached_assets/STRIVE_Orange_Text_Transparent_1483x320px.png
git checkout HEAD~1 -- attached_assets/STRIVE_orange_text_transparent_1500x1500.png

# Rollback all assets in directory
git checkout HEAD~1 -- attached_assets/

# Create rollback checkpoint before asset changes
git tag asset-checkpoint-$(date +%Y%m%d-%H%M%S)
# Later rollback to checkpoint
git checkout asset-checkpoint-YYYYMMDD-HHMMSS -- attached_assets/
```

### Configuration Rollbacks
```bash
# Rollback Vite config only
git checkout HEAD~1 -- vite.config.ts

# Rollback package.json while preserving other changes
git checkout HEAD~1 -- package.json

# Rollback environment configuration
git checkout HEAD~1 -- .replit

# Rollback database schema
git checkout HEAD~1 -- shared/schema.ts
```

### Component Rollbacks
```bash
# Rollback specific component
git checkout HEAD~1 -- client/src/components/ui/button.tsx

# Rollback entire components directory
git checkout HEAD~1 -- client/src/components/

# Rollback pages while keeping components
git checkout HEAD~1 -- client/src/pages/
```

## Deployment Rollback Procedures

### Replit Deployment Rollback
```bash
#!/bin/bash
# replit-rollback.sh

echo "🔄 Starting Replit deployment rollback..."

# Check current deployment status
CURRENT_COMMIT=$(git rev-parse HEAD)
echo "Current commit: $CURRENT_COMMIT"

# Rollback options
case $1 in
  "previous")
    TARGET_COMMIT="HEAD~1"
    ;;
  "commit")
    TARGET_COMMIT="$2"
    ;;
  "tag")
    TARGET_COMMIT="$2"
    ;;
  *)
    echo "Usage: ./replit-rollback.sh [previous|commit <hash>|tag <name>]"
    exit 1
    ;;
esac

echo "Rolling back to: $TARGET_COMMIT"

# Create backup of current state
git tag "rollback-backup-$(date +%Y%m%d-%H%M%S)" HEAD

# Perform rollback
if git revert --no-edit "$TARGET_COMMIT"..HEAD; then
  echo "✅ Rollback successful"
  
  # Rebuild and restart
  npm run build
  
  # Restart Replit process
  kill -9 $PPID
else
  echo "❌ Rollback failed"
  exit 1
fi
```

### Database Rollback Procedures
```bash
#!/bin/bash
# database-rollback.sh

echo "🗄️ Database rollback procedure..."

# Backup current database state
pg_dump $DATABASE_URL > "backup-$(date +%Y%m%d-%H%M%S).sql"

# Rollback schema to previous version
git checkout HEAD~1 -- shared/schema.ts

# Generate and apply rollback migration
npm run db:generate
npm run db:push

echo "✅ Database rollback completed"
```

## Environment-Specific Rollbacks

### Development Environment
```bash
# Quick development rollback
dev-rollback() {
  local target=${1:-HEAD~1}
  
  echo "🔄 Dev rollback to $target"
  
  # Stash current changes
  git stash push -m "Pre-rollback stash $(date)"
  
  # Reset to target
  git reset --hard "$target"
  
  # Reinstall dependencies if package.json changed
  npm install
  
  # Restart dev server
  npm run dev
}
```

### Production Environment
```bash
# Production-safe rollback
production-rollback() {
  local target=${1:-HEAD~1}
  
  echo "🚀 Production rollback to $target"
  
  # Create safety backup
  git tag "prod-backup-$(date +%Y%m%d-%H%M%S)" HEAD
  
  # Safe revert (doesn't rewrite history)
  git revert --no-edit "$target"..HEAD
  
  # Build and deploy
  npm run build
  npm start
  
  echo "✅ Production rollback completed"
}
```

## Selective Rollback Patterns

### Preserving Specific Changes
```bash
# Rollback everything except specific files
git checkout HEAD~1 -- .
git checkout HEAD -- important-file.js config/production.js

# Rollback specific feature while keeping bug fixes
git revert <feature-commit-hash>
# Keep any bug fix commits that came after
```

### Partial Feature Rollback
```bash
# Rollback feature branch merge
git revert -m 1 <merge-commit-hash>

# Cherry-pick specific commits back
git cherry-pick <good-commit-1> <good-commit-2>

# Interactive rebase to selectively keep changes
git rebase -i HEAD~10
```

### Configuration Preservation
```bash
# Rollback code but preserve environment configuration
rollback-preserve-config() {
  local target=${1:-HEAD~1}
  
  # Backup current config
  cp .replit .replit.backup
  cp vite.config.ts vite.config.ts.backup
  
  # Perform rollback
  git checkout "$target" -- .
  
  # Restore important config
  mv .replit.backup .replit
  mv vite.config.ts.backup vite.config.ts
  
  echo "✅ Rollback with config preservation completed"
}
```

## Automated Rollback Scripts

### Smart Rollback Script
```bash
#!/bin/bash
# smart-rollback.sh

set -e

TARGET=${1:-HEAD~1}
PRESERVE_CONFIG=${2:-false}

echo "🔄 Smart rollback to $TARGET"

# Validation
if ! git rev-parse --verify "$TARGET" >/dev/null 2>&1; then
  echo "❌ Invalid target: $TARGET"
  exit 1
fi

# Create rollback checkpoint
CHECKPOINT="rollback-$(date +%Y%m%d-%H%M%S)"
git tag "$CHECKPOINT" HEAD
echo "📍 Created checkpoint: $CHECKPOINT"

# Preserve configurations if requested
if [ "$PRESERVE_CONFIG" = "true" ]; then
  echo "💾 Backing up configurations..."
  mkdir -p .rollback-temp
  cp .replit .rollback-temp/
  cp vite.config.ts .rollback-temp/
  cp package.json .rollback-temp/
fi

# Perform rollback
echo "⏮️ Performing rollback..."
if git revert --no-edit "$TARGET"..HEAD; then
  echo "✅ Git rollback successful"
else
  echo "❌ Git rollback failed"
  git tag -d "$CHECKPOINT"
  exit 1
fi

# Restore configurations
if [ "$PRESERVE_CONFIG" = "true" ] && [ -d .rollback-temp ]; then
  echo "🔧 Restoring configurations..."
  cp .rollback-temp/* ./
  rm -rf .rollback-temp
fi

# Rebuild and restart
echo "🏗️ Rebuilding..."
npm install
npm run build

echo "✅ Smart rollback completed successfully!"
echo "📍 To undo this rollback: git reset --hard $CHECKPOINT"
```

### Rollback Verification Script
```bash
#!/bin/bash
# verify-rollback.sh

echo "🔍 Verifying rollback..."

# Check if application builds
if npm run build; then
  echo "✅ Build verification passed"
else
  echo "❌ Build verification failed"
  exit 1
fi

# Check if tests pass
if npm run test; then
  echo "✅ Test verification passed"
else
  echo "❌ Test verification failed"
  exit 1
fi

# Check if server starts
timeout 30 npm start &
SERVER_PID=$!
sleep 10

if kill -0 $SERVER_PID 2>/dev/null; then
  echo "✅ Server start verification passed"
  kill $SERVER_PID
else
  echo "❌ Server start verification failed"
  exit 1
fi

echo "✅ All rollback verifications passed"
```

## Recovery Procedures

### Emergency Recovery
```bash
# Emergency recovery from broken state
emergency-recovery() {
  echo "🚨 Emergency recovery initiated"
  
  # Get to a known good state
  git fetch origin
  git checkout origin/main
  
  # Force clean slate
  npm ci
  npm run build
  
  # Restart services
  npm start
  
  echo "🆘 Emergency recovery completed"
}
```

### Progressive Recovery
```bash
# Progressive recovery - try multiple fallback levels
progressive-recovery() {
  local attempts=("HEAD~1" "HEAD~5" "HEAD~10" "origin/main")
  
  for target in "${attempts[@]}"; do
    echo "🔄 Attempting recovery to $target"
    
    if git checkout "$target" -- .; then
      if npm run build && npm run test:quick; then
        echo "✅ Recovery successful at $target"
        return 0
      fi
    fi
    
    echo "❌ Recovery failed at $target, trying next..."
  done
  
  echo "🚨 All recovery attempts failed"
  return 1
}
```

## Rollback Documentation

### Change Log Template
```markdown
## Rollback Log

### Rollback: [Date] [Time]
- **Trigger**: [Reason for rollback]
- **Target**: [Commit hash/tag]
- **Scope**: [Files/features affected]
- **Duration**: [Time to complete]
- **Verification**: [Tests passed/failed]
- **Impact**: [User/system impact]

### Files Affected:
- [ ] client/src/components/
- [ ] server/routes.ts
- [ ] shared/schema.ts
- [ ] Configuration files

### Recovery Steps:
1. Created checkpoint: `rollback-20241205-143022`
2. Reverted commits: `abc123..def456`
3. Preserved configs: `.replit`, `vite.config.ts`
4. Rebuilt application
5. Verified deployment

### Post-Rollback Actions:
- [ ] Monitor application metrics
- [ ] Verify user functionality  
- [ ] Update team on status
- [ ] Plan fix for original issue
```

This comprehensive rollback strategy guide provides safe and reliable procedures for recovering from deployment issues, code problems, or configuration errors while preserving critical project state.