import { test as baseTest, expect, TestInfo } from '@playwright/test';
import { ConnectionUrls, UrlHelper } from '@showpad/qa/client-legacy';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CURRENT_BRANCH_SLUG } from '../../../tools/utils/environment';

const test = baseTest.extend<{ connectionUrls: ConnectionUrls }>({
    connectionUrls: async (
        {}: Record<never, never>,
        use: (r: ConnectionUrls) => Promise<void>,
        workerInfo: TestInfo,
    ) => {
        const connectionUrls = UrlHelper.getConnectionUrls(CURRENT_BRANCH_SLUG, {
            baseUrl: workerInfo.project.use.baseURL ?? '',
            oauthToken: '',
        });

        await use(connectionUrls);
    },
});

test('has title', async ({ page, connectionUrls }) => {
    await page.goto(connectionUrls.showappUrl);
    console.info('current page is ' + page.url());

    // Expect h1 to contain a substring.
    expect(await page.locator('h1').innerText()).toContain('ShowApp');
});
