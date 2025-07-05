# LexiAI - Legal Case Management System

## Overview

LexiAI is a comprehensive legal case management system built with React, Express.js, and PostgreSQL. The application provides a dashboard for managing legal workspaces, cases, witnesses, and documents. It features a modern UI built with shadcn/ui components and Tailwind CSS, with a full-stack architecture supporting both development and production deployments.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and dark mode support
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful API with `/api` prefix
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reload with tsx and Vite integration

### Build System
- **Bundler**: Vite for frontend development and building
- **TypeScript**: Full TypeScript support across client and server
- **ESBuild**: Server-side bundling for production
- **Development**: Integrated development server with HMR

## Key Components

### Database Schema
- **Users**: Authentication and user management
- **Workspaces**: Main organizational units for legal cases
- **Cases**: Detailed case information with type, companies, allegations, and facts
- **Relationships**: Proper foreign key relationships between entities

### Storage Layer
- **IStorage Interface**: Abstraction for data operations
- **MemStorage**: In-memory storage implementation for development
- **Database Integration**: Drizzle ORM with PostgreSQL for production

### UI Components
- **Dashboard**: Main interface with metrics cards and workspace table
- **Modals**: Create workspace and case details modals
- **Sidebar**: Navigation with user context
- **Responsive Design**: Mobile-first approach with proper breakpoints

### Authentication & Authorization
- **Session-based**: Using Express sessions with PostgreSQL storage
- **User Management**: Basic user schema with username/password
- **Middleware**: Authentication middleware for protected routes

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Routes**: Express.js handles requests with proper error handling
3. **Data Access**: Storage interface abstracts database operations
4. **Response**: JSON responses with proper error handling
5. **UI Updates**: React components re-render based on server state

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **class-variance-authority**: Type-safe variant API for styling

### Development Tools
- **Vite**: Development server and build tool
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Server**: tsx with hot reload
- **Frontend**: Vite development server with HMR
- **Database**: Uses DATABASE_URL environment variable

### Production
- **Build**: `npm run build` - builds both client and server
- **Client**: Vite builds to `dist/public`
- **Server**: ESBuild bundles to `dist/index.js`
- **Start**: `npm start` - runs production server
- **Database**: Drizzle migrations with `npm run db:push`

### Environment Setup
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Sessions**: Configured for PostgreSQL session storage

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
```

## User Preferences

Preferred communication style: Simple, everyday language.