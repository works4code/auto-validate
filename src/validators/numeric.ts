import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";

/**
 * Indicates whether or not value is valid number or string contains only numbers.
 * If the value is object type, check value by result of valueOf.
 * @param value the value to be check.
 */
export function isNumeric(value: any): boolean {
    const type = typeof value;
    if (type === 'number') {
        return !isNaN(value);
    } else if (type === 'string') {
        return isNumeric(Number(value));
    } else if (type === 'object') {
        return isNumeric(value.valueOf());
    } else {
        return false;
    }
}

/**
 * Indicates whether or not value is valid number or string contains only numbers.
 * If the value is object type, check value by result of valueOf.
 * @param options Validator Options
 */
export function numeric(options?: IValidatorOptions) {
    const message = 'The {display} is not a numeric type.';
    options = Object.assign({ arguments, message, type: 'numeric' }, options);
    return validator(isNumeric, options);
}