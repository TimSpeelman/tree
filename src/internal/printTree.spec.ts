import { printTree } from './printTree';
import { TreeNode } from './Tree';
import { preOrder } from './iterators';
import { sampleTree } from './sample';

describe('printTree', () => {
    const toString = (el: number) => `N${el}`;

    it('prints a tree', () => {
        const result = printTree([sampleTree], toString);
        expect(result).toBe(
            ` N0
| N1
|| N2
|| N3
||| N4
||| N5
| N6
|| N7
|| N8`);
    });

    it('uses custom prefix', () => {
        const result = printTree([sampleTree], toString, '--');
        expect(result).toBe(
            ` N0
-- N1
---- N2
---- N3
------ N4
------ N5
-- N6
---- N7
---- N8`);
    });

    it('handles empty nodes array', () => {
        const result = printTree([], toString);
        expect(result).toBe('');
    });
});