import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Lenke from 'nav-frontend-lenker';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import getLenker from '../../../lenker';
import './behandlingAvPersonopplysningerContent.less';

const getText = (part: string) => <FormattedMessage id={`modal.personalopplysninger.${part}`} />;

const BehandlingAvPersonopplysningerContent: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <>
            <Systemtittel>{getText('tittel')}</Systemtittel>

            <Box margin="l">
                <Normaltekst>{getText('intro.1')}</Normaltekst>
            </Box>

            <Box margin="xl">
                <Ingress>{getText('opplysninger.tittel')}</Ingress>
                <Normaltekst>{getText('opplysninger.part1')}</Normaltekst>
                <ul>
                    <li>{getText('opplysninger.1')}</li>
                    <li>{getText('opplysninger.2')}</li>
                    <li>{getText('opplysninger.4')}</li>
                    <li>{getText('opplysninger.5')}</li>
                </ul>
                <Normaltekst>{getText('opplysninger.part2')}</Normaltekst>
            </Box>

            <Box margin="xl">
                <Ingress>{getText('personvern.tittel')}</Ingress>
                <Normaltekst>
                    {getText('personvern.part1a')}{' '}
                    <Lenke href={getLenker(intl.locale).personvern} target="_blank">
                        {getText('personvern.part1b')}
                    </Lenke>
                    .
                </Normaltekst>
            </Box>
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
