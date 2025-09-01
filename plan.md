# Next.js Migration Plan

## Overview
This document outlines the complete migration from React + Vite + Express to Next.js while preserving all existing functionality and maintaining the PostgreSQL database integration.

## Current Architecture
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + Radix UI
- **Routing**: Wouter (client-side)
- **State Management**: TanStack Query

## Target Architecture
- **Frontend**: Next.js 14+ (App Router) + React + TypeScript
- **Backend**: Next.js API Routes + Express.js (hybrid approach)
- **Database**: PostgreSQL with Drizzle ORM (unchanged)
- **Styling**: Tailwind CSS + Radix UI (unchanged)
- **Routing**: Next.js App Router
- **State Management**: TanStack Query (unchanged)

## Migration Strategy

### Phase 1: Project Setup and Configuration

#### Step 1.1: Install Next.js Dependencies
```bash
npm install next@latest react@latest react-dom@latest
npm install -D @types/node
```

#### Step 1.2: Create Next.js Configuration
Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    domains: [],
  },
}

module.exports = nextConfig
```

#### Step 1.3: Update TypeScript Configuration
Modify `tsconfig.json` for Next.js:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["./shared/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Step 1.4: Update Package Scripts
Modify `package.json` scripts:
```json
{
  "scripts": {
    "dev": "next dev -p 5000",
    "build": "next build",
    "start": "next start -p 5000",
    "lint": "next lint",
    "db:push": "drizzle-kit push"
  }
}
```

### Phase 2: Directory Structure Reorganization

#### Step 2.1: Create Next.js App Directory Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   ├── solutions/
│   │   ├── page.tsx
│   │   ├── healthcare/
│   │   │   └── page.tsx
│   │   ├── financial/
│   │   │   └── page.tsx
│   │   └── [other solution pages]/
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── resources/
│   │   └── page.tsx
│   ├── get-started/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── cookies/
│   │   └── page.tsx
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── newsletter/
│   │   │   └── route.ts
│   │   └── [other api routes]/
│   └── not-found.tsx
├── components/
│   ├── layout/
│   ├── ui/
│   └── [existing components]
├── lib/
├── hooks/
└── [other existing directories]
```

#### Step 2.2: Move and Restructure Files
- Move `client/src/*` to `src/`
- Convert existing pages to Next.js page components
- Migrate components to use Next.js conventions

### Phase 3: Component Migration

#### Step 3.1: Create Root Layout
Create `src/app/layout.tsx`:
```tsx
import { QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import FloatingChat from '@/components/ui/floating-chat'
import { queryClient } from '@/lib/queryClient'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />
              <main>{children}</main>
              <Footer />
              <FloatingChat />
            </div>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

#### Step 3.2: Convert Pages to Next.js Format
Transform each page component:
- Remove Wouter routing dependencies
- Update imports to use Next.js conventions
- Convert to Next.js page components

Example for `src/app/page.tsx` (Home):
```tsx
import Home from '@/components/pages/home'

export default function HomePage() {
  return <Home />
}
```

#### Step 3.3: Update Navigation Component
Modify navigation to use Next.js Link:
```tsx
import Link from 'next/link'
// Replace Wouter Link with Next.js Link
```

### Phase 4: API Routes Migration

#### Step 4.1: Create Next.js API Routes
Convert Express routes to Next.js API routes:

Example `src/app/api/contact/route.ts`:
```tsx
import { NextRequest, NextResponse } from 'next/server'
import { insertContactSubmission } from '@/lib/contact'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await insertContactSubmission(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

#### Step 4.2: Database Integration
- Keep existing Drizzle ORM setup
- Update database connection for Next.js environment
- Maintain existing schema and migrations

#### Step 4.3: Session Management
Convert Express sessions to Next.js approach:
- Use next-auth for authentication
- Or implement custom session handling with cookies

### Phase 5: Styling and Assets

#### Step 5.1: Update Tailwind Configuration
Modify `tailwind.config.ts` for Next.js:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Your existing theme extensions
    },
  },
  plugins: [
    // Your existing plugins
  ],
}
export default config
```

#### Step 5.2: Move Assets
- Move `attached_assets/` to `public/` directory
- Update asset references to use Next.js Image component where appropriate

### Phase 6: State Management and Data Fetching

#### Step 6.1: Update TanStack Query Setup
Create client component wrapper for providers:
```tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

#### Step 6.2: Server Components vs Client Components
- Identify components that need 'use client' directive
- Optimize data fetching with Server Components where possible
- Keep existing TanStack Query for client-side state

### Phase 7: Deployment Configuration

#### Step 7.1: Update Replit Configuration
Modify deployment settings for Next.js:
```toml
[deployment]
deploymentTarget = "autoscale"
run = ["npm", "start"]
```

#### Step 7.2: Environment Variables
- Ensure DATABASE_URL and other env vars are properly configured
- Update any environment-specific configurations

### Phase 8: Testing and Validation

#### Step 8.1: Feature Testing Checklist
- [ ] All pages render correctly
- [ ] Navigation works properly
- [ ] API endpoints function as expected
- [ ] Database operations work
- [ ] Contact forms submit successfully
- [ ] Newsletter subscription works
- [ ] Authentication flows (if implemented)
- [ ] Responsive design maintained
- [ ] SEO meta tags properly set

#### Step 8.2: Performance Optimization
- Implement Next.js Image optimization
- Add proper loading states
- Optimize bundle size
- Configure caching strategies

### Phase 9: Migration Execution Steps

#### Step 9.1: Pre-Migration Backup
1. Create a backup of current codebase
2. Document current functionality
3. Test all existing features

#### Step 9.2: Gradual Migration
1. **Day 1-2**: Setup Next.js configuration and directory structure
2. **Day 3-4**: Migrate core layout and navigation components
3. **Day 5-6**: Convert all page components
4. **Day 7-8**: Migrate API routes and database integration
5. **Day 9-10**: Update styling and asset references
6. **Day 11-12**: Implement state management and data fetching
7. **Day 13-14**: Testing, debugging, and optimization

#### Step 9.3: Post-Migration Tasks
1. Update documentation
2. Remove unused dependencies
3. Clean up old files
4. Update deployment configuration
5. Performance testing and optimization

### Phase 10: Rollback Plan

#### Step 10.1: Rollback Strategy
- Keep original codebase in separate branch
- Document rollback procedures
- Test rollback process before migration

#### Step 10.2: Risk Mitigation
- Feature flags for gradual rollout
- Database backup before schema changes
- Monitoring and alerting setup

## Dependencies to Remove
- `wouter` (replaced by Next.js routing)
- `vite` and related plugins (replaced by Next.js build system)
- `@vitejs/plugin-react`
- Vite-specific configurations

## Dependencies to Add
- `next`
- `@next/font` (if using custom fonts)
- `next-auth` (if implementing authentication)

## Benefits of Migration
1. **SEO Improvements**: Server-side rendering and static generation
2. **Performance**: Automatic code splitting and optimization
3. **Developer Experience**: Better tooling and conventions
4. **Production Ready**: Built-in optimization and deployment features
5. **Future Proof**: Aligned with React ecosystem direction

## Timeline Estimate
- **Total Duration**: 2-3 weeks
- **Development**: 10-14 days
- **Testing**: 3-4 days
- **Deployment**: 1-2 days

## Success Metrics
- All existing functionality preserved
- Page load times improved by 20%+
- SEO scores improved
- Developer productivity maintained or improved
- Zero downtime deployment achieved

---

This migration plan ensures a systematic approach to converting your React + Vite + Express application to Next.js while maintaining all existing functionality and improving performance and SEO capabilities.