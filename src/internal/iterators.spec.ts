import { makeIterable, Order } from './iterators';
import { sampleEl, sampleTree } from './sample';
import { n } from './Tree';

describe('Iterators', () => {
    const tree = sampleTree;
    const [el0, el1, el2, el3, el4, el5, el6, el7, el8] = sampleEl;

    test('level-order', () => {
        const iterator = makeIterable([tree], Order.LEVEL);
        const values = Array.from(iterator).map(({ el, depth, parent }) => ({ el, depth, parent: parent?.el }));
        expect(values).toEqual([el0, el1, el6, el2, el3, el7, el8, el4, el5]);
    });

    test('pre-order', () => {
        const iterator = makeIterable([tree], Order.PRE);
        const values = Array.from(iterator).map(({ el, depth, parent }) => ({ el, depth, parent: parent?.el }));
        expect(values).toEqual([el0, el1, el2, el3, el4, el5, el6, el7, el8]);
    });

    test('post-order', () => {
        const iterator = makeIterable([tree], Order.POST);
        const values = Array.from(iterator).map(({ el, depth, parent }) => ({ el, depth, parent: parent?.el }));
        expect(values).toEqual([el2, el4, el5, el3, el1, el7, el8, el6, el0]);
    });

    test('level-order (reverse)', () => {
        const iterator = makeIterable([tree], Order.LEVEL_REV);
        const values = Array.from(iterator).map(({ el, depth, parent }) => ({ el, depth, parent: parent?.el }));
        // Children at each level are visited in reverse order
        expect(values).toEqual([el0, el6, el1, el8, el7, el3, el2, el5, el4]);
    });

    test('pre-order (reverse)', () => {
        const iterator = makeIterable([tree], Order.PRE_REV);
        const values = Array.from(iterator).map(({ el, depth, parent }) => ({ el, depth, parent: parent?.el }));
        // Children are visited in reverse order at each node
        expect(values).toEqual([el0, el6, el8, el7, el1, el3, el5, el4, el2]);
    });

    test('post-order (reverse)', () => {
        const iterator = makeIterable([tree], Order.POST_REV);
        const values = Array.from(iterator).map(({ el, depth, parent }) => ({ el, depth, parent: parent?.el }));
        // Children are visited in reverse order at each node
        expect(values).toEqual([el8, el7, el6, el5, el4, el3, el2, el1, el0]);
    });

    test('empty input', () => {
        expect(Array.from(makeIterable([], Order.LEVEL))).toEqual([]);
        expect(Array.from(makeIterable([], Order.PRE))).toEqual([]);
        expect(Array.from(makeIterable([], Order.POST))).toEqual([]);
    });

    test('single node', () => {
        const single = n(41);
        const expected = [{ node: single, el: 41, depth: 0, children: [], parent: undefined, index: 0 }];
        expect(Array.from(makeIterable([single], Order.LEVEL))).toEqual(expected);
        expect(Array.from(makeIterable([single], Order.PRE))).toEqual(expected);
        expect(Array.from(makeIterable([single], Order.POST))).toEqual(expected);
    });
});
