# 🚀 Next.js Full-Stack Rebuild: Professional Development Prompt

## 🎯 Project Overview
You are Claude, an expert full-stack developer tasked with rebuilding the Strive Tech website from scratch using modern best practices. The goal is to create a world-class, scalable platform that serves both the company's marketing needs and future client portal/admin dashboard functionality.

## 📋 Project Context & Current Directory Structure
- **Company**: Strive Tech (AI solutions and intelligent assistant platform)
- **Current State**: Legacy codebase moved to `/old` folder for reference
- **Planning Documents**: Located in `/docs` folder
- **Current Directory**: Contains `.claude`, `.serena`, `.vercel` config folders
- **Goal**: Complete Next.js rebuild with enterprise-grade architecture
- **Timeline**: 4-6 weeks for core platform, iterative feature development

## 🏗️ Technology Stack (REQUIRED)

### Core Framework
- **Next.js 14+** with App Router (NOT Pages Router)
- **React 18+** with Server Components
- **TypeScript** for all code (strict mode)
- **Tailwind CSS** for styling with shadcn/ui components

### Backend & Database
- **Supabase** for database, auth, and real-time features
- **Prisma** as the ORM (with Supabase PostgreSQL)
- **Next.js API Routes** for server-side logic

### Deployment & Services
- **Vercel** for hosting and deployment
- **Stripe** for payment processing and subscriptions
- **Resend** for transactional emails

### Authentication & Security
- **Supabase Auth** (NO other auth systems)
- **Row-Level Security (RLS)** for multi-tenant data isolation
- **TypeScript strict mode** for type safety

## 🎨 Architecture Requirements

### New Project Structure (MUST CREATE)
```
/ (current directory with .claude, .serena, .vercel)
├── strive-website-nextjs/      # NEW Next.js application folder
│   ├── README.md
│   ├── next.config.js
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── .env.local
│   ├── .env.example
│   ├── .gitignore
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── (auth)/            # Auth route groups
│   │   │   │   ├── sign-in/
│   │   │   │   ├── sign-up/
│   │   │   │   └── onboarding/
│   │   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   │   ├── dashboard/
│   │   │   │   ├── profile/
│   │   │   │   ├── settings/
│   │   │   │   └── layout.tsx
│   │   │   ├── (marketing)/       # Public marketing pages
│   │   │   │   ├── about/
│   │   │   │   ├── solutions/
│   │   │   │   ├── industries/
│   │   │   │   ├── contact/
│   │   │   │   ├── pricing/
│   │   │   │   └── layout.tsx
│   │   │   ├── api/               # API routes
│   │   │   │   ├── auth/
│   │   │   │   ├── stripe/
│   │   │   │   ├── contact/
│   │   │   │   └── health/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx           # Homepage
│   │   ├── components/            # Reusable components
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── forms/            # Form components
│   │   │   ├── layouts/          # Layout components
│   │   │   ├── marketing/        # Marketing-specific components
│   │   │   └── dashboard/        # Dashboard components
│   │   ├── lib/                  # Utilities and configurations
│   │   │   ├── supabase/         # Supabase client and utilities
│   │   │   │   ├── client.ts     # Client-side Supabase
│   │   │   │   ├── server.ts     # Server-side Supabase
│   │   │   │   └── middleware.ts # Auth middleware
│   │   │   ├── prisma.ts         # Prisma client
│   │   │   ├── stripe.ts         # Stripe configuration
│   │   │   ├── email.ts          # Email utilities
│   │   │   ├── utils.ts          # General utilities
│   │   │   └── validations/      # Zod schemas
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── use-auth.ts
│   │   │   ├── use-subscription.ts
│   │   │   └── use-local-storage.ts
│   │   ├── types/                # TypeScript type definitions
│   │   │   ├── auth.ts
│   │   │   ├── database.ts
│   │   │   └── stripe.ts
│   │   ├── constants/            # App constants
│   │   │   ├── routes.ts
│   │   │   ├── navigation.ts
│   │   │   └── subscription-plans.ts
│   │   └── styles/               # Additional styles
│   ├── public/                   # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── favicon.ico
│   └── components.json           # shadcn/ui config
├── old/                          # Legacy codebase (reference only)
├── docs/                         # Planning documents and analysis
│   ├── nextjs-rebuild-prompt.md
│   ├── database-schema.md
│   ├── migration-plan.md
│   └── codebase-critique.md
├── .claude/                      # Keep existing Claude configs
├── .serena/                      # Keep existing Serena configs
└── .vercel/                      # Keep existing Vercel configs
```

