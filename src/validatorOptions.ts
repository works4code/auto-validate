
export interface IValidatorOptions extends Record<string, any> {
    /**
     * The Error message returned when validation fails which can use placeholder to get other info by '{keyName}'.
     */
    message?: string
    /**
     * The validator's type, the same type of validator only takes effect one.
     * When using multiple custom validators, please define multiple different types.
     */
    type?: string
}