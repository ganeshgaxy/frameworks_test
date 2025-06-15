import { Action } from '../../core/action';
import { Task } from '../../core/task';
import { IActor, Serializable } from '../../core/type';
import {
    LoginNavigationAction,
    LoginAttemptAction,
    LogoutAdminAppAction,
    LogoutWebAppAction,
    LoginToAdminAppSuccessfullyAction,
    LoginToWebAppSuccessfullyAction,
} from './login.web';
import { UserCreationApiAction, UserDeletionCallbackApiAction } from './login.api';
import { GetByDtl } from './login.screen';
import { UserData } from './login.util';

export class NavigateAndLoginSuccessfullyTask extends Task<unknown> {
    private navigateAndLoginActivities: (Task<unknown> | Action<unknown>)[] = [
        LoginNavigationAction.execute(),
        LoginAttemptAction.execute(),
    ];

    performAs(actor: IActor): Promise<Serializable> {
        actor.attemptsTo(...this.navigateAndLoginActivities);
        if (actor.type === 'admin') {
            return actor.attemptsTo(LoginToAdminAppSuccessfullyAction.execute());
        } else {
            return actor.attemptsTo(LoginToWebAppSuccessfullyAction.execute());
        }
    }
}

export class LogoutFromShowpadTask extends Task<unknown> {
    async performAs(actor: IActor): Promise<Serializable> {
        const adminHomeMenuButton = await actor.page.getByTestId(GetByDtl.adminHomeMenuButton).isVisible();
        if (adminHomeMenuButton && actor.type === 'admin') {
            return actor.attemptsTo(LogoutAdminAppAction.execute());
        } else {
            return actor.attemptsTo(LogoutWebAppAction.execute());
        }
    }
}

export class CreateUserApiTask extends Task<IActor> {
    constructor(private userData: UserData) {
        super();
    }

    async performAs(actor: IActor): Promise<IActor> {
        const response = await actor.attemptsTo(UserCreationApiAction.withData(this.userData));
        if (response.status() !== 201) {
            console.error(response);
            throw new Error(`Failed to create user: ${response.statusText}`);
        }
        const user = await response.json();
        await actor.attemptsTo(UserDeletionCallbackApiAction.withData(user.response.id));
        return actor.createActor(this.userData.email, this.userData.password, this.userData.type);
    }
}
