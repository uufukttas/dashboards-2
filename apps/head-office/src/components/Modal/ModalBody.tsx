import { BRAND_PREFIX } from '../../constants/constants';
import './Modal.css';

interface IModalBodyProps {
    children: React.ReactNode;
};

const ModalBody = ({ children }: IModalBodyProps) => {
    return (
        <div className={`${BRAND_PREFIX}-modal-content-container relative bg-white rounded-lg`}>
            {children}
        </div>
    );
};

export default ModalBody;
