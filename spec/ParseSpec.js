const JSONL = require('../index.js');

describe('Parse single objects', function () {
  it('parses objects', function () {
    expect(JSONL.parse('{}')).toEqual([{}]);
    expect(JSONL.parse('{"a": "string"}')).toEqual([{ a: 'string' }]);
    expect(JSONL.parse('{"arr": [], "num": 456464.546, "str": "a totally super long string"}')).toEqual([
      {
        arr: [],
        num: 456464.546,
        str: 'a totally super long string'
      }
    ]);
  });

  it('parses arrays', function () {
    expect(JSONL.parse('[]')).toEqual([[]]);
    expect(JSONL.parse('[1, 2, 3, 3, 4]')).toEqual([[1, 2, 3, 3, 4]]);
    expect(JSONL.parse('[{"arr": [], "num": 456464.546, "str": "a totally super long string"}, null, "abc", 7]')).toEqual([
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
    ]);
  });

  it('parses numbers', function () {
    expect(JSONL.parse('54')).toEqual([54]);
    expect(JSONL.parse('87.89')).toEqual([87.89]);
    expect(JSONL.parse('67549569273462.4687412')).toEqual([67549569273462.4687412]);
  });

  it('parses strings', function () {
    expect(JSONL.parse('""')).toEqual(['']);
    expect(JSONL.parse('"hello world"')).toEqual(['hello world']);
    expect(JSONL.parse('"abc"')).toEqual(['abc']);
  });

  it('parses booleans', function () {
    expect(JSONL.parse('true')).toEqual([true]);
    expect(JSONL.parse('false')).toEqual([false]);
  });

  it('parses null', function () {
    expect(JSONL.parse('null')).toEqual([null]);
  });
});

describe('Parse multiple', function () {
  it('parses multiple objects', function () {
    expect(JSONL.parse('{}{}')).toEqual([{}, {}]);
    expect(JSONL.parse('{"a": "string"}\n{"b": "another string"}')).toEqual([{ a: 'string' }, { b: 'another string' }]);
    expect(
      JSONL.parse('{"arr": [], "num": 456464.546, "str": "a totally super long string"}{}\n\n\n{"long": "object", "not": true, "ha": null}')
    ).toEqual([
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
    ]);
  });

  it('parses multiple arrays', function () {
    expect(JSONL.parse('[][][]\n\n\n[]\n\n[]\n\t\t[]')).toEqual([[], [], [], [], [], []]);
    expect(JSONL.parse('[1, 2, 3, 3, 4]\n\n[null]')).toEqual([[1, 2, 3, 3, 4], [null]]);
    expect(JSONL.parse('[{"arr": [], "num": 456464.546, "str": "a totally super long string"}, null, "abc", 7][]\t  [5]')).toEqual([
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
    ]);
  });

  it('parses multiple numbers', function () {
    expect(JSONL.parse('5474')).toEqual([5474]);
    expect(JSONL.parse('87.89\t43')).toEqual([87.89, 43]);
    expect(JSONL.parse('67549569273462.4687412\n\t\n\t\t87.89\t43')).toEqual([67549569273462.4687412, 87.89, 43]);
  });

  it('parses multiple strings', function () {
    expect(JSONL.parse('""""""\n\n\n""\n\n""\n\t\t""')).toEqual(['', '', '', '', '', '']);
    expect(JSONL.parse('"hello world"\t"hello world 2"')).toEqual(['hello world', 'hello world 2']);
    expect(JSONL.parse('"abc"\n\n"another string"\n\n\t"alfheowyrt928rtreythrwjsf"')).toEqual(['abc', 'another string', 'alfheowyrt928rtreythrwjsf']);
  });

  it('parses multiple booleans', function () {
    expect(JSONL.parse('true\n\t\nfalse\n\n')).toEqual([true, false]);
    expect(JSONL.parse('false\n\n  \t\t\t\t true')).toEqual([false, true]);
  });

  it('parses multiple nulls', function () {
    expect(JSONL.parse('null\n\n\n\t\n\n\t\t\t\t null  \n\n\t\t\nnull')).toEqual([null, null, null]);
  });

  it('parses general', function () {
    var input1 = `{"name": "Gilbert", "wins": [["straight", "7♣"], ["one pair", "10♥"]]}
    {"name": "Alexa", "wins": [["two pair", "4♠"], ["two pair", "9♠"]]}
    {"name": "May", "wins": []}
    {"name": "Deloise", "wins": [["three of a kind", "5♣"]]}
{  
  "other unrelated": "stuff",
  "with random": "values",
  "such as": null,
  "and": 3748954.8042
}78 null`;
    var output2 = [
      {
        name: 'Gilbert',
        wins: [
          ['straight', '7♣'],
          ['one pair', '10♥']
        ]
      },
      {
        name: 'Alexa',
        wins: [
          ['two pair', '4♠'],
          ['two pair', '9♠']
        ]
      },
      { name: 'May', wins: [] },
      { name: 'Deloise', wins: [['three of a kind', '5♣']] },
      {
        'other unrelated': 'stuff',
        'with random': 'values',
        'such as': null,
        and: 3748954.8042
      },
      78,
      null
    ];
    expect(JSONL.parse(input1)).toEqual(output2);
  });
});
