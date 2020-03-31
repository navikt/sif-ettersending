import * as React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormField } from '../../types/ApplicationFormData';
import { validateBeskrivelse } from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';

const BeskrivelseStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    return (
        <ApplicationStep id={StepID.BESKRIVELSE} onValidFormSubmit={onValidSubmit} useValidationErrorSummary={true}>
            <FormBlock>
                <ApplicationFormComponents.Textarea
                    name={ApplicationFormField.beskrivelse}
                    label={intlHelper(intl, 'step.beskrivelse.hvaSendes.spm')}
                    maxLength={250}
                    validate={validateBeskrivelse(250)}
                    description={intlHelper(intl, 'step.beskrivelse.hvaSendes.tekst')}
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default BeskrivelseStep;
