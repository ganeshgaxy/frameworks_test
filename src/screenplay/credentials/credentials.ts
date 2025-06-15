import { Org } from '../user-flows/org';
import { CoachingQALegacy } from './coaching-qa-legacy';

export const Credentials = [{ name: Org.COACHING_QA_LEGACY, value: CoachingQALegacy }] as const;

export type CredentialsReturnType = (typeof Credentials)[number]['value'];
