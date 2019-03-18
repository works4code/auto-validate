import { validate, isGreaterThan, gt } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @gt(0)
    num = 1;
    @gt('ccc')
    str = 'bbb';
    @gt(new Date(Date.now() - 10000))
    date = new Date();
    @gt(11)
    other = 10;
}

const demo = new Demo();
const result = validate(demo);

describe('Greater Than Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('other', 'gt').message).to.eq('The other must be greater than 11, current is 10.');
    });
    it('should pass verification when comparing two number values', () => {
        expect(isGreaterThan(demo.num, 0)).to.be.true;
        expect(result.hasError('num')).to.be.false;
    });
    it('should verify failure when comparing two string values', () => {
        expect(isGreaterThan(demo.str, 'ccc')).to.be.false;
        expect(result.hasError('str')).to.be.true;
    });
    it('should pass verification when comparing two date values', () => {
        expect(isGreaterThan(demo.date, new Date(Date.now() - 100000))).to.be.true;
        expect(result.hasError('date')).to.be.false;
    });
})