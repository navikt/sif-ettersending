import { attachmentUploadHasFailed } from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import { Locale } from 'common/types/Locale';
import { ApplicationApiData, ApplicationApiDataPleiepenger } from '../types/ApplicationApiData';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';

export const mapFormDataToApiData = (
    { harBekreftetOpplysninger, harForståttRettigheterOgPlikter, beskrivelse, dokumenter }: ApplicationFormData,
    søknadstype: ApplicationType,
    sprak: Locale
): ApplicationApiData => {
    const apiData: ApplicationApiData = {
        språk: (sprak as any) === 'en' ? 'nn' : sprak,
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        søknadstype,
        beskrivelse,
        vedlegg: dokumenter.filter((attachment) => !attachmentUploadHasFailed(attachment)).map(({ url }) => url!)
    };
    return apiData;
};

export const mapApiDataToPleiepengerApiData = (data: ApplicationApiData): ApplicationApiDataPleiepenger => ({
    sprak: data.språk,
    har_bekreftet_opplysninger: data.harBekreftetOpplysninger,
    har_forstatt_rettigheter_og_plikter: data.harForståttRettigheterOgPlikter,
    soknadstype: data.søknadstype,
    beskrivelse: data.beskrivelse,
    vedlegg: data.vedlegg
});
