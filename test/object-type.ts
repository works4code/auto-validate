import { validate, required } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @required()
    value: string;
}

const result = validate<any>({}, { type: Demo });

describe('Specified Instance\'s Type Test', () => {
    it('should pass verification when the type specified ', () => {
        expect(result.hasError('value')).to.be.true;
    })
});