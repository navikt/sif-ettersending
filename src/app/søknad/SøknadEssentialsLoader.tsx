import React, { useEffect, useState } from 'react';
import { getSøker } from '../api/api';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import { SøkerdataContextProvider } from '../context/SøkerdataContext';
import { Søkerdata } from '../types/Søkerdata';
import { Søknadstype } from '../types/SøknadFormData';
import * as apiUtils from '../utils/apiUtils';
import {
    navigateToErrorPage, navigateToLoginPage, navigateToWelcomePage, userIsCurrentlyOnErrorPage
} from '../utils/navigationUtils';

interface Props {
    contentLoadedRenderer: (søkerdata?: Søkerdata) => React.ReactNode;
    søknadstype: Søknadstype;
}

interface LoadState {
    isLoading: boolean;
    error?: boolean;
}

const SøknadEssentialsLoader = ({ contentLoadedRenderer, søknadstype }: Props) => {
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: true });
    const [søkerdata, setSøkerdata] = useState<Søkerdata | undefined>();

    async function loadAppEssentials() {
        if (søkerdata === undefined) {
            try {
                const { data: person } = await getSøker(søknadstype);
                setSøkerdata({ person });
                setLoadState({ isLoading: false, error: undefined });
                if (userIsCurrentlyOnErrorPage(søknadstype)) {
                    navigateToWelcomePage(søknadstype);
                }
            } catch (response) {
                if (apiUtils.isForbidden(response) || apiUtils.isUnauthorized(response)) {
                    navigateToLoginPage();
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

    if (isLoading && !!error) {
        return <LoadingPage />;
    }

    return <SøkerdataContextProvider value={søkerdata}>{contentLoadedRenderer(søkerdata)}</SøkerdataContextProvider>;
};

export default SøknadEssentialsLoader;
