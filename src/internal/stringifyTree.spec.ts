import { stringifyTree } from './stringifyTree';
import { TreeNode } from './Tree';
import { preOrder } from './iterators';
import { sampleTree } from './sample';

describe('stringifyTree', () => {
    const toString = (el: number) => `N${el}`;

    it('stringifies a tree', () => {
        const result = stringifyTree([sampleTree], toString);
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
        const result = stringifyTree([sampleTree], toString, '--');
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
        const result = stringifyTree([], toString);
        expect(result).toBe('');
    });
});