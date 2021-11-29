import { Operators } from "../operators";
import { Parser } from "./Parser";

export class LessThanEqualParser extends Parser {
  static REGEX = /(.*) (le) (datetimeoffset'(.*)'|(.*)|[0-9]*)/;

  constructor(protected value: string) {
    super(value, Operators.LESS_THAN_EQUAL);
  }

  static isOfType(value: string) {
    return !!value.match(LessThanEqualParser.REGEX);
  }

  parse(previous: unknown) {
    const match = this.value.match(LessThanEqualParser.REGEX);

    if (!match) {
      return {};
    }

    const [, left, operator, right] = match;

    return this.createObject(previous, left, right);
  }
}
