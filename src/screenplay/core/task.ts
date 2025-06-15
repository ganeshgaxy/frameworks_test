import { IActor, ITask, Serializable } from './type';

/**
 * This documentation was created using AI.
 * Base class for implementing tasks in the Screenplay pattern.
 * Tasks represent high-level activities that an actor can perform in the system.
 * @template T The type of result that the task will return
 */
export abstract class Task<T> implements ITask<T> {
    private canSkipOnFail = false;

    /**
     * Performs the task as the given actor.
     * @param actor The actor performing the task
     * @returns A promise that resolves to the result of the task
     */
    abstract performAs(actor: IActor): Promise<T>;

    /**
     * Configures the task to skip on failure instead of throwing an error.
     * @returns The task instance for method chaining
     */
    public get orSkipOnFail() {
        this.canSkipOnFail = true;
        return this;
    }

    /**
     * Gets whether the task should skip on failure.
     * @returns true if the task should skip on failure, false otherwise
     */
    public getCanSkipOnFail() {
        return this.canSkipOnFail;
    }

    /**
     * Static factory method to create and execute a new task.
     * @template T The type of result that the task will return
     * @template K The type of the task class
     * @returns A new instance of the task
     */
    public static execute<T, K extends Task<T>>(this: new () => K): K {
        return new this();
    }

    /**
     * Static factory method to create and execute a new task with data.
     * @template T The type of result that the task will return
     * @template K The type of the task class
     * @returns A new instance of the task
     */
    public static withData<T, K extends Task<T>>(this: new (...data: Serializable[]) => K, ...data: Serializable[]): K {
        return new this(...data);
    }
}
