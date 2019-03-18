import { validate, isLessThan, lt } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @lt(2)
    num = 1;
    @lt('aaa')
    str = 'bbb';
    @lt(new Date(Date.now() + 10000))
    date = new Date();
    @lt(9)
    other = 10;
}

const demo = new Demo();
const result = validate(demo);

describe('Less Than Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('other', 'lt').message).to.eq('The other must be less than 9, current is 10.');
    });
    it('should pass verification when comparing two number values', () => {
        expect(isLessThan(demo.num, 2)).to.be.true;
        expect(result.hasError('num')).to.be.false;
    });
    it('should verify failure when comparing two string values', () => {
        expect(isLessThan(demo.str, 'aaa')).to.be.false;
        expect(result.hasError('str')).to.be.true;
    });
    it('should pass verification when comparing two date values', () => {
        expect(isLessThan(demo.date, new Date(Date.now() + 10000))).to.be.true;
        expect(result.hasError('date')).to.be.false;
    });
})