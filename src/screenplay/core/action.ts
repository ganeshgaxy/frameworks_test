import { IAction, IActor, Serializable } from './type';

/**
 * This documentation was created using AI.
 * Base class for implementing actions in the Screenplay pattern.
 * Actions represent activities that an actor can perform in the system.
 * @template T The type of result that the action will return
 */
export abstract class Action<T> implements IAction<T> {
    private canSkipOnFail = false;

    /**
     * Performs the action as the given actor.
     * @param actor The actor performing the action
     * @returns A promise that resolves to the result of the action
     */
    abstract performAs(actor: IActor): Promise<T>;

    /**
     * Configures the action to skip on failure instead of throwing an error.
     * @returns The action instance for method chaining
     */
    public get orSkipOnFail() {
        this.canSkipOnFail = true;
        return this;
    }

    /**
     * Gets whether the action should skip on failure.
     * @returns true if the action should skip on failure, false otherwise
     */
    public getCanSkipOnFail() {
        return this.canSkipOnFail;
    }

    /**
     * Static factory method to create and execute a new action.
     * @template T The type of result that the action will return
     * @template K The type of the action class
     * @returns A new instance of the action
     */
    public static execute<T, K extends Action<T>>(this: new () => K): K {
        return new this();
    }

    /**
     * Static factory method to create and execute a new action with data.
     * @template T The type of result that the action will return
     * @template K The type of the action class
     * @returns A new instance of the action
     */
    public static withData<T, K extends Action<T>>(
        this: new (...data: Serializable[]) => K,
        ...data: Serializable[]
    ): K {
        return new this(...data);
    }
}
