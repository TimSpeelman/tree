import { Order, preOrder } from "./iterators";
import { TreeNode } from "./Tree";

export function printTree<T>(nodes: TreeNode<T>[], toString: (el: T) => string, prefix = '|', depth = 0) {
    return preOrder(nodes, depth).map((node) => `${prefix.repeat(node.depth)} ${toString(node.el)}`).join('\n');
}
