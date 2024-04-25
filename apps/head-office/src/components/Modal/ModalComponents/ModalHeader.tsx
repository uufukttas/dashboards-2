import { FaRegCircleXmark } from 'react-icons/fa6';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../../constants/constants';
import type { IModalHeaderProps } from '../types';

const ModalHeader: React.FC<IModalHeaderProps> = ({ modalHeaderTitle, onClose }: IModalHeaderProps) => {
    const handleClose = () => {
        onClose && onClose();
    };

    return (
        <div className={`${BRAND_PREFIX}-modal-header-title-container flex justify-between items-center border-b`}>
            <h3 className={`${BRAND_PREFIX}-modal-header-title text-lg font-bold text-heading`}>
                {modalHeaderTitle}
            </h3>
            <div className={`${BRAND_PREFIX}-modal-close-button-container`}>
                <Button
                    className={`${BRAND_PREFIX}-modal-close-button text-sm p-1.5 ml-auto inline-flex items-center bg-white text-black hover:bg-white hover:text-black`}
                    id={`${BRAND_PREFIX}-modal-close-button`}
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
