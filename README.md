# OData Filter Parser

This library parses an odata complaint string and returns an object.

## Installation

Installation with npm
```bash
npm i @dichioniccolo/odata-filter-parser
```

Installation with yarn
```bash
yarn add @dichioniccolo/odata-filter-parser
```

## Usage

```typescript
import { parse } from '@dichioniccolo/odata-filter-parser'

const filter = "contains(a/b,'c') and contains(d/e, 'f') and g eq 1 and h eq false";

const parsed = parse(filter);

/*
The result will be an object like this:
{
  a: { b: { contains: "c" } },
  d: { e: { contains: "f" } },
  g: { equals: 1 },
  h: { equals: false },
}
*/
console.log(parsed);
```

Custom parsers can also be used. They will have precedence over builtin ones.
Every custom parser should extend from the Parser class provided by the package
```typescript
import { parse, Parser, Operators } from '@dichioniccolo/odata-filter-parser'

class DateParser extends Parser {
  // This is an example regex. A good regex would also check for the date based on the month.
  static DATE_REGEX =
    /(.*) (eq) ((19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])T\d{2}:\d{2}:\d{2}.\d{3}Z)/;

  constructor(protected value: string) {
    super(value, "");
  }

  static isOfType(value: string): boolean {
    return !!value.match(DateParser.DATE_REGEX);
  }

  parse(previous: unknown): Record<string, any> {
    const match = this.value.match(DateParser.DATE_REGEX);

    if (!match) {
      return {};
    }

    const [, left, operator, right] = match;

    const methods = [Operators.GREATER_THAN_EQUAL, Operators.LESS_THAN_EQUAL];
    const values = [right, `${right.substring(0, 10)}T23:59:59.999Z`];

    return this.setDeepValue(previous, this.leftValue(left), methods, values);
  }

  setDeepValue(
    obj: any,
    [prop, ...path]: Array<string>,
    methods: string[],
    values: string[]
  ) {
    if (!path.length) {
      methods.forEach((method, index) => {
        obj[prop] = {
          ...obj[prop],
          [method]: values[index],
        };
      });
    } else {
      if (!(prop in obj)) {
        obj[prop] = {};
      }

      this.setDeepValue(obj[prop], path, methods, values);
    }

    return obj;
  }
}

const filter = "createdAt eq 2021-11-29T00:00:00.000Z and contains(a,'string')";

const parsed = parse(filter, { DateParser });

/*
The result will be an object like this:
{
  createdAt: {
    gte: '2021-11-29T00:00:00.000Z',
    lte: '2021-11-29T23:59:59.999Z',
  },
  a: {
    contains: 'string'
  }
}
*/
console.log(parsed);
```

## Roadmap
[] Add all available operators

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.