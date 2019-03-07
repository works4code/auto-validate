import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";
import { IValidatePredicate } from "../validatePredicate";

/**
 * Reverse the validator and take the opposite result.
 * @param predicate The predicate function for validator.
 * @param options Validator options.
 */
export function negate(predicate: IValidatePredicate, options?: IValidatorOptions) {
    return validator(value => !predicate(value), options);
}