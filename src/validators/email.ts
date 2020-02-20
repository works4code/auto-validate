import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";

/**
 * Indicates whether or not the value is a is a valid email address.
 * @param value The value being checked.
 */
export function isEmail(value: string) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

/**
 * Indicates whether or not the current value is a valid email address.
 * @param options Validator options
 */
export function email(options?: IValidatorOptions) {
    options = Object.assign({ arguments, type: "email" }, options);
    return validator(isEmail, options);
}
