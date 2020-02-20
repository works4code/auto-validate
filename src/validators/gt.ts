import { curryRight } from "../utils/index";
import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";

/**
 * Indicates whether or not the value is greater than other value.
 * @param value The value being compared.
 * @param other Other value to compare.
 */
export function isGreaterThan(value: any, other: any): boolean {
    return value > other;
}

/**
 * Indicates whether or not the current value is greater than other value.
 * @param other Other value to compare.
 * @param options Validator options.
 */
export function gt(other: any, options?: IValidatorOptions) {
    options = Object.assign({ arguments, type: "gt" }, options);
    const predicate = curryRight(isGreaterThan, other);
    return validator(predicate, options);
}
