import { Order, preOrder } from "./iterators";
import { TreeNode } from "./Tree";

/** Stringify the tree structure. */
export function stringifyTree<T>(nodes: TreeNode<T>[], stringifyElement: (el: T) => string, prefix = '|', depth = 0) {
    return preOrder(nodes, depth).map((node) => `${prefix.repeat(node.depth)} ${stringifyElement(node.el)}`).join('\n');
}
