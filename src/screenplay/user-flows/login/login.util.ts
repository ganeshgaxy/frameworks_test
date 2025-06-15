import { UserType } from '../../core/type';
import { OrgType } from '../org';

export type UserData = { email: string; password: string; firstName: string; lastName: string; type: UserType };

type ApiUserSchema = {
    email: string;
    password: string;
    userName: string;
    firstName: string;
    lastName: string;
    userType: string;
    language: string;
    isActive: boolean;
    timezone: string;
    forcePasswordReset: boolean;
    sendMailToUser: boolean;
    productLicenseContent?: string;
    productLicenseTrainingCoaching?: string;
    consentGiven: boolean;
};

export const buildOnlyHeaders = (token?: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const buildDataAndHeaders = (
    userData: UserData,
    org?: OrgType,
    token?: string,
): { headers: { Authorization: string }; data: ApiUserSchema } => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: buildData(userData, org?.type),
    };
};

export const buildData = (
    { email, password, firstName, lastName, type }: UserData,
    orgType?: 'legacy' | 'pnp',
): ApiUserSchema => {
    const user: ApiUserSchema = {
        email,
        password,
        userName: email,
        firstName: firstName,
        lastName: lastName,
        userType: getUserType(type),
        language: 'en',
        isActive: true,
        timezone: 'Europe/Brussels',
        forcePasswordReset: false,
        sendMailToUser: false,
        consentGiven: true,
    };
    if (orgType === 'legacy') {
        user.productLicenseContent = 'direct';
        user.productLicenseTrainingCoaching = 'direct';
    }
    return user;
};

export const getUserType = (type: UserType) => {
    switch (type) {
        case 'user':
            return 'tablet';
        case 'admin':
            return 'admin';
    }
};
