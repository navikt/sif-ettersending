import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
// import { ApplicationType } from './ApplicationType';

export type ISO8601Duration = string;

export enum YtelseTypeApi {
    'PLEIEPENGER_SYKT_BARN' = 'PLEIEPENGER_SYKT_BARN',
    'OMP_UTV_KS' = 'OMP_UTV_KS',
    'OMP_UT_SNF' = 'OMP_UT_SNF',
    'OMP_UT_ARBEIDSTAKER' = 'OMP_UT_ARBEIDSTAKER',
    'OMP_UTV_MA' = 'OMP_UTV_MA',
    'OMP_DELING' = 'OMP_DELING',
    'ukjent' = 'ukjent',
}
export interface ApplicationApiData {
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    beskrivelse?: string;
    vedlegg: string[];
    søknadstype: YtelseTypeApi;
}
