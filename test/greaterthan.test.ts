import { parse } from "../src";
import { Operators } from "../src/operators";

test("it converts to to the correct value", () => {
  expect(parse("a gt string")).toStrictEqual({
    a: { [Operators.GREATER_THAN]: "string" },
  });
  expect(parse("a gt 1")).toStrictEqual({ a: { [Operators.GREATER_THAN]: 1 } });
  expect(parse("a gt 0")).toStrictEqual({ a: { [Operators.GREATER_THAN]: 0 } });
  expect(parse("a gt false")).toStrictEqual({
    a: { [Operators.GREATER_THAN]: false },
  });
  expect(parse("a gt true")).toStrictEqual({
    a: { [Operators.GREATER_THAN]: true },
  });
});

test("it parses multiple lt", () => {
  expect(parse("a gt 1 and b gt false")).toStrictEqual({
    a: { [Operators.GREATER_THAN]: 1 },
    b: { [Operators.GREATER_THAN]: false },
  });
});

test("it creates a composite object", () => {
  expect(parse("a/b/c/d gt 1")).toStrictEqual({
    a: {
      b: {
        c: {
          d: {
            [Operators.GREATER_THAN]: 1,
          },
        },
      },
    },
  });
});
