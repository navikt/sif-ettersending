import { getPercentageUsed } from '../attachmentUtils';

describe('Test of attachment utils', () => {
    describe('getPercentage', () => {
        it('negative size gives 0 percent', () => {
            const percentageUsed: number = getPercentageUsed(-20, 10);
            expect(percentageUsed).toEqual(0);
        });
        it('size 0 gives 0 percent', () => {
            const percentageUsed: number = getPercentageUsed(0, 10);
            expect(percentageUsed).toEqual(0);
        });
        it('size of 0.1 with maxSize 1 gives 10', () => {
            const percentageUsed: number = getPercentageUsed(0.1, 1);
            expect(percentageUsed).toEqual(10);
        });
        it('size of 1 with maxSize 10 gives 10', () => {
            const percentageUsed: number = getPercentageUsed(1, 10);
            expect(percentageUsed).toEqual(10);
        });
        it('size of 100 with maxSize 200 gives 50', () => {
            const percentageUsed: number = getPercentageUsed(100, 200);
            expect(percentageUsed).toEqual(50);
        });
        it('size of 1 with maxSize 1 gives 100 percent', () => {
            const percentageUsed: number = getPercentageUsed(1, 1);
            expect(percentageUsed).toEqual(100);
        });
        it('size of 100 with maxSize 99 gives 100 percent', () => {
            const percentageUsed: number = getPercentageUsed(100, 99);
            expect(percentageUsed).toEqual(100);
        });
    });
});
