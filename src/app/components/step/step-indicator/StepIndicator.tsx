import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import NAVStepIndicator from 'nav-frontend-stegindikator/lib/stegindikator';
import { default as Step } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { getStepTexts } from 'app/utils/stepUtils';
import { StepConfigInterface } from '../../../config/stepConfig';

interface StepIndicatorProps {
    activeStep: number;
    stepConfig: StepConfigInterface;
}

const renderSteps = (stepConfig: StepConfigInterface, intl: IntlShape) =>
    Object.keys(stepConfig).map((stepId) => {
        const { stepIndicatorLabel } = getStepTexts(intl, stepId as any, stepConfig);
        const { index } = stepConfig[stepId];
        return <Step label={stepIndicatorLabel} index={index} key={`${stepIndicatorLabel + index}`} />;
    });

const StepIndicator: React.FunctionComponent<StepIndicatorProps> = ({ activeStep, stepConfig }) => {
    const intl = useIntl();
    return (
        <NAVStepIndicator visLabel={false} autoResponsiv={false} aktivtSteg={activeStep}>
            {renderSteps(stepConfig, intl)}
        </NAVStepIndicator>
    );
};

export default StepIndicator;
