import * as handlers from "./parsers";
import { Parser } from "./parsers/Parser";

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
  // if (objectKeys.length === 1) {
  //   obj[objectKeys[0]] = {
  //     [method]: value,
  //   };
  // } else {
  //   const key = objectKeys.shift();
  //   if (key) {
  //     obj[key] = setDeepValue(
  //       !(key in obj) ? {} : obj[key],
  //       objectKeys,
  //       method,
  //       value
  //     );
  //   }
  // }

  // return obj;
}

export function getParts(value: string): string[] {
  if (value.startsWith("(") && value.endsWith(")")) {
    value = value.substr(1, value.length - 2);
  }

  // TODO: Here we might want to include other operators like OR
  return value.split("and").map((v) => v.trim());
}

export function createInstance(className: string, ...args: any[]): Parser {
  return new (<any>handlers)[className](...args);
}
