import { parse } from "../src";
import { Operators } from "../src/operators";

test("it converts to to the correct value", () => {
  expect(parse("a le 1")).toStrictEqual({
    a: { [Operators.LESS_THAN_EQUAL]: 1 },
  });
  expect(parse("a le 0")).toStrictEqual({
    a: { [Operators.LESS_THAN_EQUAL]: 0 },
  });
});

test("it parses multiple lt", () => {
  expect(parse("a le 1")).toStrictEqual({
    a: { [Operators.LESS_THAN_EQUAL]: 1 },
  });
});

test("it creates a composite object", () => {
  expect(parse("a/b/c/d le 1")).toStrictEqual({
    a: {
      b: {
        c: {
          d: {
            [Operators.LESS_THAN_EQUAL]: 1,
          },
        },
      },
    },
  });
});
