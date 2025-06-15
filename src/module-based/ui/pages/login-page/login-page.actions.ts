import { PageContextType } from '../../../core/type';
import { Nav } from '../../nav';
import { GetByDtl, GetByLabel, GetByRole } from './login-page.locators';

const LoginPageActions = (pageContext: PageContextType) => ({
    login: async (email: string, password: string) => {
        await pageContext.page.getByRole(GetByRole.loginUsername.name, GetByRole.loginUsername.options).fill(email);
        await pageContext.page.getByRole(GetByRole.loginPassword.name, GetByRole.loginPassword.options).fill(password);
        await pageContext.page.getByRole(GetByRole.loginSubmit.name, GetByRole.loginSubmit.options).click();
    },
    waitForLoginToAdminApp: async () => {
        await pageContext.page.waitForLoadState('load');
        const url = pageContext.buildUrl(Nav.showpadAdminApp(pageContext.proxy));
        await pageContext.page.waitForURL(url, { timeout: 10000 });
        await pageContext.page.getByTestId(GetByDtl.adminHomeMenuButton).isVisible();
    },
    waitForLoginToWebApp: async () => {
        await pageContext.page.waitForLoadState('load');
        const url = pageContext.buildUrl(Nav.showpadWebApp(pageContext.proxy));
        await pageContext.page.waitForURL(url, { timeout: 20000 });
        await pageContext.page.getByLabel(GetByLabel.webAppHomeMenuButton).isVisible();
    },
    logoutFromAdminApp: async () => {
        const url = pageContext.buildUrl(Nav.showpadLogin(pageContext.proxy));
        await pageContext.page.getByTestId(GetByDtl.adminAvatarMenuButton).click();
        await pageContext.page.getByTestId(GetByDtl.adminLogoutButton).click();
        await pageContext.page.waitForURL(url, { timeout: 10000 });
    },
    logoutFromWebApp: async () => {
        const url = pageContext.buildUrl(Nav.showpadLogin(pageContext.proxy));
        await pageContext.page.getByTestId(GetByDtl.webAppAvatarMenuButton).click();
        await pageContext.page.getByTestId(GetByDtl.webAppLogoutButton).click();
        await pageContext.page.waitForURL(url, { timeout: 10000 });
    },
});

export default LoginPageActions;
