import { PageContextType } from "../../../core/type";
import { Nav } from "../../nav";
import { GetByText, GetByLocator } from "./login-page.locators";

const LoginPageActions = (pageContext: PageContextType) => ({
  login: async (email: string, password: string) => {
    await pageContext.page.locator(GetByLocator.username).fill(email);
    await pageContext.page.locator(GetByLocator.password).fill(password);
    await pageContext.page.getByText(GetByText.submit).click();
  },
  waitForLogin: async () => {
    const url = pageContext.buildUrl(
      Nav.practiceAutomationApp(pageContext.proxy)
    );
    await pageContext.page.waitForURL(url, { timeout: 10000 });
  },
  logout: async () => {
    await pageContext.page.getByText(GetByText.logout).click();
    const url = pageContext.buildUrl(
      Nav.practiceAutomationLogin(pageContext.proxy)
    );
    await pageContext.page.waitForURL(url, { timeout: 10000 });
  },
});

export default LoginPageActions;
