import { validate, isLessThanOrEqualTo, lte } from '../index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @lte(2)
    num = 1;
    @lte('aaa')
    str = 'bbb';
    @lte(new Date(Date.now() + 10000))
    date = new Date();
    @lte(false)
    value = false;
    @lte(9)
    other = 10;
}

const demo = new Demo();
const result = validate(demo);

describe('Less Than Or Equal Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('other', 'lte').message).to.eq('The other must be less than or equal to 9, current is 10.');
    });
    it('should pass verification when comparing two number values', () => {
        expect(isLessThanOrEqualTo(demo.num, 2)).to.be.true;
        expect(isLessThanOrEqualTo(demo.num, demo.num)).to.be.true;
        expect(result.hasError('num')).to.be.false;
    });
    it('should verify failure when comparing two string values', () => {
        expect(isLessThanOrEqualTo(demo.str, 'aaa')).to.be.false;
        expect(isLessThanOrEqualTo(demo.str, demo.str)).to.be.true;
        expect(result.hasError('str')).to.be.true;
    });
    it('should pass verification when comparing two date values', () => {
        expect(isLessThanOrEqualTo(demo.date, new Date(Date.now() + 10000))).to.be.true;
        expect(isLessThanOrEqualTo(demo.date, demo.date)).to.be.true;
        expect(result.hasError('date')).to.be.false;
    });
    it('should pass verification when comparing two same values', () => {
        expect(isLessThanOrEqualTo(demo.value, false)).to.be.true;
        expect(result.hasError('value')).to.be.false;
    });
})