import { SøknadFormData } from '../types/SøknadFormData';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: SøknadFormData) =>
    harForståttRettigheterOgPlikter === true;

export const documentsStepIsValid = ({ dokumenter }: SøknadFormData) => dokumenter.length > 0;
