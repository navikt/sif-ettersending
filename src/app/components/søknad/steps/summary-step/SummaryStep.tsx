import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { useFormikContext } from 'formik';
import Panel from 'nav-frontend-paneler';
import { Normaltekst } from 'nav-frontend-typografi';
import { sendApplication } from '../../../../api/api';
import RouteConfig from '../../../../config/routeConfig';
import { StepID } from '../../../../config/stepConfig';
import { SøkerdataContext } from '../../../../context/SøkerdataContext';
import { Søkerdata } from '../../../../types/Søkerdata';
import { SøknadApiData } from '../../../../types/SøknadApiData';
import { SøknadFormData, SøknadFormField } from '../../../../types/SøknadFormData';
import * as apiUtils from '../../../../utils/apiUtils';
import { mapFormDataToApiData } from '../../../../utils/mapFormDataToApiData';
import { navigateTo, navigateToLoginPage } from '../../../../utils/navigationUtils';
import UploadedDocumentsList from '../../../uploaded-documents-list/UploadedDocumentsList';
import FormikStep from '../../formik-step/FormikStep';
import TypedFormComponents from '../../typed-form-components/TypedFormComponents';
import SummaryBlock from './SummaryBlock';
import './summary.less';

interface Props {
    onApplicationSent: (apiValues: SøknadApiData, søkerdata: Søkerdata) => void;
}

const SummaryStep: React.StatelessComponent<Props> = ({ onApplicationSent }) => {
    const intl = useIntl();
    const { values } = useFormikContext<SøknadFormData>();
    const søkerdata = React.useContext(SøkerdataContext);
    const history = useHistory();

    const [sendingInProgress, setSendingInProgress] = useState(false);

    async function navigate(data: SøknadApiData, søker: Søkerdata) {
        setSendingInProgress(true);
        try {
            await sendApplication(data);
            onApplicationSent(apiValues, søker);
        } catch (error) {
            if (apiUtils.isForbidden(error) || apiUtils.isUnauthorized(error)) {
                navigateToLoginPage();
            } else {
                navigateTo(RouteConfig.ERROR_PAGE_ROUTE, history);
            }
        }
    }

    if (!søkerdata) {
        return null;
    }

    const {
        person: { fornavn, mellomnavn, etternavn, fødselsnummer }
    } = søkerdata;
    const apiValues = mapFormDataToApiData(values, intl.locale as Locale);

    return (
        <FormikStep
            id={StepID.SUMMARY}
            onValidFormSubmit={() => {
                setTimeout(() => {
                    navigate(apiValues, søkerdata); // La view oppdatere seg først
                });
            }}
            useValidationErrorSummary={true}
            buttonDisabled={sendingInProgress}
            showButtonSpinner={sendingInProgress}>
            <CounsellorPanel>
                <FormattedMessage id="steg.oppsummering.info" />
            </CounsellorPanel>

            <Box margin="xl">
                <Panel border={true}>
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.søker.header')}>
                        <Normaltekst>{formatName(fornavn, etternavn, mellomnavn)}</Normaltekst>
                        <Normaltekst>
                            <FormattedMessage id="steg.oppsummering.søker.fnr" values={{ fødselsnummer }} />
                        </Normaltekst>
                    </SummaryBlock>

                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.søknadstype')}>
                        Søknaden gjelder {apiValues.søknadstype}
                    </SummaryBlock>

                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.vedlegg')}>
                        <UploadedDocumentsList includeDeletionFunctionality={false} />
                    </SummaryBlock>
                </Panel>
            </Box>

            <Box margin="l">
                <TypedFormComponents.ConfirmationCheckbox
                    label={intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger')}
                    name={SøknadFormField.harBekreftetOpplysninger}
                    validate={(value) => {
                        let result;
                        if (value !== true) {
                            result = intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger.ikkeBekreftet');
                        }
                        return result;
                    }}
                />
            </Box>
        </FormikStep>
    );
};

export default SummaryStep;
