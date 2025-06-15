import { APIResponse } from '@playwright/test';
import { Action } from '../../core/action';
import { IActor } from '../../core/type';
import { Api } from '../api';
import { UserData, buildDataAndHeaders, buildOnlyHeaders } from './login.util';

export class UserCreationApiAction extends Action<APIResponse> {
    constructor(private userData: UserData) {
        super();
    }
    async performAs(actor: IActor): Promise<APIResponse> {
        const { apiToken, org } = actor;
        const postUrl = actor.buildUrl(Api.users);
        return await actor.request.post(postUrl, buildDataAndHeaders(this.userData, org, apiToken));
    }
}

export class UserDeletionCallbackApiAction extends Action<unknown> {
    constructor(private userId: string) {
        super();
    }
    async performAs(actor: IActor): Promise<unknown> {
        const { apiToken } = actor;
        const deleteUrl = actor.buildUrl(Api.user(this.userId));
        return actor.addCleanup(async () => {
            await actor.request.delete(deleteUrl, buildOnlyHeaders(apiToken));
        });
    }
}
