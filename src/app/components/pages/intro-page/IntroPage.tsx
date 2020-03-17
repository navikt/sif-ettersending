import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    commonFieldErrorRenderer
} from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import Lenke from 'nav-frontend-lenker';
import Box from 'common/components/box/Box';
import InformationPoster from 'common/components/information-poster/InformationPoster';
import Page from 'common/components/page/Page';
import StepBanner from 'common/components/step-banner/StepBanner';
import bemUtils from 'common/utils/bemUtils';
import RouteConfig, { getRouteUrl } from '../../../config/routeConfig';
import { Søknadstype } from '../../../types/SøknadFormData';

const bem = bemUtils('introPage');

enum PageFormField {
    'søknadstype' = 'søknadstype'
}

interface PageFormValues {
    [PageFormField.søknadstype]: YesOrNo;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues>();

const IntroPage: React.StatelessComponent = () => {
    const intl = useIntl();
    const initialValues = {};
    return (
        <Page
            className={bem.block}
            title="Ettersending av dokumenter"
            topContentRenderer={() => <StepBanner text="Ettersending av dokumenter" />}>
            <Box margin="xxxl" padBottom="l">
                <InformationPoster>
                    Dersom du nylig har sendt inn en søknad om pleiepenger for sykt barn, søknad om ekstra ....
                </InformationPoster>
            </Box>

            <PageForm.FormikWrapper
                onSubmit={() => null}
                initialValues={initialValues}
                renderForm={({ values: { søknadstype } }) => (
                    <PageForm.Form
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        includeButtons={false}>
                        <Box margin="xl">
                            <PageForm.RadioPanelGroup
                                name={PageFormField.søknadstype}
                                legend="Hvilken søknad gjelder denne ettersendingen?"
                                radios={[
                                    {
                                        value: Søknadstype.pleiepengerSyktBarn,
                                        label: 'Pleiepenger for sykt barn eller person over 18 år'
                                    },
                                    {
                                        value: Søknadstype.ekstraOmsorgsdager,
                                        label: 'Ekstra omsorgsdager'
                                    }
                                ]}
                            />
                        </Box>
                        {søknadstype && (
                            <Box margin="xl" textAlignCenter={true}>
                                <Lenke href={getRouteUrl(RouteConfig.WELCOMING_PAGE_ROUTE)}>
                                    <FormattedMessage id="gotoApplicationLink.lenketekst" />
                                </Lenke>
                            </Box>
                        )}
                    </PageForm.Form>
                )}
            />
        </Page>
    );
};

export default IntroPage;
