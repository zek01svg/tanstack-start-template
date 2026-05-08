import { describe, expect, test } from "vitest";

import { canSendEmail } from "#/features/emails/email-guard";

describe("canSendEmail", () => {
  test("allows authenticated user", () => {
    expect(canSendEmail({ userId: "user-1" })).toBe(true);
  });

  test("allows request with valid server secret", () => {
    expect(canSendEmail({ serverSecret: "s3cr3t", configuredSecret: "s3cr3t" })).toBe(true);
  });

  test("rejects unauthenticated request with no secret", () => {
    expect(canSendEmail({})).toBe(false);
  });

  test("rejects mismatched server secret", () => {
    expect(canSendEmail({ serverSecret: "wrong", configuredSecret: "right" })).toBe(false);
  });

  test("rejects empty server secret even if configured secret matches", () => {
    expect(canSendEmail({ serverSecret: "", configuredSecret: "" })).toBe(false);
  });
});
