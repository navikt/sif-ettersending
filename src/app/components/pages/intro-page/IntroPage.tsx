import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { getTypedFormComponents, UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import { ApplicationType } from '../../../types/ApplicationType';
import { navigateToWelcomePage } from '../../../utils/navigationUtils';
import './introPage.less';

const bem = bemUtils('introPage');

enum PageFormField {
    'søknadstype' = 'søknadstype',
}

interface PageFormValues {
    [PageFormField.søknadstype]: ApplicationType;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues, ValidationError>();

const IntroPage = () => {
    const intl = useIntl();
    const initialValues = {};
    useLogSidevisning(SIFCommonPageKey.intro);
    return (
        <Page
            className={bem.block}
            title={intlHelper(intl, 'banner.intro')}
            topContentRenderer={() => <StepBanner tag="h1" text={intlHelper(intl, 'banner.intro')} />}>
            <PageForm.FormikWrapper
                onSubmit={({ søknadstype }) => {
                    if (søknadstype) {
                        setTimeout(() => {
                            navigateToWelcomePage(søknadstype);
                        });
                    }
                }}
                initialValues={initialValues}
                renderForm={({ values: { søknadstype } }) => {
                    const kanFortsette: boolean = søknadstype ? true : false;
                    return (
                        <PageForm.Form
                            formErrorHandler={getIntlFormErrorHandler(intl)}
                            submitButtonLabel={intlHelper(intl, 'step.button.gåVidere')}
                            includeButtons={kanFortsette}
                            noButtonsContentRenderer={() =>
                                kanFortsette ? undefined : (
                                    <UnansweredQuestionsInfo>
                                        <FormattedMessage id="page.form.ubesvarteSpørsmålInfo" />
                                    </UnansweredQuestionsInfo>
                                )
                            }>
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
                        </PageForm.Form>
                    );
                }}
            />
        </Page>
    );
};

export default IntroPage;
