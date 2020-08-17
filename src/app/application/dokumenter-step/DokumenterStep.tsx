import * as React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { useFormikContext } from 'formik';
import HelperTextPanel from 'common/components/helper-text-panel/HelperTextPanel';
import intlHelper from 'common/utils/intlUtils';
import FileUploadErrors from 'common/components/file-upload-errors/FileUploadErrors';
import FormikFileUploader from '../../components/formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from 'common/components/picture-scanning-guide/PictureScanningGuide';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import { validateDocuments } from '../../validation/fieldValidations';
import ApplicationStep from '../ApplicationStep';
import ProgressBar from 'fremdriftslinje';
import {
    getPercentageUsed,
    getTotalSize,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
    toMbString,
} from '../../utils/attachmentUtils';

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
            <FormBlock>
                <HelperTextPanel>
                    <PictureScanningGuide />
                </HelperTextPanel>
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
            </FormBlock>
            {totalSize > 0.5 * MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Box margin={'m'}>
                    <ProgressBar
                        now={getPercentageUsed(totalSize, MAX_TOTAL_ATTACHMENT_SIZE_BYTES)}
                        status={
                            getPercentageUsed(totalSize, MAX_TOTAL_ATTACHMENT_SIZE_BYTES) === 100 ? 'error' : 'done'
                        }>
                        <span>
                            {toMbString(totalSize)} / {toMbString(MAX_TOTAL_ATTACHMENT_SIZE_BYTES)}
                        </span>
                    </ProgressBar>
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
