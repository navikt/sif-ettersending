import * as React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormField } from '../../types/ApplicationFormData';
import { validateBeskrivelse, MAX_BESKRIVELSE_LENGTH } from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Lenke from 'nav-frontend-lenker';

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
                            <FormattedMessage id="step.beskrivelse.intro.1" />
                            <ul>
                                <li>
                                    <FormattedMessage id="step.beskrivelse.intro.li.1" />
                                </li>
                                <li>
                                    <FormattedMessage id="step.beskrivelse.intro.li.2" />
                                </li>
                            </ul>
                            <p>
                                <FormattedMessage
                                    id="step.beskrivelse.intro.2"
                                    values={{
                                        kontaktMedOssLink: (
                                            <Lenke
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={'https://www.nav.no/person/kontakt-oss/nb/'}>
                                                <FormattedMessage id="step.beskrivelse.intro.2.1" />
                                            </Lenke>
                                        ),
                                    }}
                                />
                            </p>
                        </div>
                    }
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default BeskrivelseStep;
