import * as React from 'react';
// import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormField } from '../../types/ApplicationFormData';
import { validateRequiredField } from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
// import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { ApplicationType } from '../../types/ApplicationType';

const ValgOmsTypeStep = ({ onValidSubmit }: StepConfigProps) => {
    // const intl = useIntl();
    return (
        <ApplicationStep id={StepID.OMS_TYPE} onValidFormSubmit={onValidSubmit} useValidationErrorSummary={true}>
            <FormBlock>
                <ApplicationFormComponents.RadioPanelGroup
                    name={ApplicationFormField.søknadstype}
                    validate={validateRequiredField}
                    // legend={intlHelper(intl, 'page.intro.hvilkenTypeSøknad')}
                    radios={[
                        {
                            value: ApplicationType.OMP_UTV_KS,
                            label: 'Søknad om ekstra omsorgsdager ved kronisk sykt eller funksjonshemmet barn',
                            // label: intlHelper(intl, 'page.intro.type.pleiepenger'),
                        },
                        {
                            value: ApplicationType.OMP_UT_SNF,
                            label:
                                'Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere',
                            // label: intlHelper(intl, 'page.intro.type.pleiepenger'),
                        },
                        {
                            value: ApplicationType.OMP_UT_ARBEIDSTAKER,
                            label: 'Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler',
                            // label: intlHelper(intl, 'page.intro.type.pleiepenger'),
                        },
                        {
                            value: ApplicationType.OMP_UTV_MA,
                            label: 'Søknad om å bli regnet som at du er alene om omsorgen for barn',
                            // label: intlHelper(intl, 'page.intro.type.pleiepenger'),
                        },
                        {
                            value: ApplicationType.OMP_DELING,
                            label: 'Melding om deling av omsorgsdager',
                            // label: intlHelper(intl, 'page.intro.type.pleiepenger'),
                        },
                    ]}
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default ValgOmsTypeStep;
