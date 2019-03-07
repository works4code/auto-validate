import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";
import { curryRight, isArrayLike } from '../utils/index';
import { isEqual } from './equals';

/**
 * Checks if value is in collection. If collection is a string, it's checked for a substring of value.
 * @param collection The collection to inspect.
 * @param value The value to search for.
 * @param position The index at which to begin searching the collection. If omitted, search starts at the beginning of the collection.
 */
export function isContain<T=any>(collection: string | ArrayLike<T> | object, value: T, position = 0) {
    if (typeof collection === 'string') {
        return collection.indexOf(value as any, position) > -1;
    } else if (isArrayLike(collection)) {
        for (let index = position, length = (collection as any).length; index < length; index++) {
            const item = (collection as any)[index];
            if (isEqual(value, item)) {
                return true;
            }
        }
    } else if (typeof collection === 'object') {
        return value as any in collection;
    }
    return false;
}

/**
 * Checks if current property value is a collection include the special value or is object include the special key.
 * @param value The value to search for.
 * @param position The index at which to begin searching the collection. If omitted, search starts at the beginning of the collection.
 * @param options Validator options.
 */
export function contains(value: any, position = 0, options?: IValidatorOptions) {
    const message = 'The {display} is not contains {$0}.';
    const predicate = curryRight(isContain, value, position);
    options = Object.assign({ arguments, message, type: 'contains' }, options);
    return validator(predicate, options);
}