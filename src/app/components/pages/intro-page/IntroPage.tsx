import * as React from 'react';
import { useIntl } from 'react-intl';
import {
    commonFieldErrorRenderer
} from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import Lenke from 'nav-frontend-lenker';
import Box from 'common/components/box/Box';
import Page from 'common/components/page/Page';
import StepBanner from 'common/components/step-banner/StepBanner';
import bemUtils from 'common/utils/bemUtils';
import { getRouteConfig, getRouteUrl } from '../../../config/routeConfig';
import { Søknadstype } from '../../../types/SøknadFormData';

const bem = bemUtils('introPage');

enum PageFormField {
    'søknadstype' = 'søknadstype'
}

interface PageFormValues {
    [PageFormField.søknadstype]: Søknadstype;
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
                                legend="Hvilken type søknad gjelder denne ettersendingen?"
                                radios={[
                                    {
                                        value: Søknadstype.pleiepenger,
                                        label: 'Søknad om pleiepenger'
                                    },
                                    {
                                        value: Søknadstype.omsorgspenger,
                                        label: 'Søknad om omsorgspenger'
                                    }
                                ]}
                            />
                        </Box>
                        {søknadstype && (
                            <Box margin="xl" textAlignCenter={true}>
                                <Lenke
                                    href={getRouteUrl(søknadstype, getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE)}>
                                    Gå videre til ettersending
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
