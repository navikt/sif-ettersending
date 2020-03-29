import * as React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { useFormikContext } from 'formik';
import ConfirmationPage from '../components/pages/confirmation-page/ConfirmationPage';
import GeneralErrorPage from '../components/pages/general-error-page/GeneralErrorPage';
import WelcomingPage from '../components/pages/welcoming-page/WelcomingPage';
import { getRouteConfig } from '../config/routeConfig';
import { StepID } from '../config/stepConfig';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import { ApplicantData } from '../types/ApplicantData';
import { ApplicationApiData } from '../types/ApplicationApiData';
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

const getKvitteringInfoFromApiData = (søkerdata: ApplicantData): KvitteringInfo | undefined => {
    const { fornavn, mellomnavn, etternavn } = søkerdata.person;
    return {
        søkernavn: formatName(fornavn, etternavn, mellomnavn)
    };
};

const ApplicationRoutes = () => {
    const [applicationHasBeenSent, setApplicationHasBeenSent] = React.useState(false);
    const [kvitteringInfo, setKvitteringInfo] = React.useState<KvitteringInfo | undefined>(undefined);
    const { values, resetForm } = useFormikContext<ApplicationFormData>();
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
                                navigateTo(`${routeConfig.SØKNAD_ROUTE_PREFIX}/${StepID.BESKRIVELSE}`, history);
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

            {isAvailable(søknadstype, StepID.DOKUMENTER, values) && (
                <Route
                    path={getApplicationRoute(søknadstype, StepID.DOKUMENTER)}
                    render={() => (
                        <DokumenterStep
                            søknadstype={søknadstype}
                            onValidSubmit={() => navigateToNextStep(StepID.DOKUMENTER)}
                        />
                    )}
                />
            )}

            {isAvailable(søknadstype, StepID.OPPSUMMERING, values) && (
                <Route
                    path={getApplicationRoute(søknadstype, StepID.OPPSUMMERING)}
                    render={() => (
                        <OppsummeringStep
                            søknadstype={søknadstype}
                            onApplicationSent={(apiData: ApplicationApiData, søkerdata: ApplicantData) => {
                                const info = getKvitteringInfoFromApiData(søkerdata);
                                setKvitteringInfo(info);
                                setApplicationHasBeenSent(true);
                                resetForm();
                                navigateTo(routeConfig.SØKNAD_SENDT_ROUTE, history);
                            }}
                        />
                    )}
                />
            )}

            {isAvailable(søknadstype, routeConfig.SØKNAD_SENDT_ROUTE, values, applicationHasBeenSent) && (
                <Route
                    path={routeConfig.SØKNAD_SENDT_ROUTE}
                    render={() => <ConfirmationPage kvitteringInfo={kvitteringInfo} />}
                />
            )}

            <Route path={routeConfig.ERROR_PAGE_ROUTE} component={GeneralErrorPage} />
            <Redirect to={routeConfig.WELCOMING_PAGE_ROUTE} />
        </Switch>
    );
};

export default ApplicationRoutes;
