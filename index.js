#!/usr/bin/env node

const { log } = require('log-parsed-json');

async function main() {
    const { default: clipboard } = await import('clipboardy');

    log(clipboard.readSync());
}
main();

module.exports = main;
