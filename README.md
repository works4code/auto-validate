# auto-mapping
Validate object by decorator in typescript.
# Installation

>`$ npm install --save auto-validate`

# Getting started
To enable experimental support for decorators, you must enable the experimentalDecorators compiler option either on the command line or in your tsconfig.json:
```
import { validate, required, email } from 'auto-validate';

export class User {
    @required()
    gender: boolean;
    @email()
    email: string;
}

const user = new User();
user.email = 'i.yu@qq.com';
const result = validate(user); 
console.log(result.errors);
```
output:
```
Map {
  'gender' => [ ValidateError {
      type: 'required',
      name: 'gender',
      value: undefined,
      display: 'gender',
      message: 'The gender is required.' } 
    ]
}
```
# ValidateResult\<T>
It will returns a ValidateResult object when calling the validate function.
The ValidateResult object contains origin instance value and validation errors and some helper methods.
* value(T): the validated instance object.
    ```
    const result=validate(someObj);
    result.value===someObj; // true
    ```
* errors(Map<keyof T, any[]>): grouped errors.
    ```
    {
        property: [
            { type: errorType, message: errorMessage, ... },
            ...
        ],
        ...
    }
    ```
* getErrors(property: keyof T): get all errors by special property name.
* getError(property: keyof T, errorType: string): get error by property name and error type.
* hasError(property?: keyof T, errorType?: string): Determine if there is a specified type of error on a specified property. If the error type is omitted, it is judged whether there is any type of error on the specified property. If the property name is also omitted, it is judged whether or not it contains any error.
    ```
    const result=validate(someObj);
    // has any error on someObj?
    result.hasError();
    // has any error on property name?
    result.hasError('name');
    // has required error on property name?
    result.hasError('name', 'required');
    ```
* map(callback: (errors: Map<keyof T, ValidateError[]>) => any): convert errors to the specified type based on a custom function.
* toList(): convert the grouping errors into a list form.
* toSingle(): convert the grouping errors into a single error object.
# Set display name
Sometimes you may need to set the display name for some property in the error message which can use the decorator **@display('alias')**.
> The default display name is the current property name(key).
```
import { validate, required, display } from 'auto-validate';

export class User {
    @display('username')
    @required()
    name: string;
}

const result = validate(new User()); 
console.log(result.errors);
```
output:
```
Map {
  'name' => [ ValidateError {
      type: 'required',
      name: 'name',
      value: undefined,
      display: 'username',
      message: 'The username is required.' 
    } ] 
}
```

# Built-in validators
## @contains(value: any, position = 0, options?: IValidatorOptions)
Checks if current property value is a collection include the special value or is object include the special key. If collection is a string, it's checked for a substring of value.
* value: the value to search for.
* position: the index at which to begin searching the collection. If omitted, search starts at the beginning of the collection.
* options: validator options.
   * message: error message, default is 'The {display} is not contains {$0}.'.
   * type: error type, default is 'contains'.
## @email(options?: IValidatorOptions)
Indicates whether or not the current value is a valid email address.
* options: validator options.
    * message: error message, default is 'The {display} is not the correct email address format.';.
    * type: error type, default is 'email'.
## @equals(other: any | ((target: any) => any), options?: IValidatorOptions)
Compare current value and other value to determine if they are equivalent.
* other: The value being compared.
* options: validator options.
    * message: error message, default is 'The {display} is not equal to {$0}.'.
    * type: error type, default is 'equals'.
## @gt(value: any, options?: IValidatorOptions)
Indicates whether or not current value is greater than other value.
* value: The value being compared.
* options: validator options.
    * message: error message, default is 'The {display} must be greater than {$0}, current is {value}.'.
    * type: error type, default is 'gt'.
## @gte(value: any, options?: IValidatorOptions)
Indicates whether or not current value is greater than other value.
* value: The value being compared.
* options: validator options.
    * message: error message, default is 'The {display} must be greater than or equal to {$0}, current is {value}.'.
    * type: error type, default is 'gte'.
## @ip(options?: IIPValidatorOptions)
Indicates whether or not the current property value is an IP (version 4 or 6).
* options: validator options.
    * message: error message, default is 'The {display} does not match the requested format.'.
    * type: error type, default is 'ip'.
    * version: ip version 4 or 6, default is 4.
