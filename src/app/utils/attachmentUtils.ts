import { Attachment } from 'common/types/Attachment';

export const MAX_TOTAL_ATTACHMENT_SIZE_IN_MB = 24;
export const MAX_TOTAL_ATTACHMENT_SIZE_BYTES = 1024 * 1024 * MAX_TOTAL_ATTACHMENT_SIZE_IN_MB;

export const getTotalSize = (attachments: Attachment[]): number =>
    attachments.map((attachment: Attachment) => attachment.file.size).reduce((prev, curr) => prev + curr, 0);

export const getPercentageUsed = (size: number, maxSize: number): number => {
    if (size <= 0) {
        return 0;
    }
    if (size > maxSize) {
        return 100;
    }
    return Math.round((size / maxSize) * 100);
};

export const toMbString = (sizeInBytes: number): string => (sizeInBytes / (1024 * 1024)).toFixed(2) + ' Mb';
