import BaseObj from '@/utils/filters/basic.js';

describe('Base reverseYuan 测试用例', () => {

    const targetFun = BaseObj.reverseYuan;

    it('入参为非数字', () => {
        expect(targetFun('abc')).toBe('数据异常');
    });
    it('入参为空字符串', () => {
        expect(targetFun('')).toBe('0');
    });
    it('入参为空字符串', () => {
        expect(targetFun(-0)).toBe('0');
    });
    it('入参为null', () => {
        expect(targetFun(null)).toBe('0');
    });
    it('入参为undefined', () => {
        expect(targetFun(undefined)).toBe('0');
    });
    it('入参为0', () => {
        expect(targetFun(0)).toBe('0');
    });
    it('入参为123', () => {
        expect(targetFun('123')).toBe('2');
    });
    it('入参为1234567', () => {
        expect(targetFun('1234567')).toBe('12,346');
    });
    // TODO 金额传入负数就是伪逻辑
    it('入参为-9087.1245', () => {
        expect(targetFun('-9087.1245')).toBe('-91');
    });
    // TODO 金额传入负数就是伪逻辑
    it('入参为大数据 908723423423231245', () => {
        expect(targetFun('908723423423231245')).toBe('9,087,234,234,232,312');
    });
});

describe('Base reverseYuanNoDou 测试用例', () => {

    const targetFun = BaseObj.reverseYuanNoDou;

    it('入参为非数字', () => {
        expect(targetFun('abc')).toBe('数据异常');
    });
    it('入参为空字符串', () => {
        expect(targetFun('')).toBe(0);
    });
    it('入参为null', () => {
        expect(targetFun(null)).toBe(0);
    });
    it('入参为undefined', () => {
        expect(targetFun(undefined)).toBe(0);
    });
    it('入参为0', () => {
        expect(targetFun('0')).toBe(0);
    });
    it('入参为123', () => {
        expect(targetFun('123')).toBe(1.23);
    });
    it('入参为1234567', () => {
        expect(targetFun('1234567')).toBe(12345.67);
    });
    it('入参为99800', () => {
        expect(targetFun('99800')).toBe(998);
    });
});
