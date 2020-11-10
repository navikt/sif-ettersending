import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import { Attachment } from '@navikt/sif-common-core/lib/types/Attachment';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { createFieldValidationError } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { FieldValidationResult } from '@navikt/sif-common-core/lib/validation/types';

export enum AppFieldValidationErrors {
    'påkrevd' = 'fieldvalidation.påkrevd',
    'for_lang_beskrivelse' = 'fieldvalidation.for_lang_beskrivelse',
    'for_kort_beskrivelse' = 'fieldvalidation.for_kort_beskrivelse',
    'ingen_dokumenter' = 'fieldvalidation.ingen_dokumenter',
    'for_mange_dokumenter' = 'fieldvalidation.for_mange_dokumenter',
    'samlet_storrelse_for_hoy' = 'fieldvalidation.samlet_storrelse_for_hoy',
}

export const MAX_BESKRIVELSE_LENGTH = 250;
export const MIN_BESKRIVELSE_LENGTH = 5;

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

const fieldIsRequiredError = () => fieldValidationError(AppFieldValidationErrors.påkrevd);

export const createAppFieldValidationError = (
    error: AppFieldValidationErrors | AppFieldValidationErrors,
    values?: any
): FieldValidationResult => {
    return createFieldValidationError<AppFieldValidationErrors | AppFieldValidationErrors>(error, values);
};

export const validateYesOrNoIsAnswered = (answer: YesOrNo): FieldValidationResult => {
    if (answer === YesOrNo.UNANSWERED || answer === undefined) {
        return fieldIsRequiredError();
    }
    return undefined;
};

export const validateBeskrivelse = (maxLength: number) => (text: any): FieldValidationResult => {
    if (!hasValue(text)) {
        return fieldIsRequiredError();
    }
    if (text && text.trim().length > MAX_BESKRIVELSE_LENGTH) {
        return createAppFieldValidationError(AppFieldValidationErrors.for_lang_beskrivelse);
    }
    if (text && text.trim().length < MIN_BESKRIVELSE_LENGTH) {
        return createAppFieldValidationError(AppFieldValidationErrors.for_kort_beskrivelse);
    }
};

export const validateRequiredField = (value: any): FieldValidationResult => {
    if (!hasValue(value)) {
        return fieldIsRequiredError();
    }
    return undefined;
};

export const validateDocuments = (attachments: Attachment[]): FieldValidationResult => {
    const uploadedAttachments = attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
    const totalSizeInBytes: number = getTotalSizeOfAttachments(attachments);
    if (totalSizeInBytes > MAX_TOTAL_ATTACHMENT_SIZE_BYTES) {
        return createAppFieldValidationError(AppFieldValidationErrors.samlet_storrelse_for_hoy);
    }
    if (uploadedAttachments.length === 0) {
        return createAppFieldValidationError(AppFieldValidationErrors.ingen_dokumenter);
    }
    if (uploadedAttachments.length > 100) {
        return createAppFieldValidationError(AppFieldValidationErrors.for_mange_dokumenter);
    }
    return undefined;
};

export const fieldValidationError = (
    key: AppFieldValidationErrors | undefined,
    values?: any
): FieldValidationResult => {
    return key
        ? {
              key,
              values,
          }
        : undefined;
};
