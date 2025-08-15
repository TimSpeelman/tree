import { flattenTree } from './flattenTree';
import { unflattenTree } from './unflattenTree';
import { TreeNode } from './Tree';

const tree: TreeNode<string>[] = [
    {
        el: 'A',
        children: [
            {
                el: 'B',
                children: [
                    {
                        el: 'C',
                    },
                    {
                        el: 'D',
                    },
                ],
            },
            { el: 'E' },
        ],
    },
    { el: 'F' },
];

const flatTree = [
    { el: 'A', depth: 0 },
    { el: 'B', depth: 1 },
    { el: 'C', depth: 2 },
    { el: 'D', depth: 2 },
    { el: 'E', depth: 1 },
    { el: 'F', depth: 0 },
];

describe('flattenTree', () => {
    test('should unflatten a tree', () => {
        // Act
        const result = unflattenTree(flatTree, 'empty');

        // Assert
        expect(result).toEqual(tree);
    });

    test('should insert empty node when unflattening', () => {
        // Arrange
        const flatTree = [
            { el: 'A', depth: 0 },
            { el: 'C', depth: 2 },
        ];

        // Act
        const result = unflattenTree(flatTree, 'empty');

        const expected: TreeNode<string>[] = [
            {
                el: 'A',
                children: [
                    {
                        el: 'empty',
                        children: [
                            {
                                el: 'C',
                            },
                        ],
                    },
                ],
            },
        ];

        // Assert
        expect(result).toEqual(expected);
    });
});
