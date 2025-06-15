export type OrgType = { type: 'legacy' | 'pnp'; value: string };

export const Org = {
    COACHING_QA_LEGACY: { type: 'legacy', value: 'coach-qa-legacy.staging' } as OrgType,
} as const;
