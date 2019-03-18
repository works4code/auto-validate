import { validate, isInRange, range } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @range(0, 1)
    num = 1;
    @range('a', 'c')
    str = 'bbb';
    @range(new Date(Date.now() - 10000), new Date(Date.now() + 10000))
    date = new Date();
    @range(-1, 9)
    other = 10;
}

const demo = new Demo();
const result = validate(demo);

describe('Range Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('other', 'range').message).to.eq('The other must be between -1 and 9.');
    });
    it('should pass verification when comparing two number values', () => {
        expect(isInRange(demo.num, 0, 1)).to.be.true;
        expect(isInRange(demo.num, demo.num, demo.num)).to.be.true;
        expect(result.hasError('num')).to.be.false;
    });
    it('should pass verification when comparing two string values', () => {
        expect(isInRange(demo.str, 'a', 'c')).to.be.true;
        expect(isInRange(demo.str, demo.str, demo.str)).to.be.true;
        expect(result.hasError('str')).to.be.false;
    });
    it('should pass verification when comparing two date values', () => {
        expect(isInRange(demo.date, new Date(Date.now() - 10000), new Date(Date.now() + 10000))).to.be.true;
        expect(isInRange(demo.date, demo.date, demo.date)).to.be.true;
        expect(result.hasError('date')).to.be.false;
    });
})