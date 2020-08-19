import { Attachment } from 'common/types/Attachment';

export const MAX_TOTAL_ATTACHMENT_SIZE_IN_MB = 10;
export const MAX_TOTAL_ATTACHMENT_SIZE_BYTES = 1024 * 1024 * MAX_TOTAL_ATTACHMENT_SIZE_IN_MB;

export const getTotalSize = (attachments: Attachment[]): number =>
    attachments
        .filter((attachment: Attachment) => attachment.uploaded)
        .map((attachment: Attachment) => attachment.file.size)
        .reduce((prev, curr) => prev + curr, 0);

export const getPercentageUsed = (size: number, maxSize: number): number => {
    if (size <= 0) {
        return 0;
    }
    if (size > maxSize) {
        return 100;
    }
    return Math.round((size / maxSize) * 100);
};

export const bytesToMb = (sizeInBytes: number): number => (sizeInBytes / (1024 * 1024))
export const bytesToMbString = (sizeInBytes: number): string => bytesToMb(sizeInBytes).toFixed(2) + ' Mb';
export const mbToMbString = (sizeInMb: number): string => sizeInMb.toFixed(2) + ' Mb';
