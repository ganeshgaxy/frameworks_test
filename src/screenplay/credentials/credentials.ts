import { Org } from "../user-flows/org";
import { SampleCredentials } from "./sample";

export const Credentials = [
  { name: Org.SampleCredentials, value: SampleCredentials },
] as const;

export type CredentialsReturnType = (typeof Credentials)[number]["value"];
