import { parse } from "../src";
import { Operators } from "../src/operators";

test("it converts to to the correct value", () => {
  expect(parse("a lt string")).toStrictEqual({
    a: { [Operators.LESS_THEN]: "string" },
  });
  expect(parse("a lt 1")).toStrictEqual({ a: { [Operators.LESS_THEN]: 1 } });
  expect(parse("a lt 0")).toStrictEqual({ a: { [Operators.LESS_THEN]: 0 } });
  expect(parse("a lt false")).toStrictEqual({
    a: { [Operators.LESS_THEN]: false },
  });
  expect(parse("a lt true")).toStrictEqual({
    a: { [Operators.LESS_THEN]: true },
  });
});

test("it parses multiple eq", () => {
  expect(parse("a lt 1 and b lt false")).toStrictEqual({
    a: { [Operators.LESS_THEN]: 1 },
    b: { [Operators.LESS_THEN]: false },
  });
});
