import * as React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useFormikContext } from 'formik';
import ConfirmationPage from '../components/pages/confirmation-page/ConfirmationPage';
import GeneralErrorPage from '../components/pages/general-error-page/GeneralErrorPage';
import WelcomingPage from '../components/pages/welcoming-page/WelcomingPage';
import { getRouteConfig, getRouteUrl } from '../config/routeConfig';
import { StepID } from '../config/stepConfig';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';
import { navigateTo } from '../utils/navigationUtils';
import { getApplicationRoute, getNextStepRoute, isAvailable } from '../utils/routeUtils';
import BeskrivelseStep from './beskrivelse-step/BeskrivelseStep';
import DokumenterStep from './dokumenter-step/DokumenterStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';

export interface KvitteringInfo {
    søkernavn: string;
}

const ApplicationRoutes = () => {
    const { values } = useFormikContext<ApplicationFormData>();
    const { søknadstype } = React.useContext(ApplicationTypeContext);

    const history = useHistory();

    if (!søknadstype) {
        return <Route path={getRouteConfig(ApplicationType.ukjent).ERROR_PAGE_ROUTE} component={GeneralErrorPage} />;
    }
    const routeConfig = getRouteConfig(søknadstype);

    const navigateToNextStep = (stepId: StepID) => {
        setTimeout(() => {
            const nextStepRoute = getNextStepRoute(søknadstype, stepId);
            if (nextStepRoute) {
                navigateTo(nextStepRoute, history);
            }
        });
    };

    return (
        <Switch>
            <Route
                path={routeConfig.WELCOMING_PAGE_ROUTE}
                render={() => (
                    <WelcomingPage
                        søknadstype={søknadstype}
                        onValidSubmit={() =>
                            setTimeout(() => {
                                navigateTo(`${routeConfig.APPLICATION_ROUTE_PREFIX}/${StepID.BESKRIVELSE}`, history);
                            })
                        }
                    />
                )}
            />

            {isAvailable(søknadstype, StepID.BESKRIVELSE, values) && (
                <Route
                    path={getApplicationRoute(søknadstype, StepID.BESKRIVELSE)}
                    render={() => (
                        <BeskrivelseStep
                            søknadstype={søknadstype}
                            onValidSubmit={() => navigateToNextStep(StepID.BESKRIVELSE)}
                        />
                    )}
                />
            )}

            {/*{isAvailable(søknadstype, StepID.DOKUMENTER, values) && (*/}
                <Route
                    path={getApplicationRoute(søknadstype, StepID.DOKUMENTER)}
                    render={() => (
                        <DokumenterStep
                            søknadstype={søknadstype}
                            onValidSubmit={() => navigateToNextStep(StepID.DOKUMENTER)}
                        />
                    )}
                />
            {/*)}*/}

            {isAvailable(søknadstype, StepID.OPPSUMMERING, values) && (
                <Route
                    path={getApplicationRoute(søknadstype, StepID.OPPSUMMERING)}
                    render={() => (
                        <OppsummeringStep
                            søknadstype={søknadstype}
                            onApplicationSent={() => {
                                window.location.href = getRouteUrl(
                                    undefined,
                                    getRouteConfig(søknadstype).APPLICATION_SENDT_ROUTE
                                ); // Ensures history is lost
                            }}
                        />
                    )}
                />
            )}

            <Route path={routeConfig.APPLICATION_SENDT_ROUTE} render={() => <ConfirmationPage />} />

            <Route path={routeConfig.ERROR_PAGE_ROUTE} component={GeneralErrorPage} />
            <Redirect to={routeConfig.WELCOMING_PAGE_ROUTE} />
        </Switch>
    );
};

export default ApplicationRoutes;
