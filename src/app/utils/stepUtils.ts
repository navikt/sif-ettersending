import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { StepConfigInterface, StepConfigItemTexts, StepID } from '../config/stepConfig';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { beskrivelseStepIsValid, documentsStepIsValid, welcomingPageIsValid } from '../validation/stepValidations';
import { ApplicationType } from '../types/ApplicationType';

export const getStepTexts = (intl: IntlShape, stepId: StepID, stepConfig: StepConfigInterface): StepConfigItemTexts => {
    const conf = stepConfig[stepId];
    return {
        pageTitle: intlHelper(intl, conf.pageTitle),
        stepTitle: intlHelper(intl, conf.stepTitle),
        stepIndicatorLabel: intlHelper(intl, conf.stepIndicatorLabel),
        nextButtonLabel: conf.nextButtonLabel ? intlHelper(intl, conf.nextButtonLabel) : undefined,
    };
};

export const beskrivelseStepIsAvailable = (formData: ApplicationFormData) => welcomingPageIsValid(formData);

export const documentsStepIsAvailable = (formData: ApplicationFormData, søknadstype: ApplicationType) =>
    søknadstype === ApplicationType.pleiepengerBarn || søknadstype === ApplicationType.pleiepengerLivetsSluttfase
        ? beskrivelseStepIsValid(formData)
        : welcomingPageIsValid(formData);

export const summaryStepAvailable = (formData: ApplicationFormData) => documentsStepIsValid(formData);
