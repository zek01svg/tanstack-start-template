import { describe, expect, test } from "vitest";

import { validateUploadRequest, createStorageClient } from "#/lib/storage";

describe("validateUploadRequest", () => {
  test("accepts valid image mime type", () => {
    expect(
      validateUploadRequest({ filename: "photo.jpg", contentType: "image/jpeg", size: 1024 })
    ).toBeNull();
  });

  test("rejects unsupported mime type", () => {
    expect(
      validateUploadRequest({ filename: "script.sh", contentType: "application/x-sh", size: 100 })
    ).toBe("Unsupported file type");
  });

  test("rejects file over 10MB", () => {
    expect(
      validateUploadRequest({
        filename: "big.png",
        contentType: "image/png",
        size: 11 * 1024 * 1024,
      })
    ).toBe("File must be 10 MB or smaller");
  });

  test("accepts file of exactly 10MB", () => {
    expect(
      validateUploadRequest({
        filename: "limit.png",
        contentType: "image/png",
        size: 10 * 1024 * 1024,
      })
    ).toBeNull();
  });
});

describe("createStorageClient", () => {
  test("returns null when endpoint is missing", () => {
    expect(createStorageClient(undefined)).toBeNull();
  });

  test("returns S3Client when endpoint is provided", () => {
    const client = createStorageClient("http://localhost:9000");
    expect(client).not.toBeNull();
  });
});
