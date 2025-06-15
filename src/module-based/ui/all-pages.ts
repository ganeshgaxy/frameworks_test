import LoginPage from './pages/login-page/login-page';
import { PageContextType } from '../core/type';

const Pages = (pageContext: PageContextType) => ({
    loginPage: LoginPage(pageContext),
});

export default Pages;
