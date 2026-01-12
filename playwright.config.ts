import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;
// STORYBOOK_URL is set in Docker compose; fallback to localhost
const baseURL = process.env.STORYBOOK_URL || "http://127.0.0.1:6006";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 720 } }
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] }
    }
  ],
  // Only start Storybook locally; in Docker, it's a separate service
  webServer: isCI
    ? undefined
    : {
        command: "yarn storybook --ci",
        url: "http://127.0.0.1:6006",
        reuseExistingServer: true,
        timeout: 120000
      }
});
