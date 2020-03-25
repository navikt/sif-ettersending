import { Attachment } from '@navikt/sif-common-core/lib/types/Attachment';
import { Søknadstype } from './Søknadstype';

export enum SøknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    beskrivelse = 'beskrivelse',
    søknadstype = 'søknadstype',
    dokumenter = 'dokumenter',
    dokumenterGruppe = 'dokumenterGruppe'
}

export interface SøknadFormData {
    [SøknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SøknadFormField.harBekreftetOpplysninger]: boolean;
    [SøknadFormField.beskrivelse]: string;
    [SøknadFormField.dokumenter]: Attachment[];
    [SøknadFormField.søknadstype]: Søknadstype;
}

export const initialSøknadValues: SøknadFormData = {
    [SøknadFormField.harForståttRettigheterOgPlikter]: false,
    [SøknadFormField.harBekreftetOpplysninger]: false,
    [SøknadFormField.dokumenter]: [],
    [SøknadFormField.beskrivelse]: '',
    [SøknadFormField.søknadstype]: Søknadstype.ukjent
};
