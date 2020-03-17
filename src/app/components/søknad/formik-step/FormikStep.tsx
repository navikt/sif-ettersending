import * as React from 'react';
import { useIntl } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import FormBlock from 'common/components/form-block/FormBlock';
import { commonFieldErrorRenderer } from 'common/utils/commonFieldErrorRenderer';
import { getStepConfig } from '../../../config/stepConfig';
import { getStepTexts } from '../../../utils/stepUtils';
import Step, { StepProps } from '../../step/Step';
import TypedFormComponents from '../typed-form-components/TypedFormComponents';

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

const FormikStep: React.FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { children, onValidFormSubmit, showButtonSpinner, buttonDisabled, customErrorSummary, id } = props;
    const stepConfig = getStepConfig();
    const texts = getStepTexts(intl, id, stepConfig);
    return (
        <Step stepConfig={stepConfig} {...props}>
            <TypedFormComponents.Form
                onValidSubmit={onValidFormSubmit}
                includeButtons={false}
                fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}>
                {children}
                {customErrorSummary && <FormBlock>{customErrorSummary()}</FormBlock>}
                <FormBlock>
                    <Knapp
                        type="hoved"
                        htmlType="submit"
                        className={'step__button'}
                        spinner={showButtonSpinner || false}
                        disabled={buttonDisabled || false}
                        aria-label={texts.nextButtonAriaLabel}>
                        {texts.nextButtonLabel}
                    </Knapp>
                </FormBlock>
            </TypedFormComponents.Form>
        </Step>
    );
};

export default FormikStep;
