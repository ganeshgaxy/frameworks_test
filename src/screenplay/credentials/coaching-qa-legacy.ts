import { decrypt } from '../core/cipher';
import { UserType } from '../core/type';

const admin = {
    username: decrypt(
        '3fb04fbedf25b2b494061bc2cbd16a48297f4fd15bc44cf0b25ce4582d842b72f4cb99984b7eb7d89cbf5c695c5d2b3a',
    ),
    password: decrypt('c3c0464eda411e09f258934bdcc43f36'),
} as const;

export const CoachingQALegacy: { name: UserType; value: typeof admin }[] = [{ name: 'admin', value: admin }];
