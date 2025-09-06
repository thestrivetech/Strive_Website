# React Patterns

## Component Structure
- **UI**: `/client/src/components/ui/`
- **Layout**: `/client/src/components/layout/`
- **Pages**: `/client/src/pages/`
- **Hooks**: `/client/src/hooks/`

## Key Patterns
- Functional components only
- shadcn/ui for UI components
- React.lazy for route splitting (except Home)
- Suspense with PageSkeleton
- Custom hooks start with 'use'