import { DEFAULT_ERROR_MEESSAGES, REQUIRED_VALIDATE_PROPERYIES, VALIDATORS } from "../constants";
import { Reflect } from "../utils/index";
import { ValidateError } from "../validateError";
import { IValidatePredicate } from "../validatePredicate";
import { IValidatorOptions } from "../validatorOptions";

/**
 * The default validator which can validate by pass a predicate function.
 * @param predicate The predicate function to validate current value.
 * @param options validator options.
 */
export function validator(predicate: IValidatePredicate, options: IValidatorOptions) {
    return function(target: any, name: string) {
        const validators: Map<string, Function> = Reflect.getMetadata(VALIDATORS, target, name) || new Map();
        const properties: Set<string> = Reflect.getMetadata(REQUIRED_VALIDATE_PROPERYIES, target) || new Set();
        const message = (DEFAULT_ERROR_MEESSAGES as any)[options && options.type] || "Verification failed.";
        options = Object.assign({ message, type: "default", order: validators.size }, options);
        const fn = function(obj: any) {
            const valid = predicate(obj[name], obj);
            return valid ? undefined : new ValidateError(obj, name, options);
        };
        properties.add(name);
        if (validators.has(options.type)) {
            console.warn(`Duplicate added ${options.type} validator for ${name}`);
            console.warn("Only one validator of the same type can exist on property, please set validator's type to use multiple custom validators.");
        }
        validators.set(options.type, fn);
        Reflect.defineMetadata(REQUIRED_VALIDATE_PROPERYIES, properties, target);
        Reflect.defineMetadata(VALIDATORS, validators, target, name);
    };
}
