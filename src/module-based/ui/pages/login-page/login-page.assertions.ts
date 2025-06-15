import { PageContextType } from '../../../core/type';
import { GetByDtl, GetByLabel } from './login-page.locators';

const LoginPageAssertions = (pageContext: PageContextType) => ({
    verifyIfAdminAppHomeMenuIsVisible: async () => {
        const isVisible = await pageContext.page.getByTestId(GetByDtl.adminHomeMenuButton).isVisible();
        pageContext.expect(isVisible).toBe(true);
    },
    verifyIfAdminAppHomeMenuIsNotVisible: async () => {
        const isHidden = await pageContext.page.getByTestId(GetByDtl.adminHomeMenuButton).isHidden();
        pageContext.expect(isHidden).toBe(true);
    },
    verifyIfWebAppHomeMenuIsVisible: async () => {
        const isVisible = await pageContext.page.getByLabel(GetByLabel.webAppHomeMenuButton).isVisible();
        pageContext.expect(isVisible).toBe(true);
    },
    verifyIfWebAppHomeMenuIsNotVisible: async () => {
        const isHidden = await pageContext.page.getByLabel(GetByLabel.webAppHomeMenuButton).isHidden();
        pageContext.expect(isHidden).toBe(true);
    },
});

export default LoginPageAssertions;
