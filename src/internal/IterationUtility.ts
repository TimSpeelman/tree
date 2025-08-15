export class IterationUtility<T> {
    constructor(private makeIterable: () => Iterable<T>) {}

    every(condition: (n: T) => boolean): boolean {
        for (const node of this.makeIterable()) {
            if (!condition(node)) {
                return false;
            }
        }
        return true;
    }

    filter(condition: (n: T) => boolean): T[] {
        const result: T[] = [];
        for (const node of this.makeIterable()) {
            if (condition(node)) {
                result.push(node);
            }
        }
        return result;
    }

    find(condition: (n: T) => boolean): T | undefined {
        for (const node of this.makeIterable()) {
            if (condition(node)) {
                return node;
            }
        }
        return undefined;
    }

    flatMap<Result>(fn: (n: T) => Result[]): Result[] {
        const result: Result[] = [];
        for (const node of this.makeIterable()) {
            result.push(...fn(node));
        }
        return result;
    }

    forEach(fn: (n: T) => void): void {
        for (const node of this.makeIterable()) {
            fn(node);
        }
    }

    map<Result>(fn: (n: T) => Result): Result[] {
        const result: Result[] = [];
        for (const node of this.makeIterable()) {
            result.push(fn(node));
        }
        return result;
    }

    reduce<Result>(fn: (acc: Result, n: T) => Result, initialValue: Result): Result {
        let accumulator = initialValue;
        for (const node of this.makeIterable()) {
            accumulator = fn(accumulator, node);
        }
        return accumulator;
    }

    some(condition: (n: T) => boolean): boolean {
        for (const node of this.makeIterable()) {
            if (condition(node)) {
                return true;
            }
        }
        return false;
    }

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

    toArray(): T[] {
        return Array.from(this.makeIterable());
    }
}