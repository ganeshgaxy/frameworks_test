import { PracticeAutomationLogin } from "../credentials/practice-automation-credentials";

export const Nav = {
  practiceAutomationLogin: (proxy?: string) => {
    return proxy ? `practice-test-login` : "practice-test-login";
  },

  practiceAutomationApp: (proxy?: string) => {
    return proxy ? `logged-in-successfully/` : "logged-in-successfully/";
  },
};
