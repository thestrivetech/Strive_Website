# Code Architecture and Structure

## Project Structure
```
/
├── client/              # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── ui/      # Reusable UI components (shadcn/ui based)
│   │   │   ├── layout/  # Layout components (navigation, footer)
│   │   │   └── seo/     # SEO components
│   │   ├── pages/       # Route components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility libraries and configurations
│   │   ├── data/        # Static data and content
│   │   ├── types/       # TypeScript type definitions
│   │   └── assets/      # Images and static assets
├── server/              # Express.js backend
│   ├── routes/          # API route handlers
│   ├── middleware/      # Express middleware
│   └── lib/             # Server utilities
├── shared/              # Shared TypeScript types and schemas
├── supabase/           # Supabase configuration and migrations
├── public/             # Static public assets
└── scripts/            # Build and utility scripts
```

## Key Architectural Patterns

### Frontend Architecture
- **Component-based**: Uses React with TypeScript for type safety
- **Lazy Loading**: Pages and components are lazy-loaded for performance
- **Custom Hooks**: Centralized logic in custom hooks (useAuth, useSEO, etc.)
- **Path Aliases**: Uses `@/` for client src, `@shared/` for shared code
- **PWA Support**: Service workers for offline functionality

### Backend Architecture
- **Express.js**: RESTful API with Express middleware
- **Database**: PostgreSQL via Supabase with Drizzle ORM
- **Authentication**: Passport.js with local strategy + sessions
- **Security**: Helmet, rate limiting, CORS configured
- **Logging**: Winston for structured logging

### Database Schema
- Users table with authentication
- Contact submissions and requests
- Newsletter subscriptions
- Proper TypeScript types generated from Drizzle schema

### Build System
- **Vite**: Frontend bundling with optimizations
- **esbuild**: Server bundling for production
- **Code Splitting**: Manual chunks for vendor libraries, UI components, etc.
- **Asset Optimization**: Images optimized with different formats (webp, avif)