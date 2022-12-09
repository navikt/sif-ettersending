import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { getCheckedValidator } from '@navikt/sif-common-formik/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik/lib/validation/intlFormErrorHandler';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import ApplicationFormComponents from '../../../application/ApplicationFormComponents';
import getLenker from '../../../lenker';
import { ApplicationFormField } from '../../../types/ApplicationFormData';
import InfoList from './components/info-list/InfoList';

interface Props {
    onConfirm: () => void;
}

const SamtykkeForm = ({ onConfirm }: Props) => {
    const intl = useIntl();
    return (
        <ApplicationFormComponents.Form
            onValidSubmit={onConfirm}
            includeButtons={false}
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}>
            <FormBlock>
                <div data-testid={'welcomingPage-harForståttRettigheterOgPlikter'}>
                    <ApplicationFormComponents.ConfirmationCheckbox
                        label={intlHelper(intl, 'page.velkommen.form.bekreftLabel')}
                        name={ApplicationFormField.harForståttRettigheterOgPlikter}
                        validate={getCheckedValidator()}>
                        <Undertittel tag="h2">
                            <strong>
                                <FormattedMessage id="page.velkommen.form.ansvar.tittel" />
                            </strong>
                        </Undertittel>
                        <InfoList>
                            <li>
                                <FormattedMessage id="page.velkommen.form.ansvar.list.1" />
                            </li>
                            <li>
                                <FormattedMessage id="page.velkommen.form.ansvar.list.2.1" />{' '}
                                <Lenke href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                                    <FormattedMessage id="page.velkommen.form.ansvar.list.2.2" />
                                </Lenke>
                            </li>
                        </InfoList>
                    </ApplicationFormComponents.ConfirmationCheckbox>
                </div>
            </FormBlock>
            <FormBlock>
                <div data-testid={'welcomingPage-begynnsøknad'} style={{ textAlign: 'center' }}>
                    <Hovedknapp>{intlHelper(intl, 'step.button.gåVidere')}</Hovedknapp>
                </div>
            </FormBlock>
        </ApplicationFormComponents.Form>
    );
};
export default SamtykkeForm;
