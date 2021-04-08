import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { attachmentUploadHasFailed } from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import { getLocaleForApi } from '@navikt/sif-common-core/lib/utils/localeUtils';
import { ApplicationApiData } from '../types/ApplicationApiData';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';

export const mapFormDataToApiData = (
    {
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        beskrivelse,
        dokumenter,
        søknadstype,
    }: ApplicationFormData,
    søknadstypeFraURL: ApplicationType,
    locale: Locale
): ApplicationApiData => {
    if (søknadstypeFraURL === ApplicationType.pleiepenger) {
        søknadstype = ApplicationType.PLEIEPENGER_SYKT_BARN;
    }
    const apiData: ApplicationApiData = {
        språk: getLocaleForApi(locale),
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        søknadstype: søknadstype ? søknadstype : søknadstypeFraURL,
        beskrivelse,
        vedlegg: dokumenter.filter((attachment) => !attachmentUploadHasFailed(attachment)).map(({ url }) => url!),
    };
    return apiData;
};
