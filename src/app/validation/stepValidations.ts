import { ApplicationFormData } from '../types/ApplicationFormData';
import { hasValue } from './fieldValidations';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: ApplicationFormData): boolean =>
    harForståttRettigheterOgPlikter === true;

export const beskrivelseStepIsValid = (values: ApplicationFormData) =>
    hasValue(values.beskrivelse) && welcomingPageIsValid(values);

export const documentsStepIsValid = ({ beskrivelse, dokumenter }: ApplicationFormData) => dokumenter.length > 0;
