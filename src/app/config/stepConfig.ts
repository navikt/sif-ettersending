import { ApplicationType } from '../types/ApplicationType';
import { getApplicationRoute } from '../utils/routeUtils';
import { getRouteConfig } from './routeConfig';

export enum StepID {
    'DOKUMENTER' = 'dokumenter',
    'OPPSUMMERING' = 'oppsummering'
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

export const getStepConfig = (søknadstype: ApplicationType): StepConfigInterface => {
    let idx = 0;
    const config = {
        [StepID.DOKUMENTER]: {
            ...getStepConfigItemTextKeys(StepID.DOKUMENTER),
            index: idx++,
            nextStep: StepID.OPPSUMMERING,
            backLinkHref: getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE
        },
        [StepID.OPPSUMMERING]: {
            ...getStepConfigItemTextKeys(StepID.OPPSUMMERING),
            index: idx++,
            backLinkHref: getApplicationRoute(søknadstype, StepID.DOKUMENTER),
            nextButtonLabel: 'step.sendButtonLabel',
            nextButtonAriaLabel: 'step.sendButtonAriaLabel'
        }
    };

    return config;
};

export interface StepConfigProps {
    onValidSubmit: () => void;
    søknadstype: ApplicationType;
}
