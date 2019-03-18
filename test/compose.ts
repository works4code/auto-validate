import { validate, gt, type, matches, required } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @type('number')
    @gt(1)
    @gt(0)
    num = 1;
    @required({ message: '手机号不能为空。' })
    @matches(/^1\d{10}$/, { message: '无效的手机号。' })
    phone: string;
}

const demo = new Demo();
const result = validate(demo);

describe('Mutil-Validators Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('phone', 'required').message).to.eq('手机号不能为空。');
        expect(result.getError('phone', 'matches').message).to.eq('无效的手机号。');
    });
    it('should pass verification when checking num\'s type', () => {
        expect(result.hasError('num', 'type')).to.be.false;
    });
    it('should verify failure when comparing two number values', () => {
        expect(result.hasError('num', 'gt')).to.be.true;
    });
});