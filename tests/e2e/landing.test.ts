import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should load landing page and show content", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByText("TanStack Start")).toBeVisible();
    await expect(page.getByRole("link", { name: /get started/i })).toBeVisible();
  });

  test("redirects signed-out users from the dashboard to login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
  });
});
