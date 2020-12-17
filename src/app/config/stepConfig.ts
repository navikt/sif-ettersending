import { ApplicationType } from '../types/ApplicationType';
import { getApplicationRoute } from '../utils/routeUtils';
import { getRouteConfig } from './routeConfig';

export enum StepID {
    'BESKRIVELSE' = 'beskrivelse',
    'DOKUMENTER' = 'dokumenter',
    'OPPSUMMERING' = 'oppsummering',
}

export interface StepConfigItemTexts {
    pageTitle: string;
    stepTitle: string;
    stepIndicatorLabel: string;
    nextButtonLabel?: string;
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
    };
};

export const getStepConfig = (søknadstype: ApplicationType): StepConfigInterface => {
    let idx = 0;
    const config = {
        [StepID.BESKRIVELSE]: {
            ...getStepConfigItemTextKeys(StepID.BESKRIVELSE),
            index: idx++,
            nextStep: StepID.DOKUMENTER,
            backLinkHref: getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE,
        },
        [StepID.DOKUMENTER]: {
            ...getStepConfigItemTextKeys(StepID.DOKUMENTER),
            index: idx++,
            nextStep: StepID.OPPSUMMERING,
            backLinkHref: getApplicationRoute(søknadstype, StepID.BESKRIVELSE),
        },
        [StepID.OPPSUMMERING]: {
            ...getStepConfigItemTextKeys(StepID.OPPSUMMERING),
            index: idx++,
            backLinkHref: getApplicationRoute(søknadstype, StepID.DOKUMENTER),
            nextButtonLabel: 'step.sendButtonLabel',
        },
    };

    return config;
};

export interface StepConfigProps {
    onValidSubmit: () => void;
    søknadstype: ApplicationType;
}
