import { parse } from "../src";
import { Operators } from "../src/operators";

test("it converts to to the correct value", () => {
  expect(parse("a eq string")).toStrictEqual({
    a: { [Operators.EQUALS]: "string" },
  });
  expect(parse("a eq 1")).toStrictEqual({ a: { [Operators.EQUALS]: 1 } });
  expect(parse("a eq 0")).toStrictEqual({ a: { [Operators.EQUALS]: 0 } });
  expect(parse("a eq false")).toStrictEqual({
    a: { [Operators.EQUALS]: false },
  });
  expect(parse("a eq true")).toStrictEqual({
    a: { [Operators.EQUALS]: true },
  });
});

test("it parses multiple eq", () => {
  expect(parse("a eq 1 and b eq false")).toStrictEqual({
    a: { [Operators.EQUALS]: 1 },
    b: { [Operators.EQUALS]: false },
  });
});

test("it creates a composite object", () => {
  expect(parse("a/b/c/d eq 1")).toStrictEqual({
    a: {
      b: {
        c: {
          d: {
            [Operators.EQUALS]: 1,
          },
        },
      },
    },
  });
});
