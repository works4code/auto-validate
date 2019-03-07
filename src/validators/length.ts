import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";
import { curryRight, isArrayLike, isNil } from '../utils/index';
import { isInRange } from './range';

interface ILengthValidatorOptions {
    /**
     * The length of collection or string to be specified.
     * If the value is specified, it will compare whether the length of the value is equal to the specified digits.
     */
    length?: number;
    /**
     * The max length of collection or string to be specified.
     * If the length is already specified, it will be ignored.
     */
    maxLength?: number;
    /**
     * The min length of collection or string to be specified, default is 0.
     * If the length is already specified, it will be ignored.
     */
    minLength?: number;
}

/**
 * Returns a Boolean value that indicates whether or not the value's length is satisfied the special demand.
 * @param options Validator Options.
 */
export function isLengthSatisfied(value: any, options: ILengthValidatorOptions) {
    if (isNil(value)) return false;
    let length: number;
    if (isArrayLike(value)) {
        length = value.length;
    } else if (typeof value === 'object') {
        length = Object.keys(value).length;
    }
    if (length && options) {
        if (options.length) {
            return length === options.length;
        }
        options = Object.assign({ minLength: 0 }, options);
        if (options.maxLength) {
            return isInRange(length, options.minLength, options.maxLength);
        } else {
            return length >= options.minLength;
        }
    }
    return false;
}

/**
 * Indicates whether or not current value's length is satisfied the special demand.
 * @param options Validator Options.
 */
export function length(options: ILengthValidatorOptions & IValidatorOptions) {
    const predicate = curryRight(isLengthSatisfied, options);
    const message = 'The {display} length does not match.';
    options = Object.assign({ arguments, message, type: 'length' }, options);
    return validator(predicate, options);
}