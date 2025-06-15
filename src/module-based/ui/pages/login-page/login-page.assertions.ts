import { PageContextType } from "../../../core/type";
import { GetByText } from "./login-page.locators";

const LoginPageAssertions = (pageContext: PageContextType) => ({
  verifyIfLogoutIsVisible: async () => {
    const isVisible = await pageContext.page
      .getByText(GetByText.logout)
      .isVisible();
    pageContext.expect(isVisible).toBe(true);
  },
  verifyIfSubmitIsVisible: async () => {
    const isVisible = await pageContext.page
      .getByText(GetByText.submit)
      .isVisible();
    pageContext.expect(isVisible).toBe(true);
  },
});

export default LoginPageAssertions;
