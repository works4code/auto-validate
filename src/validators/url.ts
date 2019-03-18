import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";

/**
 * Return a boolean value to indicates whether or not the string is an URL.
 * @param value The value to be check.
 */
export function isURL(value: string) {
    return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)$/.test(value);
}

/**
 * Indicates whether or not current value is an URL.
 * @param options Validator Options
 */
export function url(options?: IValidatorOptions) {
    const message = "The {display} is not a valid url.";
    options = Object.assign({ arguments, message, type: "url" }, options);
    return validator(isURL, options);
}
