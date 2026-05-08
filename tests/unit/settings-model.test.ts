import { describe, expect, test } from "vitest";

import { getProviderLabel, isPasswordProvider } from "#/features/auth/settings-model";

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

describe("isPasswordProvider", () => {
  test("credential is a password provider", () => {
    expect(isPasswordProvider("credential")).toBe(true);
  });

  test("google is not a password provider", () => {
    expect(isPasswordProvider("google")).toBe(false);
  });
});
