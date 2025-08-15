/** Tree data structure */
export interface TreeNode<ThisElement, ChildElement = ThisElement> {
    el: ThisElement;
    children?: TreeNode<ChildElement>[];
}

export function n<El>(el: El, children?: TreeNode<El>[]): TreeNode<El> {
    return children === undefined || children.length === 0 ? { el } : { el, children };
}
