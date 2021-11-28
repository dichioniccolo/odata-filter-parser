import { setDeepValue } from "../utils";

export abstract class Parser {
  static isOfType(value: string): boolean {
    return false;
  }

  constructor(protected value: string, private _method: string) {}

  get method() {
    return this._method;
  }

  abstract parse(previous: unknown): Record<string, any>;

  protected leftValue(value: string): string[] {
    return value.split("/");
  }

  protected rightValue(value: string): unknown {
    if (this.isBoolean(value)) {
      return value === "true";
    } else if (!isNaN(Number(value))) {
      return Number(value);
    }

    return String(value);
  }

  protected isBoolean(value: string): boolean {
    return value === "true" || value === "false";
  }

  protected createObject(previous: unknown, left: any, right: any) {
    return setDeepValue(
      previous ?? {},
      this.leftValue(left),
      this.method,
      this.rightValue(right)
    );
  }
}
