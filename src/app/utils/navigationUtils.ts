import { History } from 'history';
import { getRouteConfig, getRouteUrl } from '../config/routeConfig';
import { Søknadstype } from '../types/SøknadFormData';
import { getEnvironmentVariable } from './envUtils';

const getLoginUrl = (søknadstype: Søknadstype) => `${getEnvironmentVariable('LOGIN_URL')}/${søknadstype}`;

export const redirectTo = (route: string) => window.location.assign(route);
export const navigateTo = (route: string, history: History) => history.push(route);
export const navigateToErrorPage = (søknadstype: Søknadstype, history?: History) => {
    const routeConfig = getRouteConfig(søknadstype);
    if (history) {
        history.push(routeConfig.ERROR_PAGE_ROUTE);
    } else {
        window.location.assign(getRouteUrl(undefined, routeConfig.ERROR_PAGE_ROUTE));
    }
};
export const navigateToLoginPage = (søknadstype: Søknadstype) => window.location.assign(getLoginUrl(søknadstype));
export const navigateToWelcomePage = (søknadstype: Søknadstype) =>
    window.location.assign(getRouteUrl(søknadstype, getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE));
export const userIsCurrentlyOnErrorPage = (søknadstype: Søknadstype) =>
    window.location.pathname === getRouteUrl(undefined, getRouteConfig(søknadstype).ERROR_PAGE_ROUTE);
