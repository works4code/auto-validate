import { PRECONDITION } from './constants';

export function precondition<T = any>(predicate: (this: T, param, instance?: T) => boolean) {
    return Reflect.metadata(PRECONDITION, predicate);
}