import { filterTree } from "./filterTree";
import { n, TreeNode } from "./Tree";
import { NodeWithContext } from "./NodeWithContext";
import { sampleTree } from "./sample";

describe("filterTree", () => {
    it("returns all nodes if predicate always true", () => {
        const result = filterTree([sampleTree], () => true);
        expect(result).toEqual([sampleTree]);
    });

    it("returns empty array if predicate always false", () => {
        const result = filterTree([sampleTree], () => false);
        expect(result).toEqual([]);
    });

    it("filters out nodes by value", () => {
        const result = filterTree([sampleTree], ({ el }) => el !== 3);
        expect(result).toEqual([
            n(0, [
                n(1, [
                    n(2),
                    // n(3, [
                    //     n(4), //
                    //     n(5),
                    // ]),
                ]),
                n(6, [
                    n(7), //
                    n(8),
                ]),
            ])
        ]);
    });
});
