# Essential Development Commands

## Core Development Commands

### Development Server
```bash
npm run dev          # Start development server (Vite + Express on port 5000)
```
- Starts both frontend (Vite) and backend (Express) servers
- Hot reloading enabled for both client and server code
- Environment: NODE_ENV=development
- Access at: http://localhost:5000

### Build & Production
```bash
npm run build        # Build frontend with Vite and backend with esbuild
npm start            # Run production server
```
- `build`: Creates optimized production bundles for both frontend and backend
- `start`: Runs the production server with NODE_ENV=production

### Type Checking & Code Quality
```bash
npm run check        # Run TypeScript type checking across entire codebase
```
- Validates TypeScript across client/, server/, and shared/ directories
- Uses strict TypeScript configuration
- Essential to run before committing changes

### Database Operations
```bash
npm run db:push      # Push schema changes to database using Drizzle
```
- Syncs Drizzle schema changes to PostgreSQL database
- Use when modifying shared/schema.ts
- Requires DATABASE_URL environment variable

### Testing Commands
```bash
npm run test         # Run unit tests with Vitest
npm run test:run     # Run tests once and exit
npm run test:coverage # Run tests with coverage report
npm run test:ui      # Open Vitest UI for interactive testing
npm run test:watch   # Watch mode for continuous testing
npm run test:changed # Run tests for changed files only
npm run test:e2e     # Run Playwright end-to-end tests
npm run test:e2e:install # Install Playwright browsers
```

### Session Management
```bash
npm run session:init # Run automated workflow compliance checking
```
- Validates project structure and documentation compliance
- Checks workflow file organization
- Provides session start guidance

## System Commands (Linux/Replit Environment)

### File Operations
```bash
ls                   # List files and directories
ls -la              # List with detailed information including hidden files
find . -name "*.tsx" # Find TypeScript React files
find . -type f -name "pattern" # Find files matching pattern
```

### Text Search & Processing
```bash
rg "pattern"         # Search for text pattern in files (ripgrep - preferred)
rg -i "pattern"      # Case-insensitive search
rg "pattern" --type ts # Search only TypeScript files
grep -r "pattern" .  # Alternative text search (use rg instead when possible)
```

### Git Operations
```bash
git status           # Show working tree status
git add .            # Stage all changes
git commit -m "message" # Commit with message
git push             # Push to remote repository
git diff             # Show changes in working directory
git log --oneline    # Show commit history
```

### Process Management
```bash
ps aux               # Show running processes
pkill -f "node"      # Kill processes containing "node"
lsof -i :5000       # Show what's using port 5000
```

### Environment & System Info
```bash
node --version       # Check Node.js version
npm --version        # Check npm version
echo $NODE_ENV       # Check current environment
pwd                  # Show current directory
df -h                # Show disk usage
```

## Important Notes

### Port Configuration
- Development server runs on port 5000 (both frontend and backend)
- Vite dev server proxies API requests to Express backend
- No CORS issues in development due to Vite proxy configuration

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string for Neon database
- Node environment automatically set by npm scripts

### File System Organization
- **Never use `cat`, `head`, `tail`** - Use Read tool instead
- **Never use `find` or `grep` directly** - Use Grep, Glob, or Task tools
- **Prefer `rg` (ripgrep)** over `grep` for text searching
- Use absolute paths when possible to maintain directory context

### Development Workflow Best Practices
1. Always run `npm run check` before committing code changes
2. Use `npm run test:run` to validate functionality
3. Run `npm run db:push` after schema modifications
4. Use `npm run session:init` at the start of development sessions