import { Terminal } from '@xterm/xterm';
import { UnicodeGraphemesAddon } from '@xterm/addon-unicode-graphemes';

const container = document.getElementById('terminal-container');

const term = new Terminal({
    fontFamily: 'Noto Sans Tamil, Courier New, monospace',
    fontSize: 14,
    allowProposedApi: true,
    theme: {
        background: '#1e1e1e'
    }
});

const unicodeGraphemesAddon = new UnicodeGraphemesAddon();
term.loadAddon(unicodeGraphemesAddon);
term.unicode.activeVersion = '15-graphemes';

if (container) {
    term.open(container);
}

term.write('வணக்கம்! Tamil Unicode Terminal ready.\r\n');