import { NodeWithContext } from "./NodeWithContext";
import { n, TreeNode } from "./Tree";

/** Map the elements of a tree, keeping the same structure. */
// TODO Make iterative
export function mapTree<A, B>(nodes: TreeNode<A>[], mapper: (context: NodeWithContext<A>) => B, depth = 0): TreeNode<B>[] {
    return nodes.map((node, index) => {
        return n(
            mapper({ node, el: node.el, depth, index, children: node.children ?? [], parent: undefined }),
            mapTree(node.children ?? [], mapper, depth + 1),
        );
    });
}
