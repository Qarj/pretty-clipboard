#!/usr/bin/env node

async function main() {
    const { default: clipboard } = await import('clipboardy');

    console.log(decodeURIComponent(clipboard.readSync()));
}
main();

module.exports = main;
