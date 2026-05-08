import { createFileRoute } from "@tanstack/react-router";
import { randomUUID } from "node:crypto";
import { env } from "#/env";
import { auth } from "#/lib/auth";
import {
  createStorageClient,
  createPresignedUploadUrl,
  validateUploadRequest,
} from "#/lib/storage";
import { logger } from "#/lib/logger";
import { getRequest } from "@tanstack/react-start/server";

export const Route = createFileRoute("/api/upload-url")({
  server: {
    handlers: {
      POST: async () => {
        const request = getRequest();

        const session = await auth.api.getSession({ headers: request.headers });
        if (!session?.user) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { filename, contentType, size } = body as {
          filename: string;
          contentType: string;
          size: number;
        };

        const validationError = validateUploadRequest({ filename, contentType, size });
        if (validationError) {
          return Response.json({ error: validationError }, { status: 422 });
        }

        const client = createStorageClient(
          env.MINIO_ENDPOINT,
          env.MINIO_ACCESS_KEY,
          env.MINIO_SECRET_KEY
        );

        if (!client) {
          return Response.json(
            { error: "Storage is not configured. Set MINIO_ENDPOINT to enable uploads." },
            { status: 503 }
          );
        }

        const bucket = env.MINIO_BUCKET ?? "app";
        const ext = filename.split(".").pop() ?? "bin";
        const key = `uploads/${session.user.id}/${randomUUID()}.${ext}`;

        const url = await createPresignedUploadUrl(client, bucket, key, contentType);

        logger.info("Generated presigned upload URL", {
          userId: session.user.id,
          key,
          contentType,
        });

        return Response.json({ url, key });
      },
    },
  },
});
