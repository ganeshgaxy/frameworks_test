import { APIResponse } from '@playwright/test';
import { ApiContextType } from '../../../core/type';
import { UserApiEndpoints } from './user-api.endpoints';
import { buildDataAndHeaders, UserData, buildOnlyHeaders } from './user-api.util';

export const UserApiActions = (apiContext: ApiContextType) => ({
    createUser: async (userData: UserData): Promise<APIResponse> => {
        const postUrl = apiContext.buildUrl(UserApiEndpoints.users);
        return await apiContext.request.post(postUrl, buildDataAndHeaders(userData, apiContext.org, apiContext.token));
    },
    deleteUserCallback: async (userId: string): Promise<void> => {
        const deleteUrl = apiContext.buildUrl(UserApiEndpoints.user(userId));
        apiContext.cleanUpCallbacks.push(async () => {
            await apiContext.request.delete(deleteUrl, buildOnlyHeaders(apiContext.token));
        });
    },
});
