import type { Plugin } from 'vite';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

export function vitePluginVersion(): Plugin {
  const buildTimestamp = Date.now().toString();
  const buildVersion = `v${buildTimestamp}`;
  const isoTimestamp = new Date(parseInt(buildTimestamp)).toISOString();
  let isServe = false;
  
  return {
    name: 'vite-plugin-version',
    
    configResolved(config) {
      isServe = config.command === 'serve';
    },
    
    // Write version.json during dev server startup
    configureServer(server) {
      const versionData = {
        version: buildVersion,
        timestamp: isoTimestamp,
        buildTime: parseInt(buildTimestamp)
      };
      
      // Write to public directory for dev server
      const versionPath = resolve('client/public/version.json');
      mkdirSync(dirname(versionPath), { recursive: true });
      writeFileSync(versionPath, JSON.stringify(versionData, null, 2));
      
      console.log(`\n✨ Dev Version: ${buildVersion}`);
      console.log(`📁 Version file written to: ${versionPath}\n`);
    },
    
    // Transform HTML files
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // Add build version to meta tags
        const versionMeta = `
    <meta name="build-version" content="${buildVersion}">
    <meta name="build-timestamp" content="${buildTimestamp}">`;
        
        // Inject after existing meta tags
        html = html.replace('</head>', `${versionMeta}\n  </head>`);
        
        // Add cache-busting query parameters to all script and link tags
        html = html.replace(
          /(<script[^>]+src="[^"]+)(")/g,
          `$1?v=${buildVersion}$2`
        );
        html = html.replace(
          /(<link[^>]+href="[^"]+\.css)(")/g,
          `$1?v=${buildVersion}$2`
        );
        
        return html;
      }
    },
    
    // Replace timestamp in service worker
    transform(code, id) {
      if (id.endsWith('sw.ts') || id.endsWith('sw.js')) {
        return code.replace('__BUILD_TIMESTAMP__', buildTimestamp);
      }
      
      // Inject version into main app
      if (id.endsWith('main.tsx') || id.endsWith('App.tsx')) {
        return `window.__BUILD_VERSION__ = '${buildVersion}';\nwindow.__BUILD_TIMESTAMP__ = '${buildTimestamp}';\n${code}`;
      }
      
      return code;
    },
    
    // Generate version.json file for production builds
    writeBundle(options) {
      const versionData = {
        version: buildVersion,
        timestamp: isoTimestamp,
        buildTime: parseInt(buildTimestamp)
      };
      
      // Write to the public directory in dist
      const versionPath = resolve('dist/public/version.json');
      
      // Ensure directory exists
      mkdirSync(dirname(versionPath), { recursive: true });
      
      // Write version.json
      writeFileSync(versionPath, JSON.stringify(versionData, null, 2));
      
      console.log(`\n✨ Build Version: ${buildVersion}`);
      console.log(`📅 Build Timestamp: ${isoTimestamp}`);
      console.log(`📁 Version file written to: ${versionPath}\n`);
    }
  };
}