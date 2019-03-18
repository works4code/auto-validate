import { curryRight, isArrayLike } from "../utils";
import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";

interface IRequiredValidatorOptions {
    /**
     * Whether allow empty string, array or object, default is true.
     */
    allowEmpty?: boolean;
    allowWhitespace?: boolean;
    allowNaN?: boolean;
    allowNull?: boolean;
}

/**
 * Return a boolean value to indicates whether or not value is required.
 * @param value The string value to be indicated.
 * @param options options
 */
export function isRequired(value: any, options?: IRequiredValidatorOptions) {
    options = Object.assign({ allowEmpty: true, allowWhitespace: true }, options);
    if (value === undefined) {
        return false;
    } else if (value === null) {
        return !!options.allowNull;
    } else if (isNaN(value) && value !== value) {
        return !!options.allowNaN;
    } else if (typeof value === "string" && /^\s+$/.test(value)) {
        return !!options.allowWhitespace;
    } else if (isArrayLike(value) && value.length === 0) {
        return !!options.allowEmpty;
    } else if (typeof value === "object" && Object.keys(value).length === 0) {
        return !!options.allowEmpty;
    } else {
        return true;
    }
}

/**
 * Indicates whether or not value is required.
 * @param options Validator options.
 */
export function required(options?: IRequiredValidatorOptions & IValidatorOptions) {
    const message = "The {display} is required.";
    options = Object.assign({ arguments, message, type: "required" }, options);
    const predicate = curryRight(isRequired, options);
    return validator(predicate, options);
}
