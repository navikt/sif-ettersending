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

const DokumenterStep = ({ onValidSubmit, søknadstype }: StepConfigProps) => {
    const intl = useIntl();
    const { values } = useFormikContext<ApplicationFormData>();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const hasPendingUploads: boolean = (values.dokumenter || []).find((a) => a.pending === true) !== undefined;

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
