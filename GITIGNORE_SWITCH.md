# GitIgnore Environment Switching Guide

This project includes different gitignore configurations for development and production environments.

## Files Created:
- `.gitignore` - Currently active gitignore (production mode)
- `.gitignore.dev` - Development environment gitignore (minimal excludes)
- `.gitignore.prod` - Production deployment gitignore (comprehensive excludes)

## Quick Switch Commands:

### Switch to Development Mode
```bash
# Allows chat_logs, prompts, dev files for continued development
cp .gitignore.dev .gitignore
```

### Switch to Production Mode
```bash
# Excludes all dev files for clean deployment to main branch
cp .gitignore.prod .gitignore
```

## What Each Mode Includes/Excludes:

### Development Mode (.gitignore.dev)
**Excludes (minimal):**
- `node_modules/`
- `.env` files
- `server/public/`
- Generated maps and cache

**Allows:**
- `chat_logs/` - Session logs and development notes
- `prompts/` - AI prompts and development assets
- `attached_assets/` - Development resources
- `.claude/` - Claude configuration
- Development documentation files
- Backup files for recovery

### Production Mode (.gitignore.prod) - CURRENT
**Excludes (comprehensive):**
- All development files and folders
- Session logs and chat history
- Temporary files and backups
- Development configurations
- Test files and migrations
- Build artifacts and logs

**Keeps only:**
- Source code (`client/`, `server/`, `shared/`)
- Essential configs (`package.json`, `tsconfig.json`)
- Production documentation
- Public assets
- Core scripts

## Usage Workflow:

1. **During Development:** Use `.gitignore.dev` to maintain session continuity
2. **Before Deployment:** Switch to `.gitignore.prod` for clean commits to main
3. **After Deployment:** Switch back to `.gitignore.dev` for continued development

## Current Status:
🟢 **Currently in PRODUCTION mode** - Ready for deployment to main branch