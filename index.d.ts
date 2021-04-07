type jsonlinesResult = Array<object | null | string | number>;

interface jsonlines {
  parse(value: string): jsonlinesResult;
  stringify(parsed: jsonlinesResult): string;
  name: 'jsonlines';
}

declare const JSONL: jsonlines;
export default JSONL;
