import { validate, isContain, contains } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @contains('bb')
    str = 'bbb';
    @contains('b', 1)
    posStr = 'bab';
    @contains('b')
    other = 'aaa';
    @contains(3)
    array = [1, 2, 3, 4, 5, 3]
    @contains(3, 4)
    posArray = [1, 2, 3, 4, 5, 3];
    @contains('a')
    obj = { a: 1, b: false };
}

const demo = new Demo();
const result = validate(demo);

describe('Contains Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.hasError('other')).to.be.true;
        expect(result.getError('other', 'contains').message).to.eq('The other is not contains b.')
    })
    describe('Check with default position', () => {
        it('check if the string contains the specified substring', () => {
            expect(isContain(demo.str, 'bb')).to.be.true;
            expect(isContain(demo.str, 'aa')).to.be.false;
            expect(result.hasError('str')).to.be.false;
        });
        it('check if the array contains the specified value', () => {
            expect(isContain(demo.array, 3)).to.be.true;
            expect(isContain(demo.array, 6)).to.be.false;
            expect(result.hasError('array')).to.be.false;
        });
        it('check if the object contains the specified key', () => {
            expect(isContain(demo.obj, 'a')).to.be.true;
            expect(isContain(demo.obj, 'c')).to.be.false;
            expect(result.hasError('obj')).to.be.false;
        });
    })
    describe('Check with start position', () => {
        it('check if the string contains the specified substring', () => {
            expect(isContain(demo.posStr, 'b', 1)).to.be.true;
            expect(isContain(demo.posStr, 'a', 2)).to.be.false;
            expect(result.hasError('posStr')).to.be.false;
        });
        it('check if the array contains the specified value', () => {
            expect(isContain(demo.posArray, 3, 4)).to.be.true;
            expect(isContain(demo.posArray, 1, 4)).to.be.false;
            expect(result.hasError('posArray')).to.be.false;
        });
    })
})