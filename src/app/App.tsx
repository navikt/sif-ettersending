import * as React from 'react';
import { render } from 'react-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude/lib';
import AppStatusWrapper from '@navikt/sif-common-core/lib/components/app-status-wrapper/AppStatusWrapper';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import Modal from 'nav-frontend-modal';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import UnavailablePage from './components/pages/unavailable-page/UnavailablePage';
import appSentryLogger from './utils/appSentryLogger';
import { getEnvironmentVariable } from './utils/envUtils';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from './utils/localeUtils';
import YtelseSwitch from './YtelseSwitch';
import '@navikt/sif-common-core/lib/styles/globalStyles.less';

export const APPLICATION_KEY = 'ettersending';

appSentryLogger.init();

const localeFromSessionStorage = getLocaleFromSessionStorage();

const getAppStatusSanityConfig = () => {
    const projectId = getEnvironmentVariable('APPSTATUS_PROJECT_ID');
    const dataset = getEnvironmentVariable('APPSTATUS_DATASET');
    return !projectId || !dataset ? undefined : { projectId, dataset };
};

const App = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);
    const appStatusSanityConfig = getAppStatusSanityConfig();
    return (
        <AmplitudeProvider
            applicationKey={APPLICATION_KEY}
            team="sykdom-i-familien"
            isActive={getEnvironmentVariable('USE_AMPLITUDE') === 'true'}>
            <ApplicationWrapper
                locale={locale}
                onChangeLocale={(activeLocale: Locale) => {
                    setLocaleInSessionStorage(activeLocale);
                    setLocale(activeLocale);
                }}>
                {appStatusSanityConfig ? (
                    <AppStatusWrapper
                        applicationKey={APPLICATION_KEY}
                        sanityConfig={appStatusSanityConfig}
                        contentRenderer={() => <YtelseSwitch />}
                        unavailableContentRenderer={() => <UnavailablePage />}
                    />
                ) : (
                    <YtelseSwitch />
                )}
            </ApplicationWrapper>
        </AmplitudeProvider>
    );
};

const root = document.getElementById('app');
Modal.setAppElement('#app');
render(<App />, root);
