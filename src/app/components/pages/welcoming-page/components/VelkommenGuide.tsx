import React from 'react';
import { FormattedMessage } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import { Systemtittel } from 'nav-frontend-typografi';

const VelkommenGuide: React.FunctionComponent = () => (
    <CounsellorPanel>
        <Systemtittel tag="h1">
            <FormattedMessage id="page.velkommen.guide.tittel" />
        </Systemtittel>
        <Box margin="m">
            <FormattedMessage id="page.velkommen.guide.ingress" />
        </Box>
    </CounsellorPanel>
);

export default VelkommenGuide;
