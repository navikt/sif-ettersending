import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { Locale } from 'common/types/Locale';

const pictureScanningGuideTexts = {
    nb: require('common/components/picture-scanning-guide/picturescanningguide.nb.json'),
    nn: require('common/components/picture-scanning-guide/picturescanningguide.nb.json'),
};

export const appBokmålstekster = require('../../i18n/nb.json');
export const appNynorsktekster = require('../../i18n/nn.json');

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
