import { parse } from "../src";
import { Operators } from "../src/operators";

test("it converts to to the correct value", () => {
  expect(parse("a ge string")).toStrictEqual({
    a: { [Operators.GREATER_THAN_EQUAL]: "string" },
  });
  expect(parse("a ge 1")).toStrictEqual({
    a: { [Operators.GREATER_THAN_EQUAL]: 1 },
  });
  expect(parse("a ge 0")).toStrictEqual({
    a: { [Operators.GREATER_THAN_EQUAL]: 0 },
  });
  expect(parse("a ge false")).toStrictEqual({
    a: { [Operators.GREATER_THAN_EQUAL]: false },
  });
  expect(parse("a ge true")).toStrictEqual({
    a: { [Operators.GREATER_THAN_EQUAL]: true },
  });
});

test("it parses multiple lt", () => {
  expect(parse("a ge 1 and b ge false")).toStrictEqual({
    a: { [Operators.GREATER_THAN_EQUAL]: 1 },
    b: { [Operators.GREATER_THAN_EQUAL]: false },
  });
});

test("it creates a composite object", () => {
  expect(parse("a/b/c/d ge 1")).toStrictEqual({
    a: {
      b: {
        c: {
          d: {
            [Operators.GREATER_THAN_EQUAL]: 1,
          },
        },
      },
    },
  });
});
