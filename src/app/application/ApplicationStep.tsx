import * as React from 'react';
import { useIntl } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import FormBlock from 'common/components/form-block/FormBlock';
import { commonFieldErrorRenderer } from 'common/utils/commonFieldErrorRenderer';
import Step, { StepProps } from '../components/step/Step';
import { getStepConfig } from '../config/stepConfig';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import { getStepTexts } from '../utils/stepUtils';
import ApplicationFormComponents from './ApplicationFormComponents';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';

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

const ApplicationStep: React.FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { søknadstype } = React.useContext(ApplicationTypeContext);
    if (!søknadstype) {
        return <div>what?</div>;
    }
    const { children, onValidFormSubmit, showButtonSpinner, buttonDisabled, customErrorSummary, id } = props;
    const stepConfig = getStepConfig(søknadstype);
    const texts = getStepTexts(intl, id, stepConfig);
    return (
        <Step stepConfig={stepConfig} {...props} bannerTitle={intlHelper(intl, `banner.${søknadstype}`)}>
            <ApplicationFormComponents.Form
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
            </ApplicationFormComponents.Form>
        </Step>
    );
};

export default ApplicationStep;
