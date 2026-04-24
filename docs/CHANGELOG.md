# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-04-24

### Fixed

- **CI Pipeline**: Stabilized the testing pipeline by explicitly defining `PLAYWRIGHT_BROWSERS_PATH` and ensuring `.env` is correctly provisioned from `.env.example` in the CI container.
- **Testing**: Resolved Playwright browser detection issues in Docker by mapping the correct binary paths and configuring `turbo.json` environment variables.
- **Git Security**: Resolved "dubious ownership" errors in the CI environment by adding global safe directory configurations.
- **Configuration**: Updated `.env.example` to use the correct URL format for `VITE_SENTRY_DSN`, preventing initialization errors.
- **Linting**: Migrated `oxlint` configuration to JSON to avoid ESM/TypeScript parsing errors in environments without native TypeScript execution.

## [1.0.0] - 2026-04-24

### Added

- **Base Stack**: Production-grade integration of TanStack Start, Nitro, Drizzle ORM, and Better Auth.
- **Authentication**: Full-stack Auth implementation with Google OAuth provider, type-safe environment variables, and end-to-end type safety.
- **Design System**: Hyper-minimalist aesthetic.
- **Observability**: Sentry for error tracking and performance monitoring + LogTape-backed structured logging with a Sentry sink and SSR instrumentation.
- **Architecture**: Scalable feature-based architecture (`src/features`) with a type-safe root route and optimized SSR hooks.
- **CI and Tooling**: High-performance pipeline using Bun, Turbo orchestration, Oxlint/Oxfmt, Lefthook, and GitHub Actions.
- **Testing**: Comprehensive testing suite including Playwright E2E flows and Vitest unit/integration tests.
- **Documentation**: Documentation including `ARCHITECTURE.md`, `DESIGN.md`, and a comprehensive `README.md`.
