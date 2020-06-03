import * as React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormField } from '../../types/ApplicationFormData';
import { validateBeskrivelse, MAX_BESKRIVELSE_LENGTH } from '../../validation/fieldValidations';
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
                    maxLength={MAX_BESKRIVELSE_LENGTH}
                    validate={validateBeskrivelse(MAX_BESKRIVELSE_LENGTH)}
                    description={
                        <div>
                            Her beskriver du hvilken dokumentasjon du skal sende. Det er også til hjelp for oss, om du
                            forteller at du ettersender fordi:
                            <ul>
                                <li>vi har etterspurt mer dokumentasjon fra deg, eller</li>
                                <li>om du ikke hadde dokumentasjonen klar da du sendte inn søknaden</li>
                            </ul>
                            <p>
                                Du kan ikke skrive spørsmål til oss her. Se informasjon om hvordan du kommer i kontakt
                                med oss under "Kontakt oss" nederst på siden.
                            </p>
                        </div>
                    }
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default BeskrivelseStep;
