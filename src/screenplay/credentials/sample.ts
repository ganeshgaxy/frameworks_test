import { decrypt } from "../core/cipher";
import { UserType } from "../core/type";

const admin = {
  username: "username",
  password: "password",
} as const;

export const SampleCredentials: { name: UserType; value: typeof admin }[] = [
  { name: "admin", value: admin },
];
