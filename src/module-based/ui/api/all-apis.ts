import { ApiContextType } from '../../core/type';
import UserApi from './user-api/user-api';

const AllApis = (apiContext: ApiContextType) => ({
    userApi: UserApi(apiContext),
});

export default AllApis;
