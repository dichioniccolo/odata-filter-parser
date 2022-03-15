import { Operators, parse } from "../src";

describe("OData Parser tests", () => {
  it("Null is not parsed", () => {
    expect(parse(null)).toBe(null);
  });

  it("Empty string is not parsed", () => {
    expect(parse("")).toBe(null);
  });

  it("Binary expression", () => {
    expect(parse("key eq value")).toStrictEqual({
      key: {
        [Operators.EQUALS]: "value",
      },
    });
  });

  it("Binary expression with string with spaces", () => {
    expect(parse("key eq value with spaces")).toStrictEqual({
      key: {
        [Operators.EQUALS]: "value with spaces",
      },
    });
  });

  it("Binary expression with a number value", () => {
    const obj: any = parse("key eq 5");

    expect(obj).toStrictEqual({
      key: {
        [Operators.EQUALS]: 5,
      },
    });
    expect(new Number(obj.key[Operators.EQUALS])).toBeTruthy();
    expect(obj.key[Operators.EQUALS]).toEqual(5);
  });

  it("Binary expression with a number value and parenthesis", () => {
    const obj: any = parse("(key eq 5)");

    expect(obj).toStrictEqual({
      key: {
        [Operators.EQUALS]: 5,
      },
    });
    expect(new Number(obj.key[Operators.EQUALS])).toBeTruthy();
    expect(obj.key[Operators.EQUALS]).toEqual(5);
  });

  it("Binary expressionw with a string containing parenthesis", () => {});
});
