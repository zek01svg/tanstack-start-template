import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    SERVER_URL: z.string().url().optional(),
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
    BETTER_AUTH_SECRET: z.string().min(32),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    RESEND_API_KEY: z.string().min(1),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_APP_TITLE: z.string().min(1).optional(),
    VITE_SENTRY_DSN: z.string().url().optional(),
    VITE_SENTRY_ORG: z.string().optional(),
    VITE_SENTRY_PROJECT: z.string().optional(),
  },
  runtimeEnv: {
    SERVER_URL: process.env.SERVER_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    // import.meta.env is Vite-only; undefined in Node.js (e.g. drizzle-kit)
    VITE_APP_TITLE: import.meta.env?.VITE_APP_TITLE,
    VITE_SENTRY_DSN: import.meta.env?.VITE_SENTRY_DSN,
    VITE_SENTRY_ORG: import.meta.env?.VITE_SENTRY_ORG,
    VITE_SENTRY_PROJECT: import.meta.env?.VITE_SENTRY_PROJECT,
  },
  emptyStringAsUndefined: true,
});
