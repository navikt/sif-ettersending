import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GeneralErrorPage from './components/pages/general-error-page/GeneralErrorPage';
import IntroPage from './components/pages/intro-page/IntroPage';
import Application from './application/Application';
import { ApplicationType } from './types/ApplicationType';

const YtelseSwitch = () => (
    <Switch>
        <Route path={'/omsorgspenger'} render={() => <Application søknadstype={ApplicationType.omsorgspenger} />} />
        <Route path={'/OMP_UTV_KS'} render={() => <Application søknadstype={ApplicationType.OMP_UTV_KS} />} />
        <Route path={'/OMP_UT_SNF'} render={() => <Application søknadstype={ApplicationType.OMP_UT_SNF} />} />
        <Route
            path={'/OMP_UT_ARBEIDSTAKER'}
            render={() => <Application søknadstype={ApplicationType.OMP_UT_ARBEIDSTAKER} />}
        />
        <Route path={'/OMP_UTV_MA'} render={() => <Application søknadstype={ApplicationType.OMP_UTV_MA} />} />
        <Route path={'/OMP_DELING'} render={() => <Application søknadstype={ApplicationType.OMP_DELING} />} />
        <Route path={'/pleiepenger'} render={() => <Application søknadstype={ApplicationType.pleiepenger} />} />
        <Route path={'/feil'} component={GeneralErrorPage} />
        <Route component={IntroPage} />
    </Switch>
);

export default YtelseSwitch;
