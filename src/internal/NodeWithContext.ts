import { TreeNode } from "./Tree";

export interface NodeWithContext<El> {
    /** The current node */
    node: TreeNode<El>;
    /** The element of the current node */
    el: El;
    /** The depth of the current node */
    depth: number;
    /** The index of the current node, within its parent's children (or the root list) */
    index: number;
    /** The children of the current node */
    children: TreeNode<El>[];
    /** The parent of the current node */
    parent: TreeNode<El> | undefined;
    /** The list of ancestor nodes (with context) to the current node */
    // ancestors: NodeWithContext<El>[];
}
