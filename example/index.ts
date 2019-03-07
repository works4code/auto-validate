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

// import { validate, required, display } from '../index';

// export class User {
//     @display('username')
//     @required()
//     name: string;
// }

// const result = validate(new User()); 
// console.log(result.errors);

// import { validate, validator } from '../index';

// export class User {
//     @validator((value: any) => value && value.length < 6, { message: 'The name is required and length must less than 10 digits.' })
//     name: string;
// }

// const user = new User();
// user.name = 'fishery';
// const result = validate(user);
// console.log(result.errors);

// import { validate, validator, IValidatorOptions } from '../index';

// export function myValidator(length: number, options?: IValidatorOptions) {
//     const message = 'The {name} is required and length must less than {$0} digits.';
//     options = Object.assign({ arguments, message, type: 'myType' }, options)
//     const predicate = (value: string) => value && value.length < length;
//     return validator(predicate, options);
// }

// export class User {
//     @myValidator(6)
//     name: string;
// }

// const user = new User();
// user.name = 'fishery';
// const result = validate(user);
// console.log(result.errors);