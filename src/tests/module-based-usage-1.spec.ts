import { getAppUnderTest } from '../module-based/fixture/pages';
import { generateFakeData } from '../module-based/ui/api/user-api/user-api.data';
import { Org } from '../module-based/ui/org';

const test = getAppUnderTest(Org.COACHING_QA_LEGACY);

test.describe('Feature: Login as Admin and New User', () => {
    test('Scenario: Admin user should be able to login', async ({ pages, credentials }) => {
        const { loginPage } = pages;
        const {
            coachQaLegacy: { admin },
        } = credentials;

        await test.step('Given Admin user navigate to url And login', async () => {
            await loginPage.navigateTo();
            await loginPage.actions.login(admin.username, admin.password);
            await loginPage.actions.waitForLoginToAdminApp();
        });
        await test.step('Then Admin verifies if home button is visible', async () => {
            await loginPage.assertions.verifyIfAdminAppHomeMenuIsVisible();
        });
        await test.step('And Admin user Logout', async () => {
            await loginPage.actions.logoutFromAdminApp();
        });
    });

    test('Scenario: New user should be able to login', async ({ pages, apis }) => {
        const { loginPage } = pages;
        const { userApi } = apis;
        const fakeData = generateFakeData('user');

        await test.step('Given Admin user creates new user via API', async () => {
            await userApi.createUser(fakeData);
        });
        await test.step('Then New user navigate to url and login', async () => {
            await loginPage.navigateTo();
            await loginPage.actions.login(fakeData.email, fakeData.password);
            await loginPage.actions.waitForLoginToWebApp();
        });
        await test.step('Then New user verifies if home button is visible', async () => {
            await loginPage.assertions.verifyIfWebAppHomeMenuIsVisible();
        });
        await test.step('And New user Logout', async () => {
            await loginPage.actions.logoutFromWebApp();
        });
    });
});
