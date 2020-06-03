import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import Box from 'common/components/box/Box';
import CheckmarkIcon from 'common/components/checkmark-icon/CheckmarkIcon';
import Page from 'common/components/page/Page';
import bemUtils from 'common/utils/bemUtils';
import intlHelper from 'common/utils/intlUtils';
import Lenke from 'nav-frontend-lenker';
import './confirmationPage.less';

const bem = bemUtils('confirmationPage');

const ConfirmationPage: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <Page title={intlHelper(intl, 'page.confirmation.sidetittel')} className={bem.block}>
            <div className={bem.element('centeredContent')}>
                <CheckmarkIcon />
                <Box margin="xl">
                    <Innholdstittel>
                        <FormattedMessage id="page.confirmation.tittel" />
                    </Innholdstittel>
                </Box>
            </div>
            <Box margin="xl">
                <Ingress>
                    <FormattedMessage id="page.confirmation.undertittel" />
                </Ingress>
                <ul className="checklist">
                    "page.confirmation.hvaSkjer1": "", "page.confirmation.hvaSkjer2": "", "page.confirmation.hvaSkjer3":
                    "",
                    <li>Innsendingen din vil bli synlig på Ditt NAV etter omkring en uke.</li>
                    <li>
                        Vi starter behandlingen av søknaden din når vi har mottatt all nødvendig dokumentasjon. Vi
                        kontakter deg hvis vi trenger flere opplysninger i saken din.
                    </li>
                    <li>
                        Når søknaden er ferdig behandlet, får du et svarbrev fra oss. Du kan se{' '}
                        <Lenke
                            href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV"
                            target="_blank">
                            saksbehandlingstiden for ditt fylke her
                        </Lenke>
                        .
                    </li>
                </ul>
            </Box>
        </Page>
    );
};

export default ConfirmationPage;
