# College Meeting Scheduler

## Overview

This is a full-stack web application for scheduling meetings between college faculty and students. The system provides separate portals for teachers and students, where teachers can manage their availability by creating time slots, and students can browse available slots and book meetings with faculty members.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with role-based navigation
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful API with JSON responses
- **Request Handling**: Express middleware for logging, JSON parsing, and error handling
- **Data Storage**: In-memory storage implementation with interface abstraction for future database integration
- **Schema Validation**: Zod schemas for request/response validation

### Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (configured but currently using in-memory storage)
- **Schema**: Three main entities - teachers, slots, and bookings with proper relationships
- **Migrations**: Database migrations managed through Drizzle Kit

### Authentication and Authorization
- **Teacher Authentication**: Simple email/password login system
- **Session Management**: Basic authentication without persistent sessions
- **Role-based Access**: Separate routes and components for teachers vs students
- **Authorization**: Route-level protection based on user roles

### Key Features
- **Teacher Portal**: Login, slot creation/deletion, dashboard with statistics
- **Student Portal**: Browse teachers, view available slots, book meetings
- **Real-time Updates**: Optimistic updates with React Query invalidation
- **Responsive Design**: Mobile-first design with professional dark theme
- **Error Handling**: Toast notifications for user feedback

### Development Tools
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Development Server**: Vite dev server with HMR and Express API integration
- **Code Quality**: ESLint configuration and consistent code formatting
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation

## External Dependencies

### Core Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **State Management**: TanStack React Query
- **Form Management**: React Hook Form, Hookform Resolvers

### Backend Dependencies
- **Server Framework**: Express.js
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

### Build and Development Tools
- **Build Tools**: Vite, esbuild
- **TypeScript**: Full type checking and compilation
- **Replit Integration**: Replit-specific plugins for development environment
- **PostCSS**: Autoprefixer and Tailwind CSS processing

### UI and Styling Dependencies
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for date manipulation
- **Carousel**: Embla Carousel for interactive components
- **Command Palette**: cmdk for search interfaces