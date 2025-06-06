import { fixBrokenUnicode } from '@vkblocks/utils/fixBrokenUnicode';

describe('fixBrokenUnicode', () => {
    test('replaces \u0022 with quotes when JSON is invalid', () => {
        expect(fixBrokenUnicode('foo\\u0022bar')).toBe('foo"bar');
    });

    test('returns input unchanged when JSON is valid', () => {
        const json = '{"foo":"bar"}';
        expect(fixBrokenUnicode(json)).toBe(json);
    });
});
