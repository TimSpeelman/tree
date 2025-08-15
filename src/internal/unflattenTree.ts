import { TreeNode } from './Tree';

/**
 * Turns a flat tree into a tree representation.
 * @param flatNodes The nodes to construct the tree of, in pre-order.
 * @param emptyElement The element to use for empty nodes.
 * @returns The tree.
 */
export function unflattenTree<T>(flatNodes: FlatTreeNode<T>[], emptyElement: T): TreeNode<T>[] {
    const rootNodes: TreeNode<T>[] = [];
    let levels: TreeNode<T>[] = [];

    for (let i = 0; i < flatNodes.length; i++) {
        const flatNode = flatNodes[i];
        const treeNode = { el: flatNode.el };
        const level = flatNode.depth;

        if (level < 0) {
            throw new Error('Invalid depth: ' + level);
        }

        // Only keep parents: toss all nodes that are deeper than or equal to the current level
        levels = levels.slice(0, level);

        // Create empty nodes if necessary
        for (let j = 0; j < level; j++) {
            if (!levels[j]) {
                levels[j] = { el: emptyElement };

                if (j === 0) {
                    rootNodes.push(levels[j]);
                } else {
                    const parent = levels[j - 1];
                    parent.children = (parent.children ?? []).concat(levels[j]);
                }
            }
        }

        // Keep this element at the current level
        levels[level] = treeNode;

        if (level === 0) {
            rootNodes.push(treeNode);
        } else {
            const parent = levels[level - 1];

            // Add the current node to the parent
            parent.children = (parent.children ?? []).concat(treeNode);
        }
    }

    return rootNodes;
}

/** Flat representation of tree nodes */
interface FlatTreeNode<T> {
    el: T;
    depth: number;
}
