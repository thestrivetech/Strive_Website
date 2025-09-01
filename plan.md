# Next.js Migration Plan

## Overview
This document outlines the complete migration from React + Vite to Next.js frontend while maintaining a separate Express.js backend and migrating from PostgreSQL to Supabase.

## Current Architecture
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + Radix UI
- **Routing**: Wouter (client-side)
- **State Management**: TanStack Query

## Target Architecture
- **Frontend**: Next.js 14+ (App Router) + React + TypeScript
- **Backend**: Express.js + TypeScript (separate from Next.js)
- **Database**: Supabase PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + Radix UI (unchanged)
- **Routing**: Next.js App Router
- **State Management**: TanStack Query (unchanged)

## Migration Strategy

### Phase 1: Supabase Database Setup

#### Step 1.1: Install Supabase Dependencies
```bash
npm install @supabase/supabase-js
npm uninstall @neondatabase/serverless
```

#### Step 1.2: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create new project
2. Get your project URL and anon key from project settings
3. Add environment variables to Replit Secrets:
   - `SUPABASE_URL`: Your project URL
   - `SUPABASE_ANON_KEY`: Your anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Service role key (for server operations)

#### Step 1.3: Update Database Configuration
Update `drizzle.config.ts`:
```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL!,
  },
});
```

Update `server/storage.ts`:
```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.SUPABASE_DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);
```

### Phase 2: Frontend Migration to Next.js

#### Step 2.1: Create New Next.js Frontend
```bash
mkdir frontend
cd frontend
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

#### Step 2.2: Install Dependencies for Frontend
```bash
cd frontend
npm install @tanstack/react-query @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip class-variance-authority clsx cmdk date-fns embla-carousel-react framer-motion input-otp lucide-react next-themes react-day-picker react-hook-form react-icons react-resizable-panels recharts tailwind-merge tailwindcss-animate vaul zod @hookform/resolvers zod-validation-error
```

#### Step 2.3: Update Next.js Configuration
Create `frontend/next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/api/:path*',
      },
    ]
  },
  images: {
    domains: [],
  },
}

