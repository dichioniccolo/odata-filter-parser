import { createInstance, getParts } from "./utils";
import * as defaultParsers from "./parsers";
import { Parser } from "./parsers/Parser";

export const parsers: any[] = [
  defaultParsers.ContainsParser,
  defaultParsers.EqualsParser,
  defaultParsers.LessThanParser,
];

export function addParser(parser: typeof Parser) {
  parsers.push(parser);
}

export function parse(value: string): any {
  return getParts(value).reduce((acc, part) => {
    for (const parser of Object.values(parsers)) {
      if (parser.isOfType(part)) {
        const instance = createInstance(parser.name, part);

        return {
          ...acc,
          ...instance.parse(acc),
        };
      }
    }

    throw new Error("Type not valid or not yet implemented.");
  }, {});
}
