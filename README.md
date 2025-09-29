# HRBox Monorepo
[![CI Status](https://hrbox.ir/wp-content/uploads/2024/12/hrbox-typoW40x.webp)](https://github.com/your-org/hrbox-monorepo/actions)
> A comprehensive Human Resources management system built with modern React technologies, Turborepo, and professional development practices

[![CI Status](https://img.shields.io/badge/CI-passing-brightgreen)](https://github.com/your-org/hrbox-monorepo/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.5.5-blueviolet)](https://turbo.build/)
[![pnpm](https://img.shields.io/badge/pnpm-10.14.0-orange)](https://pnpm.io/)
[![Storybook](https://img.shields.io/badge/Storybook-Latest-ff69b4)](https://storybook.js.org/)
[![Jest](https://img.shields.io/badge/Testing-Jest%20%2B%20RTL-green)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/Code%20Style-ESLint%20%2B%20Prettier-yellow)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [✨ Features](#-features)
- [🏗 Project Architecture](#-project-architecture)
- [🚀 Quick Start](#-quick-start)
- [🔧 Development](#-development)
- [📜 Available Scripts](#-available-scripts)
- [🧩 Module Development](#-module-development)
- [🧪 Testing Strategy](#-testing-strategy)
- [📚 Documentation](#-documentation)
- [🔧 Build System](#-build-system)
- [🐳 Docker & Deployment](#-docker--deployment)
- [📊 Quality Assurance](#-quality-assurance)
- [🤝 Contributing](#-contributing)
- [📚 Resources](#-resources)

## 🎯 Overview

HRBox is a modern, scalable Human Resources management system designed to streamline HR operations. This monorepo contains modular packages for different HR functionalities, shared utilities, and configuration packages, all built with industry best practices and modern development workflows.

### Why This Architecture?

A properly managed monorepo offers atomic commits, centralized dependency management, enhanced visibility, and standardized tooling across projects. Monorepos can unlock significant productivity gains with proper infrastructure and disciplined workflows.

**Key Benefits:**
- **🚀 High Performance**: Turborepo with smart caching and parallel execution
- **📦 Modular Design**: Independent, reusable modules for different HR features
- **🔄 Shared Dependencies**: Consistent versions and utilities across all applications
- **⚡ Fast Development**: Hot reloading, incremental builds, and optimized workflows
- **🛠 Professional Tooling**: Comprehensive testing, linting, and documentation setup
- **🔒 Type Safety**: Full TypeScript coverage with strict type checking
- **🎨 Design System**: Consistent UI components and styling across modules

## ✨ Features

### 🏢 Core HR Modules
- **👥 Employee Management** - Complete employee lifecycle management
- **🔗 HR Link** - Company relationships and partnership management
- **📊 Analytics Dashboard** - HR metrics and reporting
- **📅 Time Tracking** - Work hours and attendance tracking
- **💼 Recruitment** - Job postings and candidate management

### 🛠 Development Experience
- **⚡ Lightning Fast Builds** - Turborepo with intelligent caching
- **🔍 Comprehensive Testing** - Unit, integration, and visual testing
- **📖 Living Documentation** - Storybook for component development
- **🎯 Code Quality** - ESLint, Prettier, and automated quality checks
- **🐳 Containerized** - Docker support for consistent environments
- **🔄 CI/CD Ready** - GitHub Actions with automated workflows

### 🎨 UI/UX Features
- **🌓 Dark/Light Mode** - Comprehensive theme support
- **🌐 Internationalization** - Multi-language support with Persian calendar
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **♿ Accessibility** - WCAG 2.1 AA compliance
- **📊 Data Visualization** - Charts and dashboards with Chart.js and ApexCharts
- **🎭 Animations** - Smooth interactions with Framer Motion

## 🏗 Project Architecture

```
hrbox-monorepo/
│   ├── eslint.config.js          # ESLint configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── tsconfig.base.json        # Base TypeScript configuration
│   ├── vite.config.ts       # Base Vite configuration
│   ├── jest.config.js            # Jest testing configuration
│   └── storybook/                # Storybook configuration
├── 📁 core/                      # Core utilities and business logic
│   ├── src/
│   │   ├── api/                  # API clients and services
│   │   ├── components/           # Shared UI components
│   │   ├── hooks/                # Reusable React hooks
│   │   ├── providers/            # Context providers
│   │   ├── services/             # Business logic services
│   │   ├── types/                # TypeScript type definitions
│   │   └── utils/                # Utility functions
│   ├── tests/                    # Core module tests
│   └── package.json
├── 📁 modules/                   # Feature modules
│   └── hrlink/                   # HR Link Management Module
│       ├── src/
│       │   ├── components/       # Module-specific components
│       │   ├── features/         # Feature implementations
│       │   │   ├── companies/
│       │   │   │   ├── apis/     # Company-related APIs
│       │   │   │   ├── components/ # Company components
│       │   │   │   ├── hooks/    # Company hooks
│       │   │   │   ├── pages/    # Company pages
│       │   │   │   └── types/    # Company types
│       │   │   ├── offers/       # Job offers feature
│       │   │   └── events/       # Company events feature
│       │   ├── hooks/            # Module hooks
│       │   ├── services/         # Module services
│       │   ├── types/            # Module type definitions
│       │   └── index.ts          # Module entry point
│       ├── app/                  # Application configuration
│       ├── dev/                  # Development environment
│       │   ├── App.tsx           # Dev playground
│       │   ├── main.tsx          # Dev entry point
│       │   └── index.html        # Dev HTML template
│       ├── stories/              # Storybook stories
│       ├── tests/                # Module tests
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
├── 📁 .github/                   # GitHub configurations
│   └── workflows/                # CI/CD workflows
│       ├── ci.yml               # Continuous Integration
│       ├── release.yml          # Release automation
│       └── storybook.yml        # Storybook deployment
├── 📁 .husky/                   # Git hooks
│   ├── pre-commit              # Pre-commit quality checks
│   ├── commit-msg              # Commit message validation
│   └── pre-push                # Pre-push validation
├── 📁 .storybook/              # Storybook configuration
├── 📁 docker/                  # Docker configurations
├── 📄 package.json             # Root package configuration
├── 📄 turbo.json              # Turborepo configuration
├── 📄 tsconfig.json           # Global TypeScript configuration
├── 📄 pnpm-workspace.yaml     # pnpm workspace configuration
├── 📄 docker-compose.yml      # Docker Compose for development
├── 📄 Dockerfile              # Production Docker image
└── 📄 README.md               # This file
```

### Workspace Packages Overview

| Package | Description | Type | Dependencies |
|---------|-------------|------|--------------|
| `core` | Core business logic, utilities, shared components, and services | Library | React, TypeScript |
| `modules/hrlink` | HR Link Management - companies, offers, events, partnerships | Application | core, React Router |

### Path Mapping & Aliases

The project uses TypeScript path mapping for clean imports across all packages:

```typescript
// ❌ Instead of messy relative imports
import { utils } from '../../../core/utils'
import { Button } from '../../modules/ui/button'
import { api } from '../../../../core/api/client'

// ✅ Use clean absolute imports with aliases
import { utils } from '@core/utils'
import { Button } from '@module/ui/button'
import { api } from '@core/api/client'
```

**Available Global Aliases:**
- `@core/*` → `core/*` - Core utilities, components, and business logic
- `@module/*` → `modules/*` - Feature modules and specialized components

## 🛠 Tech Stack

### 🎨 Frontend & UI
- **React 18.3.1** - UI library with concurrent features, Suspense, and automatic batching
- **TypeScript 5.9.2** - Type-safe JavaScript with latest language features
- **Tailwind CSS 4.1.11** - Utility-first CSS framework with JIT compilation
- **Hero UI 2.8.2** - Modern, accessible React component library
- **Framer Motion 12.23.12** - Production-ready motion library for animations
- **React Router DOM 7.8.0** - Declarative routing with modern data APIs

### 🗃 State Management & Data
- **Redux Toolkit 2.8.2** - Modern Redux with RTK Query for data fetching
- **React Redux 9.2.0** - Official React bindings for Redux
- **Redux Persist 6.0.0** - State persistence across browser sessions
- **React Query / TanStack Query** - Server state management and caching

### 📊 Data Visualization & Charts
- **Chart.js 4.5.0** - Flexible charting library with extensive customization
- **React ChartJS 2 5.3.0** - React wrapper for Chart.js with TypeScript support
- **ApexCharts 5.3.2** - Modern charting library with animations and interactions
- **React ApexCharts 1.7.0** - React integration for ApexCharts
- **React Flow 12.8.4** - Interactive node-based graphs and diagrams
- **React Circular Progressbar** - Customizable circular progress indicators

### 🛠 Development & Build Tools
- **Turborepo 2.5.5** - High-performance build system for monorepos
- **Vite 7.1.1** - Fast build tool and development server with HMR
- **pnpm 10.14.0** - Fast, disk space efficient package manager
- **ESLint 9.33.0** - Pluggable JavaScript linter with TypeScript support
- **Prettier 3.6.2** - Opinionated code formatter with team configurations
- **Husky 9.1.7** - Git hooks for automated quality checks
- **lint-staged 16.1.5** - Run linters on staged files for faster commits

### 🧪 Testing & Quality
- **Jest** - JavaScript testing framework with extensive mocking capabilities
- **Testing Library** - Simple and complete testing utilities for React components
- **Vitest** - Vite-native test runner (alternative to Jest)
- **Storybook** - Tool for building UI components and pages in isolation
- **Playwright** - End-to-end testing framework for modern web apps
- **Chromatic** - Visual testing and review tool for Storybook

### 📝 Form Management & Validation
- **Formik 2.4.6** - Build forms in React without tears
- **Yup 1.7.0** - JavaScript schema builder for value parsing and validation
- **React Hook Form** - Performant, flexible forms with easy validation

### 🌍 Internationalization & Localization
- **react-i18next 15.6.1** - Internationalization framework for React
- **i18next 25.3.2** - Internationalization framework with plugins
- **date-fns 4.1.0** - Modern JavaScript date utility library
- **moment-jalaali 0.10.4** - Persian calendar support for Iranian users

### 🎨 UI Enhancements & Interactions
- **React Toastify 11.0.5** - Notification system with customizable toasts
- **Lottie React 2.4.1** - Render After Effects animations natively
- **Embla Carousel React 8.6.0** - Extensible carousel library
- **React Multi Date Picker** - Persian and Gregorian calendar support
- **React Datepicker** - Flexible date picker component

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0 LTS
- **pnpm** 10.14.0 (exact version required)
- **Git** for version control
- **Docker** (optional, for containerized development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/hrbox-monorepo.git
   cd hrbox-monorepo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   > This installs all dependencies across all workspaces with pnpm's efficient hoisting

3. **Set up development environment**
   ```bash
   # Copy environment variables
   cp .env.example .env.local
   
   # Set up Git hooks
   pnpm prepare
   ```

4. **Start development (all modules)**
   ```bash
   pnpm dev
   ```
   > Starts all development servers in parallel with hot reloading

5. **Start specific module**
   ```bash
   # HR Link module only
   pnpm dev:hrlink
   
   # Using turbo filter
   turbo run dev --filter=@module/hrlink
   ```

6. **Build all packages**
   ```bash
   pnpm build
   ```

### Verification

After installation, verify everything works:

```bash
# Check code quality
pnpm lint

# Run type checking
pnpm type-check

# Run tests
pnpm test

# Build project
pnpm build
```

## 🔧 Development

### Package Manager Setup

This project uses **pnpm** with workspaces for efficient dependency management:

```bash
# Install exact version globally
npm install -g pnpm@10.14.0

# Verify installation
pnpm --version # Should output: 10.14.0

# Update if needed
npm update -g pnpm
```

### Turborepo Commands

Turborepo provides high-performance build capabilities with smart caching and is particularly effective when supported by proper tooling and workflow discipline.

```bash
# 🏃‍♂️ Run tasks across all packages
turbo run build          # Build all packages in dependency order
turbo run dev            # Start all development servers
turbo run test           # Run all test suites
turbo run lint           # Lint all packages

# 🎯 Run tasks in specific packages
turbo run build --filter=@module/hrlink    # Build specific module
turbo run dev --filter=@core               # Start core package only
turbo run test --filter="@module/*"        # Test all modules

# ⚡ Performance optimizations  
turbo run build --parallel                 # Run tasks in parallel
turbo run build --concurrency=4            # Limit concurrent tasks
turbo run build --force                    # Skip cache, force rebuild

# 🔍 Analysis and debugging
turbo run build --dry-run                  # See what would execute
turbo run build --graph                    # Generate dependency graph
turbo run build --summarize                # Build performance summary

# 🧹 Cache management
turbo prune                                # Clear Turborepo cache
```

### Path Mapping Configuration

The monorepo uses TypeScript path mapping for clean imports. If experiencing import errors:

#### 1. Root TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@core/*": ["./core/*"],
      "@module/*": ["./modules/*"]
    },
    "types": ["vite/client", "@testing-library/jest-dom"]
  },
  "exclude": ["node_modules", "**/dist", "**/build"]
}
```

#### 2. Vite Configuration
```typescript
// vite.config.ts or module-specific vite config
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ root: '../..' }) // Points to monorepo root
  ],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './core'),
      '@module': path.resolve(__dirname, './modules'),
    },
  },
});
```

#### 3. IDE Configuration (VSCode)
1. Press `Ctrl+Shift+P` → "TypeScript: Select TypeScript Version" → "Use Workspace Version"
2. Press `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
3. Ensure you're opening the root directory in VSCode, not a subdirectory

### Development Workflow

#### Starting Development
```bash
# Full development environment
pnpm dev                    # All modules with hot reloading

# Selective development
pnpm dev:hrlink            # Only HR Link module
pnpm dev:core              # Only core package

# With specific ports
PORT=3001 pnpm dev:hrlink  # Custom port
```

#### Code Quality Workflow
```bash
# Before committing (runs automatically via Husky)
pnpm lint:fix              # Fix linting issues
pnpm format                # Format code with Prettier
pnpm type-check           # TypeScript type checking

# Manual quality checks
pnpm test                 # Run all tests
pnpm test:coverage        # Run tests with coverage
pnpm validate            # Full quality check pipeline
```

### Troubleshooting Development Issues

#### Import/Path Resolution Errors
```bash
# 1. Clear TypeScript cache
rm -rf node_modules/.cache/typescript
pnpm type-check

# 2. Restart IDE TypeScript server
# VSCode: Ctrl+Shift+P → "TypeScript: Restart TS Server"

# 3. Verify path mappings
# Check tsconfig.json paths match actual directory structure
```

#### Build/Cache Issues
```bash
# Clear all caches and rebuild
pnpm clean                # Clean build artifacts
turbo prune              # Clear Turborepo cache
rm -rf node_modules/.vite # Clear Vite cache
pnpm install             # Reinstall dependencies
pnpm build              # Fresh build
```

#### Development Server Issues
```bash
# Port conflicts
lsof -ti:3000 | xargs kill -9  # Kill processes on port 3000
pnpm dev                       # Restart dev servers

# Module resolution issues
pnpm install --frozen-lockfile # Ensure consistent dependencies
```

### Code Quality & Standards

The project maintains professional code quality through automated tools:

#### ESLint Configuration
- **TypeScript-first** - Strict type checking and modern JavaScript features
- **React best practices** - Hooks rules, JSX optimization, accessibility
- **Import organization** - Automatic sorting and grouping
- **Unused code detection** - Automatic removal of unused imports and variables
- **Accessibility enforcement** - WCAG guidelines integration
- **Performance optimizations** - React performance anti-patterns detection

#### Prettier Configuration
- **Consistent formatting** - Unified style across all file types
- **Team standards** - Configured for team collaboration
- **IDE integration** - Works with all major editors
- **File-specific rules** - Different rules for JSON, Markdown, CSS

#### Pre-commit Quality Gates
Every commit is automatically validated through Husky hooks:

```bash
# Runs automatically on git commit
✅ ESLint with auto-fix
✅ Prettier formatting  
✅ TypeScript type checking
✅ Import sorting and optimization
✅ Unused code removal
✅ Conventional commit message validation
```

## 📜 Available Scripts

### Root Level Scripts

| Script | Description | Turborepo Command | Use Case |
|--------|-------------|-------------------|----------|
| `pnpm dev` | Start development servers for all packages | `turbo run dev` | Full development |
| `pnpm build` | Build all packages in dependency order | `turbo run build` | Production builds |
| `pnpm lint` | Run ESLint across all packages | `turbo run lint` | Code quality check |
| `pnpm lint:fix` | Fix linting issues automatically | `turbo run lint:fix` | Code cleanup |
| `pnpm test` | Run tests across all packages | `turbo run test` | Quality assurance |
| `pnpm test:coverage` | Run tests with coverage reports | `turbo run test:coverage` | Coverage analysis |
| `pnpm type-check` | TypeScript type checking | `turbo run type-check` | Type validation |
| `pnpm clean` | Clean build artifacts and caches | - | Fresh start |
| `pnpm validate` | Full quality validation pipeline | - | CI/CD preparation |

### Module-Specific Scripts

```bash
# Development
pnpm dev:hrlink                    # Start HR Link module only
pnpm --filter @module/hrlink dev   # Alternative syntax

# Building  
pnpm build:hrlink                  # Build HR Link module only
pnpm --filter @module/hrlink build # Alternative syntax

# Testing
pnpm test:hrlink                   # Test HR Link module only
pnpm --filter @module/hrlink test  # Alternative syntax

# Documentation
pnpm storybook:hrlink             # Start Storybook for HR Link
pnpm --filter @module/hrlink storybook
```

### Advanced Turborepo Usage

```bash
# 🔍 Dependency-aware builds
turbo run build --filter=@module/hrlink...^  # Build dependencies of hrlink
turbo run build --filter=...@module/hrlink   # Build hrlink and dependents

# ⚡ Performance optimization
turbo run build --parallel          # Maximum parallelization
turbo run build --concurrency=2     # Limit concurrent tasks
turbo run build --remote-only       # Use only remote cache
turbo run build --force             # Ignore cache, rebuild everything

# 📊 Analysis and monitoring  
turbo run build --dry-run=json      # JSON output of execution plan
turbo run build --graph=graph.html  # Visual dependency graph
turbo run build --summarize         # Performance summary
```

### Quality Assurance Scripts

```bash
# 🧪 Testing variations
pnpm test:unit           # Unit tests only
pnpm test:integration    # Integration tests
pnpm test:e2e           # End-to-end tests
pnpm test:visual        # Visual regression tests
pnpm test:a11y          # Accessibility tests

# 📊 Code analysis
pnpm analyze:bundle     # Bundle size analysis
pnpm analyze:deps       # Dependency analysis
pnpm analyze:types      # TypeScript analysis
pnpm security:audit    # Security vulnerability scan
```

### Documentation & Development Tools

```bash
# 📚 Documentation
pnpm storybook          # Start Storybook development server
pnpm build-storybook    # Build static Storybook
pnpm docs:generate      # Generate API documentation
pnpm docs:serve         # Serve documentation locally

# 🔧 Development utilities
pnpm changeset          # Create changeset for version management
pnpm version-packages   # Version packages based on changesets
pnpm release           # Publish packages to registry
pnpm dependency:check   # Check for outdated dependencies
pnpm dependency:update  # Update dependencies
```

## 🧩 Module Development

### Creating New Modules

Follow this structured approach to create new feature modules:

```bash
# 1. Create module directory structure
mkdir -p modules/new-module/{src,dev,stories,tests}
cd modules/new-module

# 2. Initialize package.json
cat > package.json << EOF
{
  "name": "@module/new-module",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": {
    "@hrbox/core": "workspace:*"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "storybook": "storybook dev"
  }
}
EOF

# 3. Set up TypeScript configuration
cat > tsconfig.json << EOF
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
  },
  "exclude": ["dist", "node_modules"]
}
EOF

# 4. Configure Vite
cat > vite.config.ts << EOF
import { defineConfig } from 'vite';
import { baseConfig } from '../../configs/vite.config.base';

export default defineConfig({
  ...baseConfig,
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'NewModule',
      formats: ['es']
    }
  }
});
EOF
```

### Module Structure Template

```
modules/your-module/
├── 📁 src/                        # Source code
│   ├── 📁 components/             # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   └── index.ts               # Component exports
│   ├── 📁 features/               # Feature-specific logic
│   │   ├── 📁 feature-name/
│   │   │   ├── 📁 components/     # Feature components
│   │   │   ├── 📁 hooks/          # Feature-specific hooks
│   │   │   ├── 📁 services/       # API services
│   │   │   ├── 📁 types/          # TypeScript definitions
│   │   │   └── index.ts           # Feature exports
│   ├── 📁 hooks/                  # Shared module hooks
│   ├── 📁 services/               # Module-level services
│   ├── 📁 types/                  # TypeScript type definitions
│   ├── 📁 utils/                  # Utility functions
│   └── 📄 index.ts                # Main module export
├── 📁 dev/                        # Development environment
│   ├── 📄 App.tsx                 # Development playground
│   ├── 📄 main.tsx                # Development entry point
│   └── 📄 index.html              # HTML template
├── 📁 stories/                    # Storybook stories
│   ├── 📄 Introduction.stories.mdx
│   └── 📄 components.stories.tsx
├── 📁 tests/                      # Module tests
│   ├── 📁 __mocks__/              # Test mocks
│   ├── 📁 fixtures/               # Test data
│   └── 📄 setup.ts                # Test setup
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
└── 📄 README.md
```

### Module Development Workflow

#### 1. Standalone Development
Each module can be developed independently:

```bash
cd modules/your-module

# Start module in development mode
pnpm dev                    # Starts on http://localhost:3001

# With custom port
PORT=3002 pnpm dev

# Start with Storybook
pnpm storybook             # Starts on http://localhost:6006
```

#### 2. Development Environment Setup
```typescript
// dev/App.tsx - Module playground
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@core/providers';
import { Layout } from '@core/components';

// Import your module components
import HomePage from '../src/pages/HomePage';
import FeaturePage from '../src/features/your-feature/pages/FeaturePage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          {/* Development navigation */}
          <nav className="bg-gray-100 p-4 mb-8">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold mb-4">Your Module - Development</h1>
              <div className="space-x-4">
                <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                <Link to="/feature" className="text-blue-600 hover:underline">Feature</Link>
              </div>
            </div>
          </nav>

          {/* Module routes */}
          <main className="container mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/feature" element={<FeaturePage />} />
            </Routes>
          </main>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

#### 3. Component Development with Storybook
```typescript
// stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Button> = {
  title: 'YourModule/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
    icon: 'arrow-right',
  },
};
```

### Testing Your Module

```bash
# Unit tests
pnpm test                          # Run all module tests
pnpm test --coverage               # With coverage report
pnpm test --watch                  # Watch mode for development

# Integration tests
pnpm test:integration              # Test module integration

# Visual tests with Storybook
pnpm test-storybook               # Visual regression tests
pnpm chromatic                    # Deploy to Chromatic for review
```

## 🧪 Testing Strategy

Our comprehensive testing approach ensures code reliability and user experience quality:

### Testing Stack

- **Unit Testing**: Jest + Testing Library for component and utility testing
- **Integration Testing**: Test complete feature workflows
- **Visual Testing**: Storybook + Chromatic for UI regression testing
- **E2E Testing**: Playwright for full user journey testing
- **Accessibility Testing**: axe-core integration for a11y compliance

### Testing Structure

```
tests/
├── 📁 unit/                       # Unit tests
│   ├── components/
│   ├── hooks/
│   └── utils/
├── 📁 integration/                # Integration tests
│   ├── features/
│   └── workflows/
├── 📁 e2e/                        # End-to-end tests
│   ├── specs/
│   └── fixtures/
├── 📁 visual/                     # Visual regression tests
├── 📁 a11y/                       # Accessibility tests
├── 📁 __mocks__/                  # Test mocks
├── 📁 fixtures/                   # Test data
└── 📄 setup.ts                    # Global test setup
```

### Testing Commands

```bash
# 🧪 Unit Testing
pnpm test                          # Run all unit tests
pnpm test:watch                    # Watch mode for development
pnpm test:coverage                 # Generate coverage reports
pnpm test:ci                       # CI-optimized test run

# 🔗 Integration Testing  
pnpm test:integration              # Run integration test suite
pnpm test:integration:watch        # Watch mode for integration tests

# 👀 Visual Testing
pnpm test-storybook               # Visual regression tests
pnpm test-storybook:ci            # CI visual testing
pnpm chromatic                    # Deploy to Chromatic

# 🎭 End-to-End Testing
pnpm test:e2e                     # Run E2E tests
pnpm test:e2e:ui                  # E2E tests with UI
pnpm test:e2e:debug               # E2E tests in debug mode

# ♿ Accessibility Testing
pnpm test:a11y                    # Accessibility test suite
```

### Writing Tests

#### Component Testing Example
```typescript
// src/components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant styles', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600');
  });
});
```

#### Hook Testing Example
```typescript
// src/hooks/useApi/useApi.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from './useApi';

describe('useApi Hook', () => {
  it('fetches data successfully', async () => {
    const { result } = renderHook(() => useApi('/api/users'));
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();
  });
});
```

### Test Coverage Requirements

We maintain high code quality with coverage thresholds:

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80, 
        "lines": 80,
        "statements": 80
      },
      "./src/components/": {
        "branches": 90,
        "statements": 90
      }
    }
  }
}
```

## 📚 Documentation

### Storybook Integration

Storybook serves as our living documentation system for UI components:

#### Getting Started with Storybook
```bash
# Start Storybook development server
pnpm storybook                     # Runs on http://localhost:6006

# Build static Storybook
pnpm build-storybook              # Outputs to storybook-static/

# Deploy Storybook
pnpm chromatic                    # Deploy to Chromatic for review
```

#### Creating Stories
```typescript
// stories/YourComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../src/components/YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile component for displaying content with various styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Hello World',
  },
};

export const Interactive: Story = {
  args: {
    variant: 'secondary',
    children: 'Click me!',
    onClick: () => alert('Clicked!'),
  },
  play: async ({ canvasElement }) => {
    // Interactive testing with Storybook interactions
  },
};
```

### API Documentation

We automatically generate API documentation from TypeScript definitions:

```bash
# Generate API documentation
pnpm docs:generate                # Outputs to docs/api/

# Serve documentation locally  
pnpm docs:serve                  # Runs on http://localhost:3000
```

### Component Documentation Standards

All components should include:

```typescript
/**
 * Button component with multiple variants and sizes
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="large" onClick={handleClick}>
 *   Click me!
 * </Button>
 * ```
*/
export interface ButtonProps {
/** Visual style variant */
variant?: 'primary' | 'secondary' | 'danger';
/** Button size */
size?: 'small' | 'medium' | 'large';
/** Click handler */
onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
/** Button content */
children: ReactNode;
}
```

## 🔧 Build System

### Turborepo Configuration

Our build system is optimized for performance and caching:

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "*.d.ts"],
      "cache": true
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "lint": {
      "outputs": [],
      "cache": true
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": [],
      "cache": true
    }
  }
}
```

### Build Optimization Features

- **Incremental Builds** - Only rebuild changed packages
- **Smart Caching** - Cache build outputs based on input fingerprints
- **Parallel Execution** - Run independent tasks simultaneously
- **Dependency-Aware** - Respect package dependencies during builds
- **Remote Caching** - Share cache across team and CI (when configured)

### Production Builds

```bash
# Full production build
NODE_ENV=production pnpm build

# Build with bundle analysis
pnpm build:analyze               # Generates bundle size reports

# Build specific module for production
pnpm --filter @module/hrlink build

# Verify build outputs
pnpm build:verify               # Check build integrity
```

### Bundle Analysis

Monitor and optimize bundle sizes:

```bash
# Analyze bundle sizes
pnpm analyze:bundle             # Interactive bundle analyzer

# Check for duplicate dependencies
pnpm analyze:deps               # Dependency analysis

# Performance audit
pnpm analyze:perf              # Performance metrics
```

## 🐳 Docker & Deployment

### Development with Docker

```bash
# Start full development environment
docker-compose up -d

# Services included:
# - App (main application)
# - Storybook (component documentation)
# - Redis (caching)
# - PostgreSQL (database - if needed)
```

### Production Docker Build

```dockerfile
# Multi-stage build for optimal image size
FROM node:18-alpine AS base
RUN npm install -g pnpm@10.14.0
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY configs/package.json ./configs/
COPY core/package.json ./core/
COPY modules/*/package.json ./modules/*/
RUN pnpm install --frozen-lockfile --prod=false

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Production stage
FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Deployment Options

#### Vercel Deployment
```bash
# Install Vercel CLI
pnpm add -D vercel

# Deploy
pnpm deploy:vercel
```

#### AWS Deployment
```bash
# Using AWS CDK
pnpm add -D aws-cdk-lib constructs
pnpm deploy:aws
```

#### Kubernetes Deployment
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hrbox-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hrbox-app
  template:
    metadata:
      labels:
        app: hrbox-app
    spec:
      containers:
      - name: hrbox-app
        image: hrbox-monorepo:latest
        ports:
        - containerPort: 3000
```

## 📊 Quality Assurance

### Automated Quality Gates

Every code change goes through comprehensive quality checks:

#### Pre-commit Hooks (via Husky)
- ✅ **ESLint** - Code quality and consistency
- ✅ **Prettier** - Code formatting
- ✅ **Type checking** - TypeScript validation
- ✅ **Import optimization** - Remove unused imports
- ✅ **Commit message validation** - Conventional commit format

#### Pre-push Hooks
- ✅ **Full test suite** - Unit and integration tests
- ✅ **Build verification** - Ensure all packages build successfully
- ✅ **Type checking** - Complete TypeScript validation
- ✅ **Bundle size check** - Prevent bundle bloat

### Continuous Integration

Our GitHub Actions workflow ensures code quality:

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10.14.0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Lint
        run: pnpm lint
      
      - name: Type check
        run: pnpm type-check
      
      - name: Test with coverage
        run: pnpm test:coverage
      
      - name: Build
        run: pnpm build
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Quality Metrics

We track and maintain high quality standards:

- **Code Coverage**: >80% for all packages
- **Type Coverage**: >95% TypeScript coverage
- **Bundle Size**: Monitored and optimized
- **Performance**: Core Web Vitals tracking
- **Accessibility**: WCAG 2.1 AA compliance
- **Security**: Regular dependency audits

### Monitoring and Analytics

```bash
# Performance monitoring
pnpm analyze:performance        # Performance metrics
pnpm analyze:lighthouse         # Lighthouse audits

# Security scanning
pnpm security:audit            # Dependency vulnerability scan
pnpm security:licenses         # License compliance check

# Code quality metrics
pnpm analyze:complexity        # Code complexity analysis
pnpm analyze:maintainability   # Maintainability index
```

## 🤝 Contributing

We welcome contributions from the community! Please follow our contribution guidelines:

### Development Workflow

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/hrbox-monorepo.git
   cd hrbox-monorepo
   ```

2. **Set up development environment**
   ```bash
   pnpm install
   pnpm prepare                 # Set up git hooks
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number
   ```

4. **Make your changes**
  - Follow existing code style and patterns
  - Add tests for new functionality
  - Update documentation as needed
  - Ensure TypeScript types are properly defined

5. **Test your changes**
   ```bash
   pnpm lint                   # Check code style
   pnpm type-check            # Verify TypeScript
   pnpm test                  # Run test suite
   pnpm build                 # Ensure builds work
   ```

6. **Commit your changes**
   ```bash
   # Use conventional commit format
   git add .
   git commit -m 'feat(hrlink): add company search functionality'
   ```

7. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   # Create PR on GitHub
   ```

### Code Style Guidelines

#### TypeScript
- Use strict type checking and proper type definitions
- Prefer `interface` over `type` for object shapes
- Use generic types where appropriate
- Document complex types with JSDoc comments

#### React
- Use functional components with hooks
- Implement proper prop typing with TypeScript
- Follow React best practices (keys, state immutability, etc.)
- Use custom hooks for reusable logic

#### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain design system consistency
- Document component variations in Storybook

#### File Organization
- Use clear, descriptive file and directory names
- Group related functionality together
- Follow established module structure
- Export components and utilities properly

### Commit Message Format

We follow [Conventional Commits](https://conventionalcommits.org/) specification:

```bash
# Format: type(scope): description
feat(hrlink): add company search functionality
fix(core): resolve authentication token refresh issue
docs(readme): update installation instructions
style(ui): improve button component styling
refactor(api): optimize data fetching logic
test(hrlink): add unit tests for company service
chore(deps): update dependencies to latest versions
```

**Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Build process or auxiliary tool changes
- `perf` - Performance improvements
- `ci` - CI/CD changes

### Pull Request Guidelines

#### Before Submitting
- [ ] All tests pass (`pnpm test`)
- [ ] Code follows style guidelines (`pnpm lint`)
- [ ] TypeScript types are correct (`pnpm type-check`)
- [ ] Build works (`pnpm build`)
- [ ] Documentation is updated if needed
- [ ] Storybook stories added for new components

#### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Include screenshots of UI changes

## Related Issues
Closes #123
```

### Code Review Process

1. **Automated Checks** - CI runs all quality checks
2. **Peer Review** - At least one team member reviews code
3. **Design Review** - UI/UX changes reviewed by design team
4. **Security Review** - Security-sensitive changes get additional review
5. **Approval** - Required approvals before merge

## 🔮 Roadmap & Future Enhancements

### Current Development (Q1 2025)
- [ ] **Comprehensive Test Suite** - Jest + Testing Library + Playwright
- [ ] **Storybook Integration** - Component documentation and visual testing
- [ ] **Docker Containerization** - Development and production containers
- [ ] **CI/CD Pipeline** - GitHub Actions with automated testing and deployment

### Upcoming Features (Q2 2025)
- [ ] **Design System** - Comprehensive component library with design tokens
- [ ] **Micro-frontend Architecture** - Module federation for runtime composition
- [ ] **Performance Monitoring** - Real-time performance metrics and optimization
- [ ] **Advanced Analytics** - Data visualization and reporting enhancements

### Future Considerations (H2 2025)
- [ ] **PWA Support** - Progressive Web App capabilities with offline functionality
- [ ] **Mobile App** - React Native modules for mobile HR management
- [ ] **AI Integration** - ML-powered HR insights and automation
- [ ] **Advanced Security** - Enhanced authentication and data protection

### Technical Improvements
- [ ] **Bundle Optimization** - Advanced code splitting and tree shaking
- [ ] **Accessibility Enhancement** - WCAG 2.1 AAA compliance
- [ ] **Internationalization** - Extended language support and RTL layouts
- [ ] **Performance Optimization** - Web Vitals optimization and monitoring

## 📚 Resources

### Documentation
- [Turborepo Documentation](https://turbo.build/repo/docs) - Build system optimization
- [pnpm Workspaces](https://pnpm.io/workspaces) - Package management
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Language reference
- [React Documentation](https://react.dev/) - Framework guidelines
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework

### Development Tools
- [ESLint Rules](https://eslint.org/docs/rules/) - Code quality rules
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html) - Code formatting
- [Jest Documentation](https://jestjs.io/docs/getting-started) - Testing framework
- [Storybook Guides](https://storybook.js.org/docs/react/get-started/introduction) - Component development

### Community & Support
- [GitHub Issues](https://github.com/your-org/hrbox-monorepo/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/your-org/hrbox-monorepo/discussions) - Community discussions
- [Contributing Guide](CONTRIBUTING.md) - Detailed contribution guidelines
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community standards

### Learning Resources
- [Monorepo Best Practices](https://monorepo.tools/) - Comprehensive monorepo guide
- [React Performance](https://react.dev/learn/render-and-commit) - React optimization techniques
- [TypeScript Best Practices](https://typescript-eslint.io/docs/) - TypeScript guidelines
- [Testing Best Practices](https://testing-library.com/docs/guiding-principles) - Testing philosophy

## 🛠 Getting Help

### Troubleshooting Common Issues

#### 1. Installation Problems
```bash
# Clear all caches and reinstall
rm -rf node_modules pnpm-lock.yaml .turbo
pnpm install

# If pnpm version issues
npm uninstall -g pnpm
npm install -g pnpm@10.14.0
```

#### 2. Build Failures
```bash
# Clear build caches
pnpm clean
turbo prune

# Rebuild everything
pnpm build --force
```

#### 3. Import Resolution Issues
```bash
# Restart TypeScript server in VS Code
# Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Check path mappings
# Verify tsconfig.json paths match directory structure
```

#### 4. Development Server Issues
```bash
# Kill processes on conflicting ports
lsof -ti:3000 | xargs kill -9

# Clear Vite cache
rm -rf node_modules/.vite

# Restart development servers
pnpm dev
```

### Performance Optimization Tips

#### Bundle Size Optimization
```bash
# Analyze bundle sizes
pnpm analyze:bundle

# Check for duplicate dependencies
pnpm dedupe

# Use dynamic imports for code splitting
const LazyComponent = lazy(() => import('./HeavyComponent'));
```

#### Development Speed
```bash
# Use Turbo's parallel execution
turbo run dev --parallel

# Enable hot reloading optimizations
# Add to vite.config.ts:
server: {
  hmr: {
    overlay: false
  }
}
```

### Security Best Practices

```bash
# Regular security audits
pnpm audit

# Check for outdated dependencies
pnpm outdated

# Update dependencies safely
pnpm update --latest
```

## 📈 Monitoring & Analytics

### Performance Monitoring

We track key performance metrics to ensure optimal user experience:

#### Core Web Vitals
- **Largest Contentful Paint (LCP)** - Loading performance
- **First Input Delay (FID)** - Interactivity
- **Cumulative Layout Shift (CLS)** - Visual stability

#### Bundle Analysis
```bash
# Generate bundle analysis
pnpm build:analyze

# Check bundle size over time
# Results available in build-reports/ directory
```

#### Performance Budget
We maintain strict performance budgets:
- **Initial Bundle Size**: < 250KB gzipped
- **Module Bundle Size**: < 100KB gzipped
- **Image Assets**: < 500KB optimized
- **Font Loading**: < 50KB WOFF2

### Error Monitoring

Production error tracking (when implemented):

```typescript
// Example Sentry integration
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Filter sensitive data
    return event;
  }
});
```

## 🔐 Security Considerations

### Dependency Security
```bash
# Regular security audits
pnpm audit --audit-level moderate

# Check for known vulnerabilities
pnpm audit --fix

# License compliance check  
npx license-checker --summary
```

### Code Security
- **Input Validation** - All user inputs validated
- **XSS Prevention** - Proper data sanitization
- **CSRF Protection** - Token-based protection
- **Secure Headers** - Security headers implementation
- **Authentication** - Secure authentication flows

### Environment Security
```bash
# Example .env structure
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production

# Never commit sensitive data
# Use environment-specific .env files
```

## 📊 Metrics & KPIs

### Development Metrics
- **Build Time** - Average build duration < 2 minutes
- **Test Coverage** - Maintain >80% coverage
- **Code Quality** - ESLint warnings < 10
- **Bundle Size** - Stay within performance budget

### User Experience Metrics
- **Loading Time** - Pages load < 3 seconds
- **Time to Interactive** - Interactive < 5 seconds
- **Accessibility Score** - Lighthouse a11y > 95
- **Performance Score** - Lighthouse performance > 90

## 🎯 Best Practices Summary

### Development Workflow
1. **Branch Strategy** - Feature branches from develop
2. **Code Review** - Required before merging
3. **Automated Testing** - All code must have tests
4. **Documentation** - Update docs with code changes
5. **Performance** - Consider performance impact

### Code Organization
1. **Single Responsibility** - Components have clear purpose
2. **Reusability** - Build reusable components
3. **Type Safety** - Comprehensive TypeScript usage
4. **Error Handling** - Proper error boundaries
5. **Accessibility** - WCAG 2.1 compliance

### Performance Guidelines
1. **Lazy Loading** - Dynamic imports for routes
2. **Code Splitting** - Separate vendor bundles
3. **Caching** - Implement proper caching strategies
4. **Optimization** - Regular bundle analysis
5. **Monitoring** - Track performance metrics

## 🚀 Quick Commands Reference

### Most Used Commands
```bash
# Development
pnpm dev                    # Start all development servers
pnpm dev:hrlink            # Start specific module
pnpm storybook             # Start Storybook

# Quality Assurance  
pnpm lint:fix              # Fix code style issues
pnpm type-check           # TypeScript validation
pnpm test                 # Run test suite
pnpm test:coverage        # Test with coverage

# Build & Deploy
pnpm build                # Build all packages
pnpm build:analyze        # Build with analysis
pnpm clean                # Clean all artifacts

# Package Management
pnpm install              # Install dependencies
pnpm outdated             # Check outdated packages
pnpm audit                # Security audit
```

### Turborepo Commands
```bash
# Selective execution
turbo run build --filter=@module/hrlink
turbo run test --filter="@module/*"

# Performance optimization
turbo run build --parallel
turbo run dev --concurrency=4

# Cache management
turbo prune               # Clear cache
turbo run build --force   # Ignore cache
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No liability or warranty

## 📞 Support & Contact

### Getting Support

For questions, issues, or contributions:

1. **🐛 Bug Reports**: [Create Issue](https://github.com/your-org/hrbox-monorepo/issues/new?template=bug_report.md)
2. **💡 Feature Requests**: [Request Feature](https://github.com/your-org/hrbox-monorepo/issues/new?template=feature_request.md)
3. **❓ Questions**: [GitHub Discussions](https://github.com/your-org/hrbox-monorepo/discussions)
4. **📚 Documentation**: [Project Wiki](https://github.com/your-org/hrbox-monorepo/wiki)

### Response Times
- **Critical Issues**: Within 24 hours
- **Bug Reports**: 2-3 business days
- **Feature Requests**: 1 week for initial response
- **General Questions**: 2-3 business days

### Contributing
We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for:
- Development setup instructions
- Coding standards and guidelines
- Pull request process
- Issue reporting templates

---

<div align="center">

**Built with ❤️ by the HRBox Team**

**Powered by** [Turborepo](https://turbo.build) **•** [React](https://react.dev) **•** [TypeScript](https://typescriptlang.org) **•** [Tailwind CSS](https://tailwindcss.com)

*Making HR management modern, efficient, and delightful* ✨

[![GitHub Stars](https://img.shields.io/github/stars/your-org/hrbox-monorepo?style=social)](https://github.com/your-org/hrbox-monorepo)
[![Twitter Follow](https://img.shields.io/twitter/follow/hrbox?style=social)](https://twitter.com/hrbox)

</div>

---

*Last updated: December 2024 • Version 1.0.0 • Documentation maintained by [HRBox Team](https://github.com/orgs/your-org/teams/hrbox)*