module.exports = nextConfig
```

#### Step 2.4: Update Package Scripts for Frontend
Create `frontend/package.json` scripts:
```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint"
  }
}
```

### Phase 3: Directory Structure Reorganization

#### Step 3.1: New Project Structure
```
project-root/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── portfolio/
│   │   │   │   └── page.tsx
│   │   │   ├── solutions/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── healthcare/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [other solution pages]/
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── [other pages]/
│   │   ├── components/
│   │   ├── lib/
│   │   └── hooks/
│   ├── public/
│   │   └── [assets moved from attached_assets/]
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   └── storage.ts
│   ├── package.json
│   └── tsconfig.json
├── shared/
│   └── schema.ts
└── package.json (root - for workspace management)
```

#### Step 3.2: Move Files to New Structure
- Move `client/src/components/*` to `frontend/src/components/`
- Move `client/src/pages/*` to `frontend/src/app/` (convert to Next.js pages)
- Move `server/*` to `backend/src/`
- Move `attached_assets/*` to `frontend/public/`

### Phase 4: Backend Updates

#### Step 4.1: Update Backend for Standalone Operation
Update `backend/src/index.ts`:
```typescript
import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";

const app = express();

// CORS for frontend on port 3000
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });
  
  next();
});

// Register API routes
registerRoutes(app);

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

const port = parseInt(process.env.PORT || '5001', 10);
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend API serving on port ${port}`);
});
```

#### Step 4.2: Update Backend Package.json
Create `backend/package.json`:
```json
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development tsx src/index.ts",
    "build": "esbuild src/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "express": "^4.21.2",
    "cors": "^2.8.5",
    "drizzle-orm": "^0.39.1",
    "postgres": "^3.4.4",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "20.16.11",
    "esbuild": "^0.25.9",
    "drizzle-kit": "^0.30.4",
    "tsx": "^4.20.5",
    "typescript": "^5.6.3"
  }
}
```

### Phase 5: Frontend Component Migration

#### Step 5.1: Create Root Layout
Create `frontend/src/app/layout.tsx`:
```tsx
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import FloatingChat from '@/components/ui/floating-chat'
import { useState } from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())

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

#### Step 5.2: Convert Pages to Next.js Format
Transform each page component. Example for `frontend/src/app/page.tsx`:
```tsx
import Home from '@/components/pages/home'

export default function HomePage() {
  return <Home />
}
```

#### Step 5.3: Update Navigation Component
Update navigation to use Next.js Link:
```tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// Replace wouter imports and useLocation with usePathname
```

### Phase 6: API Integration

#### Step 6.1: Create API Client for Frontend
Create `frontend/src/lib/api.ts`:
```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com' 
  : 'http://localhost:5001'

export async function apiRequest(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
    ...options,
  })
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }
  
  return response.json()
}
```

#### Step 6.2: Update TanStack Query Hooks
Update all query hooks to use the new API client:
```typescript
import { apiRequest } from '@/lib/api'

export function useContactSubmission() {
  return useMutation({
    mutationFn: (data: ContactFormData) => 
      apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  })
}
```

### Phase 7: Deployment Configuration

#### Step 7.1: Update Root Package.json for Workspace Management
Create root `package.json`:
```json
{
  "name": "fullstack-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "build": "npm run build:backend && npm run build:frontend",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    "start": "concurrently \"npm run start:backend\" \"npm run start:frontend\"",
    "start:backend": "cd backend && npm run start",
    "start:frontend": "cd frontend && npm run start"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

#### Step 7.2: Update Replit Configuration
Update `.replit`:
```toml
modules = ["nodejs-20", "web", "bash"]
run = "npm run dev"

[deployment]
deploymentTarget = "autoscale"
run = ["npm", "start"]

[[ports]]
localPort = 3000
externalPort = 80

[[ports]]
localPort = 5001
externalPort = 5001

[env]
PORT = "5001"
FRONTEND_PORT = "3000"
```

### Phase 8: Environment Configuration

#### Step 8.1: Environment Variables Setup
Backend `.env` (use Replit Secrets):
```
SUPABASE_DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=development
```

Frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### Phase 9: Migration Execution Steps

#### Step 9.1: Pre-Migration Backup
1. Create backup branch: `git checkout -b backup-vite-setup`
2. Commit current state
3. Create migration branch: `git checkout -b migrate-to-nextjs`

#### Step 9.2: Day-by-Day Migration Plan
1. **Day 1**: Setup Supabase database and migrate data
2. **Day 2**: Create Next.js frontend structure
3. **Day 3**: Migrate components to Next.js
4. **Day 4**: Setup standalone Express backend
5. **Day 5**: Update API integration and routing
6. **Day 6**: Test integration between frontend and backend
7. **Day 7**: Update deployment configuration
8. **Day 8**: Final testing and optimization

#### Step 9.3: Testing Checklist
- [ ] Frontend renders on localhost:3000
- [ ] Backend API responds on localhost:5001
- [ ] API calls from frontend to backend work
- [ ] Database operations function correctly
- [ ] All pages accessible via Next.js routing
- [ ] Forms submit successfully
- [ ] Authentication flows work
- [ ] Deployment configuration works

### Phase 10: Database Migration to Supabase

#### Step 10.1: Export Current Data
```bash
# Export from current PostgreSQL
pg_dump $DATABASE_URL > backup.sql
```

#### Step 10.2: Import to Supabase
1. Use Supabase dashboard SQL editor
2. Run the schema migration
3. Import data using Supabase tools

#### Step 10.3: Update Connection Strings
- Replace all PostgreSQL connection strings with Supabase URLs
- Update environment variables

## Benefits of This Architecture
1. **Separation of Concerns**: Frontend and backend can be developed independently
2. **Scalability**: Each service can be scaled separately
3. **Modern Stack**: Latest Next.js with proven Express.js backend
4. **Supabase Features**: Real-time subscriptions, built-in auth, file storage
5. **Deployment Flexibility**: Can deploy frontend and backend to different services if needed

## Timeline Estimate
- **Total Duration**: 1-2 weeks
- **Development**: 8-10 days
- **Testing**: 2-3 days
- **Deployment**: 1-2 days

## Success Metrics
- Frontend loads on port 3000
- Backend API responds on port 5001
- All existing functionality preserved
- Database operations work with Supabase
- Deployment successful on Replit

---

This migration plan provides a clear path to separate your frontend and backend while using modern technologies and Supabase as your database solution.