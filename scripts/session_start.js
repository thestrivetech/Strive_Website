#!/usr/bin/env node

/**
 * AGENTIC TEAM SESSION START AUTOMATION
 * Version: 1.0.0
 * Purpose: Automated pre-flight checks and session initialization
 * 
 * Usage: node scripts/session_start.js
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Utility functions
const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.blue}${'='.repeat(60)}\n${msg}\n${'='.repeat(60)}${colors.reset}\n`)
};

// Session configuration
const SESSION_CONFIG = {
  maxFileLines: 300,
  warningFileLines: 250,
  expectedAgentCount: 14,
  parallelTestTarget: 2000, // milliseconds
  criticalFiles: [
    'client/src/pages/home.tsx',
    'client/src/pages/portfolio.tsx',
    'client/src/pages/solutions.tsx',
    'vite.config.ts',
    'server/index.ts'
  ],
  requiredAgents: [
    'frontend-researcher',
    'backend-researcher', 
    'infrastructure-researcher',
    'execution-monitor',
    'component-extractor'
  ]
};

/**
 * Phase 0: Session Initialization
 */
async function initializeSession() {
  log.header('PHASE 0: SESSION INITIALIZATION');
  
  // Create session timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const sessionId = `session_${timestamp}`;
  
  log.info(`Session ID: ${sessionId}`);
  
  // Create session directories
  const dirs = [
    `docs/session/frontend`,
    `docs/session/backend`,
    `docs/session/infrastructure`,
    `docs/session/tasks`,
    `chat_logs/orchestrator/${sessionId}`,
    `backups/${sessionId}`
  ];
  
  dirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      log.success(`Created: ${dir}`);
    }
  });
  
  // Backup critical files
  SESSION_CONFIG.criticalFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const backupPath = `backups/${sessionId}/${path.basename(file)}`;
      fs.copyFileSync(file, backupPath);
      log.success(`Backed up: ${file}`);
    }
  });
  
  return sessionId;
}

/**
 * Phase 1: Infrastructure Health Check
 */
async function checkInfrastructure() {
  log.header('PHASE 1: INFRASTRUCTURE HEALTH CHECK');
  
  const checks = {
    build: false,
    preview: false,
    gitStatus: false,
    agentConfigs: false,
    parallelTest: false
  };
  
  // 1. Build check
  try {
    log.info('Running build check...');
    execSync('npm run build', { stdio: 'pipe' });
    checks.build = true;
    log.success('Build passes');
  } catch (error) {
    log.error('BUILD FAILED - Fix before proceeding');
    console.error(error.toString());
    return checks;
  }
  
  // 2. Preview check (start dev server in background)
  try {
    log.info('Starting preview server...');
    const devProcess = spawn('npm', ['run', 'dev'], { 
      detached: true,
      stdio: 'ignore'
    });
    devProcess.unref();
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Check if server is responding
    try {
      execSync('curl -s http://localhost:5000', { stdio: 'pipe' });
      checks.preview = true;
      log.success('Preview server running');
    } catch {
      log.error('Preview server not responding');
    }
  } catch (error) {
    log.error('Failed to start preview server');
  }
  
  // 3. Git status check
  try {
    const gitStatus = execSync('git status --short', { encoding: 'utf8' });
    if (gitStatus.trim() === '') {
      checks.gitStatus = true;
      log.success('Git working tree clean');
    } else {
      log.warning('Uncommitted changes detected:');
      console.log(gitStatus);
      checks.gitStatus = true; // Warning, not error
    }
  } catch (error) {
    log.error('Git status check failed');
  }
  
  // 4. Agent configuration check
  try {
    const agentFiles = fs.readdirSync('.claude/agents');
    const mdFiles = agentFiles.filter(f => f.endsWith('.md'));
    
    if (mdFiles.length >= SESSION_CONFIG.expectedAgentCount) {
      checks.agentConfigs = true;
      log.success(`${mdFiles.length} agent configurations found`);
      
      // Check for required agents
      const missingAgents = SESSION_CONFIG.requiredAgents.filter(
        agent => !mdFiles.includes(`${agent}.md`)
      );
      
      if (missingAgents.length > 0) {
        log.warning(`Missing critical agents: ${missingAgents.join(', ')}`);
        checks.agentConfigs = false;
      }
    } else {
      log.error(`Only ${mdFiles.length} agents found (expected ${SESSION_CONFIG.expectedAgentCount})`);
    }
  } catch (error) {
    log.error('Failed to check agent configurations');
  }
  
  // 5. Parallel deployment test
  try {
    if (fs.existsSync('test_parallel_deployment.js')) {
      log.info('Running parallel deployment test...');
      const result = execSync('node test_parallel_deployment.js', { encoding: 'utf8' });
      
      // Parse the timing from output
      const match = result.match(/Parallel time: (\d+)ms/);
      if (match) {
        const parallelTime = parseInt(match[1]);
        if (parallelTime < SESSION_CONFIG.parallelTestTarget) {
          checks.parallelTest = true;
          log.success(`Parallel deployment: ${parallelTime}ms (target: <${SESSION_CONFIG.parallelTestTarget}ms)`);
        } else {
          log.warning(`Parallel deployment slow: ${parallelTime}ms`);
          checks.parallelTest = true; // Warning, not error
        }
      }
    } else {
      log.warning('Parallel deployment test not found');
    }
  } catch (error) {
    log.error('Parallel deployment test failed');
  }
  
  return checks;
}

