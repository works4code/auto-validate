import { VALIDATORS, REQUIRED_VALIDATE_PROPERYIES } from './constants';
import { ValidateResult } from './validateResult';
import { ValidateError } from './validateError';
import { ArrayHelper } from './utils';
import { IValidateOptions } from './validateOptions';

/**
 * Validate instance objects and generate results with errors.
 * @param instance validated object which decorated by validator decorations.
 * @param options validate options
 */
export function validate<T>(instance: T, options?: IValidateOptions): ValidateResult<T> {
    const properties: Set<string> = Reflect.getMetadata(REQUIRED_VALIDATE_PROPERYIES, instance) || [];
    const errors = ArrayHelper.from(properties)
        .map(key => Reflect.getMetadata(VALIDATORS, instance, key as string) as Map<string, Function>)
        .map((value) => value.values())
        .flatten<Function>()
        .reduce((result, validate) => {
            const error = validate(instance) as ValidateError<T>;
            if (error instanceof ValidateError) {
                if (!result.has(error.name)) {
                    result.set(error.name, [error]);
                } else {
                    result.get(error.name).push(error);
                }
            }
            return result;
        }, new Map<keyof T, ValidateError<T>[]>())
    return new ValidateResult(instance, errors);
}