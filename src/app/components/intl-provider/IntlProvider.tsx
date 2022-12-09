import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { velkommenPageMessages } from '../pages/welcoming-page/velkommenPageMessages';

const appBokmålstekster = require('../../i18n/nb.json');

export const appMessages = {
    nb: { ...appBokmålstekster, ...velkommenPageMessages.nb },
};

export interface IntlProviderProps {
    locale: Locale;
    onError?: (err: any) => void;
    children?: React.ReactNode;
}

const IntlProvider = ({ locale, children, onError }: IntlProviderProps) => {
    return (
        <Provider locale={'nb'} messages={appMessages.nb} onError={onError}>
            {children}
        </Provider>
    );
};

export default IntlProvider;
