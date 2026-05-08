import { describe, expect, test } from "vitest";

import {
  getAuthRouteRedirect,
  getProtectedRouteRedirect,
  getSessionDisplayName,
} from "#/features/auth/session-model";

describe("auth session route decisions", () => {
  test("redirects signed-out users away from protected routes", () => {
    expect(getProtectedRouteRedirect(null)).toBe("/login");
  });

  test("keeps signed-in users on protected routes", () => {
    expect(getProtectedRouteRedirect({ id: "user-1", email: "dev@example.com" })).toBeNull();
  });

  test("redirects signed-in users away from auth routes", () => {
    expect(getAuthRouteRedirect({ id: "user-1", email: "dev@example.com" })).toBe("/dashboard");
  });

  test("keeps signed-out users on auth routes", () => {
    expect(getAuthRouteRedirect(null)).toBeNull();
  });

  test("uses a user's name for display when available", () => {
    expect(
      getSessionDisplayName({
        id: "user-1",
        email: "dev@example.com",
        name: "Ada Lovelace",
      })
    ).toBe("Ada Lovelace");
  });

  test("falls back to email for display when name is missing", () => {
    expect(getSessionDisplayName({ id: "user-1", email: "dev@example.com", name: " " })).toBe(
      "dev@example.com"
    );
  });
});
