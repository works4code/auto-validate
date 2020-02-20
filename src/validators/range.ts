import { curryRight } from "../utils/index";
import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";

/**
 * Return a boolean value to indicates whether or not value is between start and end.
 * @param value The value to be checked.
 * @param start Start value.
 * @param end End value.
 */
export function isInRange<T = any>(value: T, start: T, end: T) {
    return start <= value && value <= end;
}

/**
 * Indicates whether or not current value is between start and end.
 * @param start Start value.
 * @param end End value.
 * @param options Validator options.
 */
export function range(start: any, end: any, options?: IValidatorOptions) {
    options = Object.assign({ arguments, type: "range" }, options);
    const predicate = curryRight(isInRange, start, end);
    return validator(predicate, options);
}
