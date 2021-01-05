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
        e
          .toString()
          .includes("SyntaxError: Unexpected token { in JSON at position ")
      ) {
        position = parseInt(e.toString().substring(52));
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
JSONL.stringify = (lst) => {
  return lst
    .map((key) => {
      return JSON.stringify(key);
    })
    .join("\n");
};

if (typeof module !== 'undefined') {
  module.exports = JSONL;
}
