# TypeScript Conventions

## Configuration
- **Strict mode**: Enabled
- **Module**: ESNext
- **Resolution**: bundler
- **Path aliases**: `@/*` → `client/src/*`, `@shared/*` → `shared/*`

## Import Order
1. External libraries
2. Internal components (@/ aliases)
3. Lazy imports for code splitting

## Key Patterns
- Functional components with TypeScript
- Type-safe props interfaces
- Async/await for promises
- Proper error types