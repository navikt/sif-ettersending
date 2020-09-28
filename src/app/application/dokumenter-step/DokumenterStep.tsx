import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
import CounsellorPanel from 'common/components/counsellor-panel/CounsellorPanel';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import FileUploadErrors from 'common/components/file-upload-errors/FileUploadErrors';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import PictureScanningGuide from 'common/components/picture-scanning-guide/PictureScanningGuide';
import { getTotalSizeOfAttachments, MAX_TOTAL_ATTACHMENT_SIZE_BYTES } from 'common/utils/attachmentUtils';

const DokumenterStep = ({ onValidSubmit, søknadstype }: StepConfigProps) => {
    const intl = useIntl();
    const { values } = useFormikContext<ApplicationFormData>();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const hasPendingUploads: boolean = (values.dokumenter || []).find((a) => a.pending === true) !== undefined;
    const totalSize = getTotalSizeOfAttachments(values.dokumenter);
    const sizeOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

    return (
        <ApplicationStep
            id={StepID.DOKUMENTER}
            onValidFormSubmit={onValidSubmit}
            useValidationErrorSummary={true}
            buttonDisabled={hasPendingUploads || sizeOver24Mb}>
            <CounsellorPanel type={'normal'}>
                <div>
                    <Box padBottom={'l'}>
                        <FormattedMessage id={'steg.dokumenter.infopanel.1'} />
                    </Box>
                    <Box padBottom={'l'}>
                        <FormattedMessage id={'steg.dokumenter.infopanel.2'} />
                    </Box>
                    <Box>
                        <FormattedMessage id={'steg.dokumenter.infopanel.3'} />
                    </Box>
                </div>
            </CounsellorPanel>
            <Box margin={'l'}>
                <PictureScanningGuide />
            </Box>
            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
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
            )}

            {totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Box margin={'l'}>
                    <AlertStripeAdvarsel>
                        <FormattedMessage id={'steg.dokumenter.advarsel.totalstørrelse'} />
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
