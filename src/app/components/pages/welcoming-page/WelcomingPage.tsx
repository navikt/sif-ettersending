import React from 'react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { StepConfigProps } from '../../../config/stepConfig';
import OmSøknaden from './components/OmSøknaden';
import VelkommenGuide from './components/VelkommenGuide';
import SamtykkeForm from './SamtykkeForm';

type Props = Omit<StepConfigProps, 'formValues'>;

const WelcomingPage = ({ onValidSubmit, søknadstype }: Props) => {
    const intl = useIntl();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <>
            <Page
                title={intlHelper(intl, `application.title.${søknadstype}`)}
                topContentRenderer={() => <StepBanner text={intlHelper(intl, `banner.${søknadstype}`)} />}>
                <VelkommenGuide />
                {/* <Box margin="xxl">
                    <Sidetittel className={bem.element('title')}>
                        {intlHelper(intl, `application.title.${søknadstype}`)}
                    </Sidetittel>
                </Box> */}
                {/* <Box margin="xl">
                    <CounsellorPanel>{intlHelper(intl, 'welcomingPage.counsellor')}</CounsellorPanel>
                </Box> */}
                <OmSøknaden />
                <SamtykkeForm onConfirm={onValidSubmit} />
            </Page>
        </>
    );
};

export default WelcomingPage;