### Code Quality Standards (NON-NEGOTIABLE)
- **Every file must be TypeScript** (.ts/.tsx)
- **All components must be functional** (no class components)
- **Server Components by default**, Client Components only when needed
- **Proper error boundaries** for all async operations
- **Loading states** for all data fetching
- **Responsive design** for all components (mobile-first)
- **Accessibility** compliance (WCAG 2.1 AA)

## 🔧 Development Guidelines

### Claude Code Best Practices

1. **Always use Server Components first**
   ```tsx
   // ✅ Good - Server Component by default
   export default async function Page() {
     const data = await fetch('...')
     return <div>{data}</div>
   }
   ```

2. **Client Components only when necessary**
   ```tsx
   // ✅ Good - Client Component for interactivity
   'use client'
   import { useState } from 'react'
   
   export function InteractiveComponent() {
     const [state, setState] = useState('')
     // Interactive logic here
   }
   ```

3. **Proper error handling with try-catch**
   ```tsx
   // ✅ Good - Proper error handling
   try {
     const { data, error } = await supabase.from('table').select()
     if (error) throw error
     return data
   } catch (error) {
     console.error('Database error:', error)
     throw new Error('Failed to fetch data')
   }
   ```

4. **Type-safe database operations**
   ```tsx
   // ✅ Good - Type-safe with Prisma
   const user = await prisma.user.findUnique({
     where: { id: userId },
     include: { organization: true }
   })
   ```

5. **Consistent component structure**
   ```tsx
   // ✅ Good - Consistent structure
   interface ComponentProps {
     title: string
     children: React.ReactNode
     className?: string
   }
   
   export function Component({ title, children, className }: ComponentProps) {
     return (
       <div className={cn("space-y-4", className)}>
         <h1 className="text-2xl font-bold">{title}</h1>
         {children}
       </div>
     )
   }
   ```

