import { parse } from "../src";
import { Operators } from "../src/operators";

test("it parses one contains", () => {
  expect(parse("contains(a/b, 'c')")).toStrictEqual({
    a: { b: { [Operators.CONTAINS]: "c" } },
  });
});

test("it parses multiple contains", () => {
  expect(parse("contains(a/b,'c') and contains(d/e, 'f')")).toStrictEqual({
    a: { b: { [Operators.CONTAINS]: "c" } },
    d: { e: { [Operators.CONTAINS]: "f" } },
  });
});
