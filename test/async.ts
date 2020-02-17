import { required, validateAsync } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @required()
    value: string;
}

describe('Async Validation', () => {
    it('should pass verification when return a promise', () => {
        return validateAsync<any>({ value: 1 }, { type: Demo });
    })
    it('should catch validation errors', () => {
        return validateAsync<any>({}, { type: Demo })
            .catch(error => error.errors.size > 0)
            .then(hasError => expect(hasError).to.be.true);
    })
});