import { NodeWithContext } from "./NodeWithContext";
import { TreeNode } from "./Tree";

interface TransformationContext<B> {
    transformedChildren?: TreeNode<B>[];
}

/**
 * Transform a tree by applying a function to each node in post-order (leaves first). The transformer may change the
 * structure of the tree. The function receives the transformed children.
 */
// TODO Make iterative instead of recursive
export function transformTree<A, B>(nodes: TreeNode<A>[], transformation: (props: NodeWithContext<A> & TransformationContext<B>) => TreeNode<B>) {
    function applyToList(
        nodes: TreeNode<A>[],
        parent: TreeNode<A> | undefined,
        depth: number,
    ): TreeNode<B>[] {
        return nodes.map((child, childIndex) =>
            applyRecursively({
                node: child,
                el: child.el,
                children: child.children ?? [],
                parent,
                depth: depth + 1,
                index: childIndex,
            }),
        );
    }
    function applyRecursively(props: NodeWithContext<A>): TreeNode<B> {
        const mappedChildren = props.node.children
            ? applyToList(props.node.children, props.node, props.depth)
            : undefined;
        const mappedNode = transformation({ ...props, transformedChildren: mappedChildren });

        return mappedNode;
    }

    return applyToList(nodes, undefined, 0);
}
