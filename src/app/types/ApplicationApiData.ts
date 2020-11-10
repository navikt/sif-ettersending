import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
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
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    beskrivelse: string;
    vedlegg: string[];
    søknadstype: ApplicationType;
}
