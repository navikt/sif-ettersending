import React from 'react';
import { FormattedMessage } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { Undertittel } from 'nav-frontend-typografi';
import getLenker from '../../../../lenker';
import Lenke from 'nav-frontend-lenker';

const OmSøknaden = () => {
    return (
        <Box margin="xl">
            <Undertittel tag="h2">
                <FormattedMessage id="page.velkommen.omSøknaden.tittel" />
            </Undertittel>

            <FormattedMessage id="page.velkommen.omSøknaden.1" tagName="p" />
            <FormattedMessage id="page.velkommen.omSøknaden.2" tagName="p" />
            <FormattedMessage id="page.velkommen.omSøknaden.3" tagName="p" />
            <Box>
                <FormattedMessage id="page.velkommen.omSøknaden.4.1" />
                <Lenke href={getLenker().personvern} target="_blank">
                    <FormattedMessage id="page.velkommen.omSøknaden.4.2" />
                </Lenke>
                <FormattedMessage id="page.velkommen.omSøknaden.4.3" />
            </Box>
        </Box>
    );
};

export default OmSøknaden;
