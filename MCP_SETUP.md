# MCP Server Setup for Replit

## Quick Setup Commands

Run these commands in sequence to install all MCP servers:

```bash
# 1. Install uv package manager (required for Serena)
curl -LsSf https://astral.sh/uv/install.sh | sh
source /home/runner/workspace/.local/bin/env

# 2. Install Serena MCP (code search & analysis)
claude mcp add serena -- /home/runner/workspace/.local/bin/uvx --from git+https://github.com/oraios/serena serena-mcp-server --project /home/runner/workspace

# 3. Install Playwright MCP (browser automation)
claude mcp add playwright npx -- @playwright/mcp@latest

# 4. Install Context7 MCP (up-to-date docs)
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest

# 5. Verify installation
claude mcp list
```

## Expected Output
All three servers should show "✓ Connected":
- **serena**: Code intelligence and project analysis
- **playwright**: Browser automation and UI testing  
- **context7**: Current library documentation

## Notes
- Serena opens a browser tab on startup (normal behavior)
- Configuration saved in `/home/runner/.claude.json`
- Servers activate automatically when Claude Code starts