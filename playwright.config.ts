import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';

process.env['BASE_URL'] = 'staging.showpad.biz';
const subdomain = process.env['STAGING_SUBDOMAIN'] ?? 'qa';
const baseURL = process.env['BASE_URL'] ? `https://${subdomain}.${process.env['BASE_URL']}` : 'https://localhost:4220/';

export default defineConfig({
    ...nxE2EPreset(__filename, { testDir: './src/tests' }),
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        baseURL,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        testIdAttribute: 'data-test-label',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
