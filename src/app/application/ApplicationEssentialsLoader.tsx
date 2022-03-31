import React, { useEffect, useState } from 'react';
import { getSøker } from '../api/api';
import LoadWrapper from '../components/load-wrapper/LoadWrapper';
import { SøkerdataContextProvider } from '../context/ApplicantDataContext';
import { ApplicantData } from '../types/ApplicantData';
import { ApplicationType } from '../types/ApplicationType';
import {
    navigateToErrorPage,
    navigateToIkkeTilgangPage,
    navigateToLoginPage,
    navigateToWelcomePage,
    userIsCurrentlyOnErrorPage,
} from '../utils/navigationUtils';
import appSentryLogger from '../utils/appSentryLogger';
import { useHistory } from 'react-router';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core/lib/utils/apiUtils';

interface Props {
    contentLoadedRenderer: (søkerdata?: ApplicantData) => React.ReactNode;
    søknadstype: ApplicationType;
}

interface LoadState {
    isLoading: boolean;
    error?: boolean;
}

const ApplicationEssentialsLoader = ({ contentLoadedRenderer, søknadstype }: Props) => {
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: true });
    const [søkerdata, setSøkerdata] = useState<ApplicantData | undefined>();
    const history = useHistory();

    // TODO: Vedleggsopplastings status vil ikke virke hvis mellomlagring blir lagt på.
    async function loadAppEssentials() {
        if (søkerdata === undefined && loadState.error === undefined) {
            try {
                const { data: person } = await getSøker();
                setSøkerdata({
                    person: {
                        ...person,
                    },
                });
                setLoadState({ isLoading: false, error: undefined });
                if (userIsCurrentlyOnErrorPage(søknadstype)) {
                    navigateToWelcomePage(søknadstype);
                }
            } catch (error) {
                if (isForbidden(error)) {
                    navigateToIkkeTilgangPage(søknadstype);
                } else if (isUnauthorized(error)) {
                    navigateToLoginPage(søknadstype);
                } else if (!userIsCurrentlyOnErrorPage(søknadstype)) {
                    appSentryLogger.logApiError(error);
                    navigateToErrorPage(søknadstype, history);
                }
                // this timeout is set because if isLoading is updated in the state too soon,
                // the contentLoadedRenderer() will be called while the user is still on the wrong route,
                // because the redirect to routeConfig.ERROR_PAGE_ROUTE will not have happened yet.
                setTimeout(() => setLoadState({ isLoading: false, error: true }), 200);
            }
        }
    }

    useEffect(() => {
        loadAppEssentials();
    }, [søkerdata, loadState]);

    const { isLoading, error } = loadState;

    return (
        <LoadWrapper
            isLoading={isLoading && error === undefined}
            contentRenderer={() => (
                <SøkerdataContextProvider value={søkerdata}>
                    {contentLoadedRenderer(søkerdata)}
                </SøkerdataContextProvider>
            )}
        />
    );
};

export default ApplicationEssentialsLoader;
