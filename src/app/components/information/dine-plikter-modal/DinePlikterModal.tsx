import * as React from 'react';
import Modal, { ModalProps } from 'common/components/modal/Modal';
import bemUtils from 'common/utils/bemUtils';
import DinePlikterContent from '../dine-plikter-content/DinePlikterContent';
import './dinePlikterModal.less';
import { ApplicationType } from '../../../types/ApplicationType';

const bem = bemUtils('dinePlikterModal');

const DinePlikterModal: React.FunctionComponent<ModalProps & { søknadstype: ApplicationType }> = (props) => {
    const { søknadstype, ...modalProps } = props;
    return (
        <Modal className={bem.block} {...modalProps}>
            <DinePlikterContent søknadstype={søknadstype} />
        </Modal>
    );
};

export default DinePlikterModal;
