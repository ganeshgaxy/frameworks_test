import { UserType } from "../../../core/type";
import { OrgType } from "../../org";

export type UserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  type: UserType;
};

type ApiUserSchema = {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
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
  token?: string
): { headers: { Authorization: string }; data: ApiUserSchema } => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: buildData(userData),
  };
};

export const buildData = ({
  email,
  password,
  firstName,
  lastName,
  type,
}: UserData): ApiUserSchema => {
  const user: ApiUserSchema = {
    email,
    password,
    userName: email,
    firstName: firstName,
    lastName: lastName,
  };
  return user;
};
