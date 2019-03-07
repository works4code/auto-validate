import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";
import { curryRight } from "../utils";

/**
 * Indicates whether or not value is the special type.
 * @param value the value to be check.
 * @param type type string.
 */
export function isType(value: any, type: string) {
    return typeof value === type;
}

/**
 * Indicates whether or not the current value is the special type.
 * @param options Validator Options
 */
export function type(type: string, options?: IValidatorOptions) {
    const message = 'The {display} must be a {$0} type.';
    options = Object.assign({ arguments, message, type: 'type' }, options);
    const predicate = curryRight(isType, type);
    return validator(predicate, options);
}