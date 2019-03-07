import { IValidatorOptions } from "../validatorOptions";
import { validator } from './validator';
import { curryRight } from '../utils/index';
import { isEqual } from './equals';
import { isGreaterThan } from './gt';

/**
 * Indicates whether or not the value is greater than other value.
 * @param value The value being compared.
 * @param other Other value to compare.
 */
export function isGreaterThanOrEqualTo(value: any, other: any): boolean {
    return isGreaterThan(value, other) || isEqual(value, other);
}

/**
 * Indicates whether or not the value is greater than or equal to other value.
 * @param other Other value to compare.
 * @param options Validator options.
 */
export function gte(other: any, options?: IValidatorOptions) {
    const message = 'The {display} must be greater than or equal to {$0}, current is {value}.';
    options = Object.assign({ arguments, message, type: 'gte' }, options);
    const predicate = curryRight(isGreaterThanOrEqualTo, other);
    return validator(predicate, options);
}