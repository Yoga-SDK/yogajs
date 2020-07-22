import { Factory, FactoryContainer } from "./factory.ts";

export class Container {

    /**
     * The current globally avaible container (if any)
     *
     * @private
     * @static
     * @type {Container}
     * @memberof Container
     */
    private static instance: Container;

    /**
     * Factory Container instance
     *
     * @private
     * @type {FactoryContainer}
     * @memberof Container
     */
    private factoryContainer: FactoryContainer = {};

    /**
     * Creates an instance of Container.
     *
     * @memberof Container
     */
    private constructor() { }

    /**
     * Gets the current avaible container (if any) or creates one
     *
     * @static
     * @returns {Container}
     * @memberof Container
     */
    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }

    /**
     * Add a new creator to the factory container
     *
     * @param {string} alias
     * @param {() => {}} creator
     * @memberof Container
     */
    public bind(alias: string, creator: () => {}, shared?: boolean): void {
        this.factoryContainer[alias] = new Factory(alias, creator, shared);
    }

    /**
     * Get a instance from the factory container
     *
     * @template T
     * @param {string} alias
     * @returns {T}
     * @memberof Container
     */
    public get<T>(alias: string): T {
        return this.factoryContainer[alias].create<T>();
    }
}

// Exports the singleton container
export default Container.getInstance();
