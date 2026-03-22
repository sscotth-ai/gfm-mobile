import { test, expect } from "@playwright/test";

test.describe("Fundraiser page", () => {
  test("loads hero with title and donate button", async ({ page }) => {
    await page.goto("./fundraiser/realtime-alerts-for-wildfire-safety-r5jkk");
    await expect(page.getByText("Real-Time Alerts for Wildfire Safety")).toBeVisible();
    await expect(page.getByRole("button", { name: /give \$5/i })).toBeVisible();
  });

  test("like button toggles", async ({ page }) => {
    await page.goto("./fundraiser/realtime-alerts-for-wildfire-safety-r5jkk");
    const likeButton = page
      .locator("button")
      .filter({ has: page.locator("svg.lucide-heart") })
      .first();
    await likeButton.click();
    // After clicking, the heart SVG should have the fill class
    await expect(likeButton.locator("svg")).toHaveClass(/fill-\[#FF2E93\]/);
  });

  test("donate drawer opens", async ({ page }) => {
    await page.goto("./fundraiser/realtime-alerts-for-wildfire-safety-r5jkk");
    await page.getByRole("button", { name: /give \$5/i }).click();
    await expect(page.getByText(/select.*amount/i)).toBeVisible();
  });

  test("below-fold content loads on scroll", async ({ page }) => {
    await page.goto("./fundraiser/realtime-alerts-for-wildfire-safety-r5jkk");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText("Story")).toBeVisible();
    await expect(page.getByText(/raised of/)).toBeVisible();
  });
});

test.describe("Community page", () => {
  test("loads community hero and campaigns", async ({ page }) => {
    await page.goto("./communities/watch-duty");
    await expect(page.getByRole("heading", { name: "Watch Duty" })).toBeVisible();
    await expect(page.getByRole("tab", { name: /fundraisers/i })).toBeVisible();
  });

  test("about tab shows markdown description", async ({ page }) => {
    await page.goto("./communities/watch-duty");
    await page.getByRole("tab", { name: /about/i }).click();
    const aboutPanel = page.getByLabel("About");
    await expect(aboutPanel.getByText("Our Mission")).toBeVisible();
  });
});

test.describe("Profile page", () => {
  test("loads profile with avatar and stats", async ({ page }) => {
    await page.goto("./u/janahan");
    await expect(page.getByRole("heading", { name: "Janahan Vivekanandan" })).toBeVisible();
    await expect(page.getByText(/followers/)).toBeVisible();
    await expect(page.getByText(/following/)).toBeVisible();
  });

  test("activity feed renders", async ({ page }) => {
    await page.goto("./u/janahan");
    await expect(page.getByText("Top causes")).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("root redirects to fundraiser page", async ({ page }) => {
    await page.goto("./");
    await expect(page).toHaveURL(/\/fundraiser\/realtime-alerts/);
  });
});
