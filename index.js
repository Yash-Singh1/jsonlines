/**
 * @file The main source code for JSONL
 * @author Yash-Singh1
 */

var JSONL = {};

/**
 * @type {!string}
 * @const
 */
JSONL.name = "JSONL";

/**
 * Parse JSONL
 * @param {string} jsonl The string that has to be parsed
 * @returns {object} An object that contains the parsed string
 * @function
 */
JSONL.parse = (jsonl) => {
  let input = "[" + jsonl + "]";
  let error = false;
  let position;
  while (true) {
    try {
      JSON.parse(input);
    } catch (e) {
      error = true;
      if (
      	/^SyntaxError: Unexpected (string|token [{n\[]) in JSON at position \d+/.test(e.toString())
      ) {
        position = parseInt(/JSON.*?(\d+)/.exec(e.toString())[1]);
        input = [input.slice(0, position), ",", input.slice(position)].join("");
      } else {
        throw "Invalid JSONL";
      }
    }
    if (error == true) {
      error = false;
    } else {
      break;
    }
  }
  return JSON.parse(input);
};

/**
 * Stringify any list to JSONL
 * @param {Object[]} lst
 * @returns {string} The string form of the list in JSONL
 * @function
 */
JSONL.stringify = (lst, ...jsonArgs) => {
  return lst
    .map((key) => {
      return JSON.stringify(key, ...jsonArgs);
    })
    .join("\n");
};

if (typeof module !== 'undefined') {
  module.exports = JSONL;
}
