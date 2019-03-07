import { validate, matches, isMatch } from '../index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @matches(/^1\d{10}$/)
    phoneNo = '13001311234'
    @matches(/^[a-z]{6,10}$/)
    name = 'jack'
    @matches("abc", { flags: 'i' })
    str = 'aBc';
    @matches('abc')
    unmatchStr = 'aBc';
}

const demo = new Demo();
const result = validate(demo);

describe('Match Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('unmatchStr', 'matches').message).to.eq('The unmatchStr does not match the requested format.');
    });
    describe('Test with text expression', () => {
        it('should pass verification when testing with matched value', () => {
            expect(isMatch(demo.str, 'abc', { flags: 'i' })).to.be.true;
            expect(result.hasError('str')).to.be.false;
        });
        it('should verify failure when testing with unmatched value', () => {
            expect(isMatch(demo.unmatchStr, 'abc')).to.be.false;
            expect(result.hasError('unmatchStr')).to.be.true;
        });
    });
    describe('Test with regex expression', () => {
        it('should pass verification when testing with matched value', () => {
            expect(isMatch(demo.phoneNo, /^1\d{10}$/)).to.be.true;
            expect(result.hasError('phoneNo')).to.be.false;
        });
        it('should verify failure when testing with unmatched value', () => {
            expect(isMatch(demo.name, /^[a-z]{6,10}$/)).to.be.false;
            expect(result.hasError('name')).to.be.true;
        });
    });
})