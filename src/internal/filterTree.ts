import { NodeWithContext } from "./NodeWithContext";
import { TreeNode } from "./Tree";

/** Only keep nodes that match the predicate. If a node does not match, its children are not processed and dropped. Processes a tree in pre-order. */
// TODO Make iterative
export function filterTree<El>(
    nodes: TreeNode<El>[],
    predicate: (context: NodeWithContext<El>) => boolean,
    depth = 0
): TreeNode<El>[] {
    const filteredNodes = nodes
        .filter((node, index) => predicate({ node, el: node.el, depth, index, children: node.children ?? [], parent: undefined }))
        .map((node) =>
            node.children === undefined
                ? node
                : { el: node.el, children: filterTree(node.children, predicate, depth + 1) },
        );
    return filteredNodes;
}
