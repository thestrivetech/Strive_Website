# Code Architecture - Token-Efficient Reference

## 🎯 Project Structure (Copy-Paste Paths)
```bash
# Frontend (React + TypeScript)
client/src/
├── components/ui/          # shadcn/ui components
├── components/layout/      # Navigation, footer
├── pages/                  # Lazy-loaded route components
├── hooks/                  # Custom React hooks
├── lib/                    # Utils, configs (cn, auth, etc.)
├── data/                   # Static content (team, solutions)
└── assets/optimized/       # Pre-optimized images

# Backend (Express + TypeScript)  
server/
├── routes.ts              # All API endpoints
├── services/email/        # Enhanced email system
├── lib/                   # Database, storage, auth
└── middleware/            # Express middleware

# Shared
shared/schema.ts           # Drizzle database schema
```

## ⚡ Key Architectural Patterns

### 1. **Performance-First Frontend**
- ✅ **Lazy Loading**: All pages except home (`lazy(() => import())`)
- ✅ **Code Splitting**: Manual chunks (vendor, ui, utils, pages)
- ✅ **PWA**: Service workers, offline support, caching
- ✅ **Image Optimization**: WebP/AVIF with lazy loading

### 2. **Modular Email System** (Recently Enhanced)
```typescript
// Clean import pattern
import { emailService } from '@/services/email';
await emailService.sendContactFormConfirmation(data);

// Component-based templates
${EmailComponents.createIntelligenceDashboard({...})}
```

### 3. **Type-Safe Database** (Drizzle ORM)
```typescript
// Schema-first with auto-generated types
import { insertContactSubmissionSchema } from '@shared/schema';
const validatedData = insertContactSubmissionSchema.parse(body);
```

### 4. **Mobile-Optimized Components**
- ✅ **Touch Targets**: 44px minimum (iOS standard)
- ✅ **Responsive Design**: Mobile-first Tailwind classes
- ✅ **Keyboard Handling**: Visual Viewport API integration
- ✅ **Safe Areas**: CSS `env()` functions for notched devices

## 🔧 Build System (Vite + esbuild)

### Frontend Build (Vite)
```javascript
// Automatic optimizations enabled:
// - Tree shaking, dead code elimination
// - CSS purging, asset optimization  
// - Manual chunk splitting by feature
// - PWA service worker generation
```

### Backend Build (esbuild)
```javascript
// Server bundle: dist/index.js
// - ES modules, Node.js 22 target
// - External packages bundled
// - Production optimizations
```

## 📱 Mobile Architecture Highlights

### Chatbot Widget (Enhanced 2025-09-18)
```typescript
// Keyboard detection pattern
const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
useEffect(() => {
  if (window.visualViewport) {
    const handleResize = () => {
      const heightDiff = window.screen.height - window.visualViewport.height;
      setIsKeyboardVisible(heightDiff > 150);
    };
    window.visualViewport.addEventListener('resize', handleResize);
    return () => window.visualViewport.removeEventListener('resize', handleResize);
  }
}, []);
```

### Responsive Component Pattern
```typescript
// Standard mobile-first approach
className="
  w-full p-4                    /* Mobile */
  sm:w-auto sm:p-6             /* Small screens */  
  md:max-w-2xl md:p-8         /* Medium screens */
  lg:max-w-4xl lg:p-12        /* Large screens */
"
```

## 🔐 Security Architecture

### Authentication Flow
```typescript
// Multi-layer auth system
1. Passport.js local strategy (username/email + password)
2. JWT tokens for session management  
3. bcrypt password hashing (12 rounds)
4. Optional Supabase Auth integration
```

### API Security  
```typescript
// Security middleware stack
app.use(helmet());              // Security headers
app.use(rateLimit({...}));     // Rate limiting
app.use(cors({...}));          // CORS configuration
app.use(express.json({limit})); // Request size limits
```

## 📊 Data Flow Architecture

### Form Submission Flow
```typescript
// 1. Frontend form → validation → API call
// 2. Server validation (Zod schema)
// 3. Database storage (Drizzle ORM)
// 4. Email notifications (Enhanced templates)
// 5. Response to client
```

### Email System Flow (Enhanced)
```typescript
// 1. Trigger event (form submit, newsletter signup)
// 2. Template engine renders sophisticated HTML
// 3. EmailService sends via Gmail SMTP  
// 4. Delivery confirmation + logging
// 5. Analytics tracking (optional)
```

## 🎯 Performance Metrics (Current)

| Metric | Target | Current | Status |
|--------|--------|---------|---------|
| First Paint | < 1.5s | ~1.2s | ✅ Good |
| Largest Contentful Paint | < 2.5s | ~2.1s | ✅ Good |
| Cumulative Layout Shift | < 0.1 | ~0.05 | ✅ Excellent |
| Bundle Size (gzipped) | < 200KB | ~180KB | ✅ Good |
| Email Delivery Rate | > 95% | 100% | ✅ Excellent |

## 🔄 Development Workflow Integration

### TypeScript Configuration
```json
// Strict mode enabled across entire project
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"noImplicitReturns": true
```

### Path Aliases (vite.config.ts)
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './client/src'),
    '@shared': path.resolve(__dirname, './shared'),
    '@assets': path.resolve(__dirname, './attached_assets')
  }
}
```

## 🚨 Architecture Decision Records

### Why Wouter over React Router?
- **Bundle Size**: 3KB vs 45KB (15x smaller)
- **Performance**: Faster route matching
- **Simple API**: Easier to maintain

### Why Drizzle over Prisma?
- **Type Safety**: Better TypeScript integration
- **Performance**: Lighter runtime overhead  
- **SQL Control**: Raw SQL when needed

### Why Vite over Webpack?
- **Dev Speed**: Sub-second HMR
- **Build Speed**: 10x faster production builds
- **Modern**: ES modules, optimized for modern browsers

---
**🎯 Search Keywords**: architecture, performance, mobile, email, security, build, typescript, vite, drizzle