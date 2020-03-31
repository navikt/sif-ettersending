import { getEnvironmentVariable } from 'app/utils/envUtils';
import { ApplicationType } from '../types/ApplicationType';

interface RouteConfig {
    UTILGJENGELIG_ROUTE: string;
    APPLICATION_ROUTE_PREFIX: string;
    ERROR_PAGE_ROUTE: string;
    WELCOMING_PAGE_ROUTE: string;
    APPLICATION_SENDT_ROUTE: string;
}

export const getRouteConfig = (søknadstype: ApplicationType): RouteConfig => {
    return {
        UTILGJENGELIG_ROUTE: '/utilgjengelig',
        APPLICATION_ROUTE_PREFIX: `/${søknadstype}`,
        ERROR_PAGE_ROUTE: `/${søknadstype}/feil`,
        WELCOMING_PAGE_ROUTE: `/${søknadstype}/velkommen`,
        APPLICATION_SENDT_ROUTE: `/${søknadstype}/dokumenter-sendt`
    };
};

export const getRouteUrl = (søknadstype: ApplicationType | undefined, route: string): string => {
    return søknadstype
        ? `${getEnvironmentVariable('PUBLIC_PATH')}/${søknadstype}${route}`
        : `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
};
