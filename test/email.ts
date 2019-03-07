import { validate, email, isEmail } from '../index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @email()
    undefined: string;
    @email()
    null: string = null;
    @email()
    zero = 0;
    @email()
    empty = '';
    @email()
    obj = {};
    @email()
    invalidValue = 'some string';
    @email()
    value = 'i.yu@qq.com'
}

const demo = new Demo();
const result = validate(demo);

describe('Email Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.hasError('undefined')).to.be.true;
        expect(result.getError('undefined', 'email').message).to.eq('The undefined is not the correct email address format.')
    });
    it('should verify failure when testing a undefined value', () => {
        expect(isEmail(undefined)).to.be.false;
        expect(result.hasError('undefined')).to.be.true;
    });
    it('should verify failure when testing a null value', () => {
        expect(isEmail(null)).to.be.false;
        expect(result.hasError('null')).to.be.true;
    });
    it('should verify failure when testing a number', () => {
        expect(isEmail(0 as any)).to.be.false;
        expect(result.hasError('zero')).to.be.true;
    });
    it('should verify failure when testing a empty string', () => {
        expect(isEmail('')).to.be.false;
        expect(result.hasError('empty')).to.be.true;
    });
    it('should verify failure when testing a object value', () => {
        expect(isEmail({} as any)).to.be.false;
        expect(result.hasError('obj')).to.be.true;
    });
    it('should verify failure when testing a incorrect string', () => {
        expect(isEmail('some string')).to.be.false;
        expect(result.hasError('invalidValue')).to.be.true;
    });
    it('should pass verification when testing a correct email address', () => {
        expect(isEmail(demo.value)).to.be.true;
        expect(result.hasError('value')).to.be.false;
    });
})