import * as React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormField } from '../../types/ApplicationFormData';
import { validateRequiredField } from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { ApplicationType } from '../../types/ApplicationType';

const ValgOmsTypeStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    return (
        <ApplicationStep id={StepID.OMS_TYPE} onValidFormSubmit={onValidSubmit} useValidationErrorSummary={true}>
            <FormBlock>
                <ApplicationFormComponents.RadioPanelGroup
                    name={ApplicationFormField.søknadstype}
                    validate={validateRequiredField}
                    radios={[
                        {
                            value: ApplicationType.ekstraomsorgsdager,
                            label: intlHelper(intl, 'step.omstype.radio.label.ekstraomsorgsdager'),
                        },
                        {
                            value: ApplicationType.utbetaling,
                            label: intlHelper(intl, 'step.omstype.radio.label.utbetaling'),
                        },
                        {
                            value: ApplicationType.utbetalingarbeidstaker,
                            label: intlHelper(intl, 'step.omstype.radio.label.utbetalingarbeidstaker'),
                        },
                        {
                            value: ApplicationType.regnetsomalene,
                            label: intlHelper(intl, 'step.omstype.radio.label.regnetsomalene'),
                        },
                        {
                            value: ApplicationType.deling,
                            label: intlHelper(intl, 'step.omstype.radio.label.deling'),
                        },
                    ]}
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default ValgOmsTypeStep;
