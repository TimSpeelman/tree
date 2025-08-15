import { IterationUtility } from './IterationUtility';

describe('IterationUtility<number>', () => {
    const numbers = [1, 2, 3, 4, 5];
    const util = new IterationUtility<number>(() => numbers);

    test('every returns true if all match', () => {
        expect(util.every(n => n > 0)).toBe(true);
    });

    test('every returns false if any do not match', () => {
        expect(util.every(n => n < 5)).toBe(false);
    });

    test('filter returns matching elements', () => {
        expect(util.filter(n => n % 2 === 0)).toEqual([2, 4]);
    });

    test('find returns first matching element', () => {
        expect(util.find(n => n > 3)).toBe(4);
    });

    test('find returns undefined if none match', () => {
        expect(util.find(n => n > 10)).toBeUndefined();
    });

    test('flatMap flattens mapped iterables', () => {
        const result = Array.from(util.flatMap(n => [n, n * 10]));
        expect(result).toEqual([1, 10, 2, 20, 3, 30, 4, 40, 5, 50]);
    });

    test('forEach applies function to each element', () => {
        const arr: number[] = [];
        util.forEach(n => arr.push(n * 2));
        expect(arr).toEqual([2, 4, 6, 8, 10]);
    });

    test('map maps each element', () => {
        const result = Array.from(util.map(n => n + 1));
        expect(result).toEqual([2, 3, 4, 5, 6]);
    });

    test('reduce reduces to a single value', () => {
        const sum = util.reduce((acc, n) => acc + n, 0);
        expect(sum).toBe(15);
    });

    test('some returns true if any match', () => {
        expect(util.some(n => n === 3)).toBe(true);
    });

    test('some returns false if none match', () => {
        expect(util.some(n => n > 10)).toBe(false);
    });

    test('take returns first n elements', () => {
        const result = Array.from(util.take(3));
        expect(result).toEqual([1, 2, 3]);
    });

    test('take returns all if count exceeds length', () => {
        const result = Array.from(util.take(10));
        expect(result).toEqual(numbers);
    });

    test('takeWhile returns elements while condition is true', () => {
        const result = Array.from(util.takeWhile(n => n < 4));
        expect(result).toEqual([1, 2, 3]);
    });

    test('takeWhile returns empty if first does not match', () => {
        const u = new IterationUtility(() => [5, 6, 7]);
        const result = Array.from(u.takeWhile(n => n < 5));
        expect(result).toEqual([]);
    });

    test('toArray returns all elements as array', () => {
        expect(util.toArray()).toEqual(numbers);
    });

    test('works with empty iterable', () => {
        const emptyUtil = new IterationUtility<number>(() => []);
        expect(emptyUtil.every(() => false)).toBe(true);
        expect(emptyUtil.filter(() => true)).toEqual([]);
        expect(emptyUtil.find(() => true)).toBeUndefined();
        expect(Array.from(emptyUtil.flatMap(n => [n]))).toEqual([]);
        expect(() => emptyUtil.forEach(() => {})).not.toThrow();
        expect(Array.from(emptyUtil.map(n => n))).toEqual([]);
        expect(emptyUtil.reduce((acc, n) => acc + n, 0)).toBe(0);
        expect(emptyUtil.some(() => true)).toBe(false);
        expect(Array.from(emptyUtil.take(2))).toEqual([]);
        expect(Array.from(emptyUtil.takeWhile(() => true))).toEqual([]);
        expect(emptyUtil.toArray()).toEqual([]);
    });
});