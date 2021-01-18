import { ApplicationType } from './ApplicationType';

export enum SKJEMANAVN {
    pleiepenger = 'Ettersending pleiepenger',
    omsorgspenger = 'Ettersending omsorgspenger',
}

export const getSkjemanavn = (søknadstype: ApplicationType): SKJEMANAVN =>
    søknadstype === ApplicationType.pleiepenger ? SKJEMANAVN.pleiepenger : SKJEMANAVN.omsorgspenger;
