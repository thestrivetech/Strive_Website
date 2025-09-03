# Strive Tech Website - Development Commands

## Core Development Commands

### Project Management
```bash
# Navigate to project directory
cd StriveSite

# Install dependencies
npm install

# Check TypeScript types
npm run check
```

### Development
```bash
# Start development server (runs both frontend and backend)
npm run dev
# Server runs on http://localhost:5000

# Build for production
npm run build

# Start production server
npm start
```

### Database Operations
```bash
# Push schema changes to database
npm run db:push

# Note: Requires DATABASE_URL environment variable
```

### Windows System Commands
```bash
# List files and directories
dir
dir /b    # Bare format (names only)

# Change directory
cd [directory]
cd ..     # Go up one level

# Create directory
mkdir [name]

# Remove directory
rmdir [name] /s /q

# Copy files
copy [source] [destination]

# Move/rename files
move [source] [destination]

# Delete files
del [filename]

# View file content
type [filename]

# Find text in files
findstr /s /i "search term" *.ts

# Clear console
cls

# Environment variables
set    # View all
echo %VARIABLE_NAME%    # View specific
```

### Git Commands
```bash
# Status and info
git status
git log --oneline -10

# Branching
git checkout -b feature/[name]
git checkout main

# Commit workflow
git add .
git commit -m "feat: description"

# Push changes
git push origin [branch]

# Pull latest
git pull origin main
```

### Testing Commands (when implemented)
```bash
# Run tests (placeholder - not yet implemented)
npm test

# Run specific test file
npm test -- [file]

# Coverage report
npm run test:coverage
```

### Process Management (Windows)
```bash
# List running processes
tasklist

# Kill process by name
taskkill /F /IM node.exe

# Check port usage
netstat -ano | findstr :5000
```

### Environment Setup
```bash
# Create .env file
echo DATABASE_URL=your_database_url > .env.local

# Check Node version
node --version

# Check npm version
npm --version
```

## Important Notes
- Always run commands from the StriveSite directory
- Development server runs on port 5000 by default
- Database URL must be configured in environment variables
- Use Windows command syntax (not Unix/Linux)