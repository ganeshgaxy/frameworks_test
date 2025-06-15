import { PracticeAutomationLogin } from "./practice-automation-credentials";

export const Credentials = {
  practiceAutomationLogin: PracticeAutomationLogin,
} as const;

export type CredentialsReturnType =
  (typeof Credentials)[keyof typeof Credentials];
