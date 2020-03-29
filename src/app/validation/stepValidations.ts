import { ApplicationFormData } from '../types/ApplicationFormData';
import { hasValue } from './fieldValidations';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: ApplicationFormData) =>
    harForståttRettigheterOgPlikter === true;

export const documentsStepIsValid = ({ beskrivelse, dokumenter }: ApplicationFormData) =>
    dokumenter.length > 0 && hasValue(beskrivelse);
