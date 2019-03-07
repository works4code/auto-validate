import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";
import { curryRight } from '../utils/index';

interface IMatchValidatorOptions {
    /**Indicates the flags to add, or if an object is supplied for the pattern.*/
    flags?: string
}

/**
 * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
 * @param value The string against which to match the regular expression.
 * @param pattern The text of the regular expression.
 * @param options Validator options.
 */
export function isMatch(value: string, pattern: RegExp | string, options?: IMatchValidatorOptions): boolean {
    if (typeof pattern === 'string') {
        return isMatch(value, new RegExp(pattern, options && options.flags));
    } else if (pattern instanceof RegExp) {
        return pattern.test(value);
    } else {
        return false;
    }
}

/**
 * Indicates whether or not a pattern exists in current value.
 * @param pattern The text of the regular expression.
 * @param options 
 */
export function matches(pattern: RegExp | string, options?: IMatchValidatorOptions & IValidatorOptions) {
    const predicate = curryRight(isMatch, pattern, options);
    const message = 'The {display} does not match the requested format.';
    options = Object.assign({ arguments, message, type: 'matches' }, options);
    return validator(predicate as any, options);
}