### File Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)
- **Hooks**: camelCase starting with 'use' (`useAuth.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **Types**: PascalCase (`User.ts` or in `types/index.ts`)

### Import Organization (STRICT ORDER)
```tsx
// ✅ Good - Organized imports
// 1. React/Next.js imports
import { Suspense } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// 2. Third-party imports
import { Button } from '@/components/ui/button'
import { createServerClient } from '@supabase/ssr'

// 3. Internal imports
import { supabase } from '@/lib/supabase/server'
import type { User } from '@/types/auth'

// 4. Relative imports
import './styles.css'
```

## 📱 Migration Strategy from Legacy Codebase

### Phase 1: Project Initialization (Day 1-2)
```bash
# Create the new Next.js project inside current directory
npx create-next-app@latest strive-website-nextjs --typescript --tailwind --eslint --app --src-dir

# Navigate to the new project
cd strive-website-nextjs

# Install essential dependencies
npm install @supabase/supabase-js @supabase/ssr prisma @prisma/client
npm install stripe @stripe/stripe-js
npm install @hookform/resolvers react-hook-form zod
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install resend

# Install UI components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label textarea toast dropdown-menu dialog

# Set up Prisma
npx prisma init
```

### Phase 2: Content Analysis & Migration (Day 3-5)
1. **Analyze `/old` folder** for:
   - Existing page content and structure
   - Component functionality and design patterns
   - API endpoints and data models
   - Styling and responsive breakpoints
   - Forms and user interactions

2. **Reference `/docs` folder** for:
   - Database schema requirements
   - Migration planning documents
   - Architecture decisions
   - Feature specifications

3. **Create content inventory**:
   - Homepage hero sections and content
   - Solutions/Tools page structure
   - About page company information
   - Contact form requirements
   - Industry-specific content

### Phase 3: Core Implementation (Week 1)
1. **Set up authentication flow** with Supabase
2. **Implement basic layout** and navigation
3. **Create homepage** with hero section and key components
4. **Build Solutions/Tools page** with filtering and search
5. **Add Contact page** with working form

### Phase 4: Advanced Features (Week 2-3)
1. **Database schema implementation**
2. **User dashboard and onboarding**
3. **Stripe integration for billing**
4. **Admin panel basic structure**
5. **Performance optimization**

### Phase 5: Polish & Launch (Week 4)
1. **SEO optimization** with Next.js metadata
2. **Accessibility audit** and fixes
3. **Performance testing** and Core Web Vitals
4. **Mobile responsiveness** final checks
5. **Deployment to Vercel**

## 🔍 Legacy Code Reference Guidelines

When analyzing the `/old` folder:

### ✅ EXTRACT (Good to reference):
- **Content and copy** - Reuse marketing copy, company descriptions
- **Design patterns** - Color schemes, typography, spacing
- **User flows** - Navigation patterns, form structures
- **Feature requirements** - What functionality exists
- **API data structures** - What data models are needed

### ❌ AVOID (Don't copy directly):
- **Code implementation** - Always rewrite, never copy-paste
- **File structure** - Use modern Next.js App Router structure
- **Dependencies** - Use only modern, necessary packages
- **Authentication logic** - Use Supabase Auth only
- **Build configuration** - Use Next.js defaults with minimal config

### Example Analysis Process:
```tsx
// Step 1: Analyze old component purpose
// Old: /old/client/src/components/SolutionsGrid.jsx
// Purpose: Display filterable grid of company solutions
// Features: Category filtering, industry filtering, modal details

// Step 2: Plan modern implementation
interface Solution {
  id: string
  title: string
  description: string
  category: SolutionCategory
  industries: string[]
  features: string[]
}

// Step 3: Implement with modern patterns
export async function SolutionsGrid() {
  const solutions = await getSolutions() // Server Component
  
  return (
    <div className="space-y-8">
      <SolutionFilters /> {/* Client Component for interactivity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>
    </div>
  )
}
```

## 🛠️ Essential Environment Setup

Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ[anon-key]
SUPABASE_SERVICE_ROLE_KEY=eyJ[service-role-key]

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Strive Tech"
```

Create `.env.example`:
```env
# Copy this to .env.local and fill in your values

# Database
DATABASE_URL="your_supabase_database_url"
DIRECT_URL="your_supabase_direct_url"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

# Email
RESEND_API_KEY="your_resend_api_key"

# App Configuration  
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Strive Tech"
```

## 📦 Essential Package.json Configuration

```json
{
  "name": "strive-website-nextjs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@supabase/supabase-js": "^2.45.0",
    "@supabase/ssr": "^0.4.0",
    "prisma": "^5.17.0",
    "@prisma/client": "^5.17.0",
    "stripe": "^16.8.0",
    "@stripe/stripe-js": "^4.1.0",
    "react-hook-form": "^7.52.1",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8",
    "lucide-react": "^0.424.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "resend": "^3.5.0"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "@types/node": "^20.14.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.7",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5",
    "tsx": "^4.16.2"
  }
}
```

## 🎯 Key Deliverables by Week

### Week 1 Deliverables:
- [ ] Next.js project created in `/strive-website-nextjs/`
- [ ] Supabase + Prisma integration working
- [ ] Basic authentication flow implemented
- [ ] shadcn/ui components installed and configured
- [ ] Responsive layout with navigation
- [ ] Homepage hero section recreated
- [ ] Contact form with email integration

### Week 2 Deliverables:
- [ ] Solutions/Tools page with filtering functionality
- [ ] About page with company information
- [ ] User registration and onboarding flow
- [ ] Database schema for core entities
- [ ] Admin dashboard basic structure
- [ ] SEO optimization with Next.js metadata

### Week 3-4 Deliverables:
- [ ] Stripe integration for subscriptions
- [ ] Client portal dashboard
- [ ] Content management capabilities  
- [ ] Performance optimization (90+ Lighthouse score)
- [ ] Mobile responsiveness perfected
- [ ] Security audit completed

## ⚠️ Critical Implementation Rules

### MUST-HAVES:
1. **TypeScript strict mode** - No `any` types allowed
2. **Server Components first** - Client components only when needed
3. **Proper error handling** - Every async operation wrapped in try-catch
4. **Loading states** - All data fetching shows loading UI
5. **Responsive design** - Mobile-first approach for everything
6. **Accessibility** - Proper ARIA labels and keyboard navigation
7. **Performance** - Core Web Vitals optimization from day one
8. **Security** - Input validation and sanitization everywhere

### NEVER DO:
- ❌ Don't use class components
- ❌ Don't mix multiple auth systems  
- ❌ Don't put business logic in React components
- ❌ Don't skip TypeScript types
- ❌ Don't ignore accessibility requirements
- ❌ Don't copy-paste from `/old` folder
- ❌ Don't use `any` or `@ts-ignore`
- ❌ Don't commit sensitive data or API keys

## 🤖 Claude-Specific Implementation Instructions

### When Starting a New Component:

1. **Define the interface first**:
   ```tsx
   interface ComponentProps {
     // Define all props with proper types
     title: string
     optional?: boolean
     children?: React.ReactNode
     className?: string
   }
   ```

2. **Choose Server vs Client Component**:
   ```tsx
   // Server Component (default)
   export async function ServerComponent() {
     const data = await fetch('...')
     return <div>{data}</div>
   }
   
   // Client Component (when needed)
   'use client'
   export function ClientComponent() {
     const [state, setState] = useState()
     return <div>{state}</div>
   }
   ```

3. **Implement with error handling**:
   ```tsx
   export async function DataComponent() {
     try {
       const data = await getData()
       return <div>{data}</div>
     } catch (error) {
       return <div>Error loading data</div>
     }
   }
   ```

4. **Add loading states**:
   ```tsx
   import { Suspense } from 'react'
   
   export function PageWithLoading() {
     return (
       <Suspense fallback={<LoadingSkeleton />}>
         <DataComponent />
       </Suspense>
     )
   }
   ```

5. **Include accessibility**:
   ```tsx
   export function AccessibleButton({ children, ...props }) {
     return (
       <button
         className="focus:outline-none focus:ring-2 focus:ring-blue-500"
         aria-label="Descriptive label"
         {...props}
       >
         {children}
       </button>
     )
   }
   ```

### Response Format Template:
```tsx
// Brief explanation of what you're implementing
// Example: "This is the main solutions page that displays filterable grid of AI tools"

// 1. Types and interfaces
interface SolutionsPageProps {
  searchParams: { category?: string; industry?: string }
}

// 2. Main component with proper error handling
export default async function SolutionsPage({ searchParams }: SolutionsPageProps) {
  try {
    const solutions = await getSolutions(searchParams)
    
    return (
      <div className="container mx-auto py-8">
        <PageHeader />
        <Suspense fallback={<GridSkeleton />}>
          <SolutionsGrid solutions={solutions} />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error('Solutions page error:', error)
    return <ErrorPage />
  }
}

// 3. Supporting components and utilities
// ... rest of implementation
```

## 🚀 Project Initialization Command

Run this to start the project:

```bash
# Navigate to your current directory (with .claude, .serena, .vercel)
cd /path/to/current/directory

# Create the Next.js project
npx create-next-app@latest strive-website-nextjs --typescript --tailwind --eslint --app --src-dir

# Navigate to the new project
cd strive-website-nextjs

# Install all dependencies
npm install @supabase/supabase-js @supabase/ssr prisma @prisma/client stripe @stripe/stripe-js @hookform/resolvers react-hook-form zod lucide-react class-variance-authority clsx tailwind-merge resend

# Initialize shadcn/ui
npx shadcn-ui@latest init

# Set up Prisma
npx prisma init

# Create environment file
cp .env.example .env.local

echo "🎉 Strive Tech Next.js project initialized!"
echo "📁 Project location: ./strive-website-nextjs/"
echo "📖 Check /docs folder for planning documents"
echo "🗂️ Reference /old folder for legacy code analysis"
echo "⚙️ Configure your .env.local file with Supabase and Stripe keys"
```

## 📋 Success Metrics

**Technical Excellence:**
- ✅ 95+ Lighthouse Performance Score
- ✅ <2s First Contentful Paint  
- ✅ <0.1s Cumulative Layout Shift
- ✅ 100% TypeScript coverage (no `any` types)
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Zero security vulnerabilities

**User Experience:**
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Intuitive navigation and user flows
- ✅ Fast loading times on all pages
- ✅ Smooth animations and transitions
- ✅ Clear error messages and loading states

**Business Goals:**
- ✅ Professional, modern design matching brand
- ✅ Easy content management for team
- ✅ Scalable architecture for future features
- ✅ SEO optimized for search visibility
- ✅ Conversion-optimized contact forms

Ready to build something exceptional! Let's create a world-class platform for Strive Tech. 🚀