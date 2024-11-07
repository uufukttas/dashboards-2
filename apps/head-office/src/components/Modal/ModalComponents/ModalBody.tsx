import { BRAND_PREFIX } from '../../../constants/constants';
import type { IModalBodyProps } from '../types';
import '../Modal.css';

const ModalBody: React.FC<IModalBodyProps> = ({ children }: IModalBodyProps) => {
    const modalBodyContentPrefix: string = `${BRAND_PREFIX}-modal-content`;

    return (
        <div className={`${modalBodyContentPrefix}-container relative bg-white rounded-lg p-4`}>
            {children}
        </div>
    );
};

export default ModalBody;
