import * as React from 'react';
import IkkeMyndigPage from '../components/pages/ikke-myndig-page/IkkeMyndigPage';
import { ApplicationTypeContext } from '../context/ApplicationTypeContext';
import { initialApplicationValues } from '../types/ApplicationFormData';
import { ApplicationType } from '../types/ApplicationType';
import ApplicationEssentialsLoader from './ApplicationEssentialsLoader';
import ApplicationFormComponents from './ApplicationFormComponents';
import ApplicationRoutes from './ApplicationRoutes';

const Application = ({ søknadstype }: { søknadstype: ApplicationType }) => (
    <ApplicationTypeContext.Provider value={{ søknadstype }}>
        <ApplicationEssentialsLoader
            søknadstype={søknadstype}
            contentLoadedRenderer={(søkerdata) => {
                if (søkerdata) {
                    const { person } = søkerdata;
                    if (!person.myndig) {
                        return <IkkeMyndigPage />;
                    }
                }
                return (
                    <ApplicationFormComponents.FormikWrapper
                        initialValues={initialApplicationValues}
                        onSubmit={() => null}
                        renderForm={() => <ApplicationRoutes />}
                    />
                );
            }}
        />
    </ApplicationTypeContext.Provider>
);

export default Application;
