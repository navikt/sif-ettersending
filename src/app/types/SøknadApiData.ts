import { Locale } from 'common/types/Locale';
import { Søknadstype } from './Søknadstype';

export type ISO8601Duration = string;

export interface SøknadApiData {
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    beskrivelse: string;
    vedlegg: string[];
    søknadstype: Søknadstype;
}
