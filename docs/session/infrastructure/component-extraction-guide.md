# Component Extraction and File Management Guide

## Overview
Strategies for breaking down large files into maintainable components while preserving functionality and optimizing project structure.

## File Size Management

### File Size Limits and Guidelines
```typescript
// File size guidelines for the project
export const fileSizeGuidelines = {
  // Maximum recommended file sizes (lines of code)
  limits: {
    component: 300,      // React components
    utility: 200,       // Utility functions
    hook: 150,          // Custom hooks
    page: 500,          // Page components
    config: 100,        // Configuration files
  },
  
  // Warning thresholds
  warnings: {
    component: 200,
    utility: 150,
    hook: 100,
    page: 300,
    config: 75,
  },
}

// File complexity metrics
export function analyzeFileComplexity(filePath: string): {
  lines: number
  functions: number
  components: number
  complexity: 'low' | 'medium' | 'high' | 'critical'
} {
  // Implementation would analyze actual file content
  // This is a conceptual structure
  return {
    lines: 0,
    functions: 0,
    components: 0,
    complexity: 'low',
  }
}
```

### Automated File Size Monitoring
```bash
#!/bin/bash
# scripts/check-file-sizes.sh

echo "📏 Checking file sizes..."

# Function to count lines in a file (excluding comments and empty lines)
count_meaningful_lines() {
  grep -v '^\s*$\|^\s*//\|^\s*\*' "$1" | wc -l
}

# Check component files
find client/src/components -name "*.tsx" -o -name "*.ts" | while read -r file; do
  lines=$(count_meaningful_lines "$file")
  filename=$(basename "$file")
  
  if [ "$lines" -gt 300 ]; then
    echo "❌ $filename: $lines lines (CRITICAL - exceeds 300 line limit)"
  elif [ "$lines" -gt 200 ]; then
    echo "⚠️  $filename: $lines lines (WARNING - consider extraction)"
  elif [ "$lines" -gt 150 ]; then
    echo "📝 $filename: $lines lines (MONITOR - approaching limit)"
  fi
done

# Check for overly complex files
echo ""
echo "🔍 Checking for files that need extraction:"
find client/src -name "*.tsx" -exec wc -l {} \; | sort -nr | head -10 | while read -r lines file; do
  if [ "$lines" -gt 200 ]; then
    echo "🎯 $file: $lines lines - candidate for extraction"
  fi
done
```

## Component Extraction Patterns

### Large Component Breakdown Strategy
```typescript
// BEFORE: Large monolithic component (400+ lines)
// src/components/Dashboard.tsx - TOO LARGE

// AFTER: Extracted component structure
// src/components/Dashboard/
// ├── index.tsx (main component - <100 lines)
// ├── DashboardHeader.tsx
// ├── DashboardSidebar.tsx
// ├── DashboardContent.tsx
// ├── DashboardMetrics.tsx
// ├── hooks/
// │   ├── useDashboardData.ts
// │   └── useDashboardFilters.ts
// ├── types/
// │   └── dashboard.types.ts
// └── utils/
//     ├── dashboard.utils.ts
//     └── metrics.utils.ts
```

### Step-by-Step Component Extraction

#### 1. Identify Extraction Candidates
```typescript
// src/components/Dashboard/analysis.ts
export function identifyExtractionCandidates(componentCode: string) {
  const candidates = {
    // Repeated JSX patterns
    repeatedPatterns: [],
    
    // Large render functions
    largeRenderFunctions: [],
    
    // Complex state logic
    stateLogic: [],
    
    // Utility functions
    utilityFunctions: [],
    
    // Event handlers
    eventHandlers: [],
  }
  
  // Analysis logic would go here
  return candidates
}
```

#### 2. Extract Sub-components
```typescript
// Original Dashboard.tsx (BEFORE - 400+ lines)
export function Dashboard() {
  const [data, setData] = useState(null)
  const [filters, setFilters] = useState({})
  const [metrics, setMetrics] = useState({})
  
  // ... 300+ lines of component logic
  
  return (
    <div className="dashboard">
      {/* Header section - 50 lines */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="controls">
          {/* ... complex header logic */}
        </div>
      </div>
      
      {/* Sidebar - 80 lines */}
      <div className="dashboard-sidebar">
        {/* ... complex sidebar logic */}
      </div>
      
      {/* Main content - 150+ lines */}
      <div className="dashboard-content">
        {/* ... complex content logic */}
      </div>
    </div>
  )
}
```

