import { BASE_URL } from '@_config/env.config';
import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export const STORAGE_STATE = path.join(__dirname, 'tmp/session.json');
export const RESPONSE_TIMEOUT = 10_000;

export default defineConfig({
  testDir: './tests',
  globalSetup: 'config/global-setup.ts',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  use: {
    //baseURL: 'http://localhost:3000',
    baseURL: BASE_URL,
    actionTimeout: 0,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'api',
      testDir: 'tests/api',
    },
    {
      name: 'chromium-non-logged',
      grepInvert: /@logged/,
      testDir: 'tests/ui',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-logged',
      grep: /@logged/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
    },
    // {
    //   name: 'iphone',
    //   use: { ...devices['iPhone 12 Mini'] },
    // },
    {
      name: 'setup',
      testMatch: '*.setup.ts',
    },
  ],
});
