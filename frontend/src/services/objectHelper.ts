import { ArrayHelper } from "./arrayHelper";

export interface ObjectHelperNormalizeOptions {
  shouldKeepNullValues: boolean;
  shouldKeepUndefinedValues: boolean;
  keySortingOrder?: (a: string, b: string) => number;
}

export class ObjectHelper {
  static deepCopy<O extends object>(object: O): O {
    return JSON.parse(JSON.stringify(object));
  }

  static normalize<O extends object>(
    object: O,
    partialOptions: Partial<ObjectHelperNormalizeOptions> = {}
  ): O {
    const options: ObjectHelperNormalizeOptions = {
      shouldKeepNullValues: true,
      shouldKeepUndefinedValues: false,
      keySortingOrder: null,
      ...partialOptions,
    };

    const normalized = {};

    let keys = Object.keys(object);
    if (options.keySortingOrder)
      keys = ArrayHelper.sort(keys, options.keySortingOrder);

    keys.forEach((key) => {
      const val = object[key];
      if (ObjectHelper.isUndefined(val) && !options.shouldKeepUndefinedValues)
        return;
      if (ObjectHelper.isNull(val) && !options.shouldKeepNullValues) return;
      normalized[key] = val;
    });

    return normalized as O;
  }

  static isNullOrUndefined(val: unknown): val is null | undefined {
    return ObjectHelper.isNull(val) || ObjectHelper.isUndefined(val);
  }

  static isNull(val: unknown): val is null {
    return val === null;
  }

  static isUndefined(val: unknown): val is undefined {
    return val === undefined;
  }

  static isObject<T = object>(input: unknown): input is T {
    function isObjectLike(value: unknown) {
      return typeof value === "object" && value !== null;
    }

    if (
      !isObjectLike(input) ||
      Object.prototype.toString.call(input) !== "[object Object]"
    ) {
      return false;
    }
    if (Object.getPrototypeOf(input) === null) {
      return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
  }
}
