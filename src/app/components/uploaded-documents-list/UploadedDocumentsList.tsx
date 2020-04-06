import * as React from 'react';
import { useFormikContext } from 'formik';
import AttachmentListWithDeletion from 'common/components/attachment-list-with-deletion/AttachmentListWithDeletion';
import AttachmentList from 'common/components/attachment-list/AttachmentList';
import { Attachment } from 'common/types/Attachment';
import { containsAnyUploadedAttachments, fileExtensionIsValid } from 'common/utils/attachmentUtils';
import { removeElementFromArray } from 'common/utils/listUtils';
import { deleteFile } from '../../api/api';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';

interface Props {
    includeDeletionFunctionality: boolean;
    wrapNoAttachmentsInBox?: boolean;
}

const UploadedDocumentsList: React.FunctionComponent<Props> = ({
    wrapNoAttachmentsInBox,
    includeDeletionFunctionality
}) => {
    const { values, setFieldValue } = useFormikContext<ApplicationFormData>();

    const dokumenter: Attachment[] = values.dokumenter.filter(({ file }: Attachment) =>
        fileExtensionIsValid(file.name)
    );

    if (!containsAnyUploadedAttachments(dokumenter)) {
        return null;
    }

    if (includeDeletionFunctionality) {
        return (
            <AttachmentListWithDeletion
                attachments={dokumenter}
                onRemoveAttachmentClick={(attachment: Attachment) => {
                    attachment.pending = true;
                    setFieldValue(ApplicationFormField.dokumenter, dokumenter);
                    deleteFile(attachment.url!).then(
                        () => {
                            setFieldValue(
                                ApplicationFormField.dokumenter,
                                removeElementFromArray(attachment, dokumenter)
                            );
                        },
                        () => {
                            setFieldValue(
                                ApplicationFormField.dokumenter,
                                removeElementFromArray(attachment, dokumenter)
                            );
                        }
                    );
                }}
            />
        );
    } else {
        return <AttachmentList attachments={dokumenter} />;
    }
};

export default UploadedDocumentsList;
