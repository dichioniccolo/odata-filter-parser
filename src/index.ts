import { createInstance, getParts } from "./utils";
import * as parsers from "./parsers";

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
