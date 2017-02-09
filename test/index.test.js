import chai from 'chai';
import normalize from '../dist/real-types.min';

const { expect, assert } = chai;

describe('Check single arguments', function() {
    it('should return true', () => {
        assert.isTrue(normalize('true'));
        assert.isTrue(normalize(true));
    });
    it('should return false', () => {
        assert.isFalse(normalize('false'));
        assert.isFalse(normalize(false));
    });
    it('should handle integers', () => {
        assert.equal(normalize('300'), 300);
        assert.equal(normalize(300), 300);
    });
    it('should handle floats', () => {
        assert.equal(normalize('10.5'), 10.5);
        assert.equal(normalize('10.9'), 10.9);
    });
    it('should handle negative numbers', () => {
        assert.equal(normalize('-1.2323'), -1.2323);
        assert.equal(normalize('-20'), -20);
    });
    it('should trim input', () => {
        assert.equal(normalize(' 10 '), 10);
        assert.equal(normalize('10.6'), 10.6);
        assert.equal(normalize('false '), false);
    });
    it('should leave unmatched strings unchanged', () => {
        assert.equal(normalize('10.6 20.9'), '10.6 20.9');
        assert.equal(normalize('foobar'),'foobar');
    });
});
describe('Check arrays', function () {
    it ('should convert array of numbers', () => {
        let data = normalize(['250', '350', '4060']);
        assert.equal(data[0], 250);
        assert.equal(data[1], 350);
        assert.equal(data[2], 4060);
    });
    it ('should convert array of boolean values', () => {
        let data = normalize(['true', 'false', 'true']);
        assert.equal(data[0], true);
        assert.equal(data[1], false);
        assert.equal(data[2], true);
    });
});
describe('Check nested values', function () {
    let data;
    before(function () {
        data = normalize({
            a_bool: 'false',
            some_ints: ['1','20','8','9'],
            composite: {
                foo: 'true',
                value: 10,
            },
        });
    });
    it('should convert nested array', () => {
        assert.equal(data.some_ints[0], 1);
        assert.equal(data.some_ints[1], 20);
        assert.equal(data.some_ints[2], 8);
        assert.equal(data.some_ints[3], 9);
    });
    it('should convert nested values', () => {
        assert.equal(data.composite.foo, true);
        assert.equal(data.composite.value, 10);
    });
});
describe('Edge cases', function () {
    it('should not handle empty arrays', () => {
        var empty = normalize([]);
        assert.isTrue(Array.isArray(empty));
        assert.equal(empty.length, 0); 
    });
    it('should not handle whitespace', () => {
        assert.equal(normalize("\t"), "\t");
        assert.equal(normalize("\n"), "\n");
    });
    it('should trim input', () => {
        assert.equal(normalize("\t1\n"), 1);
        assert.equal(normalize("\ttrue\n"), true);
    });
});
