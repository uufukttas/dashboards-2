import { FaRegCircleXmark } from 'react-icons/fa6';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../../constants/constants';
import type { IModalHeaderProps } from '../types';

const ModalHeader: React.FC<IModalHeaderProps> = ({ modalHeaderTitle, onClose }: IModalHeaderProps) => {
    const modalHeaderPrefix: string = `${BRAND_PREFIX}-modal-header`;

    const handleClose = (): void => {
        onClose && onClose();
    };

    return (
      <div
        className={`${modalHeaderPrefix}-title-container flex justify-between items-center border-b border-b-gray-300 py-4 px-8`}
      >
        <h3
          className={`${modalHeaderPrefix}-title text-lg font-bold text-heading`}
        >
          {modalHeaderTitle}
        </h3>
        <div className={`${modalHeaderPrefix}-close-button-container`}>
          <Button
            className={`${modalHeaderPrefix}-close-button p-0 h-8 w-8 items-center justify-center rounded-md bg-gray-700`}
            id={`${modalHeaderPrefix}-close-button`}
            type="button"
            onClick={handleClose}
          >
            <i className='pi pi-times text-white w-4 h-4 mt-1'/>
          </Button>
        </div>
      </div>
    );
};

export default ModalHeader;
