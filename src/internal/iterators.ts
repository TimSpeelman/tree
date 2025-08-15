import { IterationUtility } from "./IterationUtility";
import { NodeWithContext } from "./NodeWithContext";
import { TreeNode } from "./Tree";

/** Traversal orders. */
export enum Order {
    /** Level order: start with all items from level 0, then all from level 1 and so on */
    LEVEL,
    /** Pre-order: start with the root, then all items from the left subtree, then all from the right subtree */
    PRE,
    /** Post-order: start with all items from the left subtree, then all from the right subtree, then the root */
    POST,
    /** Reverse level order: start with all items from level 0 in reverse order, then all from level 1 in reverse order, and so on */
    LEVEL_REV,
    /** Reverse pre-order: start with the root, then all items from the right subtree, then all from the left subtree */
    PRE_REV,
    /** Reverse post-order: start with all items from the right subtree, then all from the left subtree, then the root */
    POST_REV
};

/** Create iterator of nodes in level order. */
export function levelOrder<El>(nodes: TreeNode<El>[], depth = 0 ) {
    return new IterationUtility<NodeWithContext<El>>(() => makeLevelOrderIterable(nodes, depth));
}

/** Create iterator of nodes in pre-order. */
export function preOrder<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makePreOrderIterable(nodes, depth));
}

/** Create iterator of nodes in post-order. */
export function postOrder<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makePostOrderIterable(nodes, depth));
}

/** Create iterator of nodes in reverse level order. */
export function levelOrderRev<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makeLevelOrderIterable(nodes, depth, true));
}

/** Create iterator of nodes in reverse pre-order. */
export function preOrderRev<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makePreOrderIterable(nodes, depth, true));
}

/** Create iterator of nodes in reverse post-order. */
export function postOrderRev<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makePostOrderIterable(nodes, depth, true));
}

/** Create iterator of nodes in the specified order. */
export function makeIterable<El>(
    nodes: TreeNode<El>[],
    order: Order,
    depth = 0,
): Iterable<NodeWithContext<El>> {
    switch (order) {
        case Order.LEVEL:
            return makeLevelOrderIterable(nodes, depth, false);
        case Order.PRE:
            return makePreOrderIterable(nodes, depth, false);
        case Order.POST:
            return makePostOrderIterable(nodes, depth, false);
        case Order.LEVEL_REV:
            return makeLevelOrderIterable(nodes, depth, true);
        case Order.PRE_REV:
            return makePreOrderIterable(nodes, depth, true);
        case Order.POST_REV:
            return makePostOrderIterable(nodes, depth, true);
    }
}

function* makeLevelOrderIterable<El>(
    nodes: TreeNode<El>[],
    depth = 0,
    reverse = false
): Iterable<NodeWithContext<El>> {
    const queue: Array<{ node: TreeNode<El>; depth: number; parent: TreeNode<El> | undefined; index: number; }> = [];
    for (let i = 0; i < nodes.length; i++) {
        queue.push({ node: nodes[i], depth, parent: undefined, index: i });
    }
    while (queue.length) {
        const current = queue.shift()!;
        const { node, depth, parent, index } = current;
        yield {
            node,
            el: node.el,
            depth,
            children: node.children ?? [],
            parent,
            index
        };
        if (node.children) {
            const children = reverse
                ? [...node.children].reverse()
                : node.children;
            for (let i = 0; i < children.length; i++) {
                queue.push({
                    node: children[i],
                    depth: depth + 1,
                    parent: node,
                    index: reverse ? children.length - 1 - i : i
                });
            }
        }
    }
}

function* makePreOrderIterable<El>(
    nodes: TreeNode<El>[],
    depth = 0,
    reverse = false
): Iterable<NodeWithContext<El>> {
    const stack: Array<{ node: TreeNode<El>; depth: number; parent: TreeNode<El> | undefined; index: number; }> = [];
    for (let i = nodes.length - 1; i >= 0; i--) {
        stack.push({ node: nodes[i], depth, parent: undefined, index: i });
    }
    while (stack.length) {
        const current = stack.pop()!;
        const { node, depth, parent, index } = current;
        yield {
            node,
            el: node.el,
            depth,
            children: node.children ?? [],
            parent,
            index
        };
        if (node.children) {
            const children = reverse
                ? [...node.children]
                    .reverse()
                : node.children;
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push({
                    node: children[i],
                    depth: depth + 1,
                    parent: node,
                    index: reverse ? children.length - 1 - i : i
                });
            }
        }
    }
}

function* makePostOrderIterable<El>(
    nodes: TreeNode<El>[],
    depth = 0,
    reverse = false
): Iterable<NodeWithContext<El>> {
    const stack: Array<{ node: TreeNode<El>; depth: number; parent: TreeNode<El> | undefined; index: number; visited: boolean; }> = [];
    for (let i = nodes.length - 1; i >= 0; i--) {
        stack.push({ node: nodes[i], depth, parent: undefined, index: i, visited: false });
    }
    while (stack.length) {
        const current = stack[stack.length - 1];
        if (!current.visited && current.node.children && current.node.children.length > 0) {
            current.visited = true;
            const children = reverse
                ? [...current.node.children].reverse()
                : current.node.children;
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push({
                    node: children[i],
                    depth: current.depth + 1,
                    parent: current.node,
                    index: reverse ? children.length - 1 - i : i,
                    visited: false
                });
            }
        } else {
            stack.pop();
            const { node, depth, parent, index } = current;
            yield {
                node,
                el: node.el,
                depth,
                children: node.children ?? [],
                parent,
                index
            };
        }
    }
}
