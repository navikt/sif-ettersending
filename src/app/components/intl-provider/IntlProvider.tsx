import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import '@formatjs/intl-pluralrules/dist/locale-data/nb';
import '@formatjs/intl-pluralrules/dist/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { Locale } from 'common/types/Locale';
import pictureScanningGuideTexts from '../picture-scanning-guide/pictureScanningGuideTexts';

const appBokmålstekster = require('../../i18n/nb.json');
const appNynorsktekster = require('../../i18n/nn.json');

const bokmålstekster = { ...appBokmålstekster, ...pictureScanningGuideTexts.nb };
const nynorsktekster = { ...appNynorsktekster, ...pictureScanningGuideTexts.nn };

export interface IntlProviderProps {
    locale: Locale;
}

export interface IntlProviderProps {
    locale: Locale;
    onError?: (err: any) => void;
}

const IntlProvider: React.FunctionComponent<IntlProviderProps> = ({ locale, children, onError }) => {
    const messages = locale === 'nb' ? bokmålstekster : nynorsktekster;
    return (
        <Provider locale={locale} messages={messages} onError={onError}>
            {children}
        </Provider>
    );
};

export default IntlProvider;
