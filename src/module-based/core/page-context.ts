/**
 * Core functionality for managing page contexts in E2E testing.
 * This module provides utilities for creating and managing page contexts,
 * including cleanup operations for test resources.
 */

import { Expect } from "@playwright/test";

import { APIRequestContext } from "@playwright/test";

import { Page } from "@playwright/test";
import { ApiContextType, PageContextType } from "./type";
import { OrgType } from "../ui/org";
import { createApiToken } from "../../screenplay/core/cipher";

/**
 * Creates a new page context with the provided configuration.
 * This context encapsulates all necessary components for page interaction and API requests.
 *
 * @param page - Playwright Page object
 * @param request - Playwright APIRequestContext
 * @param expect - Playwright Expect object
 * @param org - Organization configuration
 * @param proxy - Optional proxy configuration
 * @returns A configured PageContextType object
 */
const PageContext = (
  page: Page,
  expect: Expect,
  org: OrgType,
  proxy?: string
) =>
  ({
    page,
    expect,
    org,
    proxy,
    buildUrl: (path: string) => `https://${org.value}/${path}`,
    token: createApiToken(org.value),
    cleanUpCallbacks: [] as (() => Promise<void>)[],
  } as PageContextType);

/**
 * Creates a new API context with the provided configuration.
 * This context encapsulates all necessary components for API requests and cleanup operations.
 *
 * @param request - Playwright APIRequestContext
 * @param expect - Playwright Expect object
 * @param org - Organization configuration
 * @returns A configured ApiContextType object
 */
const ApiContext = (request: APIRequestContext, expect: Expect, org: OrgType) =>
  ({
    request,
    expect,
    org,
    buildUrl: (path: string) => `https://${org.value}/${path}`,
    token: createApiToken(org.value),
    cleanUpCallbacks: [] as (() => Promise<void>)[],
  } as ApiContextType);

/**
 * Executes all cleanup callbacks registered in the page context.
 * This function ensures proper resource cleanup after test execution.
 *
 * @param cleanUpCallbacks - Array of cleanup functions to execute
 * @returns Promise that resolves when all cleanup operations are complete
 */
export const cleanup = async (cleanUpCallbacks: (() => Promise<void>)[]) => {
  await Promise.all([
    ...cleanUpCallbacks.map(async (cleanUpCallback) => {
      return cleanUpCallback.call(this).finally(() => {
        cleanUpCallbacks = cleanUpCallbacks.filter(
          (fn) => fn !== cleanUpCallback
        );
      });
    }),
  ]);
};

export { PageContext, ApiContext };
