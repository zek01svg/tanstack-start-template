import { describe, expect, test } from "vitest";

import { getProviderLabel } from "#/features/auth/settings-model";

describe("getProviderLabel", () => {
  test("formats google as Google", () => {
    expect(getProviderLabel("google")).toBe("Google");
  });

  test("formats email-otp as Email OTP", () => {
    expect(getProviderLabel("email-otp")).toBe("Email OTP");
  });

  test("capitalises unknown providers", () => {
    expect(getProviderLabel("github")).toBe("Github");
  });
});
