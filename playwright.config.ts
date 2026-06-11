import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space',

    httpCredentials: {
      username: process.env.HTTP_USERNAME || "",
      password: process.env.HTTP_PASSWORD || "",
    },

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testDir: "./tests/setup",
      testMatch: /auth\.setup\.ts/,
    },

    {
      name: "api",
      testDir: "./tests/api",
      testMatch: /.*\.spec\.ts/,
      use: {
        baseURL: process.env.BASE_URL,
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      testDir: "./tests",
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices["Desktop Firefox"],
        baseURL: process.env.BASE_URL,
      },
      dependencies: ["setup"],
    },
  ],
});
