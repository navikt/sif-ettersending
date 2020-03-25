import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getSøker } from '../api/api';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import RouteConfig, { getRouteUrl } from '../config/routeConfig';
import { SøkerdataContextProvider } from '../context/SøkerdataContext';
import { Søkerdata } from '../types/Søkerdata';
import * as apiUtils from '../utils/apiUtils';
import { navigateToLoginPage, userIsCurrentlyOnErrorPage } from '../utils/navigationUtils';

interface Props {
    contentLoadedRenderer: (søkerdata?: Søkerdata) => React.ReactNode;
}

interface LoadState {
    isLoading: boolean;
    error?: boolean;
}

const SøknadEssentialsLoader = ({ contentLoadedRenderer }: Props) => {
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: true });
    const [søkerdata, setSøkerdata] = useState<Søkerdata | undefined>();

    function handleSøkerdataFetchError(response: AxiosError) {
        if (apiUtils.isForbidden(response) || apiUtils.isUnauthorized(response)) {
            navigateToLoginPage();
        } else if (!userIsCurrentlyOnErrorPage()) {
            window.location.assign(getRouteUrl(RouteConfig.ERROR_PAGE_ROUTE));
        }
        // this timeout is set because if isLoading is updated in the state too soon,
        // the contentLoadedRenderer() will be called while the user is still on the wrong route,
        // because the redirect to routeConfig.ERROR_PAGE_ROUTE will not have happened yet.
        setTimeout(() => setLoadState({ isLoading: false, error: true }), 200);
    }

    async function loadAppEssentials() {
        if (søkerdata === undefined) {
            try {
                const søkerResponse = await getSøker();
                setSøkerdata({ person: søkerResponse.data });
                setLoadState({ isLoading: true, error: undefined });
                if (userIsCurrentlyOnErrorPage()) {
                    window.location.assign(getRouteUrl(RouteConfig.WELCOMING_PAGE_ROUTE));
                }
            } catch (response) {
                handleSøkerdataFetchError(response);
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
