# Performance Optimization Guide

## Overview
Comprehensive performance optimization strategies for the Strive Tech website, covering build optimization, runtime performance, monitoring, and Replit-specific optimizations.

## Vite Build Performance

### Build Configuration Optimization
```typescript
// vite.config.ts - Performance optimized
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // Bundle analysis plugin
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    
    // Optimization settings
    minify: 'esbuild', // Faster than terser
    cssMinify: 'lightningcss',
    sourcemap: process.env.NODE_ENV === 'development',
    reportCompressedSize: false, // Faster builds
    
    // Manual chunking strategy
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor'
            }
            if (id.includes('lucide') || id.includes('@heroicons')) {
              return 'icons-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            return 'vendor'
          }
          
          // App chunks
          if (id.includes('/components/ui/')) {
            return 'ui-components'
          }
          if (id.includes('/pages/')) {
            return 'pages'
          }
        },
        
        // Optimized file naming
        chunkFileNames: 'assets/chunks/[name]-[hash].js',
        entryFileNames: 'assets/entries/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`
          }
          if (/css/i.test(ext)) {
            return `styles/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // 4KB threshold
    
    // Terser options for production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-query',
    ],
    exclude: [
      '@vite/client',
      '@vite/env',
    ],
    // Force optimization refresh
    force: process.env.FORCE_DEPS === 'true',
  },
  
  // Development optimizations
  server: {
    // Warm up frequently used files
    warmup: {
      clientFiles: [
        './src/components/**/*.tsx',
        './src/pages/**/*.tsx',
        './src/lib/**/*.ts',
      ],
    },
  },
})
```

### Bundle Analysis and Optimization
```typescript
// scripts/analyze-bundle.ts
import { build } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

async function analyzeBundle() {
  console.log('🔍 Analyzing bundle...')
  
  await build({
    plugins: [
      visualizer({
        filename: 'bundle-analysis.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              const chunks = ['react', 'ui', 'utils', 'icons']
              for (const chunk of chunks) {
                if (id.includes(chunk)) return `${chunk}-vendor`
              }
              return 'vendor'
            }
          },
        },
      },
    },
  })
  
  console.log('✅ Bundle analysis complete. Check bundle-analysis.html')
}

// Performance budget checker
interface BudgetConfig {
  maxBundleSize: number // KB
  maxChunkSize: number // KB
  maxAssetsSize: number // KB
}

const performanceBudgets: BudgetConfig = {
  maxBundleSize: 500, // 500KB total
  maxChunkSize: 200,  // 200KB per chunk
  maxAssetsSize: 100, // 100KB for assets
}

function checkPerformanceBudgets(stats: any) {
  const warnings: string[] = []
  
  // Check total bundle size
  const totalSize = stats.bundleSize / 1024
  if (totalSize > performanceBudgets.maxBundleSize) {
    warnings.push(`Total bundle size (${totalSize.toFixed(1)}KB) exceeds budget (${performanceBudgets.maxBundleSize}KB)`)
  }
  
  // Check individual chunks
  stats.chunks.forEach((chunk: any) => {
    const chunkSize = chunk.size / 1024
    if (chunkSize > performanceBudgets.maxChunkSize) {
      warnings.push(`Chunk ${chunk.name} (${chunkSize.toFixed(1)}KB) exceeds budget (${performanceBudgets.maxChunkSize}KB)`)
    }
  })
  
  return warnings
}
```

## Runtime Performance Optimization

### Code Splitting and Lazy Loading
```typescript
// src/components/LazyComponents.tsx
import { lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))
const ComplexForm = lazy(() => import('./ComplexForm'))
const DataVisualization = lazy(() => import('./DataVisualization'))

// Loading fallbacks
const ChartSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
)

// Optimized component wrapper
export function OptimizedChart(props: any) {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart {...props} />
    </Suspense>
  )
}

// Route-level code splitting
export const routeComponents = {
  Home: lazy(() => import('../pages/Home')),
  About: lazy(() => import('../pages/About')),
  Services: lazy(() => import('../pages/Services')),
  Contact: lazy(() => import('../pages/Contact')),
}
```

### Image Optimization
```typescript
// src/components/OptimizedImage.tsx
import { useState, useRef, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className 
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [inView, setInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Generate responsive image sizes
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [320, 640, 768, 1024, 1280, 1536]
    return sizes.map(size => `${baseSrc}?w=${size} ${size}w`).join(', ')
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className || ''}`}
      style={{ width, height }}
    >
      {inView && (
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      
      {!loaded && !error && inView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  )
}
```

### React Query Optimization
```typescript
// src/lib/react-query.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache optimization
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      
      // Performance optimization
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
      retry: (failureCount, error) => {
        // Don't retry 4xx errors
        if (error instanceof Error && error.message.includes('4')) {
          return false
        }
        return failureCount < 3
      },
      
      // Background updates
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

// Prefetching utility
export function prefetchQuery<T>(
  key: string[],
  fetcher: () => Promise<T>,
  options?: { staleTime?: number }
) {
  return queryClient.prefetchQuery({
    queryKey: key,
    queryFn: fetcher,
    staleTime: options?.staleTime || 5 * 60 * 1000,
  })
}
```

## Performance Monitoring

### Core Web Vitals Monitoring
```typescript
// src/lib/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

interface MetricData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
}

