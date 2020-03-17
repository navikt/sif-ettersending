import * as React from 'react';
import { useIntl } from 'react-intl';
import { useFormikContext } from 'formik';
import Box from 'common/components/box/Box';
import HelperTextPanel from 'common/components/helper-text-panel/HelperTextPanel';
import intlHelper from 'common/utils/intlUtils';
import { StepConfigProps, StepID } from '../../../../config/stepConfig';
import { SøknadFormData, SøknadFormField } from '../../../../types/SøknadFormData';
import { navigateToLoginPage } from '../../../../utils/navigationUtils';
import { validateDocuments } from '../../../../validation/fieldValidations';
import FileUploadErrors from '../../../file-upload-errors/FileUploadErrors';
import FormikFileUploader from '../../../formik-file-uploader/FormikFileUploader';
import UploadedDocumentsList from '../../../uploaded-documents-list/UploadedDocumentsList';
import FormikStep from '../../formik-step/FormikStep';

const DocumentsStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    const { values } = useFormikContext<SøknadFormData>();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const hasPendingUploads: boolean = (values.dokumenter || []).find((a) => a.pending === true) !== undefined;

    return (
        <FormikStep
            id={StepID.DOCUMENTS}
            onValidFormSubmit={onValidSubmit}
            useValidationErrorSummary={true}
            buttonDisabled={hasPendingUploads}>
            <HelperTextPanel>sdf</HelperTextPanel>
            <Box margin="l">
                <FormikFileUploader
                    name={SøknadFormField.dokumenter}
                    label={intlHelper(intl, 'steg.documents.vedlegg')}
                    onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                    onFileInputClick={() => {
                        setFilesThatDidntGetUploaded([]);
                    }}
                    onUnauthorizedOrForbiddenUpload={navigateToLoginPage}
                    validate={validateDocuments}
                />
            </Box>
            <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            <UploadedDocumentsList wrapNoAttachmentsInBox={true} includeDeletionFunctionality={true} />
        </FormikStep>
    );
};

export default DocumentsStep;
