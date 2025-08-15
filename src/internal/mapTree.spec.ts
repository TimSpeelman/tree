import { mapTree } from "./mapTree";
import { sampleEl, sampleTree } from "./sample";
import { n, TreeNode } from "./Tree";

describe("mapTree", () => {
    type TestNode = TreeNode<number>;

    it("maps all nodes in a nested tree", () => {
        const result = mapTree([sampleTree], ({ el }) => el + 1);
        expect(result).toEqual([
            n(1, [
                n(2, [
                    n(3),
                    n(4, [
                        n(5), //
                        n(6),
                    ]),
                ]),
                n(7, [
                    n(8), //
                    n(9),
                ]),
            ])
        ]);
    });

    it("handles empty tree", () => {
        const result = mapTree([], ({ node }) => node.el);
        expect(result).toEqual([]);
    });

});