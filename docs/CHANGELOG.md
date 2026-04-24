# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-04-24

### Fixed

- **CI Pipeline**: Fixed environment variable validation failures in CI by ensuring `.env` is correctly provisioned from `.env.example` across all jobs.
- **Git Security**: Resolved "dubious ownership" errors in the Playwright container by adding global safe directory configurations.
- **Linting**: Migrated `oxlint` configuration from TypeScript to JSON to ensure compatibility with Node.js environments that lack native ESM TypeScript support.

## [1.0.0] - 2026-04-23

### Added

- **Base Stack**: Production-grade integration of TanStack Start, Nitro, Drizzle ORM, and Better Auth.
- **Authentication**: Full-stack Auth implementation with Google OAuth provider, type-safe environment variables, and end-to-end type safety.
- **Design System**: Hyper-minimalist aesthetic.
- **Observability**: Sentry for error tracking and performance monitoring + LogTape-backed structured logging with a Sentry sink and SSR instrumentation.
- **Architecture**: Scalable feature-based architecture (`src/features`) with a type-safe root route and optimized SSR hooks.
- **CI and Tooling**: High-performance pipeline using Bun, Turbo orchestration, Oxlint/Oxfmt, Lefthook, and GitHub Actions.
- **Testing**: Comprehensive testing suite including Playwright E2E flows and Vitest unit/integration tests.
- **Documentation**: Documentation including `ARCHITECTURE.md`, `DESIGN.md`, and a comprehensive `README.md`.
