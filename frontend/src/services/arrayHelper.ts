import { NumberHelper } from "./numberHelper";
import { ObjectHelper } from "./objectHelper";

export type NestedArray<T> = Array<NestedArray<T> | T>;

export class ArrayHelper {
  // @TODO: Add option for deep copy; default to shallow
  static reverse<T>(array: T[]): T[] {
    array = ObjectHelper.deepCopy(array);
    return array.reverse();
  }

  // @TODO: Add option for deep copy; default to shallow
  static sort<T>(array: T[], comparisonFn: (a: T, b: T) => number): T[] {
    array = ObjectHelper.deepCopy(array);
    return array.sort(comparisonFn);
  }

  // @TODO: Add option for deep copy; default to shallow
  // https://stackoverflow.com/a/2450976
  static shuffle<T>(array: T[]): T[] {
    array = ObjectHelper.deepCopy(array);
    let currentIndex = array.length;
    let randomIndex: number;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  static sampleIndex<T>(array: T[]): number | null {
    if (array.length === 0) return null;
    return NumberHelper.randomInClosedRange([0, array.length-1]);
  }

  static sample<T>(array: T[]): T | null {
    if (array.length === 0) return null;
    const index = this.sampleIndex(array);
    return array[index];
  }

  static min(array: number[]): number | null {
    if (array.length === 0) return null;
    return Math.min.apply(Math, array);
  }

  static max(array: number[]): number | null {
    if (array.length === 0) return null;
    return Math.max.apply(Math, array);
  }

  static filterNullOrUndefined<T>(array: Array<T | null | undefined>): T[] {
    return array.filter(ArrayHelper.nonNullOrUndefinedPredicate);
  }

  static flatten<T>(array: NestedArray<T>): T[] {
    return array.reduce((acc: T[], value) => {
      return acc.concat(
        Array.isArray(value) ? ArrayHelper.flatten(value) : [value]
      )
    }, []) as T[]; // Typecast needed because TypeScript gets confused
  }

  /** @Returns Array of unique values */
  static unique<T>(array: T[]): T[] {
    return array.filter(ArrayHelper.uniquePredicate);
  }

  /** Function to be passed to the `Array.filter` function to produce an array of unique values */
  static uniquePredicate<T>(value: T, index: number, array: T[]): boolean {
    return array.indexOf(value) === index;
  }

  /** Function to be passed to the `Array.filter` function to produce an array of non-null and non-undefined values */
  static nonNullOrUndefinedPredicate<T>(value: T, index: number, array: T[]): boolean {
    return !ObjectHelper.isNullOrUndefined(value)
  }
}
