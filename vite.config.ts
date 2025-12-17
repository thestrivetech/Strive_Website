import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    // PWA Plugin with basic configuration
    VitePWA({
      mode: 'production',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Strive Tech',
        short_name: 'Strive',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,ico,png,svg,webp,avif,woff2,woff,ttf}'],
        // Explicitly exclude HTML files
        globIgnores: ['**/*.html', 'index.html'],
        // Don't include sw.js itself
        swDest: 'dist/public/sw.js',
        // Custom replacements
        manifestTransforms: [
          (manifestEntries) => {
            const manifest = manifestEntries.filter(entry => {
              // Exclude HTML files from manifest
              return !entry.url.endsWith('.html');
            });
            return { manifest };
          }
        ]
      },
      devOptions: {
        enabled: false
      }
    }),

    // Bundle analyzer - generates stats.html after build
    process.env.ANALYZE === "true" && visualizer({
      filename: "dist/bundle-analyzer.html",
      open: true,
      brotliSize: true,
      gzipSize: true,
      template: "treemap",
    }),
  ].filter(Boolean),
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
    // Enable source maps only in development
    sourcemap: process.env.NODE_ENV === "development",
    // Use esbuild for minification (faster than terser)
    minify: 'esbuild',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk optimization for better caching
        manualChunks: {
          // Vendor libraries that change rarely
          vendor: ['react', 'react-dom'],
          router: ['wouter'],
          // UI component libraries
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group'
          ],
          // Utility libraries
          utils: [
            'date-fns',
            'clsx',
            'tailwind-merge',
            'class-variance-authority'
          ],
          // Animation and motion
          motion: ['framer-motion'],
          // Icons and visual assets
          icons: ['lucide-react', '@heroicons/react'],
          // Form handling
          forms: ['react-hook-form', '@hookform/resolvers'],
          // Query and state management
          query: ['@tanstack/react-query'],
          // PWA and Service Worker
          pwa: ['workbox-window']
        },
        // Optimize asset file names for better caching
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    }
  },
  // Production-specific esbuild optimizations
  esbuild: {
    // Remove console.log and debugger statements in production
    drop: process.env.NODE_ENV === "production" ? ['console', 'debugger'] : [],
    // Optimize for modern browsers in production
    target: process.env.NODE_ENV === "production" ? 'es2020' : 'es2017'
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});