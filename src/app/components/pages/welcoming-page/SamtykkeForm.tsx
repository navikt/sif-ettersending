import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import bemHelper from '@navikt/sif-common-core/lib/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import getIntlFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import ApplicationFormComponents from '../../../application/ApplicationFormComponents';
import { ApplicationFormField } from '../../../types/ApplicationFormData';
import { getCheckedValidator } from '@navikt/sif-common-formik/lib/validation';

interface Props {
    onConfirm: () => void;
    onOpenDinePlikterModal: () => void;
    openBehandlingAvPersonopplysningerModal: () => void;
}

const bem = bemHelper('welcomingPage');

const SamtykkeForm = ({ onConfirm, onOpenDinePlikterModal, openBehandlingAvPersonopplysningerModal }: Props) => {
    const intl = useIntl();
    return (
        <ApplicationFormComponents.Form
            onValidSubmit={onConfirm}
            includeButtons={false}
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}>
            <FormBlock>
                <FormBlock>
                    <ApplicationFormComponents.ConfirmationCheckbox
                        label={intlHelper(intl, 'welcomingPage.samtykke.tekst')}
                        name={ApplicationFormField.harForståttRettigheterOgPlikter}
                        validate={getCheckedValidator()}>
                        <FormattedMessage
                            id="welcomingPage.samtykke.harForståttLabel"
                            values={{
                                plikterLink: (
                                    <Lenke href="#" onClick={onOpenDinePlikterModal}>
                                        {intlHelper(intl, 'welcomingPage.samtykke.harForståttLabel.lenketekst')}
                                    </Lenke>
                                ),
                            }}
                        />
                    </ApplicationFormComponents.ConfirmationCheckbox>
                </FormBlock>
                <FormBlock>
                    <Hovedknapp className={bem.element('startApplicationButton')}>
                        {intlHelper(intl, 'step.button.gåVidere')}
                    </Hovedknapp>
                </FormBlock>
                <FormBlock>
                    <div className={bem.element('personopplysningModalLenke')}>
                        <Lenke href="#" onClick={openBehandlingAvPersonopplysningerModal}>
                            <FormattedMessage id="welcomingPage.personopplysninger.lenketekst" />
                        </Lenke>
                    </div>
                </FormBlock>
            </FormBlock>
        </ApplicationFormComponents.Form>
    );
};
export default SamtykkeForm;