class PerformanceMonitor {
  private metrics: Map<string, MetricData> = new Map()

  constructor() {
    this.initializeWebVitals()
  }

  private initializeWebVitals() {
    getCLS(this.handleMetric.bind(this))
    getFID(this.handleMetric.bind(this))
    getFCP(this.handleMetric.bind(this))
    getLCP(this.handleMetric.bind(this))
    getTTFB(this.handleMetric.bind(this))
  }

  private handleMetric(metric: MetricData) {
    this.metrics.set(metric.name, metric)
    
    // Log poor performance
    if (metric.rating === 'poor') {
      console.warn(`Poor ${metric.name}: ${metric.value}`)
      this.reportMetric(metric)
    }
    
    // Send to analytics
    this.sendToAnalytics(metric)
  }

  private reportMetric(metric: MetricData) {
    // Send to monitoring service
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(console.error)
  }

  private sendToAnalytics(metric: MetricData) {
    // Google Analytics example
    if ('gtag' in window) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_rating: metric.rating,
        custom_map: { metric_name: metric.name },
      })
    }
  }

  getMetrics(): Record<string, MetricData> {
    return Object.fromEntries(this.metrics)
  }

  getMetricsSummary() {
    const metrics = this.getMetrics()
    return {
      lcp: metrics.LCP?.value || 0,
      fid: metrics.FID?.value || 0,
      cls: metrics.CLS?.value || 0,
      fcp: metrics.FCP?.value || 0,
      ttfb: metrics.TTFB?.value || 0,
      overall: this.calculateOverallScore(metrics),
    }
  }

  private calculateOverallScore(metrics: Record<string, MetricData>): number {
    const scores = Object.values(metrics).map(m => {
      switch (m.rating) {
        case 'good': return 100
        case 'needs-improvement': return 50
        case 'poor': return 0
        default: return 0
      }
    })
    
    return scores.length > 0 ? scores.reduce((a, b) => a + b) / scores.length : 0
  }
}

export const performanceMonitor = new PerformanceMonitor()
```

### Resource Performance Tracking
```typescript
// src/lib/resource-monitor.ts
class ResourceMonitor {
  private resourceTimes: Map<string, number> = new Map()

  constructor() {
    this.observeResources()
  }

  private observeResources() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming
          this.trackResourceTiming(resource)
        }
      })
    })

    observer.observe({ entryTypes: ['resource'] })
  }

  private trackResourceTiming(resource: PerformanceResourceTiming) {
    const loadTime = resource.responseEnd - resource.responseStart
    this.resourceTimes.set(resource.name, loadTime)

    // Alert on slow resources
    if (loadTime > 1000) { // 1 second threshold
      console.warn(`Slow resource: ${resource.name} (${loadTime.toFixed(2)}ms)`)
      
      // Send alert to monitoring
      this.reportSlowResource(resource.name, loadTime)
    }
  }

  private reportSlowResource(resourceName: string, loadTime: number) {
    fetch('/api/slow-resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resource: resourceName,
        loadTime,
        timestamp: Date.now(),
        url: window.location.href,
      }),
    }).catch(console.error)
  }

  getSlowResources(threshold = 500): Array<{ name: string; time: number }> {
    return Array.from(this.resourceTimes.entries())
      .filter(([_, time]) => time > threshold)
      .map(([name, time]) => ({ name, time }))
      .sort((a, b) => b.time - a.time)
  }
}

export const resourceMonitor = new ResourceMonitor()
```

## Development Performance Tools

### Performance Profiling
```bash
#!/bin/bash
# scripts/profile-performance.sh

echo "🔍 Starting performance profiling..."

# Start development server with profiling
NODE_OPTIONS="--inspect" npm run dev &
SERVER_PID=$!

# Wait for server to start
sleep 5

