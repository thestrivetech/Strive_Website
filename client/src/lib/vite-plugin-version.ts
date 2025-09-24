import type { Plugin } from 'vite';

export function vitePluginVersion(): Plugin {
  const buildTimestamp = Date.now().toString();
  const buildVersion = `v${buildTimestamp}`;
  
  return {
    name: 'vite-plugin-version',
    
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
    
    // Add version info to build output
    generateBundle() {
      console.log(`\n✨ Build Version: ${buildVersion}`);
      console.log(`📅 Build Timestamp: ${new Date(parseInt(buildTimestamp)).toISOString()}\n`);
    }
  };
}