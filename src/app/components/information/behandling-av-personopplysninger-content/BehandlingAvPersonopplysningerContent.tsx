import { BodyLong, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import getLenker from '../../../lenker';
import { ApplicationType } from '../../../types/ApplicationType';

interface Props {
    søknadstype: ApplicationType;
}

const BehandlingAvPersonopplysningerContent = ({ søknadstype }: Props) => {
    const intl = useIntl();
    return (
        <>
            <Heading level="1" size="large">
                <FormattedMessage id="modal.personopplysninger.1" />
            </Heading>
            <BodyLong>
                <Box margin="xl">
                    <FormattedMessage id="modal.personopplysninger.2" />
                </Box>
                <Box margin="xl">
                    <Heading size="medium" level="2">
                        <FormattedMessage id="modal.personopplysninger.3" />
                    </Heading>
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
                        <Link href={getLenker(intl.locale).personvern} target="_blank">
                            <FormattedMessage id="modal.personopplysninger.5.2" />
                        </Link>
                        <FormattedMessage id="modal.personopplysninger.5.3" />
                    </p>
                </Box>
            </BodyLong>
        </>
    );
};

export default BehandlingAvPersonopplysningerContent;
