# Backend Conventions

## Express.js
- TypeScript with Express types
- Async route handlers
- `/api` prefix for all endpoints
- Proper error handling (try/catch)

## Database
- Drizzle ORM with PostgreSQL
- Type-safe queries
- Schema in `/shared/schema.ts`

## Security
- Helmet middleware
- Session-based auth (Passport)
- Rate limiting on APIs