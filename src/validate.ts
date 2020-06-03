import { VALIDATORS, PRECONDITION } from "./constants";
import { Reflect } from "./utils";
import { ValidateError } from "./validateError";
import { IValidateOptions } from "./validateOptions";
import { ValidateResult } from "./validateResult";
import { IValidateInfo } from './validateInfo';

function satisfied(target: any, instance: any, info: IValidateInfo, options: IValidateOptions) {
    try {
        if (info.options && typeof info.options.precondition === 'function') {
            return info.options.precondition(options.preconditionParam, instance);
        }
        const precondition = Reflect.getMetadata(PRECONDITION, target, info.name);
        if (typeof precondition === 'function') {
            return precondition(options.preconditionParam, instance);
        }
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
}

/**
 * Validate objects and generate results with errors.
 * @param instance validated object.
 * @param options validate options
 */
export function validate<T>(instance: T, options?: IValidateOptions): ValidateResult<T> {
    let target = instance;
    options = Object.assign({}, options);
    if (options && options.type && typeof options.type === "function") {
        target = options.type.prototype;
    }
    const errors = ((Reflect.getMetadata(VALIDATORS, target) || []) as IValidateInfo[])
        .filter(validator => satisfied(target, instance, validator, options))
        .filter(validator => !validator.predicate(instance[validator.name], instance))
        .sort((x, y) => x.options.order - y.options.order)
        .map((validator, index) => {
            const error = new ValidateError<T>(instance, index, validator);
            error.setMessageFromObject(options.messages, options.selector);
            return error;
        });
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
