import { Operators } from "./operators";
import * as defaultParsers from "./parsers";
import { Parser } from "./parsers/Parser";
import { Maybe } from "./types";
import { createInstance, getParts } from "./utils";

export { Parser, Operators };

export function parse(
  value: Maybe<string>,
  customParsers: Record<string, typeof Parser> = {}
): unknown {
  return (
    getParts(value)?.reduce((acc, part) => {
      const instances = { ...customParsers, ...defaultParsers };
      for (const parser of [
        // We want to give priority to the custom parsers if they exist
        ...Object.values(customParsers),
        ...Object.values(defaultParsers),
      ]) {
        if (!parser.isOfType(part)) {
          continue;
        }

        const instance = createInstance(instances, parser.name, part);

        if (typeof instance.parse !== "function") {
          return acc;
        }

        return {
          ...acc,
          ...instance.parse(acc),
        };
      }

      throw new Error("Type not valid or not yet implemented.");
    }, {}) ?? null
  );
}
