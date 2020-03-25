import * as React from 'react';
import IkkeMyndigPage from '../components/pages/ikke-myndig-page/IkkeMyndigPage';
import { SøknadstypeContext } from '../context/SøknadstypeContext';
import { initialSøknadValues, Søknadstype } from '../types/SøknadFormData';
import SøknadEssentialsLoader from './SøknadEssentialsLoader';
import SøknadFormComponents from './SøknadFormComponents';
import SøknadRoutes from './SøknadRoutes';

const Søknad = ({ søknadstype }: { søknadstype: Søknadstype }) => (
    <SøknadstypeContext.Provider value={{ søknadstype }}>
        <SøknadEssentialsLoader
            søknadstype={søknadstype}
            contentLoadedRenderer={(søkerdata) => {
                if (søkerdata) {
                    const { person } = søkerdata;
                    if (!person.myndig) {
                        return <IkkeMyndigPage />;
                    }
                }
                return (
                    <SøknadFormComponents.FormikWrapper
                        initialValues={initialSøknadValues}
                        onSubmit={() => null}
                        renderForm={() => <SøknadRoutes />}
                    />
                );
            }}
        />
    </SøknadstypeContext.Provider>
);

export default Søknad;
