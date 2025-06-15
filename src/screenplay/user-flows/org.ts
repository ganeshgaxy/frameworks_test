export type OrgType = { type: "legacy" | "pnp"; value: string };

export const Org = {
  SampleCredentials: {
    type: "legacy",
    value: "com.com",
  } as OrgType,
} as const;
