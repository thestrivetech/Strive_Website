# Development Workflow - Complete Guide

## 🎯 Quick Start (New Developer Onboarding)

### Setup (5 Minutes)
```bash
# 1. Clone and install
git clone [repo-url]
cd Strive_Website_Replit
npm install

# 2. Environment setup (copy required variables)
cp .env.example .env
# Add: DATABASE_URL, SMTP_* variables

# 3. Start development
npm run dev
# → Server at http://localhost:3000
```

### First Development Session
```bash
# Always run before starting work
npm run check          # TypeScript validation
npm run build         # Ensure build works

# Make changes, then test
curl http://localhost:3000/api/debug/email    # Email service
curl http://localhost:3000/api/health/database # Database
```

## 🔄 Standard Development Cycle

### Daily Workflow
```bash
# 1. Start development server
npm run dev

# 2. Make code changes

# 3. Validate changes
npm run check          # TypeScript validation

# 4. Test specific features
# Email: Use curl commands from suggested_commands memory
# Frontend: Test in browser with responsive tools
# API: Use curl for endpoint testing

# 5. Build for production
npm run build

# 6. Commit (if tests pass)
git add .
git commit -m "feature: description"
```

### Feature Development Pattern
```bash
# 1. Plan feature (use memory files for patterns)
# 2. Create/modify components (see component_system_quick_reference)
# 3. Add/update API endpoints (see database_api_endpoints_reference)
# 4. Test email functionality (see email_system_comprehensive)
# 5. Mobile optimization (see mobile patterns in memories)
# 6. Performance check (npm run build:analyze)
```

## 📧 Email Development Workflow

### Adding New Email Template
```typescript
// 1. Create template in server/services/email/templates/TemplateEngine.ts
class NewTemplate extends BaseTemplate {
  async render(data: EmailTemplateData): Promise<TemplateResult> {
    // Use EmailComponents for sophisticated features
    const content = `
      ${EmailComponents.createIntelligenceDashboard({...})}
      ${EmailComponents.createJourneyTimeline({...})}
    `;
    return {html: content, subject: '...'};
  }
}

// 2. Add to TemplateFactory
const templates = {
  'new-template': NewTemplate,
  // ... existing templates
};

// 3. Add service method
public async sendNewTemplate(data: any): Promise<boolean> {
  const result = await this.templateEngine.renderTemplate('new-template', data);
  return await this.sendEmail({to: [data.email], ...result});
}

// 4. Test with curl
curl -X POST localhost:3000/api/endpoint -H "Content-Type: application/json" -d '{...}'
```

### Email Component Development
```typescript
// 1. Add component to server/services/email/components/index.ts
export function createNewComponent(options: NewComponentOptions): string {
  return `<div style="...">Component HTML</div>`;
}

// 2. Add to EmailComponents export
export const EmailComponents = {
  // ... existing components
  createNewComponent,
};

// 3. Use in templates
${EmailComponents.createNewComponent({...})}
```

## 📱 Mobile Development Workflow

### Mobile-First Component Development
```typescript
// 1. Start with mobile layout
<div className="w-full p-4 flex flex-col space-y-4">
  {/* Mobile layout */}
</div>

// 2. Add responsive breakpoints
<div className="
  w-full p-4 flex flex-col space-y-4          /* Mobile */
  md:flex-row md:space-y-0 md:space-x-6       /* Tablet+ */
  lg:max-w-6xl lg:mx-auto lg:p-8              /* Desktop */
">
  {/* Responsive content */}
</div>

// 3. Test touch interactions
className="min-h-[44px] min-w-[44px] touch-manipulation"

// 4. Add keyboard handling (if needed)
const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
// See mobile_chatbot_widget_fixes_complete_log for complete pattern
```

### Mobile Testing Checklist
- [ ] Touch targets ≥ 44px
- [ ] Horizontal scrolling works
- [ ] Keyboard doesn't block inputs
- [ ] Safe area support (notched devices)
- [ ] Responsive breakpoints work
- [ ] Performance (no janky animations)

## 🗄️ Database Development Workflow

### Schema Changes
```bash
# 1. Modify shared/schema.ts
export const newTable = pgTable('new_table', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  // ... columns
});

# 2. Create insert schema
export const insertNewTableSchema = createInsertSchema(newTable).pick({
  // ... fields
});

# 3. Push to database
npm run db:push

# 4. Add storage methods
// Add to server/lib/storage.ts

# 5. Create API endpoint
// Add to server/routes.ts

# 6. Test with curl
curl -X POST localhost:3000/api/new-endpoint -H "Content-Type: application/json" -d '{...}'
```

