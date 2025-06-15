/**
 * Cryptographic utilities for E2E testing.
 * This module provides functions for handling encrypted data and API token generation
 * in the testing environment.
 */

import crypto from 'crypto';

/**
 * Decrypts an encrypted string using AES-256-CBC encryption.
 * This function is used to securely handle sensitive data in the testing environment.
 *
 * @param encrypted - The encrypted string to decrypt
 * @returns The decrypted string
 * @throws Error if SP_QA_CIPHER_KEY environment variable is not set
 */
export const decrypt = (encrypted: string) => {
    if (!process.env.SP_QA_CIPHER_KEY) {
        throw new Error('SP_QA_CIPHER_KEY is not set');
    }
    const key = crypto.scryptSync(process.env.SP_QA_CIPHER_KEY, 'salt', 32);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

/**
 * Creates an API token for the given organization.
 * This function generates a standardized API token format for E2E testing,
 * combining the OAuth token prefix with the organization identifier.
 *
 * @param org - The organization name to generate the token for
 * @returns The generated API token in the format: {prefix}-org-{org}
 * @throws Error if E2E_OAUTH_TOKEN_PREFIX environment variable is not set
 */
export const createApiToken = (org: string): string => {
    const e2eOauthTokenPrefix = process.env.E2E_OAUTH_TOKEN_PREFIX;
    if (!e2eOauthTokenPrefix || e2eOauthTokenPrefix.length < 1) {
        throw new Error(`E2E_OAUTH_TOKEN_PREFIX environment variable was not set.`);
    }

    return `${e2eOauthTokenPrefix}-org-${org}`;
};
