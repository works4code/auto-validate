import { validate, gt, gte, type, matches, required } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @type('string')
    @gt(2)
    num = 1;
    @matches(/^1\d{10}$/, { message: '无效的手机号。', order: 2 })
    phone: string;
    @required({ message: '手机号不能为空。', order: 1 })
    phone1: string;
    @gte(2)
    num1 = 0;
    @gte(2, { order: 1 })
    num2 = 0;
}

const demo = new Demo();
const result = validate(demo);

describe('Order Test', () => {
    it('should return errors by correct order', () => {
        expect(result.getError('num', 'type').order).to.eq(4);
        expect(result.getError('num', 'gt').order).to.eq(3);
        expect(result.getError('phone1', 'required').order).to.eq(0);
        expect(result.getError('phone', 'matches').order).to.eq(2);
        expect(result.getError('num1', 'gte').order).to.eq(5);
        expect(result.getError('num2', 'gte').order).to.eq(1);
        expect(result.toSingle().order).to.eq(0);
    });
});

