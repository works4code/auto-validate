import { DEFAULT_ERROR_MEESSAGES, VALIDATORS } from "../constants";
import { Reflect } from "../utils/index";
import { IValidatePredicate } from "../validatePredicate";
import { IValidatorOptions } from "../validatorOptions";
import { IValidateInfo } from '../validateInfo';

/**
 * The default validator which can validate by pass a predicate function.
 * @param predicate The predicate function to validate current value.
 * @param options validator options.
 */
export function validator(predicate: IValidatePredicate, options: IValidatorOptions) {
    return function (target: any, name: string) {
        const validators: IValidateInfo[] = Reflect.getMetadata(VALIDATORS, target) || [];
        const message = (DEFAULT_ERROR_MEESSAGES as any)[options && options.type] || "Verification failed.";
        options = Object.assign({ message, type: "default", order: Number.MAX_VALUE }, options);
        validators.push({ predicate, options, name });
        Reflect.defineMetadata(VALIDATORS, validators, target);
    };
}
