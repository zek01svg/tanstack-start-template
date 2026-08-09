import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [path.resolve(import.meta.dirname, "./tests/setup.ts")],
    exclude: ["node_modules", "coverage", "dist", ".tanstack", "tests/e2e", "tests/integration"],
    alias: {
      "#": path.resolve(import.meta.dirname, "./src"),
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      enabled: true,
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 50,
        statements: 50,
      },
    },
    reporters: ["dot"],
  },
});
