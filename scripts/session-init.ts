#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

interface Agent {
  role: string;
  model: string;
  responsibilities: string[];
  mcp_tools: string[];
  tech_stack?: string[];
  critical_reminders?: string[];
}

interface WorkflowRules {
  file_purposes: Record<string, string>;
  mandatory_actions: {
    session_start: string[];
    during_session: string[];
    session_end: string[];
  };
  critical_reminders: string[];
  common_mistakes_to_avoid: string[];
}

interface MemoryJson {
  project: {
    name: string;
    version: string;
    status: string;
  };
  workflow_rules: WorkflowRules;
  agents: Record<string, Agent>;
  file_locations: {
    critical_files: Record<string, string>;
  };
}

class SessionInitializer {
  private memoryPath: string;
  private sessionLogsPath: string;
  private planPath: string;
  private changeLogPath: string;
  
  constructor() {
    this.memoryPath = path.join(projectRoot, '.claude', 'memory.json');
    this.sessionLogsPath = path.join(projectRoot, 'chat_logs', 'orchestrator');
    this.planPath = path.join(projectRoot, 'updates', 'plan.md');
    this.changeLogPath = path.join(projectRoot, 'change_log.md');
  }

  async loadMemory(): Promise<MemoryJson> {
    try {
      const memoryContent = await fs.readFile(this.memoryPath, 'utf-8');
      return JSON.parse(memoryContent);
    } catch (error) {
      console.error('❌ Failed to load memory.json:', error);
      process.exit(1);
    }
  }

  async checkWorkflowCompliance(memory: MemoryJson): Promise<void> {
    console.log('\n🔍 Workflow Compliance Check:');
    
    // Check if memory.json is properly structured as central brain
    const hasWorkflowRules = !!memory.workflow_rules;
    console.log(`  ${hasWorkflowRules ? '✅' : '❌'} Memory.json has workflow_rules section`);
    
    if (hasWorkflowRules) {
      const hasFilePurposes = Object.keys(memory.workflow_rules.file_purposes).length > 0;
      const hasMandatoryActions = memory.workflow_rules.mandatory_actions.session_start.length > 0;
      const hasCriticalReminders = memory.workflow_rules.critical_reminders.length > 0;
      
      console.log(`  ${hasFilePurposes ? '✅' : '❌'} File purposes defined`);
      console.log(`  ${hasMandatoryActions ? '✅' : '❌'} Mandatory actions defined`);  
      console.log(`  ${hasCriticalReminders ? '✅' : '❌'} Critical reminders present`);
    }

    // Check for workflow rule violations (things that shouldn't be in memory.json)
    const memoryStr = JSON.stringify(memory);
    const violations = [
      { pattern: /"completed_session_\d+"/, name: 'Task completion arrays' },
      { pattern: /"immediate_priorities"/, name: 'Immediate priorities list' },
      { pattern: /"technical_debt"/, name: 'Technical debt tracking' },
      { pattern: /"session_context"/, name: 'Session context data' }
    ];

    let violationsFound = false;
    violations.forEach(violation => {
      if (violation.pattern.test(memoryStr)) {
        console.log(`  ❌ VIOLATION: ${violation.name} found in memory.json (should be in chat logs or plan.md)`);
        violationsFound = true;
      }
    });

    if (!violationsFound) {
      console.log('  ✅ No workflow violations detected - memory.json is clean brain');
    }
  }

  async verifyAgentStatuses(memory: MemoryJson): Promise<void> {
    console.log('\n🤖 Agent Configuration Status:');
    
    for (const [agentId, agent] of Object.entries(memory.agents)) {
      const hasContextMcp = agent.mcp_tools.includes('context7');
      const mcpIcon = hasContextMcp ? '✅' : '⚠️ ';
      const mcpTools = agent.mcp_tools.length > 0 ? `[${agent.mcp_tools.join(', ')}]` : '❌ No MCP tools';
      
      console.log(`  ${mcpIcon} ${agentId}: ${agent.model} ${mcpTools}`);
      
      if (agent.critical_reminders && agent.critical_reminders.length > 0) {
        console.log(`    💡 Has ${agent.critical_reminders.length} critical reminders`);
      }
    }
  }

  async checkCriticalFiles(): Promise<void> {
    console.log('\n📁 Critical File Status:');
    
    const criticalFiles = [
      { name: 'Memory System', path: '.claude/memory.json', purpose: 'Central brain (rules only)' },
      { name: 'Implementation Plan', path: 'updates/plan.md', purpose: 'Living progress tracker' },
      { name: 'Change Log', path: 'change_log.md', purpose: 'Code change tracking' },
      { name: 'Development Rules', path: 'docs/development/dev_rules.md', purpose: 'Coding standards' },
      { name: 'Session Template', path: 'chat_logs/templates/session_chat_log_template.md', purpose: 'Chat log format' }
    ];

    for (const file of criticalFiles) {
      try {
        const filePath = path.join(projectRoot, file.path);
        await fs.access(filePath);
        console.log(`  ✅ ${file.name} - ${file.purpose}`);
      } catch {
        console.log(`  ❌ ${file.name} - MISSING (${file.purpose})`);
      }
    }
  }

