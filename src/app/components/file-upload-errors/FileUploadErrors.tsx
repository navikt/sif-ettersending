import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface FileUploadErrorsProps {
    filesThatDidntGetUploaded: File[];
}

const FileUploadErrors: React.FunctionComponent<FileUploadErrorsProps> = ({ filesThatDidntGetUploaded }) => {
    if (filesThatDidntGetUploaded.length === 0) {
        return null;
    }

    return (
        <AlertStripeAdvarsel>
            <FormattedMessage id="fileUploadErrors.part1" />
            <ul>
                {filesThatDidntGetUploaded.map(({ name }) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </AlertStripeAdvarsel>
    );
};

export default FileUploadErrors;