/**
 * Phase 2: File Size Analysis
 */
async function checkFileSizes() {
  log.header('PHASE 2: FILE SIZE ANALYSIS');
  
  const issues = [];
  
  // Find all TypeScript/React files
  const checkFiles = (dir) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        checkFiles(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n').length;
        
        if (lines > SESSION_CONFIG.maxFileLines) {
          issues.push({ file: fullPath, lines, severity: 'error' });
          log.error(`${fullPath}: ${lines} lines (MAX: ${SESSION_CONFIG.maxFileLines})`);
        } else if (lines > SESSION_CONFIG.warningFileLines) {
          issues.push({ file: fullPath, lines, severity: 'warning' });
          log.warning(`${fullPath}: ${lines} lines (approaching limit)`);
        }
      }
    });
  };
  
  try {
    checkFiles('client/src');
    checkFiles('server');
    
    if (issues.filter(i => i.severity === 'error').length === 0) {
      log.success('All files within size limits');
    }
  } catch (error) {
    log.error('File size check failed');
    console.error(error);
  }
  
  return issues;
}

/**
 * Phase 3: Corruption Detection
 */
async function checkForCorruption() {
  log.header('PHASE 3: CORRUPTION DETECTION');
  
  const patterns = [
    { pattern: 'const const', description: 'Duplicate const declarations' },
    { pattern: 'export.*\\n.*[^}]$', description: 'Code after export statement' },
    { pattern: 'return\\s*$', description: 'Empty return statements' },
    { pattern: '\\{\\{', description: 'Double curly braces (potential JSX issue)' }
  ];
  
  let corruptionFound = false;
  
  patterns.forEach(({ pattern, description }) => {
    try {
      // Use grep to search for patterns
      const result = execSync(
        `grep -r "${pattern}" client/src --include="*.tsx" --include="*.ts" 2>/dev/null || true`,
        { encoding: 'utf8' }
      );
      
      if (result.trim()) {
        corruptionFound = true;
        log.error(`Found corruption pattern: ${description}`);
        console.log(result);
      }
    } catch (error) {
      // Grep returns non-zero if no matches, which is fine
    }
  });
  
  if (!corruptionFound) {
    log.success('No corruption patterns detected');
  }
  
  return !corruptionFound;
}

/**
 * Phase 4: Generate Session Report
 */
