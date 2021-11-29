import { Operators } from "../operators";
import { Parser } from "./Parser";

export class GreaterThanParser extends Parser {
  static REGEX = /(.*) (gt) (datetimeoffset'(.*)'|(.*)|[0-9]*)/;

  constructor(protected value: string) {
    super(value, Operators.GREATER_THAN);
  }

  static isOfType(value: string) {
    return !!value.match(GreaterThanParser.REGEX);
  }

  parse(previous: unknown) {
    const match = this.value.match(GreaterThanParser.REGEX);

    if (!match) {
      return {};
    }

    const [, left, operator, right] = match;

    return this.createObject(previous, left, right);
  }
}
