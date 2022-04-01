import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import InfoDialog from '@navikt/sif-common-core/lib/components/dialogs/info-dialog/InfoDialog';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import bemHelper from '@navikt/sif-common-core/lib/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { Sidetittel } from 'nav-frontend-typografi';
import { StepConfigProps } from '../../../config/stepConfig';
import BehandlingAvPersonopplysningerContent from '../../information/behandling-av-personopplysninger-content/BehandlingAvPersonopplysningerContent';
import DinePlikterContent from '../../information/dine-plikter-content/DinePlikterContent';
import SamtykkeForm from './SamtykkeForm';
import './welcomingPage.less';

const bem = bemHelper('welcomingPage');

type Props = Omit<StepConfigProps, 'formValues'>;

interface DialogState {
    dinePlikterModalOpen?: boolean;
    behandlingAvPersonopplysningerModalOpen?: boolean;
}

interface DialogState {
    dinePlikterModalOpen?: boolean;
    behandlingAvPersonopplysningerModalOpen?: boolean;
}

const WelcomingPage = ({ onValidSubmit, søknadstype }: Props) => {
    const [dialogState, setDialogState] = useState<DialogState>({});
    const { dinePlikterModalOpen, behandlingAvPersonopplysningerModalOpen } = dialogState;
    const intl = useIntl();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <>
            <Page
                title={intlHelper(intl, `application.title.${søknadstype}`)}
                className={bem.block}
                topContentRenderer={() => <StepBanner text={intlHelper(intl, `banner.${søknadstype}`)} />}>
                <Box margin="xxl">
                    <Sidetittel className={bem.element('title')}>
                        {intlHelper(intl, `application.title.${søknadstype}`)}
                    </Sidetittel>
                </Box>
                <Box margin="xl">
                    <CounsellorPanel>{intlHelper(intl, 'welcomingPage.counsellor')}</CounsellorPanel>
                </Box>
                <SamtykkeForm
                    onOpenDinePlikterModal={() => setDialogState({ dinePlikterModalOpen: true })}
                    openBehandlingAvPersonopplysningerModal={() =>
                        setDialogState({ behandlingAvPersonopplysningerModalOpen: true })
                    }
                    onConfirm={onValidSubmit}
                />
            </Page>
            <InfoDialog
                contentLabel={intlHelper(intl, 'welcomingPage.modal.omDinePlikter.tittel')}
                isOpen={dinePlikterModalOpen === true}
                onRequestClose={(): void => setDialogState({ dinePlikterModalOpen: false })}>
                <DinePlikterContent søknadstype={søknadstype} />
            </InfoDialog>

            <InfoDialog
                isOpen={behandlingAvPersonopplysningerModalOpen === true}
                onRequestClose={(): void => setDialogState({ behandlingAvPersonopplysningerModalOpen: false })}
                contentLabel={intlHelper(intl, 'welcomingPage.modal.behandlingAvPersonalia.tittel')}>
                <BehandlingAvPersonopplysningerContent />
            </InfoDialog>
        </>
    );
};

export default WelcomingPage;
