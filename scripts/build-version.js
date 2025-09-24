#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Generate build version and timestamp
const buildTimestamp = Date.now();
const buildVersion = `v${buildTimestamp}`;

console.log(`🏗️  Injecting build version: ${buildVersion}`);

// Update index.html with build version
const indexPath = resolve('dist/public/index.html');

try {
  let indexContent = readFileSync(indexPath, 'utf-8');
  
  // Replace placeholders with actual values
  indexContent = indexContent.replace('{{BUILD_VERSION}}', buildVersion);
  indexContent = indexContent.replace('{{BUILD_TIMESTAMP}}', buildTimestamp);
  
  // Add cache-busting query parameter to critical resources
  indexContent = indexContent.replace(
    /(<script[^>]+src="[^"]+)(")/g, 
    `$1?v=${buildVersion}$2`
  );
  indexContent = indexContent.replace(
    /(<link[^>]+href="[^"]+\.css)(")/g, 
    `$1?v=${buildVersion}$2`
  );
  
  writeFileSync(indexPath, indexContent);
  console.log(`✅ Build version ${buildVersion} injected successfully`);
} catch (error) {
  console.error('❌ Failed to inject build version:', error.message);
  process.exit(1);
}