import React from 'react';
import { Søknadstype } from '../../types/SøknadFormData';

interface Props {
    søknadstype: Søknadstype;
}

const SøknadstypeTekst: React.FunctionComponent<Props> = ({ søknadstype }) => (
    <span>{søknadstype === Søknadstype.pleiepenger ? 'søknad om pleiepenger' : 'søknad om omsorgspenger'}</span>
);

export default SøknadstypeTekst;
