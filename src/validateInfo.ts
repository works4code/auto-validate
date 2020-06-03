import { IValidatePredicate } from './validatePredicate';
import { IValidatorOptions } from './validatorOptions';

export interface IValidateInfo {
    predicate: IValidatePredicate,
    options: IValidatorOptions,
    name: string,
}