import { validate, negate, isNumeric, isEmail } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @negate(isNumeric)
    num = 123;
    @negate(isEmail, { message: 'The str is required not a email.', type: 'noEmail' })
    str = 'i.yu@qq.com';
}

const demo = new Demo();
const result = validate(demo);

describe('Negate Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('str', 'noEmail').message).to.eq('The str is required not a email.');
    });
    it('should verify failure when testing number', () => {
        expect(isNumeric(demo.num)).to.be.true;
        expect(result.hasError('num')).to.be.true;
    });
    it('should verify failure when testing email', () => {
        expect(isEmail(demo.str)).to.be.true;
        expect(result.hasError('str')).to.be.true;
    });
});