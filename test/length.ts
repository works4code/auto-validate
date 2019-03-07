import { validate, isLengthSatisfied, length } from '../index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @length({ length: 10 })
    undefined: any = undefined;
    @length({ length: 10 })
    null: any = null;
    @length({ length: 10 })
    obj = {};
    @length({})
    default = 'default';
    @length({ length: 3 })
    str = 'str';
    @length({ length: 3 })
    invalidStr = 'invalidStr'
    @length({ minLength: 1 })
    minStr = 'minStr';
    @length({ minLength: 20 })
    invalidMinStr = 'invalidMinStr'
    @length({ maxLength: 7 })
    maxStr = 'maxStr';
    @length({ maxLength: 1 })
    invalidMaxStr = 'invalidMaxStr'
    @length({ minLength: 1, maxLength: 10 })
    rangeStr = 'rangeStr';
    @length({ minLength: 10, maxLength: 1 })
    invalidRangeStr = 'invalidRangeStr';
}

const demo = new Demo();
const result = validate(demo);

describe('Length Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.hasError('obj')).to.be.true;
        expect(result.getError('obj', 'length').message).to.eq('The obj length does not match.');
    });
    it('Should verify failure when testing a invalid value', () => {
        expect(result.hasError('undefined')).to.be.true;
        expect(result.hasError('null')).to.be.true;
    });
    describe('Verify only by comparing length', () => {
        it('Should be verified only to compare length with correct digits', () => {
            expect(isLengthSatisfied(demo.str, { length: demo.str.length })).to.be.true;
            expect(result.hasError('str')).to.be.false;
        });
        it('Should be verify failure when comparing length with incorrect digits', () => {
            expect(isLengthSatisfied(demo.invalidStr, { length: demo.invalidStr.length - 1 })).to.be.false;
            expect(result.hasError('invalidStr')).to.be.true;
        });
    });
    describe('Verify only by comparing minLength', () => {
        it('Should be verified only to compare minLength with correct digits', () => {
            expect(isLengthSatisfied(demo.default, {})).to.be.true;
            expect(result.hasError('default')).to.be.false;
            expect(isLengthSatisfied(demo.minStr, { minLength: 1 })).to.be.true;
            expect(result.hasError('minStr')).to.be.false;
        });
        it('Should be verify failure when comparing minLength with incorrect digits', () => {
            expect(isLengthSatisfied(demo.invalidMinStr, { minLength: demo.invalidMinStr.length + 1 })).to.be.false;
            expect(result.hasError('invalidMinStr')).to.be.true;
        });
    });
    describe('Verify by comparing minLength and maxLength', () => {
        it('Should be verified to compare minLength and maxLength', () => {
            expect(isLengthSatisfied(demo.maxStr, { maxLength: demo.maxStr.length })).to.be.true;
            expect(result.hasError('maxStr')).to.be.false;
            expect(isLengthSatisfied(demo.rangeStr, { minLength: 1, maxLength: demo.rangeStr.length })).to.be.true;
            expect(result.hasError('rangeStr')).to.be.false;
        });
        it('Should be verify failure when comparing minLength and maxLength with incorrect digits', () => {
            expect(isLengthSatisfied(demo.invalidMaxStr, { maxLength: demo.invalidMaxStr.length - 1 })).to.be.false;
            expect(result.hasError('invalidMaxStr')).to.be.true;
            expect(isLengthSatisfied(demo.rangeStr, { minLength: demo.rangeStr.length + 1, maxLength: demo.rangeStr.length - 1 })).to.be.false;
        });
    });
})