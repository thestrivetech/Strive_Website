# Development Workflow and Conventions

## Code Style and Conventions
- **TypeScript**: Strict mode enabled, full type coverage required
- **ESM Modules**: Uses ES modules throughout (type: "module" in package.json)
- **Path Aliases**: 
  - `@/` maps to `client/src/`
  - `@shared/` maps to `shared/`
  - `@assets/` maps to `attached_assets/`

## Component Conventions
- **UI Components**: Located in `client/src/components/ui/` following shadcn/ui patterns
- **Lazy Loading**: Non-critical components and pages are lazy-loaded
- **Error Boundaries**: Wrapped around lazy-loaded components
- **TypeScript**: All components have proper TypeScript interfaces

## Database Conventions
- **Drizzle ORM**: Schema defined in `shared/schema.ts`
- **Supabase**: PostgreSQL backend with real-time capabilities
- **Migrations**: Use `npm run db:push` for schema changes

## Performance Optimizations
- **Bundle Splitting**: Manual chunks for vendor, UI, utils, etc.
- **Image Optimization**: Multiple formats and sizes in `assets/optimized/`
- **PWA**: Service workers with caching strategies
- **Compression**: Gzip compression enabled on server

## Testing Strategy
- **Unit Tests**: Vitest for component and utility testing
- **E2E Tests**: Playwright for end-to-end testing
- **Coverage**: Coverage reports available via Vitest

## Security Practices
- **Helmet**: Security headers configured
- **Rate Limiting**: API endpoints protected
- **Input Validation**: Express-validator for form inputs
- **Environment Variables**: Sensitive data in .env files
- **CORS**: Properly configured for production