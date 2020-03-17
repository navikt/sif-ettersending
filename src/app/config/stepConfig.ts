import { getSøknadRoute } from '../utils/routeUtils';
import routeConfig from './routeConfig';

export enum StepID {
    'DOCUMENTS' = 'documents',
    'SUMMARY' = 'summary'
}

export interface StepConfigItemTexts {
    pageTitle: string;
    stepTitle: string;
    stepIndicatorLabel: string;
    nextButtonLabel?: string;
    nextButtonAriaLabel?: string;
}
export interface StepItemConfigInterface extends StepConfigItemTexts {
    index: number;
    nextStep?: StepID;
    backLinkHref?: string;
}

export interface StepConfigInterface {
    [key: string]: StepItemConfigInterface;
}

const getStepConfigItemTextKeys = (stepId: StepID): StepConfigItemTexts => {
    return {
        pageTitle: `step.${stepId}.pageTitle`,
        stepTitle: `step.${stepId}.stepTitle`,
        stepIndicatorLabel: `step.${stepId}.stepIndicatorLabel`,
        nextButtonLabel: 'step.nextButtonLabel',
        nextButtonAriaLabel: 'step.nextButtonAriaLabel'
    };
};

export const getStepConfig = (): StepConfigInterface => {
    let idx = 0;
    const config = {
        [StepID.DOCUMENTS]: {
            ...getStepConfigItemTextKeys(StepID.DOCUMENTS),
            index: idx++,
            nextStep: StepID.SUMMARY,
            backLinkHref: routeConfig.WELCOMING_PAGE_ROUTE
        },
        [StepID.SUMMARY]: {
            ...getStepConfigItemTextKeys(StepID.SUMMARY),
            index: idx++,
            backLinkHref: getSøknadRoute(StepID.DOCUMENTS),
            nextButtonLabel: 'step.sendButtonLabel',
            nextButtonAriaLabel: 'step.sendButtonAriaLabel'
        }
    };

    return config;
};

export interface StepConfigProps {
    onValidSubmit: () => void;
}

export const stepConfig: StepConfigInterface = getStepConfig();
