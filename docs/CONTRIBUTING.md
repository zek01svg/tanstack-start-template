# Contributing

## Prerequisites

- [Bun](https://bun.sh) 1.3.13
- Docker (for Postgres, MinIO, and Maildev)

## Setup

```bash
cp .env.example .env
docker compose up -d postgres maildev minio minio_init
bun install
bun run db:push
bun run dev
```

## Branches

- Base all work off `main`.
- Use short, lowercase, hyphen-separated names: `feat/notes-crud`, `fix/auth-redirect`, `chore/ci-cache`.

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add notes CRUD to dashboard
fix: redirect signed-in users away from /login
chore: pin Bun version in CI
```

## Tests

Run the full suite before opening a PR:

```bash
bun run lint
bun run typecheck
bun run format
bun run test:unit
bun run test:e2e
```

Unit tests live in `tests/unit/`. They must not start a database container — test pure logic only. Integration and E2E tests may use Testcontainers (Postgres) or Playwright.

New features need at least one unit test covering the core behaviour. New routes need at least one Playwright smoke test verifying the happy path and any redirect guards.

## Adding dependencies

Every runtime dependency added to `package.json` must be used by shipped code. Dev dependencies are fine as long as they stay out of the production bundle.

## Environment variables

All new env vars must be:

1. Added to `src/env.ts` (optional unless truly required for the app to boot).
2. Documented in `.env.example` with a descriptive comment.
3. Mentioned in `README.md` if they change the setup steps.
