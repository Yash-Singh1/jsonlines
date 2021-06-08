const JSONL = require('../index.js');

describe('Meta', function () {
  it('contains a valid name', function () {
    expect(JSONL.name).toBe('jsonlines');
  });
});

describe('Failure', function () {
  it('fails when there are trailing decimal point(s)', function () {
    expect(() => JSONL.parse('358953.')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('465.564.')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('42.22.45.')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('4245...')).toThrowError('Invalid JSONL');
  });

  it('fails when there are leading decimal point(s)', function () {
    expect(() => JSONL.parse('.358953')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('.465.564')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('.42.22.45')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('...4245')).toThrowError('Invalid JSONL');
  });

  it('fails when there are trailing comma(s)', function () {
    expect(() => JSONL.parse('{"a": "stuff", "b": "other stuff",}')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('{"a": "stuff", "b": "other stuff" ,}')).toThrowError('Invalid JSONL');
  });

  it('fails when there are no quotes', function () {
    expect(() => JSONL.parse('{"a": "stuff", "b": other stuff}')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('{"a": "stuff", b: "other stuff"}')).toThrowError('Invalid JSONL');
  });

  it('fails when there are single quotes', function () {
    expect(() => JSONL.parse('{"a": "stuff", "b": \'other stuff\'}')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('{"a": "stuff", \'b\': "other stuff"}')).toThrowError('Invalid JSONL');
  });

  it('fails when there are random stuff', function () {
    expect(() => JSONL.parse('this is not JSONL or JSON, then what is it...')).toThrowError('Invalid JSONL');
    expect(() => JSONL.parse('{}}')).toThrowError('Invalid JSONL');
  });
});
