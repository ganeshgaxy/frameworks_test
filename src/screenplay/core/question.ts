import { IActor, IQuestion } from './type';

/**
 * This documentation was created using AI.
 * Base class for implementing questions in the Screenplay pattern.
 * Questions represent things that can be asked of an actor in the system.
 * @template T The type of answer that the question will return
 */
export abstract class Question<T> implements IQuestion<T> {
    private isFailAsFalse = false;

    /**
     * Gets the answer to this question from the given actor.
     * @param actor The actor to ask the question to
     * @returns A promise that resolves to the answer
     */
    abstract answeredBy(actor: IActor): Promise<T>;

    /**
     * Configures the question to return false on failure instead of throwing an error.
     * @returns The question instance for method chaining
     */
    public get failAsFalse() {
        this.isFailAsFalse = true;
        return this;
    }

    /**
     * Gets whether the question should return false on failure.
     * @returns true if the question should return false on failure, false otherwise
     */
    getIsFailAsFalse(): boolean {
        return this.isFailAsFalse;
    }

    /**
     * Static factory method to create and answer a new question.
     * @template T The type of answer that the question will return
     * @template K The type of the question class
     * @returns A new instance of the question
     */
    public static answer<T, K extends Question<T>>(this: new () => K): K {
        return new this();
    }
}
