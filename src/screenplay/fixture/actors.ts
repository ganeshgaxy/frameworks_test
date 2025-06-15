import { APIRequestContext, Browser, test as base, expect } from '@playwright/test';
import { Actor } from '../core/actor';
type Actors = {
    admin: Actor;
    user: Actor;
};

export const test = base.extend<Actors>({
    admin: async ({ browser, request }, use) => {
        const adminActor = await buildActor(browser, request, 'admin');
        await use(adminActor);
    },
    user: async ({ browser, request }, use) => {
        const userActor = await buildActor(browser, request, 'user');
        await use(userActor);
    },
});

const buildActor = async (browser: Browser, request: APIRequestContext, type: 'admin' | 'user') => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const proxy = process.env['frontendBaseUrl'];
    return new Actor(page, request, expect, type, proxy);
};

test.afterEach(async ({ admin, user }) => {
    await admin.cleanup();
    await user.cleanup();
});
