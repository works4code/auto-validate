import { format } from "secure-template";
import { DISPLAY_NAME } from "./constants";
import { isArrayLike, Reflect } from "./utils";
import { IValidatorOptions } from "./validatorOptions";
import { IValidateInfo } from './validateInfo';

export class ValidateError<T = any> implements IValidatorOptions {
    [x: string]: any;
    /**
     * The validator's type, such as 'required','length'.
     */
    public type: string;
    /**
     * The error message
     */
    public message: string;
    /**
     * The property's name.
     */
    public name: keyof T;
    /**
     * The property's display name.
     */
    public display: string;
    /**
     * The property's value.
     */
    public value: any;
    /**
     * The error sequence number.
     */
    public order: number = 0;

    constructor(target: any, order: number, validator: IValidateInfo) {
        this.type = validator.options.type;
        this.name = validator.name as any;
        this.value = target[validator.name];
        this.order = order;
        this.display = Reflect.getMetadata(DISPLAY_NAME, target, validator.name) || validator.name;
        if (isArrayLike(validator.options.arguments)) {
            Array.from(validator.options.arguments).forEach((val, idx) => this[`$${idx}`] = val);
        }
        this.setMessage(validator.options.message);
    }

    /**
     * Set the error message
     * @param template The template of error message
     */
    public setMessage(template: string) {
        if (typeof template !== 'string') return;
        this.message = format(template, this);
    }

    /**
     * Set the error message from template object.
     * @param templates The template object.
     * @param selector The key selector
     */
    public setMessageFromObject(templates: Record<string, string>, selector?: (error: ValidateError) => string) {
        if (Object.prototype.toString.call(templates) !== "[object Object]") return this;
        selector = typeof selector === 'function' ? selector : err => `${err.display}.${err.type}`;
        const key = selector(this);
        this.setMessage(templates[key]);
        return this;
    }

    public toString() {
        return this.message;
    }
}
