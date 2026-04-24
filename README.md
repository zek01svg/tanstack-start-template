# TanStack Start Template

A premium, batteries-included template for building modern web applications with TanStack Start, Nitro, Better Auth, and Drizzle ORM. Featuring a refined **Stark** hyper-minimalist design system.

## 🚀 Features

- **SSR & Routing**: [TanStack Start](https://tanstack.com/start) for seamless SSR and type-safe routing.
- **Server Engine**: [Nitro](https://nitro.unjs.io/) for high-performance server-side logic.
- **Authentication**: [Better Auth](https://better-auth.com/) for email OTP sign-in/sign-up, Google OAuth, and passkey support.
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL (`pg`).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for ultra-fast utility-first styling.
- **Theme System**: Class-based light/dark switching with [next-themes](https://github.com/pacocoursey/next-themes), with system preference handled by the provider.
- **Architecture**: Modular feature-based structure (`src/features`) for scalable development.
- **Design**: Hyper-minimalist aesthetic with centered typography and subtle Oklch gradients.
- **Observability**: LogTape-backed structured logging with a [Sentry](https://sentry.io/) sink for error tracking and performance monitoring.
- **Developer Experience**:
  - [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) & [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for lightning-fast linting and formatting.
  - [Turbo](https://turbo.build/) for efficient task orchestration.
  - [Playwright](https://playwright.dev/) for E2E testing in `tests/e2e`.
  - [Vitest](https://vitest.dev/) for unit and component tests in `tests/unit`.
  - [Lefthook](https://github.com/evilmartians/lefthook) for flexible, fast git hooks.

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.3.13 or later)
- [Docker](https://www.docker.com/) (for local database)

### Setup

1. **Install dependencies**:

   ```bash
   bun install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   Update the variables with your configuration.

3. **Database**:
   Start the database using Docker Compose:

   ```bash
   docker compose up -d
   ```

   Push the schema to the database:

   ```bash
   bun run db:push
   ```

4. **Run Development Server**:
   ```bash
   bun run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

- **Unit**: `bun run test:unit`
- **E2E**: `bun run test:e2e`
- **Interactive E2E**: `bunx playwright test --ui`

## 🐳 Deployment

The project is ready for Dockerized deployment.

```bash
docker build -t tanstack-start-template .
docker run -p 3000:3000 tanstack-start-template
```

## 🏛️ Documentation

- **[Architecture](./docs/ARCHITECTURE.md)**: Deep dive into the project structure and data flow.
- **[Design System](./docs/DESIGN.md)**: Details on the aesthetic and design tokens.
- **[Agents Guide](./docs/AGENTS.md)**: Practical instructions for working in this codebase.
- **[Changelog](./docs/CHANGELOG.md)**: Recorded changes and version history.

---
