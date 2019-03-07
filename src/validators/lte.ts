import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";
import { curryRight } from '../utils/index';

/**
 * Returns a Boolean value that indicates whether or not the value is less than other or equal to value.
 * @param value The value being compared.
 * @param other Other value to compare.
 */
export function isLessThanOrEqualTo(value: any, other: any) {
    return value <= other;
}

/**
 * Indicates whether or not the value is less than or equal to other value.
 * @param other Other value to compare.
 * @param options Validator options.
 */
export function lte(other: any, options?: IValidatorOptions) {
    const message = 'The {display} must be less than or equal to {$0}, current is {value}.';
    options = Object.assign({ arguments, message, type: 'lte' }, options);
    const predicate = curryRight(isLessThanOrEqualTo, other);
    return validator(predicate, options);
}