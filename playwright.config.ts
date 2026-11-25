import { defineConfig, devices } from "@playwright/test";

const previewUrl = "http://127.0.0.1:3170";
const baseURL = process.env.PLAYWRIGHT_BASE_URL || previewUrl;
const channel = process.env.PLAYWRIGHT_CHANNEL;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    channel,
    trace: "retain-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run dev -- --hostname 127.0.0.1 --port 3170",
        url: previewUrl,
        env: { SITE_URL: previewUrl },
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
