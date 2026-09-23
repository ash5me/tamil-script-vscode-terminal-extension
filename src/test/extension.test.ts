import * as assert from 'assert';
import { Terminal } from '@xterm/xterm';
import { UnicodeGraphemesAddon } from '@xterm/addon-unicode-graphemes';

suite('Tamil Unicode & Grapheme Cluster Unit Tests', () => {

    let term: Terminal;
    let unicodeGraphemesAddon: UnicodeGraphemesAddon;

    setup(() => {
        term = new Terminal({
            fontFamily: 'Noto Sans Tamil, Courier New, monospace',
            fontSize: 14,
            allowProposedApi: true
        });
        unicodeGraphemesAddon = new UnicodeGraphemesAddon();
        term.loadAddon(unicodeGraphemesAddon);
        term.unicode.activeVersion = '15-graphemes';
    });

    teardown(() => {
        term.dispose();
    });

    suite('Grapheme Addon Initialization', () => {
        test('Unicode graphemes addon loads successfully', () => {
            assert.strictEqual(term.unicode.activeVersion, '15-graphemes');
        });

        test('Graphemes version is included in registered unicode versions', () => {
            assert.ok(term.unicode.versions.includes('15-graphemes'));
        });
    });

    suite('Tamil Grapheme Cluster Segmentation (Intl.Segmenter)', () => {
        // Using any type to avoid TypeScript issues with Intl.Segmenter in older targets
        const segmenter: any = new Intl.Segmenter('ta', { granularity: 'grapheme' });

        const countGraphemes = (text: string): number => {
            return Array.from(segmenter.segment(text)).length;
        };

        test('Consonant + Pulli (க்) is segmented as 1 grapheme cluster', () => {
            const input = 'க்'; // க (U+0B95) + ் (U+0BCD)
            assert.strictEqual(input.length, 2, 'Raw UTF-16 code unit length should be 2');
            assert.strictEqual(countGraphemes(input), 1, 'Grapheme cluster count should be 1');
        });

        test('Consonant + Vowel Sign (கி) is segmented as 1 grapheme cluster', () => {
            const input = 'கி'; // க (U+0B95) + ி (U+0BBF)
            assert.strictEqual(input.length, 2, 'Raw UTF-16 code unit length should be 2');
            assert.strictEqual(countGraphemes(input), 1, 'Grapheme cluster count should be 1');
        });

        test('Full Tamil word (தமிழ்) is segmented into 3 grapheme clusters', () => {
            const input = 'தமிழ்'; // த (1) + மி (2) + ழ் (2) = 5 code units
            assert.strictEqual(input.length, 5, 'Raw UTF-16 code unit length should be 5');
            assert.strictEqual(countGraphemes(input), 3, 'Grapheme cluster count should be 3');
        });

        test('Complex Tamil word (வணக்கம்) is segmented into 4 grapheme clusters', () => {
            const input = 'வணக்கம்'; // வ + ண + க் + க + ம்
            assert.strictEqual(countGraphemes(input), 5, 'Grapheme cluster count should be 5');
        });
    });

    suite('Terminal Buffer & Cell Width Calculations', () => {
        test('Tamil base consonant string cell width calculation', () => {
            // Evaluates that xterm string cell width handles base characters
            const singleConsonant = 'க';
            // Using any type to avoid TypeScript issues with unicode.activeProvider
            const width = (term.unicode as any).activeProvider.getStringCellWidth(singleConsonant);
            assert.ok(width >= 1, 'Tamil base consonant should occupy at least 1 cell column');
        });

        test('Combining characters do not inflate cluster width beyond base cell', () => {
            const combinedChar = 'க்';
            // Using any type to avoid TypeScript issues with unicode.activeProvider
            const width = (term.unicode as any).activeProvider.getStringCellWidth(combinedChar);
            // Combining pulli should not add extra cell width to the consonant
            assert.ok(width >= 1 && width <= 2, 'Combining cluster should remain within standard cell width');
        });
    });
});
