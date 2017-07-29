const expect = require('expect');
var {isRealString} = require('./validation');

describe('Test cases for isRealString:', () => {
    it('It should reject non-string value', () => {
        var result = isRealString(98);
        expect(result).toBe(false);
    });

    it('It should reject non-string value', () => {
        var result = isRealString("           ");
        expect(result).toBe(false);
    });

    it('It should allow valid string value', () => {
        result = isRealString("teststring");
        expect(result).toBe(true);
    });

    it('It should allow valid string with space on both string endpoints', () => {
        result = isRealString("     teststring      ");
        expect(result).toBe(true);
    });
});
