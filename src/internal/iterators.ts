import { IterationUtility } from "./IterationUtility";
import { NodeWithContext } from "./NodeWithContext";
import { TreeNode } from "./Tree";

export enum Order {
    LEVEL,
    PRE,
    POST,
    LEVEL_REV,
    PRE_REV,
    POST_REV
};

export function levelOrder<El>(nodes: TreeNode<El>[], depth = 0 ) {
    return new IterationUtility<NodeWithContext<El>>(() => makeLevelOrderIterable(nodes, depth));
}

export function preOrder<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makePreOrderIterable(nodes, depth));
}

export function postOrder<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makePostOrderIterable(nodes, depth));
}

export function levelOrderRev<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makeLevelOrderIterable(nodes, depth, true));
}

export function preOrderRev<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makePreOrderIterable(nodes, depth, true));
}

export function postOrderRev<El>(nodes: TreeNode<El>[], depth = 0) {
    return new IterationUtility<NodeWithContext<El>>(() => makePostOrderIterable(nodes, depth, true));
}


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

export function* makeLevelOrderIterable<El>(
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

export function* makePreOrderIterable<El>(
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

export function* makePostOrderIterable<El>(
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