  async generateWorkflowGuidance(memory: MemoryJson): Promise<void> {
    console.log('\n📋 Session Start Workflow:');
    
    if (memory.workflow_rules?.mandatory_actions?.session_start) {
      memory.workflow_rules.mandatory_actions.session_start.forEach((action, index) => {
        console.log(`  ${index + 1}. ${action}`);
      });
    } else {
      console.log('  ⚠️  No session start workflow defined in memory.json');
    }

    console.log('\n⚠️  Critical Reminders:');
    if (memory.workflow_rules?.critical_reminders) {
      memory.workflow_rules.critical_reminders.forEach((reminder, index) => {
        console.log(`  ${index + 1}. ${reminder}`);
      });
    }

    console.log('\n🚫 Common Mistakes to Avoid:');
    if (memory.workflow_rules?.common_mistakes_to_avoid) {
      memory.workflow_rules.common_mistakes_to_avoid.forEach((mistake, index) => {
        console.log(`  ${index + 1}. ${mistake}`);
      });
    }
  }

  async checkGitStatus(): Promise<void> {
    console.log('\n📊 Git Repository Status:');
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);

      const { stdout: branch } = await execAsync('git branch --show-current');
      const { stdout: status } = await execAsync('git status --porcelain');
      
      console.log(`  Current Branch: ${branch.trim()}`);
      
      if (status.trim()) {
        console.log('  Modified Files:');
        const modifiedFiles = status.trim().split('\n');
        modifiedFiles.forEach(line => {
          const [statusCode, filename] = line.trim().split(/\s+/);
          const statusIcon = statusCode.includes('M') ? '📝' : statusCode.includes('??') ? '📄' : '🔄';
          console.log(`    ${statusIcon} ${filename}`);
        });
        console.log(`  Total: ${modifiedFiles.length} modified files`);
      } else {
        console.log('  ✅ Working directory clean');
      }
    } catch (error) {
      console.log('  ⚠️  Could not check git status');
    }
  }

  async findLatestSessionLog(): Promise<string | null> {
    try {
      const sessionFiles = await fs.readdir(this.sessionLogsPath);
      const sessionNumbers = sessionFiles
        .filter(file => file.match(/^session\d+\.md$/))
        .map(file => parseInt(file.match(/\d+/)?.[0] || '0'))
        .sort((a, b) => b - a);

      if (sessionNumbers.length > 0) {
        return `session${sessionNumbers[0]}.md`;
      }
      return null;
    } catch {
      return null;
    }
  }

  async checkDocumentationStatus(): Promise<void> {
    console.log('\n📚 Documentation File Status:');

    // Check plan.md for recent updates
    try {
      const planContent = await fs.readFile(this.planPath, 'utf-8');
      const hasPhase1Complete = planContent.includes('PHASE 1') && (planContent.includes('✅') || planContent.includes('complete'));
      console.log(`  ${hasPhase1Complete ? '✅' : '⚠️'} Plan.md - Phase 1 status marked`);
    } catch {
      console.log('  ❌ Plan.md - File missing');
    }

    // Check change_log.md for recent changes
    try {
      const changeContent = await fs.readFile(this.changeLogPath, 'utf-8');
      const hasSessionChanges = changeContent.includes('Session 3') || changeContent.includes('Session 4');
      console.log(`  ${hasSessionChanges ? '✅' : '⚠️'} Change_log.md - Recent session changes documented`);
    } catch {
      console.log('  ❌ Change_log.md - File missing');
    }

    // Check for latest session log
    const latestSession = await this.findLatestSessionLog();
    if (latestSession) {
      console.log(`  ✅ Latest Session Log: ${latestSession}`);
      console.log(`     Path: ${path.join(this.sessionLogsPath, latestSession)}`);
    } else {
      console.log('  ❌ No session logs found');
    }
  }

  async run(): Promise<void> {
    console.log('🚀 Strive Website - Enhanced Session Initialization');
    console.log('🔧 Workflow Compliance & Health Check System');
    console.log('=' .repeat(55));
    
    const memory = await this.loadMemory();
    
    await this.checkWorkflowCompliance(memory);
    await this.verifyAgentStatuses(memory);
    await this.checkCriticalFiles();
    await this.checkGitStatus();
    await this.checkDocumentationStatus();
    await this.generateWorkflowGuidance(memory);

    console.log('\n✨ Enhanced Session Initialization Complete!');
    console.log('   📋 Follow the session start workflow above');
    console.log('   🧠 Memory.json is your central brain - use it for rules only');  
    console.log('   📖 Read previous session logs for context');
    console.log('   📊 Check plan.md for current progress');
    console.log('\n' + '='.repeat(55));
  }
}

// Run the session initializer
if (import.meta.url === `file://${process.argv[1]}`) {
  const initializer = new SessionInitializer();
  initializer.run().catch(error => {
    console.error('❌ Session initialization failed:', error);
    process.exit(1);
  });
}

export default SessionInitializer;