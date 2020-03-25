import { createContext } from 'react';
import { Søknadstype } from '../types/SøknadFormData';

interface SøknadstypeContextType {
    søknadstype?: Søknadstype;
}

export const SøknadstypeContext = createContext<SøknadstypeContextType>({ søknadstype: Søknadstype.ukjent });
