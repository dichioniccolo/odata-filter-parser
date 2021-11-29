import { Operators } from "../operators";
import { Parser } from "./Parser";

export class GreaterThanEqualParser extends Parser {
  static REGEX = /(.*) (ge) (datetimeoffset'(.*)'|(.*)|[0-9]*)/;

  constructor(protected value: string) {
    super(value, Operators.GREATER_THAN_EQUAL);
  }

  static isOfType(value: string) {
    return !!value.match(GreaterThanEqualParser.REGEX);
  }

  parse(previous: unknown) {
    const match = this.value.match(GreaterThanEqualParser.REGEX);

    if (!match) {
      return {};
    }

    const [, left, operator, right] = match;

    return this.createObject(previous, left, right);
  }
}
