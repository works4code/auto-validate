import { REQUIRED_VALIDATE_PROPERYIES, VALIDATORS } from "./constants";
import { ArrayHelper, pushByOrder } from "./utils";
import { ValidateError } from "./validateError";
import { IValidateOptions } from "./validateOptions";
import { ValidateResult } from "./validateResult";

/**
 * Validate instance objects and generate results with errors.
 * @param instance validated object which decorated by validator decorations.
 * @param options validate options
 */
export function validate<T>(instance: T, options?: IValidateOptions): ValidateResult<T> {
    const properties: Set<string> = Reflect.getMetadata(REQUIRED_VALIDATE_PROPERYIES, instance) || [];
    const errors = ArrayHelper.from(properties)
        .map((key) => Reflect.getMetadata(VALIDATORS, instance, key as string) as Map<string, Function>)
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
        }, new Map<keyof T, Array<ValidateError<T>>>());
    return new ValidateResult(instance, errors);
}
