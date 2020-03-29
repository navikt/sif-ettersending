import React from 'react';
import { ApplicationType } from '../../types/ApplicationType';

interface Props {
    søknadstype: ApplicationType;
}

const SøknadstypeTekst: React.FunctionComponent<Props> = ({ søknadstype }) => (
    <span>{søknadstype === ApplicationType.pleiepenger ? 'søknad om pleiepenger' : 'søknad om omsorgspenger'}</span>
);

export default SøknadstypeTekst;
