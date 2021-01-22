import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import './unavailablePage.less';

const bem = bemUtils('introPage');

const UnavailablePage = () => {
    const title = 'Ettersendelse av dokumenter';
    useLogSidevisning(SIFCommonPageKey.ikkeTilgjengelig);
    return (
        <Page className={bem.block} title={title} topContentRenderer={() => <StepBanner text={title} />}>
            <Box margin="xxxl">
                <AlertStripeAdvarsel>
                    <p>
                        <FormattedMessage id="page.unavailable.info.1" />
                    </p>
                    <p>
                        <FormattedMessage id="page.unavailable.info.2" />
                    </p>
                </AlertStripeAdvarsel>
            </Box>
        </Page>
    );
};

export default UnavailablePage;
