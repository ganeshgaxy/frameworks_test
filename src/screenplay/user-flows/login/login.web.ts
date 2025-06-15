import { Action } from '../../core/action';
import { IActor, Serializable } from '../../core/type';
import { Nav } from '../nav';
import { GetByDtl, GetByLabel, GetByRole } from './login.screen';

export class LoginNavigationAction extends Action<unknown> {
    async performAs(actor: IActor): Promise<Serializable> {
        const url = actor.buildUrl(Nav.showpadLogin(actor.proxy));
        await actor.page.goto(url);
    }
}

export class LoginAttemptAction extends Action<unknown> {
    async performAs(actor: IActor): Promise<Serializable> {
        const username = GetByRole.loginUsername;
        const password = GetByRole.loginPassword;
        const submit = GetByRole.loginSubmit;
        if (!actor.credentials) {
            throw new Error('No credentials found for actor');
        }
        await actor.page.getByRole(username.name, username.options).fill(actor.credentials.username);
        await actor.page.getByRole(password.name, password.options).fill(actor.credentials.password);
        await actor.page.getByRole(submit.name, submit.options).click();
    }
}

export class LoginToAdminAppSuccessfullyAction extends Action<unknown> {
    async performAs(actor: IActor): Promise<Serializable> {
        await actor.page.waitForLoadState('load');
        const url = actor.buildUrl(Nav.showpadAdminApp(actor.proxy));
        await actor.page.waitForURL(url, { timeout: 10000 });
        await actor.page.getByTestId(GetByDtl.adminHomeMenuButton).isVisible();
    }
}

export class LoginToWebAppSuccessfullyAction extends Action<unknown> {
    async performAs(actor: IActor): Promise<Serializable> {
        await actor.page.waitForLoadState('load');
        const url = actor.buildUrl(Nav.showpadWebApp(actor.proxy));
        await actor.page.waitForURL(url, { timeout: 20000 });
        await actor.page.getByLabel(GetByLabel.webAppHomeMenuButton).isVisible();
    }
}

export class LogoutAdminAppAction extends Action<unknown> {
    async performAs(actor: IActor): Promise<Serializable> {
        const url = actor.buildUrl(Nav.showpadLogin(actor.proxy));
        await actor.page.getByTestId(GetByDtl.adminAvatarMenuButton).click();
        await actor.page.getByTestId(GetByDtl.adminLogoutButton).click();
        await actor.page.waitForURL(url, { timeout: 10000 });
    }
}

export class LogoutWebAppAction extends Action<unknown> {
    async performAs(actor: IActor): Promise<Serializable> {
        const url = actor.buildUrl(Nav.showpadLogin(actor.proxy));
        await actor.page.getByTestId(GetByDtl.webAppAvatarMenuButton).click();
        await actor.page.getByTestId(GetByDtl.webAppLogoutButton).click();
        await actor.page.waitForURL(url, { timeout: 10000 });
    }
}
