import { parse } from "../src";
import { Parser } from "../src/parsers/Parser";

class DateParser extends Parser {
  static DATE_REGEX =
    /(\w*) (eq) (?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-|\.)(?:0?[13578]|1[02])\3(?:31))|(?:(\/|-|\.)(?:0?[13-9]|1[0-2])\4(?:29|30)))$|(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)0?2\5(?:29)$|(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\6(?:0?[1-9]|1\d|2[0-8])T00:00:00.000Z$/m;
  static FIELD_REGEX = /(\w*)/;

  constructor(protected value: string) {
    super(value, "");
  }

  static isOfType(value: string): boolean {
    return !!value.match(DateParser.DATE_REGEX);
  }

  parse(previous: unknown): Record<string, any> {
    const field = this.value.match(DateParser.FIELD_REGEX);
    const date = this.value.match(DateParser.DATE_REGEX);

    if (!field || !date) {
      return {};
    }

    const [, left] = field;
    const [right] = date;

    const methods = ["gte", "lte"];
    const values = [right, `${right.substring(0, 10)}T23:59:59.999Z`];

    return this.setDeepValue(previous, this.leftValue(left), methods, values);
  }

  setDeepValue(
    obj: any,
    [prop, ...path]: Array<string>,
    methods: string[],
    values: string[]
  ) {
    if (!path.length) {
      methods.forEach((method, index) => {
        obj[prop] = {
          ...obj[prop],
          [method]: values[index],
        };
      });
    } else {
      if (!(prop in obj)) {
        obj[prop] = {};
      }

      this.setDeepValue(obj[prop], path, methods, values);
    }

    return obj;
  }
}

test("parses the data with the new custom parser", () => {
  expect(
    parse("createdAt eq 2021-11-27T00:00:00.000Z", { DateParser })
  ).toStrictEqual({
    createdAt: {
      gte: "2021-11-27T00:00:00.000Z",
      lte: "2021-11-27T23:59:59.999Z",
    },
  });
});
