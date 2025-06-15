import { faker } from '@faker-js/faker';
import { UserType } from '../../core/type';
import { UserData } from './login.util';

export const generateFakeData = (type: UserType): UserData => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        type,
    };
};
