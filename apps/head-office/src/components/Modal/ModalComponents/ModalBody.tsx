import { BRAND_PREFIX } from '../../../constants/constants';
import type { IModalBodyProps } from '../types';
import '../Modal.css';

const ModalBody = ({ children }: IModalBodyProps) => {
    return (
        <div className={`${BRAND_PREFIX}-modal-content-container relative bg-white rounded-lg`}>
            {children}
        </div>
    );
};

export default ModalBody;