```typescript
// AFTER: Extracted components

// src/components/Dashboard/index.tsx (Main component - <100 lines)
import { DashboardHeader } from './DashboardHeader'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardContent } from './DashboardContent'
import { useDashboardData } from './hooks/useDashboardData'

export function Dashboard() {
  const { data, filters, metrics, isLoading } = useDashboardData()
  
  if (isLoading) return <DashboardSkeleton />
  
  return (
    <div className="dashboard">
      <DashboardHeader filters={filters} />
      <div className="dashboard-body">
        <DashboardSidebar />
        <DashboardContent data={data} metrics={metrics} />
      </div>
    </div>
  )
}

// src/components/Dashboard/DashboardHeader.tsx (<50 lines)
interface DashboardHeaderProps {
  filters: FilterState
}

export function DashboardHeader({ filters }: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <h1>Dashboard</h1>
      <DashboardControls filters={filters} />
      <DashboardActions />
    </header>
  )
}

// src/components/Dashboard/DashboardSidebar.tsx (<80 lines)
export function DashboardSidebar() {
  const { navigation, isCollapsed } = useSidebar()
  
  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <DashboardNavigation items={navigation} />
      <DashboardQuickActions />
    </aside>
  )
}

// src/components/Dashboard/DashboardContent.tsx (<100 lines)
interface DashboardContentProps {
  data: DashboardData
  metrics: MetricsData
}

export function DashboardContent({ data, metrics }: DashboardContentProps) {
  return (
    <main className="dashboard-content">
      <DashboardMetrics metrics={metrics} />
      <DashboardCharts data={data} />
      <DashboardTables data={data} />
    </main>
  )
}
```

#### 3. Extract Custom Hooks
```typescript
// src/components/Dashboard/hooks/useDashboardData.ts
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

export function useDashboardData() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'last30days',
    category: 'all',
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard', filters],
    queryFn: () => fetchDashboardData(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const metrics = useMemo(() => {
    if (!data) return {}
    return calculateMetrics(data)
  }, [data])

  return {
    data,
    filters,
    setFilters,
    metrics,
    isLoading,
    error,
  }
}
```

#### 4. Extract Types and Utilities
```typescript
// src/components/Dashboard/types/dashboard.types.ts
export interface DashboardData {
  revenue: number[]
  users: UserData[]
  transactions: Transaction[]
  analytics: AnalyticsData
}

export interface FilterState {
  dateRange: string
  category: string
  status?: string
}

export interface MetricsData {
  totalRevenue: number
  userGrowth: number
  conversionRate: number
}

// src/components/Dashboard/utils/dashboard.utils.ts
import { DashboardData, MetricsData } from '../types/dashboard.types'

export function calculateMetrics(data: DashboardData): MetricsData {
  return {
    totalRevenue: data.revenue.reduce((sum, val) => sum + val, 0),
    userGrowth: calculateGrowthRate(data.users),
    conversionRate: calculateConversionRate(data.analytics),
  }
}

export function formatDashboardData(rawData: any): DashboardData {
  return {
    revenue: rawData.revenue || [],
    users: rawData.users || [],
    transactions: rawData.transactions || [],
    analytics: rawData.analytics || {},
  }
}
```

## Automated Extraction Tools

