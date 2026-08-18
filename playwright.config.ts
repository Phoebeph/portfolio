import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",

  // Playwright starts the built site itself, against a real production
  // build (not `astro dev`) — closer to what real visitors get. We serve
  // dist/ with `serve` rather than `astro preview`: Astro's CLI forks
  // preview into a detached background process and returns immediately,
  // which looks like a crash to Playwright's webServer (it expects the
  // command it launched to keep running in the foreground).
  webServer: {
    command: "npm run build && npx serve dist -l 4321",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },

  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
});
