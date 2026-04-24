import { createFileRoute } from "@tanstack/react-router";
import { logger } from "#/lib/logger";

export const Route = createFileRoute("/api/sentry-example")({
  server: {
    handlers: {
      GET: async () => {
        logger.error("Triggering Sentry Example Route Error...", {
          time: new Date().toISOString(),
        });
        throw new Error("Sentry Example Route Error");
      },
    },
  },
});
