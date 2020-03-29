import { Attachment } from '@navikt/sif-common-core/lib/types/Attachment';

export enum ApplicationFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    beskrivelse = 'beskrivelse',
    søknadstype = 'søknadstype',
    dokumenter = 'dokumenter',
    dokumenterGruppe = 'dokumenterGruppe'
}

export interface ApplicationFormData {
    [ApplicationFormField.harForståttRettigheterOgPlikter]: boolean;
    [ApplicationFormField.harBekreftetOpplysninger]: boolean;
    [ApplicationFormField.beskrivelse]: string;
    [ApplicationFormField.dokumenter]: Attachment[];
}

export const initialApplicationValues: ApplicationFormData = {
    [ApplicationFormField.harForståttRettigheterOgPlikter]: false,
    [ApplicationFormField.harBekreftetOpplysninger]: false,
    [ApplicationFormField.dokumenter]: [],
    [ApplicationFormField.beskrivelse]: ''
};
