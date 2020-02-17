import { REQUIRED_VALIDATE_PROPERYIES, VALIDATORS } from "./constants";
import { ArrayHelper, pushByOrder, Reflect } from "./utils";
import { ValidateError } from "./validateError";
import { IValidateOptions } from "./validateOptions";
import { ValidateResult } from "./validateResult";

/**
 * Validate objects and generate results with errors.
 * @param instance validated object.
 * @param options validate options
 */
export function validate<T>(instance: T, options?: IValidateOptions): ValidateResult<T> {
    let target = instance;
    if (options && options.type && typeof options.type === "function") {
        target = options.type.prototype;
    }
    const properties: Set<string> = Reflect.getMetadata(REQUIRED_VALIDATE_PROPERYIES, target) || [];
    const errors = ArrayHelper.from(properties)
        .map((key) => Reflect.getMetadata(VALIDATORS, target, key as string) as Map<string, Function>)
        .map((value) => value.values())
        .flatten<Function>()
        .reduce((result, validateFn) => {
            const error = validateFn(instance) as ValidateError<T>;
            if (error instanceof ValidateError) {
                if (!result.has(error.name)) {
                    result.set(error.name, [error]);
                } else {
                    pushByOrder(result.get(error.name), error, "order");
                }
            }
            return result;
        }, new Map<any, Array<ValidateError<T>>>());
    return new ValidateResult(instance, errors);
}

/**
 * Validate object and generate results with errors asynchronously.
 * @param instance validated object.
 * @param options validated options.
 */
export function validateAsync<T>(instance: T, options?: IValidateOptions): Promise<T> {
    try {
        const result = validate(instance, options);
        if (result.hasError()) { return Promise.reject(result); }
        return Promise.resolve(result.value);
    } catch (error) {
        return Promise.reject(error);
    }
}
