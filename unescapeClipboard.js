#!/usr/bin/env node

async function main() {
    const { default: clipboard } = await import('clipboardy');
    const { default: he } = await import('he');

    const decodedText = decodeURIComponent(clipboard.readSync());
    const unescapedText = decodedText.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    const unescapedHtml = he.unescape(unescapedText);

    console.log(unescapedHtml);
}
main();

module.exports = main;
