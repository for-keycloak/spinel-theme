import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, "../docs/screenshots");

// Stories to capture for documentation
const STORIES = [
  { id: "login--default", name: "login" },
  { id: "register--default", name: "register" },
  { id: "reset-password--default", name: "reset-password" },
  { id: "update-password--default", name: "update-password" },
  { id: "otp-authentication--default", name: "otp" },
  { id: "configure-totp--default", name: "config-totp" },
  { id: "error--default", name: "error" },
  { id: "info--default", name: "info" },
  { id: "terms--default", name: "terms" }
];

// Color schemes to capture
const COLOR_SCHEMES = ["light", "dark"] as const;

test.beforeAll(async () => {
  // Ensure screenshot directory exists
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
});

for (const story of STORIES) {
  for (const colorScheme of COLOR_SCHEMES) {
    test(`${story.name} - ${colorScheme}`, async ({ browser }, testInfo) => {
      const viewport = testInfo.project.name; // "desktop" or "mobile"

      // Create a new context with the appropriate color scheme
      const context = await browser.newContext({
        colorScheme: colorScheme
      });
      const page = await context.newPage();

      // Navigate to the story's iframe URL
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);

      // Wait for the page to be fully loaded
      await page.waitForLoadState("networkidle");

      // Take screenshot
      const screenshotName = `${story.name}-${colorScheme}-${viewport}.png`;
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, screenshotName),
        fullPage: true
      });

      // For visual regression testing, attach the screenshot to the test
      await testInfo.attach(screenshotName, {
        path: path.join(SCREENSHOT_DIR, screenshotName),
        contentType: "image/png"
      });

      await context.close();
    });
  }
}

// Special test for README preview image (login page, desktop, light mode)
test("preview image for README", async ({ page }, testInfo) => {
  // Only run for desktop project
  if (testInfo.project.name !== "desktop") {
    test.skip();
    return;
  }

  await page.goto("/iframe.html?id=login--default&viewMode=story");
  await page.waitForLoadState("networkidle");

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "preview.png"),
    fullPage: true
  });
});
