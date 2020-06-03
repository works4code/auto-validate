import { PRECONDITION } from './constants';

export function precondition(predicate: (param) => boolean) {
    return Reflect.metadata(PRECONDITION, predicate);
}