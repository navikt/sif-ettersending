import * as React from 'react';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormField } from '../../types/ApplicationFormData';
import { validateBeskrivelse } from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';

const BeskrivelseStep = ({ onValidSubmit }: StepConfigProps) => {
    return (
        <ApplicationStep id={StepID.BESKRIVELSE} onValidFormSubmit={onValidSubmit} useValidationErrorSummary={true}>
            <FormBlock>
                <CounsellorPanel>Skal det være en intro til denne?</CounsellorPanel>
            </FormBlock>
            <FormBlock>
                <ApplicationFormComponents.Textarea
                    name={ApplicationFormField.beskrivelse}
                    label="Beskriv hva ettersendingen gjelder"
                    maxLength={1000}
                    validate={validateBeskrivelse(1000)}
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default BeskrivelseStep;
