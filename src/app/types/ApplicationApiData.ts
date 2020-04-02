import { Locale } from 'common/types/Locale';
import { ApplicationType } from './ApplicationType';

export type ISO8601Duration = string;

export interface ApplicationApiData {
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    beskrivelse: string;
    vedlegg: string[];
    søknadstype: ApplicationType;
}
export interface ApplicationApiDataPleiepenger {
    sprak: Locale;
    har_forstatt_rettigheter_og_plikter: boolean;
    har_bekreftet_opplysninger: boolean;
    beskrivelse: string;
    vedlegg: string[];
    soknadstype: ApplicationType;
}
