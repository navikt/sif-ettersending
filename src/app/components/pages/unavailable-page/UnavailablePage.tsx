import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

import Box from 'common/components/box/Box';
import Page from 'common/components/page/Page';
import StepBanner from 'common/components/step-banner/StepBanner';
import bemUtils from 'common/utils/bemUtils';
import './unavailablePage.less';

const bem = bemUtils('introPage');

const UnavailablePage: React.StatelessComponent<{}> = () => {
    const title = 'Ettersendelse av dokumenter';
    return (
        <Page className={bem.block} title={title} topContentRenderer={() => <StepBanner text={title} />}>
            <Box margin="xxxl">
                <AlertStripeAdvarsel>
                    <p>
                        Den digitale søknaden for ettersending av dokumenter er dessverre ikke tilgjengelig på grunn av
                        teknisk feil. Vi jobber med å løse feilen.
                    </p>
                    <p>Vi beklager.</p>
                </AlertStripeAdvarsel>
            </Box>
        </Page>
    );
};

export default UnavailablePage;
