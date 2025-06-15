import { PageContextType } from '../../../core/type';
import LoginPageActions from './login-page.actions';
import LoginPageAssertions from './login-page.assertions';
import { Nav } from '../../../ui/nav';

const LoginPage = (pageContext: PageContextType) => ({
    navigateTo: async () => {
        await pageContext.page.goto(pageContext.buildUrl(Nav.showpadLogin(pageContext.proxy)));
    },
    actions: LoginPageActions(pageContext),
    assertions: LoginPageAssertions(pageContext),
});

export default LoginPage;
