import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import ApplicationMessages from 'common/dev-utils/intl/application-messages/ApplicationMessages';
import { Locale } from 'common/types/Locale';
import { ApplicantData } from '../../types/ApplicantData';
import { getEnvironmentVariable } from '../../utils/envUtils';
import IntlProvider, { appBokmålstekster, appNynorsktekster } from '../intl-provider/IntlProvider';

interface ApplicationWrapperProps {
    søkerdata?: ApplicantData;
    children: React.ReactNode;
    locale: Locale;
    onChangeLocale: (locale: Locale) => void;
}

const ApplicationWrapper = ({ locale, children }: ApplicationWrapperProps) => {
    return (
        <IntlProvider locale={locale}>
            <Normaltekst tag="div">
                <Router basename={getEnvironmentVariable('PUBLIC_PATH')}>
                    {children}
                    <ApplicationMessages
                        messages={{
                            nb: appBokmålstekster,
                            nn: appNynorsktekster,
                        }}
                        title="Søknad pleiepenger"
                    />
                </Router>
            </Normaltekst>
        </IntlProvider>
    );
};

export default ApplicationWrapper;
