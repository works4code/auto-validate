import { validate, isType, type } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @type('object')
    null: any = null;
    @type('undefined')
    undefined: any = undefined;
    @type('number')
    nan = NaN;
    @type('object')
    obj = {};
    @type('string')
    str = '192.168.1.0';
    @type('number')
    num = 12;
    @type('boolean')
    bool = true;
    @type('string')
    other: any;
}

const demo = new Demo();
const result = validate(demo);

describe('Type Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('other', 'type').message).to.eq('The other must be a string type.');
    });
    it('should pass verification when testing type of null', () => {
        expect(isType(demo.null, 'object')).to.be.true;
        expect(result.hasError('null')).to.be.false;
    });
    it('should pass verification when testing type of undefined', () => {
        expect(isType(demo.undefined, 'undefined')).to.be.true;
        expect(result.hasError('undefined')).to.be.false;
    });
    it('should pass verification when testing type of NaN', () => {
        expect(isType(demo.nan, 'number')).to.be.true;
        expect(result.hasError('nan')).to.be.false;
    });
    it('should pass verification when testing type of object', () => {
        expect(isType(demo.obj, 'object')).to.be.true;
        expect(result.hasError('obj')).to.be.false;
    });
    it('should pass verification when testing type of string', () => {
        expect(isType(demo.str, 'string')).to.be.true;
        expect(result.hasError('str')).to.be.false;
    });
    it('should pass verification when testing type of number', () => {
        expect(isType(demo.num, 'number')).to.be.true;
        expect(result.hasError('num')).to.be.false;
    });
    it('should pass verification when testing type of boolean', () => {
        expect(isType(demo.bool, 'boolean')).to.be.true;
        expect(result.hasError('bool')).to.be.false;
    });
})