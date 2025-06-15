import { Page, APIRequestContext, Expect } from '@playwright/test';
import { Credentials } from '../credentials/credentials';
import { OrgType } from '../user-flows/org';
import { createApiToken } from './cipher';
import { IAction, IActor, IQuestion, ITask, Serializable, UserType } from './type';

/**
 * This documentation was created using AI.
 * Represents an actor in the Screenplay pattern.
 * An actor is a user or system that can perform actions and answer questions in the application.
 */
export class Actor implements IActor {
    page: Page;
    request: APIRequestContext;
    expects: Expect;
    type: UserType;
    proxy?: string;
    org?: OrgType;
    apiToken?: string;
    credentials?: {
        username: string;
        password: string;
    };
    cleanUpCallbacks: (() => Promise<void>)[] = [];

    /**
     * Creates a new Actor instance.
     * @param page The Playwright page object
     * @param request The Playwright API request context
     * @param expect The Playwright expect function
     * @param type The type of user this actor represents
     * @param proxy Optional proxy configuration
     */
    constructor(page: Page, request: APIRequestContext, expect: Expect, type: UserType, proxy?: string) {
        this.page = page;
        this.request = request;
        this.expects = expect;
        this.type = type;
        this.proxy = proxy;
    }

    /**
     * Adds a cleanup function to be executed when the actor is cleaned up.
     * @param fn The cleanup function to be executed
     */
    addCleanup(fn: () => Promise<void>): void {
        this.cleanUpCallbacks.push(fn);
    }

    /**
     * Sets the credentials for this actor.
     * @param credentials The username and password credentials
     */
    useCredentials(credentials: { username: string; password: string }) {
        this.credentials = credentials;
    }

    /**
     * Sets the organization for this actor and optionally its credentials.
     * @param org The organization type
     * @param skipCredentials Whether to skip setting credentials
     * @throws Error if no credentials are found for the organization or user type
     */
    useOrg(org: OrgType, skipCredentials = false) {
        this.org = org;
        const credentials = Credentials.find((c) => c.name === org);
        if (!credentials) {
            throw new Error(`No credentials found for org: ${org.value}`);
        }
        const thisUserCredentials = credentials.value.find((c) => c.name === this.type);
        if (!thisUserCredentials && !skipCredentials) {
            throw new Error(`No credentials found for user type: ${this.type}`);
        }
        if (thisUserCredentials) {
            this.credentials = thisUserCredentials.value;
        }
        this.apiToken = createApiToken(this.org.value);
    }

    /**
     * Sets the API token for this actor.
     * @param token The API token to use
     */
    useToken(token: string) {
        this.apiToken = token;
    }

    /**
     * Builds a URL for the current organization.
     * @param path The path to append to the base URL
     * @returns The complete URL
     * @throws Error if no organization is set
     */
    buildUrl(path: string) {
        if (!this.org) {
            throw new Error(`use {actor}.useOrg(Org.{orgName}) to setup your org`);
        }
        return `https://${this.org.value}.showpad.biz/${path}`;
    }

    /**
     * Asks a series of questions and returns the result of the last question.
     * @param questions The questions to ask
     * @returns A promise that resolves to the answer of the last question
     */
    async asks<T>(...questions: IQuestion<T>[]): Promise<T> {
        const reduceFn = async (chain: Promise<Serializable>, question: IQuestion<T>): Promise<Serializable> =>
            chain.then(async (): Promise<Serializable> => {
                try {
                    const innerRes = await question.answeredBy(this);
                    return Promise.resolve(innerRes);
                } catch (err) {
                    if (question.getIsFailAsFalse()) {
                        return Promise.resolve(false);
                    }
                    throw err;
                }
            });
        const attemptsRes = await questions.reduce(reduceFn, Promise.resolve());
        return Promise.resolve(attemptsRes);
    }

    /**
     * Attempts to perform a series of activities (tasks or actions).
     * @param activities The activities to perform
     * @returns A promise that resolves to the result of the last activity
     */
    async attemptsTo<T>(...activities: (ITask<T> | IAction<T>)[]): Promise<T> {
        const reduceFn = async (chain: Promise<Serializable>, activity: ITask<T> | IAction<T>): Promise<Serializable> =>
            chain.then(async (): Promise<Serializable> => {
                try {
                    const innerRes = await activity.performAs(this);
                    return Promise.resolve(innerRes);
                } catch (err) {
                    if (activity.getCanSkipOnFail()) {
                        return Promise.resolve(false);
                    }
                    throw err;
                }
            });
        const attemptsRes = await activities.reduce(reduceFn, Promise.resolve());
        return Promise.resolve(attemptsRes);
    }

    /**
     * Creates a new actor with the specified credentials.
     * @param email The email to use for authentication
     * @param password The password to use for authentication
     * @param type The type of user this actor represents
     * @returns A new actor instance with the specified credentials
     */
    createActor(email: string, password: string, type: UserType) {
        const newActor = new Actor(this.page, this.request, this.expects, type, this.proxy);
        if (this.org) newActor.useOrg(this.org, true);
        newActor.useCredentials({
            username: email,
            password: password,
        });
        return newActor;
    }

    /**
     * Executes all cleanup functions registered with this actor.
     * @returns A promise that resolves when all cleanup functions have completed
     */
    async cleanup(): Promise<Serializable> {
        return await Promise.all([
            ...this.cleanUpCallbacks.map(async (cleanUpCallback) => {
                return cleanUpCallback.call(this).finally(() => {
                    this.cleanUpCallbacks = this.cleanUpCallbacks.filter((fn) => fn !== cleanUpCallback);
                });
            }),
        ]);
    }
}
