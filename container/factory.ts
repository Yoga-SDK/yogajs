export class Factory {

    /**
     * Instance if it is a singleton
     *
     * @private
     * @type {*}
     * @memberof Factory
     */
    private instance: any;

    /**
     * Creates an instance of Factory.
     *
     * @param {string} alias
     * @param {() => any} creator
     * @memberof Factory
     */
    constructor(
        public alias: string,
        public creator: () => any,
        public shared?: boolean
    ) {
        if (this.shared) {
            this.instance = creator();
        }
    }

    /**
     * Create a new class from creator
     *
     * @template T
     * @returns {T}
     * @memberof Factory
     */
    create<T>(): T {
        return this.shared ? this.instance : this.creator();
    }
}

/**
 * Factory Container Interface
 *
 * @export
 * @interface FactoryContainer
 */
export interface FactoryContainer {
    [key: string]: Factory
}
