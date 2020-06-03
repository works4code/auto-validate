export interface IValidateOptions {
    /**
     * the type of instance
     */
    type?: Function;
    /**
     * error meesage object, the key is `${display}.${type}`.
     * @example { "name.required" : "The name field is required." }
     */
    messages?: Record<string, string>;
    /**
     * the key selector of error meesage object.
     * @default error=>`${error.display}.${error.type}`;
     */
    selector?: (error) => string;
    /**
     * the param for precondition function
     */
    preconditionParam?: object;
}
