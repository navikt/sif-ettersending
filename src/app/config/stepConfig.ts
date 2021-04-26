import { ApplicationType } from '../types/ApplicationType';
import { getApplicationRoute } from '../utils/routeUtils';
import { getRouteConfig } from './routeConfig';

export enum StepID {
    'BESKRIVELSE' = 'beskrivelse',
    'DOKUMENTER' = 'dokumenter',
    'OPPSUMMERING' = 'oppsummering',
    'OMS_TYPE' = 'omstype',
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

const getbackLinkHrefDok = (søknadstype: ApplicationType): string | undefined =>
    søknadstype === ApplicationType.pleiepenger
        ? getApplicationRoute(søknadstype, StepID.BESKRIVELSE)
        : søknadstype === ApplicationType.omsorgspenger
        ? getApplicationRoute(søknadstype, StepID.OMS_TYPE)
        : getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE;

export const getStepConfig = (søknadstype: ApplicationType): StepConfigInterface => {
    let idx = 0;
    let config = {};

    switch (søknadstype) {
        case ApplicationType.pleiepenger:
            config[StepID.BESKRIVELSE] = {
                ...getStepConfigItemTextKeys(StepID.BESKRIVELSE),
                index: idx++,
                nextStep: StepID.DOKUMENTER,
                backLinkHref: getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE,
            };
            break;
        case ApplicationType.omsorgspenger:
            config[StepID.OMS_TYPE] = {
                ...getStepConfigItemTextKeys(StepID.OMS_TYPE),
                index: idx++,
                nextStep: StepID.DOKUMENTER,
                backLinkHref: getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE,
            };
            break;
        default:
            config = {};
    }

    const configFelles = {
        [StepID.DOKUMENTER]: {
            ...getStepConfigItemTextKeys(StepID.DOKUMENTER),
            index: idx++,
            nextStep: StepID.OPPSUMMERING,
            backLinkHref: getbackLinkHrefDok(søknadstype),
        },
        [StepID.OPPSUMMERING]: {
            ...getStepConfigItemTextKeys(StepID.OPPSUMMERING),
            index: idx++,
            backLinkHref: getApplicationRoute(søknadstype, StepID.DOKUMENTER),
            nextButtonLabel: 'step.sendButtonLabel',
        },
    };
    config = { ...config, ...configFelles };
    return config;
};

export interface StepConfigProps {
    onValidSubmit: () => void;
    søknadstype: ApplicationType;
}
