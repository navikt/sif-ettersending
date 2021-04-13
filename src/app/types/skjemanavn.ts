import { ApplicationType } from './ApplicationType';

export enum SKJEMANAVN {
    pleiepenger = 'Ettersending pleiepenger',
    omsorgspenger = 'Ettersending omsorgspenger',
    OMP_UTV_KS = 'Ettersending omsorgspenger utvidet rett - kronisk syke eller funksjonshemming',
    OMP_UT_SNF = 'Ettersending omsorgspenger utbetaling SNF ytelse',
    OMP_UT_ARBEIDSTAKER = 'Ettersending omsorgspenger utbetaling arbeidstaker ytelse',
    OMP_UTV_MA = 'Ettersending omsorgspenger utvidet rett - midlertidig alene',
    ukjent = 'Ettersending feil sjemanavn',
}

export const getSkjemanavn = (søknadstype: ApplicationType): SKJEMANAVN => {
    switch (søknadstype) {
        case ApplicationType.pleiepenger:
            return SKJEMANAVN.pleiepenger;
        case ApplicationType.ekstraomsorgsdager:
            return SKJEMANAVN.OMP_UTV_KS;
        case ApplicationType.utbetaling:
            return SKJEMANAVN.OMP_UT_SNF;
        case ApplicationType.utbetalingarbeidstaker:
            return SKJEMANAVN.OMP_UT_ARBEIDSTAKER;
        case ApplicationType.regnetsomalene:
            return SKJEMANAVN.OMP_UTV_MA;
    }
    return SKJEMANAVN.ukjent;
};
