import { curryRight } from "../utils";
import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";

/**
 * Indicates whether or not value is the special type.
 * @param value the value to be check.
 * @param typeName type string.
 */
export function isType(value: any, typeName: string) {
    return typeof value === typeName;
}

/**
 * Indicates whether or not the current value is the special type.
 * @param options Validator Options
 */
export function type(typeName: string, options?: IValidatorOptions) {
    const message = "The {display} must be a {$0} type.";
    options = Object.assign({ arguments, message, type: "type" }, options);
    const predicate = curryRight(isType, typeName);
    return validator(predicate, options);
}
