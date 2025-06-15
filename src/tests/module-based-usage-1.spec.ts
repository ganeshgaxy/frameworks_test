import { getAppUnderTest } from "../module-based/fixture/pages";
import { generateFakeData } from "../module-based/ui/api/user-api/user-api.data";
import { Org } from "../module-based/ui/org";

const test = getAppUnderTest(Org.PRACTICE_AUTOMATION);

test.describe("Feature: Login as Admin and New User", () => {
  test("Scenario: Admin user should be able to login", async ({
    pages,
    credentials,
  }) => {
    const { loginPage } = pages;
    const {
      practiceAutomationLogin: { admin },
    } = credentials;

    await test.step("Given Admin user navigate to url And login", async () => {
      await loginPage.navigateTo();
      await loginPage.actions.login(admin.username, admin.password);
      await loginPage.actions.waitForLogin();
    });
    await test.step("Then Admin verifies if home button is visible", async () => {
      await loginPage.assertions.verifyIfLogoutIsVisible();
    });
    await test.step("And Admin user Logout", async () => {
      await loginPage.actions.logout();
      await loginPage.assertions.verifyIfSubmitIsVisible();
    });
  });
});
