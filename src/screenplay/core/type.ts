import { Page, APIRequestContext, Expect } from '@playwright/test';
import { OrgType } from '../user-flows/org';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Serializable = any;

/**
 * This documentation was created using AI.
 * Interface representing an actor in the Screenplay pattern.
 * An actor is a user or system that can perform actions and answer questions.
 */
export interface IActor {
    /** The Playwright page object */
    page: Page;
    /** The Playwright API request context */
    request: APIRequestContext;
    /** The Playwright expect function */
    expects: Expect;
    /** The type of user this actor represents */
    type: UserType;
    /** Optional proxy configuration */
    proxy?: string;
    /** The organization this actor belongs to */
    org?: OrgType;
    /** The API token for authentication */
    apiToken?: string;
    /** The credentials for authentication */
    credentials?: {
        username: string;
        password: string;
    };
    /** List of cleanup functions to be executed */
    cleanUpCallbacks: (() => Promise<void>)[];

    /**
     * Adds a cleanup function to be executed when the actor is cleaned up.
     * @param fn The cleanup function to be executed
     */
    addCleanup(fn: () => Promise<void>): void;

    /**
     * Builds a URL for the current organization.
     * @param path The path to append to the base URL
     * @returns The complete URL
     */
    buildUrl(path: string): string;

    /**
     * Sets the credentials for this actor.
     * @param credentials The username and password credentials
     */
    useCredentials(credentials: { username: string; password: string }): void;

    /**
     * Sets the organization for this actor.
     * @param org The organization type
     */
    useOrg(org: OrgType): void;

    /**
     * Sets the API token for this actor.
     * @param token The API token to use
     */
    useToken(token: string): void;

    /**
     * Asks a series of questions and returns the result of the last question.
     * @param question The questions to ask
     * @returns A promise that resolves to the answer of the last question
     */
    asks<T>(...question: IQuestion<T>[]): Promise<T>;

    /**
     * Attempts to perform a series of activities.
     * @param activities The activities to perform
     * @returns A promise that resolves to the result of the last activity
     */
    attemptsTo<T>(...activities: (ITask<T> | IAction<T>)[]): Promise<T>;

    /**
     * Creates a new actor with the specified credentials.
     * @param email The email to use for authentication
     * @param password The password to use for authentication
     * @param type The type of user this actor represents
     * @returns A new actor instance with the specified credentials
     */
    createActor(email: string, password: string, type: UserType): IActor;

    /**
     * Executes all cleanup functions registered with this actor.
     * @returns A promise that resolves when all cleanup functions have completed
     */
    cleanup(): Promise<Serializable>;
}

/**
 * Interface representing a task in the Screenplay pattern.
 * A task is a high-level activity that an actor can perform.
 * @template T The type of result that the task will return
 */
export interface ITask<T> {
    /**
     * Performs the task as the given actor.
     * @param actor The actor performing the task
     * @returns A promise that resolves to the result of the task
     */
    performAs(actor: IActor): Promise<T>;

    /**
     * Gets whether the task should skip on failure.
     * @returns true if the task should skip on failure, false otherwise
     */
    getCanSkipOnFail(): boolean;
}

/**
 * Interface representing a question in the Screenplay pattern.
 * A question is something that can be asked of an actor.
 * @template T The type of answer that the question will return
 */
export interface IQuestion<T> {
    /**
     * Gets the answer to this question from the given actor.
     * @param actor The actor to ask the question to
     * @returns A promise that resolves to the answer
     */
    answeredBy(actor: IActor): Promise<T>;

    /**
     * Gets whether the question should return false on failure.
     * @returns true if the question should return false on failure, false otherwise
     */
    getIsFailAsFalse(): boolean;
}

/**
 * Interface representing an action in the Screenplay pattern.
 * An action is a low-level activity that an actor can perform.
 * @template T The type of result that the action will return
 */
export interface IAction<T> {
    /**
     * Performs the action as the given actor.
     * @param actor The actor performing the action
     * @returns A promise that resolves to the result of the action
     */
    performAs(actor: IActor): Promise<T>;

    /**
     * Gets whether the action should skip on failure.
     * @returns true if the action should skip on failure, false otherwise
     */
    getCanSkipOnFail(): boolean;
}

/** Type representing the possible user types in the system */
export type UserType = 'admin' | 'user';
