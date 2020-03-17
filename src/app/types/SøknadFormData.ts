import { Attachment } from '@navikt/sif-common-core/lib/types/Attachment';

export enum Søknadstype {
    'pleiepengerSyktBarn' = 'pleiepengerSyktBarn',
    'ekstraOmsorgsdager' = 'ekstraOmsorgsdager'
}

export enum SøknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    søknadstype = 'søknadstype',
    dokumenter = 'dokumenter'
}

export interface SøknadFormData {
    [SøknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SøknadFormField.harBekreftetOpplysninger]: boolean;
    [SøknadFormField.dokumenter]: Attachment[];
    [SøknadFormField.søknadstype]?: Søknadstype;
}

export const initialSøknadValues: SøknadFormData = {
    [SøknadFormField.harForståttRettigheterOgPlikter]: false,
    [SøknadFormField.harBekreftetOpplysninger]: false,
    [SøknadFormField.dokumenter]: []
};
