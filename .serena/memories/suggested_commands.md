# Suggested Commands for Development

## Development Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build both client (Vite) and server (esbuild) for production
- `npm run build:analyze` - Build with bundle analyzer (generates stats.html)
- `npm start` - Start production server
- `npm run check` - TypeScript type checking

## Database Commands
- `npm run db:push` - Push schema changes using Drizzle
- `npm run db:migrate` - Push to Supabase database
- `npm run db:reset` - Reset Supabase database
- `npm run supabase:start` - Start local Supabase instance
- `npm run supabase:stop` - Stop local Supabase instance
- `npm run supabase:status` - Check Supabase status

## Testing Commands
- `npm run test` - Run tests in watch mode with Vitest
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:install` - Install Playwright browsers
- `npm run test:watch` - Run tests in watch mode
- `npm run test:changed` - Run tests for changed files only

## Utility Scripts
- `npm run session:init` - Initialize session (custom script)
- `npm run map:directory` - Map directory structure (custom script)

## Important Notes
- Uses Node.js 22.x (specified in engines)
- Environment variables required for DATABASE_URL
- Supabase integration for database and real-time features