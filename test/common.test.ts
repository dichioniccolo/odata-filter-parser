import { parse } from "../src";
import { Operators } from "../src/operators";

test("it parses combined operators", () => {
  expect(
    parse("contains(a/b,'c') and contains(d/e, 'f') and g eq 1 and h eq false")
  ).toStrictEqual({
    a: { b: { [Operators.CONTAINS]: "c" } },
    d: { e: { [Operators.CONTAINS]: "f" } },
    g: { [Operators.EQUALS]: 1 },
    h: { [Operators.EQUALS]: false },
  });
});

test("it composes an object if keys are multiple", () => {
  expect(parse("contains(a/b,'c') and contains(a/e, 'f')")).toStrictEqual({
    a: { b: { [Operators.CONTAINS]: "c" }, e: { [Operators.CONTAINS]: "f" } },
  });
});
