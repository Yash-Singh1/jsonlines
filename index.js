/**
 * @file The main source code for JSONL
 * @author Yash-Singh1
 */

var JSONL = {};

/**
 * @type {string}
 * @const
 */
JSONL.name = 'jsonlines';

/**
 * Parse JSONL
 * @param {string} jsonl The string that has to be parsed
 * @returns {*[]} The output from parsing the JSONL
 * @function
 */
JSONL.parse = (jsonl) => {
  const chromiumErrorParseReg = /^SyntaxError: Unexpected (?:string|token [{n\[]) in JSON at position (\d+)/;
  const mozillaErrorParseReg = /SyntaxError: JSON.parse: expected ',' or ']' after array element at line (\d+) column (\d+) of the JSON data/;
  const invalidNumberErrorParseReg = /SyntaxError: Unexpected number in JSON at position (\d+)/;
  let input = '[' + jsonl + ']';
  let error = false;
  while (true) {
    try {
      JSON.parse(input);
    } catch (e) {
      eString = e.toString();
      error = true;
      if (chromiumErrorParseReg.test(eString)) {
        position = parseInt(chromiumErrorParseReg.exec(eString)[1]);
        input = [input.slice(0, position), ',', input.slice(position)].join('');
      } else if (mozillaErrorParseReg.test(eString)) {
        match = mozillaErrorParseReg.exec(eString);
        position = input.split('\n', parseInt(match[1]) - 1).join('').length + parseInt(match[2]);
        input = [input.slice(0, position - 1), ',', input.slice(position - 1)].join('');
      } else if (invalidNumberErrorParseReg.test(eString)) {
        position = parseInt(invalidNumberErrorParseReg.exec(eString)[1])
        input = [input.slice(0, position), ',', input.slice(position)].join('');
      } else {
        throw new Error('Invalid JSONL');
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
 * @param {*[]} lst The list to stringify
 * @returns {string} The string form of the list in JSONL
 * @function
 */
JSONL.stringify = (lst, replacer, space) => {
  return lst
    .map((key) => {
      return JSON.stringify(key, replacer, space);
    })
    .join('\n');
};

if (typeof module !== 'undefined') {
  module.exports = JSONL;
}
