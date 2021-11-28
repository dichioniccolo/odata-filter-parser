import { createInstance, getParts } from "./utils";
import * as defaultParsers from "./parsers";
import { Parser } from "./parsers/Parser";

export function parse(
  value: string,
  customParsers: Record<string, typeof Parser> = {}
): any {
  return getParts(value).reduce((acc, part) => {
    // We want to give priority to the custom parsers
    for (const parser of Object.values(customParsers)) {
      if (parser.isOfType(part)) {
        const instance: Parser = new (<any>customParsers)[parser.name](part);

        return {
          ...acc,
          ...instance.parse(acc),
        };
      }
    }

    for (const parser of Object.values(defaultParsers)) {
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
