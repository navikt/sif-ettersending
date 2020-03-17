import { attachmentUploadHasFailed } from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import { Locale } from 'common/types/Locale';
import { SøknadApiData } from '../types/SøknadApiData';
import { SøknadFormData } from '../types/SøknadFormData';

export const mapFormDataToApiData = (
    { harBekreftetOpplysninger, harForståttRettigheterOgPlikter, søknadstype, dokumenter }: SøknadFormData,
    sprak: Locale
): SøknadApiData => {
    const apiData: SøknadApiData = {
        språk: (sprak as any) === 'en' ? 'nn' : sprak,
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        søknadstype: søknadstype!,
        vedlegg: dokumenter.filter((attachment) => !attachmentUploadHasFailed(attachment)).map(({ url }) => url!)
    };
    return apiData;
};