### Component Extraction Script
```bash
#!/bin/bash
# scripts/extract-component.sh

COMPONENT_NAME=$1
SOURCE_FILE=$2
OUTPUT_DIR=$3

if [ -z "$COMPONENT_NAME" ] || [ -z "$SOURCE_FILE" ]; then
  echo "Usage: ./extract-component.sh <ComponentName> <SourceFile> [OutputDir]"
  exit 1
fi

OUTPUT_DIR=${OUTPUT_DIR:-"client/src/components/$COMPONENT_NAME"}

echo "🔧 Extracting component: $COMPONENT_NAME"
echo "📁 Source: $SOURCE_FILE"
echo "📂 Output: $OUTPUT_DIR"

# Create component directory structure
mkdir -p "$OUTPUT_DIR/hooks"
mkdir -p "$OUTPUT_DIR/types"
mkdir -p "$OUTPUT_DIR/utils"

# Generate main component file
cat > "$OUTPUT_DIR/index.tsx" << EOF
import { FC } from 'react'

export interface ${COMPONENT_NAME}Props {
  // Define props here
}

export const $COMPONENT_NAME: FC<${COMPONENT_NAME}Props> = (props) => {
  return (
    <div className="$(echo $COMPONENT_NAME | tr '[:upper:]' '[:lower:]')">
      {/* Component content */}
    </div>
  )
}

export default $COMPONENT_NAME
EOF

# Generate types file
cat > "$OUTPUT_DIR/types/index.ts" << EOF
export interface ${COMPONENT_NAME}Props {
  // Define component props
}

export interface ${COMPONENT_NAME}State {
  // Define component state
}
EOF

echo "✅ Component structure created"
echo "📝 Next steps:"
echo "  1. Move relevant code from $SOURCE_FILE to $OUTPUT_DIR/index.tsx"
echo "  2. Extract hooks to $OUTPUT_DIR/hooks/"
echo "  3. Extract utilities to $OUTPUT_DIR/utils/"
echo "  4. Update imports in $SOURCE_FILE"
```

### Import Reorganization Tool
```typescript
// scripts/reorganize-imports.ts
import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'

interface ImportGroup {
  react: string[]
  external: string[]
  internal: string[]
  relative: string[]
}

function reorganizeImports(filePath: string): void {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  
  const imports: ImportGroup = {
    react: [],
    external: [],
    internal: [],
    relative: [],
  }
  
  const nonImportLines: string[] = []
  let inImportSection = true
  
  for (const line of lines) {
    if (line.trim().startsWith('import ') && inImportSection) {
      categorizeImport(line, imports)
    } else {
      if (inImportSection && line.trim() !== '') {
        inImportSection = false
      }
      nonImportLines.push(line)
    }
  }
  
  // Rebuild file with organized imports
  const organizedImports = [
    ...imports.react,
    imports.external.length > 0 ? '' : null,
    ...imports.external,
    imports.internal.length > 0 ? '' : null,
    ...imports.internal,
    imports.relative.length > 0 ? '' : null,
    ...imports.relative,
    '',
  ].filter(line => line !== null)
  
  const newContent = [...organizedImports, ...nonImportLines].join('\n')
  writeFileSync(filePath, newContent)
}

function categorizeImport(line: string, imports: ImportGroup): void {
  if (line.includes('from \'react\'') || line.includes('from "react"')) {
    imports.react.push(line)
  } else if (line.includes('from \'./') || line.includes('from "../')) {
    imports.relative.push(line)
  } else if (line.includes('from \'@/') || line.includes('from "@/')) {
    imports.internal.push(line)
  } else {
    imports.external.push(line)
  }
}

// Process all TypeScript/JSX files
const files = glob.sync('client/src/**/*.{ts,tsx}')
files.forEach(reorganizeImports)
```

## File Structure Patterns

### Component Directory Structure
```
src/components/
├── ui/                     # Basic UI components (<100 lines each)
│   ├── button.tsx
│   ├── input.tsx
│   ├── modal.tsx
│   └── index.ts           # Barrel exports
├── layout/                # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── sidebar.tsx
│   └── navigation.tsx
├── features/              # Feature-specific components
│   ├── dashboard/
│   │   ├── index.tsx      # Main component
│   │   ├── components/    # Sub-components
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # Type definitions
│   │   └── utils/         # Utilities
│   └── contact/
│       ├── ContactForm.tsx
│       ├── ContactInfo.tsx
│       └── hooks/
└── shared/                # Shared components
    ├── LoadingSpinner.tsx
    ├── ErrorBoundary.tsx
    └── SEO.tsx
```

### Barrel Export Strategy
```typescript
// src/components/ui/index.ts
export { Button } from './button'
export { Input } from './input'
export { Modal } from './modal'
export { Card } from './card'

// Usage in other files
import { Button, Input, Modal } from '@/components/ui'
```

## Refactoring Checklist

