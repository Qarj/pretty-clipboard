# pretty-clipboard

Pretty print the clipboard to console

## Installation

```bash
npm install -g pretty-clipboard
```

## Usage

Say you have some JSON-like string in your clipboard among other text

```txt
Some text {'foo': "bar", name: null, count: 1234, bool: true, python: None, "Object": { inner: 1, test: 'string'} } more text
```

You can pretty print it to the console with

```bash
pc
```

Gives output

![output.png](./output.png)
