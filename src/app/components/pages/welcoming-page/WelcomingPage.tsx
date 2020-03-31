import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import { Sidetittel } from 'nav-frontend-typografi';
import Box from 'common/components/box/Box';
import Page from 'common/components/page/Page';
import bemHelper from 'common/utils/bemUtils';
import intlHelper from 'common/utils/intlUtils';
import { StepConfigProps } from '../../../config/stepConfig';
import BehandlingAvPersonopplysningerModal from '../../information/behandling-av-personopplysninger-modal/BehandlingAvPersonopplysningerModal';
import DinePlikterModal from '../../information/dine-plikter-modal/DinePlikterModal';
import SamtykkeForm from './SamtykkeForm';
import './welcomingPage.less';

const bem = bemHelper('welcomingPage');

type Props = Omit<StepConfigProps, 'formValues'>;

interface DialogState {
    dinePlikterModalOpen?: boolean;
    behandlingAvPersonopplysningerModalOpen?: boolean;
}

const WelcomingPage = ({ onValidSubmit, søknadstype }: Props) => {
    const [dialogState, setDialogState] = useState<DialogState>({});
    const intl = useIntl();

    const { dinePlikterModalOpen, behandlingAvPersonopplysningerModalOpen } = dialogState;

    return (
        <>
            <Page
                title={intlHelper(intl, `welcomingPage.title.${søknadstype}`)}
                className={bem.block}
                topContentRenderer={() => <StepBanner text={intlHelper(intl, `banner.${søknadstype}`)} />}>
                <Box margin="xxl">
                    <Sidetittel className={bem.element('title')}>
                        {intlHelper(intl, `welcomingPage.title.${søknadstype}`)}
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
            <DinePlikterModal
                isOpen={dinePlikterModalOpen === true}
                onRequestClose={() => setDialogState({ dinePlikterModalOpen: false })}
                contentLabel={intlHelper(intl, 'welcomingPage.modal.omDinePlikter.tittel')}
            />
            <BehandlingAvPersonopplysningerModal
                isOpen={behandlingAvPersonopplysningerModalOpen === true}
                onRequestClose={() => setDialogState({ behandlingAvPersonopplysningerModalOpen: false })}
                contentLabel={intlHelper(intl, 'welcomingPage.modal.behandlingAvPersonalia.tittel')}
            />
        </>
    );
};

export default WelcomingPage;
