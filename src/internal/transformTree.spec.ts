import { transformTree } from "./transformTree";
import { n, TreeNode } from "./Tree";
import { NodeWithContext } from "./NodeWithContext";

describe("transformTree", () => {
    const tree1 = n(0, [
        n(1, [
            n(2),
            n(3),
        ]),
    ]);

    const tree2 = n(0, [
        n(6)
    ]);

    test('transforms a tree', () => {
        const result = transformTree< number,number>([tree1], ({ el, transformedChildren: mappedChildren }) => {
            if (el === 0) {
                return n(el, mappedChildren);
            } if (el === 1) {
                return n(Math.max(...mappedChildren?.map(child => child.el) ?? []));
            } else {
                return n(el * 2);
            }
        });
        expect(result).toEqual([tree2]);
    });
});