## @length(options?: ILengthValidatorOptions)
Indicates whether or not current value's length is satisfied the special demand.
* options: validator options.
    * message: error message, default is 'The {display} length does not match.'.
    * type: error type, default is 'length'.
    * length: the length of collection or string to be specified.
    * maxLength: the max length of collection or string to be specified, if the length is already specified, it will be ignored.
    * minLength: the min length of collection or string to be specified, default is 0, if the length is already specified, it will be ignored.
## @lt(value: any, options?: IValidatorOptions)
Indicates whether or not the value is less than or equal to other value.
* value: the value being compared.
* options: validator options.
    * message: error message, default is 'The {display} must be less than {$0}, current is {value}.'.
    * type: error type, default is 'lt'.
## @lte(value: any, options?: IValidatorOptions)
Indicates whether or not the value is less than or equal to other value.
* value: the value being compared.
* options: validator options.
    * message: error message, default is 'The {display} must be less than or equal to {$0}, current is {value}.'.
    * type: error type, default is 'lte'.
## @matches(pattern: RegExp | string, options?: IMatchValidatorOptions)
Indicates whether or not a pattern exists in current value.
* pattern: the text of the regular expression.
* options: validator options.
    * message: error message, default is 'The {display} does not match the requested format.'.
    * type: error type, default is 'matches'.
    * flags: the flags for the pattern.
## @negate(predicate: IValidatePredicate, options?: IValidatorOptions)
Reverse the validator and take the opposite result.
* predicate: the predicate function for validator.
* options: validator options.
    * message: error message.
    * type: error type.
## @numeric(options?: IValidatorOptions)
Indicates whether or not value is valid number or string contains only numbers.
* options: validator options.
   * message: error message, default is 'The {display} is not a numeric type.'.
   * type: error type, default is 'numeric'.
## @range(start: any, end: any, options?: IValidatorOptions)
Indicates whether or not current value is between start and end.
* start: start value.
* end: end value.
* options: validator options.
   * message: error message, default is 'The {display} must be between {$0} and {$1}.'.
   * type: error type, default is 'numeric'.
## @required(value: any, options?: IRequiredValidatorOptions)
Indicates whether or not value is required.
* options: validator options.
   * message: error string, default is 'The {display} is required.'.
   * type: error type ,default is 'required'.
   * allowEmpty: whether allow empty string, array or object, default is true.;
   * allowWhitespace: whether allow whitespace string;
   * allowNaN: whether allow value is NaN, default is false;
   * allowNull: whether allow value is null, default is false;
## @type(type: string, options?: IValidatorOptions)
Indicates whether or not the current value is the special type.
* type: value type, can be 'string','number','boolean','object','function'.
* options: validator options.
   * message: error message, default is 'The {display} must be a {$0} type.'.
   * type: error type, default is 'type'.
## @url(options?: IValidatorOptions)
Indicates whether or not current value is an URL.
* options :validator options.
    * message: error message, default is 'The {display} is not a valid url.'.
    * type: error type, default is 'url'.
# Custom Validator
You can customize the validator when the built-in validator does not meet your needs. Custom validators are very easy to implement that only require a validation function to decorator **validtor**.
>The function signature of the validator's predicate function is 
**(value:any, instance:object): boolean** the value is current property value and the instance is current validated instance object.
 
```
import { validate, validator } from 'auto-validate';

export class User {
    @validator((value: any) => value && value.length < 6, { message: 'The name is required and length must less than 10 digits.' })
    name: string;
}

const user = new User();
user.name = 'fishery';
const result = validate(user);
console.log(result.errors);
```
output:
```
Map {
  'name' => [ ValidateError {
      type: 'default',
      name: 'name',
      value: 'fishery',
      display: 'name',
      message: 'The name is required and length must less than 10 digits.'
    } ] 
}
```
If you want to use the same validator in other places, we can do like this.
```
import { validate, validator, IValidatorOptions } from 'auto-validate';

export function myValidator(length: number, options?: IValidatorOptions) {
    const message = 'The {name} is required and length must less than {$0} digits.';
    options = Object.assign({ arguments, message, type: 'myType' }, options)
    const predicate = (value: string) => value && value.length < length;
    return validator(predicate, options);
}

export class User {
    @myValidator(6)
    name: string;
}

const user = new User();
user.name = 'fishery';
const result = validate(user);
console.log(result.errors);
```
output:
```
Map {
  'name' => [ ValidateError {
      type: 'myType',
      name: 'name',
      value: 'fishery',
      display: 'name',
      '$0': 6,
      message: 'The name is required and length must less than 6 digits.' 
      } ]
}
```