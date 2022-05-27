import { GuidePanel, Heading, Ingress } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Page from '../../../sif-common-core-ds/components/page/Page';
import VeilederLokal from './VeilederLokal';
import './generalErrorPage.less';

const GeneralErrorPage = () => {
    const intl = useIntl();
    return (
        <Page title={intlHelper(intl, 'page.generalErrorPage.sidetittel')}>
            <div className={'generalErrorPage'}>
                <GuidePanel illustration={<VeilederLokal mood="uncertain" />}>
                    <Heading level="2" size="large">
                        <FormattedMessage id="page.generalErrorPage.tittel" />
                    </Heading>
                    <Box margin="m" padBottom="l">
                        <Ingress>
                            <FormattedMessage id="page.generalErrorPage.tekst" />
                        </Ingress>
                    </Box>
                </GuidePanel>
            </div>
        </Page>
    );
};

export default GeneralErrorPage;
