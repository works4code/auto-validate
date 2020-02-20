// Generated by "bundle-dts@1.1.2" https://github.com/fishen/bundle-dts#readme."
declare module "auto-validate/src/utils/curry" {
    export function curryRight(fn: Function, ...args: any[]): (...innerarguments: any[]) => any;
}
declare module "auto-validate/src/utils/isArrayLike" {
    export function isArrayLike(value: any): boolean;
}
declare module "auto-validate/src/utils/isIterator" {
    export function isIterable(obj: any): boolean;
}
declare module "auto-validate/src/utils/array" {
    export class ArrayHelper<T = any> {
        static from<T = any>(iterable: Iterable<T>): ArrayHelper<T>;
        private values;
        constructor(iterable: Iterable<T>);
        flatten<R>(): ArrayHelper<R>;
        filter(predicate: (value: T, index?: number) => boolean): ArrayHelper<T>;
        forEach(func: (value: T, index?: number) => void): void;
        map<R>(func: (value: T, index?: number) => R): ArrayHelper<R>;
        reduce<R>(func: (result: R, value: T, index?: number) => R, seed: R): R;
        valueOf(): T[];
    }
}
declare module "auto-validate/src/utils/isNil" {
    export function isNil(value: any): boolean;
}
declare module "auto-validate/src/utils/pushByOrder" {
    export function pushByOrder<T = any>(collection: T[], value: T, orderBy: keyof T): T[];
}
declare module "auto-validate/src/utils/reflect" {
    import "reflect-metadata";
    const reflect: typeof Reflect;
    export default reflect;
}
declare module "auto-validate/src/utils/index" {
    export { curryRight } from "auto-validate/src/utils/curry";
    export { isArrayLike } from "auto-validate/src/utils/isArrayLike";
    export { ArrayHelper } from "auto-validate/src/utils/array";
    export { isNil } from "auto-validate/src/utils/isNil";
    export { pushByOrder } from "auto-validate/src/utils/pushByOrder";
    import Reflect from "auto-validate/src/utils/reflect";
    export { Reflect };
}
declare module "auto-validate/src/validatorOptions" {
    export interface IValidatorOptions extends Record<string, any> {
        /**
         * The Error message returned when validation fails which can use placeholder to get other info by '{keyName}'.
         */
        message?: string;
        /**
         * The validator's type, the same type of validator only takes effect one.
         * When using multiple custom validators, please define multiple different types.
         */
        type?: string;
    }
}
declare module "auto-validate/src/constants" {
    export const VALIDATORS: unique symbol;
    export const DISPLAY_NAME: unique symbol;
    export const REQUIRED_VALIDATE_PROPERYIES: unique symbol;
    export const DEFAULT_ERROR_MEESSAGES: {
        contains: string;
        email: string;
        equals: string;
        gt: string;
        gte: string;
        ip: string;
        length: string;
        lt: string;
        lte: string;
        matches: string;
        numeric: string;
        range: string;
        required: string;
        type: string;
        url: string;
    };
}
declare module "auto-validate/src/validateError" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
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
        /**
         * The error sequence number. the default is the order in which the decorators are added.
         */
        order: number;
        constructor(target: any, name: keyof T, options: IValidatorOptions);
        toString(): string;
    }
}
declare module "auto-validate/src/validatePredicate" {
    export type IValidatePredicate = (
    /**
     * Current property's value.
     */
    value: any, 
    /**
     * Current object.
     */
    target?: any) => boolean;
}
declare module "auto-validate/src/validators/validator" {
    import { IValidatePredicate } from "auto-validate/src/validatePredicate";
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * The default validator which can validate by pass a predicate function.
     * @param predicate The predicate function to validate current value.
     * @param options validator options.
     */
    export function validator(predicate: IValidatePredicate, options: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/gt" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Indicates whether or not the value is greater than other value.
     * @param value The value being compared.
     * @param other Other value to compare.
     */
    export function isGreaterThan(value: any, other: any): boolean;
    /**
     * Indicates whether or not the current value is greater than other value.
     * @param other Other value to compare.
     * @param options Validator options.
     */
    export function gt(other: any, options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/equals" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Compare between two values to determine if they are equivalent.
     * @param value The value being compared.
     * @param other Other value to compare.
     */
    export function isEqual(value: any, other: any): boolean;
    /**
     * Compare between two values to determine if they are equivalent.
     * @param other The other value to compare.
     * @param options Validator options.
     */
    export function equals(other: any | ((target: any) => any), options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/gte" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Indicates whether or not the value is greater than other value.
     * @param value The value being compared.
     * @param other Other value to compare.
     */
    export function isGreaterThanOrEqualTo(value: any, other: any): boolean;
    /**
     * Indicates whether or not the value is greater than or equal to other value.
     * @param other Other value to compare.
     * @param options Validator options.
     */
    export function gte(other: any, options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/contains" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Checks if value is in collection. If collection is a string, it's checked for a substring of value.
     * @param collection The collection to inspect.
     * @param value The value to search for.
     * @param position The index at which to begin searching the collection.
     * If omitted, search starts at the beginning of the collection.
     */
    export function isContain<T = any>(collection: string | ArrayLike<T> | object, value: T, position?: number): boolean;
    /**
     * Checks if current property value is a collection include the special value or is object include the special key.
     * @param value The value to search for.
     * @param position The index at which to begin searching the collection.
     * If omitted, search starts at the beginning of the collection.
     * @param options Validator options.
     */
    export function contains(value: any, position?: number, options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/email" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Indicates whether or not the value is a is a valid email address.
     * @param value The value being checked.
     */
    export function isEmail(value: string): boolean;
    /**
     * Indicates whether or not the current value is a valid email address.
     * @param options Validator options
     */
    export function email(options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/ip" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    type IPVersion = 4 | 6;
    interface IIPValidatorOptions {
        version?: IPVersion;
    }
    /**
     * Returns a Boolean indicates whether or not the value is an IP (version 4 or 6).
     * @param value The value to be checked.
     * @param version IP version, default is 4.
     */
    export function isIP(value: string, options?: IIPValidatorOptions): boolean;
    /**
     * Indicates whether or not the current property value is an IP (version 4 or 6).
     * @param version IP version.
     * @param options Validator options.
     */
    export function ip(options?: IIPValidatorOptions & IValidatorOptions): (target: any, name: string) => void;
    export {};
}
declare module "auto-validate/src/validators/range" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Return a boolean value to indicates whether or not value is between start and end.
     * @param value The value to be checked.
     * @param start Start value.
     * @param end End value.
     */
    export function isInRange<T = any>(value: T, start: T, end: T): boolean;
    /**
     * Indicates whether or not current value is between start and end.
     * @param start Start value.
     * @param end End value.
     * @param options Validator options.
     */
    export function range(start: any, end: any, options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/length" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    interface ILengthValidatorOptions {
        /**
         * The length of collection or string to be specified.
         * If the value is specified, it will compare whether the length of the value is equal to the specified digits.
         */
        length?: number;
        /**
         * The max length of collection or string to be specified.
         * If the length is already specified, it will be ignored.
         */
        maxLength?: number;
        /**
         * The min length of collection or string to be specified, default is 0.
         * If the length is already specified, it will be ignored.
         */
        minLength?: number;
    }
    /**
     * Returns a Boolean value that indicates whether or not the value's length is satisfied the special demand.
     * @param options Validator Options.
     */
    export function isLengthSatisfied(value: any, options: ILengthValidatorOptions): boolean;
    /**
     * Indicates whether or not current value's length is satisfied the special demand.
     * @param options Validator Options.
     */
    export function length(options: ILengthValidatorOptions & IValidatorOptions): (target: any, name: string) => void;
    export {};
}
declare module "auto-validate/src/validators/matches" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    interface IMatchValidatorOptions {
        /**
         * Indicates the flags to add, or if an object is supplied for the pattern.
         */
        flags?: string;
    }
    /**
     * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
     * @param value The string against which to match the regular expression.
     * @param pattern The text of the regular expression.
     * @param options Validator options.
     */
    export function isMatch(value: string, pattern: RegExp | string, options?: IMatchValidatorOptions): boolean;
    /**
     * Indicates whether or not a pattern exists in current value.
     * @param pattern The text of the regular expression.
     * @param options
     */
    export function matches(pattern: RegExp | string, options?: IMatchValidatorOptions & IValidatorOptions): (target: any, name: string) => void;
    export {};
}
declare module "auto-validate/src/validators/lt" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     *  Returns a Boolean value that indicates whether or not the value is less than other or equal to value.
     * @param value The value being compared.
     * @param other Other value to compare.
     */
    export function isLessThan(value: any, other: any): boolean;
    /**
     * Indicates whether or not the value is less than or equal to other value.
     * @param other Other value to compare.
     * @param options Validator options.
     */
    export function lt(other: any, options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/lte" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Returns a Boolean value that indicates whether or not the value is less than other or equal to value.
     * @param value The value being compared.
     * @param other Other value to compare.
     */
    export function isLessThanOrEqualTo(value: any, other: any): boolean;
    /**
     * Indicates whether or not the value is less than or equal to other value.
     * @param other Other value to compare.
     * @param options Validator options.
     */
    export function lte(other: any, options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/negate" {
    import { IValidatePredicate } from "auto-validate/src/validatePredicate";
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Reverse the validator and take the opposite result.
     * @param predicate The predicate function for validator.
     * @param options Validator options.
     */
    export function negate(predicate: IValidatePredicate, options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/required" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    interface IRequiredValidatorOptions {
        /**
         * Whether allow empty string, array or object, default is true.
         */
        allowEmpty?: boolean;
        allowWhitespace?: boolean;
        allowNaN?: boolean;
        allowNull?: boolean;
    }
    /**
     * Return a boolean value to indicates whether or not value is required.
     * @param value The string value to be indicated.
     * @param options options
     */
    export function isRequired(value: any, options?: IRequiredValidatorOptions): boolean;
    /**
     * Indicates whether or not value is required.
     * @param options Validator options.
     */
    export function required(options?: IRequiredValidatorOptions & IValidatorOptions): (target: any, name: string) => void;
    export {};
}
declare module "auto-validate/src/validators/url" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Return a boolean value to indicates whether or not the string is an URL.
     * @param value The value to be check.
     */
    export function isURL(value: string): boolean;
    /**
     * Indicates whether or not current value is an URL.
     * @param options Validator Options
     */
    export function url(options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/numeric" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Indicates whether or not value is valid number or string contains only numbers.
     * If the value is object type, check value by result of valueOf.
     * @param value the value to be check.
     */
    export function isNumeric(value: any): boolean;
    /**
     * Indicates whether or not value is valid number or string contains only numbers.
     * If the value is object type, check value by result of valueOf.
     * @param options Validator Options
     */
    export function numeric(options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/type" {
    import { IValidatorOptions } from "auto-validate/src/validatorOptions";
    /**
     * Indicates whether or not value is the special type.
     * @param value the value to be check.
     * @param typeName type string.
     */
    export function isType(value: any, typeName: string): boolean;
    /**
     * Indicates whether or not the current value is the special type.
     * @param options Validator Options
     */
    export function type(typeName: string, options?: IValidatorOptions): (target: any, name: string) => void;
}
declare module "auto-validate/src/validators/index" {
    export * from "auto-validate/src/validators/gt";
    export * from "auto-validate/src/validators/gte";
    export * from "auto-validate/src/validators/contains";
    export * from "auto-validate/src/validators/email";
    export * from "auto-validate/src/validators/equals";
    export * from "auto-validate/src/validators/ip";
    export * from "auto-validate/src/validators/length";
    export * from "auto-validate/src/validators/matches";
    export * from "auto-validate/src/validators/lt";
    export * from "auto-validate/src/validators/lte";
    export * from "auto-validate/src/validators/matches";
    export * from "auto-validate/src/validators/negate";
    export * from "auto-validate/src/validators/range";
    export * from "auto-validate/src/validators/required";
    export * from "auto-validate/src/validators/url";
    export * from "auto-validate/src/validators/validator";
    export * from "auto-validate/src/validators/numeric";
    export * from "auto-validate/src/validators/type";
}
declare module "auto-validate/src/validateOptions" {
    export interface IValidateOptions {
        /**
         * the type of instance
         */
        type?: Function;
    }
}
declare module "auto-validate/src/validateResult" {
    import { ValidateError } from "auto-validate/src/validateError";
    export class ValidateResult<T> {
        /**
         * All grouped errors generated by current validation
         */
        errors: Map<keyof T, ValidateError[]>;
        /**
         * The validated instance object.
         */
        value: T;
        /**
         * The first's error message
         */
        message: string;
        constructor(value: T, errors: Map<keyof T, ValidateError[]>);
        /**
         * Get all errors by special property name.
         * @param property property name
         */
        getErrors(property: keyof T): ValidateError[];
        /**
         * Get error by property name and error type.
         * @param property property name
         * @param errorType error type
         */
        getError(property: keyof T, errorType: string): ValidateError | null;
        /**
         * Determine if there is a specified type of error on a specified property.
         * If the error type is omitted, it is judged whether there is any type of error on the specified property.
         * If the property name is also omitted, it is judged whether or not it contains any error.
         * @param property property name
         * @param errorType error type
         */
        hasError(property?: keyof T, errorType?: string): boolean;
        /**
         * Convert errors to the specified type based on a custom function.
         * @param callback custom convert function.
         */
        map(callback: (errors: Map<keyof T, ValidateError[]>) => any): any;
        /**
         * Convert the current grouping errors into a list form.
         */
        toList(): ValidateError[];
        /**
         * Convert the current grouping errors into a single error object.
         */
        toSingle(): ValidateError | null;
    }
}
declare module "auto-validate/src/validate" {
    import { IValidateOptions } from "auto-validate/src/validateOptions";
    import { ValidateResult } from "auto-validate/src/validateResult";
    /**
     * Validate objects and generate results with errors.
     * @param instance validated object.
     * @param options validate options
     */
    export function validate<T>(instance: T, options?: IValidateOptions): ValidateResult<T>;
    /**
     * Validate object and generate results with errors asynchronously.
     * @param instance validated object.
     * @param options validated options.
     */
    export function validateAsync<T>(instance: T, options?: IValidateOptions): Promise<T>;
}
declare module "auto-validate/src/display" {
    /**
     * Set the alias for the property, default is current property name.
     * @param name The display alias
     */
    export function display(name: string): (target: any, originName: string) => void;
}
declare module "auto-validate" {
    export * from "auto-validate/src/validators/index";
    export { validate, validateAsync } from "auto-validate/src/validate";
    export { display } from "auto-validate/src/display";
    export { ValidateResult } from "auto-validate/src/validateResult";
    export { IValidatorOptions } from "auto-validate/src/validatorOptions";
}