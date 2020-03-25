import { History } from 'history';
import RouteConfig, { getRouteUrl } from '../config/routeConfig';
import { getEnvironmentVariable } from './envUtils';

const loginUrl = getEnvironmentVariable('LOGIN_URL');

export const redirectTo = (route: string) => window.location.assign(route);
export const navigateTo = (route: string, history: History) => history.push(route);
export const navigateToErrorPage = (history?: History) => {
    if (history) {
        history.push(RouteConfig.ERROR_PAGE_ROUTE);
    } else {
        window.location.assign(getRouteUrl(RouteConfig.ERROR_PAGE_ROUTE));
    }
};
export const navigateToLoginPage = () => window.location.assign(loginUrl);
export const navigateToWelcomePage = () => window.location.assign(getRouteUrl(RouteConfig.WELCOMING_PAGE_ROUTE));
export const userIsCurrentlyOnErrorPage = () => window.location.pathname === getRouteUrl(RouteConfig.ERROR_PAGE_ROUTE);
