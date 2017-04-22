var ranStr = require('../lib/randomstr')
var expect = require('chai').expect

suite('random string tests',function () {
    test('getRanStr() should return a string',function () {
        expect(typeof ranStr.getRanStr() === 'string');
    });
});