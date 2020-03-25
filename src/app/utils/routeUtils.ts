import { getRouteConfig } from '../config/routeConfig';
import { getStepConfig, StepID } from '../config/stepConfig';
import { SøknadFormData } from '../types/SøknadFormData';
import { Søknadstype } from '../types/Søknadstype';
import { documentsStepIsAvailable, summaryStepAvailable } from './stepUtils';

export const getSøknadRoute = (søknadstype: Søknadstype, stepId: StepID | undefined) => {
    if (stepId !== undefined) {
        return `${getRouteConfig(søknadstype).SØKNAD_ROUTE_PREFIX}/${stepId}`;
    }
    return undefined;
};

export const getNextStepRoute = (søknadstype: Søknadstype, stepId: StepID): string | undefined => {
    const stepConfig = getStepConfig(søknadstype);
    return stepConfig[stepId] ? getSøknadRoute(søknadstype, stepConfig[stepId].nextStep) : undefined;
};

export const isAvailable = (
    søknadstype: Søknadstype,
    path: StepID | string,
    values: SøknadFormData,
    soknadSendt?: boolean
) => {
    switch (path) {
        case StepID.DOKUMENTER:
            return documentsStepIsAvailable(values);
        case StepID.OPPSUMMERING:
            return summaryStepAvailable(values);
        case getRouteConfig(søknadstype).SØKNAD_SENDT_ROUTE:
            return soknadSendt === true;
    }
    return true;
};
