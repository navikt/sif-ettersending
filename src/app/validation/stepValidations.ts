import { SøknadFormData } from '../types/SøknadFormData';
import { hasValue } from './fieldValidations';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: SøknadFormData) =>
    harForståttRettigheterOgPlikter === true;

export const documentsStepIsValid = ({ beskrivelse, dokumenter }: SøknadFormData) =>
    dokumenter.length > 0 && hasValue(beskrivelse);
