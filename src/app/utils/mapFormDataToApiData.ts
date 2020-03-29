import { attachmentUploadHasFailed } from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import { Locale } from 'common/types/Locale';
import { ApplicationApiData } from '../types/ApplicationApiData';
import { ApplicationFormData } from '../types/ApplicationFormData';

export const mapFormDataToApiData = (
    {
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        søknadstype,
        beskrivelse,
        dokumenter
    }: ApplicationFormData,
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
