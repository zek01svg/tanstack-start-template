import { execSync } from "child_process";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { env } from "#/env";

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

export async function setup() {
  console.log("\n[Integration Setup] Starting Containers (Postgres)...");

  const pgContainer = await new PostgreSqlContainer("postgres:15-alpine").start();
  const dbUrl = pgContainer.getConnectionUri();

  console.log(`[Integration Setup] Postgres bound: ${pgContainer.getMappedPort(5432)}`);
  console.log("[Integration Setup] Pushing schema with drizzle-kit...");

  try {
    execSync("bun drizzle-kit push --force", {
      env: { ...env, DATABASE_URL: dbUrl },
      stdio: "pipe",
    });
    console.log("[Integration Setup] Schema setup completed.");
  } catch (error: unknown) {
    await pgContainer.stop();
    throw error;
  }

  return async () => {
    console.log("[Integration Setup] Tearing down container...");
    await pgContainer.stop();
  };
}
