/* eslint-disable no-empty */
/* eslint-disable no-control-regex */
// const pc = require('../index.js');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

try {
    const files = fs.readdirSync('./test/temp');
    for (const file of files) {
        fs.unlinkSync(path.join('./test/temp', file));
    }
} catch (e) {}
try {
    fs.rmdirSync('./test/temp', { maxRetries: 10 });
} catch (e) {}
try {
    fs.mkdirSync('./test/temp');
} catch (e) {}

beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    try {
        fs.unlinkSync(path.join(__dirname, './testHelperCalls.json'));
    } catch (e) {}
    try {
        fs.unlinkSync(path.join(__dirname, './testHelperCalls.json'));
    } catch (e) {}
});

test('dummy test', (done) => {
    expect(true).toBe(true);
    done();
});

// test('log function exists', (done) => {
//     expect(pc).toBeDefined();
//     done();
// });

// test('log function is a function', (done) => {
//     expect(typeof pc).toBe('function');
//     done();
// });

// test('pc function logs a string', (done) => {
//     const positiveAssertions = ['abcd'];
//     const negativeAssertions = [];
//     setTestHelperArguments({ value: 'abcd' });
//     testRunner(positiveAssertions, negativeAssertions, done);
// });

// test('pc function logs a string with json', (done) => {
//     const positiveAssertions = [`{ a: 'b' }`];
//     const negativeAssertions = [];
//     setTestHelperArguments({ value: `{ "a": "b" }` });
//     testRunner(positiveAssertions, negativeAssertions, done);
// });

const testRunner = (postiveAssertions, negativeAssertions, done, stripAnsi = true) => {
    // https://nikhilvijayan.com/testing-stdout-in-node-js-jest

    const testAppFilePath = path.join(__dirname, './testHelper.js');
    const testApp = spawn('node', [testAppFilePath]);
    const randomInt = Math.floor(Math.random() * 1000000);
    const testHelperCallsFilePath = path.join(__dirname, `./temp/testHelperCalls${randomInt}.json`);

    testApp.stdout.on('data', async (data) => {
        const finish = () => {
            testApp.kill('SIGINT');
            done();
        };
        let calls = { stdoutData: '', called: 0 };
        try {
            calls = JSON.parse(fs.readFileSync(testHelperCallsFilePath, 'utf8'));
        } catch (e) {}
        calls.stdoutData += data.toString();
        calls.called++;
        const iAmCallNumber = calls.called;
        fs.writeFileSync(testHelperCallsFilePath, JSON.stringify(calls));
        await sleep(6); // expect all console.log calls to be done
        try {
            calls = JSON.parse(fs.readFileSync(testHelperCallsFilePath, 'utf8'));
        } catch (e) {}
        if (calls.called > iAmCallNumber) return finish();

        if (stripAnsi) calls.stdoutData = calls.stdoutData.replace(/\u001b\[[0-9]{1,2}m/g, '');

        for (const assertion of postiveAssertions) expect(calls.stdoutData).toMatch(assertion);
        for (const assertion of negativeAssertions) expect(calls.stdoutData).not.toMatch(assertion);

        finish();
    });
};

function setTestHelperArguments(args) {
    fs.writeFileSync(path.join(__dirname, './testHelperArguments.json'), JSON.stringify(args));
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
