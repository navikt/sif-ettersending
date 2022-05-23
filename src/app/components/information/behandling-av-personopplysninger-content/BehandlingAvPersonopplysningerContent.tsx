import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Lenke from 'nav-frontend-lenker';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import getLenker from '../../../lenker';
import { ApplicationType } from '../../../types/ApplicationType';

interface Props {
    søknadstype: ApplicationType;
}

const BehandlingAvPersonopplysningerContent = ({ søknadstype }: Props) => {
    const intl = useIntl();
    return (
        <>
            <Systemtittel tag="h1">
                <FormattedMessage id="modal.personopplysninger.1" />
            </Systemtittel>
            <Box margin="xl">
                <FormattedMessage id="modal.personopplysninger.2" />
            </Box>
            <Box margin="xl">
                <Ingress tag="h2">
                    <FormattedMessage id="modal.personopplysninger.3" />
                </Ingress>
                <p>
                    <FormattedMessage id="modal.personopplysninger.4" />
                </p>

                <ul>
                    {søknadstype === ApplicationType.pleiepengerLivetsSluttfase && (
                        <li>
                            <FormattedMessage id="modal.personopplysninger.4.1.pleiepengerLivetsSluttfase" />
                        </li>
                    )}
                    {søknadstype !== ApplicationType.pleiepengerLivetsSluttfase && (
                        <>
                            <li>
                                <FormattedMessage id="modal.personopplysninger.4.1" />
                            </li>
                            <li>
                                <FormattedMessage id="modal.personopplysninger.4.2" />
                            </li>
                        </>
                    )}

                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.3" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.4" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.5" />
                    </li>
                    <li>
                        <FormattedMessage id="modal.personopplysninger.4.6" />
                    </li>
                </ul>
            </Box>
            {søknadstype === ApplicationType.pleiepengerLivetsSluttfase && (
                <Box margin="xl">
                    <p>
                        <FormattedMessage id="modal.personopplysninger.4.7" />
                    </p>
                </Box>
            )}
            <Box margin="xl">
                <p>
                    <FormattedMessage id="modal.personopplysninger.5.1" />
                    {` `}
                    <Lenke href={getLenker(intl.locale).personvern} target="_blank">
                        <FormattedMessage id="modal.personopplysninger.5.2" />
                    </Lenke>
                    <FormattedMessage id="modal.personopplysninger.5.3" />
                </p>
            </Box>
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