async function generateSessionReport(sessionId, healthChecks, fileSizeIssues, corruptionCheck) {
  log.header('PHASE 4: SESSION READINESS REPORT');
  
  const report = {
    sessionId,
    timestamp: new Date().toISOString(),
    readiness: {
      infrastructure: Object.values(healthChecks).every(v => v),
      fileSizes: fileSizeIssues.filter(i => i.severity === 'error').length === 0,
      corruption: corruptionCheck
    },
    details: {
      healthChecks,
      fileSizeIssues,
      corruptionCheck
    }
  };
  
  // Calculate overall readiness
  const overallReady = report.readiness.infrastructure && 
                       report.readiness.fileSizes && 
                       report.readiness.corruption;
  
  // Display summary
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.bright}SESSION READINESS SUMMARY${colors.reset}`);
  console.log('='.repeat(60));
  
  console.log(`\n${colors.cyan}Infrastructure:${colors.reset}`);
  Object.entries(healthChecks).forEach(([check, passed]) => {
    const icon = passed ? '✅' : '❌';
    const color = passed ? colors.green : colors.red;
    console.log(`  ${icon} ${color}${check}${colors.reset}`);
  });
  
  console.log(`\n${colors.cyan}File Health:${colors.reset}`);
  const errorCount = fileSizeIssues.filter(i => i.severity === 'error').length;
  const warningCount = fileSizeIssues.filter(i => i.severity === 'warning').length;
  if (errorCount > 0) {
    console.log(`  ❌ ${colors.red}${errorCount} files exceed size limit${colors.reset}`);
  }
  if (warningCount > 0) {
    console.log(`  ⚠️  ${colors.yellow}${warningCount} files approaching limit${colors.reset}`);
  }
  if (errorCount === 0 && warningCount === 0) {
    console.log(`  ✅ ${colors.green}All files within limits${colors.reset}`);
  }
  
  console.log(`\n${colors.cyan}Corruption Check:${colors.reset}`);
  if (corruptionCheck) {
    console.log(`  ✅ ${colors.green}No corruption detected${colors.reset}`);
  } else {
    console.log(`  ❌ ${colors.red}Corruption patterns found${colors.reset}`);
  }
  
  // Final verdict
  console.log('\n' + '='.repeat(60));
  if (overallReady) {
    console.log(`${colors.bright}${colors.green}✅ SYSTEM READY FOR AGENTIC TEAM SESSION${colors.reset}`);
    console.log(`${colors.green}All checks passed. You may proceed with agent deployment.${colors.reset}`);
  } else {
    console.log(`${colors.bright}${colors.red}❌ SYSTEM NOT READY - ISSUES DETECTED${colors.reset}`);
    console.log(`${colors.red}Please fix the issues above before proceeding.${colors.reset}`);
  }
  console.log('='.repeat(60) + '\n');
  
  // Save report to file
  const reportPath = `chat_logs/orchestrator/${sessionId}/readiness_report.json`;
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log.info(`Report saved to: ${reportPath}`);
  
  return overallReady;
}

/**
 * Main execution
 */
async function main() {
  console.log(`${colors.bright}${colors.magenta}
╔════════════════════════════════════════════════════════════╗
║     AGENTIC TEAM SESSION START - AUTOMATED VERIFICATION     ║
║                         Version 1.0.0                       ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}`);
  
  try {
    // Phase 0: Initialize
    const sessionId = await initializeSession();
    
    // Phase 1: Infrastructure check
    const healthChecks = await checkInfrastructure();
    
    // Phase 2: File size check
    const fileSizeIssues = await checkFileSizes();
    
    // Phase 3: Corruption check
    const corruptionCheck = await checkForCorruption();
    
    // Phase 4: Generate report
    const ready = await generateSessionReport(
      sessionId,
      healthChecks,
      fileSizeIssues,
      corruptionCheck
    );
    
    // Exit with appropriate code
    process.exit(ready ? 0 : 1);
    
  } catch (error) {
    log.error('Session start failed with unexpected error:');
    console.error(error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main, checkInfrastructure, checkFileSizes, checkForCorruption };