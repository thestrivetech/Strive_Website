#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';

interface DirectoryNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  size?: number;
  children?: DirectoryNode[];
}

interface ProjectStats {
  totalFiles: number;
  totalDirectories: number;
  fileTypes: Record<string, number>;
  largestFiles: Array<{ path: string; size: number }>;
}

class DirectoryMapper {
  private ignorePatterns = [
    'node_modules',
    '.git',
    'dist',
    'build',
    '.next',
    'coverage',
    '.nyc_output',
    'logs',
    '*.log',
    '.env',
    '.env.local',
    '.env.*.local',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.DS_Store',
    'Thumbs.db'
  ];

  private stats: ProjectStats = {
    totalFiles: 0,
    totalDirectories: 0,
    fileTypes: {},
    largestFiles: []
  };

  private shouldIgnore(name: string, fullPath: string): boolean {
    return this.ignorePatterns.some(pattern => {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        return regex.test(name);
      }
      return name === pattern || fullPath.includes(`/${pattern}/`) || fullPath.includes(`\\${pattern}\\`);
    });
  }

  private mapDirectory(dirPath: string, maxDepth: number = 10, currentDepth: number = 0): DirectoryNode {
    const name = path.basename(dirPath);
    const node: DirectoryNode = {
      name,
      type: 'directory',
      path: dirPath,
      children: []
    };

    this.stats.totalDirectories++;

    if (currentDepth >= maxDepth) {
      node.children = [{ name: '...', type: 'directory', path: '...' }];
      return node;
    }

    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        
        if (this.shouldIgnore(item, itemPath)) {
          continue;
        }

        try {
          const stat = fs.statSync(itemPath);
          
          if (stat.isDirectory()) {
            node.children!.push(this.mapDirectory(itemPath, maxDepth, currentDepth + 1));
          } else {
            const ext = path.extname(item).toLowerCase();
            this.stats.fileTypes[ext] = (this.stats.fileTypes[ext] || 0) + 1;
            this.stats.totalFiles++;
            
            node.children!.push({
              name: item,
              type: 'file',
              path: itemPath,
              size: stat.size
            });

            // Track largest files
            this.stats.largestFiles.push({ path: itemPath, size: stat.size });
            this.stats.largestFiles.sort((a, b) => b.size - a.size);
            if (this.stats.largestFiles.length > 10) {
              this.stats.largestFiles = this.stats.largestFiles.slice(0, 10);
            }
          }
        } catch (error) {
          // Skip files/directories that can't be accessed
          continue;
        }
      }

      // Sort children: directories first, then files, alphabetically
      node.children!.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

    } catch (error) {
      node.children = [{ name: '[ACCESS DENIED]', type: 'file', path: '[ACCESS DENIED]' }];
    }

    return node;
  }

  private renderTree(node: DirectoryNode, prefix: string = '', isLast: boolean = true): string {
    const connector = isLast ? '└── ' : '├── ';
    const extension = prefix + connector;
    
    let result = '';
    
    if (node.type === 'file') {
      const sizeStr = node.size ? ` (${this.formatFileSize(node.size)})` : '';
      result += `${extension}${node.name}${sizeStr}\n`;
    } else {
      result += `${extension}📁 ${node.name}/\n`;
      
      if (node.children && node.children.length > 0) {
        const nextPrefix = prefix + (isLast ? '    ' : '│   ');
        
        node.children.forEach((child, index) => {
          const isLastChild = index === node.children!.length - 1;
          result += this.renderTree(child, nextPrefix, isLastChild);
        });
      }
    }
    
    return result;
  }

  private formatFileSize(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 10) / 10 + ' ' + sizes[i];
  }

  private generateSummary(): string {
    let summary = '\n' + '='.repeat(80) + '\n';
    summary += 'PROJECT DIRECTORY ANALYSIS SUMMARY\n';
    summary += '='.repeat(80) + '\n\n';
    
    summary += `📊 STATISTICS:\n`;
    summary += `   Total Files: ${this.stats.totalFiles}\n`;
    summary += `   Total Directories: ${this.stats.totalDirectories}\n\n`;
    
    summary += `📄 FILE TYPES:\n`;
    const sortedTypes = Object.entries(this.stats.fileTypes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15);
    
    for (const [ext, count] of sortedTypes) {
      const extName = ext || '[no extension]';
      summary += `   ${extName}: ${count}\n`;
    }
    
    summary += `\n📈 LARGEST FILES:\n`;
    for (const file of this.stats.largestFiles.slice(0, 10)) {
      const relativePath = path.relative(process.cwd(), file.path);
      summary += `   ${this.formatFileSize(file.size)}: ${relativePath}\n`;
    }
    
    summary += '\n' + '='.repeat(80) + '\n';
    return summary;
  }

  public async mapProject(rootPath: string = process.cwd()): Promise<void> {
    console.log('🔍 Mapping project directory structure...');
    console.log(`📁 Root: ${rootPath}`);
    
    const startTime = Date.now();
    const tree = this.mapDirectory(rootPath);
    const endTime = Date.now();
    
    console.log(`⏱️  Analysis completed in ${endTime - startTime}ms`);
    
    const output = [
      `STRIVE WEBSITE - DIRECTORY STRUCTURE MAP`,
      `Generated: ${new Date().toISOString()}`,
      `Root Path: ${rootPath}`,
      '=' .repeat(80),
      '',
      this.renderTree(tree),
      this.generateSummary()
    ].join('\n');
    
    const outputFile = path.join(rootPath, 'project-directory-map.txt');
    fs.writeFileSync(outputFile, output, 'utf8');
    
    console.log(`✅ Directory map saved to: ${outputFile}`);
    console.log(`📊 Found ${this.stats.totalFiles} files in ${this.stats.totalDirectories} directories`);
    
    // Also create a compact JSON version for programmatic use
    const jsonOutput = {
      generatedAt: new Date().toISOString(),
      rootPath,
      stats: this.stats,
      structure: tree
    };
    
    const jsonFile = path.join(rootPath, 'project-directory-map.json');
    fs.writeFileSync(jsonFile, JSON.stringify(jsonOutput, null, 2), 'utf8');
    console.log(`📋 JSON structure saved to: ${jsonFile}`);
  }
}

// Run the mapper
async function main() {
  const mapper = new DirectoryMapper();
  await mapper.mapProject();
}

// Check if this file is being run directly
const isRunningDirectly = process.argv[1] && process.argv[1].endsWith('directory-mapper.ts');
if (isRunningDirectly) {
  main().catch(console.error);
}

export default DirectoryMapper;