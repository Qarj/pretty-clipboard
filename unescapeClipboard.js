#!/usr/bin/env node

async function main() {
    const { default: clipboard } = await import('clipboardy');
    const { default: he } = await import('he');

    const text = clipboard.readSync();
    let unescapedUnicode = '';
    for (const line of text.split('\n')) {
        try {
            let l = line;
            l = JSON.stringify(l);
            l = l.replace(/\\\\/g, '\\');
            l = JSON.parse(l);
            unescapedUnicode += l;
        } catch (error) {
            unescapedUnicode += line;
        }
        unescapedUnicode += '\n';
    }
    const decodedText = decodeURIComponent(unescapedUnicode);
    const unescapedText = decodedText.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    const unescapedHtml = he.unescape(unescapedText);

    console.log(unescapedHtml);
}
main();

module.exports = main;
