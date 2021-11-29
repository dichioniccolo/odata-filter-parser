import { Operators } from "../operators";
import { Parser } from "./Parser";

export class LessThanParser extends Parser {
  static REGEX = /(\w*) (lt) (datetimeoffset'(.*)'|(.*)|[0-9]*)/;

  constructor(protected value: string) {
    super(value, Operators.LESS_THAN);
  }

  static isOfType(value: string) {
    return !!value.match(LessThanParser.REGEX);
  }

  parse(previous: unknown) {
    const match = this.value.match(LessThanParser.REGEX);

    if (!match) {
      return {};
    }

    const [, left, operator, right] = match;

    return this.createObject(previous, left, right);
  }
}
