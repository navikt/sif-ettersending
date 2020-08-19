import * as React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { useFormikContext } from 'formik';
import intlHelper from 'common/utils/intlUtils';
import FormikFileUploader from '../../components/formik-file-uploader/FormikFileUploader';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import { validateDocuments } from '../../validation/fieldValidations';
import ApplicationStep from '../ApplicationStep';
import {
    getTotalSize,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
    bytesToMbString,
    mbToMbString, MAX_TOTAL_ATTACHMENT_SIZE_IN_MB
} from '../../utils/attachmentUtils';
import CounsellorPanel from 'common/components/counsellor-panel/CounsellorPanel';
import EkspanderbarPSG from '../../components/EkspanderbarPSG/EkspanderbarPSG';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import FileUploadErrors from 'common/components/file-upload-errors/FileUploadErrors';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';

const DokumenterStep = ({ onValidSubmit, søknadstype }: StepConfigProps) => {
    const intl = useIntl();
    const { values } = useFormikContext<ApplicationFormData>();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const hasPendingUploads: boolean = (values.dokumenter || []).find((a) => a.pending === true) !== undefined;
    const totalSize = getTotalSize(values.dokumenter);

    return (
        <ApplicationStep
            id={StepID.DOKUMENTER}
            onValidFormSubmit={onValidSubmit}
            useValidationErrorSummary={true}
            buttonDisabled={hasPendingUploads}>
            <CounsellorPanel type={'normal'}>
                <div>
                    <Box padBottom={'l'}>Last opp vedlegg her.</Box>
                    <Box padBottom={'l'}>
                        Du kan kun laste opp filer av typen .pdf, .jpeg, .jpg og .png. Du kan laste opp så mange vedlegg
                        du vil, men samlet størrelse kan ikke overskride 24Mb.
                    </Box>
                </div>
            </CounsellorPanel>
            <FormBlock>
                <EkspanderbarPSG />
            </FormBlock>
            <FormBlock>
                <FormikFileUploader
                    søknadstype={søknadstype}
                    groupName={ApplicationFormField.dokumenterGruppe}
                    name={ApplicationFormField.dokumenter}
                    label={intlHelper(intl, 'steg.dokumenter.vedlegg')}
                    onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                    onFileInputClick={() => {
                        setFilesThatDidntGetUploaded([]);
                    }}
                    onUnauthorizedOrForbiddenUpload={() => navigateToLoginPage(søknadstype)}
                    validate={validateDocuments}
                />
            </FormBlock>{' '}
            {totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Box margin={'l'}>
                    <AlertStripeAdvarsel>
                        <p>
                            Du har lastet opp vedlegg med en samlet størrelse på { bytesToMbString(totalSize) }. Maks total samlet størrelse er { mbToMbString(MAX_TOTAL_ATTACHMENT_SIZE_IN_MB)}.
                            Hvis du trenger alle dokumentene, så må du sende inn flere ettersendinger.
                        </p>
                    </AlertStripeAdvarsel>
                </Box>
            )}
            <Box margin="m">
                <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Box>
            <Box margin="l">
                <UploadedDocumentsList wrapNoAttachmentsInBox={true} includeDeletionFunctionality={true} />
            </Box>
        </ApplicationStep>
    );
};

export default DokumenterStep;
