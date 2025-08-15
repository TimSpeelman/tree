import { n } from "./Tree";

/** Tree used for testing purposes */
export const sampleTree = n(0, [
    n(1, [
        n(2),
        n(3, [
            n(4), //
            n(5),
        ]),
    ]),
    n(6, [
        n(7), //
        n(8),
    ]),
]);

export const sampleEl = [
    { el: 0, depth: 0, parent: undefined },
    { el: 1, depth: 1, parent: 0 },
    { el: 2, depth: 2, parent: 1 },
    { el: 3, depth: 2, parent: 1 },
    { el: 4, depth: 3, parent: 3 },
    { el: 5, depth: 3, parent: 3 },
    { el: 6, depth: 1, parent: 0 },
    { el: 7, depth: 2, parent: 6 },
    { el: 8, depth: 2, parent: 6 },
];