import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GeneralErrorPage from './components/pages/general-error-page/GeneralErrorPage';
import IntroPage from './components/pages/intro-page/IntroPage';
import Application from './application/Application';
import { ApplicationType } from './types/ApplicationType';

const YtelseSwitch = () => (
    <Switch>
        <Route path={'/omsorgspenger'} render={() => <Application søknadstype={ApplicationType.omsorgspenger} />} />
        <Route path={'/pleiepenger'} render={() => <Application søknadstype={ApplicationType.pleiepenger} />} />
        <Route path={'/feil'} component={GeneralErrorPage} />
        <Route component={IntroPage} />
    </Switch>
);

export default YtelseSwitch;