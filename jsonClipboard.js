#!/usr/bin/env node

const { logAsJson } = require('log-parsed-json');

async function main() {
    const { default: clipboard } = await import('clipboardy');

    logAsJson(clipboard.readSync());
}
main();

module.exports = main;
