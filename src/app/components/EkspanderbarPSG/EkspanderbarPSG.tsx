import * as React from 'react';
import HelperTextPanel from 'common/components/helper-text-panel/HelperTextPanel';
import ExpandableInfo from 'common/components/expandable-content/ExpandableInfo';
import FormBlock from 'common/components/form-block/FormBlock';
import PictureScanningGuide from 'common/components/picture-scanning-guide/PictureScanningGuide';
import intlHelper from 'common/utils/intlUtils';
import { useIntl } from 'react-intl';

const EkspanderbarPSG: React.FC = () => {
    const intl = useIntl();
    return (
        <FormBlock>
            <ExpandableInfo title={intlHelper(intl, 'ekspanderbarPSG.title')}>
                <HelperTextPanel>
                    <PictureScanningGuide />
                </HelperTextPanel>
            </ExpandableInfo>
        </FormBlock>
    );
};

export default EkspanderbarPSG;
