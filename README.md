# 🚀 Bettermode Blog

A modern React-based blog platform integrated with Bettermode's GraphQL API. The application features infinite scrolling, real-time reactions, and rich content management.

## Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Performance Optimizations](#performance-optimizations)
- [Testing Guide](#testing-guide)
- [Security](#security)
- [Best Practices](#best-practices)

## Project Overview

### Tech Stack
- **Frontend Framework**: React 18.3.1 + TypeScript 5.6.2
- **Build Tool**: Vite 5.4.10
- **Data Management**: Apollo Client 3.11.10
- **Styling**: TailwindCSS 3.4.14 + Framer Motion 11.11.17
- **Routing**: React Router DOM 6.28.0
- **UI Components**: DaisyUI 4.12.14
- **API**: Bettermode GraphQL API

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn
- Bettermode API access token

### Environment Setup
1. Create a `.env` file in the root directory:
   ```env
   VITE_BETTERMODE_TOKEN=your_api_token_here
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

### Build & Deployment
```bash
# Production build
npm run build

# Preview build
npm run preview

# Run tests
npm run test
```

## Architecture

### Project Structure
```
src/
├── components/      # React components
│   ├── blog/       # Blog-specific components
│   └── ui/         # Reusable UI components
├── graphql/        # GraphQL configuration
│   ├── client.ts   # Apollo client setup
│   ├── mutations/  # GraphQL mutations
│   └── queries/    # GraphQL queries
├── hooks/          # Custom React hooks
├── pages/          # Route components
├── types/          # TypeScript definitions
└── lib/            # Utility functions
```

## API Documentation

### GraphQL Endpoints
- Production (US): `https://api.bettermode.com/graphql`
- Production (EU): `https://api.bettermode.de/graphql`

### Key Features
1. **Post Management**
   - Create, read, update posts
   - Rich text content support
   - Media attachments
   - Categories and tags

2. **Interaction Features**
   - Like/React to posts
   - Commenting system
   - Share functionality

3. **User Management**
   - Authentication
   - User profiles
   - Role-based permissions

## Performance Optimizations

1. **Apollo Cache Management**
   - Field-level cache policies
   - Optimistic updates
   - Pagination handling

2. **Image Optimization**
   - Lazy loading
   - Responsive images
   - Multiple size variants

3. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

## Testing Guide

### Running Tests
```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Structure
- Unit Tests: Components, hooks, utilities
- Integration Tests: API interactions
- E2E Tests: User flows

## Security
- Secure token management
- XSS prevention
- Type-safe implementations
- CORS configuration

## Best Practices
- Functional components
- Custom hooks for logic reuse
- Proper error handling
- Performance optimizations

## License
MIT License - see LICENSE file for details
