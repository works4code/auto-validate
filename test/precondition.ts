import { validate, gt, gte, type, matches, required, precondition } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @precondition(param => param.phone)
    @required({})
    @matches(/^1\d{10}$/, {})
    phone: string;
    @precondition(param => param.phone)
    @required({ precondition: () => true })
    @matches(/^1\d{10}$/, {})
    phone2: string;
    @precondition(param => param.phone1)
    @required({})
    @matches(/^1\d{10}$/, { precondition: () => false })
    phone1: string;
    @gte(2)
    num1 = 0;
    @type('string')
    @gte(2, { precondition: (param) => param.num2 })
    num2 = 0;
}

const demo = new Demo();
const result = validate(demo);
const result1 = validate(demo, { preconditionParam: { num2: true, phone: true } });
const result2 = validate(demo, { preconditionParam: { num2: false, phone: false } });
const result3 = validate(demo, { preconditionParam: { phone: false, phone1: true } });


describe('Precondition Test', () => {
    it('should ignore validation if miss preconditionParam', () => {
        expect(result.hasError('num1')).to.be.true;
        expect(result.hasError('phone')).to.be.false;
        expect(result.hasError('num2')).to.be.true;
        expect(result.hasError('num2', 'gte'), 'num2-gte').to.be.false;
    });
    it('should pass validation if the condition is established', () => {
        expect(result1.hasError('num1')).to.be.true;
        expect(result1.hasError('phone')).to.be.true;
        expect(result1.hasError('num2')).to.be.true;
        expect(result1.hasError('num2', 'gte')).to.be.true;
    });
    it('should\'t pass validation unless the condition is established', () => {
        expect(result2.hasError('num1')).to.be.true;
        expect(result2.hasError('phone')).to.be.false;
        expect(result2.hasError('num2')).to.be.true;
        expect(result2.hasError('num2', 'gte')).to.be.false;
    });
    it('should own higher priority with internal precondition option', () => {
        expect(result3.hasError('num1')).to.be.true;
        expect(result3.hasError('phone2', 'matches')).to.be.false;
        expect(result3.hasError('phone2', 'required')).to.be.true;
        expect(result3.hasError('phone1', 'matches')).to.be.false;
        expect(result3.hasError('phone1', 'required')).to.be.true;
        expect(result3.hasError('num2', 'gte')).to.be.false;
    });
});

