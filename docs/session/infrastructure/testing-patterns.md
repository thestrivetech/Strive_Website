# Testing Patterns and Strategies

## Overview
Comprehensive testing patterns for the Strive Tech website using Vitest for unit/integration testing and Playwright for E2E testing.

## Vitest Configuration and Patterns

### Core Vitest Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    // Environment configuration
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    
    // File patterns
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/test/**',
        'src/**/*.test.*',
        'src/**/*.spec.*',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    
    // Parallel execution
    maxConcurrency: 10,
    pool: 'threads',
    
    // Timeouts
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
})
```

### Multi-Project Testing Setup
```typescript
// vitest.workspace.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      // Unit tests
      {
        name: 'unit',
        include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        environment: 'jsdom',
        setupFiles: ['./src/test/unit-setup.ts'],
      },
      
      // Integration tests
      {
        name: 'integration',
        include: ['tests/integration/**/*.{test,spec}.{js,ts}'],
        environment: 'node',
        setupFiles: ['./tests/integration/setup.ts'],
      },
      
      // Component tests
      {
        name: 'components',
        include: ['src/components/**/*.{test,spec}.{jsx,tsx}'],
        environment: 'jsdom',
        setupFiles: ['./src/test/component-setup.ts'],
      },
      
      // API tests
      {
        name: 'api',
        include: ['server/**/*.{test,spec}.{js,ts}'],
        environment: 'node',
        setupFiles: ['./tests/api/setup.ts'],
      },
    ],
  },
})
```

### Test Organization Patterns

#### Component Testing Pattern
```typescript
// src/components/ui/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

#### Hook Testing Pattern
```typescript
// src/hooks/use-api.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useApi } from './use-api'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useApi Hook', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { result } = renderHook(() => useApi('/api/test'))
    
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData)
      expect(result.current.loading).toBe(false)
    })
  })

  it('handles errors correctly', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useApi('/api/test'))
    
    await waitFor(() => {
      expect(result.current.error).toEqual('Network error')
      expect(result.current.loading).toBe(false)
    })
  })
})
```

#### API Route Testing Pattern
```typescript
// server/routes.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from './index'
import { db } from '@shared/db'

describe('API Routes', () => {
  beforeEach(async () => {
    // Reset database state
    await db.delete(users).execute()
  })

  it('POST /api/users creates a user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
    }

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201)

    expect(response.body).toMatchObject(userData)
    expect(response.body.id).toBeDefined()
  })

  it('GET /api/users returns all users', async () => {
    // Seed test data
    await db.insert(users).values([
      { name: 'User 1', email: 'user1@test.com' },
      { name: 'User 2', email: 'user2@test.com' },
    ]).execute()

    const response = await request(app)
      .get('/api/users')
      .expect(200)

    expect(response.body).toHaveLength(2)
  })
})
```

## Playwright E2E Testing Patterns

### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  
  use: {
    baseURL: 'http://localhost:5000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
```

### Page Object Model Pattern
```typescript
// tests/e2e/pages/homepage.ts
import { Page, Locator } from '@playwright/test'

export class Homepage {
  readonly page: Page
  readonly navigation: Locator
  readonly heroSection: Locator
  readonly servicesSection: Locator
  readonly contactButton: Locator

  constructor(page: Page) {
    this.page = page
    this.navigation = page.getByRole('navigation')
    this.heroSection = page.getByTestId('hero-section')
    this.servicesSection = page.getByTestId('services-section')
    this.contactButton = page.getByRole('link', { name: 'Contact Us' })
  }

  async goto() {
    await this.page.goto('/')
  }

  async clickContactButton() {
    await this.contactButton.click()
  }

  async scrollToServices() {
    await this.servicesSection.scrollIntoViewIfNeeded()
  }

  async waitForHeroLoad() {
    await this.heroSection.waitFor({ state: 'visible' })
  }
}
```

### E2E Test Patterns
```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test'
import { Homepage } from './pages/homepage'

test.describe('Homepage', () => {
  let homepage: Homepage

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page)
    await homepage.goto()
  })

  test('loads correctly', async () => {
    await homepage.waitForHeroLoad()
    await expect(homepage.heroSection).toBeVisible()
    await expect(homepage.navigation).toBeVisible()
  })

  test('navigates to contact page', async () => {
    await homepage.clickContactButton()
    await expect(page).toHaveURL('/contact')
  })

  test('displays services section', async () => {
    await homepage.scrollToServices()
    await expect(homepage.servicesSection).toBeInViewport()
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Strive Tech/)
  })
})
```

### Visual Regression Testing
```typescript
// tests/e2e/visual.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
  test('homepage looks correct', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('homepage.png')
  })

  test('services page looks correct', async ({ page }) => {
    await page.goto('/services')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('services.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('mobile view looks correct', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('homepage-mobile.png')
  })
})
```

## Test Data Management

### Test Database Setup
```typescript
// tests/setup/database.ts
import { db } from '@shared/db'
import { users, companies } from '@shared/schema'

