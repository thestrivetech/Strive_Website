# Deployment Guide - Replit Platform

## Overview
This guide provides comprehensive deployment strategies for the Strive Tech website on Replit platform, including environment configuration, asset optimization, and production deployment patterns.

## Replit Configuration

### Core Configuration Files

#### `.replit` Configuration
```toml
modules = ["nodejs-20", "web"]
run = "npm run dev"
hidden = [".config", ".git", "generated-icon.png", "node_modules", "dist"]

[nix]
channel = "stable-25_05"

[deployment]
deploymentTarget = "autoscale"
run = ["npm", "run", "start"]
build = ["npm", "run", "build"]

[[ports]]
localPort = 5000
externalPort = 80

[[ports]]
localPort = 24282
externalPort = 3000

[env]
PORT = "5000"

[agent]
expertMode = true
```

#### `vite.config.ts` for Replit
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// Temporarily disabled Replit-specific plugins due to frame property issues
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
// import cartographer from "@replit/vite-plugin-cartographer";

export default defineConfig({
  plugins: [
    react(),
    // Enable these plugins when Replit frame issues are resolved:
    // runtimeErrorOverlay(),
    // cartographer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Production optimizations
    minify: 'esbuild',
    cssMinify: 'esbuild',
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          icons: ['@heroicons/react', 'lucide-react'],
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    host: "0.0.0.0",
    port: 5173,
  },
  // Environment-specific optimizations
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
```

## Environment Variable Management

### Replit Secrets Configuration
```javascript
// Access environment variables in Node.js
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;

// Replit-specific environment variables
const replitDomains = process.env.REPLIT_DOMAINS;
const replitUser = process.env.REPLIT_USER;
const isDeployment = process.env.REPLIT_DEPLOYMENT === 'true';
```

### Environment Variable Categories
1. **System Variables**: `NODE_ENV`, `PORT`
2. **Database**: `DATABASE_URL`
3. **Authentication**: Session secrets, API keys
4. **Replit-specific**: `REPLIT_DOMAINS`, `REPLIT_USER`, `REPLIT_DEPLOYMENT`

## Asset Optimization for Replit

### Image Optimization Strategy
```typescript
// Asset processing configuration
export const assetConfig = {
  // PNG transparency optimization
  pngOptimization: {
    quality: [0.8, 0.9],
    stripMetadata: true,
    optimizeTransparency: true,
  },
  
  // Screen size breakpoints
  responsive: {
    mobile: { width: 320, height: 568 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
    '4k': { width: 3840, height: 2160 },
  },
  
  // Lazy loading patterns
  lazyLoading: {
    threshold: '10px',
    loadingPlaceholder: 'blur',
    fadeInDuration: 300,
  },
};

// Vite asset inlining configuration
build: {
  assetsInlineLimit: 4096, // 4KB threshold
  assetsDir: 'assets',
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        const info = assetInfo.name.split('.');
        const ext = info[info.length - 1];
        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
          return `images/[name]-[hash][extname]`;
        }
        return `assets/[name]-[hash][extname]`;
      },
    },
  },
}
```

### Logo Asset Configuration
```typescript
// Logo sizing for different contexts
export const logoConfig = {
  header: {
    width: 180,
    height: 40,
    format: 'png',
    transparency: true,
  },
  favicon: {
    sizes: [16, 32, 48, 64],
    format: 'ico',
  },
  socialMedia: {
    width: 1200,
    height: 630,
    format: 'png',
  },
};
```

## Production Build Optimization

### Build Configuration
```typescript
export default defineConfig({
  build: {
    // Production-specific settings
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Bundle size optimization
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            if (id.includes('lucide') || id.includes('heroicons')) {
              return 'icons-vendor';
            }
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/chunks/[name]-[hash].js',
        entryFileNames: 'assets/entries/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    
    // Performance budgets
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
    
    // Terser options for production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

## Deployment Verification

### Health Check Endpoints
```typescript
// server/routes.ts
export function registerRoutes(app: Express) {
  // Health check for deployment verification
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version,
      deployment: process.env.REPLIT_DEPLOYMENT === 'true',
    });
  });

  // Build info endpoint
  app.get('/api/build-info', (req, res) => {
    res.json({
      buildTime: process.env.BUILD_TIME,
      gitCommit: process.env.GIT_COMMIT_HASH,
      nodeVersion: process.version,
      environment: process.env.NODE_ENV,
    });
  });
}
```

### Deployment Script
```bash
#!/bin/bash
# deployment-script.sh

echo "🚀 Starting Strive Tech deployment..."

# Environment validation
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not set"
  exit 1
fi

# Build verification
echo "📦 Building application..."
npm run build

# Check build output
if [ ! -d "dist" ]; then
  echo "❌ Build failed - no dist directory"
  exit 1
fi

# Database migration
echo "🗄️ Running database migrations..."
npm run db:push

# Start application
echo "✅ Starting production server..."
NODE_ENV=production npm start
```

## CDN and Asset Delivery

### Replit-specific Asset Patterns
```typescript
// Asset URL generation for Replit
export function getAssetUrl(path: string): string {
  const baseUrl = import.meta.env.BASE_URL;
  const isDev = import.meta.env.DEV;
  const replitDomain = process.env.REPLIT_DOMAINS?.split(',')[0];
  
  if (isDev) {
    return new URL(path, `https://${replitDomain}`).href;
  }
  
  return new URL(path, baseUrl).href;
}

// Advanced asset URL customization
const assetUrlConfig = {
  experimental: {
    renderBuiltUrl(filename, { hostId, hostType, type }) {
      if (type === 'public') {
        return `https://cdn.replit.com/public/${filename}`;
      } else if (hostType === 'js') {
        return { 
          runtime: `window.__assetsPath(${JSON.stringify(filename)})` 
        };
      }
      return `https://cdn.replit.com/assets/${filename}`;
    },
  },
};
```

## Performance Monitoring

### Build Size Analysis
```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Generate bundle analysis
npm run build
# Opens stats.html with bundle visualization
```

### Runtime Performance Metrics
```typescript
// Performance monitoring utilities
export class PerformanceMonitor {
  static measureBuildTime() {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`Build completed in ${(end - start).toFixed(2)}ms`);
    };
  }

  static measureAssetLoad(assetName: string) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`${assetName} loaded in ${entry.responseEnd - entry.responseStart}ms`);
      });
    });
    observer.observe({ entryTypes: ['resource'] });
  }
}
```

## Troubleshooting

### Common Replit Deployment Issues

1. **Port Configuration Mismatch**
```bash
# Ensure PORT matches Replit configuration
export PORT=5000
npm start
```

2. **Missing Environment Variables**
```bash
# Check if all required secrets are set
echo $DATABASE_URL
echo $NODE_ENV
```

3. **Build Failures**
```bash
# Clear build cache
rm -rf dist node_modules/.vite
npm install
npm run build
```

4. **Asset Loading Issues**
```typescript
// Debug asset paths
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Asset URL:', new URL('./logo.png', import.meta.url));
```

## Rollback Procedures

See `rollback-strategies.md` for detailed rollback procedures including partial file rollbacks and environment-specific rollbacks.

## Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **HTTPS**: Replit provides automatic HTTPS
3. **CSP Headers**: Configure Content Security Policy
4. **Asset Security**: Use secure asset serving patterns

```typescript
// Security headers configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
```