import { test, expect } from "@playwright/test";

test("error page has a back link when the client has a Base URL", async ({ page }) => {
  await page.goto("/iframe.html?id=error--with-client-base-url&viewMode=story");
  await expect(page.locator("#backToApplication")).toHaveAttribute("href", "https://example.com");
});

test("error page hides the back link when the client Base URL is empty", async ({ page }) => {
  await page.goto("/iframe.html?id=error--with-empty-client-base-url&viewMode=story");
  await expect(page.locator("#kc-error-message")).toContainText("Invalid username or password.");
  await expect(page.locator("#backToApplication")).toHaveCount(0);
});
