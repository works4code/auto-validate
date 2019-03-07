import { IValidatorOptions } from "./validatorOptions";
import { DISPLAY_NAME } from "./constants";
import { format, isArrayLike, ArrayHelper } from "./utils";

export class ValidateError<T = any> implements IValidatorOptions {
    [x: string]: any;
    /**
     * The validator's type, such as 'required','length'.
     */
    type: string;
    /**
     * The error message
     */
    message: string;
    /**
     * The property's name.
     */
    name: keyof T;
    /**
     * The property's display name.
     */
    display: string;
    /**
     * The property's value.
     */
    value: any;
    constructor(target: any, name: keyof T, options: IValidatorOptions) {
        this.type = options.type;
        this.name = name;
        this.value = target[name];
        this.display = Reflect.getMetadata(DISPLAY_NAME, target, name as any) || name;
        if (isArrayLike(options.arguments)) {
            ArrayHelper.from(options.arguments).forEach((val, idx) => this[`$${idx}`] = val);
        }
        this.message = format(options.message, this);
    }
    toString() {
        return this.message;
    }
}