export class IterationUtility<T> {
    constructor(private makeIterable: () => Iterable<T>) {}

    /** Check if all elements satisfy the condition. */
    every(condition: (n: T) => boolean): boolean {
        for (const node of this.makeIterable()) {
            if (!condition(node)) {
                return false;
            }
        }
        return true;
    }

    /** Filter elements based on the condition. */
    filter(condition: (n: T) => boolean): T[] {
        const result: T[] = [];
        for (const node of this.makeIterable()) {
            if (condition(node)) {
                result.push(node);
            }
        }
        return result;
    }

    /** Find the first element that satisfies the condition. */
    find(condition: (n: T) => boolean): T | undefined {
        for (const node of this.makeIterable()) {
            if (condition(node)) {
                return node;
            }
        }
        return undefined;
    }

    /** Map each element to a new value. */
    flatMap<Result>(fn: (n: T) => Result[]): Result[] {
        const result: Result[] = [];
        for (const node of this.makeIterable()) {
            result.push(...fn(node));
        }
        return result;
    }

    /** Execute a function for each element. */
    forEach(fn: (n: T) => void): void {
        for (const node of this.makeIterable()) {
            fn(node);
        }
    }

    /** Map each element to a new value. */
    map<Result>(fn: (n: T) => Result): Result[] {
        const result: Result[] = [];
        for (const node of this.makeIterable()) {
            result.push(fn(node));
        }
        return result;
    }

    /** Reduce the elements to a single value. */
    reduce<Result>(fn: (acc: Result, n: T) => Result, initialValue: Result): Result {
        let accumulator = initialValue;
        for (const node of this.makeIterable()) {
            accumulator = fn(accumulator, node);
        }
        return accumulator;
    }

    /** Check if any element satisfies the condition. */
    some(condition: (n: T) => boolean): boolean {
        for (const node of this.makeIterable()) {
            if (condition(node)) {
                return true;
            }
        }
        return false;
    }

    /** Take the first n elements. */
    take(count: number): T[] {
        const result: T[] = [];
        let taken = 0;
        for (const node of this.makeIterable()) {
            if (taken < count) {
                result.push(node);
                taken++;
            } else {
                break;
            }
        }
        return result;
    }

    /** Take elements while the condition is satisfied. */
    takeWhile(condition: (n: T) => boolean): T[] {
        const result: T[] = [];
        for (const node of this.makeIterable()) {
            if (condition(node)) {
                result.push(node);
            } else {
                break;
            }
        }
        return result;
    }

    /** Convert the iterable to an array. */
    toArray(): T[] {
        return Array.from(this.makeIterable());
    }
}