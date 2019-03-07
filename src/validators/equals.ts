import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";

/**
 * Compare between two values to determine if they are equivalent.
 * @param value The value being compared.
 * @param other Other value to compare.
 */
export function isEqual(value: any, other: any) {
    if (value === other) {
        return true;
    } else if (isNaN(value) && value !== value) {
        return isNaN(other) && other !== other;
    } else {
        return false;
    }
}

/**
 * Compare between two values to determine if they are equivalent.
 * @param other The other value to compare. 
 * @param options Validator options.
 */
export function equals(other: any | ((target: any) => any), options?: IValidatorOptions) {
    const message = 'The {display} is not equal to {$0}.';
    options = Object.assign({ arguments, message, type: 'equals' }, options);
    const predicate = function (value: any, target: any) {
        other = typeof other === 'function' ? other(target) : other;
        options.arguments[0] = other;
        return isEqual(value, other);
    }
    return validator(predicate, options);
}
