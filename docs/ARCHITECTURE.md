# Architecture

This project follows a modern SSR architecture using TanStack Start and Nitro.

## 🧱 Core Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) - A full-stack React framework that combines the best of TanStack Router, Query, and SSR.
- **Server**: [Nitro](https://nitro.unjs.io/) - The open engine for serving applications. It handles the server-side logic and deployment presets.
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - A lightweight, type-safe ORM for PostgreSQL.
- **Auth**: [Better Auth](https://better-auth.com/) - Email OTP, Google OAuth, and passkey support.
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) - Class-based theme management on `html` with a mounted client toggle.

## 📂 Directory Structure

```
.
├── docs/
│   ├── ARCHITECTURE.md   # This file
│   ├── CHANGELOG.md      # Release history
│   ├── DESIGN.md         # Visual system notes
│   └── AGENTS.md         # Developer guide for agents
├── public/               # Static assets
├── src/
│   ├── components/
│   │   ├── layout/      # Header and shell layout
│   │   ├── pages/       # Route-level page compositions
│   │   ├── providers/   # Client providers such as theme
│   │   └── ui/          # Reusable UI primitives
│   ├── db/              # Drizzle schema and client
│   ├── features/
│   │   └── auth/        # Login, signup, and verification forms
│   ├── lib/             # Reusable utilities, logging, and API clients
│   │   └── logger.ts    # App logger and sink configuration
│   ├── routes/          # TanStack Router routes and API handlers
│   └── globals.css      # Global styles (Tailwind CSS v4)
├── tests/               # Vitest and Playwright suites
├── instrument.server.mjs # Server bootstrap for Sentry and logging
├── components.json       # shadcn/ui configuration
├── Dockerfile            # Containerization
├── drizzle.config.ts     # Drizzle configuration
├── package.json          # Project dependencies and scripts
└── turbo.json            # Turbo task orchestration
```

## 🔄 Data Flow

1. **Routing**: Managed by TanStack Router. `src/routes/__root.tsx` composes the shell, theme provider, header, and page outlet.
2. **SSR**: TanStack Start handles the initial HTML render on the server using Nitro.
3. **Pages**: `src/routes/index.tsx`, `src/routes/login.tsx`, `src/routes/signup.tsx`, and `src/routes/verify-otp.tsx` mount the public app flows.
4. **Auth flow**: `src/features/auth/components/*` talks to `src/lib/auth-client.ts`, which wraps Better Auth. Sign-in and sign-up start with email OTP, then sign-up can offer passkey enrollment.
5. **API**: `src/routes/api/auth/$.ts` exposes the Better Auth route handler, while `src/routes/api/send-email.ts` and `src/routes/api/health.ts` support app services.

## 🔐 Authentication

Authentication is handled by **Better Auth**. The app currently supports Google OAuth, email OTP sign-in/sign-up, passkey sign-in, and optional passkey enrollment after a successful sign-up verification.

## 🎨 Styling

**Tailwind CSS v4** is integrated directly into the Vite build process via `@tailwindcss/vite`, providing extremely fast build times and a streamlined developer experience. Theme switching is class-based on the `html` element through `next-themes`, so the app can render dark mode immediately and keep the toggle in sync after hydration.

## 🕵️ Observability

### LogTape + Sentry

LogTape provides the app logger in `src/lib/logger.ts`. The server request middleware in `src/start.ts` logs incoming requests, while the server bootstrap (`instrument.server.mjs`) and client bootstrap (`src/router.tsx`) configure sinks at startup so logs go to the terminal in development and still flow to Sentry. Sentry remains responsible for error tracking, logs, traces, and performance data.
