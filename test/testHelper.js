const pc = require('../index.js');
const fs = require('fs');
const path = require('path');

async function main() {
    const { default: clipboard } = await import('clipboardy');
    await sleep(2);
    const args = JSON.parse(fs.readFileSync(path.join(__dirname, './testHelperArguments.json')));

    let stringToCopyToClipboard = '';

    if (args.value) stringToCopyToClipboard = args.value;

    await clipboard.write(stringToCopyToClipboard);
    await sleep(2);
    pc();
}

main();

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
