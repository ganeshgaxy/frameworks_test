import { IActor } from "../screenplay/core/type";
import { test } from "../screenplay/fixture/actors";
import { generateFakeData } from "../screenplay/user-flows/login/login.data";
import {
  AdminAppHomeMenuIsVisible,
  WebAppHomeMenuIsVisible,
} from "../screenplay/user-flows/login/login.question";
import {
  CreateUserApiTask,
  LogoutFromShowpadTask,
  NavigateAndLoginSuccessfullyTask,
} from "../screenplay/user-flows/login/login.task";
import { Org } from "../screenplay/user-flows/org";

test.describe("Feature: Login as Admin and New User", () => {
  test.beforeEach(async ({ admin }) => {
    admin.useOrg(Org.SampleCredentials);
  });

  test("Scenario: Admin user should be able to login", async ({ admin }) => {
    await test.step("Given Admin user navigate to url And login", async () => {
      await admin.attemptsTo(NavigateAndLoginSuccessfullyTask.execute());
    });
    await test.step("Then Admin verifies if home button is visible", async () => {
      const isHomeButtonVisible = await admin.asks(
        AdminAppHomeMenuIsVisible.answer()
      );
      admin.expects(isHomeButtonVisible).toBe(true);
    });
    await test.step("And Admin user Logout", async () => {
      await admin.attemptsTo(LogoutFromShowpadTask.execute());
    });
  });

  test("Scenario: New user should be able to login", async ({ admin }) => {
    let userActor: IActor;
    const fakeData = generateFakeData("user");

    await test.step("Given Admin user creates new user via API", async () => {
      userActor = await admin.attemptsTo(CreateUserApiTask.withData(fakeData));
    });
    await test.step("Then New user navigate to url and login", async () => {
      await userActor.attemptsTo(NavigateAndLoginSuccessfullyTask.execute());
    });
    await test.step("Then New user verifies if home button is visible", async () => {
      const isHomeButtonVisible = await userActor.asks(
        WebAppHomeMenuIsVisible.answer()
      );
      userActor.expects(isHomeButtonVisible).toBe(true);
    });
    await test.step("And New user Logout", async () => {
      await userActor.attemptsTo(LogoutFromShowpadTask.execute());
    });
  });
});
