import * as React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { useFormikContext } from 'formik';
import ConfirmationPage from '../components/pages/confirmation-page/ConfirmationPage';
import GeneralErrorPage from '../components/pages/general-error-page/GeneralErrorPage';
import WelcomingPage from '../components/pages/welcoming-page/WelcomingPage';
import { getRouteConfig } from '../config/routeConfig';
import { StepID } from '../config/stepConfig';
import { SøknadstypeContext } from '../context/SøknadstypeContext';
import { Søkerdata } from '../types/Søkerdata';
import { SøknadApiData } from '../types/SøknadApiData';
import { SøknadFormData, Søknadstype } from '../types/SøknadFormData';
import { navigateTo } from '../utils/navigationUtils';
import { getNextStepRoute, getSøknadRoute, isAvailable } from '../utils/routeUtils';
import DokumenterStep from './dokumenter-step/DokumenterStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';

export interface KvitteringInfo {
    søkernavn: string;
}

const getKvitteringInfoFromApiData = (søkerdata: Søkerdata): KvitteringInfo | undefined => {
    const { fornavn, mellomnavn, etternavn } = søkerdata.person;
    return {
        søkernavn: formatName(fornavn, etternavn, mellomnavn)
    };
};

const SøknadRoutes = () => {
    const [søknadHasBeenSent, setSøknadHasBeenSent] = React.useState(false);
    const [kvitteringInfo, setKvitteringInfo] = React.useState<KvitteringInfo | undefined>(undefined);
    const { values, resetForm } = useFormikContext<SøknadFormData>();
    const { søknadstype } = React.useContext(SøknadstypeContext);

    const history = useHistory();

    if (!søknadstype) {
        return <Route path={getRouteConfig(Søknadstype.ukjent).ERROR_PAGE_ROUTE} component={GeneralErrorPage} />;
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
                                navigateTo(`${routeConfig.SØKNAD_ROUTE_PREFIX}/${StepID.DOKUMENTER}`, history);
                            })
                        }
                    />
                )}
            />

            {isAvailable(søknadstype, StepID.DOKUMENTER, values) && (
                <Route
                    path={getSøknadRoute(søknadstype, StepID.DOKUMENTER)}
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
                    path={getSøknadRoute(søknadstype, StepID.OPPSUMMERING)}
                    render={() => (
                        <OppsummeringStep
                            søknadstype={søknadstype}
                            onApplicationSent={(apiData: SøknadApiData, søkerdata: Søkerdata) => {
                                const info = getKvitteringInfoFromApiData(søkerdata);
                                setKvitteringInfo(info);
                                setSøknadHasBeenSent(true);
                                resetForm();
                                navigateTo(routeConfig.SØKNAD_SENDT_ROUTE, history);
                            }}
                        />
                    )}
                />
            )}

            {isAvailable(søknadstype, routeConfig.SØKNAD_SENDT_ROUTE, values, søknadHasBeenSent) && (
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

export default SøknadRoutes;
