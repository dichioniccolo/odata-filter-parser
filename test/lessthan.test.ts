import { parse } from "../src";
import { Operators } from "../src/operators";

test("it converts to to the correct value", () => {
  expect(parse("a lt string")).toStrictEqual({
    a: { [Operators.LESS_THAN]: "string" },
  });
  expect(parse("a lt 1")).toStrictEqual({ a: { [Operators.LESS_THAN]: 1 } });
  expect(parse("a lt 0")).toStrictEqual({ a: { [Operators.LESS_THAN]: 0 } });
  expect(parse("a lt false")).toStrictEqual({
    a: { [Operators.LESS_THAN]: false },
  });
  expect(parse("a lt true")).toStrictEqual({
    a: { [Operators.LESS_THAN]: true },
  });
});

test("it parses multiple lt", () => {
  expect(parse("a lt 1 and b lt false")).toStrictEqual({
    a: { [Operators.LESS_THAN]: 1 },
    b: { [Operators.LESS_THAN]: false },
  });
});

test("it creates a composite object", () => {
  expect(parse("a/b/c/d lt 1")).toStrictEqual({
    a: {
      b: {
        c: {
          d: {
            [Operators.LESS_THAN]: 1,
          },
        },
      },
    },
  });
});
