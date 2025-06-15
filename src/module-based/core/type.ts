/**
 * Core type definitions for the user flow E2E testing module.
 * This file contains the fundamental types used across the module-based testing framework.
 */

import { Page, APIRequestContext, Expect } from '@playwright/test';
import { OrgType } from '../ui/org';

/**
 * Represents the context for a page in the E2E testing environment.
 * This type encapsulates all the necessary components for interacting with a page
 * and making API requests during testing.
 */
type PageContextType = {
    /** Playwright Page object for browser interactions */
    page: Page;
    /** Playwright Expect object for assertions */
    expect: Expect;
    /** Optional proxy configuration for requests */
    proxy?: string;
    /** Organization configuration for the current context */
    org?: OrgType;
    /** Function to build URLs for the current organization */
    buildUrl: (path: string) => string;
    /** Authentication token for API requests */
    token: string;
    /** Array of cleanup functions to be executed after tests */
    cleanUpCallbacks: (() => Promise<void>)[];
};

/**
 * Represents the context for a page in the E2E testing environment.
 * This type encapsulates all the necessary components for interacting with a page
 * and making API requests during testing.
 */
type ApiContextType = {
    /** Playwright APIRequestContext for making HTTP requests */
    request: APIRequestContext;
    /** Playwright Expect object for assertions */
    expect: Expect;
    /** Organization configuration for the current context */
    org?: OrgType;
    /** Function to build URLs for the current organization */
    buildUrl: (path: string) => string;
    /** Authentication token for API requests */
    token: string;
    /** Array of cleanup functions to be executed after tests */
    cleanUpCallbacks: (() => Promise<void>)[];
};

export type { PageContextType, ApiContextType };

/**
 * Represents the possible user types in the system.
 * Used for role-based access control and testing different user scenarios.
 */
export type UserType = 'admin' | 'user';
