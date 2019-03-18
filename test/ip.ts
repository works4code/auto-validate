import { validate, isIP, ip } from '../src/index';
import { expect } from 'chai';
import 'mocha';

export class Demo {
    @ip()
    null: any = null;
    @ip()
    undefined: any = undefined;
    @ip()
    naN = NaN;
    @ip()
    obj = {};
    @ip()
    ip4 = '192.168.1.0';
    @ip()
    invalidIP4 = '300.1.3.2';
    @ip({ version: 6 })
    ip6 = 'fe80::10d2:e848:f279:2687%12';
    @ip({ version: 6 })
    invalidIP6 = 'fse';
    @ip({ version: 7 as any })
    invalidVersion = '192.188.1.1';
}

const demo = new Demo();
const result = validate(demo);

describe('IP Validator Test', () => {
    it('should return correct error meessage', () => {
        expect(result.getError('invalidIP4', 'ip').message).to.eq('The invalidIP4 is a invalid IP address.');
    });
    it('should verify failure when testing a invalid value', () => {
        expect(result.hasError('undefined')).to.be.true;
        expect(result.hasError('null')).to.be.true;
        expect(result.hasError('naN')).to.be.true;
        expect(result.hasError('obj')).to.be.true;
    });
    it('should pass verification when testing a valid ip4 address', () => {
        expect(isIP(demo.ip4)).to.be.true;
        expect(isIP(demo.ip4, { version: 4 })).to.be.true;
        expect(result.hasError('ip4')).to.be.false;
    });
    it('should pass verification when testing a valid ip6 address', () => {
        expect(isIP(demo.ip6)).to.be.false;
        expect(isIP(demo.ip6, { version: 6 })).to.be.true;
        expect(result.hasError('ip6')).to.be.false;
    });
    it('should verify failure when testing a invalid ip4 address', () => {
        expect(isIP(demo.invalidIP4)).to.be.false;
        expect(isIP(demo.invalidIP4, { version: 4 })).to.be.false;
        expect(result.hasError('invalidIP4')).to.be.true;
    });
    it('should verify failure when testing a invalid ip6 address', () => {
        expect(isIP(demo.invalidIP6)).to.be.false;
        expect(isIP(demo.invalidIP6, { version: 6 })).to.be.false;
        expect(result.hasError('invalidIP6')).to.be.true;
    });
    it('should verify failure when testing with other version', () => {
        expect(isIP(demo.ip4, { version: 7 as any })).to.be.false;
        expect(isIP(demo.ip6, { version: 7 as any })).to.be.false;
        expect(result.hasError('invalidVersion')).to.be.true;
    });
})