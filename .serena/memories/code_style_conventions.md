# Code Style and Conventions

## TypeScript Configuration

### Strict TypeScript Settings
- **Strict mode enabled**: All strict TypeScript checks active
- **ESNext module syntax**: Modern ES modules throughout
- **No emit**: TypeScript used only for type checking, not compilation
- **Module resolution**: "bundler" for modern build tools
- **Incremental compilation**: Enabled for faster builds

### Path Aliases
```typescript
"paths": {
  "@/*": ["./client/src/*"],      // Frontend source code
  "@shared/*": ["./shared/*"]     // Shared types and schemas
}
```

### Import Conventions
```typescript
// External libraries first
import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

// Internal components with path aliases
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth";

// Lazy imports for code splitting
const Navigation = lazy(() => import("@/components/layout/navigation"));
```

## React Component Conventions

### Functional Components with TypeScript
```typescript
// Always use functional components with TypeScript
function ComponentName({ prop1, prop2 }: ComponentProps) {
  return <div>Content</div>;
}

// Export as default when single component per file
export default ComponentName;
```

### Component Organization
- **UI Components**: Located in `client/src/components/ui/`
- **Layout Components**: Located in `client/src/components/layout/`
- **Page Components**: Located in `client/src/pages/`
- **Custom Hooks**: Located in `client/src/hooks/`
- **Utilities**: Located in `client/src/lib/`

### shadcn/ui Component Usage
```typescript
// Always use shadcn/ui components when available
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Follow shadcn/ui patterns for component composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Performance Optimization Patterns

### Code Splitting with React.lazy
```typescript
// Lazy load route components (except Home page)
const Portfolio = lazy(() => import("@/pages/portfolio"));
const Solutions = lazy(() => import("@/pages/solutions"));

// Wrap in Suspense with loading fallback
<Suspense fallback={<PageSkeleton />}>
  <Portfolio />
</Suspense>
```

### Loading States
- Always provide loading states for async operations
- Use `PageSkeleton` component for route-level loading
- Use shadcn/ui `Skeleton` for component-level loading

## Express.js Backend Conventions

### Route Structure
```typescript
// Use TypeScript with Express
import express, { type Request, Response, NextFunction } from "express";

// Async route handlers with proper error handling
app.get('/api/endpoint', async (req: Request, res: Response) => {
  try {
    // Route logic
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
```

### Security Middleware
- Always apply security middleware first
- Use Helmet for security headers
- Trust proxy setting for Replit environment
- Rate limiting and validation on API endpoints

### Database Integration
```typescript
// Use Drizzle ORM with proper typing
import { db } from '@/lib/db';
import { usersTable } from '@shared/schema';

// Type-safe database operations
const users = await db.select().from(usersTable);
```

## Styling Conventions

### Tailwind CSS Usage
```typescript
// Use Tailwind utility classes
className="flex items-center justify-between p-4 bg-background text-foreground"

// Use CSS variables for theme consistency
className="bg-primary text-primary-foreground"

// Responsive design with mobile-first approach
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Component Styling
- Use `clsx` or `cn` utility for conditional classes
- Follow shadcn/ui theming system
- Use CSS variables defined in globals.css
- Responsive by default with mobile-first approach

## Error Handling

### Frontend Error Boundaries
```typescript
// Use ErrorBoundary component for React error handling
<ErrorBoundary fallback={<ErrorFallback />}>
  <ComponentTree />
</ErrorBoundary>
```

### Backend Error Handling
```typescript
// Consistent error response format
res.status(statusCode).json({
  error: 'Error message',
  details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
});
```

## File Naming Conventions

### File Extensions
- `.tsx` for React components
- `.ts` for TypeScript utilities and backend code
- `.css` for global styles (minimal usage)

### Naming Patterns
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: kebab-case (e.g., `solutions/ai-automation.tsx`)
- **Utilities**: camelCase (e.g., `queryClient.ts`)
- **Hooks**: camelCase starting with `use` (e.g., `useAuth.ts`)

## Testing Conventions

### Unit Testing with Vitest
```typescript
// Use Vitest for unit tests
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### E2E Testing with Playwright
- Use Playwright for end-to-end testing
- Test critical user journeys
- Validate form submissions and API interactions

## Documentation Standards

### Code Comments
- **Avoid unnecessary comments** unless code is complex
- **Document business logic** and non-obvious implementations
- **Use JSDoc** for exported functions and components
- **Document API endpoints** with parameter and response types

### README and Documentation
- Keep documentation current with code changes
- Document environment setup and deployment procedures
- Maintain change log for significant modifications
- Update CLAUDE.md with any architectural changes

## Git Commit Conventions

### Commit Message Format
```
feat: add new user authentication system
fix: resolve navigation dropdown issue
refactor: optimize component lazy loading
docs: update API documentation
chore: update dependencies
```

### Branch Strategy
- Use descriptive branch names
- Keep commits focused and atomic
- Always test before committing
- Run `npm run check` before pushing