# jsonlines

[`JSONL`](https://jsonlines.org/) (JavaScript Object Notation Lines) is a shorter
way to write a list of JSON objects. This is a simple lightweight library built for
parsing and stringifying `JSONL`.

## Installation

Install from `npm`:

```sh
npm install --save @saiansh2525/jsonlines
```

### HTML

```html
<script src="node_modules/@saiansh2525/jsonlines/index.js"></script>
```

### NodeJS

```javascript
const JSONL = require('@saiansh2525/jsonlines');
```

## Docs

You can call `JSONL` functions and view strings through the `JSONL` object.

### JSONL.parse

To parse a string to a list, use `JSONL.parse`.
The only parameter is the string that has to be parsed.
It will return a list.
Error may occur on the scenario of invalid `JSONL` strings being passed in to parse.

### JSONL.stringify

To stringify a list into `JSONL`, use `JSONL.stringify`. The parameter is the list.
It will return a string of the list stringified.

### JSONL.name

The name of the library => `"jsonlines"`.

## Contributing

Contributions are welcome!
