import { createContext } from 'react';
import { Søknadstype } from '../types/Søknadstype';

interface SøknadstypeContextType {
    søknadstype?: Søknadstype;
}

export const SøknadstypeContext = createContext<SøknadstypeContextType>({ søknadstype: Søknadstype.ukjent });
