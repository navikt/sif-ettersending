import React, { useEffect, useState } from 'react';
import { getSøker } from '../api/api';
import LoadWrapper from '../components/load-wrapper/LoadWrapper';
import { SøkerdataContextProvider } from '../context/ApplicantDataContext';
import { ApplicantData } from '../types/ApplicantData';
import { ApplicationType } from '../types/ApplicationType';
import * as apiUtils from '../utils/apiUtils';
import {
    navigateToErrorPage, navigateToLoginPage, navigateToWelcomePage, userIsCurrentlyOnErrorPage
} from '../utils/navigationUtils';

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

    async function loadAppEssentials() {
        if (søkerdata === undefined && loadState.error === undefined) {
            try {
                const { data: person } = await getSøker(søknadstype);
                setSøkerdata({ person });
                setLoadState({ isLoading: false, error: undefined });
                if (userIsCurrentlyOnErrorPage(søknadstype)) {
                    navigateToWelcomePage(søknadstype);
                }
            } catch (response) {
                if (apiUtils.isForbidden(response) || apiUtils.isUnauthorized(response)) {
                    navigateToLoginPage(søknadstype);
                } else if (!userIsCurrentlyOnErrorPage(søknadstype)) {
                    navigateToErrorPage(søknadstype);
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
