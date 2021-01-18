import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import TextareaSummary from '@navikt/sif-common-core/lib/components/textarea-summary/TextareaSummary';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { useFormikContext } from 'formik';
import Panel from 'nav-frontend-paneler';
import { Normaltekst } from 'nav-frontend-typografi';
import { sendApplicationToOmsorgspengerApi, sendApplicationToPleiepengerApi } from '../../api/api';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { getRouteConfig } from '../../config/routeConfig';
import { StepID } from '../../config/stepConfig';
import { SøkerdataContext } from '../../context/ApplicantDataContext';
import { ApplicantData } from '../../types/ApplicantData';
import { ApplicationApiData } from '../../types/ApplicationApiData';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';
import { ApplicationType } from '../../types/ApplicationType';
import { getSkjemanavn } from '../../types/skjemanavn';
import * as apiUtils from '../../utils/apiUtils';
import appSentryLogger from '../../utils/appSentryLogger';
import { mapApiDataToPleiepengerApiData, mapFormDataToApiData } from '../../utils/mapFormDataToApiData';
import { navigateTo, navigateToLoginPage } from '../../utils/navigationUtils';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
import SummaryBlock from './SummaryBlock';
import './oppsummering.less';

interface Props {
    søknadstype: ApplicationType;
    onApplicationSent: (apiValues: ApplicationApiData, søkerdata: ApplicantData) => void;
}

const OppsummeringStep = ({ onApplicationSent, søknadstype }: Props) => {
    const intl = useIntl();
    const { values } = useFormikContext<ApplicationFormData>();
    const søkerdata = React.useContext(SøkerdataContext);
    const history = useHistory();

    const [sendingInProgress, setSendingInProgress] = useState(false);

    if (!søkerdata) {
        return null;
    }

    const {
        person: { fornavn, mellomnavn, etternavn, fødselsnummer },
    } = søkerdata;

    const apiValues = mapFormDataToApiData(values, søknadstype, intl.locale as Locale);
    const { logSoknadSent, logSoknadFailed, logUserLoggedOut, logInfo } = useAmplitudeInstance();

    async function navigate(data: ApplicationApiData, søker: ApplicantData) {
        setSendingInProgress(true);
        const skjemanavn = getSkjemanavn(søknadstype);
        try {
            if (søknadstype === ApplicationType.omsorgspenger) {
                await sendApplicationToOmsorgspengerApi(data);
            } else {
                await sendApplicationToPleiepengerApi(mapApiDataToPleiepengerApiData(data));
            }
            await logSoknadSent(skjemanavn);
            onApplicationSent(apiValues, søker);
        } catch (error) {
            if (apiUtils.isForbidden(error) || apiUtils.isUnauthorized(error)) {
                logUserLoggedOut('Logget ut ved innsending');
                logInfo({ 'Antall filer': data.vedlegg.length });
                navigateToLoginPage(søknadstype);
            } else {
                await logSoknadFailed(skjemanavn);
                appSentryLogger.logApiError(error);
                navigateTo(getRouteConfig(søknadstype).ERROR_PAGE_ROUTE, history);
            }
        }
    }

    return (
        <ApplicationStep
            id={StepID.OPPSUMMERING}
            onValidFormSubmit={() => {
                setTimeout(() => {
                    navigate(apiValues, søkerdata); // La view oppdatere seg først
                });
            }}
            useValidationErrorSummary={true}
            buttonDisabled={sendingInProgress || apiValues.søknadstype === ApplicationType.ukjent}
            showButtonSpinner={sendingInProgress}>
            <CounsellorPanel>
                <FormattedMessage id="steg.oppsummering.info" />
            </CounsellorPanel>
            <Box margin="xl">
                <Panel border={true}>
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.søker.header')}>
                        <Normaltekst>{formatName(fornavn, etternavn, mellomnavn)}</Normaltekst>
                        <Normaltekst>
                            {intlHelper(intl, 'steg.oppsummering.fødselsnummer')}: {fødselsnummer}
                        </Normaltekst>
                    </SummaryBlock>

                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.hvaGjelder.header')}>
                        <TextareaSummary text={apiValues.beskrivelse} />
                    </SummaryBlock>

                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.dokumenter.header')}>
                        <UploadedDocumentsList includeDeletionFunctionality={false} />
                    </SummaryBlock>
                </Panel>
            </Box>

            <Box margin="l">
                <ApplicationFormComponents.ConfirmationCheckbox
                    label={intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger')}
                    name={ApplicationFormField.harBekreftetOpplysninger}
                    validate={(value) => {
                        let result;
                        if (value !== true) {
                            result = intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger.ikkeBekreftet');
                        }
                        return result;
                    }}
                />
            </Box>
        </ApplicationStep>
    );
};

export default OppsummeringStep;
