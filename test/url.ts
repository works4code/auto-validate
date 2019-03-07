import { validate, url, isURL } from '../index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @url()
    undefined: string;
    @url()
    null: string = null;
    @url()
    zero = 0;
    @url()
    empty = '';
    @url()
    obj = {};
    @url()
    invalidValue = 'some string';
    @url()
    value = 'https://www.google.com/'
    @url()
    shortURL = 'www.baidu.com'
}

const demo = new Demo();
const result = validate(demo);

describe('URL Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('invalidValue', 'url').message).to.eq('The invalidValue is not a valid url.');
    });
    it('should verify failure when testing a undefined value', () => {
        expect(isURL(demo.undefined)).to.be.false;
        expect(result.hasError('undefined')).to.be.true;
    });
    it('should verify failure when testing a null value', () => {
        expect(isURL(demo.null)).to.be.false;
        expect(result.hasError('null')).to.be.true;
    });
    it('should verify failure when testing a number', () => {
        expect(isURL(demo.zero as any)).to.be.false;
        expect(result.hasError('zero')).to.be.true;
    });
    it('should verify failure when testing a empty string', () => {
        expect(isURL(demo.empty)).to.be.false;
        expect(result.hasError('empty')).to.be.true;
    });
    it('should verify failure when testing a object value', () => {
        expect(isURL(demo.obj as any)).to.be.false;
        expect(result.hasError('obj')).to.be.true;
    });
    it('should verify failure when testing a incorrect string', () => {
        expect(isURL(demo.invalidValue)).to.be.false;
        expect(result.hasError('invalidValue')).to.be.true;
    });
    it('should pass verification when testing a correct url address', () => {
        expect(isURL(demo.value)).to.be.true;
        expect(result.hasError('value')).to.be.false;
    });
    it('should pass verification when testing a short url address', () => {
        expect(isURL(demo.shortURL)).to.be.true;
        expect(result.hasError('shortURL')).to.be.false;
    });
})