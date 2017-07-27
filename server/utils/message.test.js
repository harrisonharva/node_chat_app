var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('It should generate correct message object', () => {
        var from = "Admin";
        var text = "Welcome to xyz";
        var message = generateMessage(from, text);
        expect(message).toBeA('object');
        expect(message.from).toBe('Admin');
        expect(message.text).toBe('Welcome to xyz');
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});
