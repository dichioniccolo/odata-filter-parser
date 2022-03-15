import { Operators } from "../operators";
import { Parser } from "./Parser";

export class EqualsParser extends Parser {
  static REGEX = /(.*) (eq) (datetimeoffset'(.*)'|(.*)|[0-9]*)/;

  constructor(protected value: string) {
    super(value, Operators.EQUALS);
  }

  static isOfType(value: string) {
    return !!value.match(EqualsParser.REGEX);
  }

  parse(previous: unknown) {
    const match = this.value.match(EqualsParser.REGEX);

    if (!match) {
      return {};
    }

    const [, left, , right] = match;

    return this.createObject(previous, left, right);
  }
}
