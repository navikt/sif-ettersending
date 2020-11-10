import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { commonFieldErrorRenderer } from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { getRouteConfig, getRouteUrl } from '../../../config/routeConfig';
import { ApplicationType } from '../../../types/ApplicationType';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import './introPage.less';
import Knappelenke from '@navikt/sif-common-core/lib/components/knappelenke/Knappelenke';

const bem = bemUtils('introPage');

enum PageFormField {
    'søknadstype' = 'søknadstype',
}

interface PageFormValues {
    [PageFormField.søknadstype]: ApplicationType;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues>();

const IntroPage: React.StatelessComponent = () => {
    const intl = useIntl();
    const initialValues = {};
    return (
        <Page
            className={bem.block}
            title={intlHelper(intl, 'banner.intro')}
            topContentRenderer={() => <StepBanner text={intlHelper(intl, 'banner.intro')} />}>
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
                                legend={intlHelper(intl, 'page.intro.hvilkenTypeSøknad')}
                                radios={[
                                    {
                                        value: ApplicationType.pleiepenger,
                                        label: intlHelper(intl, 'page.intro.type.pleiepenger'),
                                    },
                                    {
                                        value: ApplicationType.omsorgspenger,
                                        label: intlHelper(intl, 'page.intro.type.omsorgspenger'),
                                    },
                                ]}
                            />
                        </Box>
                        {søknadstype && (
                            <Box margin="xl" textAlignCenter={true}>
                                <Box
                                    margin="xl"
                                    textAlignCenter={true}
                                    className={bem.element('gaTilSoknadenKnappelenkeWrapper')}>
                                    <Knappelenke
                                        type={'hoved'}
                                        href={getRouteUrl(
                                            søknadstype,
                                            getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE
                                        )}>
                                        <FormattedMessage id="page.intro.gåVidere" />
                                    </Knappelenke>
                                </Box>
                            </Box>
                        )}
                    </PageForm.Form>
                )}
            />
        </Page>
    );
};

export default IntroPage;
