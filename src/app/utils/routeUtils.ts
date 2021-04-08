import { getRouteConfig } from '../config/routeConfig';
import { getStepConfig, StepID } from '../config/stepConfig';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';
import { documentsStepIsAvailable, summaryStepAvailable } from './stepUtils';

export const getApplicationRoute = (søknadstype: ApplicationType, stepId: StepID | undefined) => {
    if (stepId !== undefined) {
        return `${getRouteConfig(søknadstype).APPLICATION_ROUTE_PREFIX}/${stepId}`;
    }
    return undefined;
};

export const getNextStepRoute = (søknadstype: ApplicationType, stepId: StepID): string | undefined => {
    const stepConfig = getStepConfig(søknadstype);
    return stepConfig[stepId] ? getApplicationRoute(søknadstype, stepConfig[stepId].nextStep) : undefined;
};

export const isAvailable = (
    søknadstype: ApplicationType,
    path: StepID | string,
    values: ApplicationFormData,
    soknadSendt?: boolean
) => {
    switch (path) {
        case StepID.DOKUMENTER:
            return documentsStepIsAvailable(values, søknadstype);
        case StepID.OPPSUMMERING:
            return summaryStepAvailable(values);
        case getRouteConfig(søknadstype).APPLICATION_SENDT_ROUTE:
            return soknadSendt === true;
    }
    return true;
};