echo "🚀 Server running with inspection enabled"
echo "📊 Open Chrome DevTools and connect to debugger"
echo "🎯 Use Performance tab to record profiles"

# Generate CPU profile
echo "📈 Generating build profile..."
npm run build --profile

# Analyze bundle
echo "📦 Analyzing bundle size..."
npm run analyze

# Kill server
kill $SERVER_PID

echo "✅ Performance profiling complete"
```

### Build Performance Analysis
```typescript
// scripts/build-perf.ts
import { build } from 'vite'
import { performance } from 'perf_hooks'

async function measureBuildPerformance() {
  console.log('📊 Measuring build performance...')
  
  const start = performance.now()
  
  try {
    await build({
      logLevel: 'silent',
      build: {
        reportCompressedSize: false,
        minify: 'esbuild',
      },
    })
    
    const duration = performance.now() - start
    
    console.log(`✅ Build completed in ${(duration / 1000).toFixed(2)}s`)
    
    // Performance benchmarks
    const benchmarks = {
      excellent: 10000, // 10s
      good: 30000,      // 30s
      poor: 60000,      // 60s
    }
    
    let rating = 'poor'
    if (duration < benchmarks.excellent) rating = 'excellent'
    else if (duration < benchmarks.good) rating = 'good'
    
    console.log(`📈 Build performance: ${rating}`)
    
    return { duration, rating }
  } catch (error) {
    console.error('❌ Build failed:', error)
    throw error
  }
}
```

## Replit-Specific Optimizations

### Replit Performance Configuration
```typescript
// replit-optimizations.ts
export const replitOptimizations = {
  // Memory optimization for Replit's limited resources
  nodeOptions: '--max-old-space-size=512',
  
  // Build optimizations for Replit
  buildConfig: {
    // Reduce parallel processing to avoid memory issues
    rollupOptions: {
      maxParallelFileOps: 2,
      output: {
        // Smaller chunk sizes for better loading
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog'],
        },
      },
    },
    
    // Faster builds on Replit
    minify: 'esbuild', // Faster than terser
    cssMinify: 'esbuild',
    reportCompressedSize: false,
  },
  
  // Development server optimizations
  serverConfig: {
    host: '0.0.0.0',
    port: 5000,
    // Reduce file watching overhead
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
      usePolling: false,
    },
  },
}
```

### Replit Deployment Performance
```bash
#!/bin/bash
# replit-deploy-optimized.sh

echo "🚀 Optimized Replit deployment starting..."

# Clean up before deployment
echo "🧹 Cleaning up..."
rm -rf dist node_modules/.vite .replit-build-cache

# Install dependencies with cache optimization
echo "📦 Installing dependencies..."
npm ci --prefer-offline --no-audit --no-fund

# Optimize build for Replit's resources
echo "🏗️ Building with optimizations..."
NODE_OPTIONS="--max-old-space-size=512" npm run build

# Verify build
if [ ! -d "dist" ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ Optimized deployment complete"

# Start with memory optimization
NODE_OPTIONS="--max-old-space-size=256" npm start
```

## Performance Budget Configuration

### Budget Definition
```typescript
// performance-budgets.ts
export const performanceBudgets = {
  // Bundle size budgets (KB)
  bundles: {
    main: 300,
    vendor: 200,
    ui: 100,
    total: 500,
  },
  
  // Asset budgets (KB)
  assets: {
    images: 500,
    fonts: 100,
    css: 50,
  },
  
  // Runtime budgets (ms)
  timing: {
    fcp: 1500,    // First Contentful Paint
    lcp: 2500,    // Largest Contentful Paint
    fid: 100,     // First Input Delay
    cls: 0.1,     // Cumulative Layout Shift
    ttfb: 800,    // Time to First Byte
  },
  
  // Network budgets
  requests: {
    critical: 10,   // Critical resources
    total: 50,      // Total requests
  },
}

export function checkBudgets(metrics: any): string[] {
  const violations: string[] = []
  
  // Check bundle sizes
  if (metrics.bundleSize > performanceBudgets.bundles.total * 1024) {
    violations.push(`Bundle size exceeded: ${metrics.bundleSize} > ${performanceBudgets.bundles.total}KB`)
  }
  
  // Check timing metrics
  Object.entries(performanceBudgets.timing).forEach(([key, limit]) => {
    if (metrics[key] > limit) {
      violations.push(`${key.toUpperCase()} exceeded: ${metrics[key]}ms > ${limit}ms`)
    }
  })
  
  return violations
}
```

This comprehensive performance guide provides strategies for optimizing both build-time and runtime performance, with specific considerations for the Replit platform's resource constraints.