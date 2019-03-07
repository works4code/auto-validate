import { validate, required, isRequired } from '../index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @required()
    allowedEmptyArray: any[] = [];
    @required({ allowEmpty: false })
    array: any[] = [];
    @required()
    undefinedValue: boolean;
    @required()
    value: boolean = true;
    @required()
    allowedEmptyStr = '';
    @required({ allowEmpty: false })
    emptyStr = '';
    @required()
    allowedEmptyObj = {};
    @required({ allowEmpty: false })
    emptyObj = {};
    @required()
    nullValue: any = null;
    @required({ allowNull: true })
    allowedNullValue: any = null;
    @required()
    allowedWhitespace = ' ';
    @required({ allowWhitespace: false })
    whiteSpace: string = ' ';
    @required()
    naNValue = NaN;
    @required({ allowNaN: true })
    allowedNaNValue = NaN;
}

const demo = new Demo();
const result = validate(demo);

describe('Required Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('emptyStr', 'required').message).to.eq('The emptyStr is required.');
    });
    it('should pass verification when testing a empty string which allowed to be empty', () => {
        expect(isRequired(demo.allowedEmptyStr)).to.be.true;
        expect(result.hasError('allowedEmptyStr')).to.be.false;
    });
    it('should pass verification when testing a empty array which allowed to be empty', () => {
        expect(isRequired(demo.allowedEmptyArray)).to.be.true;
        expect(result.hasError('allowedEmptyArray')).to.be.false;
    });
    it('should pass verification when testing a empty object which allowed to be empty', () => {
        expect(isRequired(demo.allowedEmptyObj)).to.be.true;
        expect(result.hasError('allowedEmptyObj')).to.be.false;
    });
    it('should verify failure when testing a empty string', () => {
        expect(isRequired(demo.emptyStr, { allowEmpty: false })).to.be.false;
        expect(result.hasError('emptyStr')).to.be.true;
    });
    it('should verify failure when testing a empty object', () => {
        expect(isRequired(demo.emptyObj, { allowEmpty: false })).to.be.false;
        expect(result.hasError('emptyObj')).to.be.true;
    });
    it('should verify failure when testing a empty array', () => {
        expect(isRequired(demo.array, { allowEmpty: false })).to.be.false;
        expect(result.hasError('array')).to.be.true;
    });
    it('should pass verification when testing a valid value', () => {
        expect(isRequired(demo.value)).to.be.true;
        expect(result.hasError('value')).to.be.false;
    })
    it('should verify failure when testing a undefined value', () => {
        expect(isRequired(demo.undefinedValue)).to.be.false;
        expect(result.hasError('undefinedValue')).to.be.true;
    });
    it('should pass verification when testing a string which allowed to include whitespace only', () => {
        expect(isRequired(demo.allowedWhitespace)).to.be.true;
        expect(result.hasError('allowedWhitespace')).to.be.false;
    })
    it('should verify failure when testing a white space string', () => {
        expect(isRequired(demo.whiteSpace, { allowWhitespace: false })).to.be.false;
        expect(result.hasError('whiteSpace')).to.be.true;
    });
    it('should pass verification when testing a NaN value which allowed to be NaN', () => {
        expect(isRequired(demo.allowedNaNValue, { allowNaN: true })).to.be.true;
        expect(result.hasError('allowedNaNValue')).to.be.false;
    });
    it('should verify failure when testing a NaN value', () => {
        expect(isRequired(demo.naNValue)).to.be.false;
        expect(result.hasError('naNValue')).to.be.true;
    });
    it('should pass verification when testing a null value allowed to be null', () => {
        expect(isRequired(demo.allowedNullValue, { allowNull: true })).to.be.true;
        expect(result.hasError('allowedNullValue')).to.be.false;
    });
    it('should verify failure when testing a null value', () => {
        expect(isRequired(demo.nullValue)).to.be.false;
        expect(result.hasError('nullValue')).to.be.true;
    });
});