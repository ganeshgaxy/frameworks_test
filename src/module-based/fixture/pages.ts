import { APIRequestContext, Browser, test as base, expect } from '@playwright/test';
import Pages from '../ui/all-pages';
import { ApiContext, PageContext, cleanup } from '../core/page-context';
import { OrgType } from '../ui/org';
import { Credentials } from '../credentials/credentials';
import { ApiContextType, PageContextType } from '../core/type';
import AllApis from '../ui/api/all-apis';

type PagesType = {
    pages: ReturnType<typeof Pages>;
    credentials: typeof Credentials;
    apis: ReturnType<typeof AllApis>;
};

export const getAppUnderTest = (org: OrgType) => {
    let pageContext: PageContextType, apiContext: ApiContextType;
    const test = base.extend<PagesType>({
        pages: async ({ browser }, use) => {
            pageContext = await buildPageContext(browser, org);
            await use(Pages(pageContext));
        },
        apis: async ({ request }, use) => {
            apiContext = await buildApiContext(request, org);
            const apis = AllApis(apiContext);
            await use(apis);
        },
        credentials: async ({}, use) => {
            const credentials = Credentials;
            await use(credentials);
        },
    });

    test.afterEach(async () => {
        if (apiContext) {
            console.log('AfterEach cleanup callbacks : ', apiContext.cleanUpCallbacks.length);
            await cleanup(apiContext.cleanUpCallbacks);
        }
    });

    return test;
};

const buildPageContext = async (browser: Browser, org: OrgType) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const proxy = process.env['frontendBaseUrl'];
    return PageContext(page, expect, org, proxy);
};

const buildApiContext = async (request: APIRequestContext, org: OrgType) => {
    return ApiContext(request, expect, org);
};
