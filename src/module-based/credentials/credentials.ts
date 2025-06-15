import { CoachingQALegacy } from './coaching-qa-legacy';

export const Credentials = { coachQaLegacy: CoachingQALegacy } as const;

export type CredentialsReturnType = (typeof Credentials)[keyof typeof Credentials];
