import { BRAND_PREFIX } from '../../../constants/constants';
import type { IModalBodyProps } from '../types';
import '../Modal.css';

const ModalBody = ({ children }: IModalBodyProps) => {
    const modalBodyContentPrefix = `${BRAND_PREFIX}-modal-content`;
    return (
        <div className={`${modalBodyContentPrefix}-container relative bg-white rounded-lg`}>
            {children}
        </div>
    );
};

export default ModalBody;
