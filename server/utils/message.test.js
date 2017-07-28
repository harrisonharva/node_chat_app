var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('It should generate correct location message object', () => {
        var from = "Admin";
        var latitude = 34.0201796;
        var longitude = -118.6926142;
        var expected_url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message).toBeA('object');
        expect(message.url).toBeA('string');
        expect(message.url).toBe(expected_url);
        expect(message.from).toBeA('string');
        expect(message.from).toBe('Admin');
        expect(message).toInclude({'from': from, 'url': expected_url});
        expect(message.createdAt).toBeA('number');
    });
});
