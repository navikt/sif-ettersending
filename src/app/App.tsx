import * as React from 'react';
import { render } from 'react-dom';
import AppStatusWrapper from '@navikt/sif-common-core/lib/components/app-status-wrapper/AppStatusWrapper';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import moment from 'moment';
import Modal from 'nav-frontend-modal';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import UnavailablePage from './components/pages/unavailable-page/UnavailablePage';
import appSentryLogger from './utils/appSentryLogger';
import { getEnvironmentVariable } from './utils/envUtils';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from './utils/localeUtils';
import YtelseSwitch from './YtelseSwitch';
import 'common/styles/globalStyles.less';

appSentryLogger.init();

const localeFromSessionStorage = getLocaleFromSessionStorage();

moment.locale(localeFromSessionStorage);

const getAppStatusSanityConfig = () => {
    const projectId = getEnvironmentVariable('APPSTATUS_PROJECT_ID');
    const dataset = getEnvironmentVariable('APPSTATUS_DATASET');
    return !projectId || !dataset ? undefined : { projectId, dataset };
};

const APPLICATION_KEY = 'ettersending';

const App: React.FunctionComponent = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);
    const appStatusSanityConfig = getAppStatusSanityConfig();
    return (
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
    );
};

const root = document.getElementById('app');
Modal.setAppElement('#app');
render(<App />, root);
