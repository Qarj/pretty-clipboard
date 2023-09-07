# pretty-clipboard

Pretty print JSON like objects found in the clipboard to console.

Also dumps JSON found within strings recursively.

## Installation

```bash
npm install -g pretty-clipboard
```

## Usage

Say you have some JSON-like string in your clipboard among other text

```txt
Some text {'foo': "bar", name: null, count: 1234, bool: true, python: None, "Object": { inner: 1, test: 'string'} } more text
```

You can pretty print it to the console using inspect with

```bash
pc
```

Gives output

![output.png](./output.png)

To pretty print a correctly stringified JSON object, use `jc` instead (no colours)

```bash
jc
```

## Bonus

`uc` will unescape the clipboard contents (e.g. `\n` to newline, html entities, url encoded characters).

```bash
uc
```

Copy the following text to the clipboard and give it a go

```txt
\u2728Hello\u2728
%D1%88%D0%B5%D0%BB%D0%BB%D1%8B
%3Fx%3Dtest\nHello%20World
line1\nline2\nline3\ttabbed
test&amp;test &quot;hey&quot; &apos;there&apos;
```

## Notes for `pc` and `jc`

Repairs common JSON errors like single quotes, missing quotes, trailing commas, missing commas.

Also repairs quoted keys and values e.g. as used in Kibana logs.
