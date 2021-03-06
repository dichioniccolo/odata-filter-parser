import { parse } from "../src";
import { Operators } from "../src/operators";
import { Parser } from "../src/parsers/Parser";

class DateParser extends Parser {
  static DATE_REGEX =
    /(.*) (eq) ((19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])T\d{2}:\d{2}:\d{2}.\d{3}Z)/;

  constructor(protected value: string) {
    super(value, "");
  }

  static isOfType(value: string): boolean {
    return !!value.match(DateParser.DATE_REGEX);
  }

  parse(previous: unknown): Record<string, any> {
    const match = this.value.match(DateParser.DATE_REGEX);

    if (!match) {
      return {};
    }

    const [, left, operator, right] = match;

    const methods = [Operators.GREATER_THAN_EQUAL, Operators.LESS_THAN_EQUAL];
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
    parse("test/createdAt eq 2021-11-29T00:00:00.000Z", { DateParser })
  ).toStrictEqual({
    test: {
      createdAt: {
        [Operators.GREATER_THAN_EQUAL]: "2021-11-29T00:00:00.000Z",
        [Operators.LESS_THAN_EQUAL]: "2021-11-29T23:59:59.999Z",
      },
    },
  });
});
