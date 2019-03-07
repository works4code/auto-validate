import { validate, isGreaterThanOrEqualTo, gte } from '../index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @gte(0)
    num = 1;
    @gte('ccc')
    str = 'bbb';
    @gte(new Date(Date.now() - 10000))
    date = new Date();
    @gte(false)
    value = false;
    @gte(11)
    other = 10;
}

const demo = new Demo();
const result = validate(demo);

describe('Greater Than Or Equal Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('other', 'gte').message).to.eq('The other must be greater than or equal to 11, current is 10.');
    });
    it('should pass verification when comparing two number values', () => {
        expect(isGreaterThanOrEqualTo(demo.num, 0)).to.be.true;
        expect(isGreaterThanOrEqualTo(demo.num, demo.num)).to.be.true;
        expect(result.hasError('num')).to.be.false;
    });
    it('should verify failure when comparing two string values', () => {
        expect(isGreaterThanOrEqualTo(demo.str, 'ccc')).to.be.false;
        expect(isGreaterThanOrEqualTo(demo.str, demo.str)).to.be.true;
        expect(result.hasError('str')).to.be.true;
    });
    it('should pass verification when comparing two date values', () => {
        expect(isGreaterThanOrEqualTo(demo.date, new Date(Date.now() - 10000))).to.be.true;
        expect(isGreaterThanOrEqualTo(demo.date, demo.date)).to.be.true;
        expect(result.hasError('date')).to.be.false;
    });
    it('should pass verification when comparing two same values', () => {
        expect(isGreaterThanOrEqualTo(demo.value, false)).to.be.true;
        expect(result.hasError('value')).to.be.false;
    });
})