import { Operators } from "../operators";
import { setDeepValue } from "../utils";
import { Parser } from "./Parser";

export class ContainsParser extends Parser {
  static REGEX = /^contains[(](.*),\s?'(.*)'[)]/;

  constructor(protected value: string) {
    super(value, Operators.CONTAINS);
  }

  static isOfType(value: string) {
    return !!value.match(this.REGEX);
  }

  parse(previous: unknown) {
    const match = this.value.match(ContainsParser.REGEX);

    if (!match) {
      return {};
    }

    const [, left, right] = match;

    return setDeepValue(previous, this.leftValue(left), this.method, right);
  }
}