### Pre-Extraction Checklist
```typescript
// Component extraction checklist
export const extractionChecklist = {
  preparation: [
    'Identify component boundaries',
    'Map prop requirements',
    'List shared state dependencies',
    'Document external API calls',
    'Note styling dependencies',
  ],
  
  extraction: [
    'Create component directory structure',
    'Extract main component logic',
    'Move related hooks to hooks/',
    'Move types to types/',
    'Move utilities to utils/',
  ],
  
  verification: [
    'Test component in isolation',
    'Verify all imports work',
    'Check TypeScript compilation',
    'Run existing tests',
    'Verify styling is preserved',
  ],
  
  cleanup: [
    'Remove extracted code from source',
    'Update imports in source file',
    'Update barrel exports',
    'Update documentation',
    'Run full test suite',
  ],
}
```

### Post-Extraction Validation
```bash
#!/bin/bash
# scripts/validate-extraction.sh

COMPONENT_DIR=$1

if [ -z "$COMPONENT_DIR" ]; then
  echo "Usage: ./validate-extraction.sh <ComponentDirectory>"
  exit 1
fi

echo "🔍 Validating component extraction: $COMPONENT_DIR"

# Check file structure
echo "📁 Checking directory structure..."
if [ ! -f "$COMPONENT_DIR/index.tsx" ]; then
  echo "❌ Missing main component file: index.tsx"
  exit 1
fi

# Check TypeScript compilation
echo "🔧 Checking TypeScript compilation..."
if ! npx tsc --noEmit; then
  echo "❌ TypeScript compilation failed"
  exit 1
fi

# Check for circular dependencies
echo "🔄 Checking for circular dependencies..."
npx madge --circular --extensions ts,tsx "$COMPONENT_DIR"

# Run component tests
echo "🧪 Running component tests..."
if [ -f "$COMPONENT_DIR/__tests__/index.test.tsx" ]; then
  npm run test -- "$COMPONENT_DIR"
fi

# Check bundle size impact
echo "📦 Checking bundle size impact..."
npm run build > /dev/null
echo "Bundle analysis available at dist/stats.html"

echo "✅ Component extraction validation complete"
```

## Maintenance and Monitoring

### File Size Monitoring
```typescript
// scripts/file-size-monitor.ts
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

interface FileSizeReport {
  path: string
  lines: number
  size: number
  lastModified: Date
  complexity: 'low' | 'medium' | 'high' | 'critical'
}

class FileSizeMonitor {
  private readonly maxLines = 300
  private readonly warningLines = 200
  
  generateReport(directory: string): FileSizeReport[] {
    const report: FileSizeReport[] = []
    
    this.scanDirectory(directory, report)
    
    return report.sort((a, b) => b.lines - a.lines)
  }
  
  private scanDirectory(dir: string, report: FileSizeReport[]): void {
    const items = readdirSync(dir)
    
    for (const item of items) {
      const fullPath = join(dir, item)
      const stat = statSync(fullPath)
      
      if (stat.isDirectory() && !item.includes('node_modules')) {
        this.scanDirectory(fullPath, report)
      } else if (item.match(/\.(tsx?|jsx?)$/)) {
        const lines = this.countLines(fullPath)
        report.push({
          path: fullPath,
          lines,
          size: stat.size,
          lastModified: stat.mtime,
          complexity: this.assessComplexity(lines),
        })
      }
    }
  }
  
  private countLines(filePath: string): number {
    // Implementation to count meaningful lines
    // Excluding comments, empty lines, etc.
    return 0 // Placeholder
  }
  
  private assessComplexity(lines: number): 'low' | 'medium' | 'high' | 'critical' {
    if (lines > this.maxLines) return 'critical'
    if (lines > this.warningLines) return 'high'
    if (lines > 100) return 'medium'
    return 'low'
  }
}

// Usage
const monitor = new FileSizeMonitor()
const report = monitor.generateReport('client/src')

// Alert on files needing extraction
report.filter(f => f.complexity === 'critical').forEach(file => {
  console.log(`🚨 CRITICAL: ${file.path} (${file.lines} lines)`)
})
```

This guide provides comprehensive strategies for maintaining clean, manageable code through systematic component extraction and file organization.