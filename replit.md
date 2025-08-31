# Overview

This is a full-stack business consulting website built with React, Express.js, and TypeScript. The application serves as a modern business platform for "Strive," showcasing services including AI & Automation, Data Analytics, Cloud Infrastructure, and Security & Compliance solutions. The site features a multi-page layout with portfolio showcases, resource library, contact forms, and newsletter functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack**: React 18 with TypeScript, using Vite as the build tool and development server. The application implements client-side routing with Wouter for navigation between pages.

**UI Framework**: Built on Radix UI primitives with Tailwind CSS for styling. Uses shadcn/ui component library following the "new-york" style variant. Custom CSS variables enable consistent theming with a dark blue primary color scheme.

**State Management**: TanStack Query (React Query) handles server state management and API communication. Local state is managed with React hooks.

**Component Structure**: Organized into reusable UI components (cards, buttons, forms) and page-specific components. Custom components include HeroSection, SolutionCard, PortfolioCard, and ResourceCard for content presentation.

## Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js. The server handles both API routes and serves the built React application in production.

**API Design**: RESTful API structure with dedicated routes for contact form submissions and newsletter subscriptions. Error handling middleware provides consistent error responses.

**Data Storage**: Dual storage implementation supporting both in-memory storage (MemStorage) and database integration. The storage interface pattern allows switching between storage backends without changing application logic.

**Session Management**: Uses express-session with PostgreSQL session storage via connect-pg-simple for persistent user sessions.

## Data Storage Solutions

**Database**: PostgreSQL configured as the primary database with Neon as the serverless provider (@neondatabase/serverless).

**ORM**: Drizzle ORM provides type-safe database operations with schema-first approach. Database schemas define users, contact submissions, and newsletter subscriptions tables.

**Schema Management**: Drizzle Kit handles database migrations and schema evolution. Zod integration provides runtime validation for database operations.

**Storage Interface**: Abstract storage interface (IStorage) enables flexible backend implementations, supporting both development (in-memory) and production (PostgreSQL) environments.

## Authentication and Authorization

**Session-based Authentication**: Implements server-side sessions stored in PostgreSQL for user state persistence across requests.

**Form Validation**: Client and server-side validation using Zod schemas ensure data integrity for contact forms and newsletter subscriptions.

# External Dependencies

## UI and Styling

- **Radix UI**: Comprehensive set of accessible UI primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library with customizable styling

## Database and ORM

- **PostgreSQL**: Primary database via Neon serverless platform
- **Drizzle ORM**: Type-safe database toolkit with migrations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Development Tools

- **Vite**: Fast build tool and development server with React plugin
- **TypeScript**: Static type checking across frontend and backend
- **ESBuild**: Production bundling for server code
- **Replit Integration**: Development environment plugins for Replit platform

## Utility Libraries

- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Conditional class name utilities
- **class-variance-authority**: Component variant management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with @hookform/resolvers
- **Wouter**: Lightweight client-side routing