import { validate, isEqual, equals } from '../index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @equals(undefined)
    undefined: string;
    @equals(null)
    null: string = null;
    @equals(NaN)
    nan = NaN;
    @equals(0)
    zero = 0;
    @equals('')
    empty = '';
    @equals({})
    obj = {};
    @equals((m: Demo) => m.empty)
    password = 'password';
    @equals((m: Demo) => m.password)
    repeatePassword = 'password';
    @equals((m: Demo) => m.password)
    otherPassword = 'password1';
}

const demo = new Demo();
const result = validate(demo);

describe('Equal Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('password', 'equals').message).to.eq('The password is not equal to .');
        expect(result.getError('otherPassword', 'equals').message).to.eq('The otherPassword is not equal to password.')
    });
    it('should pass verification when comparing two undefined values', () => {
        expect(isEqual(demo.undefined, undefined)).to.be.true;
        expect(result.hasError('undefined')).to.be.false;
    });
    it('should pass verification when comparing two null values', () => {
        expect(isEqual(demo.null, null)).to.be.true;
        expect(result.hasError('null')).to.be.false;
    });
    it('should pass verification when comparing two NaN values', () => {
        expect(isEqual(demo.nan, NaN)).to.be.true;
        expect(result.hasError('nan')).to.be.false;
    });
    it('should pass verification when comparing two number values', () => {
        expect(isEqual(demo.zero, 0)).to.be.true;
        expect(result.hasError('zero')).to.be.false;
    });
    it('should pass verification when comparing two string values', () => {
        expect(isEqual(demo.empty, '')).to.be.true;
        expect(result.hasError('empty')).to.be.false;
    });
    it('should verify failure when comparing two different object values', () => {
        expect(isEqual(demo.obj, {})).to.be.false;
        expect(isEqual(demo.obj, demo.obj)).to.be.true;
        expect(result.hasError('obj')).to.be.true;
    });
    it('should verify failure when comparing to another different property value', () => {
        expect(isEqual(demo.password, demo.empty)).to.be.false;
        expect(result.hasError('password')).to.be.true;
    });
    it('should pass verification when comparing to a another same value', () => {
        expect(isEqual(demo.repeatePassword, demo.password)).to.be.true;
        expect(result.hasError('repeatePassword')).to.be.false;
    });
})