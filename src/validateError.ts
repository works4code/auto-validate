import { format } from "secure-template";
import { DISPLAY_NAME } from "./constants";
import { ArrayHelper, isArrayLike, Reflect } from "./utils";
import { IValidatorOptions } from "./validatorOptions";

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
     * The error sequence number. the default is the order in which the decorators are added.
     */
    public order: number = 0;

    constructor(target: any, name: keyof T, options: IValidatorOptions) {
        this.type = options.type;
        this.name = name;
        this.value = target[name];
        this.order = options.order;
        this.display = Reflect.getMetadata(DISPLAY_NAME, target, name as any) || name;
        if (isArrayLike(options.arguments)) {
            ArrayHelper.from(options.arguments).forEach((val, idx) => this[`$${idx}`] = val);
        }
        this.setMessage(options.message);
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
        selector = typeof selector === 'function' ? selector : err => `${err.display}.${err.type}`;
        const key = selector(this);
        this.setMessage(templates[key]);
    }

    public toString() {
        return this.message;
    }
}
