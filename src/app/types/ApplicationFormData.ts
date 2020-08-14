import { Attachment } from '@navikt/sif-common-core/lib/types/Attachment';

export enum ApplicationFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    beskrivelse = 'beskrivelse',
    søknadstype = 'søknadstype',
    dokumenter = 'dokumenter',
    dokumenterGruppe = 'dokumenterGruppe'
}

export interface AttachmentWithSize extends Attachment {
    size: number;
}

export interface ApplicationFormData {
    [ApplicationFormField.harForståttRettigheterOgPlikter]: boolean;
    [ApplicationFormField.harBekreftetOpplysninger]: boolean;
    [ApplicationFormField.beskrivelse]: string;
    [ApplicationFormField.dokumenter]: AttachmentWithSize[];
}

export const initialApplicationValues: ApplicationFormData = {
    [ApplicationFormField.harForståttRettigheterOgPlikter]: false,
    [ApplicationFormField.harBekreftetOpplysninger]: false,
    [ApplicationFormField.dokumenter]: [],
    [ApplicationFormField.beskrivelse]: ''
};
