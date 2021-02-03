# jsonlines

[`JSONL`](https://jsonlines.org/) (JavaScript Object Notation Lines) is a shorter
way to write a list of JSON objects. This is a simple lightweight library built for
parsing and stringifying `JSONL`.

## Installation

The following are ways to install `jsonlines`:

### Locally

Run:

```bash
curl -o- https://raw.githubusercontent.com/Yash-Singh1/jsonlines/master/index.js > JSONL.js
```

Now you can import the library in:

#### NodeJS

```js
require("./JSONL.js");
```

#### HTML

```html
<script src="JSONL.js"></script>
```

### Remotely

To import the library live, add the following into your HTML:

#### HTML

```html
<script src="https://raw.githubusercontent.com/Yash-Singh1/jsonlines/master/index.js"></script>
```

#### NodeJS

You can send a request and then load it into your script.

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
