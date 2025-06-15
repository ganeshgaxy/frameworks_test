export type OrgType = { type: "test" | "pnp"; value: string };

export const Org = {
  PRACTICE_AUTOMATION: {
    type: "test",
    value: "practicetestautomation.com",
  } as OrgType,
} as const;
