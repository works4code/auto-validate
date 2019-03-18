import { validate, gt, gte, type, matches, required } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @type('string')
    @gte(2)
    @gt(2)
    num = 1;
    @matches(/^1\d{10}$/, { message: '无效的手机号。' })
    @required({ message: '手机号不能为空。' })
    phone: string;
}

const demo = new Demo();
const result = validate(demo);

describe('Order Test', () => {
    it('should return errors by correct order', () => {
        expect(result.getErrors('num')[0].order).to.eq(0);
        expect(result.getErrors('num')[1].order).to.eq(1);
        expect(result.getErrors('num')[2].order).to.eq(2);
    });
    it('should return errors by correct order', () => {
        expect(result.getError('phone', 'required').order).to.eq(0);
        expect(result.toSingle().order).to.eq(0);
    });
});
