import { validate, numeric, isNumeric } from '../index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @numeric()
    nan = NaN;
    @numeric()
    num = 123;
    @numeric()
    str = '123';
    @numeric()
    invalidStr = 'abc';
    @numeric()
    symbolStr = '-1.2';
    @numeric()
    invalidSymbolStr = '-1.2.3';
    @numeric()
    date = new Date();
}

const demo = new Demo();
const result = validate(demo);

describe('Numeric Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('nan', 'numeric').message).to.eq('The nan is not a numeric type.');
    });
    it('should verify failure when testing with NaN', () => {
        expect(isNumeric(demo.nan)).to.be.false;
        expect(result.hasError('nan')).to.be.true;
    });
    it('should pass verification when testing with a valid text', () => {
        expect(isNumeric(demo.str)).to.be.true;
        expect(result.hasError('str')).to.be.false;
    });
    it('should verify failure when testing with a invalid text', () => {
        expect(isNumeric(demo.invalidStr)).to.be.false;
        expect(result.hasError('invalidStr')).to.be.true;
    });
    it('should pass verification when testing with a number', () => {
        expect(isNumeric(demo.num)).to.be.true;
        expect(result.hasError('num')).to.be.false;
    });
    it('should pass verification when testing with a valid text with symbol', () => {
        expect(isNumeric(demo.symbolStr)).to.be.true;
        expect(result.hasError('symbolStr')).to.be.false;
    });
    it('should verify failure when testing with a valid text with symbol', () => {
        expect(isNumeric(demo.invalidSymbolStr)).to.be.false;
        expect(result.hasError('invalidSymbolStr')).to.be.true;
    });
    it('should pass verification when testing with a date', () => {
        expect(isNumeric(demo.date)).to.be.true;
        expect(result.hasError('date')).to.be.false;
    });
});