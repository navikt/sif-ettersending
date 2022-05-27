import * as React from 'react';
import { useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Step, { StepProps } from '../components/step/Step';
import { getStepConfig } from '../config/stepConfig';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import { getStepTexts } from '../utils/stepUtils';
import ApplicationFormComponents from './ApplicationFormComponents';
import { Button } from '@navikt/ds-react';

export interface FormikStepProps {
    children: React.ReactNode;
    showSubmitButton?: boolean;
    showButtonSpinner?: boolean;
    buttonDisabled?: boolean;
    onValidFormSubmit?: () => void;
    skipValidation?: boolean;
    customErrorSummary?: () => React.ReactNode;
}

type Props = FormikStepProps & StepProps;

const ApplicationStep = (props: Props) => {
    const intl = useIntl();
    const { søknadstype } = React.useContext(ApplicationTypeContext);

    if (!søknadstype) {
        return <div>what?</div>;
    }

    useLogSidevisning(props.id);

    const { children, onValidFormSubmit, showButtonSpinner, buttonDisabled, customErrorSummary, id } = props;
    const stepConfig = getStepConfig(søknadstype);
    const texts = getStepTexts(intl, id, stepConfig);
    return (
        <Step stepConfig={stepConfig} {...props} bannerTitle={intlHelper(intl, `banner.${søknadstype}`)}>
            <ApplicationFormComponents.Form
                onValidSubmit={onValidFormSubmit}
                includeButtons={false}
                includeValidationSummary={true}
                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                formFooter={
                    <div className="text-center">
                        <FormBlock>
                            <Button
                                variant="primary"
                                type="submit"
                                loading={showButtonSpinner}
                                disabled={buttonDisabled || false}>
                                {texts.nextButtonLabel}
                            </Button>
                        </FormBlock>
                    </div>
                }>
                {children}
                {customErrorSummary && <FormBlock>{customErrorSummary()}</FormBlock>}
            </ApplicationFormComponents.Form>
        </Step>
    );
};

export default ApplicationStep;
