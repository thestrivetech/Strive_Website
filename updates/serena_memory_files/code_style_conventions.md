# Code Style and Conventions

## TypeScript Guidelines
- **Strict mode enabled** - All TypeScript strict checks active
- Use explicit type annotations for function parameters and returns
- Prefer interfaces over types for object definitions
- Use const assertions where appropriate
- Avoid `any` type - use `unknown` if type is truly unknown

## React Patterns
- **Functional components only** - No class components
- Use hooks for all state and effects
- Custom hooks in `src/hooks/` directory
- Proper dependency arrays in useEffect
- Memoization with React.memo, useMemo, useCallback for performance

## File Naming Conventions
- **Components**: PascalCase (Button.tsx, HeroSection.tsx)
- **Utilities**: camelCase (utils.ts, queryClient.ts)
- **Constants**: UPPER_SNAKE_CASE
- **Pages**: lowercase with hyphens (get-started.tsx)
- **Styles**: kebab-case for CSS classes

## Import Organization
```typescript
// 1. External libraries
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal absolute imports
import { Button } from '@/components/ui/button';

// 3. Relative imports
import { utils } from './lib/utils';
```

## Component Structure
```typescript
interface ComponentProps {
  // Props interface definition
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks first
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div>
      {/* JSX content */}
    </div>
  );
}
```

## API Patterns
- RESTful endpoint naming
- Type-safe with Zod schemas for validation
- Consistent error handling
- Authentication middleware usage

## Database Conventions
- UUID primary keys
- Timestamp tracking (created_at, updated_at)
- Snake_case for column names
- Drizzle ORM for all database operations

## Comments
- Add clear summaries for complex logic
- Document component props with JSDoc
- Explain non-obvious business rules
- Keep comments concise and relevant

## Git Commit Messages
- Format: `type: description`
- Types: feat, fix, docs, style, refactor, test, chore
- Keep under 50 characters
- Use present tense

## Testing (when implemented)
- Test-driven development (TDD) approach
- Unit tests for utilities
- Integration tests for API endpoints
- E2E tests for critical user flows

## Performance Best Practices
- Lazy loading for routes
- Image optimization
- Code splitting
- Minimize bundle size
- Use React DevTools profiler

## Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatibility
- WCAG 2.1 AA compliance