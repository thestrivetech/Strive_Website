# Strive Tech Website Project Overview

## Purpose
Professional AI consulting platform website showcasing Strive Tech's AI solutions, portfolio, and services. The site serves as the company's main point of contact with clients and customers.

## Tech Stack
- **Frontend**: React 18.3.1, TypeScript 5.6.3, Vite 5.4.19, Wouter (routing), TanStack Query, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express 4.21.2, TypeScript
- **Database**: Neon PostgreSQL (serverless) with Drizzle ORM 0.39.1
- **Deployment**: Optimized for Replit environment
- **Future**: Planned migration to Supabase for real-time features and integrated auth

## Project Structure
- StriveSite/ - Main application directory
  - client/ - React frontend
  - server/ - Express backend  
  - shared/ - Shared TypeScript schemas
  - attached_assets/ - Static images
- .claude/ - Agent configurations
- chat_logs/ - Agent session documentation
- docs/ - Project documentation

## Development Approach
Agent-based development system with 8 specialized AI agents coordinated by an orchestrator for efficient, high-quality development.