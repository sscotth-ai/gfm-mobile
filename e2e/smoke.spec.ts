import { test, expect } from "@playwright/test";

/**
 * Smoke tests run against the live deployed instance.
 * Set PLAYWRIGHT_BASE_URL to the deployed URL to use these.
 */
test.describe("Smoke tests", () => {
  test("fundraiser page is reachable and renders", async ({ page }) => {
    await page.goto("./fundraiser/realtime-alerts-for-wildfire-safety-r5jkk");
    await expect(page).toHaveTitle(/GoFundMe/);
    await expect(page.getByText("Real-Time Alerts for Wildfire Safety")).toBeVisible();
  });

  test("community page is reachable and renders", async ({ page }) => {
    await page.goto("./communities/watch-duty");
    await expect(page.getByRole("heading", { name: "Watch Duty" })).toBeVisible();
  });

  test("profile page is reachable and renders", async ({ page }) => {
    await page.goto("./u/janahan");
    await expect(page.getByRole("heading", { name: "Janahan Vivekanandan" })).toBeVisible();
  });

  test("SPA routing works via 404 fallback", async ({ page }) => {
    await page.goto("./fundraiser/realtime-alerts-for-wildfire-safety-r5jkk");
    await expect(page.getByText("Real-Time Alerts for Wildfire Safety")).toBeVisible();
    await expect(page.locator("body")).not.toHaveText(/404|not found/i);
  });
});
