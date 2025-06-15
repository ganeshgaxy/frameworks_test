import { ApiContextType } from '../../../core/type';
import { UserData } from './user-api.util';
import { UserApiActions } from './user-api-actions';

const UserApi = (apiContext: ApiContextType) => ({
    createUser: async (userData: UserData) => {
        const userApiActions = UserApiActions(apiContext);
        const response = await userApiActions.createUser(userData);
        const user = await response.json();
        await userApiActions.deleteUserCallback(user.response.id);
        return user.response;
    },
});

export default UserApi;
