#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

interface Agent {
  name: string;
  role: string;
  status: string;
  mcp_tools: string[];
  dependencies: string[];
  immediate_task?: string;
}

interface MemoryJson {
  project: {
    name: string;
    version: string;
    status: string;
  };
  agents: Record<string, Agent>;
  session_context: {
    current_session: number;
    last_update: string;
    session_status: string;
    immediate_priorities: string[];
  };
  technical_debt: {
    immediate_attention: string[];
  };
}

class SessionInitializer {
  private memoryPath: string;
  private sessionLogsPath: string;
  
  constructor() {
    this.memoryPath = path.join(projectRoot, '.claude', 'memory.json');
    this.sessionLogsPath = path.join(projectRoot, 'chat_logs', 'orchestrator');
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

  async verifyAgentStatuses(memory: MemoryJson): Promise<void> {
    console.log('\n🔍 Verifying Agent Statuses:');
    
    for (const [agentId, agent] of Object.entries(memory.agents)) {
      const statusIcon = agent.status === 'active' ? '✅' : '⚠️ ';
      const mcpTools = agent.mcp_tools.length > 0 ? `[${agent.mcp_tools.join(', ')}]` : '❌ No MCP tools';
      
      console.log(`  ${statusIcon} ${agent.name || agentId}: ${agent.status} ${mcpTools}`);
      
      if (agent.immediate_task) {
        console.log(`    🎯 Immediate Task: ${agent.immediate_task}`);
      }
    }
  }

  async checkProjectHealth(): Promise<void> {
    console.log('\n🏥 Project Health Check:');
    
    const checks = [
      { name: 'Security Middleware', file: 'server/middleware/security.ts' },
      { name: 'Vitest Configuration', file: 'vitest.config.ts' },
      { name: 'Test Setup', file: 'tests/setup.ts' },
      { name: 'Package.json Scripts', file: 'package.json' },
      { name: 'Memory System', file: '.claude/memory.json' },
      { name: 'Development Rules', file: 'docs/development/dev_rules.md' },
      { name: 'Implementation Plan', file: 'updates/plan.md' }
    ];

    for (const check of checks) {
      try {
        await fs.access(path.join(projectRoot, check.file));
        console.log(`  ✅ ${check.name}`);
      } catch {
        console.log(`  ❌ ${check.name} - Missing`);
      }
    }
  }

  async generateSessionSummary(memory: MemoryJson): Promise<void> {
    console.log('\n📋 Session Handoff Summary:');
    console.log(`  Session: ${memory.session_context.current_session + 1}`);
    console.log(`  Status: ${memory.session_context.session_status}`);
    console.log(`  Last Update: ${memory.session_context.last_update}`);
    
    console.log('\n🚨 Immediate Priorities:');
    memory.session_context.immediate_priorities.forEach((priority, index) => {
      console.log(`  ${index + 1}. ${priority}`);
    });

    console.log('\n⚠️  Technical Debt:');
    memory.technical_debt.immediate_attention.forEach((debt, index) => {
      console.log(`  ${index + 1}. ${debt}`);
    });
  }

  async generateTodoList(memory: MemoryJson): Promise<void> {
    console.log('\n📝 Suggested Todo List:');
    
    const todos = [
      ...memory.session_context.immediate_priorities.map(priority => ({
        content: priority,
        status: 'pending',
        priority: 'high'
      })),
      ...memory.technical_debt.immediate_attention.map(debt => ({
        content: debt,
        status: 'pending',
        priority: 'medium'
      }))
    ];

    todos.forEach((todo, index) => {
      const priorityIcon = todo.priority === 'high' ? '🔥' : '⚠️ ';
      console.log(`  ${index + 1}. ${priorityIcon} ${todo.content}`);
    });
  }

  async checkGitStatus(): Promise<void> {
    console.log('\n📊 Git Status:');
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);

      const { stdout: branch } = await execAsync('git branch --show-current');
      const { stdout: status } = await execAsync('git status --porcelain');
      
      console.log(`  Current Branch: ${branch.trim()}`);
      
      if (status.trim()) {
        console.log('  Modified Files:');
        status.trim().split('\n').forEach(line => {
          console.log(`    ${line}`);
        });
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

  async run(): Promise<void> {
    console.log('🚀 Strive Website - Session Initialization Script');
    console.log('=' .repeat(50));
    
    const memory = await this.loadMemory();
    
    await this.checkProjectHealth();
    await this.verifyAgentStatuses(memory);
    await this.checkGitStatus();
    await this.generateSessionSummary(memory);
    await this.generateTodoList(memory);

    const latestSession = await this.findLatestSessionLog();
    if (latestSession) {
      console.log(`\n📖 Latest Session Log: ${latestSession}`);
      console.log(`   Path: ${path.join(this.sessionLogsPath, latestSession)}`);
    }

    console.log('\n✨ Session initialization complete!');
    console.log('   Ready to continue with the next phase of development.');
    console.log('\n' + '='.repeat(50));
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