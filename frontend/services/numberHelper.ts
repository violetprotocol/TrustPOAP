export class NumberHelper {
  static max(a: number, b: number): number {
    return a > b ? a : b;
  }

  static min(a: number, b: number): number {
    return a > b ? b : a;
  }

  static isInClosedRange(n: number, [lower, upper]: [number, number]): boolean {
    if (upper < lower) throw Error(`Invalid closed range [${lower}, ${upper}]`);
    return lower <= n && n <= upper;
  };

  static isNumber(value: any): value is number {
    return typeof value === "number" && !Number.isNaN(value) && Number.isFinite(value);
  }

  static randomInClosedRange([lower, upper]: [number, number]): number {
    return Math.floor(lower + Math.random() * upper);
  }
}
