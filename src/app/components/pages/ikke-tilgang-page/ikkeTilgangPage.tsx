import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { ApplicationType } from '../../../types/ApplicationType';

interface Props {
    søknadstype: ApplicationType;
}

const IkkeTilgangPage = ({ søknadstype }: Props) => {
    const intl = useIntl();
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);

    return (
        <Page
            className="ikkeTilgangPage"
            title={intlHelper(intl, `application.title.${søknadstype}`)}
            topContentRenderer={() => <StepBanner text={intlHelper(intl, `application.title.${søknadstype}`)} />}>
            <Box margin="xxl">
                <CounsellorPanel type="plakat">
                    <p>
                        <FormattedMessage id="page.ikkeTilgang.tekst" />
                    </p>
                </CounsellorPanel>
            </Box>
        </Page>
    );
};

export default IkkeTilgangPage;