export async function setupTestDatabase() {
  // Clear all tables
  await db.delete(users).execute()
  await db.delete(companies).execute()
  
  // Seed test data
  await db.insert(companies).values([
    {
      id: 1,
      name: 'Test Company',
      email: 'test@company.com',
    },
  ]).execute()

  await db.insert(users).values([
    {
      id: 1,
      name: 'Test User',
      email: 'test@user.com',
      companyId: 1,
    },
  ]).execute()
}

export async function cleanupTestDatabase() {
  await db.delete(users).execute()
  await db.delete(companies).execute()
}
```

### Mock Service Worker Setup
```typescript
// src/test/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock API endpoints
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ])
  }),

  http.post('/api/users', async ({ request }) => {
    const userData = await request.json()
    return HttpResponse.json({ id: 3, ...userData }, { status: 201 })
  }),

  http.get('/api/users/:id', ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      id: Number(id),
      name: `User ${id}`,
      email: `user${id}@example.com`,
    })
  }),
]
```

## Testing Utilities

### Custom Test Utilities
```typescript
// src/test/utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

### Test Helpers
```typescript
// src/test/helpers.ts
import { Page } from '@playwright/test'

export async function login(page: Page, email: string, password: string) {
  await page.goto('/login')
  await page.fill('[data-testid="email"]', email)
  await page.fill('[data-testid="password"]', password)
  await page.click('[data-testid="submit"]')
  await page.waitForURL('/dashboard')
}

export async function waitForToast(page: Page, message: string) {
  await page.waitForSelector(`[data-testid="toast"]:has-text("${message}")`)
}

export function createMockUser(overrides = {}) {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    createdAt: new Date(),
    ...overrides,
  }
}
```

## CI/CD Testing Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Performance Testing

### Load Testing with Playwright
```typescript
// tests/performance/load.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Load Testing', () => {
  test('homepage loads within performance budget', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/', { waitUntil: 'networkidle' })
    
    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(3000) // 3 second budget
  })

  test('critical resources load quickly', async ({ page }) => {
    await page.goto('/')
    
    // Check Core Web Vitals
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          resolve(entries.map(entry => ({
            name: entry.name,
            value: entry.value,
          })))
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      })
    })

    expect(vitals).toBeDefined()
  })
})
```

## Test Coverage and Quality Gates

### Coverage Configuration
```typescript
// vitest.config.ts coverage settings
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html', 'lcov'],
  include: ['src/**/*.{js,jsx,ts,tsx}'],
  exclude: [
    'src/test/**',
    'src/**/*.test.*',
    'src/**/*.spec.*',
    'src/**/*.d.ts',
  ],
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Specific thresholds for critical modules
    'src/lib/**': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  watermarks: {
    statements: [50, 80],
    functions: [50, 80],
    branches: [50, 80],
    lines: [50, 80],
  },
}
```

This comprehensive testing guide provides patterns for unit, integration, and E2E testing that align with the project's TypeScript, React, and modern testing stack requirements.