### API Endpoint Development
```typescript
// 1. Add validation schema (from shared/schema.ts)
const validatedData = insertNewTableSchema.parse(req.body);

// 2. Database operation
await storage.createNewRecord(validatedData);

// 3. Success response
res.json({success: true, message: "Success message"});

// 4. Error handling
catch (error) {
  if (error instanceof z.ZodError) {
    res.status(400).json({success: false, errors: error.errors});
  }
}
```

## 🎨 Frontend Development Workflow

### New Page Creation
```typescript
// 1. Create page component (pages/new-page.tsx)
import { lazy } from 'react';
const NewPageComponent = lazy(() => import('./new-page-component'));

export default function NewPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NewPageComponent />
    </Suspense>
  );
}

// 2. Export from pages/index.ts
export { default as NewPage } from './new-page';

// 3. Add route handling (if using router)
// 4. Add SEO metadata
useSEO({title: 'Page Title', description: '...'});
```

### Component Development
```typescript
// 1. Use existing UI components
import { Button, Card, Input } from '@/components/ui';

// 2. Follow responsive patterns
className="mobile-first responsive classes"

// 3. Add TypeScript interfaces
interface ComponentProps {
  title: string;
  onAction: () => void;
}

// 4. Export for reuse
export { NewComponent };
```

## 🔧 Testing Workflow

### Manual Testing Suite
```bash
# 1. TypeScript validation
npm run check

# 2. Build test
npm run build

# 3. Email system test
curl -X POST localhost:3000/api/contact -H "Content-Type: application/json" -d '{"firstName":"Test","lastName":"User","email":"grantramey@strivetech.ai","company":"Test Corp","message":"Test","privacyConsent":true}'

# 4. Database health
curl http://localhost:3000/api/health/database

# 5. Service status
curl http://localhost:3000/api/debug/email
```

### Automated Testing (When Available)
```bash
# Unit tests
npm run test:run

# E2E tests  
npm run test:e2e

# Coverage
npm run test:coverage
```

## 🚀 Performance Optimization Workflow

### Build Analysis
```bash
# 1. Analyze bundle
npm run build:analyze
# → Opens stats.html

# 2. Check for large dependencies
# Look for unexpected large bundles

# 3. Optimize imports
# Use named imports: import { Button } from '@/components/ui/button'
# Avoid barrel imports: import * from '@/components/ui'
```

### Image Optimization
```bash
# 1. Add images to assets/optimized/
# 2. Use multiple formats (webp, avif)
# 3. Implement responsive images
<picture>
  <source srcSet={imageAvif} type="image/avif" />
  <source srcSet={imageWebp} type="image/webp" />
  <img src={imageFallback} alt="..." loading="lazy" />
</picture>
```

## 🔐 Security Workflow

### Environment Variables
```bash
# 1. Add to .env (never commit)
NEW_SECRET_KEY=your-secret-value

# 2. Use in code
const secretKey = process.env.NEW_SECRET_KEY;
if (!secretKey) throw new Error('NEW_SECRET_KEY required');

# 3. Document in .env.example
NEW_SECRET_KEY=example-value-or-description
```

### API Security
```typescript
// 1. Input validation (always use Zod schemas)
const validatedData = schema.parse(req.body);

// 2. Authentication (if needed)
app.post('/protected', authenticateToken, (req: AuthenticatedRequest, res) => {
  // Protected logic
});

// 3. Rate limiting (already configured)
// 4. Error handling (don't expose internals)
```

## 📊 Code Quality Workflow

### Pre-Commit Checklist
- [ ] `npm run check` passes (TypeScript)
- [ ] `npm run build` succeeds  
- [ ] Manual testing complete
- [ ] No console errors in browser
- [ ] Mobile responsiveness verified
- [ ] Email functionality tested (if applicable)

### Code Review Guidelines
- **Performance**: Lazy loading, proper imports
- **Mobile**: Touch targets, responsive design
- **Security**: Input validation, no secrets in code
- **Maintainability**: Clear naming, proper TypeScript
- **Testing**: Manual verification of changes

## 🎯 Deployment Workflow

### Pre-Production Checklist
- [ ] All tests pass
- [ ] Build analysis shows reasonable bundle sizes
- [ ] Email delivery confirmed (100% rate)
- [ ] Database migrations successful
- [ ] Environment variables configured
- [ ] Mobile testing complete

### Production Deployment
```bash
# 1. Final build
npm run build

# 2. Start production server
npm start

# 3. Health checks
curl http://localhost:3000/api/health/database
curl http://localhost:3000/api/debug/email

# 4. Smoke test critical features
# Contact form, newsletter, service requests
```

---
**🎯 Key Success Metrics:**
- TypeScript: 0 errors
- Email delivery: 100% rate  
- Build time: <15 seconds
- Bundle size: <200KB gzipped
- Mobile performance: No layout shifts

**⚡ Search Keywords**: workflow, development, testing, mobile, email, database, performance, security, deployment