import Container from "./index.ts";

/**
 * Add instance from container to the property
 *
 * @export
 * @param {*} bind
 * @returns {PropertyDecorator}
 */
export function Autowired(bind: any): PropertyDecorator {
    return (target: any, property) => {
        if (typeof bind === 'string') {
            Object.assign(target, { [property]: Container.get(bind) });
            return;
        }
        Object.assign(target, { [property]: Container.get(bind.name) });
    }
}

/**
 * Makes a class injectable
 *
 * @export
 * @param {string} [namespace]
 * @returns {ClassDecorator}
 */
export function Injectable(namespace?: string): ClassDecorator {
    return (target: any) => {
        if (namespace) {
            Container.bind(namespace, () => new target());
            return;
        }
        Container.bind(target.name, () => new target());
    }
}

/**
 * Add a singleton into container
 *
 * @export
 * @param {string} [namespace]
 * @returns {ClassDecorator}
 */
export function Singleton(namespace?: string): ClassDecorator {
    return (target: any) => {
        if (namespace) {
            Container.bind(namespace, () => new target(), true);
            return;
        }
        Container.bind(target.name, () => new target(), true);
    }
}