import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "text/plain",
]);

const MAX_BYTES = 10 * 1024 * 1024;

export interface UploadRequest {
  filename: string;
  contentType: string;
  size: number;
}

export function validateUploadRequest(req: UploadRequest): string | null {
  if (!ALLOWED_CONTENT_TYPES.has(req.contentType)) return "Unsupported file type";
  if (req.size > MAX_BYTES) return "File must be 10 MB or smaller";
  return null;
}

export function createStorageClient(
  endpoint: string | undefined,
  accessKey = "admin",
  secretKey = "password"
): S3Client | null {
  if (!endpoint) return null;
  return new S3Client({
    endpoint,
    region: "us-east-1",
    forcePathStyle: true,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });
}

export async function createPresignedUploadUrl(
  client: S3Client,
  bucket: string,
  key: string,
  contentType: string,
  expiresIn = 300
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(client, command, { expiresIn });
}
