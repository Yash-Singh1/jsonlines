const JSONL = require('../index.js');

describe('Stringify', function () {
  it('stringifies objects', function () {
    expect(JSONL.stringify([{}])).toEqual('{}');
    expect(JSONL.stringify([{ a: 'string' }])).toEqual('{"a":"string"}');
    expect(
      JSONL.stringify([
        {
          arr: [],
          num: 456464.546,
          str: 'a totally super long string'
        }
      ])
    ).toEqual('{"arr":[],"num":456464.546,"str":"a totally super long string"}');
    expect(JSONL.stringify([{}, {}])).toEqual('{}\n{}');
    expect(JSONL.stringify([{ a: 'string' }, { b: 'another string' }])).toEqual('{"a":"string"}\n{"b":"another string"}');
    expect(
      JSONL.stringify([
        {
          arr: [],
          num: 456464.546,
          str: 'a totally super long string'
        },
        {},
        {
          long: 'object',
          not: true,
          ha: null
        }
      ])
    ).toEqual('{"arr":[],"num":456464.546,"str":"a totally super long string"}\n{}\n{"long":"object","not":true,"ha":null}');
  });

  it('stringifies arrays', function () {
    expect(JSONL.stringify([[]])).toEqual('[]');
    expect(JSONL.stringify([[1, 2, 3, 3, 4]])).toEqual('[1,2,3,3,4]');
    expect(
      JSONL.stringify([
        [
          {
            arr: [],
            num: 456464.546,
            str: 'a totally super long string'
          },
          null,
          'abc',
          7
        ]
      ])
    ).toEqual('[{"arr":[],"num":456464.546,"str":"a totally super long string"},null,"abc",7]');
    expect(JSONL.stringify([[], [], [], [], [], []])).toEqual('[]\n[]\n[]\n[]\n[]\n[]');
    expect(JSONL.stringify([[1, 2, 3, 3, 4], [null]])).toEqual('[1,2,3,3,4]\n[null]');
    expect(
      JSONL.stringify([
        [
          {
            arr: [],
            num: 456464.546,
            str: 'a totally super long string'
          },
          null,
          'abc',
          7
        ],
        [],
        [5]
      ])
    ).toEqual('[{"arr":[],"num":456464.546,"str":"a totally super long string"},null,"abc",7]\n[]\n[5]');
  });

  it('stringifies numbers', function () {
    expect(JSONL.stringify([54])).toEqual('54');
    expect(JSONL.stringify([87.89])).toEqual('87.89');
    expect(JSONL.stringify([67549569273462.47])).toEqual('67549569273462.47');
    expect(JSONL.stringify([5474])).toEqual('5474');
    expect(JSONL.stringify([87.89, 43])).toEqual('87.89\n43');
    expect(JSONL.stringify([67549569273462.47, 87.89, 43])).toEqual('67549569273462.47\n87.89\n43');
  });

  it('stringifies strings', function () {
    expect(JSONL.stringify([''])).toEqual('""');
    expect(JSONL.stringify(['hello world'])).toEqual('"hello world"');
    expect(JSONL.stringify(['abc'])).toEqual('"abc"');
    expect(JSONL.stringify(['', '', '', '', '', ''])).toEqual('""\n""\n""\n""\n""\n""');
    expect(JSONL.stringify(['hello world', 'hello world 2'])).toEqual('"hello world"\n"hello world 2"');
    expect(JSONL.stringify(['abc', 'another string', 'alfheowyrt928rtreythrwjsf'])).toEqual('"abc"\n"another string"\n"alfheowyrt928rtreythrwjsf"');
  });

  it('stringifies booleans', function () {
    expect(JSONL.stringify([true])).toEqual('true');
    expect(JSONL.stringify([false])).toEqual('false');
    expect(JSONL.stringify([true, false])).toEqual('true\nfalse');
    expect(JSONL.stringify([false, true])).toEqual('false\ntrue');
  });

  it('stringifies null', function () {
    expect(JSONL.stringify([null])).toEqual('null');
    expect(JSONL.stringify([null, null, null])).toEqual('null\nnull\nnull');
  });
});

describe('Stringify extra arguments', function () {
  it('accepts 3 arguments', function () {
    expect(JSONL.stringify.length).toEqual(3);
  });

  it('passes the arguments to JSON.stringify', function () {
    function expectMatch(outerReplacer, outerSpace) {
      const cacheJSONStringify = JSON.stringify.bind({});
      JSON.stringify = function (value, replacer, space) {
        expect(replacer).toEqual(outerReplacer);
        expect(space).toEqual(outerSpace);
      };
      JSONL.stringify([], outerReplacer, outerSpace);
      JSON.stringify = cacheJSONStringify;
    }

    expectMatch(() => {});
    expectMatch(function (key, value) {
      return key;
    });
    expectMatch(null, 4);
    expectMatch(() => 'abc', '\t');
  });
});
