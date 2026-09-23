const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'node_modules', '@xterm', 'xterm', 'css', 'xterm.css');
const dest = path.join(__dirname, '..', 'media', 'xterm.css');

fs.copyFileSync(src, dest);
console.log('Copied xterm.css -> media/xterm.css');