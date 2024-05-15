import { FaRegCircleXmark } from 'react-icons/fa6';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../../constants/constants';
import type { IModalHeaderProps } from '../types';

const ModalHeader: React.FC<IModalHeaderProps> = ({ modalHeaderTitle, onClose }: IModalHeaderProps) => {
    const modalHeaderPrefix = `${BRAND_PREFIX}-modal-header`;

    const handleClose = () => {
        onClose && onClose();
    };

    return (
        <div className={`${modalHeaderPrefix}-title-container flex justify-between items-center border-b`}>
            <h3 className={`${modalHeaderPrefix}-title text-lg font-bold text-heading`}>
                {modalHeaderTitle}
            </h3>
            <div className={`${modalHeaderPrefix}-close-button-container`}>
                <Button
                    className={`${modalHeaderPrefix}-close-button text-sm p-1.5 ml-auto inline-flex items-center bg-white text-black hover:bg-white hover:text-black`}
                    id={`${modalHeaderPrefix}-close-button`}
                    type='button'
                    onClick={handleClose}
                >
                    <FaRegCircleXmark />
                </Button>
            </div>
        </div>
    );
};

export default ModalHeader;
