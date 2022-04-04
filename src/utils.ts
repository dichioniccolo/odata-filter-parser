import { Parser } from "./parsers/Parser";
import { Maybe } from "./types";

export function setDeepValue(
  obj: any,
  [prop, ...path]: Array<string>,
  method: string,
  value: unknown
) {
  if (!path.length) {
    obj[prop] = {
      [method]: value,
    };
  } else {
    if (!(prop in obj)) {
      obj[prop] = {};
    }

    setDeepValue(obj[prop], path, method, value);
  }

  return obj;
}

export function getParts(value: Maybe<string>): string[] | null {
  if (!value || value.trim().length === 0) {
    return null;
  }

  if (value.startsWith("(") && value.endsWith(")")) {
    value = value.substring(1, value.length - 1);
  }

  // TODO: Here we might want to include other operators like OR
  return value.split(" and ").map((v) => v.trim());
}

export function createInstance(
  instances: any,
  className: string,
  ...args: any[]
): Parser {
  return new (<any>instances)[className](...args);
}
