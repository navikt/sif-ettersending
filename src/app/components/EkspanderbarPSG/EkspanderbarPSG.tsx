import * as React from 'react';
import HelperTextPanel from 'common/components/helper-text-panel/HelperTextPanel';
import ExpandableInfo from 'common/components/expandable-content/ExpandableInfo';
import FormBlock from 'common/components/form-block/FormBlock';
import PictureScanningGuide from 'common/components/picture-scanning-guide/PictureScanningGuide';

const EkspanderbarPSG: React.FC = () => {
    return (
        <FormBlock>
            <ExpandableInfo title={'Slik tar du et godt bilde av dokumentet'}>
                <HelperTextPanel>
                    <PictureScanningGuide />
                </HelperTextPanel>
            </ExpandableInfo>
        </FormBlock>
    );
};

export default EkspanderbarPSG;
