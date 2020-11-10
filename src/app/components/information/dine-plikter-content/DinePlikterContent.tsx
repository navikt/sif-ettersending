import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import getLenker from '../../../lenker';
import { ApplicationType } from '../../../types/ApplicationType';

const getText = (part: string) => <FormattedMessage id={`modal.minePlikter.${part}`} />;

interface Props {
    søknadstype: ApplicationType;
}

const DinePlikterContent = ({ søknadstype }: Props) => {
    const intl = useIntl();
    const søknadstypeText = intlHelper(intl, `søknadstype.${søknadstype}`);
    return (
        <>
            <Systemtittel>{getText('tittel')}</Systemtittel>
            <ul>
                <li>
                    <Normaltekst>
                        <FormattedMessage id="modal.minePlikter.part1" values={{ søknadstype: søknadstypeText }} />
                    </Normaltekst>

                    <ul style={{ marginTop: '.5rem' }}>
                        <li>{getText('part1a')}</li>
                        <li style={{ marginTop: '.5rem' }}>{getText('part1b')}</li>
                    </ul>
                </li>
                <li style={{ marginTop: '0.5rem' }}>
                    <span>
                        {getText('part2a')}{' '}
                        <Lenke href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                            {getText('part2b')}
                        </Lenke>
                        .
                    </span>
                </li>
            </ul>
        </>
    );
};

export default DinePlikterContent;
