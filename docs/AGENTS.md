# Agents Guide

This file is for coding agents. Keep the README for humans, and use this guide for the repo-specific rules that matter while editing code.

## Start Here

Read these files before making changes:

- [`src/routes/__root.tsx`](../src/routes/__root.tsx): app shell, provider setup, global document structure.
- [`src/routes/index.tsx`](../src/routes/index.tsx): landing page route.
- [`src/components/pages/landing.tsx`](../src/components/pages/landing.tsx): landing page composition.
- [`src/components/providers/theme-provider.tsx`](../src/components/providers/theme-provider.tsx): `next-themes` wrapper and theme state.
- [`src/components/ui/theme-toggle.tsx`](../src/components/ui/theme-toggle.tsx): the theme switcher UI.
- [`src/features/auth/components/*`](../src/features/auth/components): login, signup, and OTP verification forms.
- [`src/lib/auth.ts`](../src/lib/auth.ts) and [`src/lib/auth-client.ts`](../src/lib/auth-client.ts): Better Auth server/client setup.
- [`src/lib/logger.ts`](../src/lib/logger.ts): LogTape app logger and sink configuration.
- [`instrument.server.mjs`](../instrument.server.mjs): server bootstrap for Sentry and logging.
- [`src/start.ts`](../src/start.ts): request middleware and server-side logging entrypoint.
- [`src/router.tsx`](../src/router.tsx): client bootstrap for Sentry and logging.
- [`src/components/ui/*`](../src/components/ui): shared UI primitives.
- [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md): higher-level system overview.
- [`package.json`](../package.json): source of truth for scripts.

## Repository Map

- `src/routes/`: file-based routes and API handlers.
- `src/components/pages/`: route-level page compositions.
- `src/components/providers/`: client providers such as theme.
- `src/components/ui/`: reusable primitives shared across the app.
- `src/features/`: feature-owned UI and domain logic.
- `src/lib/`: shared integrations, utilities, and client wrappers.
- `src/db/`: schema and database access.
- `tests/unit/`: Vitest tests for components and utilities.
- `tests/e2e/`: Playwright browser tests.
- `docs/`: project documentation.

## Commands

Use the scripts in `package.json` unless there is a strong reason not to.

| Command                     | Use                                                       |
| --------------------------- | --------------------------------------------------------- |
| `bun run dev`               | Start the app locally.                                    |
| `bun run typecheck`         | Run TypeScript checks.                                    |
| `bun run lint`              | Run Oxlint.                                               |
| `bun run format`            | Check formatting.                                         |
| `bun run test:unit`         | Run Vitest tests.                                         |
| `bun run test:e2e`          | Run Playwright tests.                                     |
| `bunx playwright test --ui` | Open Playwright's interactive mode.                       |
| `bun run db:push`           | Push schema changes to the local database.                |
| `bun run auth:generate`     | Regenerate Better Auth types and helpers.                 |
| `bun run build`             | Build production artifacts when you need a release check. |

## Working Rules

- Prefer the smallest change that fixes the problem.
- Keep edits inside the file or feature that owns the behavior.
- Do not edit generated files such as `src/routeTree.gen.ts` by hand.
- Do not add a new dependency unless the existing stack cannot do the job.
- Match the current Stark design language: dark default, centered hero, restrained motion, simple surfaces.
- Keep labels visible. Do not replace labels with placeholder-only forms.
- Update docs when routes, commands, auth flow, or app structure change.

## Auth Flow

- `/login` signs in with email OTP, passkey, or Google.
- `/signup` sends an email verification code.
- `/verify-otp` confirms the code and can optionally register a passkey after sign-up.
- Auth UI lives in `src/features/auth/components/*`.
- Server auth logic lives in `src/lib/auth.ts`.
- Client auth calls live in `src/lib/auth-client.ts`.

If you change auth behavior:

- Verify the full flow from form submission to redirect.
- Check both happy path and error path.
- Update any email templates or schema changes that the flow depends on.

## Theme Flow

- Theme state is handled through `next-themes` in `src/components/providers/theme-provider.tsx`.
- The toggle lives in `src/components/ui/theme-toggle.tsx`.
- The app uses class-based theme switching on the `html` element.
- The loading skeleton exists so the control does not render as a blank gap while the client hydrates.

If you change theme behavior:

- Verify first paint in a fresh browser session.
- Verify the hydrated toggle still changes the theme.
- Check both dark and light states.

## UI Rules

- Respect `docs/DESIGN.md` for design decisions.
- Reuse existing primitives before creating new ones.
- Prefer `button`, `field`, `input`, `separator`, and `skeleton` components when they fit.
- Keep components focused. If a file starts owning unrelated behavior, split it.
- Preserve accessibility defaults: labels, focus states, semantic buttons, and keyboard support.

## Testing Bar

- If the change affects rendering or hydration, test it in a browser, not just in unit tests.
- If the change affects shared UI logic, add or update a Vitest test.
- If the change affects auth, verify the whole flow across all touched routes.
- If the change affects theme or layout, verify both light and dark appearance.
- Keep test coverage close to the behavior you changed. Do not add broad tests that do not fail when the bug returns.

## Do Not Do

- Do not scatter a feature across unrelated folders.
- Do not invent a new pattern when an existing one already fits.
- Do not assume browser-only APIs exist during SSR.
- Do not rewrite docs just to restate code that is already obvious.
- Do not leave stale file paths or command names in documentation.
